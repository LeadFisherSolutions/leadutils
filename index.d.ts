// /** @returns shuffled array */
type XMLBuilder = { add: (url: { loc: string; time: string; priority: string }) => XMLBuilder; get: () => string };
type MAP = { [k: string]: unknown };

export const xml: {
  createXml: (result: string) => XMLBuilder;
};

export const time: {
  compare: (fn: (a: number, b: number) => boolean) => (a: Date, b: Date) => boolean;
  datePrettify: (format: string, date: Date | number | string) => string;
  formatDuration: (ms: number) => string;
  divideDuration: (ms: number) => { day: number; hour: number; minute: number; second: number; millisecond: number };
  datesDiff: (a: Date, b: Date, measure?: 'day' | 'hour' | 'minute' | 'second' | 'millisecond') => number;
};

export const array: {
  shuffle: <T>(arr: Array<T>) => Array<T>;
  range: (from: number, to: number) => Array<number>;
};

export const utils: {
  random: (min: number, max?: number) => number;
  equals: (a: unknown, b: unknown) => boolean;
  isValidJSON: (str: string) => boolean;
  mostPerformant: (fns: Function[], iterations?: number) => number;
  timeTaken: <T extends Function>(fn: T) => ReturnType<T>;
};

export const files: {
  fileExt: (name: string) => string;
  fileName: (name: string) => string;
  removeBOM: (s: string) => string;
  prettyBytes: (num: number, precision?: number, addSpace?: boolean) => string;
};

export const string: {
  escape: (s: string) => string;
  escapeHTML: (s: string) => string;
  unescapeHTML: (s: string) => string;
  template: (s: string[], ...keys: string[]) => (values: MAP) => string;
  normalizeEmail: (email: string) => string;
  phonePurify: (phone: string) => string;
  phonePrettify: (phone: string) => string;
  reverseString: (s: string) => string;
  yesNo: (s: string) => boolean;
  words: (s: string) => string[];
};

export const obj: {
  deepClone: <T extends Object>(obj: T) => T;
  deepFlatten: (obj: Array<unknown>) => Array<unknown>;
  deepFlattenObject: <T extends Object>(deepFlattenObject: T, prefix?: string) => unknown;
  deepFreeze: <T extends Object>(obj: T) => T;
  dig: <T extends Object>(obj: T, target: string) => unknown;
};

export const fp: {
  memoize: <T extends Function>(fn: T) => T;
  pipe: (...fns: Function[]) => (x: unknown) => unknown;
  pipeAsync: (...fns: Function[]) => (x: unknown) => unknown;
  curry: <T extends Function>(fn: T, arity?: number, ...args: Parameters<T>) => unknown;
  debounce: <T extends Function>(fn: T, ms?: number) => T;
  throttle: <T extends Function>(fn: T, wait?: number) => T;
  memoize: <T extends Function>(fn: T) => T;
  times: <T extends Function>(n: number, fn: T, context?: unknown) => void;
  once: <T extends Function>(fn: T) => T;
};

export const net: {
  URLJoin: (...args: string[]) => string;
  intIP: (ip: string) => number;
  // parseParams:
};
