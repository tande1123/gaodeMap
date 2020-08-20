<!--
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:16:20
 -->

<!--底部菜单-->
<template>
  <div class="box">
    <ul class="navbox">
      <li>
        <div class="imgbox" @click="clickbtn(1)">
          <div :class="active==1?'imgbgactive':'imgbg'">
          </div>
          <img src="../../../static/img/site/bc.png" alt="">
        </div>
        <p :class="active==1?'activep':''">班车</p>
      </li>
      <li>
        <div class="imgbox" @click="clickbtn(2)">
          <div :class="active==2?'imgbgactive':'imgbg'">
          </div>
          <img src="../../../static/img/site/gjc.png" alt="">
        </div>
        <p :class="active==2?'activep':''">公交车</p>
      </li>
      <li>
        <div class="imgbox" @click="clickbtn(3)">
          <div :class="active==3?'imgbgactive':'imgbg'">
          </div>
          <img src="../../../static/img/site/ditie.png" alt="">
        </div>
        <p :class="active==3?'activep':''">地铁</p>
      </li>
      <!-- <li>
        <div class="imgbox" @click="clickbtn(4)">
          <div :class="active==4?'imgbgactive':'imgbg'">
          </div>
          <img src="../../../static/img/site/czc.png">
        </div>
        <p :class="active==4?'activep':''">出租车</p>
      </li> -->
    </ul>
  </div>
</template>
<script>
import common from '../../utils/common.es'
import { mapGetters } from 'vuex'
let self
export default {
  data () {
    return {
      active: 1,
      banche: [],
      ditie: [{ x: 114.295424, y: 30.433168, name: '黄家湖地铁小镇站', typecode: 'ditie' }, { x: 114.29478, y: 30.422104, name: '军运村站', typecode: 'ditie' }]
    }
  },
  computed: {
    ...mapGetters(['mapLoaded', 'map', 'symbol', 'mapConfig', 'panel'])
  },
  methods: {
    clickbtn (btn) {
      this.active = btn
      switch (btn) {
        case 1:
          this.map.clearClusterLayer()
          this.map.clear()
          this.map.addCluster(self.banche, {
            x: 'LONGTITUDE',
            y: 'LATITUDE',
            symbol: (item) => {
              if (!this.symbol.pictureMarkerSymbols['bcssfree']) {
                console.log(item.TYPECODE || item)
              }
              return this.symbol.pictureMarkerSymbols['bcssfree']
            }
          })
          this.$emit('showLeftPane', 'banche')
          break
        case 2:
          this.$store.dispatch('loadgongjiaoStation').then(e => {
            self.addBusPointToMap(e)
          })
          this.$emit('showLeftPane', 'gongjiao')
          break
        case 3:
          this.addBusPointToMap(self.ditie)
          this.$emit('showLeftPane', 'ditie')
          break
      }
    },
    addBusPointToMap (data) {
      this.map.clear()
      this.map.clearClusterLayer()
      this.map.addPoints(data, {
        x: 'x',
        y: 'y',
        symbol: (item) => {
          return this.symbol.pictureMarkerSymbols[item.typecode]
        }
      })
    },
    // 场馆介绍班车
    loadData () {
      let parameters = {
        parameterList:
          [
            {
              DoAction: 'querygisvbusmanagerinfo',
              Conditions: [
                [
                  {
                    Column: 'SCHEDULE_DATE',
                    ColumnDataType: 'string',
                    Mode: 'GTE', // 大于或等于
                    Value: '20191018'
                  }
                ]
              ]
            }
          ]
      }
      this.axios.post(this.$store.state.baseServiceUrl + '/DataService/QueryMoreSafety', parameters).then(res => {
        console.log(res)
        let result = common.convertTable2objects(res.data.QueryMoreSafetyResult[0])
        this.banche = result
      })
    }
  },
  watch: {
    mapLoaded () {
      this.mapLoaded && this.loadData()
    }
  },
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    self = this
    this.$nextTick(() => {
      self.mapLoaded && self.loadData()
    })
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
.box {
  height: 67 * @px;
  width: 600 * @px;
  background: url("../../../static/img/site/tollbarbg.png") center;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.navbox {
  width: 594 * @px;
  height: 120 * @px;
  position: absolute;
  left: 50%;
  margin-left: -297 * @px;
  top: -70 * @px;
}
.navbox > li {
  width: 25%;
  height: 120 * @px;
  float: left;
  position: relative;
}
.navbox > li:nth-child(1) {
  margin-left: 80px;
}
.navbox > li > p {
  text-align: center;
  height: 26 * @px;
  width: 100%;
  font-size: 18 * @px;
  line-height: 26 * @px;
  color: #fff;
  position: absolute;
  bottom: 0;
}
.imgbox {
  width: 100%;
  height: 97 * @px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
}

.imgbg {
  width: 90 * @px;
  height: 90 * @px;
  background: url("../../../static/img/site/yuan.png") no-repeat center center;
  position: absolute;
  top: 50%;
  margin-top: -45 * @px;
  left: 50%;
  margin-left: -45 * @px;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  cursor: pointer;
}
.navbox > li:hover .imgbg {
  width: 97 * @px;
  height: 97 * @px;
  background: url("../../../static/img/site/active.png") no-repeat center center;
  position: absolute;
  top: 50%;
  margin-top: -48.5 * @px;
  left: 50%;
  margin-left: -48.5 * @px;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  cursor: pointer;
}
.navbox > li:hover > p {
  color: #ffc358 !important;
}
.activep {
  color: #ffc358 !important;
}
.imgbgactive {
  width: 97 * @px;
  height: 97 * @px;
  background: url("../../../static/img/site/active.png") no-repeat center center;
  position: absolute;
  top: 50%;
  margin-top: -48.5 * @px;
  left: 50%;
  margin-left: -48.5 * @px;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -ms-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  cursor: pointer;
}
.imgbox > img {
  vertical-align: middle;
  width: 80%;
}
.imgbox > img {
  height: 30 * @px;
  width: 30 * @px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20 * @px;
  margin-left: -18 * @px;
}
</style>
