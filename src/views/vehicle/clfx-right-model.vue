<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:16:34
 -->
<!-- 弹窗模块 -->
<template>
  <div class="model">
    <div class="title">
      <h3>军运村周边XX区</h3>
      <div><img src="../../../static/img/jycglpt/x.png" alt=""></div>
    </div>
    <div class="explain">
      <p>监控实时车辆</p>
      <div>
        <div class="carNum">
          <span>{{124345|NumFormat}}</span>
          <span>辆</span>
        </div>
        <span class="num">
          <img src="../../../static/img/jycglpt/down.png" alt="">10%</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    NumFormat: function (value) {
      var intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
      return intPartFormat
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.model {
  position: absolute;
  left: 534 * @px;
  top: 360 * @px;
  width: 296 * @px;
  height: 158 * @px;
  background: #fff;
  border-radius: 6 * @px;
  -webkit-border-radius: 6 * @px;
  -ms-border-radius: 6 * @px;
  -o-border-radius: 6 * @px;
  -moz-border-radius: 6 * @px;
  box-shadow: 0 0 15 * @px #999999;
  -webkit-box-shadow: 0 0 15 * @px #999999;
  -ms-box-shadow: 0 0 15 * @px #999999;
  -o-box-shadow: 0 0 15 * @px #999999;
  -moz-box-shadow: 0 0 15 * @px #999999;
  .title {
    width: 296 * @px;
    height: 40 * @px;
    padding: 0 14 * @px;
    background: url("../../../static/img/jycglpt/title-bg1.png") no-repeat
      center center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    border-radius: 6 * @px 6 * @px 0 0;
    -webkit-border-radius: 6 * @px 6 * @px 0 0;
    -ms-border-radius: 6 * @px 6 * @px 0 0;
    -o-border-radius: 6 * @px 6 * @px 0 0;
    -moz-border-radius: 6 * @px 6 * @px 0 0;
    h3 {
      font-size: 18 * @px;
      letter-spacing: 2 * @px;
      font-weight: bold;
    }
    > div img {
      width: 14 * @px;
      height: 14 * @px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .explain {
    width: 296 * @px;
    height: 118 * @px;
    background: #fff;
    opacity: 0.9;
    border-radius: 0 0 6 * @px 6 * @px;
    -webkit-border-radius: 0 0 6 * @px 6 * @px;
    -ms-border-radius: 0 0 6 * @px 6 * @px;
    -o-border-radius: 0 0 6 * @px 6 * @px;
    -moz-border-radius: 0 0 6 * @px 6 * @px;
    padding: 22 * @px 20 * @px 20 * @px 18 * @px;
    > div {
      margin-top: 16 * @px;
      display: flex;
      justify-content: space-between;
    }
    p {
      font-size: 18 * @px;
      line-height: 1;
    }
    .carNum,
    .num {
      float: left;
      font-size: 26 * @px;
      img {
        width: 15 * @px;
        height: 22 * @px;
      }
    }
    .carNum {
      line-height: 1;
      span:nth-child(2) {
        font-size: 16 * @px;
      }
    }
    .num {
      line-height: 1;
      color: #00b662;
      margin-left: 26 * @px;
    }
  }
  .gore {
    width: 0;
    height: 0;
    border-width: 22px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    top: 150 * @px;
    left: 126 * @px;
  }
}
.model:after {
  position: absolute;
  display: inline-block;
  top: 146 * @px;
  left: 131 * @px;
  width: 0;
  height: 0px;
  content: "";
  border-style: solid;
  border-width: 11 * @px;
  border-color: #fff #fff transparent transparent;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  -ms-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  box-shadow: 4 * @px -4 * @px 4 * @px #d5d5d5;
  -webkit-box-shadow: 4 * @px -4 * @px 4 * @px #d5d5d5;
  -ms-box-shadow: 4 * @px -4 * @px 4 * @px #d5d5d5;
  -o-box-shadow: 4 * @px -4 * @px 4 * @px #d5d5d5;
  -moz-box-shadow: 4 * @px -4 * @px 4 * @px #d5d5d5;
}
</style>
