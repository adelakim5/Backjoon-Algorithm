function b1342() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var s = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('');
    // console.log(s)
    var n = s.length
    var arr = new Array(n)
    var answer = []
    var rst = [0]
    backTrack(arr, s, 0, n, answer, rst)
    console.log(rst)
    var a = Array(26).fill(0)
    for(var i=0; i<s.length; i++){
        a[s[i].charCodeAt(0)-'a'.charCodeAt(0)]++;
    }
    for(var j=0; j<n; j++){
        if(a[j]>1){
            rst /= factorial(a[j])
        }
    }
    console.log("result:",rst)
}

function factorial(n){
    var sum = 1
    for(var i=1; i<=n; i++){
        sum = sum*i
    }
    return sum
}

// function factorial(n){
//     if(n==1) return n
//     else n*factorial(n-1)
// }

function backTrack(arr, s, count, n, answer, rst) {

    if (count === n) {
        rst[0]++
        return 
    }

    var tempS = s.slice()
    // var newArr = arr.slice()
    for (var j = 0; j < tempS.length; j++) {
        // console.log("tempS:", tempS, "index j:", j, "count:", count)
        if (check(arr, tempS[j], count)) {
            // console.log("check: true")
            arr[count] = tempS[j]
            tempS.splice(j, 1)
            // console.log("new arr status:", arr)

            backTrack(arr, tempS, count + 1, n, answer, rst)
            tempS = s.slice()
            // console.log("return... tempS:", tempS, "count:", count, "ans:", ans)
        }

    }
}

function check(arr, s, count) {
    // console.log("arr:", arr, "s[j]", s, "count:", count)
    if (arr[count - 1] === s) return false
    return true
}

b1342()