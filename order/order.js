const menu = [1, 2, 3]
let cashier = []
let manager;
let baristar = []
let nothing = "nothing"
let time = 0
let temp = []
let check = ''

let whatIsDone = (baristar) => {
    let x = '';
    let flag = false
    console.log("*** ***baristar*** ***:", baristar)
    console.log("%%%%%%%%%%%%%", baristar[1])
    baristar.forEach((e, i) => {
        console.log('-------e-------', e, "i:", i)
        let func = () => {
            x += e.id + " done! "
            baristar.shift()
            flag = true
        }
        if (e.id === 1 && e.sec === 3) func()
        if (e.id === 2 && e.sec === 5) func()
        if (e.id === 3 && e.sec === 10) func()
    })
    if (!flag) {
        x = nothing
    }
    return [x, baristar]
}

let makeBeverage = (item) => {

}

let tossToBaristar = (temp) => {
    let x = []
    if(baristar.length === 0){
        if(temp.length > 2){
            x = temp.splice(0, 2)
        } else {
            x = temp.slice()
        }
        baristar.push(x[0])
        baristar.map((e) => e.sec++)
        baristar.push(x)
    }
    if(baristar.length === 2){

    }
}

function order(beverage) {
    cashier.push(beverage)
    if (cashier.length !== 0) {
        manager = cashier.pop()
        let number = Object.values(manager)
        let id = Object.keys(manager)
        for (let i = 0; i < number[0]; i++) {
            temp.push({id: +id[0], sec: 0})
        }
        doBaristar(temp)
    }
}

order({
    1: 2
})
order({
    3: 2
})
order({
    2: 2
})