#!/usr/bin/env node
const readline = require('readline');
const path = require('path');
const fs = require('fs');

// 要检测的文件名
const catalogue = 'Progress';

// 绝对路径，用来生成 mv 命令
const source = '/Users/xue/Desktop/Project/XUE/_doc/engineering';

if (!catalogue) {
  console.log('Miss catalogue name');
  return;
}

const articleList = [];
const sidebarPath = path.join(__dirname, `./${catalogue}/_sidebar.md`);

const existsMdFiles = fs.readdirSync(path.join(__dirname, `./${catalogue}`));
let input = fs.createReadStream(sidebarPath);
const rl = readline.createInterface({
  input: input,
});
rl.on('line', line => {
  if (!line.includes('md') || line.includes('<!')) {
    return;
  }
  const sIdx = line.lastIndexOf('/') + 1;
  const eIdx = line.lastIndexOf(')');
  const name = line.slice(sIdx, eIdx);
  articleList.push(name);
});

rl.on('close', () => {
  const mdNames = articleList.filter(v => !existsMdFiles.includes(v));
  console.log(`读取完毕！不在 ${catalogue} 目录的文件是`, mdNames);
  if (source) {
    const cmd = mdNames.map(v => `${source}/${v}`).join(' ');
    console.log(`mv ${cmd} ${catalogue}`);
    return;
  }
  console.log(`在根目录执行 mv some-path/Mocha.md ${catalogue}`);
});
