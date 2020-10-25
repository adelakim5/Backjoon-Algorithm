const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const t = Number(input.shift())
// console.log(t)
if (t === 1) {

} else {
    let result = ''
    while(input.length !== 0){
        let index = 0
        let n = input[index]/1
        console.log(n)
        let scores = []
        for (let i = 1; i <= n; i++) {
            scores.push(input[i].split(' ').map(e => +e))
        }
        scores.sort((a, b) => a[0]-b[0])
        console.log("Score:", scores)
        let max = 0
    
        while(scores.length !== 0){
            let curr_score = scores.pop()
            let temp = [curr_score]
            for(let i=scores.length-1; i>=0; i--){
                if(scores[i][0] <= temp[temp.length-1][0] && scores[i][1] >= temp[temp.length-1][1]){
                    temp.push(scores[i])
                }
            }
            console.log("temp.length:", temp.length, temp)
            if(temp.length > max){
                max = temp.length
            }
        }
        result += max.toString() + "\n"
        input = input.slice(1+n, input.length)
        console.log("input", input)
    }
    console.log("result:", result)
}