const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..');
const pagesDir = path.join(__dirname, 'src', 'pages');
const stylesDir = path.join(__dirname, 'src', 'styles');

if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });
if (!fs.existsSync(stylesDir)) fs.mkdirSync(stylesDir, { recursive: true });

const filesToConvert = [
  'about.html',
  'clients.html',
  'contact.html',
  'index.html',
  'industries.html',
  'services.html',
  'strength.html'
];

function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function parseInlineStyle(styleStr) {
  const parts = styleStr.split(';').filter(s => s.trim());
  const objArr = parts.map(part => {
    const [key, ...valParts] = part.split(':');
    if (!key || valParts.length === 0) return '';
    const camelKey = kebabToCamel(key.trim());
    const val = valParts.join(':').trim().replace(/"/g, "'");
    return `${camelKey}: "${val}"`;
  }).filter(Boolean);
  return `{{ ${objArr.join(', ')} }}`;
}

filesToConvert.forEach(file => {
  const filePath = path.join(inputDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file}, not found.`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract CSS
  const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
  let cssContent = styleMatch ? styleMatch[1] : '';
  cssContent = `/* Styles for ${file.replace('.html', '')} component */\n` + cssContent;
  
  // Extract body
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (!bodyMatch) {
    console.log(`No body found in ${file}`);
    return;
  }
  
  let jsxContent = bodyMatch[1];
  
  // Clean up body (remove scripts)
  jsxContent = jsxContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  
  // Replace HTML comments
  jsxContent = jsxContent.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // class to className
  jsxContent = jsxContent.replace(/class="/g, 'className="');
  
  // for to htmlFor
  jsxContent = jsxContent.replace(/for="/g, 'htmlFor="');
  
  // Self closing tags
  const voidTags = ['br', 'hr', 'img', 'input', 'meta', 'link'];
  voidTags.forEach(tag => {
    const regex = new RegExp(`<${tag}\\b([^>]*?)(?<!/)>`, 'gi');
    jsxContent = jsxContent.replace(regex, `<${tag}$1 />`);
  });
  
  // Inline styles
  jsxContent = jsxContent.replace(/style="([^"]*)"/g, (match, p1) => {
    return `style=${parseInlineStyle(p1)}`;
  });
  
  // SVG attributes (stroke-width etc)
  const svgAttrs = ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'stroke-dasharray', 'stroke-dashoffset'];
  svgAttrs.forEach(attr => {
    const regex = new RegExp(`${attr}="([^"]*)"`, 'gi');
    jsxContent = jsxContent.replace(regex, `${kebabToCamel(attr)}="$1"`);
  });
  
  // Component Name
  let compName = file.replace('.html', '');
  compName = compName.charAt(0).toUpperCase() + compName.slice(1);
  if (compName === 'Index') compName = 'Home';
  
  const compCode = `import React from 'react';
import '../../styles/${compName}.css';

/**
 * ${compName} Component
 * Converted from ${file}
 */
export default function ${compName}() {
  return (
    <>
      ${jsxContent}
    </>
  );
}
`;

  // Write files
  fs.writeFileSync(path.join(pagesDir, `${compName}.jsx`), compCode);
  fs.writeFileSync(path.join(stylesDir, `${compName}.css`), cssContent);
  console.log(`Converted ${file} -> ${compName}.jsx / ${compName}.css`);
});

// Also copy shared.css and shared.js if needed, but user said separate css per page.
// Let's also copy shared.css and shared.js into src/styles and src/utils
if (fs.existsSync(path.join(inputDir, 'shared.css'))) {
  let sharedCss = fs.readFileSync(path.join(inputDir, 'shared.css'), 'utf-8');
  sharedCss = '/* Shared Global Styles */\n' + sharedCss;
  fs.writeFileSync(path.join(stylesDir, 'shared.css'), sharedCss);
  console.log('Copied shared.css');
}

if (fs.existsSync(path.join(inputDir, 'shared.js'))) {
  if (!fs.existsSync(path.join(__dirname, 'src', 'utils'))) {
    fs.mkdirSync(path.join(__dirname, 'src', 'utils'), { recursive: true });
  }
  let sharedJs = fs.readFileSync(path.join(inputDir, 'shared.js'), 'utf-8');
  sharedJs = '/* Shared Utility Functions */\n' + sharedJs;
  fs.writeFileSync(path.join(__dirname, 'src', 'utils', 'shared.js'), sharedJs);
  console.log('Copied shared.js');
}
