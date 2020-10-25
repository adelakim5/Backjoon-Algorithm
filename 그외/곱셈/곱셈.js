const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split(" ");
const a = BigInt(input[0]);
const b = BigInt(input[1]);
const c = BigInt(input[2]);
// consoleBigInt, b, c);
// let rooBigIntath.sqrt(a);
// console.log(rootA);
// let nmg = rootA

const res = pow(a, b, c);
console.log(res.toString());

function pow(x, n) {
  if (!n) return 1n;

  if (n % 2n === 1n) return BigInt(x * pow(x, n - 1n)) % c;
  else {
    const half = pow(x, n / 2n);
    return BigInt(half * half) % c;
  }
}

// for (let i = 0; i < b; i++) {
//   res *= a;
//   console.log(res);
//   console.log("나머지:", res % c);
// }

// const answer = BigInt(Math.pow(a, b) % c);

// console.log(answer.toString());
