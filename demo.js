
import babel from '@babel/core';
import fs from 'fs'
// 将文件内容读取为字符串
const content = fs.readFileSync('./1.js', 'utf-8');
// 在这里我们指明：我们的代码采用 ESM(EcmaScript modules) 模块系统，babel 会基于 ESM 的语法寻找文件的依赖关系
const ast = babel.parseSync(content, {
  sourceType: 'module',
});
const dependencies = [];
// 使用 babel 提供的 traverse 方法遍历 AST并分析当前模块依赖的模块
// 具体方法是：我们检查 AST 中每个 import 声明语句
babel.traverse(ast, {
  // 由于 ESM 是静态的，所以要分析他很容易
  // “静态”意味着你不能引入一个变量，也不能根据条件引入其他模块
  // 每当我们看到一个 import 声明，就将他的值记录下来作为依赖
  ImportDeclaration: ({ node }) => {
    // 将 import 的值存入 dependencies 数组中
    dependencies.push(node.source.value);
  },
});
const {code} = babel.transformFromAstSync(ast, null, {
  presets: ['@babel/preset-env'],
});
console.log(code)