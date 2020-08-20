<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!--专业监测一张图 左侧第二模块 -->
<template>
  <div class="lefttwo">
    <div class="jt">
      <h3>军运村周边交通</h3>
      <div class="yh">
        <h3 id="yh_h3"></h3>
        <p id="yh_p"></p>
        <div class="clzs">
          <p>周边车辆</p>
          <div class="num">
            <p>2</p>
            <p>8</p>
            <p>0</p>
            <span>辆</span>
          </div>
        </div>
      </div>
       <canvas id="canvas" width="414" height="248" class="canvas"></canvas>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: [],
  computed: {},
  methods: {

  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    loading(70)
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { },
  components: {}
}
// 画圆
function circle () {
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')
  var circleX = canvas.width / 2 // 中心x坐标
  var circleY = canvas.height // 中心y坐标
  var radius = 194// 圆环半径
  var lineWidth = 4// 圆形线条的宽度
  ctx.lineCap = 'round'
  ctx.beginPath()
  // ctx.moveTo(cx + r, cy);
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = '#0886ce'
  ctx.arc(circleX, circleY, radius, 1.15 * Math.PI, -0.145 * Math.PI)
  ctx.stroke()
}
// 刷新
function loading (key) {
  var process = 0 // 进度
  // 圆形
  circle()
  // 圆弧
  let time = setInterval(function () { // 弧线动态效果
    sector(++process)
    if (process >= key) {
      clearInterval(time)
      process = key
      circleTwo()
      AstraightLine()
      let ydzsNumber = document.getElementById('yh_h3')
      ydzsNumber.innerHTML = '1.45'
      let ydzs = document.getElementById('yh_p')
      ydzs.innerHTML = '拥堵延时指数'
    }
  }, 40)
}
// 画弧线
function sector (endAngle) {
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')
  var circleX = canvas.width / 2 // 中心x坐标
  var circleY = canvas.height // 中心y坐标
  var radius = 194// 圆环半径
  var lineWidth = 20// 圆形线条的宽度
  ctx.beginPath()
  // ctx.moveTo(cx, cy + r); // 从圆形底部开始画
  ctx.lineWidth = 20

  // 渐变色 - 可自定义
  var linGrad = ctx.createLinearGradient(
    circleX - radius - lineWidth, circleY, circleX + radius + lineWidth, circleY
  )
  linGrad.addColorStop(0.0, '#e8d004')
  // linGrad.addColorStop(0.5, '#9bc4eb');
  linGrad.addColorStop(1.0, '#cc6002')
  ctx.strokeStyle = linGrad

  // 圆弧两端的样式
  ctx.lineCap = 'round'

  ctx.arc(
    circleX, circleY, radius,
    (Math.PI * 1.15),
    (Math.PI * 1.15) + endAngle / 100 * (Math.PI * 0.7), // 这个值定义了弧线的值
    false
  )
  ctx.stroke()
}
// 画小圆
function circleTwo () {
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')
  var circleX = 138 // 中心x坐标
  var circleY = 18// 中心y坐标
  var radius = 3// 圆环半径
  var lineWidth = 1// 圆形线条的宽度
  ctx.strokeStyle = '#e1b458'
  ctx.beginPath()
  // ctx.moveTo(cx + r, cy);
  ctx.lineWidth = lineWidth
  ctx.arc(circleX, circleY, radius, Math.PI * 0, 2 * Math.PI)
  ctx.stroke()
}
// 画直线
function AstraightLine () {
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')
  var circleX = 139 // 中心x坐标
  var circleY = 18// 中心y坐标
  ctx.strokeStyle = '#e1b458'
  // 设置开始坐标
  ctx.moveTo(circleX, circleY)
  // 设置结束坐标
  ctx.lineTo(188, circleY)
  ctx.moveTo(188, circleY)
  ctx.lineTo(210, 43)
  ctx.stroke()
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
@import "../../../src/fonts/font2/font.css";
.canvas{
  position: absolute;
  left: 0px;
  top:58px;
  z-index: 88;
}
.lefttwo {
  width: 414 * @px;
  overflow: hidden;
  border-radius: 5 * @px;
  box-shadow: 0 0 8px #999;
  margin-top: 16 * @px;
  background: white;
}
.jt {
  width: 414 * @px;
  height: 248 * @px;
  border-radius: 5 * @px;
  position: relative;
}
.jt > h3 {
  padding-left: 10 * @px;
  width: 414 * @px;
  font-size: 18 * @px;
  border-top-left-radius: 5 * @px;
  border-top-right-radius: 5 * @px;
  line-height: 40 * @px;
  font-weight: bold;
  color: white;
  background: url("../../../static/assets/img/zyjcyzt/title-bg1.png") no-repeat
    center center;
  background-size: 100%;
}
.yh {
  width: 400 * @px;
  height: 208 * @px;
  position: relative;
}
.yh > h3 {
  position: absolute;
  color: #ca6a08;
  font-size: 18 * @px;
  font-weight: bold;
  left: 85 * @px;
  top: 20 * @px;
}
.yh > p {
  position: absolute;
  color:#333333;
  font-size: 18 * @px;
  font-weight: bold;
  left: 35 * @px;
  top: 40 * @px;
}
.clzs {
  width: 306 * @px;
  height: 76 * @px;
  position: absolute;
  left: 35 * @px;
  top: 110 * @px;
}
.clzs > p {
  width: 100%;
  text-align: center;
  font-size: 18 * @px;
  font-weight: bold;
  color: #333333;
}
.num {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50 * @px;
   padding-left: 12 * @px;
}
.num > p {
  margin-left: 10 * @px;
  background: #aaebff;
  height: 42 * @px;
  width: 28 * @px;
  font-size: 36 * @px;
  text-align: center;
  color: #0a7bc7;
  line-height: 42 * @px;
  border-radius: 5 * @px;
  font-family: "Digiface";
}
.num>span{
  color:  #0a7bc7;
  font-size: 16*@px;
  margin: 24*@px 0 0 10*@px;
}
</style>
