<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->

<!-- 卫生保障   患者治疗状态 -->
<template>
  <div class="zlzt">
    <p class="title">
      <span>治疗状态</span>
      <span>保存</span>
    </p>
    <ul class="ulBox">
      <li>
        <span>药品</span>
        <span>:</span>
        <textarea name="" id="" cols="34" rows="4" class="inputone"></textarea>
      </li>
      <li>
        <span>诊疗项目</span>
        <span>:</span>
        <textarea name="" id="" cols="34" rows="4" class="inputone"></textarea>
      </li>
      <li>
        <p>送达医院:&nbsp;&nbsp;&nbsp;</p>
        <div class="yelss">
          <el-radio v-model="radio" label="是">是</el-radio>
        </div>
        <div class="No">
          <el-radio v-model="radio" label="否">否</el-radio>
        </div>
      </li>
      <li>
        <span>诊治时间</span>
        <span>:</span>
        <div class="rl">
          <el-date-picker v-model="value1" type="date" placeholder="" style='width:100%;height:100%' value-format="yyyy-MM-dd" align="center" prefix-icon='tubiao'>
          </el-date-picker>
          <img src="../../../static/assets/img/wsbz/rili.png" alt="">
        </div>
      </li>
      <li>
        <span>诊治时间</span>
        <span>:</span>
        <textarea name="" id="" cols="34" rows="10" class="inputone"></textarea>
      </li>
    </ul>
    <div class="tj">
      <span>提交</span>
      <span>返回</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: '',
      radio: ''
    }
  }
}
</script>
<style lang="less" scoped>
@px: 30rem/1920;
.zlzt {
  width: 414 * @px;
  height: 510 * @px;
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
  .ulBox {
    margin-top: 16 * @px;
    margin-left: 14 * @px;
    width: 386 * @px;
    li {
      display: flex;
      flex-direction: row;
      margin-top: 14 * @px;
      position: relative;
      span {
        font-size: 16px;
        text-align: justify;
        width: 76 * @px;
        display: inline-block;
        overflow: hidden;
        line-height: 40 * @px;
        height: 62 * @px;
        &:nth-child(2) {
          width: 10 * @px;
          display: inline-block;
        }
      }
      span::after {
        content: " ";
        display: inline-block;
        width: 100%;
      }
      .inputone {
        outline: none;
        height: 62 * @px;
        display: inline-block;
        width: 298 * @px;
        font-size: 16 * @px;
        border: 1px solid #ededed;
        border-radius: 3 * @px;
        background-color: #fcfdfe;
        margin-left: 30 * @px;
      }

      &:nth-child(3) {
        display: flex;
        flex-direction: row;
        align-items: center;
        p {
          font-size: 16px;
          width: 86 * @px;
          overflow: hidden;
          text-align: justify;
          line-height: 40 * @px;
          height: 40 * @px;
        }
        .yelss {
          margin-left: 60 * @px;
        }
        .No {
          margin-left: 60 * @px;
        }
      }
      &:nth-child(4) {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40 * @px;
        span {
          font-size: 16px;
          text-align: justify;
          width: 76 * @px;
          display: inline-block;
          overflow: hidden;
          height: 40 * @px;
          line-height: 40 * @px;
          &:nth-child(2) {
            width: 10 * @px;
            display: inline-block;
            line-height: 40 * @px;
          }
        }
        span::after {
          content: " ";
          display: inline-block;
          width: 100%;
          line-height: 40 * @px;
        }
        .rl {
          display: inline-block;
          width: 286 * @px;
          line-height: 40 * @px;
          font-size: 16 * @px;
          background-color: #fcfdfe;
          margin-left: 30 * @px;
          position: relative;
          img {
            width: 24 * @px;
            height: 23 * @px;
            position: absolute;
            right: 4 * @px;
            top: calc((100%-23 * @px) / 4);
            pointer-events: none;
            cursor: pointer;
          }
        }
      }
      &:nth-child(5) {
        display: flex;
        flex-direction: row;
        span {
          font-size: 16px;
          text-align: justify;
          width: 76 * @px;
          display: inline-block;
          overflow: hidden;
          line-height: 40 * @px;
          &:nth-child(2) {
            width: 10 * @px;
            line-height: 40 * @px;
            display: inline-block;
          }
        }
        span::after {
          content: " ";
          display: inline-block;
          width: 100%;
        }
        .inputone {
          height: 86 * @px;
          display: inline-block;
          width: 298 * @px;
          font-size: 16 * @px;
          border: 1px solid #ededed;
          border-radius: 3 * @px;
          background-color: #fcfdfe;
          margin-left: 30 * @px;
        }
      }
    }
  }
  .tj {
    margin-top: 30 * @px;
    margin-left: 14 * @px;
    width: 386 * @px;
    span {
      display: inline-block;
      width: 90 * @px;
      height: 90 * @px;
      height: 38 * @px;
      text-align: center;
      font-size: 16 * @px;
      border-radius: 4 * @px;
      color: white;
      line-height: 38 * @px;
      &:nth-child(1) {
        background: #01bbf4;
        margin-left: 130 * @px;
      }
      &:nth-child(2) {
        background: #f7b137;
        margin-left: 20 * @px;
      }
    }
  }
}
</style>
