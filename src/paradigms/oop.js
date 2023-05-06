const mixin = (target, source) => {
  const methods = Object.getOwnPropertyNames(source);
  const mix = {};
  for (const method of methods) {
    if (target[method]) continue;
    mix[method] = source[method];
  }
  Object.assign(target, mix);
};

module.exports = { mixin };
