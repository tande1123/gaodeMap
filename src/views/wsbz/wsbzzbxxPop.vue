<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 卫生保障弹框 -->
<template>
  <div class="wsbzPop" v-if="show">
    <p class="title">
      <span>卫生保障值班信息</span>
      <span @click="closePop"></span>
    </p>
    <div class="zbxiBox">
      <el-scrollbar style="height:100%">
        <div class="xq" v-for="(item,index) in list" :key="index">
          <ul class="xq_ul">
            <li>
              <span>{{item[0].dutyTime.split(" ")[0]}}</span>
              <span>{{item[0].dutyTime.split(" ")[1]}}</span>
            </li>
            <li>
              <p>值班领导</p>
              <p>{{item[0].USER_NAME}}</p>
              <p>{{item[0].USER_MOBILEPHONE}}</p>
              <img :src="'../../../static/assets/img/wsbz/'+imgList[0]" alt="">
            </li>
            <li>
              <p>早班</p>
              <p>{{item[1].USER_NAME}}</p>
              <p>{{item[1].USER_MOBILEPHONE}}</p>
              <img :src="'../../../static/assets/img/wsbz/'+imgList[1]" alt="">
            </li>
            <li>
              <p>晚班</p>
              <p>{{item[2].USER_NAME}}</p>
              <p>{{item[2].USER_MOBILEPHONE}}</p>
              <img :src="'../../../static/assets/img/wsbz/'+imgList[2]" alt="">
            </li>
          </ul>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['list'],
  data () {
    return {
      imgList: ['phone01.png', 'phone02.png', 'phone02.png'],
      show: null
    }
  },
  methods: {
    getLastDay () {
      var date2 = new Date()
      var year = date2.getFullYear() // 取当前的年份
      var month = date2.getMonth() + 1 // 取下一个月(getMonth返回0到11)
      if (month === 12) {
        month -= 12
        year++
      }
      var date = new Date(year, month, 1) // 取下一个月中的第一天
      this.list = (new Date(date.getTime() - 1000 * 60 * 60 * 24)).getDate()
    },
    closePop () {
      this.$store.commit('setPopwsbz', false)
    }
  },
  computed: {
    ...mapState(['popkey'])
  },
  mounted () {
    this.show = this.popkey.wsbz
  },
  watch: {
    popkey: {
      handler (newName, oldName) {
        this.show = this.popkey.wsbz
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style>
.zbxiBox .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.zbxiBox .el-scrollbar__thumb {
  display: none !important;
}
.zbxiBox .el-scrollbar {
  text-align: left !important;
}
</style>

<style lang="less" scoped>
@px: 30rem/1920;
.wsbzPop {
  height: 620 * @px;
  width: 976 * @px;
  background: #fff;
  border-radius: 5 * @px;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  .title {
    display: flex;
    justify-content: space-between;
    padding-right: 14 * @px;
    height: 40 * @px;
    line-height: 40 * @px;
    color: #fff;
    align-items: center;
    background: url("../../../static/assets/img/wsbz/headbg.png") center center
      no-repeat;
    background-size: 100% 100%;
    font-size: 18 * @px;
    text-indent: 14 * @px;
    overflow: hidden;
    letter-spacing: 2 * @px;
    border-top-left-radius: 5 * @px;
    border-top-right-radius: 5 * @px;
    span:nth-child(1) {
      font-weight: bold;
    }
    span:nth-child(2) {
      cursor: pointer;
      display: inline-block;
      width: 14 * @px;
      height: 14 * @px;
      background: url("../../../static/assets/img/wsbz/x.png") no-repeat center
        center;
      background-size: 100% 100%;
    }
  }
}
.zbxiBox {
  width: 948 * @px;
  height: 552 * @px;
  margin: 14 * @px;
  background: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  overflow: hidden;
  .xq {
    width: 310 * @px;
    height: 182 * @px;
    float: left;
    border-left: 1 * @px solid #d8dde3;
    border-right: 1 * @px solid #d8dde3;
    margin-top: 4 * @px;
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      margin-top: 0;
    }
    &:nth-child(3n + 2) {
      margin-left: 6 * @px;
      margin-right: 6 * @px;
    }
    .xq_ul {
      width: 310 * @px;
      height: 182 * @px;
      li {
        width: 300 * @px;
        height: 38 * @px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #edf0f5;
        margin-top: 4 * @px;
        margin-left: 4 * @px;
        &:nth-child(1) {
          width: 308 * @px;
          height: 48 * @px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          background: #edf0f5;
          margin-top: 0 * @px;
          margin-left: 0 * @px;
        }
        &:nth-child(2) {
          background: #d8dde3;
        }
        p {
          &:nth-child(1) {
            width: 80 * @px;
            height: 38 * @px;
            display: flex;
            background: #0887ce;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 14 * @px;
          }
          &:nth-child(2) {
            width: 60 * @px;
            font-size: 16 * @px;
            text-align: center;
            margin: 0 10 * @px 0 5 * @px;
          }
          &:nth-child(3) {
            width: 100px;
            font-size: 16 * @px;
          }
        }
        img {
          width: 20 * @px;
          height: 20 * @px;
          margin-left: 16 * @px;
        }
      }
    }
  }
}
</style>
