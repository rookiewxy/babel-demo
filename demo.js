const babel = require('@babel/core')
const fs = require('fs')

const content = fs.readFileSync('./1.js', 'utf-8');

const ast = babel.parseSync(content, {
  sourceType: 'module',
});
babel.traverse(ast);
console.log(ast);

const {code} = babel.transformFromAstSync(ast, null, {
  presets: ['@babel/preset-env'],
});
console.log(code)