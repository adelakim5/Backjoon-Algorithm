function b1339() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var n = parseInt(input[0])
    console.log("n:", n)
    var words = []
    for (var k = 1; k < input.length; k++) {
        words.push(input[k].split(''))
    }
    words = words.sort((a, b) => b.length - a.length)
    console.log("words: ", words)
    var temp = []
    var numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

    for (var i = 0; i < words.length; i++) {
        for (var j = 0; j < words[i].length; j++) {
            if(temp.length==0 || temp.every(e=> e.words !== words[i][j])){
                temp.push({
                    words: words[i][j],
                    val: (Math.pow(10, (words[i].length-1) - j)),
                })
            } else {
                var findTemp = temp.findIndex(e=> e.words === words[i][j])
                temp[findTemp].val = temp[findTemp].val+ Math.pow(10, (words[i].length-1)-j)
            }
        }
    }

    temp = temp.sort((a, b) => b.val - a.val)
    console.log("temp: ", temp)
    var answer = 0
    for(var a=0; a<temp.length; a++){
        var ans = temp[a].val * numbers[a]
        console.log("ans: ",ans)
        answer = answer + ans
    }
    console.log("answer: ", answer)
    // var letter = []
    // for (var a = 0; a < temp.length; a++) {
    //     var ptr = temp[a].words
        
    // }
    // console.log("after temp: ", temp)
    // console.log("letter: ", letter)
    // var answer = 0
    // for (var s = 0; s < temp.length; s++) {
    //     answer += temp[s].sum
    // }

    // console.log("answer: ", answer)
}

b1339()