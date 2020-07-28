const log = (desc, what) => {
  what ? console.log(`${desc} is:`, what) : console.log(desc);
};
const divider = () => console.log('====================================');
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
/* ============== The upper region is global ============ */
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
{
  const fetch = ms => {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(ms);
      }, ms * 1000);
    });
  };

  const handler = {
    apply: function (target, _context, args) {
      console.log('target: ', target);
      return target(...args);
    },
  };

  const Task = new Proxy(fetch, handler);

  Task(1)
    .then(res => console.log(res))
    .catch();

  function sum(a, b) {
    return a + b;
  }

  const handler1 = {
    apply: function (target, thisArg, argumentsList) {
      console.log('target: ', target);
      console.log('argumentsList: ', argumentsList);
      console.log(`Calculate sum: ${argumentsList}`);
      return target(argumentsList[0], argumentsList[1]) * 10;
    },
  };

  const proxy1 = new Proxy(sum, handler1);

  console.log(sum(1, 2));
  // expected output: 3
  console.log(proxy1(1, 2));
  // expected output: 30
}

return;
{
  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */
  /* =============     event loop     ===================== */
  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */

  setTimeout(() => {
    log('timer1');
    Promise.resolve().then(function () {
      log('promise1');
    });
  }, 0);

  setTimeout(() => {
    log('timer2');
    Promise.resolve().then(function () {
      log('promise2');
    });
  }, 0);
}

// return; // run code stop in here

{
  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */
  /* ==================      oop      ===================== */
  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */

  divider();
  /* ES6  */
  class A {
    constructor(type) {
      this.a = 10;
      this.type = type;
    }
    print() {
      log(this.a, this.b, this.type);
    }
  }

  let a = new A('alphabet-a');
  log('a: ', a); // a:  A { a: 10, type: 'alphabet-a' }
  a.print(); // 10 undefined alphabet-a

  class B extends A {
    constructor(type, c) {
      super(type);
      this.b = 20;
      this.c = c;
    }
    print() {
      super.print();
      log('b own print function');
    }
  }

  divider();
  let b = new B('alphabet-b', 30);
  log('b : ', b); // b :  B { a: 10, type: 'alphabet-b', b: 20, c: 30 }
  b.print();
  // 10 20 alphabet-b
  // b own print function

  /* ES5  */
  function C(d) {
    this.c = 100;
    this.d = d;
  }

  C.prototype.print = function () {
    console.log(this.c, this.d);
  };

  divider();
  let c = new C(150);
  log('c: ', c); // c:  C { c: 100, d: 150 }
  c.print(); // 100 150

  function D(d, e) {
    C.call(this, d);
    this.e = e;
  }
  D.prototype = Object.create(C.prototype);
  D.prototype.constructor = D;
  D.prototype.print = function () {
    console.log(this.c, this.d, this.e);
  };

  divider();
  let d = new D(150, 200);
  log(' d: ', d); // d:  D { c: 100, d: 150, e: 200 }
  d.print(); // 100 150 200

  console.log(Object.getPrototypeOf(d)); // D { constructor: [Function: D], print: [Function (anonymous)] }
  console.log(d.constructor); // [Function: D]
  divider();
}

/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
/* ==================      redux      =================== */
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
return;
{
  const Redux = require('redux');
  const colors = require('colors');

  /* helper fn */
  const printStore = () =>
    console.log(JSON.stringify(store.getState(), null, 2));
  const log = str => console.log(colors.green.underline(str));
  const log2 = str => console.log(colors.inverse(str));

  /* init value */
  const initialApple = {
    color: 'red',
    dirty: true,
    amount: 5,
  };

  /* Describes the type of operation */

  const WASH = { type: 'WASH' };
  const EAT = { type: 'EAT', number: 2 };
  const ROT = { type: 'ROT' }; // 腐烂

  function appleReducer(state = initialApple, action) {
    const { type } = action;
    const config = {
      WASH: {
        ...state,
        dirty: false,
      },
      EAT: {
        ...state,
        amount: Math.max(0, state.amount - action.number),
      },
      ROT: {
        ...state,
        color: 'brown',
      },
      default: state,
    };
    return config[type] || config.default;
  }

  /* Redux.createStore => store */
  const store = Redux.createStore(appleReducer, initialApple);
  log('init Store snapshot:');

  printStore();

  /* call subscribe event ,when  store has changed */
  store.subscribe(handleChange);

  log('dispatch `WASH`, Now the Store snapshot');
  store.dispatch(WASH);

  log('dispatch `EAT 2 bites`, Now the Store snapshot');
  store.dispatch(EAT);

  setTimeout(() => {
    log('dispatch `ROT`, Now the Store snapshot');
    store.dispatch(ROT);
  }, 1000);

  function handleChange() {
    printStore();
    const currentApple = store.getState();
    if (currentApple.color === 'red') {
      log2('Ediblea!');
    } else {
      log2('Inedible!');
    }
  }
}
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
/* ===============   robot message    =================== */
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
/* ====================================================== */
return;
{
  const fs = require('fs');
  const util = require('util');
  const axios = require('axios');

  const writeNameFilePromise = util.promisify(fs.writeFile);
  const readNameFilePromise = util.promisify(fs.readFile);

  const roster = ['胡xx', '谢xx', '郭xx', '邓xx', '李xx'];
  const url9 = `https://qyapi.weixin.qq.com/abc-xyz`;
  const arr = ['日', '一', '二', '三', '四', '五', '六'];

  const logFile = `${__dirname}/log`; // jenkins IO file
  // or
  const nameFile = `${__dirname}/name.json`;

  function Echo({ dayInfo, todayPeople, tomorrowPeople }) {
    const Message = `${dayInfo} <font color="info"> 9:50 晨会 
    </font>,今天由<font color="info">${todayPeople}</font>主持，
    明天轮至 ${tomorrowPeople} 。`;

    axios
      .post(url9, {
        msgtype: 'markdown',
        markdown: {
          content: `${Message}`,
        },
      })
      .then(() => {
        console.log('Bot sendMessage Success !');
      })
      .catch(error => {
        console.error(error);
      });
  }
  {
    // 1
    async function Run() {
      const week = new Date().getDay();
      if ([0, 6].includes(week)) {
        return;
      }
      const dayInfo = `今天是${new Date().toLocaleDateString()}，星期${
        arr[week]
      },`;
      const asyncList = [readNameFilePromise(logFile, {})];
      try {
        const [getLog] = await Promise.all(asyncList);
        if (!getLog) {
          console.log('error');
          return;
        }
        const log = await JSON.parse(getLog.toString());
        const len = roster.length;
        const todayPeople = roster[log % len];
        const tomorrowPeople = roster[(log % len) + 1] || roster[0];
        Echo({
          dayInfo,
          todayPeople,
          tomorrowPeople,
        });
      } catch (error) {
        console.log('error: ', error);
      }
    }
    Run();
  }
  {
    // 2
    async function Run() {
      const week = new Date().getDay();
      if ([0, 6].includes(week)) {
        return;
      }
      const dayInfo = `今天是${new Date().toLocaleDateString()}，星期${
        arr[week]
      },`;
      const asyncList = [readNameFilePromise(nameFile, {})];
      try {
        const [getPerson] = await Promise.all(asyncList);
        const personList = await JSON.parse(getPerson.toString());
        const tomorrowPeople = personList[1];
        const todayPeople = personList.shift();
        personList.push(todayPeople);
        Echo({
          dayInfo,
          todayPeople,
          tomorrowPeople,
        });
        const newPersonList = JSON.stringify(personList);
        writeNameFilePromise(nameFile, newPersonList);
      } catch (error) {
        console.log('error: ', error);
      }
    }
    Run();
  }
}
