<!--
 *  药品信息
 -->
<template>
  <drag :fixed="false" class="plotbox-position">
    <div class="plotbox">
      <p class="title">
        <span>药品信息</span>
        <span @click="close"></span>
      </p>
      <div class="contentbox">
        <!--医疗点(组)设备及耗材清单-->
        <div v-if="type==='1'" class="typeOne">
          <div class="trbox">
            <span>序号</span>
            <span>通用名</span>
            <span>商品名</span>
            <span>英文名</span>
            <span>规格</span>
            <span>剂型</span>
            <span>单位</span>
            <span>数量</span>
          </div>
          <div class="section" v-for="(d,index) in yaopingGroupArr" :key="index">
            <span>{{d.ID}}</span>
            <span>{{d.NAME}}</span>
            <span>{{d.GOODSNAME}}</span>
            <span>{{d.ENGLISHNAME}}</span>
            <span>{{d.NORMS}}</span>
            <span>{{d.DOSE}}</span>
            <span>{{d.UNIT}}</span>
            <span>{{d.SUM}}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <!--医疗点(组)配备药品清单-->
        <!-- <div v-if="type==='1'">
          <table class="grid">
            <thead>
              <tr>
                <th>序号</th>
                <th>通用名</th>
                <th>商品名</th>
                <th>英文名</th>
                <th>规格</th>
                <th>剂型</th>
                <th>单位</th>
                <th>数量</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(d,index) in yaopingGroupArr" :key="index">
                <td>{{d.ID}}</td>
                <td>{{d.NAME}}</td>
                <td>{{d.GOODSNAME}}</td>
                <td>{{d.ENGLISHNAME}}</td>
                <td>{{d.NORMS}}</td>
                <td>{{d.DOSE}}</td>
                <td>{{d.UNIT}}</td>
                <td>{{d.SUM}}</td>
              </tr>
            </tbody>
          </table>
        </div> -->
      </div>
      <!--救护车配备药品清单-->
      <div v-if="type==='2'">
        <table class="grid">
          <thead>
            <tr>
              <th>序号</th>
              <th>通用名</th>
              <th>系统分类</th>
              <th>商品名</th>
              <th>英文名</th>
              <th>规格</th>
              <th>剂型</th>
              <th>单位</th>
              <th>配备数量</th>
              <th>补充消耗数量</th>
              <th>合计数量</th>
              <th>单价</th>
              <th>金额</th>
              <th>生产厂家</th>
              <th>配送企业</th>
              <th>每份数量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d,ind) in yaopingAmbulanceArr" :key="ind">
              <td>{{d.ID}}</td>
              <td>{{d.NAME}}</td>
              <td>{{d.SYSTEMTYPE}}</td>
              <td>{{d.GOODSNAME}}</td>
              <td>{{d.ENGLISHNAME}}</td>
              <td>{{d.NORMS}}</td>
              <td>{{d.DOSE}}</td>
              <td>{{d.UNIT}}</td>
              <td>{{d.COLLOCATESUM}}</td>
              <td>{{d.ADDSUM}}</td>
              <td>{{d.SUM}}</td>
              <td>{{d.PRICE}}</td>
              <td>{{d.MONEY}}</td>
              <td>{{d.PRODUCTION}}</td>
              <td>{{d.DISPATCHING}}</td>
              <td>{{d.PARTSUM}}</td>
            </tr>

          </tbody>
        </table>
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
      yaopingGroupArr: [],
      yaopingAmbulanceArr: [],
      type: '1'
    }
  },
  watch: {
    item () {
      let hook = this.item
      this.type = hook.type
      if (hook.type === '1') {
        this.$store.dispatch('getEnsureplanMaterials', { id: hook.parentId, type: 'G20_ENSUREPLAN_GROUP' }).then(e => {
          this.yaopingGroupArr = e
        })
      } else {
        this.$store.dispatch('getEnsureplanMaterials', { id: hook.parentId, type: 'G20_ENSUREPLAN_AMBULANCE' }).then(e => {
          this.yaopingAmbulanceArr = e
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
  bottom: 14px;
  left: 14px;
}
.plotbox {
  height: 262px;
  width: 440px;
  background: #fff;
  background: url("../assets/images/pop/SMT.png") center center no-repeat;
  background-size: 100% 100%;
  position: relative;
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
          // text-align: center;
          line-height: 42 * @px;
          font-size: 16 * @px;
          font-weight: 500;
          width: 42 * @px;
          text-align: center;
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4) {
            display: inline-block;
            width: 56 * @px;
          }
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
