'use strict';

const intIP = (ip = '127.0.0.1') => ip.split('.').reduce((acc, byte) => (acc = (acc << 8) + parseInt(byte, 10)), 0);
const urlParse = v => decodeURIComponent(v.trim());
// prettier-ignore
const parseCookie = s =>
  s.split(';').map(v => v.split('=')).reduce((a, v) => ((a[urlParse(v[0])] = urlParse(v[1])), a), {});

const removePort = host => {
  if (!host) return '';
  const portOffset = host.indexOf(':');
  return portOffset > -1 ? host.substr(0, portOffset) : host;
};

const frame = body =>
  `<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">${body}</urlset>`;

const xmlUrl = ({ loc, time, priority }) =>
  `<url><loc>${loc}</loc><changefreq>${time}</changefreq><priority>${priority}</priority></url>`;

const createXML = (result = '') => ({
  add: url => createXML(result + xmlUrl(url)),
  get: frame(result),
});

const receiveBody = async stream => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

module.exports = { intIP, parseCookie, removePort, createXML, receiveBody };
