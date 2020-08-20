/*
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:58
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-10-16 09:36:18
 */
(function () {
  // 域名和端口
  var addressPort = 'https://mvs.gsafetyweixinsupport.cn:1080'
  // var addressPort = 'https://mvs.uat.gsafetyweixinsupport.cn:20001'
  // var addressPort = 'https://mvs.prod.gsafetyweixinsupport.cn'

  /**
 * 地图配置文件
 */
  var mapOptions = {
    // viewMode: '3D',
    zoom: 1,
    zooms: [1, 18],
    center: [114.316200103, 30.5810841269],
    isHotspot: false,
    showIndoorMap: false,
    features: ['bg', 'point'],
    layers: [
      new AMap.TileLayer(),
      new AMap.TileLayer.RoadNet(),
      new AMap.TileLayer.Traffic()
    ]
  }

  var layers = [
    {
      id: 'PoiClusterLayer',
      name: '聚类图层',
      visible: true,
      // 聚类距离
      gridSize: 80,
      // 自定义聚类图标
      // styles: [{
      //   url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
      //   size: new AMap.Size(32, 32),
      //   offset: new AMap.Pixel(-16, -16)
      // }, {
      //   url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
      //   size: new AMap.Size(32, 32),
      //   offset: new AMap.Pixel(-16, -16)
      // }, {
      //   url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
      //   size: new AMap.Size(36, 36),
      //   offset: new AMap.Pixel(-18, -18)
      // }, {
      //   url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
      //   size: new AMap.Size(48, 48),
      //   offset: new AMap.Pixel(-24, -24)
      // }, {
      //   url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
      //   size: new AMap.Size(48, 48),
      //   offset: new AMap.Pixel(-24, -24)
      // }],
      subLayers: [
        {
          id: 'JYDW_LIST',
          name: '救援队伍',
          visible: true,
          label: true
        },
        {
          id: 'WZCB_LIST',
          name: '物资储备',
          visible: true,
          label: true
        },
        {
          id: 'YLJG_LIST',
          name: '医疗机构',
          visible: true,
          label: true
        },
        {
          id: 'FHMB_LIST',
          name: '防护目标',
          visible: true,
          label: true
        },
        {
          id: 'WXY_LIST',
          name: '危险源',
          visible: true,
          label: true
        },
        {
          id: 'BNCS_LIST',
          name: '避难场所',
          visible: true,
          label: true
        },
        {
          id: 'BUS',
          name: '班车',
          visible: true,
          label: true
        }
      ]
    }
  ]

  var services = {
    baseServiceUrl: addressPort + '/gisdev/jyh/wcf',
    // baseServiceUrl: 'http://localhost/wcf',
    // baseServiceUrl: 'http://106.37.227.19:8080/gis/jyh/wcf',
    wsbzServiceUrl: addressPort + '/gis/jyh/xm-wcf',
    mapSearchUrl: 'http://map.tianditu.gov.cn/data/query.shtml?postStr={"keyWord":"{0}","level":"12","mapBound":"110.58838, 29.25286, 118.09204, 31.98012","queryType":"1","count":"5","start":"0"}&type=query',
    hkVideo: addressPort + '/gis/jyh/hk/hk_video.mp4' // 海康视频示例,接入后删除掉
  }
  var misConfig = {
    //  返回页面跳转地址
    Return_fhsyUrl: addressPort + '/cas/login',
    // 拨打电话、挂断电话的接口
    phoneCall: addressPort + '/army-site/restful/scheduling',
    // 视频解码
    decodingVedio: addressPort + '/video/play/url?'
  }
  var regions = [
    { code: '420102', name: '江岸区', x: 114.2954, y: 30.5897, zoom: 13 },
    { code: '420103', name: '江汉区', x: 114.266, y: 30.604, zoom: 13 },
    { code: '420104', name: '硚口区', x: 114.210, y: 30.584, zoom: 13 },
    { code: '420105', name: '汉阳区', x: 114.214, y: 30.556, zoom: 12 },
    { code: '420106', name: '武昌区', x: 114.2926, y: 30.5508, zoom: 12 },
    { code: '420107', name: '青山区', x: 114.3889, y: 30.6402, zoom: 12 },
    { code: '420111', name: '洪山区', x: 114.3565, y: 30.5214, zoom: 12 },
    { code: '420112', name: '东西湖区', x: 114.1468, y: 30.6283, zoom: 12 },
    { code: '420113', name: '汉南区', x: 114.0776, y: 30.3123, zoom: 12 },
    { code: '420114', name: '蔡甸区', x: 114.0249, y: 30.5856, zoom: 12 },
    { code: '420115', name: '江夏区', x: 114.3083, y: 30.3532, zoom: 12 },
    { code: '420116', name: '黄陂区', x: 114.3719, y: 30.8717, zoom: 12 },
    { code: '420117', name: '新洲区', x: 114.7943, y: 30.8503, zoom: 12 }
  ]
  var buildingConfig = [
    './static/assets/data/buildingConfig.json'
  ]
  return {
    mapOptions: mapOptions,
    services: services,
    layers: layers,
    regions: regions,
    misConfig: misConfig,
    buildingConfig: buildingConfig
  }
})()
