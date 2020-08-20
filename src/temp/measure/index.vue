<!--
/**
 * @name: 测量界面
 * @param : undefined
 * @return : undefined
 */
-->
<template>
  <div class="input-card" style="width: 12rem;">
      <div class="input-item">
        <input type="radio" name="func" value="rule" @click="check('rule')"><span class="input-text">距离测量</span>
        <input type="radio" name="func" value="measureArea"  @click="check('measureArea')"><span class="input-text">面积测量</span>
        <input type="radio" name="func" value="export"  @click="check('export')"><span class="input-text">导出</span>
      </div>
      <div class="input-item">
        <input type="button" class="btn" value="清除" @click="clear">
      </div>
      <map-draw ref="measure"></map-draw>
  </div>
</template>

<script>
import mapDraw from '@/gis/map/map-draw'
export default {
  components: {
    mapDraw
  },
  methods: {
    check (type) {
      this.$refs.measure && this.$refs.measure.draw(type)
    },
    clear () {
      this.$refs.measure && this.$refs.measure.clear()
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
