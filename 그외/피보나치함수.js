function b1003() {
    var n = 4

    var t = fibonacci(n, [])
    // var a = []
    console.log(t)
}

function fibonacci(n, temp, a) {
    // a.get(n)
    if (n == 0) {
        temp.push(0)
        console.log("0", temp)
        return temp
    } else if (n == 1) {
        temp.push(1)
        console.log("1", temp)
        return temp
    } else {
        return fibonacci(n - 1, temp) + fibonacci(n - 2, temp)
    }
    // console.log("a", answer)
}

b1003()