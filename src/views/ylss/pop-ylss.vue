<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-12 17:45:36
 -->
<!--医疗赛事的弹窗-->
<template>
  <div class="jycInfo">
    <i class="jycInfo_x" @click="closeTk"></i>
    <p class="jyc_title">
      车辆信息
    </p>
    <i class="bar"></i>
    <div class="xq">
      <div>
        <span>车牌号</span>
        <span>: </span>
        <p>{{MarkerData.PLATE_NUM||'待核实'}}</p>
      </div>
      <div>
        <span>司机名称</span>
        <span>: </span>
        <p>{{MarkerData.DRIVER||'待核实'}}</p>
      </div>
      <div>
        <span>联系电话</span>
        <span>: </span>
        <p>{{MarkerData.CONTACT_TEL||'待核实'}}</p>
      </div>
      <div class="peopleCount">
        <span>转运医院</span>
        <span>: </span>
        <p>{{MarkerData.TRANSFER_HOSPITAL||'待核实'}}</p>
        <i></i>
      </div>
      <!-- <div class="peopleCount">
        <span>时间: </span>{{UPDATETIME}}<i></i></div> -->
      <i class="dh" @click="showPhone"></i>
    </div>
    <div class="ry">
      <p class="ry_title">
        伤员信息
      </p>
      <i class="ry_bar"></i>
      <div>
        <span>姓名</span>
        <span>: </span>
        <p>{{MarkerData.PATIENT_NAME==='无名氏'?'待核实':MarkerData.PATIENT_NAME||'待核实'}}</p>
      </div>
      <div>
        <span>国籍</span>
        <span>: </span>
        <p>{{MarkerData.NATIONALITY||'待核实'}}</p>
      </div>
      <div>
        <span>病情</span>
        <span>: </span>
        <p>{{MarkerData.CONDITION||'待核实'}}</p>
      </div>
      <!-- <i class="tubiao" @click="openry"></i> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['MarkerData'],
  data () {
    return {
      phoneStatus: '接入中',
      interval: null, // 轮询,
      callCount: 0// 响铃次数
    }
  },
  computed: {
    ...mapGetters(['panel', 'map'])
  },
  methods: {
    closeTk () {
      this.$emit('close')
    },
    // showVideo () {
    //   this.panel.getPopVideo().openPanel()
    // },
    // openry () {
    //   this.panel.getPopDetail().openPanel()
    // },
    showPhone () {
      let phone = {
        phone: this.MarkerData.CONTACT_TEL
      }
      this.panel.getVediocall().openPanel(phone)
      this.callphone()
    },
    fmtDate (date) {
      let item = date.slice(0, 4)
      let result = ''
      for (let i = 0; i < item.length; i++) {
        result += item[i]
        if (i === 1) {
          result += ':'
        }
      }
      return result
    },
    fmtCarNum (str) { // 格式化车牌号
      return str.slice(0, 2) + ' ' + str.slice(2)
    },
    // 打电话
    callphone () {
      let _that = this
      if (this.MarkerData.CONTACT_TEL) {
        try {
          let phone = {
            phone: this.MarkerData.CONTACT_TEL
          }
          this.$store.dispatch('callPhone', phone).then(res => {
            console.log('拨打电话', res)
            if (res.code === 200) {
              _that.interval = setInterval(function () {
                _that.checkStatus(phone)
              }, 1000)
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
    // 检查电话的状态(0-空闲  2 -振铃  4--通话)
    checkStatus (phone) {
      let _that = this
      this.$store.dispatch('phoneStatus', phone).then(res => {
        console.log('phoneStatus', res)
        if (res.code === 200) {
          _that.callCount++
          let status = JSON.parse(res.response)['status']
          console.log('status', status)
          if (status === 4) {
            _that.phoneStatus = '正在通话'
            _that.callCount = 0
            clearInterval(_that.interval)
          } else if (_that.callCount >= 20 && status !== 4) {
            clearInterval(_that.interval)
            _that.callCount = 0
          }
        }
      })
    }
  },
  mounted () {
  },
  beforeDestroy () {

  }
}
</script>
<style lang="less" scoped>
.jycInfo {
  position: absolute;
  right: 10px;
  top: 10px;
  .jyc_title {
    pointer-events: none;
    width: 300px;
  }
  .jycInfo_x {
    cursor: pointer;
    z-index: 200;
  }
  p {
      width: 176px;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      color: #00effe;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    }
</style>
