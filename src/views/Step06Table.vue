<template>
  <div id="wrap">
    <Controller ref="Controller" />
    <div class="bg-blue"></div>
    <div class="table-wrap">
      <div class="contents">
        <div class="tit-area">
          <div class="current-tit"></div>
          <div class="main-tit"></div>
        </div>

        <div class="table-contents">
          <!-- 상단영역 : s -->
          <div class="top-area">
            <p class="tit">종신 100%, 평균 유지율, 5년간 모집인원 기준</p>
            <p class="desc-txt" style="margin-top: 5px; text-align: left">
              (단위 : 천원)
            </p>
            <div class="btns">
              <button
                class="btn"
                v-for="groupNumber in INCOME_TABLE_INFO.groupNumberList"
                :key="`groupNumberBtn-${groupNumber}`"
                :class="{ on: selectedTableTab == groupNumber }"
                @click="onClickGroupNumberBtn(groupNumber, undefined, false)"
              >
                {{ groupNumber }}명
              </button>
            </div>
          </div>
          <!-- 상단영역 : e  -->
          <table class="table-left-side">
            <tr class="tit-tr">
              <td colspan="3" class="section-tit">
                <select class="select-component" v-model="selectedMonth">
                  <option
                    v-for="(
                      monthNumber, idx
                    ) in INCOME_TABLE_INFO.monthNumberList"
                    v-bind:key="`monthNumber-${idx}`"
                    v-bind:value="monthNumber"
                  >
                    {{ monthNumber }}개월
                  </option>
                </select>
                <span class="extra">에 1명 모집</span>
              </td>
            </tr>
            <tr class="under-line">
              <td>신인보너스</td>
              <td width="65">업적(천원)</td>
              <td>구분</td>
            </tr>
            <tr>
              <td>
                <select
                  class="select-component"
                  v-model="selectedType"
                  style="width: 122px"
                >
                  <option
                    v-for="(type, typeIdx) in typeList"
                    v-bind:key="`typeIdx-${typeIdx}`"
                    v-bind:value="type.value"
                  >
                    {{ type.title }}
                  </option>
                </select>
              </td>
              <td colspan="2">
                <table class="side-table">
                  <tr
                    v-for="(
                      incomeTableData, incomeTableDataIdx
                    ) in incomeTableDataOrigin"
                    :key="`incomeTableDataHeader-${incomeTableDataIdx}`"
                  >
                    <td
                      :rowspan="2"
                      v-if="incomeTableDataIdx % 2 == 0"
                      style="border-right: 1px #eef3f8 solid"
                      :data-level="incomeTableData['업적']"
                      class="levelUpjuk levelUpjukTitle"
                      :class="{
                        on: selectedLevel == incomeTableData['업적'] / 1000,
                      }"
                    >
                      {{ (incomeTableData["업적"] / 1000) | comma }}
                    </td>
                    <td
                      style="border-right: 0px"
                      :data-level="incomeTableData['업적'] / 1000"
                      class="levelGobun"
                      :class="{
                        on: selectedLevel == incomeTableData['업적'] / 1000,
                      }"
                    >
                      {{ incomeTableData["구분"] }}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div class="table-scroll-area" ref="tableScroll">
            <table class="table-section">
              <tr>
                <td
                  :colspan="5"
                  class="td-con"
                  v-for="groupNumber in INCOME_TABLE_INFO.groupNumberList"
                  :key="`groupNumberListKey-${groupNumber}`"
                  :id="`tableTab-${groupNumber}`"
                  :data-group="`${groupNumber}`"
                  :class="{ on: selectedGroup == groupNumber }"
                >
                  총 {{ groupNumber }}명 모집
                </td>
              </tr>
              <tr class="five-years">
                <td
                  class="td-con"
                  v-for="yearInfo in yearInfoList"
                  :key="`yearListKey-${yearInfo.group}-${yearInfo.year}`"
                  :data-group="`${yearInfo.group}`"
                  :class="{ on: selectedGroup == yearInfo.group }"
                >
                  {{ yearInfo.year }}차년
                </td>
              </tr>
              <tr
                v-for="(
                  incomeTableData, incomeTableDataIdx
                ) in incomeTableDataOrigin"
                :key="`incomeTableDataBody-${incomeTableDataIdx}`"
              >
                <td
                  class="tableValue"
                  v-for="(data, dataIdx) in getDataList(incomeTableData)"
                  :key="dataIdx"
                  :data-group="parseInt(data.groupData.split('_')[1])"
                  :data-level="incomeTableData['업적'] / 1000"
                  :data-gubun="incomeTableData['구분']"
                  :data-value="data.value"
                  :class="{
                    'table-blue01': data.value > 0 && data.value <= 100000,
                    'table-blue02': data.value > 100000 && data.value <= 200000,
                    'table-blue03': data.value > 200000 && data.value <= 300000,
                    'table-blue04': data.value > 300000 && data.value <= 400000,
                    'table-blue05': data.value > 400000 && data.value <= 500000,
                    'table-blue06': data.value > 500000 && data.value <= 600000,
                    'table-blue07': data.value > 600000 && data.value <= 700000,
                    'table-blue08': data.value > 700000,
                    on:
                      selectedGroup == parseInt(data.groupData.split('_')[1]) &&
                      selectedLevel == incomeTableData['업적'] / 1000,
                  }"
                  @click="
                    onClickTableData(
                      parseInt(data.groupData.split('_')[1]),
                      incomeTableData['업적'] / 1000
                    )
                  "
                >
                  {{ data.value | comma }}
                </td>
              </tr>
            </table>
            <div :style="`width:${scrollGap * 2}px`"></div>
          </div>
        </div>
        <p class="desc-txt" style="padding-top: 10px">
          해당하는 소득 구간을 터치하여 자세히 확인하세요.
        </p>
      </div>
      <!-- 하단 버튼 영역 : s  -->
      <div class="button-area coordinatesX huawei s6">
        <div class="bg-draw"></div>
        <button class="btn-home" @click="onClickHome"></button>
        <button
          class="back-btn"
          style="left: 184px"
          @click="onClickBack"
        ></button>
        <p class="desc-bottom">
          ※ 상기 자료는 리크루팅 진행시 참고용 수수료 예시이며 상품 환산율, 규정
          변경, 미유지로 인한 환수 등으로 수수료 예시는 달라질 수 있습니다.
          <br />※ 기타 자세한 내용은 반드시 해당 규정집(FC 수수료 지급지침)을
          확인해 주시기 바랍니다.
        </p>
      </div>
      <!-- 하단 버튼 영역 : e  -->
    </div>
    <transition name="fade">
      <layerPopup
        v-if="isShowPopup"
        @onClickClose="isShowPopup = false"
        :selectedType="
          typeList.find(function (d) {
            return selectedType == d.value;
          }).title
        "
        :selectedMonth="selectedMonth"
        :selectedGroup="selectedGroup"
        :selectedLevel="selectedLevel"
        :selectedValue="selectedValue"
      />
    </transition>
  </div>
</template>
<script>
import Controller from "../components/InputController.vue";
import * as CONSTANT from "../constant";
import _ from "lodash";
import layerPopup from "../components/layerPopup.vue";
import anime from "animejs/lib/anime.es.js";
export default {
  components: {
    layerPopup,
    Controller,
  },
  data() {
    return {
      isShowPopup: false,
      selectedMonth: 1,
      selectedType: "없음",
      selectedTableTab: 0,
      selectedGroup: -1,
      selectedLevel: -1,
      selectedValue: -1,
      scrollWidth: 0,
      scrollGap: 0,
    };
  },
  created() {
    this.selectedType = this.$store.state.newbieBonus;
    this.selectedMonth = this.$store.state.recruitMonth;
  },
  mounted() {
    this.scrollWidth = this.$refs.tableScroll.scrollWidth;
    this.scrollGap =
      this.scrollWidth / this.INCOME_TABLE_INFO.groupNumberList.length;
  },
  computed: {
    INCOME_TABLE_INFO: function () {
      return CONSTANT.INCOME_TABLE_INFO();
    },
    typeList: function () {
      var result = this.INCOME_TABLE_INFO.typeList.map(function (d) {
        console.log("asdasd", d);
        var title = d;
        var orderIdx = 0;

        if (d == "없음") {
          title = "경력자";
          orderIdx = 4;
        }
        if (d == "SuperRookie") {
          title = "일반 신인";
          orderIdx = 3;
        }
        if (d == "GoldYouth") {
          title = "골드 유스";
          orderIdx = 2;
        }
        if (d == "JobChange") {
          title = "우수 신인";
          orderIdx = 1;
        }
        return {
          title: title,
          value: d.replace(" ", ""),
          orderIdx: orderIdx,
        };
      });

      return _.orderBy(result, ["orderIdx"], ["asc"]);
    },
    yearInfoList: function () {
      var result = [];
      var yearList = [1, 2, 3, 4, 5];
      CONSTANT.INCOME_TABLE_INFO().groupNumberList.forEach(function (group) {
        yearList.forEach(function (year) {
          result.push({
            group: group,
            year: year,
          });
        });
      });
      return result;
    },
    incomeTableDataOrigin: function () {
      return CONSTANT.GET_INCOME_TABLE_FOR_TYPE_DATA(
        this.selectedMonth,
        this.selectedType.replace(" ", "")
      );
    },
    incomeTableDataKey: function () {
      return _.keys(
        _.groupBy(this.incomeTableDataOrigin, function (d) {
          return d["업적"];
        })
      ).map(function (d) {
        return parseInt(d) / 1000;
      });
    },
    incomeTableDataByKey: function (key) {
      return _.filter(this.incomeTableDataOrigin, function (d) {
        return d["업적"] == key;
      });
    },
  },
  methods: {
    getDataList: function (incomeTableData) {
      var result = _.reduce(
        this.INCOME_TABLE_INFO.groupList,
        function (result, groupData) {
          incomeTableData[groupData].forEach(function (data) {
            result.push({
              groupData: groupData,
              value: parseInt(data / 1000),
            });
          });
          return result;
        },
        []
      );
      return result;
    },
    onClickTableData(group, level) {
      var targets = document.querySelectorAll(
        `.tableValue[data-group='${group}'][data-level='${level}']`
      );

      this.selectedValue = _.reduce(
        targets,
        function (result, obj) {
          result.push({
            group: obj.dataset.group,
            level: obj.dataset.level,
            gubun: obj.dataset.gubun,
            value: obj.dataset.value,
          });
          return result;
        },
        []
      );
      this.onClickGroupNumberBtn(group, level, true);

      var that = this;
      setTimeout(() => {
        that.isShowPopup = true;
      }, 1250);
    },
    onClickGroupNumberBtn(group, level, chageData) {
      var idx = this.INCOME_TABLE_INFO.groupNumberList.indexOf(group);
      this.selectedTableTab = group;
      if (chageData) {
        this.selectedGroup = group;
        this.selectedLevel = level ? level : this.incomeTableDataKey[0];
      }
      anime({
        targets: this.$refs.tableScroll,
        scrollLeft: idx * this.scrollGap,
        duration: 500,
        easing: "easeInOutQuad",
      });
    },
    onClickHome() {
      this.$refs.Controller.onClickResetData();
      this.$router.push("/Step01");
    },
    onClickBack() {
      this.$router.push("/Step05");
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.input-area {
  width: 0px;
  height: 0px;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>