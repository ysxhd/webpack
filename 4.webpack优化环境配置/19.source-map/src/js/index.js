// 引入
import '../css/iconfont.css';
import '../css/index.less';
import print from './print';
console.log('index.js文件被重新加载');

function add(x, y) {
    return x + y;
}
print();

console.log(add(1, 2));

if (module.hot) {
    // 一旦module.hot 为true,说明开启了HMR功能. --> 让HMR功能生效
    module.hot.accept('./print.js', function () {
        // 方法会监听print.js文件的变化,一旦发生变化,其他模块默认不会重新打包构建
        // 会执行后面的回调函数
        print();
        console.log('热替换生命周期监听');
    })
}