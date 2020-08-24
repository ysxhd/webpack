import '../css/index.css';
import '../css/index222.css';

function sum(...arg) {
  return arg.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));