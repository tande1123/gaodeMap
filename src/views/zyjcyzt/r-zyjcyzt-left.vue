<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!--专业监测一张图 左侧第一模块 -->
<template>
  <div class="zyjcyzt-left">
    <div class="left0ne">
      <h3>110警车</h3>
      <ul class="yuan">
        <li>
          <img src="../../../static/assets/img/zyjcyzt/jmleft.png" alt="">
          <p>待命车辆</p>
          <p>80辆</p>

        </li>
        <li>
          <img src="../../../static/assets/img/zyjcyzt/jlleft.png" alt="">
          <p>执勤车辆</p>
          <p>10辆</p>
        </li>
        <li>
          <img src="../../../static/assets/img/zyjcyzt/jcleft.png" alt="">
          <p>车辆总数</p>
          <p>90辆</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import '../../assets/less/set.less';
.zyjcyzt-left {
  width: 414 * @px;
  overflow: hidden;
  background: white;
  border-radius: 5 * @px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius: 5 * @px;
  -ms-border-radius: 5 * @px;
  -o-border-radius: 5 * @px;
  box-shadow: 0 0 8px #999;
  -webkit-box-shadow: 0 0 8px #999;
  -moz-box-shadow: 0 0 8px #999;
  -ms-box-shadow: 0 0 8px #999;
  -o-box-shadow: 0 0 8px #999;
}
.left0ne {
  width: 414 * @px;
  height: 206 * @px;
  border-radius: 5 * @px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius: 5 * @px;
  -ms-border-radius: 5 * @px;
  -o-border-radius: 5 * @px;
}
.left0ne > h3 {
  padding-left: 10 * @px;
  width: 414 * @px;
  font-size: 18 * @px;
  border-top-left-radius: 5 * @px;
  -webkit-border-top-left-radius: 5 * @px;
  -moz-border-top-left-radius: 5 * @px;
  -ms-border-top-left-radius: 5 * @px;
  -o-border-top-left-radius: 5 * @px;
  border-top-right-radius: 5 * @px;
  -webkit-border-top-right-radius: 5 * @px;
  -moz-border-top-right-radius: 5 * @px;
  -ms-border-top-right-radius: 5 * @px;
  -o-border-top-right-radius: 5 * @px;
  line-height: 40 * @px;
  font-weight: bold;
  color: white;
  background: url('../../../static/assets/img/zyjcyzt/title-bg1.png') no-repeat center center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size: 100%;
  -ms-background-size: 100%;
  -o-background-size: 100%;
}
.yuan {
  width: 100%;
  height: 164 * @px;
}
.yuan > li {
  width: 114 * @px;
  height: 112 * @px;
  float: left;
  margin-top: 18 * @px;
  display: box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  justify-content: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
}
.yuan > li > img {
  width: 30 * @px;
  height: 26 * @px;
  margin-top: 5 * @px;
}
.yuan > li:nth-child(1) {
  background: url('../../../static/assets/img/zyjcyzt/cl1.png') no-repeat center center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size: 100%;
  -ms-background-size: 100%;
  -o-background-size: 100%;
  margin-left: 12 * @px;
}
.yuan > li:nth-child(2) {
  background: url('../../../static/assets/img/zyjcyzt/cl2.png') no-repeat center center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size: 100%;
  -ms-background-size: 100%;
  -o-background-size: 100%;
  margin-left: 18 * @px;
}
.yuan > li:nth-child(3) {
  background: url('../../../static/assets/img/zyjcyzt/cl3.png') no-repeat center center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size: 100%;
  -ms-background-size: 100%;
  -o-background-size: 100%;
  margin-left: 18 * @px;
}
.yuan li p {
  color: white;
  margin-top: 3 * @px;
  font-size: 16 * @px;
}
</style>
