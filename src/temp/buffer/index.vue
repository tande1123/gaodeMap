<!--
 * @Description: 缓冲区分析界面
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-10 09:36:02
 * @LastEditors: wsw
 * @LastEditTime: 2019-01-14 16:00:53
 -->
<template>
  <div class="input-card" style="width: 12rem;">
    <div class="input-item">
      <label v-for="(item, index) in tabs" :key="index"><input type="radio" name="func" @click="check(item)"><span class="input-text">{{item.name}}</span></label>
    </div>
    <div class="input-item">
      <input type="button" class="btn" value="清除" @click="clear">
    </div>
    <map-buffer @radius-changer="radiusChanger" ref="buffer"></map-buffer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mapBuffer from '@/gis/map/map-buffer'
export default {
  components: {
    mapBuffer
  },
  computed: {
    ...mapGetters(['map', 'symbol'])
  },
  methods: {
    ...mapActions(['bufferSearch', 'getTableInfo']),
    /**
     * @name: 绘制缓冲圆
     * @param : undefined
     * @return : undefined
     */
    buffer () {
      this.$refs.buffer && this.$refs.buffer.createResizeCircle(this.center, this.radius)
    },
    /**
     * @name: 当前选中资源类型
     * @param : item:Object
     * @return : undefined
     */
    check (item) {
      if (!this.currentItem) this.buffer()
      this.currentItem = item
      this.loadData(item, this.center, this.radius)
    },
    /**
     * @name: 缓冲圆半径改变事件处理
     * @param : args:Object
     * @return : undefined
     */
    radiusChanger (args) {
      this.loadData(this.currentItem, args.center, args.radius)
    },
    /**
     * @name: 加载数据
     * @param : item:Object center:Array  radius:Number
     * @return : undefined
     */
    loadData (item, center, radius) {
      let args = {
        layerIds: [item.layerId],
        point: { x: center[0], y: center[1] },
        radius: radius
      }
      this.bufferSearch(args).then((data) => {
        if (data.length > 0) {
          this.map.addPoints(data, {
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
    /**
     * @name: 图标点击事件处理
     * @param : e:Object
     * @return : undefined
     */
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
            content: `<div>${obj.ADDRESS}</div>`
          })
        }
      })
    },
    /**
     * @name: 地图清理
     * @param : undefined
     * @return : undefined
     */
    clear () {
      this.map && this.map.clear()
    }
  },
  data () {
    return {
      currentItem: null,
      center: ['114.403322', '30.920255'],
      radius: 10000,
      tabs: [
        { name: '救援队伍', data: [], category: [], level: [], layerId: 'JYDW_LIST', categoryId: '42E00', levelId: 'RES_RESCUETEAMS_PT', icon: './static/assets/img/btn-jydw.png' },
        { name: '物资储备', data: [], category: [], level: [], layerId: 'WZCB_LIST', categoryId: '49000', levelId: 'RES_MAT_STORAGE_PT', icon: './static/assets/img/btn-wzcb.png' },
        { name: '医疗机构', data: [], category: [], level: [], layerId: 'YLJG_LIST', categoryId: '46000', levelId: 'RES_HEALTH_PT', icon: './static/assets/img/btn-yljg.png' },
        { name: '防护目标', data: [], category: [], level: [], layerId: 'FHMB_LIST', categoryId: '30000', levelId: 'OBJ_DEFOBJ_PT', icon: './static/assets/img/btn-fhmb.png' },
        { name: '危险源', data: [], category: [], level: [], layerId: 'WXY_LIST', categoryId: '20000', levelId: 'OBJ_DANGER_PT', icon: './static/assets/img/btn-wxy.png' },
        { name: '避难场所', data: [], category: [], level: [], layerId: 'BNCS_LIST', categoryId: '47000', levelId: 'RES_ASYLUMAREA_PT', icon: './static/assets/img/btn-bncs.png' }
      ]
    }
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
  border-radius: 0.25rem;
  width: 22rem;
  border-width: 0;
  border-radius: 0.4rem;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
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
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: transparent;
  background-image: none;
  color: #25a5f7;
  border-color: #25a5f7;
  padding: 0.25rem 0.5rem;
  line-height: 1.5;
  border-radius: 1rem;
  -webkit-appearance: button;
  cursor: pointer;
  width: 6rem;
  margin: 0 1rem 0 4.5rem;
}
</style>
