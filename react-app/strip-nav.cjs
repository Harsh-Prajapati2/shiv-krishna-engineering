const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove NAV block
  // It starts with {/*  NAV  */} or <nav id="mainNav"> and ends with </nav>
  content = content.replace(/\{\/\*\s*NAV\s*\*\/\}\s*<nav id="mainNav">[\s\S]*?<\/nav>/i, '');
  content = content.replace(/<nav id="mainNav">[\s\S]*?<\/nav>/i, ''); // Fallback without comment

  // Remove FOOTER block
  content = content.replace(/\{\/\*\s*FOOTER\s*\*\/\}\s*<footer>[\s\S]*?<\/footer>/i, '');
  content = content.replace(/<footer>[\s\S]*?<\/footer>/i, ''); // Fallback without comment

  // Write back
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Cleaned up nav/footer from', file);
});
