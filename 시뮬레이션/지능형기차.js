function b2455(){
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var trains = []
    for(var i=0; i<input.length; i++){
        trains.push(input[i].split(' '))
    }
    console.log(trains)
    var people = 0
    var max = 0
    for(var j=0; j<trains.length; j++){
        people -= trains[j][0]/1
        people += trains[j][1]/1
        if(max<people){
            max = people
        }
    }
    console.log(max)
}

b2455()