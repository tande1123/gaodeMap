<!--
 * 添加注释医疗弹框
 -->
<template>
  <!-- <drag :fixed="false" class="plotbox-position"> -->
  <div class="plotbox">
    <div class="RTtP"></div>
    <div class="content">
      <div class="ax">
        <div class="mbBox">
          <p>HR</p>
          <i class="mb"></i>
        </div>
        <p class="zt">
          89<span>bmp</span>
        </p>
      </div>
      <div class="xy_">
        <div class="xyBox">
          <p>BP</p>
          <i class="xy"></i>
        </div>
        <p class="zt_xy">
          108/68<span>mmHg</span>
        </p>
      </div>
      <div class="rr_">
        <div class="rrBox">
          <p>RR</p>
          <i class="rr"></i>
        </div>
        <p class="zt_rr">
          16<span>rpm</span>
        </p>
      </div>
      <div class="wd_">
        <div class="wdBox">
          <p>T</p>
          <i class="wd"></i>
        </div>
        <p class="zt_wd">
          38<span>℃</span>
        </p>
      </div>
      <i class="close" @click="close"></i>
    </div>
  </div>
  <!-- </drag> -->
</template>
<script>
import drag from './drag'
export default {
  components: {
    drag
  },
  methods: {
    close () {
      this.$emit('closePop', false)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../fonts/font2/font.css";
@import "../assets/less/set.less";
.plotbox-position {
  bottom: 14px;
  left: 14px;
}
.plotbox {
  height: 262px;
  width: 440px;
  background: #fff;
  background: url("../assets/images/pop/SMT.png") center center no-repeat;
  background-size: 100% 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  bottom: 14px;
  left: 14px;
  z-index: 20;
}
.RTtP {
  width: 185px;
  height: 262px;
  margin-left: 20px;
  background: url("../assets/images/pop/rt.png") center center no-repeat;
  background-size: 100% 100%;
}
.content {
  width: 200px;
  height: 262px;
  margin-left: 8px;
}
.ax {
  height: 50px;
  border-bottom: 1px dotted #00f0ff;
  margin-top: 36px;
  display: flex;
  flex-direction: row;
}
.mbBox,
.xyBox,
.rrBox,
.wdBox {
  width: 36px;
  height: 46px;
  text-align: center;
  p {
    font-size: 16px;
    color: white;
  }
}
.mb {
  width: 19px;
  height: 18px;
  display: inline-block;
  background: url("../assets/images/pop/mb.png") center center no-repeat;
  background-size: 100% 100%;
}
.xy {
  width: 18px;
  height: 20px;
  display: inline-block;
  background: url("../assets/images/pop/xy.png") center center no-repeat;
  background-size: 100% 100%;
}
.zt {
  height: 20px;
  font-size: 24px;
  font-family: "Digiface";
  color: #d92435;
  font-weight: bold;
  margin-top: 4px;
  margin-left: 10px;
  line-height: 45px;
  span {
    font-size: 14px;
    color: #d92435;
    font-weight: bold;
    font-family: "";
  }
}
.zt_xy {
  color: #f7b53d;
  font-size: 24px;
  font-family: "Digiface";
  font-weight: bold;
  margin-top: 4px;
  margin-left: 10px;
  line-height: 45px;
  span {
    font-size: 14px;
    color: #f7b53d;
    font-weight: bold;
    font-family: "";
  }
}
.xy_,
.rr_,
.wd_ {
  height: 50px;
  border-bottom: 1px dotted #00f0ff;
  display: flex;
  flex-direction: row;
}
.zt_rr {
  color: #00abd7;
  font-size: 24px;
  font-family: "Digiface";
  font-weight: bold;
  margin-top: 4px;
  margin-left: 10px;
  line-height: 45px;
  span {
    font-size: 14px;
    color: #00abd7;
    font-weight: bold;
    font-family: "";
  }
}
.rr {
  width: 18px;
  height: 20px;
  display: inline-block;
  background: url("../assets/images/pop/HX.png") center center no-repeat;
  background-size: 100% 100%;
}
.zt_wd {
  color: #db2232;
  font-size: 24px;
  font-family: "Digiface";
  font-weight: bold;
  margin-top: 4px;
  margin-left: 10px;
  line-height: 45px;
  span {
    font-size: 14px;
    color: #db2232;
    font-weight: bold;
    font-family: "";
  }
}
.wd {
  width: 18px;
  height: 20px;
  display: inline-block;
  background: url("../assets/images/pop/wd.png") center center no-repeat;
  background-size: 100% 100%;
}
.close {
  cursor: pointer;
  width: 66px;
  height: 38px;
  position: absolute;
  right: 20px;
  top: 30px;
  background: url("../assets/images/pop/close.png") center center no-repeat;
  background-size: 100% 100%;
}
</style>
