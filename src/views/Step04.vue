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
            <div class="category-tit override">
              <div class="bullet"></div>
              override
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
              <Step04Chart01></Step04Chart01>
            </div>
            <div class="chart-container">
              <p class="chart-sec-tit">5년간 연 수입</p>
              <Step04Chart02></Step04Chart02>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 하단 버튼 영역 : s  -->
    <div class="button-area">
      <button class="back-btn" @click="onClickBack">뒤로</button>
      <button class="next-btn" @click="onClickNext">급여통장 보기</button>
    </div>
    <!-- 하단 버튼 영역 : e  -->
  </div>
</template>

<script>
import Controller from "../components/InputController.vue";
import Step04Chart01 from "../components/Step04Chart01.vue";
import Step04Chart02 from "../components/Step04Chart02.vue";

export default {
  name: "Home",
  components: {
    Controller,
    Step04Chart01,
    Step04Chart02,
  },

  mounted() {
    this.$store.commit("setPlayStep", 4);
  },
  methods: {
    onClickNext() {
      this.$router.push("/Step05");
    },
    onClickBack() {
      this.$router.push("/Step03");
    },
  },
};
</script>

