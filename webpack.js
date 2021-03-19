const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = (filename = './src/main.js') => { // 得到文件名、依赖、源码
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module'
  });

  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({node}) {
      const dirname = path.dirname(filename); // src
      const newFile = './' + path.join(dirname, node.source.value); // Windows待验证
      dependencies[node.source.value] = newFile;
    }
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  });

  return {
    filename,
    dependencies,
    code
  }
}

const getDependenciesGraph = (entry) => { // 循环得到所有依赖文件
  const entryModule = moduleAnalyser(entry);
  const graphArray = [ entryModule ];
  for(let i = 0; i < graphArray.length; i++) {
    const { dependencies } = graphArray[i];
    if(dependencies) {
      for(let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]));
      }
    }
  }
  return graphArray.reduce((acc, { filename, dependencies, code }) => acc[filename] = { dependencies, code }, {})
}

const generateCode = (entry) => { // 生成代码，递归require模块
  const graph = JSON.stringify(getDependenciesGraph(entry));
  return `
    (function(graph){
      function require(module) {
        function insideRequire(relativePath) {
          return require(graph[module].dependencies[relativePath]);
        }
        var exports = {};
        (function(require, exports, code){
          eval(code)
        })(insideRequire, exports, graph[module].code);
        return exports;
      };
      require('${entry}')
    })(${graph});
  `
}