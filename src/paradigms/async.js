'use strict';

const timeout = (msec, signal = null) =>
  new Promise((_, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout reached')), msec);
    signal && signal.addEventListener('abort', () => clearTimeout(timer), reject(new Error('Timeout aborted')));
  });

const delay = (msec, signal = null) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, msec);
    signal && signal.addEventListener('abort', () => clearTimeout(timer), reject(new Error('Delay aborted')));
  });

module.exports = { timeout, delay };
