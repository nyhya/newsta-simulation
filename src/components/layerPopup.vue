<template>
  <div class="layer-warp">
    <div class="table-box">
      <button class="off" @click="$emit('onClickClose')">닫기</button>
      <div class="select-table">
        <table class="select-section">
          <colgroup>
            <col width="14%" />
            <col width="14%" />
            <col width="7%" />
            <col width="13%" />
            <col width="13%" />
            <col width="13%" />
            <col width="13%" />
            <col width="13%" />
          </colgroup>
          <tr class="tit">
            <td colspan="3">{{ selectedMonth }}개월에 1명 모집</td>
            <td colspan="5">총 {{ selectedGroup }}명 모집</td>
          </tr>
          <tr class="sec-tit">
            <td>신인 보너스</td>
            <td>업적(천원)</td>
            <td>구분</td>
            <td class="year">1차년</td>
            <td class="year">2차년</td>
            <td class="year">3차년</td>
            <td class="year">4차년</td>
            <td class="year">5차년</td>
          </tr>
          <tr class="info">
            <td rowspan="2" v-html="selectedType.replace(' ', ' ')"></td>
            <td rowspan="2">{{ selectedLevel | comma }}</td>
            <td class="subdivide">연봉</td>
            <td
              class="num"
              v-for="(data, dataIdx) in selectedValue.filter(function (d) {
                return d.gubun == '연봉';
              })"
              :key="`yearPay-${dataIdx}`"
              :class="{
                'table-blue01': data.value > 0 && data.value <= 100000,
                'table-blue02': data.value > 100000 && data.value <= 200000,
                'table-blue03': data.value > 200000 && data.value <= 300000,
                'table-blue04': data.value > 300000 && data.value <= 400000,
                'table-blue05': data.value > 400000 && data.value <= 500000,
                'table-blue06': data.value > 500000 && data.value <= 600000,
                'table-blue07': data.value > 600000 && data.value <= 700000,
                'table-blue08': data.value > 700000,
              }"
            >
              {{ data.value | comma }}
            </td>
          </tr>
          <tr class="info">
            <td class="subdivide">누적</td>
            <td
              class="num"
              v-for="(data, dataIdx) in selectedValue.filter(function (d) {
                return d.gubun == '누적';
              })"
              :key="`totalPay-${dataIdx}`"
              :class="{
                'table-blue01': data.value > 0 && data.value <= 100000,
                'table-blue02': data.value > 100000 && data.value <= 200000,
                'table-blue03': data.value > 200000 && data.value <= 300000,
                'table-blue04': data.value > 300000 && data.value <= 400000,
                'table-blue05': data.value > 400000 && data.value <= 500000,
                'table-blue06': data.value > 500000 && data.value <= 600000,
                'table-blue07': data.value > 600000 && data.value <= 700000,
                'table-blue08': data.value > 700000,
              }"
            >
              {{ data.value | comma }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectedType: {
      type: String,
      default: "",
    },
    selectedMonth: {
      type: Number,
      default: -1,
    },
    selectedGroup: {
      type: Number,
      default: -1,
    },
    selectedLevel: {
      type: Number,
      default: -1,
    },
    selectedValue: {
      type: Array,
    },
  },
};
</script>
<style scoped>
.off {
  right: 10px !important;
  top: 10px !important;
  width: 40px !important;
  height: 40px !important;
  background-size: 20px !important;
}
.layer-warp {
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>