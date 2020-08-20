/*
 * @Description: commit 操作
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-25 22:12:22
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-07-23 08:39:51
 */

// import * as Types from './mutations-types'
export default {
  // [Types.SET_CONFIG_LOADED] (state, data) {
  //   state.configLoaded = data
  // },
  // [Types.SET_MAP_LOADED] (state, data) {
  //   state.mapLoaded = data
  // },
  // [Types.SET_CONFIG] (state, data) {
  //   state.config = data
  // },
  // [Types.SET_SYMBOL] (state, data) {
  //   state.symbol = data
  // },
  // [Types.SET_LAYER_TREE] (state, data) {
  //   state.layerTree = data
  // },
  // [Types.SET_MAP] (state, data) {
  //   state.map = data
  // },
  // [Types.SET_PANEL]  (state, data) {
  //   state.panel = data
  // },
  setBaseServiceUrl (state, data) {
    state.baseServiceUrl = data
  },
  setConfigLoaded (state, data) {
    state.configLoaded = data
  },
  setMapLoaded (state, data) {
    state.mapLoaded = data
  },
  setMapConfig (state, data) {
    state.mapConfig = data
  },
  setSymbol (state, data) {
    state.symbol = data
  },
  setLayerTree (state, data) {
    state.layerTree = data
  },
  setMap (state, data) {
    state.map = data
  },
  setMapVisible (state, data) {
    state.mapVisible = data
  },
  setMap3d (state, data) {
    state.map3d = data
  },
  setPanel (state, data) {
    state.panel = data
  },
  setMapLocation (state, data) {
    state.mapLocation = data
  },
  setPopkey (state, data) {
    state.popkey.wsjc = data
  },
  setPoptqyb (state, data) {
    state.popkey.tqyb = data
  },
  setPopwsbz (state, data) {
    state.popkey.wsbz = data
  },
  setPopdbtylz (state, data) {
    state.popkey.dbtylz = data
  },
  setPopylxxlb (state, data) {
    state.popkey.ylxxlb = data
  },
  setPopxzylxx (state, data) {
    state.popkey.xzylxx = data
  },
  setZdwl (state, data) {
    state.zdwl = data
  },
  setPopBcss (state, data) {
    state.popBcss = data
  },
  setClickMarkerData (state, data) {
    state.clickMarkerData = data
  }
}
