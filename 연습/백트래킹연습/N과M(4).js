function b15652(){
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split(' ');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split(' ');
    var n = parseInt(input[0])
    var m = parseInt(input[1])
    var temp = new Array(n).fill(0)
    for(var i=1; i<=n; i++){
        temp[i-1] = i
    }

    var ans = []
    for(var j=0; j<temp.length; j++){
        select(ans, temp[j], temp, temp[j].toString(), m)
    }
    var answer = ''
    for(var a=0; a<ans.length; a++){
        answer += `${ans[a]}\n`
    }
    console.log(answer)
}

function select(ans, current, temp, str, m){
    var index = temp.findIndex(e=> e===current)
    var newArr = temp.slice(index, temp.length)
    var array = str.split(' ')
    if(array.length == m){
        ans.push(str)
        return 
    }
    for(var i=0; i<newArr.length; i++){
        select(ans, newArr[i], newArr, str+" "+newArr[i].toString(), m)
    }
}

b15652()