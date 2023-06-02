'use strict';

const DURATION_UNITS = { d: 86400, h: 3600, m: 60, s: 1 };

const compare = fn => (a, b) => fn(new Date(a).getTime(), new Date(b).getTime());

const addZero = number => (number < 10 ? `0${number}` : `${number}`);
const addMoreZero = number => (number.length < 3 ? `0${number}` : `${number}`);
const prettify = (format = 'D.M.Y', date = new Date()) => {
  const time = new Date(date);
  const Y = time.getFullYear();
  const M = addZero(time.getMonth() + 1);
  const D = addZero(time.getDate());
  const h = addZero(time.getHours());
  const m = addZero(time.getMinutes());
  const s = addZero(time.getSeconds());
  const i = addMoreZero(addZero(time.getMilliseconds()));
  const data = { Y, M, D, h, m, i, s };
  return format.replace(/[YMDhmsi]/g, char => data[char]);
};

const divideDuration = ms => ({
  day: Math.floor(ms / 86400000),
  hour: Math.floor(ms / 3600000) % 24,
  minute: Math.floor(ms / 60000) % 60,
  second: Math.floor(ms / 1000) % 60,
  millisecond: Math.floor(ms) % 1000,
});

const duration = time => {
  const ms = time.split(' ').reduce((acc, part) => {
    const unit = part.slice(-1);
    const value = parseInt(part.slice(0, -1));
    const multiply = DURATION_UNITS[unit];
    return (acc += value * multiply);
  }, 0);

  return ms * 1000;
};

const datesDiff = (dateInitial, dateFinal, measure = 'day') => divideDuration(dateFinal - dateInitial)[measure];

const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = divideDuration(ms);
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ');
};

module.exports = { compare, prettify, formatDuration, divideDuration, datesDiff, duration };
