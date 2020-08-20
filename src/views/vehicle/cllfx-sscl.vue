<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:16:42
 -->
<!-- 交通 军运村实时车流-->
<template>
  <div class="jycsscl">
    <p class='title'>军运村内实时车流</p>
    <div class="car">
      <div class="enterCar">
        <div class="imgBox">
          <p><span>{{count.entry}}</span>辆</p>
        </div>
        <p>进入车辆</p>
      </div>
      <div class="outCar">
        <div class="imgBox">
          <p><span>{{count.out}}</span>辆</p>
        </div>
        <p>出去车辆</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      count: {
        entry: 4500,
        out: 3500
      }
    }
  },
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
<style lang='less' scoped>
@px: 30rem/1920;
.jycsscl {
  width: 414 * @px;
  height: 210 * @px;
  border-radius: 5 * @px;
  overflow: hidden;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  .title {
    width: 100%;
    height: 40 * @px;
    background: url("../../../static/assets/img/newzyjcyzt/headbg.png") center
      center;
    line-height: 40 * @px;
    text-indent: 14 * @px;
    color: #fff;
    font-weight: bold;
    font-size: 18 * @px;
    letter-spacing: 2 * @px;
  }
  .car {
    margin: 14 * @px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &.enterCar .imgBox,
      &.outCar .imgBox {
        width: 114 * @px;
        height: 112 * @px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        p {
          margin-top: 6 * @px;
          span {
            font-size: 20 * @px;
            font-weight: bold;
          }
        }
      }
      &.enterCar .imgBox {
        background: url("../../../static/assets/img/newzyjcyzt/enterCar.png")
          center center no-repeat;
        background-size: 100% 100%;
      }
      &.outCar .imgBox {
        background: url("../../../static/assets/img/newzyjcyzt/outCar.png")
          center center no-repeat;
        background-size: 100% 100%;
      }
      p {
        font-size: 16 * @px;
        margin-top: 7 * @px;
        font-weight: bold;
      }
    }
  }
}
</style>
