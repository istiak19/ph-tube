function getTime(time){
    const hour=parseInt(time/3600)
    const second=time%3600
    const min=parseInt(second/60)
    const remainingSecond=min%60
    return `${hour} hour ${min} mint ${remainingSecond} second`
}

const output=getTime(4567)
console.log(output)