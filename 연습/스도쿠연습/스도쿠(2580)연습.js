function sdoku() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var link = []
    for (var k = 0; k < input.length; k++) {
        link.push(input[k].split(' ').map(e => e / 1))

    }
    console.log("link: ", link)
    var emptyArray = whereIsEmptyPoint(link, [])
    console.log("emptyArray: ", emptyArray)

    var isEmpty = checkOnce(emptyArray, link)

    if (isEmpty.length == 0) {
        console.log("final link: ")
        for (var l = 0; l < link.length; l++) {
            var answer = link[l].join(' ')
            console.log(answer)
        }
    } else {
        //    헹 => 열 => 3*3 순서대로 후보 숫자 넣으면서 검사?
        console.log("여기로 왔다")
        
    }
    // console.log("forThree: ", forThree)
}

function checkRow(link, isEmpty){
   
}

function checkOnce(emptyArray, link) {

    for (var i = 0; i < emptyArray.length; i++) {
        var rowVar = row(link, emptyArray[i][0], [1, 2, 3, 4, 5, 6, 7, 8, 9])
        console.log("rowVar: ", rowVar)
        if (rowVar.length == 1) {
            var x = emptyArray[i][0]
            var y = emptyArray[i][1]
            link[x][y] = rowVar[0]
        }
    }
    emptyArray = whereIsEmptyPoint(link, [])

    console.log("emptyArray after row : ", emptyArray)

    for (var i = 0; i < emptyArray.length; i++) {
        var colVar = col(link, emptyArray[i][1], [1, 2, 3, 4, 5, 6, 7, 8, 9])
        console.log("colVar:", colVar)
        if (colVar.length == 1) {
            var x = emptyArray[i][0]
            var y = emptyArray[i][1]
            link[x][y] = colVar[0]
        }
    }
    emptyArray = whereIsEmptyPoint(link, [])
    console.log("emptyArray after col : ", emptyArray)
    console.log("link: ", link)

    for (var i = 0; i < emptyArray.length; i++) {
        var visited = [
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ]
        var x = emptyArray[i][0]
        var y = emptyArray[i][1]
        var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        threeByThree(link, x, y, array, visited)
        if (array.length === 1) {
            link[x][y] = array[0]
        }
    }
    emptyArray = whereIsEmptyPoint(link, [])
    return emptyArray
}

function threeByThree(link, x, y, array, visited) {
    console.log("x:", x)
    console.log("y:", y)
    console.log("visited:", visited)
    console.log("array: ", array)
    var dx = [1, -1, 0, 0]
    var dy = [0, 0, 1, -1]

    var index = array.findIndex(e => e === link[x][y])
    // 끝내는 조건....

    if (x < 3) {
        if (y < 3) {
            visited[x][y] = true
            if(index !== -1) {
                array.splice(index, 1)
            }
            if (visited.every(e => {
                    if (e.every(a => a === true)) return true
                })) {
                return array;
            } else {
                for (var i = 0; i < 4; i++) {
                    console.log("x+dx[i]: ", x + dx[i], "y+dy[i]: ", y + dy[i])
                    if (x + dx[i] >= 0 && x + dx[i] < 3 && y + dy[i] >= 0 && y + dy[i] < 3) {
                        if (visited[x + dx[i]][y + dy[i]] === false) {
                            threeByThree(link, x + dx[i], y + dy[i], array, visited)
                        }
                    }
                }
            }

        } else if (y >= 3 && y < 6) {
            visited[x][y - 3] = true
            if(index !== -1) {
                array.splice(index, 1)
            }
            if (visited.every(e => {
                    if (e.every(a => a === true)) return true
                })) {
                return array;
            } else {
                for (var i = 0; i < 4; i++) {
                    console.log("x+dx[i]: ", x + dx[i], "y+dy[i]: ", y + dy[i])
                    if (x + dx[i] >= 0 && x + dx[i] < 3 && y + dy[i] >= 3 && y + dy[i] < 6) {
                        if (visited[x + dx[i]][y - 3 + dy[i]] === false) {
                            threeByThree(link, x + dx[i], y + dy[i], array, visited)
                        }
                    }
                }
            }

        } else {
            visited[x][y - 6] = true
            if(index !== -1) {
                array.splice(index, 1)
            }
            if (visited.every(e => {
                    if (e.every(a => a === true)) return true
                })) {
                return array;
            } else {
                for (var i = 0; i < 4; i++) {
                    console.log("x+dx[i]: ", x + dx[i], "y+dy[i]: ", y + dy[i])
                    if (x + dx[i] >= 0 && x + dx[i] < 3 && y + dy[i] >= 6 && y + dy[i] < 9) {
                        if (visited[x + dx[i]][y - 6 + dy[i]] === false) {
                            threeByThree(link, x + dx[i], y + dy[i], array, visited)
                        }
                    }
                }
            }

        }
    } else if (x >= 3 && x < 6) {
        if (y < 3) {
            visited[x - 3][y] = true
            if(index !== -1) {
                array.splice(index, 1)
            }
            if (visited.every(e => {
                    if (e.every(a => a === true)) return true
                })) {
                return array;
            } else {
                for (var i = 0; i < 4; i++) {
                    console.log("x+dx[i]: ", x + dx[i], "y+dy[i]: ", y + dy[i])
                    if (x + dx[i] >= 3 && x + dx[i] < 6 && y + dy[i] >= 0 && y + dy[i] < 3) {
                        if (visited[x - 3 + dx[i]][y + dy[i]] === false) {
                            threeByThree(link, x + dx[i], y + dy[i], array, visited)
                        }
                    }
                }
            }
        } else if (y >= 3 && y < 6) {
            visited[x - 3][y - 3] = true
            if(index !== -1) {
                array.splice(index, 1)
            }
            if (visited.every(e => {
                    if (e.every(a => a === true)) return true
                })) {
                return array;
            } else {
                for (var i = 0; i < 4; i++) {
                    console.log("x+dx[i]: ", x + dx[i], "y+dy[i]: ", y + dy[i])
                    if (x + dx[i] >= 3 && x + dx[i] < 6 && y + dy[i] >= 3 && y + dy[i] < 6) {
                        if (visited[x - 3 + dx[i]][y - 3 + dy[i]] === false) {
                            threeByThree(link, x + dx[i], y + dy[i], array, visited)
                        }
                    }
                }

            }

        } else {
            visited[x - 3][y - 6] = true
            if(index !== -1) {
                array.splice(index, 1)
            }
            if (visited.every(e => {
                    if (e.every(a => a === true)) return true
                })) {
                return array;
            } else {
                for (var i = 0; i < 4; i++) {
                    console.log("x+dx[i]: ", x + dx[i], "y+dy[i]: ", y + dy[i])
                    if (x + dx[i] >= 3 && x + dx[i] < 6 && y + dy[i] >= 6 && y + dy[i] < 9) {
                        if (visited[x - 3 + dx[i]][y - 6 + dy[i]] === false) {
                            threeByThree(link, x + dx[i], y + dy[i], array, visited)
                        }
                    }
                }

            }

        }

    } else if (x >= 6 && x < 9) {
        if (y < 3) {
            visited[x - 6][y] = true
            if(index !== -1) {
                array.splice(index, 1)
            }
            if (visited.every(e => {
                    if (e.every(a => a === true)) return true
                })) {
                return array;
            } else {

                for (var i = 0; i < 4; i++) {
                    console.log("x+dx[i]: ", x + dx[i], "y+dy[i]: ", y + dy[i])
                    if (x + dx[i] >= 6 && x + dx[i] < 9 && y + dy[i] >= 0 && y + dy[i] < 3) {
                        if (visited[x - 6 + dx[i]][y + dy[i]] === false) {
                            threeByThree(link, x + dx[i], y + dy[i], array, visited)
                        }
                    }
                }
            }

        } else if (y >= 3 && y < 6) {
            visited[x - 6][y - 3] = true
            if(index !== -1) {
                array.splice(index, 1)
            }
            if (visited.every(e => {
                    if (e.every(a => a === true)) return true
                })) {
                return array;
            } else {
                for (var i = 0; i < 4; i++) {
                    console.log("x+dx[i]: ", x + dx[i], "y+dy[i]: ", y + dy[i])
                    if (x + dx[i] >= 6 && x + dx[i] < 9 && y + dy[i] >= 3 && y + dy[i] < 6) {
                        if (visited[x - 6 + dx[i]][y - 3 + dy[i]] === false) {
                            threeByThree(link, x + dx[i], y + dy[i], array, visited)
                        }
                    }
                }

            }

        } else {
            visited[x - 6][y - 6] = true
            if(index !== -1) {
                array.splice(index, 1)
            }
            if (visited.every(e => {
                    if (e.every(a => a === true)) return true
                })) {
                return array;
            } else {
                for (var i = 0; i < 4; i++) {
                    console.log("x+dx[i]: ", x + dx[i], "y+dy[i]: ", y + dy[i])
                    if (x + dx[i] >= 6 && x + dx[i] < 9 && y + dy[i] >= 6 && y + dy[i] < 9) {
                        if (visited[x - 6 + dx[i]][y - 6 + dy[i]] === false) {
                            threeByThree(link, x + dx[i], y + dy[i], array, visited)
                        }
                    }
                }

            }


        }

    }

}


function whereIsEmptyPoint(link, emptyArray) {
    for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
            if (link[x][y] === 0) {
                emptyArray.push([x, y])
            }
        }
    }
    return emptyArray
}

function row(link, empty, numbers) {
    for (var i = 0; i < link[empty].length; i++) {
        if (link[empty][i] !== 0) {
            var index = numbers.findIndex(e => e === link[empty][i])
            numbers.splice(index, 1)
        }
    }
    return numbers
}

function col(link, empty, numbers) {
    for (var i = 0; i < link[empty].length; i++) {
        if (link[i][empty] !== 0) {
            var index = numbers.findIndex(e => e === link[i][empty])
            numbers.splice(index, 1)
        }
    }
    return numbers
}


sdoku()