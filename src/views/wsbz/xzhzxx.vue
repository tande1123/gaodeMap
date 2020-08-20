<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 患者信息 -->
<template>
  <div class="xzhzxx">
    <p class="title">
      <span>患者信息</span>
      <span>保存</span>
    </p>
    <ul class="ulbox">
      <li>
        <span>姓&nbsp;&nbsp;&nbsp;名:</span>
        <input type="text">
      </li>
      <li>
        <span>身&nbsp;&nbsp;&nbsp;份:</span>
        <select id="sex">
          <option style='display: none'></option>
          <option>男</option>
          <option>女</option>
        </select>
      </li>
      <li>
        <span>性&nbsp;&nbsp;&nbsp;别:</span>
        <select id="sex">
          <option style='display: none'></option>
          <option>男</option>
          <option>女</option>
        </select>
      </li>
      <li>
        <span>国&nbsp;&nbsp;&nbsp;籍:</span>
        <input type="text">
      </li>
      <li>
        <span>病&nbsp;&nbsp;&nbsp;情:</span>
        <input type="text">
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
@px: 30rem/1920;
.xzhzxx {
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
      &:nth-child(3),
      &:nth-child(2) {
        position: relative;
        #sex {
          height: 40 * @px;
          display: inline-block;
          width: 374 * @px;
          line-height: 36 * @px;
          padding-left: 10 * @px;
          font-size: 16 * @px;
          border: 1px solid #ededed;
          border-radius: 3 * @px;
          background-color: #fcfdfe;
          position: relative;
          appearance: none;
        }
        &:nth-child(3)::after,
        &:nth-child(2)::after {
          width: 36 * @px;
          height: 40 * @px;
          background: #d8dde3 url("../../../static/assets/img/wsbz/sj.png")
            center center no-repeat;
          position: absolute;
          border-bottom-right-radius: 3 * @px;
          border-top-right-radius: 3 * @px;
          right: 0;
          top: 0;
          pointer-events: none;
          content: "";
        }
      }
      span {
        display: inline-block;
        width: 70 * @px;
        line-height: 40 * @px;
        text-align: justify;
        font-size: 16 * @px;
      }
      input {
        height: 40 * @px;
        display: inline-block;
        width: 374 * @px;
        line-height: 36 * @px;
        padding-left: 10 * @px;
        font-size: 16 * @px;
        border: 1px solid #ededed;
        border-radius: 3 * @px;
        background-color: #fcfdfe;
      }
    }
  }
}
</style>
