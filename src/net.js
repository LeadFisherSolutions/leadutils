'use strict';

const intIP = (ip = '127.0.0.1') => ip.split('.').reduce((acc, byte) => (acc = (acc << 8) + parseInt(byte, 10)), 0);
const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

module.exports = { intIP, parseCookie };
