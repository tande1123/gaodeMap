<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 新版专业检测一张图 底部菜单-->
<template>
  <div class="toolbar">
    <ul>
      <router-link to="/newzyjcyzt">
        <li class="toolbtn" :class="active==1?'jtactive':'jt'">
          <span></span>
          <p>交通</p>
        </li>
      </router-link>
      <router-link to="/newzyjcyztqx">
        <li class="toolbtn" :class="active==2?'qxactive':'qx'">
          <span></span>
          <p>气象</p>
        </li>
      </router-link>
      <router-link to="/newzyjcyzthj">
        <li class="toolbtn" :class="active==3?'hjactive':'hj'">
          <span></span>
          <p>环境</p>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data () { return {} },
  props: ['active'],
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
@px: 30rem/1920;
.toolbar {
  width: 545 * @px;
  height: 64 * @px;
  background: url("../../../static/assets/img/newzyjcyzt/toolbarbg.png")
    no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 79 * @px;
  left: 50%;
  margin-left: -272.5 * @px;
  z-index: 10;
}
.toolbar > ul {
  list-style: none;
  width: 100%;
  height: 130 * @px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.toolbar .toolbtn {
  width: 33.3333%;
  height: 130 * @px;
  float: left;
}
.toolbar .toolbtn > p {
  display: inline-block;
  width: 90px;
  font-size: 18px;
  color: #fff;
  vertical-align: middle;
  text-align: center;
}
.jtactive,
.jt {
  text-align: right;
}
.qx,
.qxactive {
  text-align: center;
}
.toolbar .toolbtn > span {
  width: 90 * @px;
  height: 90 * @px;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: -8 * @px;
}

.toolbar .jt > span {
  background: url("../../../static/assets/img/newzyjcyzt/toolbarjt.png") center
    center no-repeat;
  background-size: 100% 100%;
}

.toolbar .hj > span {
  background: url("../../../static/assets/img/newzyjcyzt/toolbarhj.png") center
    center no-repeat;
  background-size: 100% 100%;
}
.toolbar .qx > span {
  background: url("../../../static/assets/img/newzyjcyzt/toolbarqx.png") center
    center no-repeat;
  background-size: 100% 100%;
}
/* 选中 */
.toolbar .jtactive > span {
  background: url("../../../static/assets/img/newzyjcyzt/jtactive.png") center
    center no-repeat;
  background-size: 100% 100%;
}

.toolbar .hjactive > span {
  background: url("../../../static/assets/img/newzyjcyzt/toolbarhj-active.png")
    center center no-repeat;
  background-size: 100% 100%;
}

.toolbar .qxactive > span {
  background: url("../../../static/assets/img/newzyjcyzt/qxactive.png") center
    center no-repeat !important;
  background-size: 100% 100% !important;
}
/* hover */
.toolbar:hover {
  cursor: pointer;
}
.jt:hover > span {
  background: url("../../../static/assets/img/newzyjcyzt/jtactive.png") center
    center no-repeat !important;
  background-size: 100% 100% !important;
}
.toolbar .jtactive > p,
.jt:hover > p {
  font-weight: 900;
  color: #ffc05c !important;
}
.hj:hover > span {
  background: url("../../../static/assets/img/newzyjcyzt/toolbarhj-active.png")
    center center no-repeat !important;
  background-size: 100% 100% !important;
}
.toolbar .hjactive > p,
.hj:hover > p {
  font-weight: 900;
  color: #ffc05c !important;
}
.qx:hover > span {
  background: url("../../../static/assets/img/newzyjcyzt/qxactive.png") center
    center no-repeat !important;
  background-size: 100% 100% !important;
}
.toolbar .qxactive > p,
.qx:hover > p {
  font-weight: 900;
  color: #ffc05c !important;
}
</style>
