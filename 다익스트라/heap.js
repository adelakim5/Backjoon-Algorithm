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
        const min = this.nodes.pop()
        // if(this.nodes.length === 1){
        //     this.nodes.pop();
        //     return min;
        // };
        // this.nodes[0] = this.nodes.pop()
        this.trickleDown();
        return min
    }

    trickleDown(index = 0) {
        const leftChildIndex = 2 * index + 1
        const rightChildIndex = 2 * index + 2
        const length = this.nodes.length
        let minimum = index

        // 객체 값에서 undefined인 경우 제외.
        if(!this.nodes[rightChildIndex] && !this.nodes[leftChildIndex]) return;
        // 오른쪽 자식이 undefined인 경우 왼쪽 자식만 보면 됨.
        if(!this.nodes[rightChildIndex]){
            if(this.nodes[leftChildIndex].cost < this.nodes[minimum].cost){
                minimum = leftChildIndex;
            }
            return;
        }

        // 중요! 왼쪽 자식과 오른쪽 자식의 크기 비교를 통해 무슨 값이 더 작은지 판별해야함.
        if(this.nodes[leftChildIndex].cost > this.nodes[rightChildIndex].cost){
            // 왼쪽 자식보다 오른쪽 자식이 더 작은 경우

            //오른쪽 자식이 부모보다 작은 경우.
            if (rightChildIndex <= length && this.nodes[rightChildIndex].cost < this.nodes[minimum].cost) {
                minimum = rightChildIndex
            }
        }else{
            // 오른쪽 자식보다 왼쪽 자식이 더 작은 경우

            //왼쪽 자식이 부모보다 작은 경우
            if (leftChildIndex <= length && this.nodes[leftChildIndex].cost < this.nodes[minimum].cost) {
                minimum = leftChildIndex
            }
        }

        //인덱스가 바뀐경우, 즉 부모랑 자식이랑 값을 바꿔야하는 경우 값을 swap후 mininum에 대해서 다시 trickleDown
        if (minimum !== index) {
            let t = this.nodes[minimum]
            this.nodes[minimum] = this.nodes[index]
            this.nodes[index] = t
            this.trickleDown(minimum)
        }
    }
}

// const heap = new MinHeap()
// heap.insert({verex:1,cost:1});
// console.log(heap.nodes)
// heap.extract();
// console.log(heap.nodes)
// heap.insert({verex:2,cost:3});
// heap.insert({verex:3,cost:23});
// heap.insert({verex:4,cost:2});
// heap.insert({verex:5,cost:10});
// heap.insert({verex:6,cost:32});
// heap.insert({verex:7,cost:9});
// console.log(heap.nodes);
// heap.extract();
// console.log(heap.nodes);
// heap.extract();
// console.log(heap.nodes);
// heap.extract();
// console.log(heap.nodes);
// heap.extract();
// console.log(heap.nodes);

// const length = heap.nodes.length;
// for (let i = 0; i < length; i++) {
//     console.log('MIN_VALUE = ', heap.extract());
//     console.log('HEAP = ', heap.nodes);
// }

// class MinHeap {
//     constructor() {
//         this.nodes = []
//     }

//     insert(value) {
//         this.nodes.push(value)
//         this.bubbleUp()
//     }

//     bubbleUp(index = this.nodes.length - 1) {
//         if (index < 1) return;

//         const currentNode = this.nodes[index]
//         const parentIndex = Math.floor((index - 1) / 2)
//         const parentNode = this.nodes[parentIndex]
//         if (parentNode.value <= currentNode.value) return;

//         this.nodes[index] = parentNode
//         this.nodes[parentIndex] = currentNode
//         index = parentIndex
//         this.bubbleUp(index)
//     }

//     extract() {
//         const min = this.nodes[0]
//         this.nodes[0] = this.nodes.pop()
//         this.trickleDown()
//         return min
//     }

//     trickleDown(index = 0) {
//         const leftChildIndex = 2 * index + 1
//         const rightChildIndex = 2 * index + 2
//         const length = this.nodes.length

//         let minimum = index
//         // console.log("index:", index, "minimum", minimum)
//         // console.log("this.nodes[leftChildIndex]", this.nodes[leftChildIndex])
//         // console.log(this.nodes[leftChildIndex].index, this.nodes[leftChildIndex].value)
//         // console.log("this.nodes[minimum]", this.nodes[minimum])

//         if (this.nodes[leftChildIndex] !== undefined && this.nodes[rightChildIndex] !== undefined) {
//             if (leftChildIndex <= length && this.nodes[leftChildIndex].value < this.nodes[minimum].value) {
//                 minimum = leftChildIndex
//             }

//             if (rightChildIndex <= length && this.nodes[rightChildIndex].value < this.nodes[minimum].value) {
//                 minimum = rightChildIndex
//             }
//         }
//         // console.log("here index", index)
//         // console.log("here minimum", minimum)
//         if (minimum !== index) {
//             // console.log("************************")
//             let t = this.nodes[minimum]
//             this.nodes[minimum] = this.nodes[index]
//             this.nodes[index] = t
//             // [this.nodes[minimum], this.nodes[index]] = [this.nodes[index], this.nodes[minimum]]
//             this.trickleDown(minimum)
//         }
//     }
// }

// const heap = new MinHeap()

// heap.insert({
//     index: 1,
//     value: 2
// });
// heap.insert({
//     index: 2,
//     value: 3
// });
// heap.insert({
//     index: 3,
//     value: 100
// });
// heap.insert({
//     index: 4,
//     value: 5
// });
// heap.insert({
//     index: 5,
//     value: 8
// });
// heap.insert({
//     index: 6,
//     value: 7
// });
// heap.insert({
//     index: 7,
//     value: 10
// });
// console.log("insert:", heap.nodes)

// const length = heap.nodes.length;
// for (let i = 0; i < length; i++) {
//     console.log('MIN_VALUE = ', heap.extract());
//     console.log('HEAP = ', heap.nodes);
// }

module.exports = MinHeap;