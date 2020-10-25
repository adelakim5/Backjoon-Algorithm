const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
const NAndM = input[0].split(' ')
const N = +NAndM[0]
const M = +NAndM[1]
let links = []
for (let i = 1; i < input.length; i++) {
    links.push(input[i].split(' ').map((e) => +e))
}

let graphArray = (links) => {
    let graph = []
    for(let i=0; i<N; i++){
        graph.push(Array(N).fill(Infinity))
        graph[i][i] = 0
    }
    links.forEach((link, idx) => {
        graph[link[0]-1][link[1]-1] = 1
    })
    return graph
}



class Node{
    constructor(data, next){
        this.data = data
        this.next = next
    }
}

class Queue{
    constructor(){
        this.head = null
        this.tail = null
        this.size = 0
    }
    push(data){
        let node = new Node(data, null)
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
        if(!this.head) return 
        if(this.size === 1){
            this.size--
            return this.head
        }
        let x = this.head
        this.head = this.head.next
        this.size--
        return x.data
    }

    getSize(){
        return this.size
    }
}

let graph = graphArray(links)

function bfs(graph){
    let q = new Queue()

}


while(!q.getSize()){
    let vertexs = q.shift()
    if(visit[vertexs[0]-1]){
        visit[vertexs[1]-1] = true
    } else {
        continue
    }
}


function initVisit(){
    return Array(N).fill(false)
}

function checkVisitState(visit){
    visit.forEach(element => {
        if(!element) return false
    });
    return true 
}
