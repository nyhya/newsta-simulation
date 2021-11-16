<template>
  <div id="app">
    <router-view />
    <Alert v-if="$store.state.showAlert" />
  </div>
</template>
<script>
import ViewEvents from "./Events";
import Alert from "@/components/Alert";
export default {
  components: {
    Alert,
  },
  created() {
    var that = this;
    // 이벤트 로드
    ViewEvents.forEach(function (item) {
      that.$on(item.name, item.callback);
    });

    window.getApp = this;
    console.log("영업+직도+간도 시트의 R78 ROW 수식에 오류 있음");
    console.log(
      "입력및그래프 시트의 C148 수식에 오류 있음-신인보너스 참조값이 잘못되어있음"
    );

    window.alert = function (text) {
      that.$store.commit("setShowAlert", { text: text, value: true });
    };

    // this.$store.commit("setStateValue", {
    //   key: "monthBusiness",
    //   value: 100000,
    // });
    // this.$store.commit("setStateValue", { key: "life", value: 0.5 });
    // this.$store.commit("setStateValue", { key: "variable", value: 0.25 });
    // this.$store.commit("setStateValue", { key: "pension", value: 0.25 });
    // this.$store.commit("setStateValue", { key: "retentionRate", value: 0.007 });
    // this.$store.commit("setStateValue", {
    //   key: "newbieBonus",
    //   value: "GoldYouth",
    // });
  },
  data() {
    return {};
  },
  beforeMount() {},
  mounted() {
    window.getApp.$emit("CALCULATION");
  },
};
</script>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
