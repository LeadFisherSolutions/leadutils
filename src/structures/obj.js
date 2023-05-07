'use strict';

const deepClone = obj => {
  const clone = Object.assign({}, obj);
  Object.keys(clone).forEach(key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]));
  return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
};

const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

const deepFreeze = obj =>
  Object.keys(obj).forEach(prop =>
    !(obj[prop] instanceof Object) || Object.isFrozen(obj[prop]) ? null : deepFreeze(obj[prop]),
  ) || Object.freeze(obj);

const dig = (obj, target) => {
  if (target in obj) return obj[target];
  return Object.values(obj).reduce((acc, val) => {
    if (acc !== undefined) return acc;
    if (typeof val === 'object') return dig(val, target);
    return undefined;
  }, undefined);
};

const deepFlattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object') Object.assign(acc, deepFlattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

module.exports = { deepClone, deepFlatten, deepFreeze, dig, deepFlattenObject };
