<template>
  <div id="wrap">
    <Controller ref="Controller" />
    <div class="bg-blue"></div>
    <div class="bank-wrap">
      <div class="contents">
        <div class="tit-area">
          <div class="current-tit"></div>
          <div class="main-tit"></div>
        </div>
        <div class="bank-contents">
          <!-- 리쿠르팅 전 : s -->
          <div class="before recruiting">
            <div class="container">
              <div class="data-table-cont">
                <div class="table-tit">
                  <table class="table-section">
                    <tr>
                      <td>개월수</td>
                      <td>월 수수료</td>
                      <td>월 수수료 누적</td>
                    </tr>
                  </table>
                </div>
                <div class="table-contents" ref="beforeTableContents">
                  <table class="table-list">
                    <tr
                      v-for="(data, idx) in leftBankDataMonth"
                      :key="`leftBankDataMonth-${idx}`"
                    >
                      <td>{{ data.idx | comma }}차월</td>
                      <td>{{ data.month | comma }}</td>
                      <td>{{ data.accumulate | comma }}</td>
                    </tr>
                  </table>
                </div>
                <!-- 테이블 : e  -->
              </div>
              <div class="annually-commission-con before">
                <!-- 아이템 리스트 : s -->
                <div
                  class="comission-item before"
                  v-for="data in leftBankDataYear"
                  :key="`leftBankDataYear-${data.idx}`"
                >
                  <div class="item year-num" :class="`year${data.idx}`"></div>
                  <div class="item evg left">
                    <p class="tit">월 평균 수수료</p>
                    <div class="align-right">
                      <p class="num">{{ data.yearAvg | comma }}</p>
                      <p class="extra">천원</p>
                    </div>
                  </div>
                  <div class="item evg sum right">
                    <p class="tit">연봉</p>
                    <div class="align-right">
                      <p class="num">{{ data.yearTotal | comma }}</p>
                      <p class="extra">천원</p>
                    </div>
                  </div>
                </div>
                <!-- 아이템 리스트 : s -->
              </div>
            </div>
          </div>
          <!-- 리크루팅 전 : e  -->
          <!-- 리쿠르팅 후 : s -->
          <div class="after recruiting">
            <div class="data-table-cont">
              <div class="table-tit">
                <!-- 테이블 : s  -->
                <table class="table-section">
                  <tr>
                    <td>개월수</td>
                    <td>월 수수료</td>
                    <td>월 수수료 누적</td>
                  </tr>
                </table>
              </div>
              <div class="table-contents" ref="afterTableContents">
                <table class="table-list">
                  <tr
                    v-for="(data, idx) in rightBankDataMonth"
                    :key="`rightBankDataMonth-${idx}`"
                  >
                    <td>{{ data.idx | comma }}차월</td>
                    <td>{{ data.month | comma }}</td>
                    <td>{{ data.accumulate | comma }}</td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- 테이블 : e  -->
            <div class="annually-commission-con">
              <!-- 아이템 리스트 : s -->
              <div
                class="comission-item after"
                v-for="data in rightBankDataYear"
                :key="`rightBankDataYear-${data.idx}`"
              >
                <div class="item year-num" :class="`year${data.idx}`"></div>
                <div class="item evg left">
                  <p class="tit">월 평균 수수료</p>
                  <div class="align-right">
                    <p class="num">{{ data.yearAvg | comma }}</p>
                    <p class="extra">천원</p>
                  </div>
                </div>
                <div class="item evg sum right">
                  <p class="tit">연봉</p>
                  <div class="align-right">
                    <p class="num">{{ data.yearTotal | comma }}</p>
                    <p class="extra">천원</p>
                  </div>
                </div>
              </div>
              <!-- 아이템 리스트 : s -->
            </div>
          </div>
          <!-- 리쿠르팅 후 : e -->
          <p class="desc-txt">
            ※ 상기 예시는 후보자의 이해를 돕기 위한 Simulation으로 실제 소득은
            다를 수 있습니다.
          </p>
        </div>
      </div>
      <!-- 하단 버튼 영역 : s  -->
      <div class="button-area coordinatesX">
        <div class="bg-draw"></div>
        <button class="btn-home" @click="onClickHome"></button>
        <button
          class="back-btn"
          style="left: 184px"
          @click="onClickBack"
        ></button>
        <button class="next-btn" @click="onClickNext">소득테이블</button>
      </div>
      <!-- 하단 버튼 영역 : e  -->
    </div>
  </div>
</template>
<script>
import Controller from "../components/InputController.vue";
import anime from "animejs/lib/anime.es.js";
export default {
  components: {
    Controller,
  },
  computed: {
    leftBankDataMonth() {
      var that = this;
      return this._.reduce(
        this._.range(60),
        function (result, data, idx) {
          result.push({
            idx: idx + 1,
            month: parseInt(
              that.$store.state.calData.resultData.B82[idx] / 1000
            ),
            accumulate: parseInt(
              that.$store.state.calData.resultData.B83[idx] / 1000
            ),
          });

          return result;
        },
        []
      );
    },
    leftBankDataYear() {
      var that = this;
      return this._.reduce(
        this._.range(5),
        function (result, data, idx) {
          result.push({
            idx: idx + 1,
            yearTotal: parseInt(
              that.$store.state.calData.resultData.B86[idx] / 1000
            ),
            yearAvg: parseInt(
              that.$store.state.calData.resultData.B87[idx] / 1000
            ),
          });

          return result;
        },
        []
      );
    },
    rightBankDataMonth() {
      var that = this;
      return this._.reduce(
        this._.range(60),
        function (result, data, idx) {
          result.push({
            idx: idx + 1,
            month: parseInt(
              that.$store.state.calData.resultData.B90[idx] / 1000
            ),
            accumulate: parseInt(
              that.$store.state.calData.resultData.B91[idx] / 1000
            ),
          });

          return result;
        },
        []
      );
    },
    rightBankDataYear() {
      var that = this;
      return this._.reduce(
        this._.range(5),
        function (result, data, idx) {
          result.push({
            idx: idx + 1,
            yearTotal: parseInt(
              that.$store.state.calData.resultData.B94[idx] / 1000
            ),
            yearAvg: parseInt(
              that.$store.state.calData.resultData.B95[idx] / 1000
            ),
          });

          return result;
        },
        []
      );
    },
  },
  mounted() {
    anime({
      targets: this.$refs.beforeTableContents,
      scrollTop: this.$refs.beforeTableContents.scrollHeight,
      duration: 1500,
      easing: "easeInOutQuad",
    });
    anime({
      targets: this.$refs.afterTableContents,
      scrollTop: this.$refs.afterTableContents.scrollHeight,
      duration: 1500,
      easing: "easeInOutQuad",
    });
  },
  methods: {
    onClickHome() {
      this.$refs.Controller.onClickResetData();
      this.$router.push("/Step01");
    },
    onClickNext() {
      this.$router.push("/Step06");
    },
    onClickBack() {
      this.$router.push("/Step04");
    },
  },
};
</script>
<style scoped>
.input-area {
  width: 0px;
  height: 0px;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>