function b15649() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split(' ');
    var n = input[0]
    var m = input[1]
    console.log("n:", n, "m:", m)

    var temp = new Array(n).fill(0)
    for (var i = 1; i <= n; i++) {
        temp[i - 1] = i
    }
    console.log("temp:", temp)

    var ans = []
    for (var p = 0; p < temp.length; p++) {
        permutation(ans, temp[p], temp, m, temp[p].toString())
    }

    print(ans)

}

function print(ans){
    for(var i=0; i<ans.length; i++){
        console.log(ans[i])
    }
}

function permutation(ans, current, temp, m, str) {
    var array = str.split(' ')
    console.log("array length: ", array.length)
    console.log("str: ", str)
    if (array.length == m) {
        ans.push(str)
        return ans
    } else {
        console.log("m", m)
        var newArr = temp.slice()
        console.log("newArr: ", newArr)
        var index = newArr.findIndex(e => e === current)
        newArr.splice(index, 1)
        console.log("after splice newArr: ", newArr)


        // if (newArr.length === 0) {
        //     ans.push(str)
        //     console.log("here ans: ", ans)
        //     return
        // }

        for (var i = 0; i < newArr.length; i++) {
            permutation(ans, newArr[i], newArr, m, str + " " + newArr[i])
            console.log("perm! ans: ", ans, "str:", str, "temp:", temp, "newArr:", newArr)
        }

    }

}

b15649()