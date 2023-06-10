const validDenomination = (coin) =>{
    return [1,5,10,25,50,100].indexOf(coin) !== -1
}

const valueFromCoinObject = (obj) =>{
    const {denom=0,count=0} = obj
    return validDenomination(denom) ? denom*count:0
}

const valueFromArray = (arr) =>{
    return arr.reduce(
        (acc,val) =>
        Array.isArray(val)? valueFromArray(val) : acc + valueFromCoinObject(val),
        0
    );
}

const coinCount = (...coinage) =>{
    return valueFromArray(coinage);
}

module.exports = {
   coinCount
};

console.log("{}",coinCount({denom:5,count:3}));
