<!--
 * @Description: 地图底图切换界面
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-11 15:54:16
 * @LastEditors: wsw
 * @LastEditTime: 2019-01-14 16:02:22
 -->
<template>
  <div class="input-card" style="width: 12rem;">
      <div class="input-item">
        <input type="checkbox" checked name="func" value="TileLayer" @click="check($event,'TileLayer')"><span class="input-text">标准图层</span>
        <input type="checkbox" name="func" value="TileLayer.Satellite"  @click="check($event,'TileLayer.Satellite')"><span class="input-text">卫星图层</span>
        <input type="checkbox" checked name="func" value="TileLayer.RoadNet"  @click="check($event,'TileLayer.RoadNet')"><span class="input-text">路网图层</span>
        <input type="checkbox" name="func" value="TileLayer.Traffic"  @click="check($event,'TileLayer.Traffic')"><span class="input-text">实时交通图层</span>
      </div>
      <map-switch ref="switch"></map-switch>
  </div>
</template>

<script>
import mapSwitch from '@/gis/map/map-switch'
export default {
  components: {
    mapSwitch
  },
  methods: {
    check (evt, type) {
      this.$refs.switch && this.$refs.switch.change(type, evt.target.checked)
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
