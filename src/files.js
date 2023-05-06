const path = require('path');

const prettyBytes = (num, precision = 3, addSpace = true) => {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
  const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
  const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
};

const BOM_REGEXP = /^[\uBBBF\uFEFF]*/;
const fileExt = fileName => path.extname(fileName).replace('.', '').toLowerCase();
const fileName = fileName => fileName.substr(0, fileName.lastIndexOf('.'));
const removeBOM = s => (typeof s === 'string' ? s.replace(BOM_REGEXP, '') : s);

module.exports = { prettyBytes, fileExt, fileName, removeBOM };
