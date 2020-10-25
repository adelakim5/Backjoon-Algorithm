
function b1342() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var s = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('');
    // console.log(s)
    s.sort()
    console.log("s:", s)
    var n = s.length
    var p = factorial(n)
    var temp = checkSameElements(s)
    console.log("temp:", temp)
    var bunmo = temp.filter(e => e.cnt > 1)
    if(bunmo.length > 0){

    } else {

    }
    for(var i=0; i<bunmo.length; i++){
        var val = factorial(bunmo[i].cnt)
        p = p/val
    }
   
    console.log("answer", p)
}

b1342()

function factorial(n) {
    if(n == 1) return n
    else return n * factorial(n - 1)
}

function checkSameElements(s) {
    var index = 0
    var ptr = ''
    var count = 0
    var temp = []
    while (index !== s.length) {
        ptr = s[index]
        for (var i = index; i <= s.length; i++) {
            if (s[i] === ptr) {
                count++
            } else {
                temp.push({
                    val: ptr,
                    cnt: count
                })
                index = i
                count = 0
                break
            }
            if (i == s.length) {
                index = s.length
            }
        }
    }
    return temp
}