const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const testCaseN = input[0]/1

let totalDocuments = []
for(let i=2; i<input.length; i+=2){
    const curr = input[i].split(' ').map((e)=>+e)
    let temp = []
    for(let j=0; j<curr.length; j++){
        temp.push({idx:j, pri:curr[j]})
    }
    totalDocuments.push(temp)
}

let theDocuments = []
for(let i=1; i<input.length; i+=2){
    let tempForDocs = input[i].split(' ').map((e)=>+e)
    theDocuments.push(tempForDocs[1])
}
let answers = ''
for(let i = 0; i< testCaseN; i++){
    let cnt = 0
    let doc_number = theDocuments[i]
    while(true){
        let front = totalDocuments[i][0]
        totalDocuments[i] = totalDocuments[i].slice(1)
        if(totalDocuments[i].some((e)=> e.pri > front.pri)){
            totalDocuments[i].push(front)
        } else {
            cnt++
            if(front.idx === doc_number) break
        }
    }
    answers+=cnt + "\n"
}

console.log(answers.trim())