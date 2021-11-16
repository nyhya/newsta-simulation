<template>
  <div class="home-wrap">
    <div class="contents">
      <Controller ref="Controller" />
      <div class="chart-area">
        <div class="chart-box">
          <div class="chartCategory">
            <p class="inner-tit">수수료 예시</p>
            <div class="category-tit commissions">
              <div class="bullet"></div>
              영업수당
            </div>
            <div class="category-tit bonus">
              <div class="bullet"></div>
              신인보너스
            </div>
            <span class="extra">(단위 : 천원)</span>
          </div>
          <div class="chart">
            <div class="chart-container">
              <p class="chart-sec-tit">1차년 영업수당</p>
              <Step01Chart01></Step01Chart01>
            </div>
            <div class="chart-container">
              <p class="chart-sec-tit">1차년 신인보너스</p>
              <Step01Chart02></Step01Chart02>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 하단 버튼 영역 : s  -->
    <div class="button-area">
      <button class="reset-btn" @click="onClickReset">초기화</button>
      <button class="next-btn" @click="onClickNext">급여 합산</button>
    </div>
    <!-- 하단 버튼 영역 : e  -->
  </div>
</template>

<script>
import Controller from "../components/InputController.vue";
import Step01Chart01 from "../components/Step01Chart01.vue";
import Step01Chart02 from "../components/Step01Chart02.vue";
export default {
  name: "Home",
  components: {
    Controller,
    Step01Chart01,
    Step01Chart02,
  },
  mounted() {
    this.$store.commit("setPlayStep", 1);
  },
  methods: {
    onClickReset() {
      this.$refs.Controller.onClickResetData();
    },
    onClickNext() {
      this.$router.push("/Step02");
    },
  },
};
</script>
