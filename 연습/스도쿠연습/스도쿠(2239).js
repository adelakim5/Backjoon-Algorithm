function b2239(){
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var link = []
    for (var k = 0; k < input.length; k++) {
        link.push(input[k].split('').map(e=>e/1))
    }
    console.log("link:",link)
    var emptyArray = whereIsEmptyPoint(link)
    var ans = []
    fillSudoku(0, emptyArray, link, ans)
    
}

function fillSudoku(index,emptyArray, link, ans){

    if(index === emptyArray.length){
        for(var a=0; a<9; a++){
            for(var b=0; b<9; b++){
                ans.push(link[a][b])
            }
            console.log(ans.join(''))
            ans = []
        }
        process.exit(0)
    }

    var x = emptyArray[index][0]
    var y = emptyArray[index][1]
    for(var i=1; i<=9; i++){
        if(isPromising(x,y,i,link)){
            link[x][y] = i
            fillSudoku(index+1, emptyArray, link, ans)
            link[x][y] = 0
        }
    }
}

function isPromising(x, y, num, link){
    for(var i=0; i<9; i++){
        if(link[x][i] === num) return false
    }
    for(var j=0; j<9; j++){
        if(link[j][y] === num) return false
    }
    var sx = Math.floor(x/3)*3
    var sy = Math.floor(y/3)*3
    for(var a=sx; a<sx+3; a++){
        for(var b=sy; b<sy+3; b++){
            if(link[a][b] === num) return false
        }
    }
    return true
}

function whereIsEmptyPoint(link){
    var emptyArray = []
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if(link[i][j] == 0){
                emptyArray.push([i, j])
            }
        }
    }
    return emptyArray
}

b2239()