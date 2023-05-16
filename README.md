<h1 align="center">[Node js] Common.js | Universal task scripts</h1>

<h2 align="center"> Usage</h2>

```javascript
const utils = require('leadutils');
// const { time, obj, string, time, net, crypto, utils, oop, fp, pp, async } = utils;
console.log(utils.time.prettify('h:m:s / D.M|Y', new Date())); // 18:50:54 / 07.05|2023
```

<h2 align="center"> Modules</h2>

<details open>

  <summary width="100%" align="center">Time module | <b>.time</b></summary><br/>

- **(prettify)** Return date in any string format

```ts
prettify(format: string, date?: Date | string | number) => string;
// format is any combination of letters [YMDhmsi] with any optional separators
// Y - Year; M - Month; D - Day; h - Hours; m - Minute; s - Second; i - Millisecond
```

```javascript
const utils = require('leadutils');
utils.time.prettify('h:m:s / D.M|Y', new Date()); // 18:50:54 / 07.05|2023
utils.time.prettify('h-m-s.i', new Date()); // 18-50-54.045
```

- **(duration)** Return duration in ms from string

```ts
function duration(time: string): number;
// time is any combination of letters [dhms] with values
// d - Day; h - Hours; m - Minute; s - Second;
// Example: 1d 1h 1m 1s 90061000
```

```javascript
const utils = require('leadutils');
utils.time.duration('5s'); // 5000
utils.time.duration('24h'); // 86400000
utils.time.duration('1d'); // 86400000
utils.time.duration('1d 1h 1m 5s'); // 90065000
```

- **(compare)** Create any dates compare functions

```javascript
const utils = require('leadutils');
utils.time.compare((a, b) => a > b)('2023-05-07', '2023-05-08'); // false
utils.time.compare((a, b) => a > b)('2023-01-01', '2021-05-08'); // true
```

- **(formatDuration)** Make seconds in more readable format

```javascript
const utils = require('leadutils');
utils.time.formatDuration(1000); // 1 second
utils.time.formatDuration(60000); // 1 minute
utils.time.formatDuration(60001); // 1 minute 1 second
utils.time.formatDuration(90000); // 1 minute 30 seconds
```

- **(divideDuration)** Get a divided ms by all day time measurements object

```javascript
const utils = require('leadutils');
utils.time.divideDuration(new Date()); // { day: 19484, hour: 16, minute: 6, second: 34, millisecond: 818 }
utils.time.divideDuration(90020); // { day: 0, hour: 0, minute: 1, second: 30, millisecond: 20 }
```

- **(datesDiff)** Return difference between two dates in any time measurement

```javascript
const utils = require('leadutils');
let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
utils.time.datesDiff(new Date(), tomorrow); // 1
utils.time.datesDiff(new Date(), tomorrow, 'hour'); // 24
```

</details><br/>

<details>

<summary width="100%" align="center">Parallel programming module | <b>.pp</b></summary><br/>

**(Semaphore)** for limit concurrency accessing limited resource

```ts
class Semaphore(concurrency: number, size?: number, timeout?: number){
  empty: boolean;
  enter: Promise<boolean>;
  leave: void;
}
```

</details><br/>

<details>
  <summary width="100%" align="center">Different utils module | <b>.utils</b></summary><br/>

- **(shuffle)** Shuffle array

```javascript
const utils = require('leadutils');
utils.array.shuffle([1, 2, 3]); // ~[2,3,1]
```

- **(sample)** Get sample from array

```javascript
const utils = require('leadutils');
utils.array.sample([1, 2, 3]); // ~2
utils.array.sample([1, 2, 3]); // ~3
utils.array.sample([1, 2, 3]); // ~2
```

- **(range)** Creates array from range

```javascript
const utils = require('leadutils');
utils.array.range(4, 7); // [4,5,6,7]
```

- **(random)** Generate a random number

```javascript
const utils = require('leadutils');
utils.utils.random(0, 5); // 2
utils.utils.random(0, 5); // 4
```

- **(equals)** Deep equals for any type of values

```javascript
const utils = require('leadutils');
utils.utils.equals(0, 0); // true
utils.utils.equals('test', 'test'); // true
utils.utils.equals([1, 2], [1, 2]); // true
utils.utils.equals([1, 2], [1, 2, 3]); // false
utils.utils.equals({ a: true, b: { foo: true } }, { a: true, b: { foo: true } }); // true
utils.utils.equals({ a: true, b: { foo: true } }, { a: true, b: { foo: true, bar: true } }); // false
```

- **(prettyBytes)** Return more readable bytes format

```javascript
const utils = require('leadutils');
utils.utils.prettyBytes(10000000); // 10 MB
utils.utils.prettyBytes(1); // 1 B
```

- **(mostPerformant)** Select fastest method

```javascript
const utils = require('leadutils');
utils.utils.mostPerformant([() => 1 + 2, () => 1 * 2, () => 1 / 2, () => 1 - 2]); // ~0
```

- **(timeTaken)** Log execution time

```javascript
const utils = require('leadutils');
utils.utils.timeTaken((a, b) => a + b)(2 + 3); // return 5; log => timeTaken: 0.297ms
```

</details><br/>

<details>
  <summary width="100%" align="center">Async programming module | <b>.async</b></summary><br/>

```ts
function delay(msec: number, signal?: EventEmitter): Promise<void>;
function timeout(msec: number, signal?: EventEmitter): Promise<void>;
```

- **(delay)** Promise resolve after provided msec, with abort controller

```javascript
const utils = require('leadutils');
utils.async.delay('10s').then(() => console.log('after delay'));
```

- **(timeout)** Promise resolve if signal was passed in provided ms, else reject

```ts
function delay(msec: number, signal?: EventEmitter): Promise<void>;
```

```javascript
const utils = require('leadutils');
utils.async.delay('10s').then(() => console.log('after delay'));
```

</details><br/>

<details>
  <summary width="100%" align="center">Network utils module | <b>.net</b></summary><br/>

- **(receiveBody)** Stream body receiver

```ts
function receiveBody(stream: IncomingMessage): Promise<Buffer | null>;
```

- **(createXML)** Create XML response

```javascript
const utils = require('leadutils');
const xmlBody = utils.net
  .createXML()
  .add({ loc: 'https://leadfisher.ru/', priority: 1, time: '2022-04-12' })
  .add({ loc: 'https://leadfisher.ru/test', priority: 0.4, time: '2022-04-10' }).get;
// <?xml version="1.0" encoding="UTF-8"..
```

- **(intIP)** Get ip integer interpretation

```javascript
const utils = require('leadutils');
utils.net.intIP('127.0.0.1'); // 2130706433
```

- **(parseCookie)** Parse cookie from string

```javascript
const utils = require('leadutils');
let cookie = 'test=123;';
utils.net.parseCookie(cookie); // {test: 123}
```

- **(removePort)** Parse cookie from string

```javascript
const utils = require('leadutils');
utils.net.removePort('https://leadfisher.ru/api/test'); // https://leadfisher.ru
```

</details><br/>

<details>
  <summary width="100%" align="center">String manipulations utils | <b>.string</b></summary><br/>

- **(escape, escapeHTML, unescapeHTML)** Escape unfriendly characters

```javascript
const utils = require('leadutils');
utils.string.escape('https://leadfisher.ru'); // 'https:\\/\\/leadfisher\\.ru'
utils.string.escapeHTML('<script>alert("leadfisher !");</script>'); // &lt;script&gt;alert(&quot;leadfisher !&quot;);&lt;script&gt;
utils.string.unescapeHTML('&lt;script&gt;alert(&quot;leadfisher !&quot;);&lt;script&gt;'); // <script>alert("leadfisher !");</script>
```

- **(template)** String templates

```javascript
const utils = require('leadutils');
const template = utils.string.template`Hello ${'put_here'} !`;
template({ put_here: 'Alex' }); // Hello Alex !
template({ put_here: 'Admin' }); // Hello Admin !
```

- **(yesNo)** Parse user answers

```javascript
const utils = require('leadutils');
utils.string.yesNo('yes'); // true
utils.string.yesNo('y'); // true
utils.string.yesNo('n'); // false
utils.string.yesNo(''); // false
```

- **(words)** Parse all words from string

```javascript
const utils = require('leadutils');
utils.string.words('Hello word!'); // ['Hello', 'word']
```

- **(reverse)** String or Array reverse

```javascript
const utils = require('leadutils');
utils.string.reverse('Hello word!'); // !word olleH
utils.string.reverse([1, 2, 3]); // 321
```

- **(phonePrettify, phonePurify, normalizeEmail)** Phone manipulations utils

```javascript
const utils = require('leadutils');
utils.string.phonePrettify('79999999999'); // +7 (999) 999-99-99
utils.string.phonePurify('+7 (999) 999-99-99'); // 79999999999
utils.string.normalizeEmail('Test@MAIL.domain', 'Test@mail.domain'); // 321
```

- **(fileExt, fileName)** System path manipulation utils

```javascript
const utils = require('leadutils');
utils.string.fileExt('/home/user/index.js'); // js
utils.string.fileName('/home/user/index.js'); // index
```

- **(toString, fromString, isValidJSON, jsonParse)** String parsers

> jsonParse and fromString are both safe parsers

```javascript
const utils = require('leadutils');
utils.string.toString(1); // '1'
utils.string.toString(true); // 'true'
utils.string.toString(undefined); // 'undefined'
utils.string.fromString('test'); // 'test'
utils.string.toString({ foo: { boo: true } }); // '{"foo": { "boo": true }}'
utils.string.fromString('1'); // 1
utils.string.fromString('true'); // true
utils.string.fromString('undefined'); // undefined
utils.string.fromString('test'); // 'test'
utils.string.fromString('{"foo": { "boo": true }}'); // { foo: { boo: true } }
utils.string.isValidJSON('{}'); // true
utils.string.jsonParse('{}'); // {}
utils.string.jsonParse(''); // null
utils.string.jsonParse(123); // null
utils.string.isValidJSON({}); // false
```

</details><br/>

<details>
  <summary width="100%" align="center">Objects manipulation utils | <b>.obj</b></summary><br/>

- **(deepClone)** Clone object with all nested objects, no reference copies

```javascript
const utils = require('leadutils');
const test = { foo: { boo: { bar: 2 } } };
const copy = utils.obj.deepClone(test);
copy.foo.boo.bar = 0;
console.dir(test.foo.boo, copy.foo.boo); // { bar: 2 };  { bar: 0 };
```

- **(deepFreeze)** Freeze Object with all nested objects

```javascript
const utils = require('leadutils');
const test = { foo: { boo: { bar: 2 } } };
utils.obj.deepFreeze(test);
test.foo.boo.bar = 0;
console.dir(test.foo.boo); // { bar: 2 };
```

- **(deepFlatten)** Put nested array items in root array

```javascript
const utils = require('leadutils');
const test = [[1, 2, 3], [4, 5], 6, 7];
utils.obj.deepFlatten(test); // new [1,2,3,4,5,6,7]
```

- **(deepFlattenObject)** Put all nested objects properties in root object

```javascript
const utils = require('leadutils');
const test = { foo: { boo: { bar: 2 } } };
utils.obj.deepFlattenObject(test); // new {'foo.boo.bar': 2}
```

- **(dig)** Search for properties deep inside object

```javascript
const utils = require('leadutils');
const test = { foo: { boo: { bar: 2 } } };
const bar = utils.obj.dig('bar', test);
console.dir(bar); // 2;
```

</details><br/>

<details>
  <summary width="100%" align="center">Object orientated programming | <b>.oop</b></summary><br/>

- **(setDefault)** Overload operator `[]` to return default value if key not fount in object

```javascript
const utils = require('leadutils');
const test = { foo: { boo: { bar: 2 } } };
const bar = utils.oop.setDefault(test, 'not found');
console.log(bar['some key']); // not found
```

- **(defineGetter)** Add getter to object

```javascript
const utils = require('leadutils');
const test = { foo: { boo: { bar: 2 } } };
const bar = utils.oop.defineGetter(test)('key', () => 'value');
console.dir(bar.key); // value
```

- **(defineSetter)** Add setter to object

```javascript
const utils = require('leadutils');
const test = { foo: { boo: { bar: 2 } } };
const bar = utils.oop.defineSetter(test)('key', value => console.log(value));
bar.key = 3; // 3;
```

- **(mixin)** Mix two objects together, with optimization

```javascript
const utils = require('leadutils');
const test = { foo: { boo: { bar: 2 } } };
utils.oop.mixin(test, { bus: { foo: 4 }, foo: 3 });
// test = { foo: { boo: { bar: 2 } }, bus: { foo: 4 } }
```

</details><br/>

<details>
  <summary width="100%" align="center">Functional programming | <b>.fp</b></summary><br/>

- **(pipe, pipeAsync)** Combine multiple functions into one

```javascript
const utils = require('leadutils');
const pipeMagic = utils.fp.pipe(
  v => v + 1,
  v => v * 3,
  v => console.log(v),
);
pipeMagic(0); // 3
```

- **(curry)** Function call after all arguments have been provided

```javascript
const utils = require('leadutils');
const test = utils.fp.curry((a, b, c, d) => a + b + c + d);
test(1)(2)(3, 4); // 10
```

- **(once)** Limit count of function calls to single one

```javascript
const utils = require('leadutils');
const test = utils.fp.once((a, b, c, d) => a + b + c + d);
test(1, 2, 3, 4); // 10
test(1, 2, 3, 4); // undefined
```

- **(times)** Call function multiple times

```javascript
const utils = require('leadutils');
const ctx = { count: 0 };
utils.fp.times(5, (ctx, i) => (ctx.count += i), ctx);
// ctx.count === 5
```

- **(memoize)** Cache wrapper for functions

```javascript
const utils = require('leadutils');
const test = utils.fp.memoize((a, b, c, d) => a + b + c + d);
test(1, 2, 3, 4); // cache hit
test(1, 2, 3, 4); // cached value
```

- **(chain)** Chain functions to custom context, after all calls returns provided context

```javascript
const utils = require('leadutils');

const ctx = { counter: 0 };
const chain = utils.fp.chain(ctx);
ctx.add = chain(v => (chain += v));
ctx.add(1).add(2).add(3).add(4).counter; // 10
```

- **(debounce)** It ensures that one notification is made for an event that fires multiple times.

```javascript
const utils = require('leadutils');
const debounceTest = utils.fp.debounce(() => console.log('Working'), 1000);
debounceTest();
debounceTest();
// working
setTimeout(() => debounceTest(), 1000);
// working
```

- **(throttle)** It will reduce the notifications of an event that fires multiple times.

```javascript
const utils = require('leadutils');
const throttleTest = utils.fp.throttle(() => console.log('Working'), 1000);
throttleTest();
throttleTest();
// working
setTimeout(() => throttleTest(), 1000);
// working
```

</details><br/>

<details>
  <summary width="100%" align="center">Crypto utils | <b>.crypto</b></summary><br/>

- **(hashPassword)** Asynchronous password hashing

```javascript
const utils = require('leadutils');
utils.crypto.hashPassword('secret').then(hash => console.log(hash));
// $scrypt$N=32768,r=8,p=1,maxmem=67108864$wgAA6YiiNmz2iJUx6kAvjh+cSZc7pbCvQW7r5Z2fWbs$gN84NkBtXtwoL3LZXMJEjeLoRlNjyZUV5joX+Fedk5bhE6cK2mcwpRVJV5ymcGq66NSNXAB63duDWS1eCbO3hA
```

- **(validatePassword)** Asynchronous password validation

```javascript
const utils = require('leadutils');
const hash =
  '$scrypt$N=32768,r=8,p=1,maxmem=67108864$wgAA6YiiNmz2iJUx6kAvjh+cSZc7pbCvQW7r5Z2fWbs$gN84NkBtXtwoL3LZXMJEjeLoRlNjyZUV5joX+Fedk5bhE6cK2mcwpRVJV5ymcGq66NSNXAB63duDWS1eCbO3hA';
utils.crypto.validatePassword('secret', hash).then(flag => console.log(flag)); // true
utils.crypto.validatePassword('hacker', hash).then(flag => console.log(flag)); // false
```

</details><br/>

<h2 align="center">Copyright & contributors</h2>

<p align="center">
Copyright © 2023 <a href="https://github.com/LeadFisherSolutions/Leadutils/graphs/contributors">Leadfisher contributors</a>.
Leadutils is <a href="./LICENSE">MIT licensed license</a>.<br/>
Leadutils is one of <a href="https://github.com/LeadFisherSolutions">leadfisher solutions</a>.
</p>
