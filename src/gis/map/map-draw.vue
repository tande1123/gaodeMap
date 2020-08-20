<!--
 * @Description: 测量工具类
 * @version: 0.1.0
 * @Author:
 * @Date: 2018-12-04 16:27:14
 * @LastEditors: wsw
 * @LastEditTime: 2018-12-30 16:43:47
 -->
<template>
  <div></div>
</template>

<script>
import AMap from 'AMap'
import { mapGetters } from 'vuex'
import { down } from 'map-export-image'
export default {
  computed: {
    ...mapGetters(['map'])
  },
  methods: {
    /**
     * @name: 绘图方法
     * @param : string
     *   'rule' 测量长度        'measureArea' 测量面积
     *   'polyline' 绘制线段    'polygon' 绘制多边形
     *   'rectangle' 绘制矩形   'circle'  绘制圆
     *   'export' 地图导出
     * @return : undefined
     */
    draw (type) {
      if (!this.mouseTool) this.mouseTool = new AMap.MouseTool(this.map.getInstance())
      switch (type) {
        case 'rule': {
          this.mouseTool.rule({
            startMarkerOptions: {// 可缺省
              icon: new AMap.Icon({
                size: new AMap.Size(19, 31), // 图标大小
                imageSize: new AMap.Size(19, 31),
                image: 'https://webapi.amap.com/theme/v1.3/markers/b/start.png'
              })
            },
            endMarkerOptions: {// 可缺省
              icon: new AMap.Icon({
                size: new AMap.Size(19, 31), // 图标大小
                imageSize: new AMap.Size(19, 31),
                image: 'https://webapi.amap.com/theme/v1.3/markers/b/end.png'
              }),
              offset: new AMap.Pixel(-9, -31)
            },
            midMarkerOptions: {// 可缺省
              icon: new AMap.Icon({
                size: new AMap.Size(19, 31), // 图标大小
                imageSize: new AMap.Size(19, 31),
                image: 'https://webapi.amap.com/theme/v1.3/markers/b/mid.png'
              }),
              offset: new AMap.Pixel(-9, -31)
            },
            lineOptions: {// 可缺省
              strokeStyle: 'solid',
              strokeColor: '#FF33FF',
              strokeOpacity: 1,
              strokeWeight: 2
            }
            // 同 RangingTool 的 自定义 设置，缺省为默认样式
          })
          break
        }
        case 'measureArea': {
          this.mouseTool.measureArea({
            strokeColor: '#80d8ff',
            fillColor: '#80d8ff',
            fillOpacity: 0.3
            // 同 Polygon 的 Option 设置
          })
          break
        }
        case 'polyline': {
          this.mouseTool.polyline({
            strokeColor: '#3366FF',
            strokeOpacity: 1,
            strokeWeight: 6,
            // 线样式还支持 'dashed'
            strokeStyle: 'solid'
            // strokeStyle是dashed时有效
            // strokeDasharray: [10, 5],
          })
          break
        }
        case 'polygon': {
          this.mouseTool.polygon({
            strokeColor: '#FF33FF',
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillColor: '#1791fc',
            fillOpacity: 0.4,
            // 线样式还支持 'dashed'
            strokeStyle: 'solid'
            // strokeStyle是dashed时有效
            // strokeDasharray: [30,10],
          })
          break
        }
        case 'rectangle': {
          this.mouseTool.rectangle({
            strokeColor: 'red',
            strokeOpacity: 0.5,
            strokeWeight: 6,
            fillColor: 'blue',
            fillOpacity: 0.5,
            // strokeStyle还支持 solid
            strokeStyle: 'solid'
            // strokeDasharray: [30,10],
          })
          break
        }
        case 'circle': {
          this.mouseTool.circle({
            strokeColor: '#FF33FF',
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillColor: '#1791fc',
            fillOpacity: 0.4,
            strokeStyle: 'solid'
            // 线样式还支持 'dashed'
            // strokeDasharray: [30,10],
          })
          break
        }
        case 'export': {
          down('map_container')
          break
        }
      }
    },
    /**
     * @name: 清除覆盖物
     * @param : undefined
     * @return : undefined
     */
    clear () {
      this.mouseTool && this.mouseTool.close(true)
    }
  },
  data () {
    return {
      mouseTool: null
    }
  },
  beforeDestroy () {
    this.clear()
  }
}
</script>
