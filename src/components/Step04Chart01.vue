<template>
  <div class="echart">
    <div id="Step04Chart01"></div>
  </div>
</template>
<script>
import * as UTIL from "../utils/util";
export default {
  component: {},
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
              "FC\n1차월",
              "FC\n2차월",
              "FC\n3차월",
              "FC\n4차월",
              "FC\n5차월",
              "G SL\n6차월",
              "G SL\n7차월",
              "G SL\n8차월",
              "S SL\n9차월",
              "S SL\n10차월",
              "S SL\n11차월",
              "S SL\n12차월",
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
            // 바그래프 01 : 끝
          },
          // 바그래프 02 : 시작
          {
            name: "series_name_01",
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
            // 바그래프 02 : 끝
          },
          {
            name: "series_name_03",
            type: "bar",
            stack: "group01",
            color: "#715DEF",
            emphasis: {
              focus: "series",
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                  backgroundColor: "#FFF",
                  borderColor: "#715DEF",
                  color: "#715DEF",
                  borderWidth: 1,
                  borderRadius: [5, 5, 5, 5],
                  padding: [3, 5, 3, 5],
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                  color: "#222222",
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
      document.getElementById("Step04Chart01"),
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
      var data01 = this.$store.state.calData.resultData.B137.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var data02 = this.$store.state.calData.resultData.B138.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var data03 = this.$store.state.calData.resultData.B139.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var data04 = this.$store.state.calData.resultData.B140.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var xAxisData = this.$store.state.calData.resultData.B117.slice(
        0,
        12
      ).reduce(function (result, data, idx) {
        result.push(String(data).concat("\n", idx + 1, "차월"));
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