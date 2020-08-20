<!--
 * @Description: 地图添加点、线、面、圆
 * @version:
 * @Author:
 * @Date: 2018-12-05 10:33:22
 * @LastEditors: wsw
 * @LastEditTime: 2018-12-12 14:21:16
 -->

<template>
  <div></div>
</template>

<script>
import AMap from 'AMap'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['map'])
  },
  methods: {
    /**
     * @name: 添加点、线、面、圆方法
     * @param : type：string
     *   'marker' 点    'polyline' 线
     *   'polygon' 面   'circle'  圆
     * @return : undefined
     */
    add (type) {
      switch (type) {
        case 'marker': {
          var marker = new AMap.Marker({
            position: new AMap.LngLat(114.316200103, 30.5810841269),
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            offset: new AMap.Pixel(-13, -30)
          })
          this.map.getInstance().add(marker)
          marker.on('click', this.showInfoM)
          break
        }
        case 'polyline': {
          var polyline = new AMap.Polyline({
            path: [
              new AMap.LngLat(114.216200103, 30.6810841269),
              new AMap.LngLat(114.416200103, 30.5810841269)
            ]
          })
          this.map.getInstance().add(polyline)
          polyline.on('click', this.showInfoM)
          break
        }
        case 'polygon': {
          var polygon = new AMap.Polygon({
            path: [
              new AMap.LngLat(114.46, 30.93),
              new AMap.LngLat(114.44, 30.91),
              new AMap.LngLat(114.49, 30.91)
            ]
          })
          this.map.getInstance().add(polygon)
          polygon.on('click', this.showInfoM)
          break
        }
        case 'circle': {
          var circle = new AMap.Circle({
            center: new AMap.LngLat('114.403322', '30.920255'), // 圆心位置
            radius: 10000, // 半径
            strokeColor: '#F33', // 线颜色
            strokeOpacity: 1, // 线透明度
            strokeWeight: 3, // 线粗细度
            fillColor: '#ee2200', // 填充颜色
            fillOpacity: 0.35 // 填充透明度
          })
          this.map.getInstance().add(circle)
          circle.on('click', this.showInfoM)
          break
        }
      }
    },
    /**
     * @name: 弹窗
     * @param : e：object
     * @return : undefined
     */
    showInfoM (e) {
      let text = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置点了一下！'
      let infoWindow = new AMap.InfoWindow({
        content: text
      })
      infoWindow.open(this.map.getInstance(), e.lnglat)
    },
    clear () {
      this.map && this.map.getInstance().clearMap()
    }
  },
  beforeDestroy () {
    this.clear()
  }
}

</script>
