const sheetCalculationSales = {
    install(Vue, store, CONSTANT, EXCEL, _) {
        // "영업" 시트 계산 값 모음 변수
        var salesData = {}

        /**
         * 유지율
         */
        const retentionRateList = function (type, rate) {
            var resultArr01 = _.reduce(_.range(240), function (result, data, idx) {
                if (idx == 0) {
                    result.push(1)
                } else {
                    var rateTxt = type == CONSTANT.LAPSE_TYPE.Liner ?
                        (result[idx - 1] - rate).toFixed(6) :
                        (result[idx - 1] - result[idx - 1] * rate).toFixed(6);
                    result.push(parseFloat(rateTxt))
                }
                return result;
            }, [])
            var resultArr02 = _.reduce(resultArr01, function (result, data, idx) {
                var sliceArr = resultArr01.slice(1, idx + 1);
                result.push(idx > 0 ? _.sum(sliceArr) / sliceArr.length : resultArr01[idx]);
                return result;
            }, [])
            return {
                no: _.map(resultArr01, function (d, i) { return i + 1 }),
                round: resultArr01,
                avg: resultArr02
            }
        }

        /**
         * 정착율
         */
        const settlingRateList = function (type, rate) {
            var resultArr01 = _.reduce(_.range(50), function (result, data, idx) {
                if (idx == 0) {
                    result.push(1)
                } else {
                    var rateTxt = type == CONSTANT.LAPSE_TYPE.Liner ?
                        (result[idx - 1] - rate).toFixed(6) :
                        (result[idx - 1] - result[idx - 1] * rate).toFixed(6);
                    result.push(parseFloat(rateTxt))
                }
                return result;
            }, [])
            return {
                no: _.map(resultArr01, function (d, i) { return i + 1 }),
                round: resultArr01,
            }
        }

        /**
         * "영업" 시트의 교육 [B3]
         */
        const calB3List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(typeof CONSTANT._B21[idx] == "undefined" ? 0 : CONSTANT._B21[idx]);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 신인 활동 지원 [B4]
         */
        const calB4List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(typeof CONSTANT._B22[idx] == "undefined" ? 0 : CONSTANT._B22[idx]);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 신인 정착 지원 [B5]
         */
        const calB5List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(typeof salesData.B32List[idx] == "undefined" ? 0 : salesData.B32List[idx]);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 모집 [B6]
         */
        const calB6List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx > 0 ? salesData.B62List[idx - 1] + salesData.B63List[idx - 1] : 0);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 13회유지 [B7]
         */
        const calB7List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx > 0 ? salesData.B191List[idx - 1] + salesData.B192List[idx - 1] : 0);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 도입 성과 [B8]
         */
        const calB8List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx > 0 ? salesData.B464List[idx - 1] + salesData.B465List[idx - 1] : 0);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 13회 성과 [B9]
         */
        const calB9List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx > 0 ? salesData.B593List[idx - 1] + salesData.B594List[idx - 1] : 0);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 수입안정 수수료 [B10]
         */
        const calB10List = function () {
            return salesData.B56List.slice()
        }

        /**
         * "영업" 시트의 고객관리+계약유지 [B11]
         */
        const calB11List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx > 0 ? salesData.B319List[idx - 1] + salesData.B320List[idx - 1] : 0);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 고성과 분기 보너스 [B12]
         */
        const calB12List = function () {
            return salesData.B731List.slice()
        }

        /**
         * "영업" 시트의 Total [B13]
         */
        const calB13List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                var sum = 0.0 +
                    salesData.B3List[idx] +
                    salesData.B4List[idx] +
                    salesData.B5List[idx] +
                    salesData.B6List[idx] +
                    salesData.B7List[idx] +
                    salesData.B8List[idx] +
                    salesData.B9List[idx] +
                    salesData.B10List[idx] +
                    salesData.B11List[idx] +
                    salesData.B12List[idx];

                result.push(sum);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 Total [B14]
         */
        const calB14List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B13List[idx] - salesData.B5List[idx] - salesData.B8List[idx] - salesData.B9List[idx]);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 Total [B15]
         */
        const calB15List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx > 0 ? salesData.B59List[idx - 1] : 0);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 Total [B16]
         */
        const calB16List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B399List[idx]);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 Total [B17]
         */
        const calB17List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B397List[idx]);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 Total [B18]
         */
        const calB18List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B384List[idx]);
                return result
            }, [])
        }

        /**
         * "영업" 시트의 신입 지원 횟수 표 [B25]
         */
        const calB25List = function () {
            var countArr = _.range(12);
            var dataList01 = _.reduce(countArr, function (result, data, idx) {
                var tmpValue = salesData.B738List[idx] >= 1500000 ? 3 : 1;
                result.push(idx > 0 ? tmpValue : 1);
                return result;
            }, []);
            var dataList02 = _.reduce(countArr, function (result, data, idx) {
                var tmpValue01 = salesData.B399List[idx] >= 1 ? 3 : 1;
                var tmpValue02 = salesData.B399List[idx] >= 2 ? 5 : tmpValue01;
                result.push(idx > 0 ? tmpValue02 : 1);
                return result;
            }, []);
            var dataList03 = _.reduce(countArr, function (result, data, idx) {
                var tmpValue = salesData.B384List[idx] == 'G SL' ? 10 : 1;
                result.push(idx > 0 ? tmpValue : 1);
                return result;
            }, []);
            var dataList04 = _.reduce(countArr, function (result, data, idx) {
                var tmpValue = salesData.B384List[idx] == 'S SL' ? 15 : 1;
                result.push(idx > 0 ? tmpValue : 1);
                return result;
            }, []);
            var dataList05 = _.reduce(countArr, function (result, data, idx) {
                result.push(Math.max(dataList01[idx], dataList02[idx], dataList03[idx], dataList04[idx]));
                return result;
            }, []);

            return {
                '업적': dataList01,
                '도입': dataList02,
                'G SL': dataList03,
                'S SL': dataList04,
                '최대값': dataList05,
            }
        }

        /**
         * "영업" 시트의 신인정착지원 [B32]
         */
        const calB32List = function () {
            return _.reduce(_.range(12), function (result, data, idx) {
                var findText = store.state.newbieBonus.replace(" ", "");

                result.push(CONSTANT._P25[findText] * salesData.B25List['최대값'][idx]);
                return result;
            }, [])
        }

        /**
         * "영업" 시트의 모집 수수료 [B45]
         */
        const calB45List = function () {
            return _.range(0.7, 60, 0)
        }

        /**
         * "영업" 시트의 IQA13 [B46]
         */
        const calB46List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx > 12 ? salesData.retentionRateList.avg[12] : salesData.retentionRateList.avg[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 IQA25 [B47]
         */
        const calB47List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx > 24 ? salesData.retentionRateList.avg[24] : salesData.retentionRateList.avg[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 IQA37 [B48]
         */
        const calB48List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx > 36 ? salesData.retentionRateList.avg[36] : salesData.retentionRateList.avg[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 3개월 평가정산 CANP 누계 [B49]
         */
        const calB49List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                var lessMonth = idx == 0 ? salesData.B739List[idx] : salesData.B739List[idx - 1] + salesData.B739List[idx]
                result.push(idx < 2 ? lessMonth : salesData.B739List[idx - 2] + salesData.B739List[idx - 1] + salesData.B739List[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 6개월 평가정산 CANP 누계 [B50]
         */
        const calB50List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx < 23 ? 0 : _.sum(salesData.B739List.slice(idx - 5, idx + 1)))
                return result
            }, [])
        }

        /**
         * "영업" 시트의 FYC_RATE [B51]
         */
        const calB51List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                if (idx == 0) {
                    result.push(0.9)
                }
                else if (idx < 3) {
                    var rowB = EXCEL.match(salesData.B49List[idx - 1], _.keys(CONSTANT._B35))
                    result.push(salesData.B384List[idx] == 'FC' ? CONSTANT._B35[rowB][0.0] : Math.max(1, CONSTANT._B35[rowB][0.0]))
                }
                else if (idx < 12) {
                    var rowE = EXCEL.match(salesData.B49List[idx - 1], _.keys(CONSTANT._E35), 1)
                    var columE = EXCEL.match(EXCEL.average(salesData.B46List.slice(idx - 3, idx)), _.keys(CONSTANT._E35[0]), 1)

                    result.push(salesData.B384List[idx] == 'FC' ? CONSTANT._E35[rowE][columE] : Math.max(1, CONSTANT._E35[rowE][columE]))
                }
                else if (idx < 24) {
                    var rowJ = EXCEL.match(salesData.B49List[idx - 1], _.keys(CONSTANT._J35), 1)
                    var columJ = EXCEL.match(EXCEL.average(salesData.B46List.slice(idx - 3, idx)), _.keys(CONSTANT._J35[0]), 1)

                    result.push(salesData.B384List[idx] == 'FC' ? CONSTANT._J35[rowJ][columJ] : Math.max(1, CONSTANT._J35[rowJ][columJ]))
                }
                else {
                    var rowQ = EXCEL.match(salesData.B49List[idx - 1], _.keys(CONSTANT._Q35), 1)
                    var columQ = EXCEL.match(EXCEL.average(salesData.B47List.slice(idx - 3, idx)), _.keys(CONSTANT._Q35[0]), 1)

                    result.push(salesData.B384List[idx] == 'FC' ? CONSTANT._Q35[rowQ][columQ] : Math.max(1, CONSTANT._Q35[rowQ][columQ]))
                }
                return result
            }, [])
        }

        /**
         * "영업" 시트의 25 생산성 RAGE [B52]
         */
        const calB52List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                if (idx < 24) {
                    result.push(0.0)
                }
                else {
                    var rowZ = EXCEL.match(salesData.B50List[idx - 1], _.keys(CONSTANT._Z35), 1)
                    var columZ = EXCEL.match(salesData.B47List[idx - 1], _.keys(CONSTANT._Z35[0]), 1)

                    result.push(CONSTANT._Z35[rowZ][columZ])
                }
                return result
            }, [])
        }

        /**
         * "영업" 시트의 37 생산성 RAGE [B53]
         */
        const calB53List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                if (idx < 36) {
                    result.push(0.0)
                }
                else {
                    var rowAF = EXCEL.match(salesData.B50List[idx - 1], _.keys(CONSTANT._AF35), 1)
                    var columAF = EXCEL.match(salesData.B48List[idx - 1], _.keys(CONSTANT._AF35[0]), 1)

                    result.push(CONSTANT._AF35[rowAF][columAF])
                }
                return result
            }, [])
        }

        /**
         * "영업" 시트의 적립률 [B54]
         */
        const calB54List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B51List[idx] < 1.0 ? 0.1 : 0.2)
                return result
            }, [])
        }

        /**
         * "영업" 시트의 선지급수수료 [B62]
         */
        const calB62List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B738List[idx] * salesData.B51List[idx] * salesData.B45List[idx] * (1.0 - salesData.B54List[idx]))
                return result
            }, [])
        }

        /**
         * "영업" 시트의 환수수수료 [B63]
         */
        const calB63List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(_.chain(salesData.B64List).flatMap(function (arr) { return arr[idx] }).sum().value())
                return result
            }, [])
        }

        /**
         * "영업" 시트의 환수수수료 리스트 -> 이중배열 (x,y) [B64]
         */
        const calB64List = function () {
            return _.reduce(_.range(60), function (result01, data01, idx01) {
                result01.push(_.reduce(_.range(60), function (result02, data02, idx02) {
                    if (idx01 > idx02 || idx02 - idx01 > 23) {
                        result02.push(0)
                    }
                    else if (idx01 == idx02) {
                        var tmp01 = salesData.B744List[idx01][idx02] / salesData.B735List[idx01] * salesData.B45List[idx01] * salesData.B51List[idx01] * (1.0 - salesData.B54List[idx01])
                        result02.push(tmp01)
                    }
                    else {
                        var tmp02 = salesData.B744List[idx01][idx02] / salesData.B735List[idx01] * salesData.B45List[idx01] * salesData.B51List[idx01] * (1.0 - salesData.B54List[idx01]) / 24 * (24 - (idx02 - idx01))
                        result02.push(tmp02)
                    }
                    return result02;
                }, []))
                return result01;
            }, []);
        }

        /**
         * "영업" 시트의 13회 유지 적립(발생) [B127]
         */
        const calB127List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B738List[idx] * salesData.B51List[idx] * salesData.B45List[idx] * salesData.B54List[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 13회 유지 적립(발생) : BP 환수 [B128]
         */
        const calB128List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(_.chain(salesData.B129List).flatMap(function (arr) { return arr[idx] }).sum().value())
                return result
            }, [])
        }

        /**
         * "영업" 시트의 13회 유지 적립(발생) : BP 환수 리스트 -> 이중배열 (x,y) [B129]
         */
        const calB129List = function () {
            return _.reduce(_.range(60), function (result01, data01, idx01) {
                result01.push(_.reduce(_.range(60), function (result02, data02, idx02) {
                    if (idx01 > idx02 || idx02 - idx01 > 12) {
                        result02.push(0)
                    }
                    else if (idx01 == idx02) {
                        var tmp01 = salesData.B744List[idx01][idx02] / salesData.B735List[idx01] * salesData.B45List[idx01] * salesData.B51List[idx01] * salesData.B54List[idx01]
                        result02.push(tmp01)
                    }
                    else {
                        var tmp02 = salesData.B744List[idx01][idx02] / salesData.B735List[idx01] * salesData.B45List[idx01] * salesData.B51List[idx01] * salesData.B54List[idx01] / 24 * (24 - (idx02 - idx01))
                        result02.push(tmp02)
                    }
                    return result02;
                }, []))
                return result01;
            }, []);
        }

        /**
         * "영업" 시트의 13회 유지 적립(발생) : BP 환수 리스트 합계 [BK129]
         */
        const calBK129List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(_.sum(salesData.B129List[idx]))
                return result
            }, [])
        }

        /**
         * "영업" 시트의 13회 유지 지급 : 환수 수수료 [B192]
         */
        const calB192List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(_.chain(salesData.B193List).flatMap(function (arr) { return arr[idx] }).sum().value())
                return result
            }, [])
        }

        /**
         * "영업" 시트의 13회 유지 지급 : 환수 수수료 리스트 -> 이중배열 (x,y) [B193]
         */
        const calB193List = function () {
            return _.reduce(_.range(60), function (result01, data01, idx01) {
                result01.push(_.reduce(_.range(60), function (result02, data02, idx02) {
                    if (idx02 - idx01 < 13 || idx02 - idx01 > 23) {
                        result02.push(0)
                    }
                    else {
                        var term = _.chain(salesData.B191List)
                            .filter(function (o, idx) { return idx == 12 + idx01 })
                            .sum()
                            .value()

                        var tmp = _.chain(salesData.B127List)
                            .filter(function (o, idx) { return idx == idx01 })
                            .sum()
                            .value()

                        var result = idx01 == 0 ? (tmp * store.state.retentionRate * -1) / 24 * (24 - idx02) : (tmp * store.state.retentionRate * -1) / 24 * (24 - (idx02 - idx01))
                        result02.push(term == 0 ? 0 : result)
                    }
                    return result02;
                }, []))
                return result01;
            }, []);
        }

        /**
         * "영업" 시트의 계약유지 [B319]
         */
        const calB319List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                var tmp = _.chain(salesData.B321List).flatMap(function (arr) { return arr[idx] }).sum().value()
                result.push(idx < 24 ? tmp : tmp - salesData.B320List[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 계약유지 [B320]
         */
        const calB320List = function () {
            return _.reduce(_.range(60), function (result01, data01, idx01) {
                var tmp = _.reduce(_.range(idx01 - 23), function (result02, data02, idx02) {
                    result02.push(salesData.B321List[idx02][idx01])
                    return result02
                }, [])

                result01.push(idx01 < 24 ? 0 : _.sum(tmp))
                return result01
            }, [])
        }

        /**
         * "영업" 시트의 계약유지 리스트 -> 이중배열 (x,y) [B321]
         */
        const calB321List = function () {
            return _.reduce(_.range(54), function (result01, data01, idx01) {
                result01.push(_.reduce(_.range(60), function (result02, data02, idx02) {
                    if (idx02 - idx01 < 12) {
                        result02.push(0)
                    }
                    else if (idx02 - idx01 < 24) {
                        result02.push(salesData.B742List[idx02 - idx01] * (1 - salesData.B45List[idx01]) * salesData.B51List[idx01] * 0.083)
                    }
                    else if (idx02 - idx01 == 24 || idx02 - idx01 == 36) {
                        result02.push(((salesData.B742List[idx02 - idx01] * 0.005) + (salesData.B742List[idx02 - idx01] * salesData.B52List[idx02])))
                    }
                    else {
                        result02.push(salesData.B742List[idx02 - idx01] * 0.005)
                    }
                    return result02
                }, []))
                return result01
            }, [])
        }

        /**
         * "영업" 시트의 E SL [B383]
         */
        const calB383List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx < 12 ? '' : salesData.B391List[idx] >= 90000000 && salesData.B392List[idx] >= 30 ? 'E SL' : '')
                return result
            }, [])
        }

        /**
         * "영업" 시트의 신분 [B384]
         */
        const calB384List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                if (idx < 5) {
                    result.push('FC')
                }
                else if (idx < 12) {
                    var rowH = EXCEL.match(salesData.B738List[idx] * 3, _.keys(CONSTANT._H376), 1)
                    var columH = EXCEL.match(salesData.B399List[idx], _.keys(CONSTANT._H376[0]), 1)
                    var level = idx < 8 ? CONSTANT._H376[rowH][columH] : CONSTANT._M376[rowH][columH]

                    result.push(level)
                }
                else {
                    var rowM = EXCEL.match(salesData.B738List[idx - 1] * 3, _.keys(CONSTANT._M376), 1)
                    var columM = EXCEL.match(salesData.B399List[idx - 1], _.keys(CONSTANT._M376[0]), 1)

                    var rowR = EXCEL.match(salesData.B738List[idx] * 3, _.keys(CONSTANT._R376), 1)
                    var columR = EXCEL.match(salesData.B399List[idx], _.keys(CONSTANT._R376[0]), 1)

                    result.push(salesData.B383List[idx] == 'E SL' ? CONSTANT._R376[rowR][columR] : CONSTANT._M376[rowM][columM])
                }
                return result
            }, [])
        }

        /**
         * "영업" 시트의 도입 [B385]
         */
        const calB385List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(CONSTANT._C376[salesData.B384List[idx]]['intro'])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 육성 [B386]
         */
        const calB386List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(CONSTANT._C376[salesData.B384List[idx]]['upbring'])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 관리 [B387]
         */
        const calB387List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(CONSTANT._C376[salesData.B384List[idx]]['management'])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 Total [B388]
         */
        const calB388List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B385List[idx] + salesData.B386List[idx] + salesData.B387List[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 선지급률 [B389]
         */
        const calB389List = function () {
            return _.range(0.7, 60, 0)
        }

        /**
         * "영업" 시트의 전전월 3개월 업적 [B391]
         */
        const calB391List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx < 12 ? 0 : salesData.B393List[idx - 4] + salesData.B393List[idx - 3] + salesData.B393List[idx - 2])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 전전월 3개월 인원 [B392]
         */
        const calB392List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx < 12 ? 0 : salesData.B394List[idx - 4] + salesData.B394List[idx - 3] + salesData.B394List[idx - 2])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 직할 업적 [B393]
         */
        const calB393List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(idx < 8 ? 0 : salesData.B738List[idx] * salesData.B394List[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 직할 인원 [B394]
         */
        const calB394List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B397List[idx] + salesData.B399List[idx] + 1)
                return result
            }, [])
        }

        /**
         * "영업" 시트의 간접도입 [B397]
         */
        const calB397List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(Math.floor(salesData.B399List[idx] * store.state.recruitIndirect))
                return result
            }, [])
        }

        /**
         * "영업" 시트의 도입인원 [B398]
         */
        const calB398List = function () {
            return _.reduce(_.range(60), function (result) {
                result.push(0);
                return result;
            }, [])
        }

        /**
         * "영업" 시트의 누적도입 인원 합계 [B399]
         */
        const calB399List = function () {
            return _.reduce(salesData.B400List, function (result, data) {
                result.push(Math.min(store.state.recruitPersonnel, _.sum(data)));
                return result;
            }, [])
        }

        /**
         * "영업" 시트의 누적도입 리스트 -> 이중 배열 (y,x)
         */
        const calB400List = function () {
            // result01 = 회차
            // result02 = 누적도입 인원
            return _.reduce(_.range(1, 61, 1), function (result01, data01, idx01) {
                var tmpArr = _.reduce(_.range(1, 61, 1), function (result02, data02, idx02) {
                    var sumFirst = _.chain(salesData.B398List)
                        .filter(function (o, idx) { return idx + 1 == idx02 + 1 })
                        .sum()
                        .value()

                    var sumSecond = _.chain(salesData.settlingRateList.round)
                        .filter(function (o, idx) { return idx + 1 == (idx02 == 0 ? idx01 + 1 : idx01 + 1 - idx02) })
                        .sum()
                        .value()

                    result02.push(idx02 == 0 ? sumFirst * sumSecond : Math.round(sumFirst * sumSecond))
                    return result02;
                }, [])

                result01.push(tmpArr)
                return result01;
            }, [])
        }

        /**
         * "영업" 시트의 CANP(간도) [B462]
         */
        const calB462List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B738List[idx] * salesData.B397List[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 CANP(직도) [B463]
         */
        const calB463List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B738List[idx] * salesData.B399List[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 육성성과 [B464]
         */
        const calB464List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push((salesData.B463List[idx] * salesData.B388List[idx] * salesData.B389List[idx] + salesData.B462List[idx] * salesData.B387List[idx] * salesData.B389List[idx]))
                return result
            }, [])
        }

        /**
         * "영업" 시트의 환수 [B465]
         */
        const calB465List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(_.chain(salesData.B466List).flatMap(function (arr) { return arr[idx] }).sum().value())
                return result
            }, [])
        }

        /**
         * "영업" 시트의 환수 리스트 -> 이중 배열 (x,y)
         */
        const calB466List = function () {
            var result = _.reduce(_.range(60), function (result01, data01, idx01) {
                result01.push(_.reduce(_.range(60), function (result02, data02, idx02) {
                    var b464 = _.chain(salesData.B464List)
                        .filter(function (o, idx) { return idx == idx01 })
                        .sum()
                        .value()

                    if (idx01 == 0) {
                        result02.push(idx01 >= idx02 || idx02 >= 24 + idx01 ? 0 : Math.floor((b464 * store.state.retentionRate * -1) / 24 * (24 - idx02) * 100) / 100.0)
                    }
                    else {
                        result02.push(idx01 >= idx02 || idx02 >= 24 + idx01 ? 0 : Math.floor((b464 * store.state.retentionRate * -1) / 24 * (24 - (idx02 - idx01)) * 100) / 100.0)
                    }
                    return result02;
                }, []))
                return result01;
            }, []);
            return result
        }

        /**
         * "영업" 시트의 13회 유지 성과 적립 [B529]
         */
        const calB529List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(Math.floor((salesData.B463List[idx] * salesData.B388List[idx] * (1 - salesData.B389List[idx]) + salesData.B462List[idx] * salesData.B387List[idx] * (1 - salesData.B389List[idx])) * 100) / 100.0)
                return result
            }, [])
        }

        /**
         * "영업" 시트의 13회 유지 성과 적립 : BP 환수 [B530]
         */
        const calB530List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(_.chain(salesData.B531List).flatMap(function (arr) { return arr[idx] }).sum().value())
                return result
            }, [])
        }

        /**
         * "영업" 시트의 13회 유지 성과 적립 : BP 환수 리스트 -> 이중 배열 (x,y)
         */
        const calB531List = function () {
            return _.reduce(_.range(60), function (result01, data01, idx01) {
                result01.push(_.reduce(_.range(60), function (result02, data02, idx02) {
                    var b529 = _.chain(salesData.B529List)
                        .filter(function (o, idx) { return idx == idx01 })
                        .sum()
                        .value()

                    if (idx01 == 0) {
                        result02.push(idx01 >= idx02 || idx02 >= 13 + idx01 ? 0 : ((b529 * store.state.retentionRate * -1) / 24 * (24 - idx02)))
                    }
                    else {
                        result02.push(idx01 >= idx02 || idx02 >= 13 + idx01 ? 0 : ((b529 * store.state.retentionRate * -1) / 24 * (24 - (idx02 - idx01))))
                    }
                    return result02;
                }, []))
                return result01;
            }, []);
        }

        /**
         * "영업" 시트의 13회 유지 성과 적립 : BP 환수 리스트 합계 [BK531]
         */
        const calBK531List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(_.sum(salesData.B531List[idx]))
                return result
            }, [])
        }

        /**
         * "영업" 시트의 13회 유지 성과 지급 : BP 환수 [B594]
         */
        const calB594List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(_.chain(salesData.B595List).flatMap(function (arr) { return arr[idx] }).sum().value())
                return result
            }, [])
        }

        /**
         * "영업" 시트의 13회 유지 성과 지급 : BP 환수 리스트 -> 이중 배열 (x,y)
         */
        const calB595List = function () {
            return _.reduce(_.range(60), function (result01, data01, idx01) {
                result01.push(_.reduce(_.range(60), function (result02, data02, idx02) {
                    var tmpValue = -1
                    if (idx02 - idx01 < 13 || idx02 - idx01 > 23) {
                        tmpValue = 0
                    } else {
                        var term = _.chain(salesData.B593List)
                            .filter(function (o, idx) { return idx == 12 + idx01 })
                            .sum()
                            .value()

                        var tmp = _.chain(salesData.B529List)
                            .filter(function (o, idx) { return idx == idx01 })
                            .sum()
                            .value()

                        var result = idx01 == 0 ? (tmp * store.state.retentionRate * -1) / 24 * (24 - idx02) : (tmp * store.state.retentionRate * -1) / 24 * (24 - (idx02 - idx01))
                        tmpValue = term == 0 ? 0 : result
                    }
                    result02.push(tmpValue)
                    return result02;
                }, []))
                return result01;
            }, []);
        }

        /**
         * "영업" 시트의 TOTAL
         */
        const calB731List = function () {
            var tmpIdx = 0;
            return _.reduce(_.range(60), function (result, data, idx) {
                var calIdx = (idx + 2) % 3
                var isCal = idx >= 13 && calIdx == 0 ? 1 : 0;

                var tmpIQA25 = salesData.retentionRateList.avg[idx];
                var round13 = salesData.retentionRateList.round[12];
                var avgCANP = _.sum(salesData.B739List.slice(tmpIdx, tmpIdx + 2)) / 3;
                var mIdx01 = EXCEL.match(avgCANP, _.keys(CONSTANT._F720), 1)
                var mIdx02 = EXCEL.match(tmpIQA25, _.keys(CONSTANT._F720[0]), 1)
                var value = CONSTANT._F720[mIdx01][mIdx02] * round13;

                result.push(isCal > 0 ? value : 0)

                if (isCal) {
                    tmpIdx = tmpIdx + 3;
                }
                return result;
            }, [])
        }

        /**
         * "영업" 시트의 CMIP [C734]
         */
        const calC734 = function () {
            return store.state.monthBusiness
        }
        /**
         * "영업" 시트의 Lapse Rate [D734]
         */
        const calD734 = function () {
            return store.state.retentionRate
        }
        /**
         * "영업" 시트의 환산율 [E734]
         */
        const calE734 = function () {
            return store.getters.ingMixSum
        }
        /**
         * "영업" 시트의 CANP [F734]
         */
        const calF734 = function () {
            return salesData.C734 * salesData.E734 * 12
        }
        /**
         * "영업" 시트의 팀 인원 (1-60회차 팀 인원 수 동일) [B735]
         */
        const calB735List = function () {
            return _.range(1, 61, 0)
        }
        /**
         * "영업" 시트의 인당 업적 (1-60회차 인당 업적 값 동일) [B738]
         */
        const calB738List = function () {
            return _.reduce(_.range(60), function (result) {
                result.push(salesData.F734);
                return result;
            }, [])
        }
        /**
         * "영업" 시트의 인당 정산 [B739]
         */
        const calB739List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B741List[idx] / salesData.B735List[idx])
                return result
            }, [])
        }
        /**
         * "영업" 시트의 신계약업적 [B740]
         */
        const calB740List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B738List[idx] * salesData.B735List[idx])
                return result
            }, [])
        }
        /**
         * "영업" 시트의 정산업적 [B741]
         */
        const calB741List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B740List[idx] + salesData.B743List[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 유지업적 [B742]
         */
        const calB742List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(salesData.B740List[idx] * salesData.retentionRateList.round[idx])
                return result
            }, [])
        }

        /**
         * "영업" 시트의 실효업적 [B743]
         */
        const calB743List = function () {
            return _.reduce(_.range(60), function (result, data, idx) {
                result.push(_.chain(salesData.B744List).flatMap(function (arr) { return arr[idx] }).sum().value())
                return result
            }, [])
        }

        /**
         * "영업" 시트의 맨 하단 표 리스트 -> 이중 배열 (x,y)
         */
        const calB744List = function () {
            return _.reduce(_.range(0, 60, 1), function (result01, data01, idx01) {
                var tmpArr = _.reduce(_.range(0, 60, 1), function (result02, data02, idx02) {
                    result02.push(idx01 < idx02 && idx02 - idx01 < 24 ? -(salesData.B740List[idx01] * (salesData.retentionRateList.round[idx02 - 1] - salesData.retentionRateList.round[idx02])) : 0)
                    return result02
                }, [])
                result01.push(tmpArr)
                return result01
            }, [])
        }

        /**
         * "영업" 시트의 B55,B56,B57,B58,B59,B191,B255,B256,B257,B593,B657,B658,B659 값은 서로 연동을 하는 부분이라 동시에 반복 계산을 계산
         */
        const calMultiGroupList = function () {

            var tmpB55List = [];
            var tmpB56List = [];
            var tmpB57List = [];
            var tmpB58List = [];
            var tmpB59List = [];
            var tmpB191List = [];
            var tmpB255List = [];
            var tmpB256List = [];
            var tmpB257List = _.range(60).map(function () { return _.fill(_.range(60), 0) });
            var tmpB593List = [];
            var tmpB657List = [];
            var tmpB658List = [];
            var tmpB659List = _.range(60).map(function () { return _.fill(_.range(60), 0) });


            _.forEach(_.range(60), function (idx) {
                var tmpB191Value01 = idx >= 12 ? salesData.B127List[idx - 12] : 0;
                var tmpB191Value02 = idx >= 12 ? salesData.BK129List[idx - 12] : 0;
                tmpB191List.push(tmpB59List[idx - 1] >= 6000000 ? tmpB191Value01 + tmpB191Value02 : 0);

                var tmpB255Value01 = idx >= 12 ? salesData.B127List[idx - 12] : 0;
                var tmpB255Value02 = idx >= 12 ? salesData.BK129List[idx - 12] : 0;
                tmpB255List.push(tmpB59List[idx - 1] < 6000000 ? tmpB255Value01 + tmpB255Value02 : 0);

                var tmpB593Value01 = idx >= 12 ? salesData.B529List[idx - 12] : 0;
                var tmpB593Value02 = idx >= 12 ? salesData.BK531List[idx - 12] : 0;
                tmpB593List.push(tmpB59List[idx - 1] >= 6000000 ? tmpB593Value01 - tmpB593Value02 : 0);

                var tmpB657Value01 = idx >= 12 ? salesData.B529List[idx - 12] : 0;
                var tmpB657Value02 = idx >= 12 ? salesData.BK531List[idx - 12] : 0;
                tmpB657List.push(tmpB59List[idx - 1] < 6000000 ? tmpB657Value01 - tmpB657Value02 : 0);

                tmpB55List.push(tmpB191List[idx] + tmpB255List[idx] + tmpB593List[idx] + tmpB657List[idx]);

                _.forEach(_.range(60), function (tmpB257Data, tmpB257DataIdx) {
                    if (idx - tmpB257DataIdx < 13 || idx - tmpB257DataIdx > 23) {
                        tmpB257List[tmpB257DataIdx][idx] = 0;
                    } else {
                        var tmpB257Value01 = tmpB255List[tmpB257DataIdx + 12];
                        var tmpB257Value02 = salesData.B127List[tmpB257DataIdx];
                        var tmpB257Value03 = tmpB257DataIdx == 0 ? (tmpB257Value02 * store.state.retentionRate * -1) / 24 * (24 - idx) : (tmpB257Value02 * store.state.retentionRate * -1) / 24 * (24 - (idx - (tmpB257DataIdx + 0)));
                        tmpB257List[tmpB257DataIdx][idx] = tmpB257Value01 == 0 ? 0 : tmpB257Value03
                    }
                });

                tmpB256List.push(_.chain(tmpB257List).flatMap(function (arr) { return arr[idx] }).sum().value());

                _.forEach(_.range(60), function (tmpB659Data, tmpB659DataIdx) {
                    if (idx - tmpB659DataIdx < 13 || idx - tmpB659DataIdx > 23) {
                        tmpB659List[tmpB659DataIdx][idx] = 0;
                    } else {
                        var tmpB659Value01 = tmpB657List[tmpB659DataIdx + 12];
                        var tmpB659Value02 = salesData.B529List[tmpB659DataIdx];
                        var tmpB659Value03 = tmpB659DataIdx == 0 ? (tmpB659Value02 * store.state.retentionRate * -1) / 24 * (24 - idx) : (tmpB659Value02 * store.state.retentionRate * -1) / 24 * (24 - (idx - (tmpB659DataIdx - 0)));
                        tmpB659List[tmpB659DataIdx][idx] = tmpB659Value01 == 0 ? 0 : tmpB659Value03;
                    }
                });

                tmpB658List.push(_.chain(tmpB659List).flatMap(function (arr) { return arr[idx] }).sum().value());


                tmpB56List.push(idx == 0 ? 0 : tmpB59List[idx - 1] >= 6000000 ? tmpB58List[idx - 1] / 12 : 0);

                var tmpB57Value01 = salesData.B127List[idx] + salesData.B128List[idx] + salesData.B529List[idx] + salesData.B530List[idx];
                var tmpB57Value02 = tmpB55List[idx];
                tmpB57List.push(idx == 0 ? tmpB57Value01 : tmpB57Value01 + tmpB57List[idx - 1] - tmpB57Value02);

                var tmpB58Value01 = tmpB255List[idx] + tmpB256List[idx] + tmpB657List[idx] + tmpB658List[idx];

                tmpB58List.push(idx == 0 ? tmpB58Value01 : tmpB58Value01 + tmpB58List[idx - 1] - tmpB56List[idx]);

                tmpB59List.push(tmpB57List[idx] + tmpB58List[idx]);
            });

            return {
                B55List: tmpB55List,
                B56List: tmpB56List,
                B57List: tmpB57List,
                B58List: tmpB58List,
                B59List: tmpB59List,
                B191List: tmpB191List,
                B255List: tmpB255List,
                B256List: tmpB256List,
                B257List: tmpB257List,
                B593List: tmpB593List,
                B657List: tmpB657List,
                B658List: tmpB658List,
                B659List: tmpB659List
            }
        }

        Vue.prototype.$sheetCalculationSales = {
            cal: function () {
                salesData = {};
                salesData.retentionRateList = retentionRateList(store.state.lapse, store.state.retentionRate)
                salesData.settlingRateList = settlingRateList(store.state.lapse, store.state.settlement)

                salesData.C734 = calC734();//-
                salesData.D734 = calD734();//-
                salesData.E734 = calE734();//-
                salesData.F734 = calF734();//-

                salesData.B735List = calB735List();//-
                salesData.B738List = calB738List();//-
                salesData.B740List = calB740List();// 738, 735

                salesData.B744List = calB744List();// 740
                salesData.B743List = calB743List();// 744
                salesData.B741List = calB741List();// 740, 743
                salesData.B742List = calB742List();// 740
                salesData.B739List = calB739List();// 741, 735

                salesData.B45List = calB45List();//-
                salesData.B46List = calB46List();//-
                salesData.B47List = calB47List();//-
                salesData.B48List = calB48List();//-
                salesData.B49List = calB49List();// 739

                salesData.B398List = calB398List();//-
                salesData.B400List = calB400List();// 398
                salesData.B399List = calB399List();// 400

                salesData.B397List = calB397List();// 399
                salesData.B394List = calB394List();// 397, 399
                salesData.B392List = calB392List();// 394
                salesData.B393List = calB393List();// 738, 394
                salesData.B391List = calB391List();// 393

                salesData.B383List = calB383List();// 391, 392
                salesData.B384List = calB384List();// 738, 399, 383

                salesData.B385List = calB385List();// 384
                salesData.B386List = calB386List();// 384
                salesData.B387List = calB387List();// 384
                salesData.B388List = calB388List();// 385, 386, 387
                salesData.B389List = calB389List();//-

                salesData.B51List = calB51List();// 49, 384
                salesData.B54List = calB54List();// 51

                salesData.B129List = calB129List();// 744, 735, 51, 54
                salesData.BK129List = calBK129List();

                salesData.B127List = calB127List();// 738, 51, 45, 54
                salesData.B128List = calB128List();// 129


                salesData.B462List = calB462List();// 738, 397
                salesData.B463List = calB463List();// 738, 399
                salesData.B464List = calB464List();// 463, 388, 389, 462, 387, 389
                salesData.B466List = calB466List();// 464
                salesData.B465List = calB465List();// 466

                salesData.B529List = calB529List();// 463, 388, 389, 462, 387
                salesData.B531List = calB531List();// 529
                salesData.BK531List = calBK531List();
                salesData.B530List = calB530List();// 531

                var tmpMultiGroupList = calMultiGroupList();
                salesData.B55List = tmpMultiGroupList.B55List;
                salesData.B56List = tmpMultiGroupList.B56List;
                salesData.B57List = tmpMultiGroupList.B57List;
                salesData.B58List = tmpMultiGroupList.B58List;
                salesData.B59List = tmpMultiGroupList.B59List;
                salesData.B191List = tmpMultiGroupList.B191List;
                salesData.B255List = tmpMultiGroupList.B255List;
                salesData.B256List = tmpMultiGroupList.B256List;
                salesData.B257List = tmpMultiGroupList.B257List;
                salesData.B593List = tmpMultiGroupList.B593List;
                salesData.B657List = tmpMultiGroupList.B657List;
                salesData.B658List = tmpMultiGroupList.B658List;
                salesData.B659List = tmpMultiGroupList.B659List;


                salesData.B193List = calB193List();// 191, 127
                salesData.B192List = calB192List();// 193

                salesData.B595List = calB595List();// 593, 529, 
                salesData.B594List = calB594List();// 595

                salesData.B50List = calB50List();// 739
                salesData.B52List = calB52List();// 50, 47
                salesData.B53List = calB53List();// 50, 48

                salesData.B62List = calB62List();// 738, 51, 45
                salesData.B64List = calB64List();// 744, 735, 45, 51, 54
                salesData.B63List = calB63List();// 64

                salesData.B321List = calB321List();// 742, 45, 51, 52
                salesData.B320List = calB320List();// 321
                salesData.B319List = calB319List();// 320

                salesData.B25List = calB25List();//738, 399, 384
                salesData.B32List = calB32List();

                salesData.B731List = calB731List();

                salesData.B3List = calB3List();
                salesData.B4List = calB4List();
                salesData.B5List = calB5List();
                salesData.B6List = calB6List();
                salesData.B7List = calB7List();
                salesData.B8List = calB8List();
                salesData.B9List = calB9List();
                salesData.B10List = calB10List();
                salesData.B11List = calB11List();
                salesData.B12List = calB12List();
                salesData.B13List = calB13List();
                salesData.B14List = calB14List();
                salesData.B15List = calB15List();
                salesData.B16List = calB16List();
                salesData.B17List = calB17List();
                salesData.B18List = calB18List();

                return salesData
            }
        }
    }
}

export default sheetCalculationSales