<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-10 14:03:59
 -->
<!-- 卫生保障   患者信息 -->
<template>
  <div class="zyjcyzt-left">
    <div class="title">
      <i></i>
      <span>医疗信息列表</span>
      <p>{{patientList.length}}</p>
      <span @click="openPop" :class="showbox?'active':''"></span>
    </div>
    <div v-show="showbox" class="zyjcyztbox">
      <div class="left0ne">
        <h3>患者信息</h3>
        <div class="search">
          <input class="inputsearch" type="text" placeholder='请输入患者姓名' v-model="searchTxt">
          <i>
            <img src="../../../static/assets/img/wsbz/fdj.png" alt="">
          </i>
        </div>
        <div class="mulu">
          <div class="piaoti">
            <p>序号</p>
            <p>日期</p>
            <p>时间</p>
            <p>患者姓名</p>
            <p>运送状态</p>
          </div>
          <div class="mulubox">
            <el-scrollbar style="height:100%">
              <div class='_hzxx' v-for="(item,index) in patients" :key="index">
                <p>{{index + 1}}</p>
                <p>{{item.createtime | fmtDotNetDate}}</p>
                <p>{{item.createtime | fmtDotNetHour}}</p>
                <p>{{item.name}}</p>
                <p>{{item.arriveflag==='0'?'途中':'送达医院'}}</p>
              </div>

            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      showbox: false,
      patientList: [],
      searchTxt: null
    }
  },
  methods: {
    openPop () {
      this.showbox = !this.showbox
      this.$store.commit('setPopylxxlb', this.showbox)
      this.$store.commit('setPopxzylxx', false)
    },
    loadData () {
      this.configLoaded && this.$store.dispatch('getPatientList').then(data => {
        this.patientList = data
      })
    }
  },
  computed: {
    ...mapState(['popkey', 'configLoaded']),
    patients () {
      if (!!this.searchTxt && this.searchTxt !== '') {
        return this.patientList.filter(e => e.name && e.name.includes(this.searchTxt))
      }
      return this.patientList
    }
  },
  watch: {
    popkey: {
      handler (newName, oldName) {
        this.showbox = this.popkey.ylxxlb
      },
      immediate: true,
      deep: true
    },
    configLoaded () {
      this.loadData()
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
<style>
.mulubox .el-checkbox__inner {
  margin-left: 4px !important;
}
.mulubox .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.mulubox .el-scrollbar__thumb {
  display: none !important;
}
.mulubox .el-scrollbar {
  text-align: left !important;
}
</style>
<style lang="less" scoped>
@import "../../assets/less/set.less";
.zyjcyzt-left {
  width: 414 * @px;
  overflow: hidden;
  border-radius: 5 * @px;
  -webkit-border-radius: 5 * @px;
  -moz-border-radius: 5 * @px;
  -ms-border-radius: 5 * @px;
  -o-border-radius: 5 * @px;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
}
.title {
  width: 414 * @px;
  display: flex;
  justify-content: row;
  align-items: center;
  padding-right: 14 * @px;
  height: 48 * @px;
  color: #06adf3;
  background: white;
  border-top-left-radius: 5 * @px;
  border-bottom-left-radius: 5 * @px;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  i {
    display: inline-block;
    width: 37 * @px;
    height: 37 * @px;
    background: url("../../../static/assets/img/wsbz/bi.png") no-repeat center
      center;
    background-size: 100% 100%;
    margin-left: 14 * @px;
  }
  p {
    width: 37 * @px;
    border-radius: 50%;
    background: #e59912;
    text-align: center;
    line-height: 37 * @px;
    color: white;
    font-size: 16 * @px;
    margin-left: 160 * @px;
  }
  span:nth-child(2) {
    font-weight: bold;
    font-size: 18 * @px;
    margin-left: 10 * @px;
    line-height: 48 * @px;
  }
  span:nth-child(4) {
    cursor: pointer;
    display: inline-block;
    width: 14 * @px;
    height: 24 * @px;
    background: url("../../../static/assets/img/wsbz/left.png") no-repeat center
      center;
    background-size: 100% 100%;
    transform: rotate(270deg);
    margin-left: 13 * @px;
  }
  .active {
    cursor: pointer;
    display: inline-block;
    width: 14 * @px;
    height: 24 * @px;
    background: url("../../../static/assets/img/wsbz/more.png") no-repeat center
      center;
    background-size: 100% 100%;
    transform: rotate(180deg) !important;
    margin-left: 210 * @px;
  }
}
.zyjcyztbox {
  margin-top: 10 * @px;
  background: white;
}
.left0ne {
  width: 414 * @px;
  height: 392 * @px;
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
  background: url("../../../static/assets/img/zyjcyzt/title-bg1.png") no-repeat
    center center;
  background-size: 100%;
  -webkit-background-size: 100%;
  -moz-background-size: 100%;
  -ms-background-size: 100%;
  -o-background-size: 100%;
}
.search {
  width: 414 * @px;
  display: flex;
  flex-direction: row;
  margin-top: 14 * @px;
  margin-left: 20 * @px;
  position: relative;
  input {
    display: inline-block;
    width: 374 * @px;
    height: 36 * @px;
    line-height: 36 * @px;
    padding-left: 10 * @px;
    font-size: 16 * @px;
    border: 1px solid #ededed;
    border-radius: 3 * @px;
    background-color: #fcfdfe;
  }
  i {
    width: 36 * @px;
    background: #d8dde1;
    position: absolute;
    top: 0;
    right: 40 * @px;
    text-align: center;
    line-height: 36 * @px;
    img {
      width: 26 * @px;
      height: 26 * @px;
    }
  }
  span {
    top: 0;
    display: inline-block;
    width: 40 * @px;
    height: 30 * @px;
    line-height: 30 * @px;
    background: gray;
    text-align: center;
    color: white;
    margin-left: 8 * @px;
    cursor: pointer;
  }
}
.mulu {
  width: 374 * @px;
  margin-left: 20 * @px;
  border: 1 * @px solid #ededed;
  margin-top: 18 * @px;
  height: 270 * @px;
  .mulubox {
    overflow: hidden;
    height: 222 * @px;
  }
  .piaoti {
    width: 100%;
    display: flex;
    flex-direction: row;
    background: #edf0f5;
    p {
      &:nth-child(1) {
        width: 16%;
        text-align: center;
        line-height: 48 * @px;
        font-size: 16 * @px;
      }
      &:nth-child(5) {
        width: 24%;
        text-align: center;
        line-height: 48 * @px;
        font-size: 16 * @px;
      }
      width: 20%;
      text-align: center;
      line-height: 48 * @px;
      font-size: 16 * @px;
    }
  }
  ._hzxx {
    width: 100%;
    display: flex;
    flex-direction: row;
    &:nth-child(2n) {
      background: #edf0f5;
    }
    p {
      &:nth-child(1) {
        width: 16%;
      }
      &:nth-child(5) {
        width: 24%;
      }
      width: 20%;
      text-align: center;
      line-height: 46 * @px;
      font-size: 14 * @px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
