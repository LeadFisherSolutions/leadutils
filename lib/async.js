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

class Semaphore {
  empty = true;
  #queue = [];
  #concurrency;
  #counter;
  #size;
  #timeout;

  constructor(concurrency, size = 0, timeout = 0) {
    this.#concurrency = concurrency;
    this.#counter = concurrency;
    this.#timeout = timeout;
    this.#size = size;
  }

  async enter() {
    return new Promise((resolve, reject) => {
      if (this.#counter > 0) {
        this.#counter--;
        this.empty = false;
        resolve();
        return;
      }
      if (this.#queue.length >= this.#size) {
        reject(new Error('Semaphore queue is full'));
        return;
      }
      const waiting = { resolve, timer: null };
      waiting.timer = setTimeout(() => {
        waiting.resolve = null;
        this.#queue.shift();
        this.empty = this.#queue.length === 0 && this.#counter === this.#concurrency;
        reject(new Error('Semaphore timeout'));
      }, this.#timeout);
      this.#queue.push(waiting);
      this.empty = false;
    });
  }

  leave() {
    if (this.#queue.length === 0) {
      this.#counter++;
      this.empty = this.#counter === this.#concurrency;
      return;
    }
    const { resolve, timer } = this.#queue.shift();
    clearTimeout(timer);
    if (resolve) setTimeout(resolve, 0);
    this.empty = this.#queue.length === 0 && this.#counter === this.#concurrency;
  }
}

module.exports = { timeout, delay, Semaphore };
