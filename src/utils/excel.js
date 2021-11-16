import _ from 'lodash'

/**
 * 엑셀 match() 함수
 */
function match(searchValue = null, range = {}, equalsOption = 1) {
    var result = 0
    var tmpRange = _.map(range, function (data) { return parseFloat(data) })
    switch (equalsOption) {
        case 1: {
            result = _.chain(tmpRange)
                .filter(function (o) { return o <= searchValue })
                .max()
                .value()
            break;
        }
        case 0: {
            result = tmpRange.filter(function (o) { return parseInt(o) == searchValue })
            break;
        }
        case -1: {
            result = _.chain(tmpRange)
                .filter(function (o) { return o >= searchValue })
                .min()
                .value()
            break;
        }
    }
    return result
}

function average(arr = []) {
    return _.sum(arr) / arr.length
}

/**
 * 엑셀 vlookup() 함수
 * 
 * @param {*} searchValue   찾을값
 * @param {*} range         참조범위
 * @param {*} columNum      열번호 => 지금 필요 없음
 * @param {*} equalsOption  일치옵션
 */
function vlookup(searchValue = null, range = {}, /*columNum = 1,*/ equalsOption = 1) {
    console.log(searchValue, " : ", range, " : ", equalsOption)
}

export { match, average, vlookup }