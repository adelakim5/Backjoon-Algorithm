// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let input = require('fs').readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
let VE = input[0].split(' ')
let v = +VE[0]
let startV = +input[1]
let uvws = []
for (let i = 2; i < input.length; i++) {
    uvws.push(input[i].split(' ').map((e) => +e))
}

let linkedInfo = (uvws) => {
    let links = Array(v + 1)
    uvws.forEach((edge) => {
        if (!links[edge[0]]) links[edge[0]] = []
        links[edge[0]].push({
            vertex: edge[1],
            cost: edge[2]
        })
    })
    return links
}

// class PriorityQueue {
//     constructor() {
//         this.array = [];
//         this.size = 0
//     }

//     enqueue(item) {
//         this.array.push(item);
//         this.size++
//     }

//     dequeue() {
//         let entry = 0;
//         this.array.forEach((item, index) => {
//             if (this.array[entry].cost > this.array[index].cost) {
//                 entry = index;
//             }
//         });
//         this.size--
//         return this.array.splice(entry, 1);
//     }

//     top() {
//         let entry = 0;
//         this.array.forEach((item, index) => {
//             if (this.array[entry].cost > this.array[index].cost) {
//                 entry = index;
//             }
//         });
//         return this.array[entry]
//     }

//     getSize() {
//         return this.size
//     }
// }

class MinHeap {
    constructor() {
        this.nodes = []
    }

    insert(value) {
        this.nodes.push(value)
        this.bubbleUp()
    }

    bubbleUp(index = this.nodes.length - 1) {
        if (index < 1) return;

        const currentNode = this.nodes[index]
        const parentIndex = Math.floor((index - 1) / 2)
        const parentNode = this.nodes[parentIndex]
        if (parentNode.cost <= currentNode.cost) return;

        this.nodes[index] = parentNode
        this.nodes[parentIndex] = currentNode
        index = parentIndex
        this.bubbleUp(index)
    }

    extract() {
        const min = this.nodes[0]
        if(this.nodes.length === 1){
            this.nodes.pop();
            return min;
        };
        this.nodes[0] = this.nodes.pop()
        this.trickleDown();
        return min
    }

    trickleDown(index = 0) {
        const leftChildIndex = 2 * index + 1
        const rightChildIndex = 2 * index + 2
        const length = this.nodes.length
        let minimum = index

        if(!this.nodes[rightChildIndex] && !this.nodes[leftChildIndex]) return;
        if(!this.nodes[rightChildIndex]){
            if(this.nodes[leftChildIndex].cost < this.nodes[minimum].cost){
                minimum = leftChildIndex;
            }
            return;
        }

        if(this.nodes[leftChildIndex].cost > this.nodes[rightChildIndex].cost){
            if (rightChildIndex <= length && this.nodes[rightChildIndex].cost < this.nodes[minimum].cost) {
                minimum = rightChildIndex
            }
        }else{
            if (leftChildIndex <= length && this.nodes[leftChildIndex].cost < this.nodes[minimum].cost) {
                minimum = leftChildIndex
            }
        }

        if (minimum !== index) {
            let t = this.nodes[minimum]
            this.nodes[minimum] = this.nodes[index]
            this.nodes[index] = t
            this.trickleDown(minimum)
        }
    }
}

let dijkstra = (links, startV) => {
    let shortestPathTable = Array(v + 1).fill(Infinity)
    shortestPathTable[0] = -1
    shortestPathTable[startV] = 0
    let minHeap = new MinHeap()
    const start = {
        vertex: startV,
        cost: 0
    };
    minHeap.insert(start);
    while (minHeap.nodes.length) {
        const selected = minHeap.extract();
        const startVertex = selected.vertex,
            beforeCost = selected.cost;
        if (links[startVertex] === undefined) continue;
        // if (shortestPathTable[startVertex] < beforeCost) continue;
        links[startVertex].forEach((edge) => {
            const {
                vertex,
                cost
            } = edge
            if (shortestPathTable[vertex] <= shortestPathTable[startVertex] + cost) return;
            shortestPathTable[vertex] = shortestPathTable[startVertex] + cost
            const next = {
                vertex,
                cost: shortestPathTable[startVertex] + cost
            };
            minHeap.insert(next)
        })
    }
    return shortestPathTable
}

let printAll = (shortestPathTable) => {
    let answer = ''
    for (let i = 1; i < shortestPathTable.length; i++) {
        if (shortestPathTable[i] === Infinity) answer += 'INF' + '\n'
        else answer += shortestPathTable[i] + "" + '\n'
    }
    console.log(answer.trim())
}
// }

let links = linkedInfo(uvws);
let table = dijkstra(links, startV)
printAll(table)

