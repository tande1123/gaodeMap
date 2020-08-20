<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:14:34
 -->
<!-- 新版专业检测一张图 交通-->
<template>
  <div class="jyhtccVideo">
    <p class="title">军运村卡口视频</p>
    <div class="detail">
      <ul>
        <li v-for="(item,index) in result" :key="index" @click="tabClick(index,item)" :class="activeTab==index?'active':''">{{item.PARKING}}{{item.INANDOUT==='0'?'(进)':'(出)'}}</li>
      </ul>
      <div class="detailImg">
         <hkVideof style="width: 100%;height: 100%;"></hkVideof>
      </div>
    </div>
  </div>
</template>
<script>
import common from '../../utils/common.es'
import hkVideof from '@/views/Video_iframe/hk-video'
export default {
  components: {
    hkVideof
  },
  data () {
    return {
      activeTab: 0,
      result: []// 卡口信息

    }
  },
  props: [],
  computed: {},
  methods: {
    tabClick (idx, item) {
      this.activeTab = idx
      // 播放视频
      this.bus.$emit('PlayHKvideo', item.INDEX_CODE)
    },
    initData (time1, time2) { // 初始化获取对应位置的数据集合
      let parameters = {
        parameter: {
          'DoAction': 'queryhkbayonet'
        },
        token: 'string'
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', parameters).then(res => {
        this.result = common.convertTable2objects(res.data.QuerySafetyResult)
        this.bus.$emit('PlayHKvideo', this.result[0].INDEX_CODE)
      })
    }
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    this.initData()
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  errorCaptured () { }
}
</script>
<style lang='less' scoped>
@px: 30rem/1920;
.jyhtccVideo {
  width: 414 * @px;
  height: 339 * @px;
  background: #fff;
  border-radius: 5 * @px;
  overflow: hidden;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  letter-spacing: 2 * @px;
  .title {
    color: #fff;
    font-size: 18px;
    font-weight: 900;
    background: url("../../../static/assets/img/newzyjcyzt/title-bg1.png")
      no-repeat;
    background-size: 100% 100%;
    height: 40 * @px;
    line-height: 40 * @px;
    text-indent: 12 * @px;
  }
  .detail {
    padding: 14 * @px;
    display: flex;
    ul {
      width: 167 * @px;
      li {
        &:nth-child(1) {
          margin-top: 0;
        }
        margin-top: 11 * @px;
        font-size: 16 * @px;
        height: 29 * @px;
        text-align: left;
        text-indent: 5 * @px;
        line-height: 29 * @px;
        color: #a6a7a9;
        background: #d8dde3;
        border-radius: 4 * @px 0 0 4 * @px;
        cursor: pointer;
        &.active {
          background: #0a7bc7;
          color: #fff;
          font-weight: bold;
          position: relative;
          &::after {
            position: absolute;
            display: inline-block;
            top: 8 * @px;
            right: -6 * @px;
            width: 0;
            height: 0;
            content: "";
            border-style: solid;
            border-width: 6 * @px;
            border-color: #fff #fff transparent transparent;
            transform: rotate(-135deg);
          }
        }
      }
    }
    .detailImg {
      flex: 1;
      border: 1px solid #0a7bc7;
      // background: url("../../../static/assets/img/newzyjcyzt/tccVideo.png")
        // center center no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
