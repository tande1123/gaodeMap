<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:57
 -->
<!-- 卫生保障   卫生保障值班信息 -->
<template>
  <div class="wsbzzbxx">
    <p class="title">
      <span>卫生保障值班信息</span>
      <span @click="showPop"></span>
    </p>
    <ul class="list">
      <li v-for="(item,index) in duties[0].slice(0,3)" :key="index">
        <p>值班领导</p>
        <p>{{item.USER_NAME}}</p>
        <p>{{item.USER_MOBILEPHONE}}</p>
        <img :src="'../../../static/assets/img/wsbz/'+imgList[index]" alt="">
      </li>
    </ul>
    <wsbzzbxxPop class="Pop" :list="duties"></wsbzzbxxPop>
  </div>
</template>
<script>
import wsbzzbxxPop from './wsbzzbxxPop.vue'
import fmtDate from '@/utils/formatdate.es.js'
import { mapState } from 'vuex'
export default {
  components: {
    wsbzzbxxPop
  },
  data () {
    return {
      imgList: ['phone01.png', 'phone02.png', 'phone02.png'],
      show: false,
      duties: [[]]
    }
  },
  methods: {
    showPop () {
      this.show = !this.show
      this.$store.commit('setPopwsbz', this.show)
      this.$store.commit('setPopkey', false)
      this.$store.commit('setPoptqyb', false)
    },
    showDutyData (data) {
      let duties = []
      var dutyObj = {}
      var startTime = formatTime(new Date(), 'yyyyMMdd') - 0
      for (var i = 0, len = data.length; i < len; i++) {
        var time = convertDotNetDate(data[i].DUTY_DATE)
        var dutyTime = formatTime(time, 'yyyyMMdd') - 0
        if (dutyTime >= startTime) {
          if (!dutyObj[dutyTime]) {
            dutyObj[dutyTime] = []
          }
          data[i].dutyTime = formatTime(time, 'yyyy-M-d z')
          if (data[i].ORGNAME && data[i].ORGNAME.length > 4) {
            data[i].dutyOrgname = data[i].ORGNAME.substring(0, 3) + '...'
          } else {
            data[i].dutyOrgname = data[i].ORGNAME
          }
          dutyObj[dutyTime].push(data[i])
        }
      }
      var keys = Object.keys(dutyObj)
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        duties.push(dutyObj[key])
      }
      this.duties = duties
      console.log('this.duties: ', this.duties)
    }
  },
  computed: {
    ...mapState(['popkey'])
  },
  watch: {
    popkey: {
      handler (newName, oldName) {
        this.show = this.popkey.wsbz
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    this.$store.dispatch('getDutyDate').then(data => {
      this.showDutyData(data)
    })
  }
}
function convertDotNetDate (dat) {
  return fmtDate.convertDotNetString2Date(dat + '')
}

function formatTime (upDateTime, str) {
  return fmtDate.convertDbDate(upDateTime, str)
}
</script>
<style lang="less" scoped>
@px: 30rem/1920;
.wsbzzbxx {
  width: 414 * @px;
  height: 228 * @px;
  background: #fff;
  border-radius: 4 * @px;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  position: relative;
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
      width: 10 * @px;
      height: 18 * @px;
      background: url("../../../static/assets/img/wsbz/more.png") no-repeat
        center center;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .list {
    padding: 14 * @px;
    li {
      display: flex;
      align-items: center;
      margin-bottom: 10 * @px;
      background: #f4f7fc;
      &:nth-child(1) {
        background: #d8dde3;
      }
      p {
        &:nth-child(1) {
          width: 102 * @px;
          height: 48 * @px;
          display: flex;
          background: #0887ce;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 16 * @px;
        }
        &:nth-child(2) {
          width: 60 * @px;
          font-size: 16 * @px;
          text-align: center;
          margin: 0 30 * @px 0 30 * @px;
        }
        &:nth-child(3) {
          width: 100px;
          font-size: 16 * @px;
        }
      }
      img {
        width: 20 * @px;
        height: 20 * @px;
        margin-left: 26 * @px;
      }
    }
  }
}
.Pop {
  position: absolute;
  top: -540 * @px;
  left: 454 * @px;
}
</style>
