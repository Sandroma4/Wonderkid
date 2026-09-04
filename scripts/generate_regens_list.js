import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGENS_DIR = path.join(__dirname, '..', 'public', 'regens');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'regens_list.json');

const getFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getFiles(fullPath, arrayOfFiles);
    } else {
      if (file.toLowerCase().endsWith('.png')) {
        // Convert backslashes to forward slashes for URLs
        const relativePath = path.relative(path.join(__dirname, '..', 'public'), fullPath).replace(/\\/g, '/');
        arrayOfFiles.push(relativePath);
      }
    }
  });

  return arrayOfFiles;
};

const buildGroupedList = () => {
  if (!fs.existsSync(REGENS_DIR)) {
    console.error(`Directory not found: ${REGENS_DIR}`);
    return;
  }
  
  const folders = fs.readdirSync(REGENS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
    
  const data = {};
  
  folders.forEach(folder => {
    const folderPath = path.join(REGENS_DIR, folder);
    const files = getFiles(folderPath);
    data[folder] = files;
  });
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`Generated list with ${Object.keys(data).length} folders.`);
};

buildGroupedList();
