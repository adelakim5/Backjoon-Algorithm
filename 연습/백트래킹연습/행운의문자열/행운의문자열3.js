function b1342() {
    var fs = require('fs');
    //var str = fs.readFileSync('/dev/stdin').toString();
    var str = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "");
    var len = str.length
    var visited = new Array(len).fill(false)
    var arr = []
    var result = [0]
    var a = new Array(26).fill(0)

    for(var i=0; i<len; i++){
        ++a[str.charCodeAt(i)-'a'.charCodeAt(0)];
    }
    console.log("a",a)
    
    isLucky(arr, str, len, result, 0, visited)

    for(var i=0; i<a.length; i++){
        if(a[i] > 1){
            result[0] /= fac(a[i])
        }
    }
    console.log(result[0])

}
b1342()
function isLucky(arr, str, len, result, count, visited) {
    if (count === len) {
        if (isCheck(arr)) {
            result[0]++;
            return
        }
    }
    for (var i = 0; i < len; i++) {
        if (!visited[i]) {
            visited[i] = true
            arr.push(str.charAt(i))
            isLucky(arr, str, len, result, count + 1, visited)
            arr.pop()
            visited[i] = false
        }
    }
}

function isCheck(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] == arr[i + 1]) return false
    }
    return true
}

function fac(n) {
    if (n == 1) return n
    else return n * fac(n - 1)
}
