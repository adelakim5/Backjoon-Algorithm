function sol(input){
    let d = Array(input).fill(0)
    d[0] = BigInt(0)
    d[1] = BigInt(0)
    d[2] = BigInt(0)
    for(let i=3; i<=input; i++){
        d[i] = d[i-2] + d[i-1]
    }
    return d[input].toString()
}

console.log(sol(90))