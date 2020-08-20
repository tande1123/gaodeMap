<!--
 * 设备信息
 -->
<template>
  <drag :fixed="false" class="plotbox-position">

    <div class="plotbox">
      <p class="title">
        <span>设备及耗材清单</span>
        <span @click="close"></span>
      </p>
      <div class="contentbox">
        <!--医疗点(组)设备及耗材清单-->
        <div v-if="type==='1'" class="typeOne">
          <div class="trbox">
            <span>序号</span>
            <span>名称</span>
            <span>规格</span>
            <span>单位</span>
            <span>数量</span>
            <span>备注</span>
          </div>
          <div class="section" v-for="(d,index) in shebeiGroupArr" :key="index">
            <span>{{d.ID}}</span>
            <span>{{d.NAME}}</span>
            <span>{{d.NORMS}}</span>
            <span>{{d.UNIT}}</span>
            <span>{{d.ADDSUM}}</span>
            <span>{{d.REMARK}}</span>
          </div>
        </div>
        <!--救护车设备及耗材清单-->
        <div v-if="type==='2'" class="typeOne">
          <div class="trbox">
            <span>序号</span>
            <span>名称</span>
            <span>规格</span>
            <span>单位</span>
            <span>数量</span>
            <span>备注</span>
          </div>
          <div class="section" v-for="(d,index) in shebeiGroupArr" :key="index">
            <span :title="d.ID">{{d.ID}}</span>
            <span>{{d.NAME}}</span>
            <span>{{d.NORMS}}</span>
            <span>{{d.UNIT}}</span>
            <span>{{d.ADDSUM}}</span>
            <span>{{d.REMARK}}</span>
          </div>
        </div>
      </div>
    </div>
  </drag>
</template>
<script>
import drag from './drag'
export default {
  components: {
    drag
  },
  props: ['item'],
  data () {
    return {
      shebeiGroupArr: [],
      shebeiAmbulanceArr: [],
      type: '1'
    }
  },
  watch: {
    item () {
      let hook = this.item
      this.type = hook.type
      if (hook.type === '1') {
        this.$store.dispatch('getEnsureplanDevice', { id: hook.parentId, type: 'G20_ENSUREPLAN_GROUP' }).then(e => {
          this.shebeiGroupArr = e
        })
      } else {
        this.$store.dispatch('getEnsureplanDevice', { id: hook.parentId, type: 'G20_ENSUREPLAN_AMBULANCE' }).then(e => {
          this.shebeiAmbulanceArr = e
        })
      }
    }
  },
  methods: {
    close () {
      this.$emit('close', false)
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/less/set.less";
@import "../fonts/font2/font.css";
.plotbox-position {
  bottom: 14 * @px;
  left: 14 * @px;
}
.plotbox {
  height: 262 * @px;
  width: 414 * @px;
  background: #fff;
  // background: url("../assets/images/pop/SMT.png") center center no-repeat;
  // background-size: 100% 100%;
  // position: relative;
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
    .typeOne {
      width: 384 * @px;
      margin-top: 14 * @px;
      height: 180 * @px;
      border: 1px solid #edf0f5;
      .trbox {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #edf0f5;
        span {
          display: inline-block;
          flex: 1;
          text-align: center;
          line-height: 42 * @px;
          font-size: 16 * @px;
          font-weight: 500;
        }
      }
      .section {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          display: inline-block;
          flex: 1;
          text-align: center;
          line-height: 42 * @px;
          font-size: 16 * @px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
