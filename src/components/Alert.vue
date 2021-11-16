<template>
  <transition name="fade">
    <div class="ess-view ess-view-alert">
      <div>
        <div>
          <div v-html="$store.state.showAlertText"></div>
          <div @click="clickClose">확인</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Alert",
  components: {},
  computed: {},
  data() {
    return {};
  },
  methods: {
    clickClose() {
      this.$store.commit("setShowAlert", { text: "", value: false });
    },
  },
};
</script>
<style scoped>
.ess-view-alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: table;
  z-index: 5000;
}
.ess-view-alert > div {
  display: table-cell;
  vertical-align: middle;
}
.ess-view-alert > div > div {
  font-size: 16px;
  width: 350px;
  margin: auto;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  border-radius: 10px;
}
.ess-view-alert > div > div > div:first-child {
  padding: 30px 0px;
}
.ess-view-alert > div > div > div:last-child {
  padding: 15px 0px;
  box-shadow: inset 0px 1px 0px 0px #ccc;
  background-color: rgba(0, 0, 0, 0.03);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

