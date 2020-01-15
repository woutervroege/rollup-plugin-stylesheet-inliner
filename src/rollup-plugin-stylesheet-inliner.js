const { readFileSync } = require('fs');
const MagicString = require('magic-string');
const path = require('path');

const main = () => {
  return {
    name: 'inline-stylesheets',
    transform (code, filePath) {

      const magicString = new MagicString(code.replace(/<link.*?rel="stylesheet".*?>/gi, (match) => {
        return _inlineStyles(match, filePath);
      }));

      return { 
        code: magicString.toString(),
        map: magicString.generateMap({ hires: true })
      }
    }
  }
}

const _inlineStyles = (linkTag, originalFilePath) => {
  const stylesheetURL = linkTag.match(/href\="(.*?)"/i)[1];
  if(stylesheetURL.match(/^http/)) return linkTag;
  const stylesheetFilePath = _parseFilePath(originalFilePath, stylesheetURL);
  const file = readFileSync(stylesheetFilePath);
  return `<style>${file.toString()}</style>`;
}

const _parseFilePath = (originalFilePath, cssRelFilePath) => {
  const folderPath = originalFilePath.substring(0, originalFilePath.lastIndexOf('/'));
  const cssFilePath = path.join(folderPath, cssRelFilePath);
  return cssFilePath;
}

module.exports = main;