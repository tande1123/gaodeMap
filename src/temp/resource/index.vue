<!--
 * @Description: 危险源、防护目标等资源加载
 * @version:
 * @Author:
 * @Date: 2018-12-06 16:09:14
 * @LastEditors: wsw
 * @LastEditTime: 2018-12-25 19:59:05
 -->
<template>
  <div class="input-card" style="width: 12rem;">
      <div class="input-item">
        <label v-for="(item, index) in tabs" :key="index"><input type="radio" name="func"   @click="check(item)"><span class="input-text">{{item.name}}</span></label>
      </div>
      <div class="input-item">
        <input type="button" class="btn" value="清除" @click="clear">
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['map', 'symbol', 'mapConfig'])
  },
  methods: {
    ...mapActions(['getTableInfo', 'getTemplate']),
    check (item) {
      this.loadData(item)
    },
    loadData (item) {
      this.getTableInfo({ tag: item.layerId }).then((data) => {
        if (data.length > 0) {
          let lyrConf = this.map.getSubLayersConfigById(item.layerId)[0]
          // this.map.addPoints
          this.map.addCluster(data, lyrConf && lyrConf.label ? {
            x: 'X',
            y: 'Y',
            symbol: (item) => {
              if (!this.symbol.pictureMarkerSymbols[item.TYPECODE]) {
                console.log(item.TYPECODE || item)
              }
              return this.symbol.pictureMarkerSymbols[item.TYPECODE]
            },
            label: (item) => {
              let sys = this.symbol.pictureMarkerSymbols[item.TYPECODE] || {}
              return {
                dx: -item.NAME.length * 5,
                dy: -(sys.markerDy || 0) * 2,
                content: item.NAME
              }
            },
            click: (e) => {
              this.processClick(e)
            }
          } : {
            x: 'X',
            y: 'Y',
            symbol: (item) => {
              if (!this.symbol.pictureMarkerSymbols[item.TYPECODE]) {
                console.log(item.TYPECODE)
              }
              return this.symbol.pictureMarkerSymbols[item.TYPECODE]
            },
            click: (e) => {
              this.processClick(e)
            }
          })
        }
      })
    },
    processClick (e) {
      const item = e.target.getExtData() || {}
      const offset = e.target.getOffset() || {}
      this.getTableInfo({ tag: `${item.layerId}_P`, param: [`${item.ID}`] }).then(objs => {
        if (objs && objs.length > 0) {
          let obj = objs[0]
          this.map.showInfoWindow({
            x: obj.X,
            y: obj.Y,
            dx: -offset.x,
            dy: offset.y * 2,
            title: obj.NAME,
            data: obj,
            content: this.resultTemplate
          })
        }
      })
    },
    clear () {
      this.map && this.map.clear()
    }
  },
  data () {
    return {
      resultTemplate: null,
      tabs: [
        { name: '救援队伍', data: [], category: [], level: [], layerId: 'JYDW_LIST', categoryId: '42E00', levelId: 'RES_RESCUETEAMS_PT', icon: './static/assets/img/btn-jydw.png' },
        { name: '物资储备', data: [], category: [], level: [], layerId: 'WZCB_LIST', categoryId: '49000', levelId: 'RES_MAT_STORAGE_PT', icon: './static/assets/img/btn-wzcb.png' },
        { name: '医疗机构', data: [], category: [], level: [], layerId: 'YLJG_LIST', categoryId: '46000', levelId: 'RES_HEALTH_PT', icon: './static/assets/img/btn-yljg.png' },
        { name: '防护目标', data: [], category: [], level: [], layerId: 'FHMB_LIST', categoryId: '30000', levelId: 'OBJ_DEFOBJ_PT', icon: './static/assets/img/btn-fhmb.png' },
        { name: '危险源', data: [], category: [], level: [], layerId: 'WXY_LIST', categoryId: '20000', levelId: 'OBJ_DANGER_PT', icon: './static/assets/img/btn-wxy.png' },
        { name: '避难场所', data: [], category: [], level: [], layerId: 'BNCS_LIST', categoryId: '47000', levelId: 'RES_ASYLUMAREA_PT', icon: './static/assets/img/btn-bncs.png' }
      ]
    }
  },
  mounted () {
    this.getTemplate('resource').then((res) => {
      this.resultTemplate = res
    })
  }
}
</script>
<style scoped>
.input-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: .25rem;
    width: 22rem;
    border-width: 0;
    border-radius: 0.4rem;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 0.75rem 1.25rem;
}
.input-item {
  text-align: center;
}
.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    background-color: transparent;
    background-image: none;
    color: #25A5F7;
    border-color: #25A5F7;
    padding: .25rem .5rem;
    line-height: 1.5;
    border-radius: 1rem;
    -webkit-appearance: button;
    cursor: pointer;
    width: 6rem;
    margin: 0 1rem 0 4.5rem;
}
</style>
