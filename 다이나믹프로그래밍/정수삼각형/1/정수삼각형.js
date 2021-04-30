const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const n = input[0] / 1
let max = 0
if (n === 1) {
    console.log(input[1] / 1)
    return
}

let triangleElements = []
for (let i = 1; i < input.length; i++) {
    triangleElements.push(input[i].split(' ').map((e) => +e))
}
for(i=1; i<n; i++){
    for(let j=0; j<=i; j++){
        if(j === 0) triangleElements[i][j] += triangleElements[i-1][j]
        else if (i === j) triangleElements[i][j] += triangleElements[i-1][j-1]
        else {
            triangleElements[i][j] += Math.max(triangleElements[i-1][j-1], triangleElements[i-1][j])
        }
        if(max < triangleElements[i][j]) max = triangleElements[i][j]
    }
}

console.log(max)