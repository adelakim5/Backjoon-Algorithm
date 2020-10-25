function nQueen(){
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split(' ');
    var n = parseInt(input[0])
    var array = new Array(n).fill(0)
    var queenArray = []
    for (var i = 0; i < n; i++) {
        queenArray.push(array)
    }
    console.log(queenArray)
    var queen = distribution(queenArray, n)
    console.log("queen:",queen)
  
}

function distribution(queenArray, n){
    for(var i=0; i<queenArray.length; i++){
        for(var j=0; j<queenArray[i].length; j++){
            if(howManyQueensInArray(queenArray) === n){
                break
            }
            if(isPromising(i, j, queenArray, n)){
                queenArray = putQueen(i, j, queenArray)
            }
        }
    }
    return queenArray
}

function isPromising(x, y, queenArray, n){
    // 행 검사
    for(var i=0; i<n; i++){
        if(queenArray[x][i] === 1) return false
    }
    // 열 검사
    for(var j=0; j<n; j++){
        if(queenArray[j][y] === 1) return false 
    }
    // 대각선 검사
    var dx = [-1, 1, -1, 1]
    var dy = [-1, 1, 1, -1]
    for(var k=0; k<4; k++){
        var a = x+dx[k]
        var b = y+dy[k]
        if((a>=0 && a<n) && (b>=0 && b<n)){
            if(queenArray[a][b] === 1) return false 
        }
    }
    return true
}

function putQueen(x, y, queenArray){
    queenArray[x][y] = 1
    return queenArray
}

function howManyQueensInArray(queenArray){
    var count = 0
    for(var i=0; i<queenArray.length; i++){
        for(var j=0; j<queenArray[i].length; j++){
            if(queenArray[i][j] === 1) count++
        }
    }
    return count
}

nQueen()