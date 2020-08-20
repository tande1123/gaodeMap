<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:18:23
 -->
<!--专业监测一张图 底部菜单 -->
<template>
  <div class="footer">
    <div class="gongneng">
      <img src="../../../static/assets/img/zyjcyzt/tuopan.png" alt="">
      <ul class="daohan">
        <li :class="{xuanzhong1:currentSelect==='110警车'}" v-on:click="change('110警车')">
          <p>110警车</p>
        </li>
        <li :class="{xuanzhong2:currentSelect==='周边车辆'}" v-on:click="change('周边车辆')">
          <p>周边车辆</p>
        </li>
        <li :class="{xuanzhong3:currentSelect==='雨情'}" v-on:click="change('雨情')">
          <p>雨情</p>
        </li>
        <li :class="{xuanzhong4:currentSelect==='水情'}" v-on:click="change('水情')">
          <p>水情</p>
        </li>
        <li :class="{xuanzhong5:currentSelect==='监控单位'}" v-on:click="change('监控单位')">
          <p>监控单位</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentSelect: '110警车'
    }
  },
  props: ['footerbar'],
  computed: {},
  methods: {
    change (index) {
      this.currentSelect = index
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () { },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { },
  components: {}
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.footer {
  width: 896 * @px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 66 * @px;
  margin: auto;
}
.gongneng {
  width: 896 * @px;
  position: relative;
}
.gongneng img {
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
  width: 92 * @px;
  height: 92 * @px;
  position: relative;
  cursor: pointer;
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
  margin-left: 90 * @px;
  background: url("../../../static/assets/img/zyjcyzt/jc.png") no-repeat center
    center;
}
.daohan > li:nth-child(1):hover {
  background: url("../../../static/assets/img/zyjcyzt/jc2.png") no-repeat center
    center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.xuanzhong1 {
  background: url("../../../static/assets/img/zyjcyzt/jc2.png") no-repeat center
    center !important;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.xuanzhong1 p {
  color: #edaa31 !important;
}
.daohan > li:nth-child(2) {
  background: url("../../../static/assets/img/zyjcyzt/zbcl.png") no-repeat
    center center;
  margin-left: 68 * @px;
}
.daohan > li:nth-child(2):hover {
  background: url("../../../static/assets/img/zyjcyzt/zbcl2.png") no-repeat
    center center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.xuanzhong2 {
  background: url("../../../static/assets/img/zyjcyzt/zbcl2.png") no-repeat
    center center !important;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.xuanzhong2 p {
  color: #edaa31 !important;
}
.daohan > li:nth-child(3) {
  background: url("../../../static/assets/img/zyjcyzt/yq.png") no-repeat center
    center;
  margin-left: 68 * @px;
}
.daohan > li:nth-child(3):hover {
  background: url("../../../static/assets/img/zyjcyzt/yq2.png") no-repeat center
    center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.xuanzhong3 {
  background: url("../../../static/assets/img/zyjcyzt/yq2.png") no-repeat center
    center !important;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.xuanzhong3 p {
  color: #edaa31 !important;
}
.daohan > li:nth-child(4) {
  background: url("../../../static/assets/img/zyjcyzt/sq.png") no-repeat center
    center;
  margin-left: 68 * @px;
}
.daohan > li:nth-child(4):hover {
  background: url("../../../static/assets/img/zyjcyzt/sq2.png") no-repeat center
    center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.xuanzhong4 {
  background: url("../../../static/assets/img/zyjcyzt/sq2.png") no-repeat center
    center !important;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.xuanzhong4 p {
  color: #edaa31 !important;
}
.daohan > li:nth-child(5) {
  background: url("../../../static/assets/img/zyjcyzt/jk.png") no-repeat center
    center;
  margin-left: 50 * @px;
}
.daohan > li:nth-child(5):hover {
  background: url("../../../static/assets/img/zyjcyzt/jk2.png") no-repeat center
    center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.xuanzhong5 {
  background: url("../../../static/assets/img/zyjcyzt/jk2.png") no-repeat center
    center !important;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size:100%;
  -ms-background-size:100%;
  -o-background-size:100%;
}
.xuanzhong5 p {
  color: #edaa31 !important;
}
</style>
