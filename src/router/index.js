import Vue from 'vue'
import VueRouter from 'vue-router'
import Step01 from '../views/Step01.vue'
import Step02 from '../views/Step02.vue'
import Step03 from '../views/Step03.vue'
import Step04 from '../views/Step04.vue'
import Step05Bank from '../views/Step05Bank.vue'
import Step06Table from '../views/Step06Table.vue'

Vue.use(VueRouter)

const routes = [
  // 소득시뮬레이터 디자인01_미적용 1차년
  {
    path: '/',
    redirect: '/Step01'
  },
  // 소득시뮬레이터 디자인01_미적용 1차년
  {
    path: '/Step01',
    name: 'Step01',
    component: Step01
  },
  // 소득시뮬레이터 디자인02_미적용 결과
  {
    path: '/Step02',
    name: 'Step02',
    component: Step02
  },
  // 소득시뮬레이터 디자인03_적용1차년
  {
    path: '/Step03',
    name: 'Step03',
    component: Step03
  },
  // 소득시뮬레이터 디자인04_적용 결과
  {
    path: '/Step04',
    name: 'Step04',
    component: Step04
  },
  // 소득시뮬레이터 디자인05_급여통장
  {
    path: '/Step05',
    name: 'Step05Bank',
    component: Step05Bank
  },
  // 소득시뮬레이터 디자인06_소득테이블1_선택 전
  {
    path: '/Step06',
    name: 'Step06',
    component: Step06Table
  },
]

const router = new VueRouter({
  routes
})

export default router
