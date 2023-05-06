'use strict';

const dataSize = data => (data && data.length ? data.length : 0);

class Cache extends Map {
  constructor() {
    super();
    this.allocated = 0;
  }

  add(key, val) {
    if (this.has(key)) {
      const prev = this.get(key);
      this.allocated -= dataSize(prev);
    }
    this.allocated += dataSize(val);
    this.set(key, val);
  }

  del(key) {
    if (this.has(key)) {
      const val = this.get(key);
      this.allocated -= dataSize(val);
    }
    this.delete(key);
  }

  clr(prefix, fn) {
    this.forEach((val, key) => {
      if (!key.startsWith(prefix)) return;
      this.allocated -= dataSize(val);
      this.delete(key);
      if (fn) fn(key, val);
    });
  }
}

module.exports = { Cache };
