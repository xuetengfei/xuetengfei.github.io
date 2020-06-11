let GameConfig = (() => {
  let Step = 0;
  let regretStep = 0;
  let latticeNumber = null;
  let currentSide = null;
  let isGameOver = false;
  const BLACK = 1; // 黑子 1
  const WHITE = 2; // 白子 2
  let AI = true;
  let coordinateList = [];
  let WHITElist = [];
  let BLACKlist = [];
  let gameHistory = Object.create(null);
  const root = document.getElementById('root');
  const ResultDom = document.getElementById('result');
  const menu = document.getElementsByClassName('menu')[0];
  const chessPoint = root.getElementsByTagName('span');
  const self = {
    draw: function() {
      for (let i = 0; i < Math.pow(latticeNumber, 2); i++) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        const map = [];
        for (let i = 0; i < latticeNumber; i++) {
          for (let j = 0; j < latticeNumber; j++) {
            map.push([i, j]);
          }
        }
        span.setAttribute('data-row', map[i][0]);
        span.setAttribute('data-column', map[i][1]);
        span.setAttribute('data-available', 'true');
        if (!AI) {
          span.innerText = `${map[i]}`;
        }
        div.appendChild(span);
        root.appendChild(div);
      }
    },
    stop: function() {
      isGameOver = true;
      ResultDom.innerText = isEven(Step - 1) ? '游戏结束:黑子胜' : '游戏结束:白子胜';
      menu.className = 'menu first1div';
    },
    handleClick: function() {
      root.onclick = function(ev) {
        if (isGameOver) {
          return;
        }
        currentSide = isEven(Step) ? BLACK : WHITE; // 黑子 1 白子 2
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == 'span') {
          if (target.dataset.available == 'true') {
            target.setAttribute('data-available', 'false');
            target.classList.add(currentSide == BLACK ? 'black' : 'white');
            const r = Number(target.dataset.row);
            const c = Number(target.dataset.column);
            Step += 1;
            self.renderMenu();
            let lastMap = gameHistory['S' + (Number(Step) - 1)];
            let currMap = deepClone(lastMap);
            currMap[r][c] = currentSide;
            self.recordHistory(currMap);
            if (AI) {
              self.accessArea(r, c);
            }
            if (Step >= 9) {
              if (versusResult(currMap, r, c, currentSide, latticeNumber - 1)) {
                self.stop();
              }
            }
          }
        }
      };
    },
    handleUserOperation: function() {
      menu.onclick = function() {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.id == 'restart') {
          self.restart();
        }
        if (target.id == 'regret') {
          if (!isGameOver) {
            self.UserRegret();
          }
        }
        if (target.id == 'revoke') {
          if (!isGameOver) {
            self.UserRevoke();
          }
        }
      };
    },
    recordHistory: function(map) {
      gameHistory['S' + Step] = map;
      // console.log(gameHistory);
    },
    restart: function() {
      Step = 0;
      gameHistory = Object.create(null);
      gameHistory['S' + Step] = emptyMap(latticeNumber);
      let empty = emptyMap(latticeNumber);
      self.renderPoint(empty);
      ResultDom.innerText = '';
      isGameOver = false;
      BLACKlist = [];
      WHITElist = [];
      regretStep = 0;
      menu.className = 'menu';
      console.log(gameHistory);
    },
    // 悔棋
    UserRegret: function() {
      if (!Step) {
        return;
      }
      regretStep += 1;
      self.renderMenu();
      let historyList = Object.keys(gameHistory);
      currentSide == BLACK ? BLACKlist.pop() : WHITElist.pop();
      Step -= 1;
      let lastHistoryMAP = gameHistory[historyList[Step]];
      self.renderPoint(lastHistoryMAP);
    },
    // 撤销悔棋
    UserRevoke: function() {
      regretStep -= 1;
      self.renderMenu();
      let historyList = Object.keys(gameHistory);
      let MaxStepNum = historyList.length - 1;
      if (MaxStepNum > Step) {
        Step += 1;
        let NextMap = gameHistory[historyList[Step]];
        self.renderPoint(NextMap);
      }
    },
    renderMenu: function() {
      if (Step) {
        menu.className = 'menu first2div';
      }
      if (regretStep) {
        menu.className = `menu alldiv`;
      }
    },
    renderPoint: function(blueprint) {
      flatten(blueprint).forEach((v, i) => {
        if (v === 0) {
          [...chessPoint][i].setAttribute('data-available', 'true');
          [...chessPoint][i].className = '';
        } else {
          [...chessPoint][i].className = v === BLACK ? 'black' : 'white';
          [...chessPoint][i].setAttribute('data-available', 'false');
        }
      });
    },
    init: function(num = 10) {
      latticeNumber = num + 1;
      gameHistory['S' + Step] = emptyMap(latticeNumber);
      self.draw();
      self.handleClick();
      self.handleUserOperation();
      self.renderMenu();
    },
    accessArea: function(r, c) {
      // 人机对战尚未完成
      const newPoint = [r, c];
      coordinateList.push(newPoint);
      const pointList = deepClone(coordinateList);
      calcArea(pointList);
      const map = gameHistory['S' + Step];
      currentSide == BLACK ? BLACKlist.push(newPoint) : WHITElist.push(newPoint);
      // console.log(newPoint);
      // console.log(BLACKlist);
      // console.log(WHITElist);
    },
  };
  return self.init;
})();

window.onload = function() {
  GameConfig();
};
