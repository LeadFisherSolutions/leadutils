// /** @returns shuffled array */
type MAP = { [k: string]: unknown };

export const time: {
  prettify: (format: string, date: Date | number | string) => string;
  measures: (ms: number) => { day: number; hour: number; minute: number; second: number; millisecond: number };
  format: (ms: number) => string;
  duration: (time: string) => number;
  diff: (a: Date, b: Date, measure?: 'day' | 'hour' | 'minute' | 'second' | 'millisecond') => number;
  compare: (fn: (a: number, b: number) => boolean) => (a: Date, b: Date) => boolean;
};

export const utils: {
  XMLBuilder: () => { add: (url: { loc: string; time: string; priority: string }) => XMLBuilder; get: () => string };
  mixin: (target: object, source: object) => object;
  defineSetter: (target: object) => (name: string, callback: (value: unknown) => void) => void;
  defineGetter: (target: object) => (name: string, callback: () => unknown) => void;
  setDefault: <T>(target: T, defaultValue: any) => T;
  shuffle: <T>(arr: Array<T>) => Array<T>;
  range: (from: number, to: number) => Array<number>;
  random: (min: number, max?: number) => number;
  equals: (a: unknown, b: unknown) => boolean;
  mostPerformant: (fns: Function[], iterations?: number) => number;
  prettyBytes: (num: number, precision?: number, addSpace?: boolean) => string;
  timeTaken: <T extends Function>(fn: T) => (...args: Parameters<T>) => ReturnType<T>;
};

export const string: {
  parse: {
    extension: (name: string) => string;
    fileName: (name: string) => string;
    words: (s: string) => string[];
    phone: (phone: string) => string;
    email: (email: string) => string;
    json: (str: string) => boolean;
    any: (str: string) => unknown;
  };
  escape: {
    regexp: (s: string) => string;
    html: (s: string) => string;
    unescapeHTML: (s: string) => string;
  };
  template: (s: string[], ...keys: string[]) => (values: MAP) => string;
  toString: (target: any) => string;
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
  chain: <T>(returnPoint: T) => <J extends (...args: unknown[]) => unknown>(fn: J) => J;
};

export const net: {
  intIP: (ip: string) => number;
  parseCookie: (cookie: string) => object;
  removePort: (str: string) => string;
  createXML: (result: string) => XMLBuilder;
};

export const async: {
  timeout: (msec: number, signal?: EventEmitter) => Promise<void>;
  delay: (msec: number, signal?: EventEmitter) => Promise<void>;
};
