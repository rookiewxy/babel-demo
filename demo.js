import babel from '@babel/core';
import fs from 'fs'
// 将文件内容读取为字符串
const content = fs.readFileSync('./1.js', 'utf-8');
// 在这里我们指明：我们的代码采用 ESM(EcmaScript modules) 模块系统，babel 会基于 ESM 的语法寻找文件的依赖关系
const ast = babel.parseSync(content, {
  sourceType: 'module',
});
babel.traverse(ast);

const {code} = babel.transformFromAstSync(ast, null, {
  presets: ['@babel/preset-env'],
});
console.log(code)