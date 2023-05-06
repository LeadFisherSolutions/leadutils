'use strict';

const HTML_ESCAPE_REGEXP = new RegExp(/[&<>"']/, 'g');
const HTML_ESCAPED_REGEXP = new RegExp(/&amp;|&lt;|&gt;|&#39;|&quot;/g, 'g');
const HTML_ESCAPE_CHARS = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const HTML_ESCAPED_CHARS = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };
const ESCAPE_REGEXP_SPECIALS = ['-', '[', ']', '/', '{', '}', '(', ')', '*', '+', '?', '.', '\\', '^', '$', '|'];
const ESCAPE_REGEXP = new RegExp('[' + ESCAPE_REGEXP_SPECIALS.join('\\') + ']', 'g');

const escape = str => str.replace(ESCAPE_REGEXP, '\\$&');
const escapeHTML = content => content.replace(HTML_ESCAPE_REGEXP, char => HTML_ESCAPED_CHARS[char]);
const unescapeHTML = content => content.replace(HTML_ESCAPED_REGEXP, char => HTML_ESCAPE_CHARS[char]);
const template =
  (strings, ...keys) =>
  values =>
    keys.reduce((acc, key, i) => (acc.push(values[key], strings[i + 1]), acc), [strings[0]]).join('');

const normalizeEmail = email => {
  const at = email.lastIndexOf('@');
  const domain = email.slice(at).toLowerCase();
  return email.slice(0, at) + domain;
};

const yesNo = (val, def = false) => (/^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def);
const words = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean);

const reverseString = str => [...str].reverse().join('');

const phonePurify = phone => phone.replace(/[^+\d]/g, ''); // ? href
const phonePrettify = p => p.replace(/\D+/g, '').replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');

module.exports = {
  yesNo,
  words,
  escape,
  template,
  escapeHTML,
  normalizeEmail,
  phonePurify,
  reverseString,
  phonePrettify,
  unescapeHTML,
};
