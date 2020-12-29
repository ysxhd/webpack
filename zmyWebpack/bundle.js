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
        ImportDeclaration({ node }) {;
            const dirname = path.dirname(file);
            const abspath = './' + path.join(dirname, node.source.value);
            deps[node.source.value] = abspath;
        }
    })
    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    });
    const moduleInfo = { file, deps, code };
    return moduleInfo;
}

const parseModules = (file) => {
    // 获取入口文件信息
    const entry = getModuleInfo(file);
    const temp = [entry];
    for(let i = 0; i < temp.length; i++) {
        const deps = temp[i];
        if(deps){
            // 遍历模块依赖 递归获取模块信息
            for(const key in deps){
                if(deps.hasOwnProperty(key)){
                    temp.push(getModuleInfo(deps[key]));
                }
            }
        }
    }
    console.log(temp);
}
parseModules('./src/index.js')