function b1759() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var v = input[0].split(' ')
    var l = parseInt(v[0])
    var c = parseInt(v[1])
    var letter = input[1].split(' ').sort()

    console.log("l:", l, "c:", c)
    console.log("letter:", letter)

    var result = []
    var each = []

    possiblePassword(result, l, c, each, letter)
    for (var a = 0; a < result.length; a++) {
        console.log(result[a])
    }
}

function possiblePassword(result, l, c, each, letter) {
    var check = ['a', 'e', 'i', 'o', 'u']
    var count = 0
    for(var t=0; t<each.length; t++){
        if(!check.includes(each[t])){
            count++
        }
    }
    console.log("count:",count)
    console.log("each:", each)
    if (each.length === l) {
        if (result.every(e => e !== each.sort().join('')) && each.some(e => check.includes(e)) && count >= 2) {
            result.push(each.join(''))
        }
        return
    }

    var num = 0
    if (each.length === 0) {
        num = 0
    } else {
        var index = letter.findIndex(e => e === each[each.length - 1])
        num = index + 1
    }
    console.log("num:", num)
    for (var i = num; i < c; i++) {
        each.push(letter[i])
        possiblePassword(result, l, c, each, letter)
        each.pop()
    }
}

b1759()