<template>
  <div class="input-area">
    <!-- 상품 MIX : s  -->
    <p class="category-tit">상품 MIX</p>
    <div class="inputs">
      <div class="input-box input01">
        <p class="sec-txt">종신</p>
        <select
          class="select-component"
          id="prodMixInput01"
          :disabled="$store.state.playStep != 1"
          @change="onChangeMix('prodMixInput01')"
          v-model="prodMixInput01"
        >
          <option
            :value="value"
            v-for="(value, idx) in _.range(0, 110, 10)"
            :key="`prodMixInput01-${idx}`"
          >
            {{ value }}%
          </option>
        </select>
      </div>
      <div class="input-box input02">
        <p class="sec-txt">변액</p>
        <select
          class="select-component"
          id="prodMixInput02"
          :disabled="$store.state.playStep != 1"
          @change="onChangeMix('prodMixInput02')"
          v-model="prodMixInput02"
        >
          <option
            :value="value"
            v-for="(value, idx) in _.range(0, 110, 10)"
            :key="`prodMixInput02-${idx}`"
          >
            {{ value }}%
          </option>
        </select>
      </div>
      <div class="input-box input03">
        <p class="sec-txt">연금</p>
        <select
          class="select-component"
          id="prodMixInput03"
          :disabled="$store.state.playStep != 1"
          @change="onChangeMix('prodMixInput03')"
          v-model="prodMixInput03"
        >
          <option
            :value="value"
            v-for="(value, idx) in _.range(0, 110, 10)"
            :key="`prodMixInput03-${idx}`"
          >
            {{ value }}%
          </option>
        </select>
      </div>
    </div>
    <!-- 상품 MIX : e  -->
    <div class="seperate-line"></div>
    <!-- 계약조건 : s  -->
    <p class="category-tit">계약조건</p>
    <div class="select-area" style="height: 36px">
      <p class="sec-txt" style="top: 10px">유지율</p>
      <div class="select-components">
        <select
          class="select-component"
          :disabled="$store.state.playStep != 1"
          @change="onChangeContractConditions"
          v-model="selectedContractConditions"
        >
          <option
            :value="data.value"
            v-for="data in contractConditionsList"
            :key="`contractConditionsList-${data.key}`"
          >
            {{ data.title }}
          </option>
        </select>
      </div>
    </div>
    <!-- 계약조건 : e  -->
    <div class="seperate-line"></div>
    <!-- 입력 : s  -->
    <p class="category-tit">입력</p>
    <div class="select-area" style="margin-bottom: 28px">
      <div class="selects compo01">
        <p class="sec-txt icon icon01">월 영업</p>
        <select
          class="select-component"
          :class="{ 'on-pupple': $store.state.playStep == 1 }"
          :disabled="$store.state.playStep != 1"
          @change="onChangeMonthlySalesMomey"
          v-model="selectedMonthBusiness"
        >
          <option
            :value="data.value"
            v-for="data in monthlySalesMomeyList"
            :key="`monthlySalesMomeyList-${data.key}`"
          >
            {{ data.title }}
          </option>
        </select>
      </div>
      <div class="selects compo02">
        <p class="sec-txt icon icon02">신인 보너스</p>
        <select
          class="select-component"
          :class="{ 'on-blue': $store.state.playStep == 1 }"
          :disabled="$store.state.playStep != 1"
          @change="onChangeNewbieBonus"
          v-model="selectedNewbieBonus"
        >
          <option
            :value="data.value"
            v-for="data in newbieBonusList"
            :key="`newbieBonusList-${data.key}`"
          >
            {{ data.title }}
          </option>
        </select>
      </div>
    </div>
    <!-- 입력 : e  -->
    <!-- 리크루팅 : s  -->
    <div v-if="$store.state.playStep >= 3">
      <p class="category-tit">리크루팅</p>
      <div class="select-container" style="padding-top: 20px">
        <p class="sec-txt icon icon03">직접 리크루팅</p>
        <select
          class="select-component"
          style="width: 71%"
          :class="{ 'recruiting-area': $store.state.playStep == 3 }"
          :disabled="$store.state.playStep != 3"
          @change="onChangeRecruitingDirectMonth"
          v-model="recruitingDirectMonth"
        >
          <option
            :value="data.value"
            v-for="data in recruitingDirectMonthList"
            :key="`recruitingDirectMonthList-${data.key}`"
          >
            {{ data.title }}
          </option>
        </select>
        <p class="extra-txt">에 1명 모집</p>
      </div>

      <div class="select-container" style="padding-top: 20px">
        <p class="sec-txt icon icon04">직접 리크루팅 최대 인원</p>

        <select
          class="select-component"
          :class="{ 'recruiting-area': $store.state.playStep == 3 }"
          :disabled="$store.state.playStep != 3"
          @change="onChangeRecruitingDirectSubUser"
          v-model="recruitingDirectSubUser"
        >
          <option
            :value="data.value"
            v-for="data in recruitingDirectSubUserList"
            :key="`recruitingDirectSubUserList-${data.key}`"
          >
            {{ data.title }}
          </option>
        </select>
      </div>
      <div class="select-container" style="padding-top: 20px" v-if="false">
        <p class="sec-txt icon icon05">간접 리크루팅</p>

        <select
          class="select-component"
          :class="{ 'recruiting-area': $store.state.playStep == 3 }"
          :disabled="$store.state.playStep != 3"
          @change="onChangeRecruitingIndirectPercent"
          v-model="recruitingIndirectPercent"
        >
          <option
            :value="data.value"
            v-for="data in recruitingIndirectPercentList"
            :key="`recruitingIndirectPercentList-${data.key}`"
          >
            {{ data.title }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Controller",

  computed: {},
  created() {
    this.isLoading = false;
    this.prodMixInput01 = parseInt(this.$store.state.life * 100);
    this.prodMixInput02 = parseInt(this.$store.state.variable * 100);
    this.prodMixInput03 = parseInt(this.$store.state.pension * 100);
    this.selectedContractConditions = this.$store.state.retentionRate;
    this.selectedMonthBusiness = this.$store.state.monthBusiness;
    this.selectedNewbieBonus = this.$store.state.newbieBonus.replace(" ", "");
    this.recruitingDirectMonth = this.$store.state.recruitMonth;
    this.recruitingDirectSubUser = this.$store.state.recruitPersonnel;
    this.recruitingIndirectPercent = 0;
  },
  mounted() {
    console.log("coltroller", "mounted");
    var that = this;
    setTimeout(function () {
      that.isLoading = true;
    }, 400);
  },
  data() {
    return {
      isLoading: false,
      prodMixInput01: 100, // 상품 MIX - 종신
      prodMixInput02: 0, // 상품 MIX - 변액
      prodMixInput03: 0, // 상품 MIX - 연금
      monthlySalesMomeyList: [
        { key: 1, title: "10만원", value: 100000 },
        { key: 2, title: "20만원", value: 200000 },
        { key: 3, title: "30만원", value: 300000 },
        { key: 4, title: "40만원", value: 400000 },
        { key: 5, title: "50만원", value: 500000 },
        { key: 6, title: "60만원", value: 600000 },
        { key: 7, title: "70만원", value: 700000 },
        { key: 8, title: "80만원", value: 800000 },
        { key: 9, title: "90만원", value: 900000 },
        { key: 10, title: "100만원", value: 1000000 },
      ],
      contractConditionsList: [
        { key: 1, title: "평균 유지율", value: 0.015 },
        { key: 2, title: "상위20% 유지율", value: 0.007 },
        { key: 3, title: "100%", value: 0 },
      ],
      newbieBonusList: [
        { key: 1, title: "우수 신인", value: "JobChange" },
        { key: 2, title: "골드 유스", value: "GoldYouth" },
        { key: 3, title: "일반 신인", value: "SuperRookie" },
        { key: 4, title: "경력자", value: "없음" },
      ],
      recruitingDirectMonthList: [
        { key: 1, title: "1개월", value: 1 },
        { key: 2, title: "2개월", value: 2 },
        { key: 3, title: "3개월", value: 3 },
        { key: 4, title: "6개월", value: 6 },
      ],
      recruitingDirectSubUserList: [
        { key: 0, title: "0명", value: 0 },
        { key: 1, title: "1명", value: 1 },
        { key: 2, title: "2명", value: 2 },
        { key: 3, title: "3명", value: 3 },
        { key: 4, title: "4명", value: 4 },
        { key: 5, title: "5명", value: 5 },
        { key: 6, title: "6명", value: 6 },
        { key: 7, title: "7명", value: 7 },
        { key: 8, title: "8명", value: 8 },
        { key: 9, title: "9명", value: 9 },
        { key: 10, title: "10명", value: 10 },
        { key: 11, title: "11명", value: 11 },
        { key: 12, title: "12명", value: 12 },
        { key: 13, title: "13명", value: 13 },
        { key: 14, title: "14명", value: 14 },
        { key: 15, title: "15명", value: 15 },
        { key: 16, title: "16명", value: 16 },
        { key: 17, title: "17명", value: 17 },
        { key: 18, title: "18명", value: 18 },
        { key: 19, title: "19명", value: 19 },
        { key: 20, title: "20명", value: 20 },
      ],
      recruitingIndirectPercentList: [
        { key: 0, title: "사용안함", value: 0 },
        { key: 1, title: "직접 리크루팅의 50%", value: 0.5 },
        { key: 2, title: "직접 리크루팅의 100%", value: 1 },
        { key: 3, title: "직접 리크루팅의 150%", value: 1.5 },
        { key: 4, title: "직접 리크루팅의 200%", value: 2 },
        { key: 5, title: "직접 리크루팅의 250%", value: 2.5 },
      ],
      selectedContractConditions: 0.015,
      selectedMonthBusiness: 500000,
      selectedNewbieBonus: "JobChange",
      recruitingDirectMonth: 1,
      recruitingDirectSubUser: 20,
      recruitingIndirectPercent: 0,
    };
  },
  methods: {
    onClickResetData() {
      console.log("onClickResetData");
      this.prodMixInput01 = 100;
      this.prodMixInput02 = 0;
      this.prodMixInput03 = 0;
      this.selectedContractConditions = 0.015;
      this.selectedMonthBusiness = 500000;
      this.selectedNewbieBonus = "JobChange";
      this.recruitingDirectMonth = 1;
      this.recruitingDirectSubUser = 20;
      this.recruitingIndirectPercent = 0;

      var data = {
        monthBusiness: this.selectedMonthBusiness,
        life: this.prodMixInput01 / 100,
        variable: this.prodMixInput02 / 100,
        pension: this.prodMixInput03 / 100,
        retentionRate: this.selectedContractConditions,
        recruitMonth: this.recruitingDirectMonth,
        recruitPersonnel: this.recruitingDirectSubUser,
        newbieBonus: this.selectedNewbieBonus,
        runCal: true,
      };

      this.$store.commit("setResetData", data);
    },
    onClickInputText(thisKey, targetID) {
      if (this.$store.state.playStep == 1) {
        this[thisKey] = false;
        this.$refs[targetID].focus();
      }
    },
    /**
     * 상품 MIX-종신,변액,연금 변경시 구동되는 함수
     */
    onChangeMix(id) {
      var that = this;
      var sumTotal =
        this.prodMixInput01 + this.prodMixInput02 + this.prodMixInput03;
      if (sumTotal > 100) {
        console.log("onChangeMix - 100 Over", id);
        alert("상품 MIX의 합산이 100%를 넘을 수 없습니다.");
        setTimeout(() => {
          if (id == "prodMixInput01") {
            that.prodMixInput01 = 0;
            that.prodMixInput02 = 0;
            that.prodMixInput03 = 0;
          }
          if (id == "prodMixInput02") {
            that.prodMixInput02 = 0;
            that.prodMixInput03 = 0;
          }
          if (id == "prodMixInput03") {
            that.prodMixInput03 = 0;
          }
        }, 100);

        return;
      }
      if (id == "prodMixInput01") {
        this.prodMixInput02 = Math.max(0, 100 - sumTotal);
      }
      if (id == "prodMixInput02") {
        this.prodMixInput03 = Math.max(0, 100 - sumTotal);
      }

      this.$store.commit("changeStateMix", {
        life: this.prodMixInput01,
        variable: this.prodMixInput02,
        pension: this.prodMixInput03,
        runCal: this.isLoading,
      });
    },
    /**
     * 계약조건-유지율 변경시 구동되는 함수
     */
    onChangeContractConditions() {
      this.$store.commit("setStateValue", {
        key: "retentionRate",
        value: this.selectedContractConditions,
        runCal: this.isLoading,
      });
    },
    /**
     * 입력-월영업 변경시 구동되는 함수
     */
    onChangeMonthlySalesMomey() {
      this.$store.commit("setStateValue", {
        key: "monthBusiness",
        value: this.selectedMonthBusiness,
        runCal: this.isLoading,
      });
    },
    /**
     * 입력-신인보너스 변경시 구동되는 함수
     */
    onChangeNewbieBonus() {
      this.$store.commit("setStateValue", {
        key: "newbieBonus",
        value: this.selectedNewbieBonus,
        runCal: this.isLoading,
      });
    },
    onChangeRecruitingDirectMonth() {
      this.$store.commit("setStateValue", {
        key: "recruitMonth",
        value: this.recruitingDirectMonth,
        runCal: this.isLoading,
      });
    },
    onChangeRecruitingDirectSubUser() {
      this.$store.commit("setStateValue", {
        key: "recruitPersonnel",
        value: this.recruitingDirectSubUser,
        runCal: this.isLoading,
      });
    },
    onChangeRecruitingIndirectPercent() {
      this.$store.commit("setStateValue", {
        key: "recruitIndirect",
        value: 0,
        runCal: this.isLoading,
      });
    },
  },
};
</script>

<style scoped>
.input-area .inputs .input-box input,
.select-component {
  color: #000 !important;
  background-color: #fff !important;
}
.select-component:disabled,
.input-area .inputs .input-box input:read-only {
  color: #222222 !important;
  background-color: #becffe !important;
}
.select-component.on-pupple {
  background-color: #5d88fb !important;
  color: #fff !important;
}
.select-component.on-blue {
  background-color: #715def !important;
  color: #fff !important;
}
select.recruiting-area {
  background-color: #40b9ca !important;
  color: #fff !important;
}
.select-component option:not(:checked) {
  background-color: #fff !important;
  color: #000 !important;
}
</style>