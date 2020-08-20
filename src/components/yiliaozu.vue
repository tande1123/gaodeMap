<!--
 * 医疗组
 -->
<template>
  <drag :fixed="false" class="plotbox-position">
    <div class="plotbox">
      <p class="title">
        <span>医疗组信息</span>
        <span @click="close"></span>
      </p>
      <div class="contentbox">
        <div class="table">
          <p v-for="(ensure,index) in ensurePlanGroup" :key="index" @click="changeTable(index)" :class="{active:keyTable===(index+1)}">{{ensure.NAME}}</p>
        </div>
        <div class="address">
          <p>位置:</p>&nbsp;
          <p>医疗中心一楼</p>
        </div>
        <div class="information">
          <div class="trbox">
            <span>人员类别</span>
            <span>姓名</span>
            <span>专业</span>
            <span>联系电话</span>
          </div>
          <ul class="ulbox_">
            <el-scrollbar style="height:100%">
              <li v-for="(d,ind) in persons" :key="ind">
                <span :title="d.ROLENAME">{{d.ROLENAME}}</span>
                <span :title="d.NAME">{{d.NAME}}</span>
                <span :title="d.MAJOR">{{d.MAJOR}}</span>
                <span>{{d.MOBILETEL}}</span>
                <a v-if="d.MOBILETEL" @click="tipclickcommand({id:'VEDIOCALL',point:{tag:'voice',data:d.MOBILETEL}})"></a>
              </li>
            </el-scrollbar>
          </ul>
        </div>
        <div class="dbTab" v-if="ensurePlanGroup.length>0">
          <a @click="openOtherWin('shebei',{type:'1',parentId:currentGroup.ID})">配备设备及耗材</a>&nbsp;<a @click="openOtherWin('yaopin',{type:'1',parentId:currentGroup.ID})">配备药品</a>
        </div>
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
      ensurePlanGroup: [],
      currentGroup: {},
      persons: [],
      keyTable: 1
    }
  },
  watch: {
    item () {
      let hook = this.item
      this.address = hook.ADDRESS
      this.ensurePlanGroup = hook.ensurePlanGroup
      this.keyTable = 1
      this.getPersons(this.ensurePlanGroup[0])
    }
  },
  methods: {
    close () {
      this.$emit('close', false)
    },
    tipclickcommand ({ id, point }) {
      switch (id) {
        case 'VEDIOCALL':
          this.panel.getVediocall2().openPanel(point)
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
    },
    getPersons (currentGroup) {
      this.currentGroup = currentGroup || {}
      if (this.currentGroup && this.currentGroup.ID) {
        this.$store.dispatch('getEnsurePlanPerson', { id: this.currentGroup.ID, type: 'G20_ENSUREPLAN_GROUP' }).then(e => {
          this.currentGroup.persons = e
          this.persons = e
        })
      }
    },
    changeTable (key) {
      this.keyTable = key + 1
      this.getPersons(this.ensurePlanGroup[key])
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
  left: 30%;
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
    padding: 14 * @px;
    .table {
      width: 386 * @px;
      display: flex;
      flex-direction: row;
      align-items: center;
      p {
        width: 50%;
        font-size: 16 * @px;
        line-height: 28 * @px;
        text-align: center;
        background: #e3edf7;
        cursor: pointer;
      }
      .active {
        width: 50%;
        font-size: 16 * @px;
        line-height: 28 * @px;
        text-align: center;
        background: #2a90f5;
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
    }
    .address {
      width: 386 * @px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 20 * @px;
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
            width: 56 * @px;
            text-align: center;
          }
          &:nth-child(3) {
            width: 56 * @px;
            text-align: center;
          }
          &:nth-child(4) {
            flex: 1;
            padding-left: 30 * @px;
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
            &:nth-child(2),
            &:nth-child(3) {
              width: 56 * @px;
              text-align: center;
            }
            &:nth-child(4) {
              width: 90 * @px;
              margin-left: 10 * @px;
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
</style>
