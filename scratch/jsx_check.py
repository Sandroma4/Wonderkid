import re

def check_jsx_balance(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    # Find the start of the <div className="app-typography..."> which is inside the <> block
    start_idx = text.find('<div \n          className="app-typography min-h-[100dvh]')
    if start_idx == -1:
        start_idx = text.find('className="app-typography')
        start_idx = text.rfind('<div', 0, start_idx)
    
    # Find the end </>
    end_idx = text.find('</>', start_idx)
    
    chunk = text[start_idx:end_idx]
    
    # Remove JSX expressions like {...} or {...()} to avoid confusing the simple parser
    clean_chunk = ""
    brace_depth = 0
    for char in chunk:
        if char == '{':
            brace_depth += 1
        elif char == '}':
            if brace_depth > 0:
                brace_depth -= 1
        elif brace_depth == 0:
            clean_chunk += char

    # Now parse the tags
    stack = []
    pattern = re.compile(r'<(/)?([a-zA-Z0-9_]+)[^>]*?(/?)>')
    
    for match in pattern.finditer(clean_chunk):
        is_close = match.group(1) == '/'
        tag = match.group(2)
        is_self_close = match.group(3) == '/'
        
        if is_self_close or tag.lower() in ['br', 'hr', 'img', 'input', 'path', 'svg', 'circle', 'line', 'rect']:
            continue
            
        if not is_close:
            print("  " * len(stack) + f"<{tag}> (line {clean_chunk[:match.start()].count(chr(10))+832})")
            stack.append((tag, match.start()))
        else:
            if not stack:
                print("  " * len(stack) + f"Error: Found </{tag}> but stack is empty!")
                break
            else:
                last_tag, _ = stack.pop()
                print("  " * len(stack) + f"</{tag}> (line {clean_chunk[:match.start()].count(chr(10))+832})")
                if last_tag != tag:
                    print("  " * len(stack) + f"Mismatch: expected {last_tag}")
                    break

    print("Unclosed tags remaining in stack (should be empty if perfectly balanced):")
    for t, pos in stack:
        print(f" - <{t}> (opened at index {pos})")

if __name__ == "__main__":
    check_jsx_balance('src/components/Dashboard.jsx')
