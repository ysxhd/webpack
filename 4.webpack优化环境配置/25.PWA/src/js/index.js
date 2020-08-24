import {
  mul,
} from './test';
import '../css/index.css';

function sum(...arg) {
  return arg.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(mul(2, 3))
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

/**
 * 1.eslint不认识window、navigator全局变量
 * 解决：需要修改package.json中eslintConfig配置
 * 2.sw代码必须运行在服务器上
 * --> nodejs
 * --> npm serve -g
 */
// 注册serviceworker
// 处理兼容性问题

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    window.navigator.serviceWorker.register('./service-worker.js')
      .then(() => {
        // eslint-disable-next-line
        console.log('service-workder 注册成功');
      })
      .catch(() => {
        // eslint-disable-next-line
        console.log('service-workder 注册失败');
      });
  });
}
