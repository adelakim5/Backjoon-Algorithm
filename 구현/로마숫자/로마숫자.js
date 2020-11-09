const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
let arabSum = 0;
let objForRome = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };

for (let romeNum of input) {
  const arabNum = convertToArabNum(romeNum);
  console.log(arabNum);
  arabSum += arabNum;
}

console.log(arabSum + "\n" + convertToRomeNum(arabSum));

function convertToRomeNum(arabSum) {
  let answer = "";
  while (arabSum > 0) {
    const str = arabSum.toString();
    const n = str.length;
    if (n === 4) {
      answer += "M";
      arabSum -= 1000;
    } else if (n === 3) {
      if (str[0] === "9") {
        answer += "CM";
        arabSum -= 900;
      } else if (str[0] === "4") {
        answer += "CD";
        arabSum -= 400;
      } else {
        if (+str[0] >= 5) {
          answer += "D";
          arabSum -= 500;
        } else {
          answer += "C";
          arabSum -= 100;
        }
      }
    } else if (n === 2) {
      if (str[0] === "9") {
        answer += "XC";
        arabSum -= 90;
      } else if (str[0] === "4") {
        answer += "XL";
        arabSum -= 40;
      } else {
        if (+str[0] >= 5) {
          answer += "L";
          arabSum -= 50;
        } else {
          answer += "X";
          arabSum -= 10;
        }
      }
    } else if (n === 1) {
      if (str[0] === "9") {
        answer += "IX";
        arabSum -= 9;
      } else if (str[0] === "4") {
        answer += "IV";
        arabSum -= 4;
      } else {
        if (+str[0] >= 5) {
          answer += "V";
          arabSum -= 5;
        } else {
          answer += "I";
          arabSum -= 1;
        }
      }
    }
  }
  return answer;
}

function convertToArabNum(romeNum) {
  let arabNum = 0;
  for (let i = 0; i < romeNum.length; ) {
    const pre = romeNum[i];
    const curr = i + 1 < romeNum.length ? romeNum[i + 1] : undefined; // 로마 숫자가 1글자일때를 생각해주어야 함
    // console.log(`pre: ${pre}, curr: ${curr}`);
    let flag = false;
    if (pre === "I") {
      if (curr === "V" || curr === "X") {
        arabNum += objForRome[pre + curr];
        flag = true;
        i += 2;
      }
    } else if (pre === "X") {
      if (curr === "L" || curr === "C") {
        arabNum += objForRome[pre + curr];
        flag = true;
        i += 2;
      }
    } else if (pre === "C") {
      if (curr === "D" || curr === "M") {
        arabNum += objForRome[pre + curr];
        flag = true;
        i += 2;
      }
    }
    if (!flag) {
      arabNum += objForRome[pre];
      i++;
    }
  }
  return arabNum;
}
