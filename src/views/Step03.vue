<template>
  <div class="home-wrap">
    <div class="contents">
      <Controller ref="Controller" />
      <div class="chart-area">
        <div class="chart-box">
          <categoryTop></categoryTop>
          <div class="chart">
            <div class="chart-container">
              <p class="chart-sec-tit">1차년 영업수당</p>
              <Step03Chart01></Step03Chart01>
            </div>
            <div class="chart-container">
              <p class="chart-sec-tit">1차년 신인보너스</p>
              <Step03Chart02></Step03Chart02>
            </div>
            <div class="chart-container">
              <p class="chart-sec-tit">Override</p>
              <Step03Chart03></Step03Chart03>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 하단 버튼 영역 : s  -->
    <div class="button-area">
      <button class="back-btn" @click="onClickBack">뒤로</button>
      <button class="next-btn" @click="onClickNext">급여 합산</button>
    </div>
    <!-- 하단 버튼 영역 : e  -->
  </div>
</template>

<script>
import Controller from "../components/InputController.vue";
import Step03Chart01 from "../components/Step03Chart01.vue";
import Step03Chart02 from "../components/Step03Chart02.vue";
import Step03Chart03 from "../components/Step03Chart03.vue";
import categoryTop from "../components/chartRecuiting.vue";

export default {
  name: "Home",
  components: {
    Controller,
    Step03Chart01,
    Step03Chart02,
    Step03Chart03,
    categoryTop,
  },

  mounted() {
    this.$store.commit("setPlayStep", 3);
  },
  methods: {
    onClickNext() {
      this.$router.push("/Step04");
    },
    onClickBack() {
      this.$router.push("/Step02");
    },
  },
};
</script>
