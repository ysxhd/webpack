const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const babel = require('@babel/core');
const getModuleInfo = (file) => {
    const body = fs.readFileSync(file, 'utf-8')
    const ast = parser.parse(body, {
        sourceType: 'module' // 表示我们要解析的是es6模块
    });
    const deps = {}; // 收集依赖路径
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(file);
            let abspath = './' + path.join(dirname, node.source.value);
            // windowsj路径反斜杠
            abspath = abspath.replace('\\', '/') + '.js';
            deps[node.source.value] = abspath;
        }
    })
    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    });
    const moduleInfo = { file, deps, code };
    // console.log(moduleInfo)
    return moduleInfo;
}
// getModuleInfo('./src/index.js')

const parseModules = (file) => {
    const depsGraph = {};
    // 获取入口文件信息
    const entry = getModuleInfo(file);
    const temp = [entry];
    for (let i = 0; i < temp.length; i++) {
        const deps = temp[i].deps;
        if (deps) {
            // 遍历模块依赖 递归获取模块信息
            for (const key in deps) {
                if (deps.hasOwnProperty(key)) {
                    temp.push(getModuleInfo(deps[key]));
                }
            }
        }
    }
    temp.forEach(moduleInfo => {
        depsGraph[moduleInfo.file] = {
            deps: moduleInfo.deps,
            code: moduleInfo.code
        }
    });
    console.log(depsGraph);
    return depsGraph;
}
parseModules('./src/index.js')