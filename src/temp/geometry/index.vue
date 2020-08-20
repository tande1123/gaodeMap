<!--
 * @Description: 地图添加点、线、面界面
 * @version:
 * @Author:
 * @Date: 2018-12-05 09:49:19
 * @LastEditors: wsw
 * @LastEditTime: 2019-03-12 14:08:29
 -->
<template>
  <div class="input-card" style="width: 12rem;">
    <div class="input-item">
      <input type="radio" name="func" value="marker" @click="check('marker')">
      <span class="input-text">添加点</span>
      <input type="radio" name="func" value="polyline" @click="check('polyline')">
      <span class="input-text">添加线</span>
      <input type="radio" name="func" value="polygon" @click="check('polygon')">
      <span class="input-text">添加面</span>
      <input type="radio" name="func" value="circle" @click="check('circle')">
      <span class="input-text">添加圆</span>
    </div>
    <div class="input-item">
      <input type="button" class="btn" value="清除" @click="clear">
    </div>
    <div class="input-item">
      <button class="btn" @click="addModel">添加模型</button>
    </div>
    <map-geometry ref="measure"></map-geometry>
  </div>
</template>

<script>
import mapGeometry from '@/gis/map/map-geometry'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['map'])
  },
  components: {
    mapGeometry
  },
  methods: {
    check (type) {
      this.$refs.measure && this.$refs.measure.add(type)
    },
    clear () {
      this.$refs.measure && this.$refs.measure.clear()
    },
    addModel () {
      this.map.add3DModel({
        x: 114.316200103,
        y: 30.5810841269,
        scale: [6, 6, 6],
        rotateZ: -48,
        bmp: 'http://a.amap.com/jsapi_demos/static/demo-center/model/1519/1519.bmp',
        mtl: 'http://a.amap.com/jsapi_demos/static/demo-center/model/1519/1519.mtl',
        obj: 'http://a.amap.com/jsapi_demos/static/demo-center/model/1519/1519.obj'
      })
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
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
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
