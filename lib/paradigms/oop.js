'use strict';

const setDefault = (target, defaultValue) =>
  new Proxy(target, {
    get(obj, key) {
      if (obj[key] === undefined) return defaultValue;
      return obj[key];
    },
  });

const defineGetter = target => (name, callback) =>
  Object.defineProperty(target, name, { get: callback, enumerable: true, configurable: false });

const defineSetter = target => (name, callback) =>
  Object.defineProperty(target, name, { set: callback, enumerable: true, configurable: false });

const mixin = (target, source) => {
  const methods = Object.getOwnPropertyNames(source);
  const mix = methods.reduce((acc, method) => (target[method] ? acc : ((acc[method] = source[method]), acc)), {});
  return Object.assign(target, mix);
};

module.exports = { defineSetter, defineGetter, setDefault, mixin };
