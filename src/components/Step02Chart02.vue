<template>
  <div class="echart">
    <div id="Step02Chart02"></div>
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
                  color: "rgba()34.34.34.0.75",
                },
                GSL: {
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#F5A200",
                },
                SSL: {
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#B84C97",
                },
                ESL: {
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#717271",
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
            data: [
              "FC\n1차년도",
              "FC\n2차년도",
              "FC\n3차년도",
              "FC\n4차년도",
              "FC\n5차년도",
            ],

            axisTick: {
              show: false,
            },
            axisLine: {
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
                  series.value > 0
                    ? "{basic|" + UTIL.getCommaNumber(series.value) + "}"
                    : "{zero|" + UTIL.getCommaNumber(series.value) + "}";
                return result;
              },
              rich: {
                basic: {
                  borderColor: "#96A6E5",
                  borderWidth: 1,
                  padding: [3, 5, 3, 5],
                  borderRadius: [5, 5, 5, 5],
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "#000",
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
                    : "{zero|" + UTIL.getCommaNumber(series.value) + "}";
                return result;
              },
              rich: {
                basic: {
                  borderColor: "#715DEF",
                  borderWidth: 1,
                  padding: [3, 5, 3, 5],
                  borderRadius: [5, 5, 5, 5],
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "#715DEF",
                },
                zero: {
                  fontSize: 0,
                  width: 0,
                  height: 0,
                },
              },
            },
          },
          {
            name: "series_name_05",
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
                    : "{zero|" + UTIL.getCommaNumber(series.value) + "}";
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
        ],
      },
    };
  },
  created() {
    var that = this;
    window.getApp.$on("UPDATE_CHART", function () {
      that.setData();
      that.updateChart();
    });
  },
  mounted() {
    this.myChart = window.echarts.init(
      document.getElementById("Step02Chart02"),
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
      var data01 = this.$store.state.calData.resultData.B144.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var data02 = this.$store.state.calData.resultData.B145.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var data03 = this.$store.state.calData.resultData.B146.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var xAxisData = this.$store.state.calData.resultData.B147.slice(
        0,
        5
      ).reduce(function (result, data, idx) {
        result.push(String(data).concat("\n", idx + 1, "차년도"));
        return result;
      }, []);
      this.$set(this.option.series[0], "data", data01);
      this.$set(this.option.series[1], "data", data02);
      this.$set(this.option.series[2], "data", data03);
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