<template>
  <div class="echart">
    <div id="Step03Chart01"></div>
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
            },
            data: [
              "1차월",
              "2차월",
              "3차월",
              "4차월",
              "5차월",
              "6차월",
              "7차월",
              "8차월",
              "9차월",
              "10차월",
              "11차월",
              "12차월",
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
      document.getElementById("Step03Chart01"),
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
      var data = this.$store.state.calData.resultData.B137.slice(0, 12).map(
        function (d) {
          return parseInt(d / 1000);
        }
      );
      this.$set(this.option.series[0], "data", data);
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