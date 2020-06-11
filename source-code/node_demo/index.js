// console.log(__dirname);
// console.log(__filename);
const fs = require('fs');

fs.mkdir('stuff', () => {
  fs.readFile('hello.txt', 'utf8', (err, data) => {
    console.log(data); // 锄禾日当午
    fs.writeFile('./stuff/write.txt', data, err => {
      console.log(data); // 锄禾日当午
    });
  });
});
