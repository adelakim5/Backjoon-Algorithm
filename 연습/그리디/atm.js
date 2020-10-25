function b11399(){
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString();
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split("\n");
    var n = parseInt(input[0])
    var temp = input[1].split(' ')
    var people = []
    for(var i=1; i<=n; i++){
        people.push({p: i, val: parseInt(temp[i-1])})
    }
    people.sort((a,b)=> a.val-b.val)
    console.log(people)
    var d = Array(n)
    d[0] = people[0].val
    for(var i=1; i<people.length; i++){
       d[i] = d[i-1]+people[i].val
    }
    console.log(d.reduce((a,b)=>a+b))
}

b11399()