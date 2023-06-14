const UNITS = { d: 86_400_000, h: 3_600_000, m: 60_000, s: 1_000, ms: 1 };

// prettier-ignore
const addZero = (number, len = 2) => Array(Math.max(0, len - number.toString().length)).fill('0').join('') + number;
const prettify = (format = 'D.M.Y', date = new Date()) => {
  const time = new Date(date);
  const Y = time.getFullYear();
  const M = addZero(time.getMonth() + 1);
  const D = addZero(time.getDate());
  const h = addZero(time.getHours());
  const m = addZero(time.getMinutes());
  const s = addZero(time.getSeconds());
  const i = addZero(addZero(time.getMilliseconds()), 3);
  const data = { Y, M, D, h, m, i, s };
  return format.replace(/[YMDhmsi]/g, char => data[char]);
};

const measures = ms => ({
  d: Math.floor(ms / UNITS.d),
  h: Math.floor(ms / UNITS.h) % 24,
  m: Math.floor(ms / UNITS.m) % 60,
  s: Math.floor(ms / UNITS.s) % 60,
  ms: Math.floor(ms) % 1000,
});

//prettier-ignore
const format = ms => Object.entries(measures(Math.abs(ms))).filter(val => val[1] !== 0).map(([key, val]) => `${val}${key}`).join(', ');
//prettier-ignore
const duration = time => time.split(' ').reduce((acc, part) => (acc += parseInt(part.slice(0, -1)) * UNITS[part.slice(-1)]), 0);
const diff = (dateInitial, dateFinal, measure = 'day') => measures(dateFinal - dateInitial)[measure];
const compare = fn => (a, b) => fn(new Date(a).getTime(), new Date(b).getTime());
export default { compare, prettify, format, measures, diff, duration };
