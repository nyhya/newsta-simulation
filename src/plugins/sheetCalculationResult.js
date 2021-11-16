const sheetCalculationResult = {
    install(Vue, _) {
        // "입력 및 그래프" 시트 계산 값 모음 변수
        var resultData = {}

        /**
         * "입력 및 그래프" 시트의 영업 월 수당 표
         */
        const calSalseDataMonth = function (salesData) {
            var tmpB132 = []; //영업수당
            var tmpB133 = []; //신인 보너스
            var tmpB134 = []; //총합
            var tmpB135 = []; //신분
            var tmpB144 = []; //연소득 - 영업수당
            var tmpB145 = []; //연소득 - 신인 보너스
            var tmpB146 = []; //연소득 - 총합
            var tmpB147 = []; //연소득 - 신분

            _.forEach(_.range(60), function (idx) {
                tmpB132.push(salesData.B14List[idx]);
                tmpB133.push(salesData.B5List[idx]);
                tmpB134.push(salesData.B14List[idx] + salesData.B5List[idx]);
                tmpB135.push(salesData.B18List[idx]);
            });
            _.forEach(_.range(60), function (idx) {
                if (idx % 12 == 0) {
                    var tmpValue01 = _.sum(tmpB134.slice(idx, idx + 12)) - _.sum(tmpB133.slice(idx, idx + 12));
                    var tmpValue02 = _.sum(tmpB133.slice(idx, idx + 12));
                    tmpB144.push(tmpValue01);
                    tmpB145.push(tmpValue02);
                    tmpB146.push(tmpValue01 + tmpValue02);
                    tmpB147.push("FC")
                }
            });

            return {
                B132: tmpB132,
                B133: tmpB133,
                B134: tmpB134,
                B135: tmpB135,
                B144: tmpB144,
                B145: tmpB145,
                B146: tmpB146,
                B147: tmpB147
            }
        }

        /**
         * "입력 및 그래프" 시트의 영업+직도+간도 월 수당 표
         */
        const calTotalDataMonth = function (totalData) {
            var tmpB137 = []; //영업수당
            var tmpB138 = []; //Override
            var tmpB139 = []; //신인 보너스
            var tmpB140 = []; //총합
            var tmpB141 = []; //신분
            var tmpB148 = []; // 연소득 - 영업수당
            var tmpB149 = []; // 연소득 - Override
            var tmpB150 = []; // 연소득 - 신인 보너스
            var tmpB151 = []; // 연소득 - 합계
            var tmpB152 = []; // 연소득 - 신분

            _.forEach(_.range(60), function (idx) {
                tmpB137.push(totalData.B14List[idx]);
                tmpB138.push(totalData.B8List[idx] + totalData.B9List[idx]);
                tmpB139.push(totalData.B5List[idx]);
                tmpB140.push(totalData.B14List[idx] + totalData.B8List[idx] + totalData.B9List[idx] + totalData.B5List[idx]);
                tmpB141.push(totalData.B18List[idx]);
            });
            _.forEach(_.range(60), function (idx) {
                if (idx % 12 == 0) {
                    var tmpValue01 = _.sum(tmpB137.slice(idx, idx + 12));
                    var tmpValue02 = _.sum(tmpB138.slice(idx, idx + 12));
                    var tmpValue03 = _.sum(tmpB139.slice(idx, idx + 12));
                    tmpB148.push(tmpValue01);
                    tmpB149.push(tmpValue02);
                    tmpB150.push(tmpValue03);
                    tmpB151.push(tmpValue01 + tmpValue02 + tmpValue03);
                    tmpB152.push(tmpB141[idx + 11]);
                }
            });

            return {
                B137: tmpB137,
                B138: tmpB138,
                B139: tmpB139,
                B140: tmpB140,
                B141: tmpB141,
                B148: tmpB148,
                B149: tmpB149,
                B150: tmpB150,
                B151: tmpB151,
                B152: tmpB152,
            }
        }

        /**
         * "입력 및 그래프" 시트의 영업+직도+간도 신인 보너스
         */
        const calTotalDataBonus = function () {
            var tmpB155 = []; //신인보너스 (원본)
            var tmpB156 = []; //신분
            var tmpB157 = []; //도입상승분
            var tmpB158 = []; //영업+직도
            var tmpB159 = []; //신분

            _.forEach(_.range(12), function (idx) {
                tmpB155.push(resultData.B133[idx]);
                tmpB156.push(resultData.B135[idx]);
                tmpB158.push(resultData.B139[idx]);
                tmpB157.push(tmpB158[idx] - tmpB155[idx]);
                tmpB159.push(resultData.B141[idx]);
            });

            return {
                B155: tmpB155,
                B156: tmpB156,
                B157: tmpB157,
                B158: tmpB158,
                B159: tmpB159
            }
        }

        /**
         * "입력 및 그래프" 시트의 도입FC
         */
        const calTotalDataInputFC = function (totalData) {
            var tmpB101 = []; // 교육
            var tmpB102 = []; // 신인 활동 지원
            var tmpB103 = []; // 신인 정착 지원
            var tmpB104 = []; // 합계
            var tmpB105 = []; // 모집
            var tmpB106 = []; // 13회 유지
            var tmpB107 = []; // 도입 성과
            var tmpB108 = []; // 13회 성과
            var tmpB109 = []; // 수입안정 수수료
            var tmpB110 = []; // 고객관리+계약유지
            var tmpB111 = []; // 고성과분기보너스
            var tmpB112 = []; // Total

            var tmpB114 = []; // 최대 적립 예상액
            var tmpB115 = []; // 직도 인원
            var tmpB116 = []; // 간도 인원
            var tmpB117 = []; // 신분

            _.forEach(_.range(60), function (idx) {
                tmpB101.push(totalData.B3List[idx]);
                tmpB102.push(totalData.B4List[idx]);
                tmpB103.push(totalData.B5List[idx]);
                tmpB104.push(tmpB101[idx] + tmpB102[idx] + tmpB103[idx]);
                tmpB105.push(totalData.B6List[idx]);
                tmpB106.push(totalData.B7List[idx]);
                tmpB107.push(totalData.B8List[idx]);
                tmpB108.push(totalData.B9List[idx]);
                tmpB109.push(totalData.B10List[idx]);
                tmpB110.push(totalData.B11List[idx]);
                tmpB111.push(totalData.B12List[idx]);
                tmpB112.push(tmpB101[idx] + tmpB102[idx] + tmpB103[idx] + tmpB105[idx] + tmpB106[idx] + tmpB107[idx] + tmpB108[idx] + tmpB109[idx] + tmpB110[idx] + tmpB111[idx]);

                tmpB114.push(totalData.B15List[idx])
                tmpB115.push(totalData.B16List[idx])
                tmpB116.push(totalData.B17List[idx])
                tmpB117.push(totalData.B18List[idx])
            });

            return {
                B101: tmpB101,
                B102: tmpB102,
                B103: tmpB103,
                B104: tmpB104,
                B105: tmpB105,
                B106: tmpB106,
                B107: tmpB107,
                B108: tmpB108,
                B109: tmpB109,
                B110: tmpB110,
                B111: tmpB111,
                B112: tmpB112,

                B114: tmpB114,
                B115: tmpB115,
                B116: tmpB116,
                B117: tmpB117,
            }
        }

        /**
         * "입력 및 그래프" 시트의 비도입자 통장
         */
        const calTotalDataInputBankLeft = function () {
            var tmpB82 = []; // 월 수수료
            var tmpB83 = []; // 월 수수료 누적
            var tmpB86 = []; // 연합산수수료
            var tmpB87 = []; // 월평균 수수료

            _.forEach(_.range(60), function (idx) {
                tmpB82.push(resultData.B134[idx]);
                tmpB83.push(idx == 0 ? tmpB82[idx] : tmpB82[idx] + tmpB83[idx - 1]);

            });
            _.forEach(_.range(60), function (idx) {
                if (idx % 12 == 0) {
                    tmpB86.push(_.sum(tmpB82.slice(idx, idx + 12)));
                }
            });
            tmpB87 = tmpB86.map(function (data) { return data / 12 });

            return {
                B82: tmpB82,
                B83: tmpB83,
                B86: tmpB86,
                B87: tmpB87,
            }
        }

        /**
         * "입력 및 그래프" 시트의 도입자 통장
         */
        const calTotalDataInputBankRight = function () {
            var tmpB90 = []; // 월 수수료
            var tmpB91 = []; // 월 수수료 누적
            var tmpB94 = []; // 연합산수수료
            var tmpB95 = []; // 월평균 수수료

            _.forEach(_.range(60), function (idx) {
                tmpB90.push(resultData.B112[idx]);
                tmpB91.push(idx == 0 ? tmpB90[idx] : tmpB90[idx] + tmpB91[idx - 1]);
            });
            _.forEach(_.range(60), function (idx) {
                if (idx % 12 == 0) {
                    tmpB94.push(_.sum(tmpB90.slice(idx, idx + 12)));
                }
            });
            tmpB95 = tmpB94.map(function (data) { return data / 12 });

            return {
                B90: tmpB90,
                B91: tmpB91,
                B94: tmpB94,
                B95: tmpB95,
            }
        }

        Vue.prototype.$sheetCalculationResult = {
            cal: function (totalData, salesData) {
                resultData = {};
                var calSalseDataMonthValue = calSalseDataMonth(salesData);
                var calTotalDataMonthValue = calTotalDataMonth(totalData);

                resultData.B132 = calSalseDataMonthValue.B132;
                resultData.B133 = calSalseDataMonthValue.B133;
                resultData.B134 = calSalseDataMonthValue.B134;
                resultData.B135 = calSalseDataMonthValue.B135;
                resultData.B144 = calSalseDataMonthValue.B144;
                resultData.B145 = calSalseDataMonthValue.B145;
                resultData.B146 = calSalseDataMonthValue.B146;
                resultData.B147 = calSalseDataMonthValue.B147;

                resultData.B137 = calTotalDataMonthValue.B137;
                resultData.B138 = calTotalDataMonthValue.B138;
                resultData.B139 = calTotalDataMonthValue.B139;
                resultData.B140 = calTotalDataMonthValue.B140;
                resultData.B141 = calTotalDataMonthValue.B141;
                resultData.B148 = calTotalDataMonthValue.B148;
                resultData.B149 = calTotalDataMonthValue.B149;
                resultData.B150 = calTotalDataMonthValue.B150;
                resultData.B151 = calTotalDataMonthValue.B151;
                resultData.B152 = calTotalDataMonthValue.B152;

                var calTotalDataBonusValue = calTotalDataBonus();
                resultData.B155 = calTotalDataBonusValue.B155;
                resultData.B155Total = _.sum(resultData.B155);
                resultData.B156 = calTotalDataBonusValue.B156;
                resultData.B157 = calTotalDataBonusValue.B157;
                resultData.B157Total = _.sum(resultData.B157);
                resultData.B158 = calTotalDataBonusValue.B158;
                resultData.B158Total = _.sum(resultData.B158);
                resultData.B159 = calTotalDataBonusValue.B159;

                var calTotalDataInputFCValue = calTotalDataInputFC(totalData);
                resultData.B101 = calTotalDataInputFCValue.B101;
                resultData.B102 = calTotalDataInputFCValue.B102;
                resultData.B103 = calTotalDataInputFCValue.B103;
                resultData.B104 = calTotalDataInputFCValue.B104;
                resultData.B105 = calTotalDataInputFCValue.B105;
                resultData.B106 = calTotalDataInputFCValue.B106;
                resultData.B107 = calTotalDataInputFCValue.B107;
                resultData.B108 = calTotalDataInputFCValue.B108;
                resultData.B109 = calTotalDataInputFCValue.B109;
                resultData.B110 = calTotalDataInputFCValue.B110;
                resultData.B111 = calTotalDataInputFCValue.B111;
                resultData.B112 = calTotalDataInputFCValue.B112;
                resultData.B114 = calTotalDataInputFCValue.B114;
                resultData.B115 = calTotalDataInputFCValue.B115;
                resultData.B116 = calTotalDataInputFCValue.B116;
                resultData.B117 = calTotalDataInputFCValue.B117;

                var calTotalDataInputBankLeftValue = calTotalDataInputBankLeft();
                resultData.B82 = calTotalDataInputBankLeftValue.B82;
                resultData.B83 = calTotalDataInputBankLeftValue.B83;
                resultData.B86 = calTotalDataInputBankLeftValue.B86;
                resultData.B87 = calTotalDataInputBankLeftValue.B87;

                var calTotalDataInputBankRightValue = calTotalDataInputBankRight();
                resultData.B90 = calTotalDataInputBankRightValue.B90;
                resultData.B91 = calTotalDataInputBankRightValue.B91;
                resultData.B94 = calTotalDataInputBankRightValue.B94;
                resultData.B95 = calTotalDataInputBankRightValue.B95;
                return resultData
            }
        }
    }
}

export default sheetCalculationResult