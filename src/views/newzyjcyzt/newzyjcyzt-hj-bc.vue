<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!--环境 标尺-->
<template>
  <div class="box">
    <span class="title">空气质量等级</span>
    <ul class="bar">
      <li>优</li>
      <li>良</li>
      <li>轻度</li>
      <li>中度</li>
      <li>重度</li>
      <li>严重</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () { return {} },
  props: [],
  computed: {},
  methods: {},
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
  errorCaptured () { }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.box {
  width: 347 * @px;
  height: 39 * @px;
  background: #fff;
  border-radius: 4 * @px;
  line-height: 39 * @px;
  box-shadow: 0 0 * @px 10 * @px rgba(89, 200, 243, 0.35);
}
.title {
  font-size: 18 * @px;
  font-weight: bold;
  color: #00cdfe;
  text-indent: 7 * @px;
  display: inline-block;
}
.bar {
  width: 187 * @px;
  height: 18 * @px;
  display: inline-block;
  background: #609bd6;
  padding: 1 * @px;
  top: 11 * @px;
  position: absolute;
  right: 13 * @px;
}
.bar > li {
  width: 30 * @px;
  height: 16 * @px;
  float: left;
  margin-right: 1 * @px;
  text-align: center;
  font-size: 12 * @px;
  line-height: 16 * @px;
  color: #fff;
}
.bar > li:nth-child(1) {
  background: #3ace74;
}
.bar > li:nth-child(2) {
  background: #ffc107;
}
.bar > li:nth-child(3) {
  background: #ff6900;
}
.bar > li:nth-child(4) {
  background: #ee001c;
}
.bar > li:nth-child(5) {
  background: #ad0016;
}
.bar > li:nth-child(6) {
  margin-right: 0 !important;
  background: #7c0549;
}
</style>
