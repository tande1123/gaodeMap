<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 09:18:31
 * @LastEditTime: 2019-10-10 13:57:57
 * @LastEditors: Please set LastEditors
 -->
<!--
 * 转运医院
 -->
<template>
  <drag :fixed="false" class="plotbox-position">
    <div class="plotbox">
      <p class="title">
        <span>转运医院</span>
        <span @click="close"></span>
      </p>
      <div class="tabbar">
        <span class="prev" @click="prev"></span>
        <span class="next" @click="next"></span>
        <div class="container">
          <ul class="ul" ref="ul">
            <li :class="activeIndex === index ? 'active slide':'slide'" @click="changeTable(index)" v-for="(item,index) in ensurePlanHospital" :key="index">{{item.NAME}}</li>
          </ul>
        </div>
      </div>
      <div class="contentbox">
        <div class="address">
          <p>位置:</p>&nbsp;
          <p>{{currentHospital.ADDRESS}}</p>
        </div>
        <div class="information">
          <div class="trbox">
            <span>人员类别</span>
            <span>姓名</span>
            <span>联系电话</span>
          </div>
          <ul class="ulbox_">
            <el-scrollbar style="height:100%">
              <li>
                <span>负责人</span>
                <span :title="currentHospital.PRESIDENT">{{currentHospital.PRESIDENT}}</span>
                <span>{{currentHospital.PREMOBILE}}</span>
                <a v-if="currentHospital.PREMOBILE" @click="tipclickcommand({id:'VEDIOCALL',point:{tag:'voice',data:currentHospital.PREMOBILE}})"></a>
              </li>
              <li>
                <span>联系人</span>
                <span :title="currentHospital.COMMUNICATOR">{{currentHospital.COMMUNICATOR}}</span>
                <span>{{currentHospital.COMMOBILE}}</span>
                <a v-if="currentHospital.COMMOBILE" @click="tipclickcommand({id:'VEDIOCALL',point:{tag:'voice',data:currentHospital.COMMOBILE}})"></a>
              </li>
            </el-scrollbar>
          </ul>
        </div>
        <!-- <div class="dbTab">
          <a @click="openOtherWin('shebei',{type:'1',parentId:currentGroup.ID})">配备设备及耗材</a>&nbsp;<a @click="openOtherWin('yaopin',{type:'1',parentId:currentGroup.ID})">配备药品</a>
        </div> -->
      </div>
    </div>
  </drag>
</template>
<script>
import drag from './drag'
import { mapGetters } from 'vuex'
export default {
  components: {
    drag
  },
  computed: {
    ...mapGetters(['panel'])
  },
  props: ['item'],
  data () {
    return {
      address: '',
      ensurePlanHospital: [],
      currentHospital: {},
      persons: [],
      keyTable: 1,
      activeIndex: 0,
      dataList: [
        { time: '10月18日' },
        { time: '10月19日' },
        { time: '10月20日' },
        { time: '10月21日' },
        { time: '10月22日' },
        { time: '10月23日' },
        { time: '10月24日' },
        { time: '10月25日' },
        { time: '10月26日' },
        { time: '10月27日' }
      ]
    }
  },
  watch: {
    item () {
      let hook = this.item
      this.address = hook.address
      this.$store.dispatch('getEnsurePlanHospital').then(data => {
        this.ensurePlanHospital = data
        this.currentHospital = data[0] || {}
      })
    }
  },
  methods: {
    changeTable (index) {
      this.activeIndex = index
      if (this.activeIndex < (this.ensurePlanHospital.length - 1)) { // 点击时当长度不超出需要显示范围正常动画
        this.$refs.ul.style.marginLeft = (this.activeIndex * -(this.$refs.ul.firstElementChild.offsetWidth)) + 'px'
      } else { // 超出则显示最后几条
        this.$refs.ul.style.marginLeft = ((this.ensurePlanHospital.length - 2) * -(this.$refs.ul.firstElementChild.offsetWidth)) + 'px'
      }
      this.activeIndex = index
      this.keyTable = index + 1
      this.currentHospital = this.ensurePlanHospital[index]
    },
    prev () {
      if (this.activeIndex > 0) {
        this.activeIndex--
        if (this.activeIndex < (this.ensurePlanHospital.length - 1)) {
          this.$refs.ul.style.marginLeft = (this.activeIndex * -(this.$refs.ul.firstElementChild.offsetWidth)) + 'px'
        }
      }
      this.changeTable(this.activeIndex)
    },
    next () {
      if (this.activeIndex < this.ensurePlanHospital.length - 1) {
        this.activeIndex++
        if (this.activeIndex < (this.ensurePlanHospital.length - 1)) {
          this.$refs.ul.style.marginLeft = (this.activeIndex * -(this.$refs.ul.firstElementChild.offsetWidth)) + 'px'
        }
      } else {
        this.activeIndex = 0
        this.$refs.ul.style.marginLeft = (this.activeIndex * -(this.$refs.ul.firstElementChild.offsetWidth)) + 'px'
      }
      this.changeTable(this.activeIndex)
    },
    close () {
      this.$emit('close', false)
    },
    tipclickcommand ({ id, point }) {
      switch (id) {
        case 'VEDIOCALL':
          this.panel.getVediocall().openPanel(point)
          break
      }
    },
    openOtherWin (id, point) {
      switch (id) {
        case 'shebei':
          this.panel.getShebei().openPanel(point)
          break
        case 'yaopin':
          this.panel.getYaopin().openPanel(point)
          break
      }
    }
  }
}
</script>
<style>
.ulbox_ .el-checkbox__inner {
  margin-left: 4px !important;
}
.ulbox_ .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.ulbox_ .el-scrollbar__thumb {
  display: none !important;
}
.ulbox_ .el-scrollbar {
  text-align: left !important;
}
</style>
<style lang="less" scoped>
@import "../assets/less/set.less";
@import "../fonts/font2/font.css";
.plotbox-position {
  bottom: 20%;
  left: 35%;
}
.plotbox {
  height: 408 * @px;
  width: 414 * @px;
  background: #fff;
  border-radius: 5 * @px;
  .title {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-right: 14 * @px;
    height: 40 * @px;
    line-height: 40 * @px;
    color: #fff;
    background: url("../../static/assets/img/wsbz/headbg.png") center center
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
      width: 18 * @px;
      height: 18 * @px;
      background: url("../../static/assets/img/wsbz/x.png") no-repeat center
        center;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .contentbox {
    width: 396 * @px;
    padding: 18 * @px;
    .address {
      width: 386 * @px;
      display: flex;
      flex-direction: row;
      align-items: center;
      p {
        font-size: 16 * @px;
        line-height: 28 * @px;
      }
    }
    .information {
      width: 384 * @px;
      margin-top: 14 * @px;
      border: 1px solid #edf0f5;
      .trbox {
        background: #edf0f5;
        height: 46 * @px;
        display: flex;
        flex-direction: row;
        align-content: center;
        span {
          display: inline-block;
          line-height: 46 * @px;
          font-size: 14 * @px;
          font-weight: 500;
          &:nth-child(1) {
            width: 84 * @px;
            text-align: center;
          }
          &:nth-child(2) {
            margin-left: 36 * @px;
            width: 68 * @px;
            text-align: center;
          }
          &:nth-child(3) {
            flex: 1;
            text-align: left;
            padding-left: 50 * @px;
          }
        }
      }
      .ulbox_ {
        height: 126 * @px;
        overflow: hidden;
        li {
          height: 42 * @px;
          display: flex;
          flex-direction: row;
          align-items: center;
          span {
            display: inline-block;
            line-height: 46 * @px;
            font-size: 14 * @px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:nth-child(1) {
              width: 100 * @px;
              margin-left: 18 * @px;
            }
            &:nth-child(2) {
              width: 68 * @px;
              text-align: center;
            }
            &:nth-child(3) {
              width: 90 * @px;
              margin-left: 20 * @px;
            }
          }
          a {
            display: inline-block;
            width: 20 * @px;
            height: 20 * @px;
            background: url("../../static/assets/img/wsbz/phone02.png")
              no-repeat center center;
            background-size: 100% 100%;
            margin-left: 14 * @px;
          }
        }
      }
      .main {
        tbody {
          tr {
            td:nth-child(1) {
              line-height: 40 * @px;
              font-size: 14 * @px;
              padding-left: 14 * @px;
            }
          }
        }
      }
    }
    .dbTab {
      width: 100%;
      margin-top: 22 * @px;
      a {
        text-align: center;
        line-height: 40 * @px;
        border-radius: 5 * @px;
        background: #0697da;
        display: inline-block;
        color: #fff;
        font-size: 16 * @px;
        &:nth-child(1) {
          width: 168 * @px;
          margin-left: 50 * @px;
        }
        &:nth-child(2) {
          width: 112 * @px;
        }
      }
    }
  }
}
.tabbar {
  width: 100%;
  height: 43 * @px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 15 * @px;
  position: relative;
  .container {
    height: 28 * @px;
    width: 365 * @px;
    margin: 14 * @px 25 * @px;
    position: relative;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    .ul {
      list-style: none;
      height: 28 * @px;
      display: block;
      transition: 0.8s;
      -moz-transition: 0.8s;
      -ms-transition: 0.8s;
      -webkit-transition: 0.8s;
      li {
        margin-top: 0;
        display: inline-block;
        padding: 0 1 * @px;
        height: 28 * @px;
        line-height: 28 * @px;
        transition: 0.8s;
        -webkit-transition: 0.6s;
        -ms-transition: 0.6s;
        -o-transition: 0.6s;
        -moz-transition: 0.6s;
        font-size: 16 * @px;
        width: 193 * @px;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        cursor: pointer;
        font-weight: 500;
        background: #e3edf7;
      }
    }
  }
  .prev {
    position: absolute;
    display: block;
    z-index: 99;
    width: 17 * @px;
    height: 27 * @px;
    background: url("../../static/img/site/zjlbRight.png") no-repeat center
      center;
    top: 50%;
    margin-top: -8.5 * @px;
    left: 8 * @px;
    cursor: pointer;
  }
  .next {
    position: absolute;
    display: block;
    z-index: 99;
    width: 17 * @px;
    height: 27 * @px;
    background: url("../../static/img/site/zjlbLeft.png") no-repeat center
      center;
    top: 50%;
    margin-top: -8.5 * @px;
    right: 8 * @px;
    cursor: pointer;
  }
}
.active {
  background: #2a90f5 !important;
  color: white;
  position: relative;
}
.active::after {
  position: absolute;
  position: absolute;
  bottom: -8px;
  left: 50%;
  font-size: 0;
  line-height: 0;
  border-width: 8px;
  border-color: #2a90f5;
  border-bottom-width: 0;
  border-style: dashed;
  border-top-style: solid;
  border-left-color: transparent;
  border-right-color: transparent;
  content: "";
}
</style>
