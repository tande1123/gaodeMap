<!--
 * @Description: 缓冲分析地图工具
 * @version:
 * @Author:
 * @Date: 2018-12-05 11:19:48
 * @LastEditors: wsw
 * @LastEditTime: 2018-12-10 10:26:40
 -->
<template>
  <div></div>
</template>

<script>
import AMap from 'AMap'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['map', 'symbol'])
  },
  data () {
    return {
      markerCenter: null,
      markerClose: null,
      markerResize: null,
      bufferCircle: null,
      centerPt: null,
      radius: 0
    }
  },
  methods: {
    /**
     * @name: 绘制buffer圆
     * @param : center: Array   radius:Number
     * @return : undefined
     */
    createResizeCircle (center = ['114.403322', '30.920255'], radius = 10000) {
      this.clear()
      const centerPt = new AMap.LngLat(center[0], center[1])
      this.centerPt = centerPt
      this.radius = radius
      const bufferCircle = this.symbol.ploygonSymbols.bufferCircle
      this.bufferCircle = new AMap.Circle({
        center: centerPt, // 圆心位置
        radius: radius, // 半径
        strokeColor: bufferCircle.strokeColor, // 线颜色
        strokeOpacity: bufferCircle.strokeOpacity, // 线透明度
        strokeWeight: bufferCircle.strokeWeight, // 线粗细度
        fillColor: bufferCircle.fillColor, // 填充颜色
        fillOpacity: bufferCircle.fillOpacity // 填充透明度
      })
      const markerCenter = this.symbol.pictureMarkerSymbols.markerCenter
      this.markerCenter = new AMap.Marker({
        position: centerPt,
        icon: markerCenter.markerFile,
        offset: new AMap.Pixel(markerCenter.markerDx, markerCenter.markerDy),
        cursor: 'default'
      })
      const markerClose = this.symbol.pictureMarkerSymbols.markerClose
      this.markerClose = new AMap.Marker({
        position: this.locate(centerPt, radius, 90),
        icon: markerClose.markerFile,
        offset: new AMap.Pixel(markerClose.markerDx, markerClose.markerDy)
      })
      const markerResize = this.symbol.pictureMarkerSymbols.markerResize
      this.markerResize = new AMap.Marker({
        position: this.locate(centerPt, radius, 0),
        icon: markerResize.markerFile,
        offset: new AMap.Pixel(markerResize.markerDx, markerResize.markerDy),
        draggable: true
      })
      this.map.getInstance().add([this.bufferCircle, this.markerCenter, this.markerClose, this.markerResize])
      this.markerResize.on('dragging', this.updateBufferCircle)
      this.markerResize.on('dragend', this.notyfy)
      this.markerClose.on('click', this.clear)
    },
    /**
     * @name: 更新 buffer圆
     * @param : e: Object
     * @return : undefined
     */
    updateBufferCircle (e) {
      const newMarkerResize = new AMap.LngLat(e.lnglat.lng, this.centerPt.lat)
      this.markerResize.setPosition(newMarkerResize)
      let radius = AMap.GeometryUtil.distance(this.centerPt, newMarkerResize)
      this.bufferCircle.setRadius(radius)
      const newMarkerClose = this.locate(this.centerPt, radius, 90)
      this.markerClose.setPosition(newMarkerClose)
      this.radius = radius
    },
    /**
     * @name: 清除 buffer圆
     * @param : undefined
     * @return : undefined
     */
    clear () {
      if (this.map) {
        this.markerCenter && this.map.getInstance().remove(this.markerCenter)
        this.markerClose && this.markerClose.off('click', this.clear) && this.map.getInstance().remove(this.markerClose)
        this.markerResize && this.markerResize.off('dragging', this.updateBufferCircle) && this.markerResize.off('dragend', this.notyfy) && this.map.getInstance().remove(this.markerResize)
        this.bufferCircle && this.map.getInstance().remove(this.bufferCircle)
        this.markerCenter = null
        this.markerClose = null
        this.markerResize = null
        this.bufferCircle = null
        this.centerPt = null
        this.radius = 0
      }
    },
    /**
     * @name: 计算 markerClose、markerResize的位置
     * @param : centerpoint: Object  radius:Number degree:Number
     * @return : undefined
     */
    locate (centerpoint, radius, degree) {
      const r = 6371000.79
      const phase = 2 * Math.PI / 360
      const dx = (radius * Math.cos(degree * phase))
      const dy = (radius * Math.sin(degree * phase))
      const dlng = dx / (r * Math.cos(centerpoint.lat * Math.PI / 180) * Math.PI / 180)
      const dlat = dy / (r * Math.PI / 180)
      const newlng = centerpoint.lng + dlng
      return new AMap.LngLat(newlng, centerpoint.lat + dlat)
    },
    /**
     * @name: buffer半径改变，通知调用方
     * @param : undefined
     * @return : undefined
     */
    notyfy () {
      const {lng, lat} = this.centerPt
      const radius = this.radius
      this.$emit('radius-changer', {
        center: [lng, lat],
        radius: radius
      })
    }
  },
  beforeDestroy () {
    this.clear()
  }
}

</script>
