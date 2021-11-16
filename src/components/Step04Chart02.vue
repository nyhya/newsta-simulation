<template>
  <div class="echart">
    <div id="Step04Chart02"></div>
  </div>
</template>
<script>
import * as UTIL from "../utils/util";
export default {
  data() {
    return {
      myChart: {},
      option: {
        grid: {
          top: 40,
          left: 10,
          right: 35,
          bottom: 0,
          containLabel: true,
          show: true,
          borderWidth: 0.5,
          borderColor: "#EDF2F6",
        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              width: 10,
              interval: 0,
              formatter: function (value) {
                var valueArr = value.split("\n");
                var type = valueArr[0].replace(" ", "").toUpperCase();
                var result =
                  valueArr.length > 1
                    ? "{" +
                      type +
                      "|" +
                      valueArr[0] +
                      "}{BR|\n\n}{SUB|" +
                      valueArr[1] +
                      "}"
                    : "{SUB|" + valueArr[0] + "}";
                return result;
              },
              rich: {
                FC: {
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "rgba(34,34,34,0.75)",
                },
                GSL: {
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#FFD325",
                },
                SSL: {
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#E55876",
                },
                ESL: {
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#D4D4D4",
                },
                BR: {
                  fontSize: 6,
                },
                SUB: {
                  fontSize: 12,
                  color: "#74808E",
                },
              },
            },
            data: ["", "", "", "", ""],
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          // 바그래프 01 : 시작
          {
            name: "series_name_01",
            type: "bar",
            color: "#5D88FB",
            barWidth: 13,
            stack: "group01",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              normal: {},
            },
            data: [0, 0, 0, 0, 0],
            label: {
              show: true,
              position: "insideLeft",
              distance: 8,
              formatter: function (series) {
                var result =
                  series.value != 0
                    ? "{basic|" + UTIL.getCommaNumber(series.value) + "}"
                    : "{zero|" + UTIL.getCommaNumber(series.value) + "}";
                return result;
              },
              rich: {
                basic: {
                  borderColor: "#5D88FB",
                  borderWidth: 1,
                  padding: [3, 5, 3, 5],
                  borderRadius: [5, 5, 5, 5],
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "#5D88FB",
                },
                zero: {
                  fontSize: 0,
                  width: 0,
                  height: 0,
                },
              },
            },
          },
          // 바그래프 01 : 끝
          // 바그래프 02 : 시작
          {
            name: "series_name_02",
            type: "bar",
            color: "#7ED0DC",
            barWidth: 13,
            stack: "group01",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              normal: {},
            },
            data: [0, 0, 0, 0, 0],
            label: {
              show: true,
              position: "insideLeft",
              distance: 8,
              formatter: function (series) {
                var result =
                  series.value != 0
                    ? "{basic|" + UTIL.getCommaNumber(series.value) + "}"
                    : "{zero|" + UTIL.getCommaNumber(series.value) + "}";
                return result;
              },
              rich: {
                basic: {
                  borderColor: "#7ED0DC",
                  borderWidth: 1,
                  padding: [3, 5, 3, 5],
                  borderRadius: [5, 5, 5, 5],
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "#7ED0DC",
                },
                zero: {
                  fontSize: 0,
                  width: 0,
                  height: 0,
                },
              },
            },
            // 바그래프 01 : 끝
          },
          // 바그래프 02 : 끝
          // 바그래프 03 : 시작
          {
            name: "series_name_03",
            type: "bar",
            stack: "group01",
            color: "#715DEF",
            emphasis: {
              focus: "series",
            },
            data: [0, 0, 0, 0, 0],
            label: {
              show: true,
              position: "insideLeft",
              distance: 8,
              formatter: function (series) {
                var result =
                  series.value > 0
                    ? "{basic|" + UTIL.getCommaNumber(series.value) + "}"
                    : "{zero|0}";
                return result;
              },
              rich: {
                basic: {
                  borderColor: "#3F7EC8",
                  borderWidth: 1,
                  padding: [3, 5, 3, 5],
                  borderRadius: [5, 5, 5, 5],
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "#00428E",
                },
                zero: {
                  fontSize: 0,
                  width: 0,
                  height: 0,
                },
              },
            },
          },
          // 바그래프 03 : 시작
          // 라인그래프 04 : 시작
          {
            name: "series_name_04",
            type: "line",
            color: "#D85AB1",
            emphasis: {
              focus: "series",
            },
            data: [0, 0, 0, 0, 0],
            label: {
              show: true,
              position: "outside",
              distance: 8,
              formatter: function (series) {
                var result =
                  series.value > 0
                    ? "{basic|" + UTIL.getCommaNumber(series.value) + "}"
                    : "{zero|0}";
                return result;
              },
              rich: {
                basic: {
                  borderColor: "#D85AB1",
                  borderWidth: 1,
                  padding: [3, 5, 3, 5],
                  borderRadius: [5, 5, 5, 5],
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "#171717",
                },
                zero: {
                  fontSize: 0,
                  width: 0,
                  height: 0,
                },
              },
            },
          },
          // 라인그래프 04 : 끝
        ],
      },
    };
  },
  created() {
    var that = this;
    window.getApp.$on("UPDATE_CHART", function () {
      console.log("Step04Chart02", "UPDATE_CHART");
      that.setData();
      that.updateChart();
    });
  },
  mounted() {
    this.myChart = window.echarts.init(
      document.getElementById("Step04Chart02"),
      null,
      { renderer: this.$store.state.chartRenderer }
    );
    this.myChart.setOption(this.option);

    var that = this;
    setTimeout(function () {
      that.setData();
      that.updateChart();
    }, 300);
  },
  methods: {
    setData() {
      var data01 = this.$store.state.calData.resultData.B148.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var data02 = this.$store.state.calData.resultData.B149.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var data03 = this.$store.state.calData.resultData.B150.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var data04 = this.$store.state.calData.resultData.B151.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var xAxisData = this.$store.state.calData.resultData.B152.slice(
        0,
        5
      ).reduce(function (result, data, idx) {
        result.push(String(data).concat("\n", idx + 1, "차년도"));
        return result;
      }, []);
      this.$set(this.option.series[0], "data", data01);
      this.$set(this.option.series[1], "data", data02);
      this.$set(this.option.series[2], "data", data03);
      this.$set(this.option.series[3], "data", data04);
      this.$set(this.option.xAxis[0], "data", xAxisData);
    },
    updateChart() {
      var that = this;
      setTimeout(function () {
        that.myChart.setOption(that.option);
      }, 500);
    },
  },
};
</script>