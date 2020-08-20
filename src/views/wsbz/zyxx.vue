<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 转运信息 -->
<template>
  <div class="zyxx">
    <p class="title">
      <span>转运信息</span>
      <span>保存</span>
    </p>
    <ul class="ulbox">
      <li>
        <span>出发场所:&nbsp;&nbsp;&nbsp;</span>
        <select id="sex">
          <option style='display: none'></option>
          <option>男</option>
          <option>女</option>
        </select>
      </li>
      <li>
        <span>定点医院:&nbsp;&nbsp;&nbsp;</span>
        <select id="sex">
          <option style='display: none'></option>
          <option>男</option>
          <option>女</option>
        </select>
      </li>
      <li>
        <span>转运车辆:&nbsp;&nbsp;&nbsp;</span>
        <select id="sex">
          <option style='display: none'></option>
          <option>男</option>
          <option>女</option>
        </select>
      </li>
      <li>
        <span>车辆状态:&nbsp;&nbsp;&nbsp;</span>
        <select id="sex">
          <option style='display: none'></option>
          <option>男</option>
          <option>女</option>
        </select>
      </li>
      <li>
        <span>送达医院:&nbsp;&nbsp;&nbsp;</span>
        <div class="yelss">
          <el-radio v-model="radio" label="是">是</el-radio>
        </div>
        <div class="No">
          <el-radio v-model="radio" label="否">否</el-radio>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio: ''
    }
  }
}
</script>

<style lang="less" scoped>
@px: 30rem/1920;
.zyxx {
  width: 414 * @px;
  height: 302 * @px;
  background: white;
  .title {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-right: 14 * @px;
    height: 40 * @px;
    line-height: 40 * @px;
    color: #fff;
    background: url("../../../static/assets/img/wsbz/headbg.png") center center
      no-repeat;
    font-size: 18 * @px;
    padding-left: 14 * @px;
    overflow: hidden;
    letter-spacing: 2 * @px;
    span:nth-child(1) {
      font-weight: bold;
    }
    span:nth-child(2) {
      display: inline-block;
      width: 64 * @px;
      line-height: 30 * @px;
      color: white;
      font-size: 14 * @px;
      text-align: center;
      background: #eba221;
      border-radius: 5 * @px;
      font-weight: 500;
      cursor: pointer;
    }
  }
  .ulbox {
    margin-top: 16 * @px;
    margin-left: 14 * @px;
    width: 386 * @px;
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 8 * @px;
      position: relative;
      #sex {
        height: 40 * @px;
        display: inline-block;
        width: 296 * @px;
        line-height: 36 * @px;
        padding-left: 10 * @px;
        font-size: 16 * @px;
        border: 1px solid #ededed;
        border-radius: 3 * @px;
        background-color: #fcfdfe;
        position: relative;
        appearance: none;
      }
      &::after {
        width: 36 * @px;
        height: 40 * @px;
        background: #d8dde3 url("../../../static/assets/img/wsbz/sj.png") center
          center no-repeat;
        position: absolute;
        border-bottom-right-radius: 3 * @px;
        border-top-right-radius: 3 * @px;
        right: 0;
        top: 0;
        pointer-events: none;
        content: "";
      }
      &:nth-child(5) {
        .yelss {
          margin-left: 60 * @px;
        }
        .No {
          margin-left: 60 * @px;
        }
      }
      &:nth-child(5)::after {
        display: none;
      }
      span {
        display: inline-block;
        width: 86 * @px;
        line-height: 40 * @px;
        text-align: justify;
        font-size: 16 * @px;
      }
    }
  }
}
</style>
