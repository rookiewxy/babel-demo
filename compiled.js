"use strict";

var _core = _interopRequireDefault(require("@babel/core"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 将文件内容读取为字符串
var content = _fs["default"].readFileSync('./1.js', 'utf-8'); // 在这里我们指明：我们的代码采用 ESM(EcmaScript modules) 模块系统，babel 会基于 ESM 的语法寻找文件的依赖关系


var ast = _core["default"].parseSync(content, {
  sourceType: 'module'
});

_core["default"].traverse(ast);

var _babel$transformFromA = _core["default"].transformFromAstSync(ast, null, {
  presets: ['@babel/preset-env']
}),
    code = _babel$transformFromA.code;

console.log(code);
