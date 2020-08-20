/*
 * @Description: Getter
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-25 22:12:22
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-07-23 08:38:40
 */

export default {
  configLoaded: state => state.configLoaded,
  mapLoaded: state => state.mapLoaded,
  mapConfig: state => state.mapConfig,
  symbol: state => state.symbol,
  layerTree: state => state.layerTree,
  map: state => state.map,
  mapVisible: state => state.mapVisible,
  map3d: state => state.map3d,
  panel: state => state.panel,
  baseServiceUrl: state => state.baseServiceUrl,
  clickMarkerData: state => state.clickMarkerData
}
