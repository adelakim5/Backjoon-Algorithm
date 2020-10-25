var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var n = parseInt(input[0])
var meetings = []
for(var i=1; i<input.length; i++){
    var meeting = input[i].split(' ').map(e=> e/1)
    meetings.push({start:meeting[0], end:meeting[1]})
}
meetings.sort((a, b)=> {
    if(a.end - b.end === 0 ){
        return a.start-b.start
    } else {
        return a.end - b.end
    }
})
console.log(meetings)
var answer = [meetings[0]]
meetings.splice(0, 1)
meetings.forEach(function(meeting){
    if(meeting.start >= answer[answer.length-1].end){
        answer.push(meeting)
    }
})
console.log(answer)

// var start = meetings[0]
// var index = 0
// var count = 1
// while(true){
//     var flag = false
//     for(var i=index; i<meetings.length; i++){
//         var next = meetings[i]
//         if(next[0]>=start[1]){
//             flag = true
//             count++
//             start = next
//             index = i
//             break
//         }
//     }
//     if(!flag){
//         break
//     }
// }
// console.log(count)


// var answer = [0]

// for(var i=0; i<meetings.length; i++){
//     var currentStart = meetings[i]
//     var result = [currentStart]
//     findMaxMeetings(currentStart, i, result, meetings)
// }

// console.log(answer[0])

/*
function findMaxMeetings(currentStart, index, result, meetings){
    if(meetings.every(e=> e[0]<currentStart[1])){
        if(result.length >= answer[0])
        answer[0] = result.length
        return 
    }
    var newMeetings = meetings.slice()
    newMeetings.splice(index, 1)
    for(var i=0; i<newMeetings.length; i++){
        var next = newMeetings[i]
        if(next[0] >= currentStart[1]){
            result.push(next)
            findMaxMeetings(next, i, result, newMeetings)
            result.pop()
        }

    }
}
*/
