const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const range = (from, to) => new Array(to - from + 1).fill(1).map(() => ((from += 1), from - 1));

module.exports = { shuffle, range };
