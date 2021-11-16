function getRate(value) {

    return parseFloat(parseFloat(value).toFixed(5))
}

function getCommaNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { getRate, getCommaNumber }