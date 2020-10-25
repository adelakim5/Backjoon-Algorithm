const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split(" ");
let [n, r, c] = input.map((e) => +e);
let y = Math.pow(2, n) / 2;
// 절반으로 나눔
let x = y;
// 마찬가지
let ans = 0;

while (n-- > 0) {
  // n을 하나씩 줄어들어.. 그러면 2^4 => 2^3 => 2^2
  let temp = Math.pow(2, n) / 2; // 2^3의 절반
  let skip = Math.pow(4, n); // 앞 분면 값 => n을 하나 줄였으니까 2에 2를 곱한 4로

  if (r < y && c < x) {
    // 1
    x -= temp;
    y -= temp;
    // x와 y의 범위를 줄여나감
  } else if (r < y && x <= c) {
    //   2
    x += temp;
    y -= temp;
    // x를 늘림
    ans += skip;
    // 1분면 크기 더함
  } else if (y <= r && c < x) {
    // 3
    x -= temp;
    y += temp;
    ans += skip * 2;
    // 2분면 크기 더함
  } else {
    // 4
    x += temp;
    y += temp;
    ans += skip * 3;
    // 3분면 크기 더함
  }
}

console.log(ans);
