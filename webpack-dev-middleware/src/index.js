'use strict'
import { test } from './block.js'
console.log('hello world~')

test()
// 接收热更新输出，只有accept才能被更新
if (module.hot) {
    module.hot.accept();
}
