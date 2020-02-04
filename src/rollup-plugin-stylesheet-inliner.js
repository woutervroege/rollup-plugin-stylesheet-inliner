const MagicString = require('magic-string');
const inlineStyles = require('./lib');

const main = () => {
  return {
    name: 'inline-stylesheets',
    transform (code, filePath) {

      const magicString = new MagicString(code.replace(/<link.*?rel="stylesheet".*?>/gi, (match) => {
        return inlineStyles(match, filePath);
      }));

      return { 
        code: magicString.toString(),
        map: magicString.generateMap({ hires: true })
      }
    }
  }
}

module.exports = main;