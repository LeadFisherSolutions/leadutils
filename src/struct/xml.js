const frame = body =>
  `<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">${body}</urlset>`;

const xmlUrl = ({ loc, time, priority }) =>
  `<url><loc>${loc}</loc><changefreq>${time}</changefreq><priority>${priority}</priority></url>`;

const createXml = (result = '') => ({
  add: url => createXml(result + xmlUrl(url)),
  get: frame(result),
});

module.exports = { createXml };
