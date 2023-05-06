'use strict';

const fs = require('fs');
const path = require('path');

const read = dir =>
  fs.readdirSync(dir).reduce((acc, file) => {
    const loc = path.resolve(dir, file);
    if (fs.statSync(loc).isDirectory()) return acc.push(...read(loc)), acc;
    return acc.push(loc), acc;
  }, []);

const modules = read('./src').map(file => ({
  [path.basename(file.substring(0, file.lastIndexOf('.')))]: require(file),
}));

// console.log(Object.assign({}, ...modules));
module.exports = Object.assign({}, ...modules);
