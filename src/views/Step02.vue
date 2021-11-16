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
            <div class="category-tit entire">
              <div class="bullet"></div>
              전체 총계
            </div>
            <span class="extra">(단위 : 천원)</span>
          </div>
          <div class="chart">
            <div class="chart-container">
              <p class="chart-sec-tit">1차년 월 수입 합계</p>
              <Step02Chart01></Step02Chart01>
            </div>
            <div class="chart-container">
              <p class="chart-sec-tit">5년간 연 수입</p>
              <Step02Chart02></Step02Chart02>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 하단 버튼 영역 : s  -->
    <div class="button-area">
      <button class="back-btn" @click="onClickBack">뒤로</button>
      <button class="next-btn" @click="onClickNext">리크루팅 추가</button>
    </div>
    <!-- 하단 버튼 영역 : e  -->
  </div>
</template>

<script>
import Controller from "../components/InputController.vue";
import Step02Chart01 from "../components/Step02Chart01.vue";
import Step02Chart02 from "../components/Step02Chart02.vue";

export default {
  name: "Home",
  components: {
    Controller,
    Step02Chart01,
    Step02Chart02,
  },

  mounted() {
    this.$store.commit("setPlayStep", 2);
  },
  methods: {
    onClickNext() {
      this.$router.push("/Step03");
    },
    onClickBack() {
      this.$router.push("/Step01");
    },
  },
};
</script>

