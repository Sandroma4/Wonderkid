import fs from 'fs';
import path from 'path';

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = fs.statSync(dirFile).isDirectory() ? walkSync(dirFile, filelist) : filelist.concat(dirFile);
    } catch (err) {
      if (err.code === 'OOM' || err.code === 'EMFILE') throw err;
    }
  });
  return filelist;
};

const files = walkSync('./src').filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('t(') && !content.includes('const { t } = useTranslation()')) {
    if (!content.includes('i18n.t(') && !content.includes('t =>') && !content.includes('(t)') && !content.includes(' t(')) {
        console.log(file);
    }
  }
});
