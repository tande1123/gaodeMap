<!--
 * @Description:地图底图切换组件
 * @version:
 * @Author:
 * @Date: 2018-12-06 09:19:12
 * @LastEditors: wsw
 * @LastEditTime: 2018-12-12 09:37:20
 -->
<template>
  <div></div>
</template>

<script>
// import AMap from 'AMap'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['map', 'symbol'])
  },
  methods: {
    /**
     * @name: 底图切换
     * @param : type:string flag:boolean
     *    标准图层 TileLayer
          卫星图层 TileLayer.Satellite
          路网图层 TileLayer.RoadNet
          实时交通图层 TileLayer.Traffic
     * @return : undefined
     */
    change (type, flag) {
      if (!flag) {
        const layers = this.map.getInstance().getLayers()
        layers.forEach(element => {
          if (element.CLASS_NAME && element.CLASS_NAME === 'AMap.' + type) { element.setMap(null) }
        })
        return
      }
      let lyr = null
      switch (type) {
        case 'TileLayer':
          lyr = new AMap.TileLayer()
          break
        case 'TileLayer.Satellite':
          lyr = new AMap.TileLayer.Satellite()
          break
        case 'TileLayer.RoadNet':
          lyr = new AMap.TileLayer.RoadNet()
          break
        case 'TileLayer.Traffic':
          lyr = new AMap.TileLayer.Traffic()
          break
      }
      lyr && lyr.setMap(this.map.getInstance())
    }
  }
}
</script>
