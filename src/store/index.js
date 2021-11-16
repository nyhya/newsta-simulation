import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  },
  state: {
    playStep: 1,
    monthBusiness: 500000,  // 월 영업
    life: 1.0,  // 종신
    variable: 0.0,  // 변액
    pension: 0.0, // 연금
    settlement: 0.01,  // (고정값) 정착
    lapse: 'Liner', // (고정값) Lapse ( 'Liner' or 'Exponential' )
    retentionRate: 0.015,  // 유지율[0.015, 0.007, 0]
    recruitMonth: 1,  // 직접리크루팅 개월 수
    recruitPersonnel: 20, // 직접리크루팅 인원 수
    recruitIndirect: 0.0, // 간접리크루팅(일단 고정 값으로 사용하며 추후 변경될수있는 로직으로 만들기위해 사용함. 로직까지 연결 되어있음.)
    newbieBonus: 'JobChange',  // 신입 보너스

    P5: 1.0,  // ING 의 WL
    Q5: 0.32,  // ING 의 VA
    R5: 0.27,  // ING 의 ISP

    chartRenderer: "canvas",//canvas, svg
    calData: {}, // 전체 계산된 값들


    showAlert: false,
    showAlertText: "",

  },
  mutations: {
    setPlayStep: function (state, index) {
      state.playStep = index;
    },
    setCalData: function (state, data) {
      state.calData = data;
    },
    changeStateMix: function (state, data) {
      state.life = data.life > 1 ? data.life / 100 : data.life;
      state.variable = data.variable > 1 ? data.variable / 100 : data.variable;
      state.pension = data.pension > 1 ? data.pension / 100 : data.pension;
      if (data.runCal) {
        window.getApp.$emit("CALCULATION");
      }
    },
    setStateValue: function (state, data) {
      state[data.key] = data.value;
      if (data.runCal) {
        window.getApp.$emit("CALCULATION");
      }
    },
    setResetData: function (state, data) {
      console.log("store", data)
      state.monthBusiness = data.monthBusiness;
      state.life = data.life;
      state.variable = data.variable;
      state.pension = data.pension;
      state.retentionRate = data.retentionRate;
      state.recruitMonth = data.recruitMonth;
      state.recruitPersonnel = data.recruitPersonnel;
      state.newbieBonus = data.newbieBonus;
      if (data.runCal) {
        window.getApp.$emit("CALCULATION");
      }
    },
    setShowAlert(state, data) {
      state.showAlertText = data.text;
      state.showAlert = data.value;
    },
  },
  actions: {
  },
  getters: {
    /**
     * "입력 및 그래프" 시트의 MIX 비율 합계  [S3]
     */
    mixRateSum: function (state) {
      return state.life + state.variable + state.pension
    },
    /**
     * "입력 및 그래프" 시트의 ING MIX 합계  [S5]
     */
    ingMixSum: function (state) {
      return (state.life * state.P5 + state.variable * state.Q5 + state.pension * state.R5)
    },
  }
})
