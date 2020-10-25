function b1197() {
    var fs = require('fs');
    //  var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');

    var info = input[0].split(' ').map(e => e / 1)
    var link = []
    for (var k = 1; k < input.length; k++) {
        link.push(input[k].split(' ').map(e => e / 1))
    }
    link = link.sort((a, b) => a[2] - b[2])
    console.log("link: ", link)
    var edge = []

    var cycleTable = new Array(info[0] + 1)
    for (var i = 0; i < cycleTable.length; i++) {
        cycleTable[i] = i
    }
    console.log("cycleTable: ", cycleTable)
    var answer = 0
    var count = 0
    while (true) {
        var current = link[count]
        if (cycleTable[current[1]] !== cycleTable[current[0]]) {
            if (cycleTable.some(e => e == cycleTable[current[1]])) {
                cycleTable = cycleTable.map(e => {
                    if (e === cycleTable[current[1]]) return cycleTable[current[0]]
                    else return e
                })
                console.log("current: ", current)
                console.log("cycleTable: ", cycleTable)
            }
            edge.push(current[2])
            console.log("edge: ", edge)
        }
        if (edge.length === info[0] - 1) {
            break;
        }
        count++
    }
    answer = edge.reduce((a, b) => a + b)
    console.log(answer)
}



// function b1197() {
//     var fs = require('fs');
//     // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
//     var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g,"").split('\n');
//     var info = input[0].split(' ').map(e=> e/1)
//     console.log("info: ",info)

//     var link = []
//     for(var k=1; k<input.length; k++){
//         link.push(input[k].split(' ').map(e=>e/1))
//     }
//     link = link.sort((a,b)=> a[2]-b[2])
//     console.log("link: ",link)

//     var edge = []

//     var cycleTable = new Array(info[0]+1)
//     for(var i=0; i<cycleTable.length; i++){
//         cycleTable[i] = i
//     }
//     console.log("cycleTable(before): ",cycleTable)
//     var answer = 0
//     var count = 0
//     while(true){
//         var current = link[count]
//         if(cycleTable[current[1]] !== cycleTable[current[0]]){        
//             // cycleTable[current[1]] = cycleTable[current[0]]
//             if(cycleTable.some(e=> e==cycleTable[current[1]])){
//                 for(var c = 0; c<cycleTable.length; c++){
//                     if(cycleTable[c] === cycleTable[current[1]]){
//                         cycleTable[c] = cycleTable[current[0]]
//                         console.log("current: ", current,"cycleTable process: ", cycleTable)
//                     }
//                 }
//             }
//             if(edge.length === 0){
//                 edge.push(current[2])
//             } else {
//                 edge.push(edge[edge.length-1] + current[2])
//             }
//         } 
//         if(edge.length === info[0]-1){
//             answer = edge[edge.length-1]
//             break;
//         }
//         count++;
//     }
//     console.log("cycleTable(after): ", cycleTable)
//     console.log("edge: ", edge)
//     // var answer = edge.reduce((a,b)=>a+b)
//     console.log("answer", answer)
// }

b1197()