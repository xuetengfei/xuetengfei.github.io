const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
const pipe = fns => fns.reduce((f, g) => (...args) => g(f(...args)));
const negate = func => (...args) => !func(...args);
const filterMovie = arr => arr.filter(v => v.category == 'movie');
const filterNovel = arr => arr.filter(v => v.category == 'novel');
const addKey = arr =>
  arr.map((v, i) => ({
    ...v,
    key: i,
  }));

const ReverseOrder = arr => arr.reverse();

let Data = Object.create(null);
Data.all = pipe([ReverseOrder, addKey])(Article);
Data.movie = pipe([filterMovie, addKey])(Article);
Data.novel = pipe([filterNovel, addKey])(Article);
