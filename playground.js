const log = console.log;

const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
const isIterable = (a) => a && a[Symbol.iterator];

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) {
      res.push(a)
    }
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a)
  }
  return acc;
});

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});
const takeAll = take(Infinity);
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};

L.range = function* (ㅣ) {
  let i = -1;
  while (++i < ㅣ) {
    yield i;
  }
};

L.map = function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
};

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
};

L.deepFlat = function* recur(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* recur(a);
    else yield a;
  }
}

const flatten = pipe(L.flatten, takeAll);

