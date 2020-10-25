function b1094(){
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "");
    var result = parseInt(input)
    var bar = 64
    if(result === bar){
        console.log(1)
    } else {
        var count = 0
        while(true){
            bar /= 2
            if(bar<=result){
                result = result-bar
            } else {
                continue
            }
            count++
            if(result == 0){
                break;
            }
        }
        console.log(count)
    }
}
b1094()