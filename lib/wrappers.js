'use strict';

const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};

const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      lastTime = Date.now();
      inThrottle = true;
      return;
    }

    clearTimeout(lastFn);
    lastFn = setTimeout(() => {
      if (Date.now() - lastTime < wait) return;
      fn(...args);
      lastTime = Date.now();
    }, Math.max(wait - (Date.now() - lastTime), 0));
  };
};

const once = fn => {
  let called = false;
  return function (...args) {
    if (called) return () => {};
    called = true;
    return fn(...args);
  };
};

const memoize = fn => {
  const cache = new Map();
  const cached = function (...args) {
    const key = args.map(JSON.stringify).join('|');
    const val = cache.get(key);
    if (val) return val;
    const res = fn(...args);
    cache.set(key, res);
    return res;
  };
  cached.cache = cache;
  return cached;
};

// prettier-ignore
const chain = ctx => func => (...args) => (func(...args), ctx);
// prettier-ignore
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
// prettier-ignore
const curry = (fn, arity = fn.length, ...args) => arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
// prettier-ignore
const pipeAsync = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
module.exports = { debounce, throttle, memoize, once, chain, curry, pipe, pipeAsync };
