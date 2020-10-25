let fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
let vertextAndEdgeInfo = input[0].split(' ').map((e) => +e)
let vertexNumber = vertextAndEdgeInfo[0]
let edgesNumber = vertextAndEdgeInfo[1]
let startV = Number(input[1])
let edges = []
for (let i = 2; i < input.length; i++) {
    edges.push(input[i].split(' ').map((e) => +e))
}
if (vertexNumber === 1) {
    console.log(0);
} else {
    class Node {
        constructor(value, index) {
            this.value = value
            this.index = index
            this.next = null
        }
    }

    class LinkedHeap {
        constructor() {
            this.head = null
            this.tail = null
            this.size = 0
        }

        push(value, index) {
            let node = new Node(value, index)
            if (!this.head) {
                this.head = node
                this.tail = node
                this.size++
            } else {
                this.tail.next = node
                this.tail = node
                this.size++
            }
        }

        shift(value, index) {
            let x = this.findTarget(value, index)
            if (this.size === 1) {
                this.tail = null
                this.head = null
                this.size--
            } else if (x === this.head) {
                this.head = x.next
                this.head = null
                this.size--
            } else if (x === this.tail) {
                this.tail = null
                this.size--
            } else {
                let f = this.getFront(x)
                f.next = x.next
                x = null
                this.size--
            }
            return x
        }

        getFront(x) {
            let t = this.head
            for (let i = 0; i < this.size; i++) {
                if (t.next === x) return t
                t = t.next
            }
            return t
        }

        getSize() {
            return this.size
        }

        findTarget(value, index) {
            let t = this.head
            for (let i = 0; i < this.size; i++) {
                if (t.value === value && t.index === index) return t
                t = t.next
            }
            return t
        }
    }
    const dGraph = () => {
        let dijkstraGraph = Array(vertexNumber + 1).fill(null).map((e) => new Map())
        dijkstraGraph[0].set(0, 0)
        for (let i = 0; i < edges.length; i++) {
            // console.log("dijkstraGraph", dijkstraGraph)
            if (i + 1 <= vertexNumber) dijkstraGraph[i + 1].set(i + 1, 0)
            let start = edges[i][0]
            // console.log("start", start)
            let end = edges[i][1]
            let weight = edges[i][2]
            if (dijkstraGraph[start].has(end)) {
                let w = dijkstraGraph[start].get(end)
                if (w > weight) {
                    dijkstraGraph[start].set(end, weight)
                }
            } else {
                dijkstraGraph[start].set(end, weight)
                // console.log("start", start, "dijkstraGraph[start]", dijkstraGraph[start])
                // console.log("here dijkstraGraph", dijkstraGraph)
            }
        }
        for (let i = 1; i < dijkstraGraph.length; i++) {
            let map = dijkstraGraph[i]

        }
        return dijkstraGraph
    }


    const setDijkstra = (dijkstraGraph) => {
        let shortestPathTable = dijkstraGraph[startV]
        console.log("shortestPathTable", shortestPathTable)
        let index = shortestPathTable.keys().next().value
        let value = shortestPathTable.values().next().value
        // console.log("index", index, "value", value)
        let heap = new LinkedHeap()
        heap.push(value, index)
        // console.log("heap:",heap)
        const findMin = () => {
            let min = shortestPathTable.values().next().value
            let minIndex = 0
            let keys = [...shortestPathTable.keys()]
            for (let key of keys) {
                if (shortestPathTable.get(key) < min) {
                    min = shortestPathTable.get(key)
                    minIndex = key
                }
            }
            return [min, minIndex]
        }
        while (heap.getSize() !== 0) {
            // console.log("heap status:", heap)
            let minInfo = findMin()
            let min = minInfo[0]
            let minIndex = minInfo[1]
            let hIndex = heap.findTarget(min, minIndex).index
            let hValue = heap.findTarget(min, minIndex).value
            console.log("heap's index", hIndex, "value", hValue)
            if (shortestPathTable.get(hIndex) !== hValue) {
                heap.shift(hValue, hIndex)
                console.log("*** heap status:", heap)
            } else {
                let tempArrayOfHeapIndex = dijkstraGraph[hIndex]
                console.log("tempArrayOfHeapIndex", tempArrayOfHeapIndex)
                let keys = [...tempArrayOfHeapIndex.keys()]
                console.log("keys", keys)
                // tempArrayOfHeapIndex.forEach((keys) => {
                for (let key of keys) {
                    let changedValue = tempArrayOfHeapIndex.get(key) + hValue
                    if (key === hIndex) continue
                    if (!shortestPathTable.has(key) || shortestPathTable.get(key) > changedValue) {
                        shortestPathTable.set(key, changedValue)
                    }
                    // if(shortestPathTable.get(key) > changedValue){
                    //     shortestPathTable.set(key, changedValue)
                    // }
                    heap.push(changedValue, key)
                    console.log("changedValue", changedValue, "shortestPathTable", shortestPathTable)
                }
                console.log("here now the heap status", heap)
                heap.shift(hValue, hIndex)
                console.log("*** *** heap shifted", heap)
                // shortestPathTable 에서 4가 현재 없음 -> infinity 이기 때문
                // while문 돌려서 4로 가는 경로 생기면 맵에 set으로 해당 경로 추가해줘야 함 

                // })

                // tempArrayOfHeapIndex.forEach((value, key, mapObject) => {
                //     let tempValue = value+hValue
                //     if(tempValue < shortestPathTable.get(key)){
                //         shortestPathTable.set(key, tempValue)
                //     }
                //     heap.push(key, tempValue)
                // })
                // for (let i = 1; i < tempArrayOfHeapIndex.length; i++) {
                //     if (tempArrayOfHeapIndex[i] === Infinity || tempArrayOfHeapIndex[i] === 0) continue
                //     console.log("tempArrayOfHeapIndex[i]", tempArrayOfHeapIndex[i])
                //     tempArrayOfHeapIndex[i] += value
                //     console.log("after add the value at tempArrayOfHeapIndex[i]", tempArrayOfHeapIndex[i])
                //     if (shortestPathTable[i] > tempArrayOfHeapIndex[i]) {
                //         shortestPathTable[i] = tempArrayOfHeapIndex[i]
                //         console.log("the status of heap after changed shortestPathTable and pushed on it:", heap)
                //     }
                //     heap.push(shortestPathTable[i], i)
                // }
                // heap.shift()
                // console.log("*** *** shifted heap:", heap)
            }
        }
        shortestPathTable = makeKeysFull(shortestPathTable)
        return shortestPathTable
    }
    const makeKeysFull = (shortestPathTable) => {
        const totalKeys = Array(vertexNumber)
        for (let i = 0; i < vertexNumber; i++) {
            totalKeys[i] = i + 1
        }
        console.log("totalKeys:", totalKeys)
        for (let totalKey of totalKeys) {
            if (shortestPathTable.has(totalKey)) continue
            shortestPathTable.set(totalKey, 'INF')
        }
        return shortestPathTable
    }

    const print = (shortestPathTable) => {
        let answer = ''
        let ans = shortestPathTable.values()
        for (let item of shortestPathTable) {
            // ans = item.values().next().value
            answer += ans.next().value + '\n'
        }
        console.log(answer.trim())
    }
    let dg = dGraph()
    console.log("dGraph()", dg) // undefined
    let test = setDijkstra(dg)
    console.log("test", test)
    let p = print(test)
    // const edgeGraph = dGraph()
    // const shortestPathTable = setDijkstra(edgeGraph)
    // console.log("edgeGraph:", edgeGraph.head)
    // console.log("shortestPathTable", shortestPathTable)
    // print(shortestPathTable)
}