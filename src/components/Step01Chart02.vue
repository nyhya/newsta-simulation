<template>
  <div class="echart">
    <div id="Step01Chart02"></div>
    <div class="category-bottom ch02"></div>
  </div>
</template>
<script>
import * as UTIL from "../utils/util";
export default {
  data() {
    return {
      myChart: {},
      option: {
        color: "#715DEF",
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
              "FC\n1차월",
              "FC\n2차월",
              "FC\n3차월",
              "FC\n4차월",
              "FC\n5차월",
              "FC\n6차월",
              "FC\n7차월",
              "FC\n8차월",
              "FC\n9차월",
              "FC\n10차월",
              "FC\n11차월",
              "FC\n12차월",
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
          {
            name: "series_name_0102",
            type: "bar",
            barWidth: 13,
            stack: "group01",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "#FFF",
              borderWidth: 2,
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
      document.getElementById("Step01Chart02"),
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
      var data = this.$store.state.calData.resultData.B155.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      var xAxisData = this.$store.state.calData.resultData.B135.slice(
        0,
        12
      ).reduce(function (result, data, idx) {
        result.push(String(data).concat("\n", idx + 1, "차월"));
        return result;
      }, []);
      this.$set(this.option.series[0], "data", data);
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