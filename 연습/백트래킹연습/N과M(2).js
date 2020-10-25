function b15650() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split(' ');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split(' ');
    var n = input[0]
    var m = input[1]
    console.log("n:", n, "m:", m)

    var temp = new Array(n).fill(0)
    for (var i = 1; i <= n; i++) {
        temp[i - 1] = i
    }

    var ans = []

    for (var c = 0; c < temp.length; c++) {
        combination(ans, c, temp, temp[c].toString(), m)
    }
    
    print(ans)
}

function print(ans){
    for(var i=0; i<ans.length; i++){
        console.log(ans[i])
    }
}

function combination(ans, currentIndex, temp, str, m) {
    var newArr = temp.slice(currentIndex+1, temp.length)
    console.log("newArr: ", newArr)
    var array = str.split(' ')
    if(array.length == m){
        console.log("push in ans: ", ans)
        ans.push(str)
        return 
    }
    for(var i=0; i<newArr.length; i++){
        combination(ans, i, newArr, str+" "+newArr[i].toString(), m)
        console.log("com! ans:", ans, "temp:", temp, "newArr:", newArr, "str:", str)
    }
}

b15650()