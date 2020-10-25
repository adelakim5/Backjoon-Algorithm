const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const t = input[0]/1
let pss = []
for(let i=1; i<input.length; i++){
    pss.push(input[i])
}

class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}

class Queue{
    constructor(){
        this.head = null
        this.tail = null
        this.size = 0
    }

    push(data){
        let node = new Node(data)
        if(!this.head){
            this.head = node
            this.tail = node
            this.size++
            return
        }
        this.tail.next = node
        this.tail = node
        this.size++
    }

    shift(){
        if(!this.head){
            return
        }
        if(this.size === 1){
            let x = this.head
            this.head = null
            this.tail = null
            this.size--
            return x
        }
        let x = this.head
        this.head.next = this.head
        this.size--
        return x
    }

    getSize(){
        return this.size
    }
}
let result = ''

for(let i = 0; i<pss.length; i++){
    let a = new Queue()
    let curr_pss = pss[i]
    // console.log("curr_pss:", curr_pss)
    for(let j=0; j<curr_pss.length; j++){
        // console.log("curr_pss[j]:", curr_pss[j])
        if(curr_pss[j] === '('){
            a.push(curr_pss[j])
        } else if(a.getSize() === 0 && curr_pss[j] === ')'){
            a.push(curr_pss[j])
        } else if(a.tail.data === ")"&& curr_pss[j] === ")"){
            a.push(curr_pss[j])
        } else {
            a.shift()
        }
    }
    if(a.getSize() === 0){
        result += 'YES' + '\n'
    } else {
        result += 'NO' + '\n'
    }
}

console.log(result.trim())
