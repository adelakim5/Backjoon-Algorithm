class PriorityQueue {
    constructor() {
      this.array = [];
    }
    
    enqueue(item) {
      this.array.push(item);
    }
    
    dequeue() {
      let entry = 0;
      this.array.forEach((item, index) => {
        if (this.array[entry].score > this.array[index].score) {
          entry = index;
        }
      });
      return this.array.splice(entry, 1);
    }
  }
  
  class Vertex {
    constructor(key, score) {
      this.key = key;
      this.score = score;
    }
  }
  
  const priorityQueue = new PriorityQueue();
  const pengsoo = new Student('1', 0);
  const kim = new Student('MJKim', 5);
  const ryu = new Student('Ryu', 3);
  
  priorityQueue.enqueue(pengsoo);
  priorityQueue.enqueue(kim);
  priorityQueue.enqueue(ryu);
  
  priorityQueue.dequeue();   // Student('Pengsoo', 10)