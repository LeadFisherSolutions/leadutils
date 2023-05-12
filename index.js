'use strict';

const fs = require('node:fs');
const path = require('node:path');

const read = dir =>
  fs.readdirSync(dir).reduce((acc, file) => {
    const loc = path.resolve(dir, file);
    if (fs.statSync(loc).isDirectory()) return acc.push(...read(loc)), acc;
    return acc.push(loc), acc;
  }, []);

const modules = read(path.join(__dirname, 'src')).map(file => ({
  [path.basename(file.substring(0, file.lastIndexOf('.')))]: require(file),
}));

module.exports = Object.assign({}, ...modules);
