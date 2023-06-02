'use strict';

const crypto = require('node:crypto');

const SCRYPT_PARAMS = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const SCRYPT_PREFIX = '$scrypt$N=32768,r=8,p=1,maxmem=67108864$';
const SALT_LEN = 32;
const KEY_LEN = 64;

const serializeHash = (hash, salt) => {
  const saltString = salt.toString('base64').split('=')[0];
  const hashString = hash.toString('base64').split('=')[0];
  return `${SCRYPT_PREFIX}${saltString}$${hashString}`;
};

const parseOptions = options => {
  let k, v;
  const items = options.split(',');
  return Object.fromEntries(items.reduce((a, item) => (([k, v] = item.split('=')), a.push([k, Number(v)]), a), []));
};

const deserializeHash = phcString => {
  const [, name, options, salt64, hash64] = phcString.split('$');
  if (name !== 'scrypt') throw new Error('Node.js crypto module only supports scrypt');
  const params = parseOptions(options);
  const salt = Buffer.from(salt64, 'base64');
  const hash = Buffer.from(hash64, 'base64');
  return { params, salt, hash };
};

const hashPassword = pass =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(SALT_LEN, (err, salt) => {
      if (err) return reject(err);
      return void crypto.scrypt(pass, salt, KEY_LEN, SCRYPT_PARAMS, (err, hash) => {
        err ? reject(err) : resolve(serializeHash(hash, salt));
      });
    });
  });

const validatePassword = (password, serHash) => {
  const { params, salt, hash } = deserializeHash(serHash);
  return new Promise((resolve, reject) => {
    const callback = (err, hashed) => void (err ? reject(err) : resolve(crypto.timingSafeEqual(hashed, hash)));
    crypto.scrypt(password, salt, hash.length, params, callback);
  });
};

module.exports = { hashPassword, validatePassword };
