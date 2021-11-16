export default [
    {
        name: 'CALCULATION',
        callback: function () {
            let start = new Date();
            var totalData = this.$sheetCalculationTotal.cal();
            var salesData = this.$sheetCalculationSales.cal();
            var resultData = this.$sheetCalculationResult.cal(totalData, salesData);
            var calData = {
                totalData: totalData,
                salesData: salesData,
                resultData: resultData,
            };
            let end = new Date();
            console.log((end - start) / 1000 + "초 걸림", calData);

            this.$store.commit("setCalData", calData);
            window.calData = calData;

            window.getApp.$emit("UPDATE_CHART");
        }
    },
];