const HTML_ESCAPE_CHARS = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const HTML_ESCAPED_CHARS = Object.entries(HTML_ESCAPE_CHARS).reduce((acc, [k, v]) => ((acc[v] = k), acc), {});
const ESCAPE_REGEXP_SPECIALS = ['-', '[', ']', '/', '{', '}', '(', ')', '*', '+', '?', '.', '\\', '^', '$', '|'];

const escape = {
  regexp: buffer => buffer.replace(new RegExp(`[${ESCAPE_REGEXP_SPECIALS.join('\\')}]`, 'g'), '\\$&'),
  html: buffer => buffer.replace(new RegExp(/[&<>"']/, 'g'), char => HTML_ESCAPED_CHARS[char]),
  unescapeHTML: buffer =>
    buffer.replace(new RegExp(/&amp;|&lt;|&gt;|&#39;|&quot;/g, 'g'), char => HTML_ESCAPE_CHARS[char]),
};

const parse = {
  fileName: buffer => buffer.match(/\/?\w+\.?\w+$/)[0]?.slice(1),
  extension: buffer => buffer.match(/\.?\w+$/)[0]?.slice(1),
  words: (buffer, pattern = /[^a-zA-Z-]+/) => buffer.split(pattern).filter(Boolean),
  phone: buffer => buffer.replace(/[^+\d]/g, ''),
  email: (buffer, at = buffer.indexOf('@')) => buffer.slice(0, at) + buffer.slice(at).toLowerCase(),
  json: buffer => {
    if (buffer.length === 0) return false;
    try {
      return JSON.parse(buffer);
    } catch {
      return null;
    }
  },
  any: buffer => {
    const descriptors = { false: false, true: true, null: null, undefined };
    if (buffer in descriptors) return descriptors[buffer];
    if (!isNaN(+buffer)) return Number(buffer);
    const json = parse.json(buffer);
    if (json) return json;
    return buffer;
  },
};

const toString = value => {
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return parse.json(value);
  return String(value);
};

// prettier-ignore
const template = (strings, ...keys) => values => keys.reduce((acc, key, i) => (acc.push(values[key], strings[i + 1]), acc), [strings[0]]).join('');
export default { parse, escape, toString, template };
