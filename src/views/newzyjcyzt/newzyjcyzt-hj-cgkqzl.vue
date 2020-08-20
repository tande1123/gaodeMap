<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:13:24
 -->
<!--环境  场馆空气质量组件-->
<template>
  <div class="cgkqzlbox">
    <p class="title">
      <span>场馆空气质量</span>
      <span>更多</span>
    </p>
    <div class="listbox">
      <ul class="listul">
        <li @click="showOnMap(index)" v-for="(item,index) in AQIData" :key="index">
          <div class="imgbox">
            <img src="../../../static/assets/img/newzyjcyzt/kqzl98.png" alt="">
            <p class="cgkqzlnumber">{{item.AQI}}</p>
            <p class="grade">{{item.QUALITY}}</p>
          </div>
          <ul class="infobox">
            <li>今天</li>
            <li><span class="yellow">{{item.QUALITY_LEVEL}}</span></li>
            <!-- <li>明天</li>
            <li><span class="yellow">{{item.QUALITY_LEVEL}}</span></li>
            <li>后天</li>
            <li><span class="yellow">{{item.QUALITY_LEVEL}}</span></li> -->
          </ul>
          <p class="bottom boottemblue">{{item.POSITION_NAME}}</p>
        </li>
        <!-- <li @click="showOnMap(1)">
          <div class="imgbox">
            <img src="../../../static/assets/img/newzyjcyzt/kqzl98.png" alt="">
            <p class="cgkqzlnumber">98</p>
            <p class="grade">良</p>
          </div>
          <ul class="infobox">
            <li>今天</li>
            <li><span class="orange">轻度</span></li>
            <li>明天</li>
            <li><span class="yellow">轻度</span></li>
            <li>后天</li>
            <li><span class="yellow">轻度</span></li>
          </ul>
          <p class="bottom boottemsky">铁人三项</p>
        </li>
        <li @click="showOnMap(2)">
          <div class="imgbox">
            <img src="../../../static/assets/img/newzyjcyzt/kqzly.png" alt="">
            <p class="cgkqzlnumber fontgrenn">43</p>
            <p class="grade">优</p>
          </div>
          <ul class="infobox">
            <li>今天</li>
            <li><span class="orange">轻度</span></li>
            <li>明天</li>
            <li><span class="yellow">轻度</span></li>
            <li>后天</li>
            <li><span class="yellow">轻度</span></li>
          </ul>
          <p class="bottom boottemgreen">定向越野</p>
        </li> -->
      </ul>
    </div>
    <aqicg-map-handler ref="AQIH"></aqicg-map-handler>
  </div>
</template>
<script>
import aqicgMapHandler from '@/ctrls/aqicg-map-handler.vue'
import common from '@/utils/common.es'
export default {
  components: {
    aqicgMapHandler
  },
  data () {
    return {
      AQIData: []
    }
  },
  props: [],
  computed: {},
  methods: {
    initData () {
      let param = {
        token: '',
        parameter: {
          DoAction: 'queryaqiaction', // 查询对应的表
          Conditions: [
            [
              { Column: 'NAME', Mode: 'IS', Value: '江夏区站', ColumnDateType: '' }
            ]
          ]
        }
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QuerySafety', param).then(res => {
        console.log('江夏区空气质量：----------')
        console.log(res)
        let datas = common.convertTable2objects(res.data.QuerySafetyResult)
        this.$set(this.AQIData, 0, {...{POSITION_NAME: '军运村'}, ...datas[0]})
        this.$set(this.AQIData, 1, {...{POSITION_NAME: '铁人三项'}, ...datas[0]})
        this.$set(this.AQIData, 2, {...{POSITION_NAME: '定向越野'}, ...datas[0]})
      })
    },
    showOnMap (index) {
      console.log('this.$refs.AQIH: ', this.$refs.AQIH.selectorHandler)
      this.$refs.AQIH.selectorHandler(this.AQIData[index])
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
<style lang="less" scoped>
@import "../../assets/less/set.less";
.cgkqzlbox {
  width: 414 * @px;
  height: 330 * @px;
  background: #fff;
  border-radius: 4 * @px;
  overflow: hidden;
  box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
  .title {
    display: flex;
    justify-content: space-between;
    padding-right: 14 * @px;
    height: 40 * @px;
    line-height: 40 * @px;
    color: #fff;
    background: url("../../../static/assets/img/newzyjcyzt/headbg.png") center
      100% no-repeat;
    font-size: 18 * @px;
    text-indent: 14 * @px;
    overflow: hidden;
    letter-spacing: 2 * @px;
    span:nth-child(1) {
      font-weight: bold;
    }
    span:nth-child(2) {
      cursor: pointer;
    }
  }
}
.time {
  font-size: 16 * @px;
  font-weight: 400;
  float: right;
  margin-right: 14 * @px;
  overflow: hidden;
  cursor: pointer;
}
.listbox {
  height: 190 * @px;
  width: 100%;
  box-sizing: border-box;
  padding: 14 * @px 0;
}
.listul {
  height: 100%;
  width: auto;
  list-style: none;
}
.listul > li {
  float: left;
  width: 116 * @px;
  height: 200 * @px;
  margin-left: 14 * @px;
  margin-right: 5 * @px;
  border-radius: 4 * @px;
  box-shadow: 0 * @px 5 * @px 10 * @px rgba(89, 200, 243, 0.5);
  position: relative;
  overflow: hidden;
}
.imgbox {
  height: 102 * @px;
  width: 100%;
  text-align: center;
  position: relative;
}
.imgbox > img {
  width: 90 * @px;
  height: 90 * @px;
  top: 7 * @px;
  position: absolute;
  left: 50%;
  margin-left: -45 * @px;
}
.cgkqzlnumber {
  color: #ffad00;
  width: 100%;
  text-align: center;
  font-size: 24 * @px;
  font-family: Arial, Helvetica, sans-serif;
  height: 24 * @px;
  line-height: 24 * @px;
  position: absolute;
  top: 35 * @px;
}
.grade {
  font-size: 14 * @px;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 65 * @px;
  line-height: 14 * @px;
}
.infobox {
  width: 100%;
  height: 129 * @px;
  position: relative;
  margin-top: 0;
}
.infobox > li:nth-child(odd) {
  width: 100%;
  height: 18 * @px;
  line-height: 18 * @px;
  text-align: center;
  font-size: 14 * @px;
}
.infobox > li:nth-child(even) {
  width: 100%;
  height: 22 * @px;
  line-height: 22 * @px;
  text-align: center;
  font-size: 14 * @px;
}
.infobox > li > span {
  display: inline-block;
  width: 78 * @px;
  height: 17 * @px;
  line-height: 17 * @px;
  border-radius: 2 * @px;
  color: #fff;
  font-size: 14 * @px;
}
.infobox > li:nth-child(2n + 1) {
  margin-top: 2 * @px;
  text-align: center;
}
.bottom {
  height: 31 * @px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  text-align: center;
  line-height: 31 * @px;
}
.orange {
  background: #f7873d !important;
}
.yellow {
  background: #f4b748 !important;
}
.green {
  background: #56e48b !important;
}
.fontgrenn {
  color: #56e48b;
}
.boottemblue {
  background: url("../../../static/assets/img/newzyjcyzt/buleboot.png")
    no-repeat center;
}
.boottemsky {
  background: url("../../../static/assets/img/newzyjcyzt/skyboot.png") no-repeat
    center;
}
.boottemgreen {
  background: url("../../../static/assets/img/newzyjcyzt/greenboot.png")
    no-repeat center;
}
</style>
