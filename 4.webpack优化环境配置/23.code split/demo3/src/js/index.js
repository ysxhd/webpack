function sum(...arg) {
  return arg.reduce((p, c) => p + c, 0);
}
/**
 * 通过js代码，让某个文件被单独打包成一个chunk
 */
import('./test.js')
  .then((res) => {
    // eslint-disable-next-line
    console.log(mul, "文件加载成功", res);
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log("文件加载失败");
  });
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));
// eslint-disable-next-line