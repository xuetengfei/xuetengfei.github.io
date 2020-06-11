演示 redux 工作流

```javascript
const Redux = require('redux');
const colors = require('colors');

/* helper fn */
const printStore = () => console.log(JSON.stringify(store.getState(), null, 2));
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
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-12-10_14-56-09-1575961024.jpg' width='600px'/>
