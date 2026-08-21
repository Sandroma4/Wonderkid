import re

def trace_max_w(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    start_idx = text.find('<div \n          className="app-typography min-h-[100dvh]')
    if start_idx == -1:
        start_idx = text.find('className="app-typography')
        start_idx = text.rfind('<div', 0, start_idx)
    
    end_idx = text.find('</>', start_idx)
    chunk = text[start_idx:end_idx]
    
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

    stack = []
    pattern = re.compile(r'<(/)?([a-zA-Z0-9_]+)[^>]*?(/?)>')
    
    for match in pattern.finditer(clean_chunk):
        is_close = match.group(1) == '/'
        tag = match.group(2)
        is_self_close = match.group(3) == '/'
        
        if is_self_close or tag.lower() in ['br', 'hr', 'img', 'input', 'path', 'svg', 'circle', 'line', 'rect']:
            continue
            
        if not is_close:
            stack.append(match.start())
            if 'max-w-5xl' in match.string[match.start():match.start()+100]:
                print(f"max-w-5xl OPENED at depth {len(stack)}")
        else:
            if stack:
                open_pos = stack.pop()
                if not stack:
                    print(f"app-typography CLOSED at index {match.start()}! Context:\n{clean_chunk[match.start()-100:match.start()+50]}")
                if 'max-w-5xl' in match.string[open_pos:open_pos+100]:
                    print(f"max-w-5xl CLOSED at depth {len(stack)+1} at index {match.start()} Context:\n{clean_chunk[match.start()-100:match.start()+50]}")

if __name__ == "__main__":
    trace_max_w('src/components/Dashboard.jsx')
