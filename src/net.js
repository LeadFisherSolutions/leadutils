const parseParams = params => Object.fromEntries(new URLSearchParams(params));
const intIP = (ip = '127.0.0.1') => ip.split('.').reduce((acc, byte) => (acc = (acc << 8) + parseInt(byte, 10)), 0);
const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

const URLJoin = (...args) =>
  args
    .join('/')
    .replace(/[/]+/g, '/')
    .replace(/^(.+):\//, '://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '')
    .replace(/\?/g, '&')
    .replace('&', '?');

const parseHost = host => {
  if (!host) {
    return 'no-host-name-in-http-headers';
  }
  const portOffset = host.indexOf(':');
  if (portOffset > -1) host = host.substr(0, portOffset);
  return host;
};

const prepareRequest = ({ body, headers = {} }) => {
  if (!body) return { headers };
  const content = { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) };
  return { body, headers: { ...content, ...headers } };
};

const receiveBody = async stream => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

const prepareResponse = (resolve, reject) => res => {
  const code = res.statusCode;
  if (code >= 400) {
    reject(new Error(`HTTP status code ${code}`));
    return;
  }
  res.on('error', reject);
  const parse = data => async () => JSON.parse(data.toString());
  const text = data => async () => data.toString();
  receiveBody(res)
    .then(data => resolve({ json: parse(data), text: text(data) }))
    .catch(reject);
};

module.exports = { intIP, parseParams, parseCookie, URLJoin, parseHost, prepareRequest, prepareResponse };
