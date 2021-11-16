import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import sheetCalculationTotal from './plugins/sheetCalculationTotal'
import sheetCalculationSales from './plugins/sheetCalculationSales'
import sheetCalculationResult from './plugins/sheetCalculationResult'
import * as CONSTANT from './constant'
import * as EXCEL from './utils/excel'
import _ from 'lodash'
import common_css from './assets/css/common.css'
import style_css from './assets/css/style.css'
import * as echarts from "echarts";

window.echarts = echarts;
Vue.config.productionTip = false
Vue.use(common_css);
Vue.use(style_css);
Vue.use(VueLodash, { name: 'custom', lodash: lodash })
Vue.use(sheetCalculationTotal, store, CONSTANT, EXCEL, _)
Vue.use(sheetCalculationSales, store, CONSTANT, EXCEL, _)
Vue.use(sheetCalculationResult, _)

Vue.filter('comma', function (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
