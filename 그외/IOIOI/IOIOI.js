const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const [n, m, s] = [+input[0], +input[1], input[2]];
let result = 0;
for (let i = 0; i < m; i++) {
  if (s[i + 1] === "O" && s[i + 2] === "I") {
    // OI패턴일때만
    let O = 0;
    while (s[i] === "I" && s[i + 1] === "O") {
      // IOI라는 것이 여기서 확인됨
      i += 2; // 맞으니까 +2씩
      O++; // O의 개수 세어줌
      if (s[i] === "I" && O === n) {
        // Pn과 일치하는 문자열 확인 완료
        O--; // 다음 일치하는 문자열 있는지 확인해주기 위해, 가장 처음 셌던 O 빼기
        result++; // 완료되었으므로 추가
      }
    }
  }
}

console.log(result);
