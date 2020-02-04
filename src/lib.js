const { readFileSync } = require('fs');
const path = require('path');

const inlineStyles = (linkTag, originalFilePath) => {
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

module.exports = inlineStyles;