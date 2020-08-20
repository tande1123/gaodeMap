/*
 * @Description: store变量
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-25 22:12:22
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-12 10:03:39
 */

export default {
  configLoaded: false,
  mapLoaded: false,
  mapConfig: null,
  symbol: null,
  layerTree: null,
  map: null,
  mapVisible: true,
  map3d: null,
  panel: null,
  baseServiceUrl: '', // 根服务wcf地址
  mapLocation: false, // 修改地图位置
  popkey: { // 医疗保障各弹框显示的关键字
    wsjc: false,
    tqyb: false,
    wsbz: false,
    dbtylz: false,
    ylxxlb: false,
    xzylxx: false
  },
  zdwl: false,
  popBcss: false,
  clickMarkerData: null
}
