// var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().split('\n');
// var temp = []
// var n = parseInt(input[0])
// for(var i=1; i<=input.length; i++)
// { 
//   temp.push(parseInt(input[i]))
// }

function b2156(){
  var n = 6
  var temp = [6,10,13,9,8,1]
  var array = []
  var sum = 0
  while(temp.length != 0){
    array.push([temp.shift(), temp.shift(), temp.shift()])
  }
  console.log(array)
  for(var i=0; i<array.length; i++){
    var oox = array[i][0] + array[i][1]
    var oxo = array[i][0] + array[i][2]
    var xoo = array[i][1] + array[i][2]
    var max = [oox, oxo, xoo]
    var maxValue = Math.max(...max)
    if(max == oxo){

    } else {
      
    }
  }
}

b2156()