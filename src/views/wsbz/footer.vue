<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 卫生保障  底部btn -->
<template>
  <div class="footerNav">
    <div class="gongneng">
      <img src="../../../static/assets/img/zyjcyzt/tuopan.png" alt="">
      <ul class="daohan">
        <li :class="{xuanzhong:currentSelect===''}" v-on:click="change('')">
          <p></p>
        </li>
        <li :class="{xuanzhong1:currentSelect==='医疗中心'}" v-on:click="change('医疗中心')">
          <p>医疗中心</p>
        </li>
        <li :class="{xuanzhong2:currentSelect==='合同医院'}" v-on:click="change('合同医院')">
          <p>合同医院</p>
        </li>
        <li :class="{xuanzhong3:currentSelect==='代表团医疗站'}" v-on:click="change('代表团医疗站')">
          <p>代表团医疗站</p>
        </li>
        <li :class="{xuanzhong4:currentSelect==='航空救治'}" v-on:click="change('航空救治')">
          <p>航空救治</p>
        </li>
        <li :class="{xuanzhong5:currentSelect==='病媒防治场所'}" v-on:click="change('病媒防治场所')">
          <p>病媒防治场所</p>
        </li>
        <li :class="{xuanzhong6:currentSelect==='定点医院'}" v-on:click="change('定点医院')">
          <p>定点医院</p>
        </li>
        <li :class="{xuanzhong7:currentSelect==='体能恢复中心'}" v-on:click="change('体能恢复中心')">
          <p>体能恢复中心</p>
        </li>
      </ul>
      <map-handler ref="mapH"></map-handler>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import mapHandler from './map-handler'
export default {
  components: {
    mapHandler
  },
  data () {
    return {
      currentSelect: '',
      show: false,
      menuMap: {
        '医疗中心': 'G01',
        '合同医院': 'G02',
        '代表团医疗站': 'G03',
        '航空救治': 'G04',
        '病媒防治场所': 'G05',
        '定点医院': 'G07',
        '体能恢复中心': 'G06'
      }
    }
  },
  methods: {
    change (index) {
      this.map.clear()
      this.currentSelect = index
      if (index === '代表团医疗站') {
        this.show = !this.show
        this.$store.commit('setPopdbtylz', this.show)
      } else {
        this.$store.commit('setPopdbtylz', false)
        this.$refs.mapH && this.$refs.mapH.loadData(this.menuMap[index])
      }
    }
  },
  computed: {
    ...mapGetters(['mapLoaded', 'map', 'symbol', 'mapConfig']),
    ...mapState(['popkey'])
  },
  watch: {
    popkey: {
      handler (newName, oldName) {
        this.show = this.popkey.dbtylz
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
@px: 30rem/1920;
.footerNav {
  width: 880 * @px;
  height: 92 * @px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.gongneng {
  width: 896 * @px;
  position: relative;
  img {
    width: 896 * @px;
    height: 64 * @px;
  }
  .daohan {
    width: 896 * @px;
    position: absolute;
    top: -70 * @px;
    left: 0;
  }
  .daohan > li {
    float: left;
    width: 86 * @px;
    height: 86 * @px;
    position: relative;
    cursor: pointer;
    border-radius: 50%;
  }
  .daohan > li:hover p {
    color: #edaa31;
    color: #edaa31;
  }
  .daohan > li > p {
    width: 100%;
    text-align: center;
    margin-top: 5 * @px;
    color: white;
    font-size: 14 * @px;
    position: absolute;
    left: 0;
    top: 80 * @px;
  }
  .daohan > li:nth-child(1) {
    margin-left: 70 * @px;
    background: url("../../../static/assets/img/wsbz/logo1.png") no-repeat
      center center;
  }
  .daohan > li:nth-child(1):hover {
    background: url("../../../static/assets/img/wsbz/logo2.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .xuanzhong {
    background: url("../../../static/assets/img/wsbz/logo2.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(2) {
    margin-left: 10 * @px;
    background: url("../../../static/assets/img/wsbz/ylzx1.png") no-repeat
      center center;
  }
  .daohan > li:nth-child(2):hover {
    background: url("../../../static/assets/img/wsbz/ylzx2.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .xuanzhong1 {
    background: url("../../../static/assets/img/wsbz/ylzx2.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .xuanzhong1 p,
  .xuanzhong2 p,
  .xuanzhong3 p,
  .xuanzhong4 p,
  .xuanzhong5 p,
  .xuanzhong6 p,
  .xuanzhong7 p {
    color: #edaa31 !important;
  }
  .daohan > li:nth-child(3) {
    background: url("../../../static/assets/img/wsbz/htyy1.png") no-repeat
      center center;
    margin-left: 10 * @px;
  }
  .daohan > li:nth-child(3):hover {
    background: url("../../../static/assets/img/wsbz/htyy2.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .xuanzhong2 {
    background: url("../../../static/assets/img/wsbz/htyy2.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(4) {
    background: url("../../../static/assets/img/wsbz/dbt1.png") no-repeat center
      center;
    margin-left: 10 * @px;
  }
  .daohan > li:nth-child(4):hover {
    background: url("../../../static/assets/img/wsbz/dbt2.png") no-repeat center
      center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .xuanzhong3 {
    background: url("../../../static/assets/img/wsbz/dbt2.png") no-repeat center
      center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(5) {
    background: url("../../../static/assets/img/wsbz/hkjz1.png") no-repeat
      center center;
    margin-left: 10 * @px;
  }
  .daohan > li:nth-child(5):hover {
    background: url("../../../static/assets/img/wsbz/hkjz2.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .xuanzhong4 {
    background: url("../../../static/assets/img/wsbz/hkjz2.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(6) {
    background: url("../../../static/assets/img/wsbz/bmfz1.png") no-repeat
      center center;
    margin-left: 10 * @px;
  }
  .daohan > li:nth-child(6):hover {
    background: url("../../../static/assets/img/wsbz/bmfz2.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .xuanzhong5 {
    background: url("../../../static/assets/img/wsbz/bmfz2.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }

  .daohan > li:nth-child(7) {
    background: url("../../../static/assets/img/wsbz/ddyy1.png") no-repeat
      center center;
    margin-left: 10 * @px;
  }
  .daohan > li:nth-child(7):hover {
    background: url("../../../static/assets/img/wsbz/ddyy2.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .xuanzhong6 {
    background: url("../../../static/assets/img/wsbz/ddyy2.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .daohan > li:nth-child(8) {
    background: url("../../../static/assets/img/wsbz/trhf1.png") no-repeat
      center center;
    margin-left: 10 * @px;
  }
  .daohan > li:nth-child(8):hover {
    background: url("../../../static/assets/img/wsbz/trhf2.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
  .xuanzhong7 {
    background: url("../../../static/assets/img/wsbz/trhf2.png") no-repeat
      center center !important;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
  }
}
</style>
