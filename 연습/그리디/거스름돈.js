function b5585() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString();
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "");
    var change = 1000 - parseInt(input)
    console.log(change)
    var count = 0
    var array = change.toString().split('')
    console.log(array)
    for (var i = 0; i < array.length; i++) {

        if (array[i] / 1 >= 5) {
            array[i] = array[i] / 1 - 5
            count++
        }
        if (array[i] < 5) {
            count += array[i]/1
        }
    }
    console.log(count)
}

b5585()