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

const XMLBuilder = () => {
  const url = ({ loc, time, priority }) =>
    `<url><loc>${loc}</loc><changefreq>${time}</changefreq><priority>${priority}</priority></url>`;

  const frame = body =>
    `<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">${body}</urlset>`;

  const build = result => ({
    add: item => build(result + url(item)),
    get: frame(result),
  });

  return build('');
};

const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a === null || a === undefined || b === null || b === undefined) return false;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};

module.exports = { defineSetter, defineGetter, setDefault, mixin, XMLBuilder, equals };
