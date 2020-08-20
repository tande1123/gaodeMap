(function () {
  /**
   * 地图（百度）配置文件
   */
  var zoomToImg = 20
  var mapOptions = {
    zoom: 9,
    minZoom: 3,
    maxZoom: 18,
    center: [114.316200103, 30.5810841269],
    attribution: false,
    spatialReference: {
      projection: 'baidu'
    },
    zoomControl: {
      position: {
        bottom: 70,
        left: 10
      },
      slider: false,
      zoomLevel: false
    },
    scaleControl: {
      position: {
        bottom: 40,
        left: 10
      },
      maxWidth: 50,
      metric: true,
      imperial: false
    }
  }
  var baseLayers = [
    {
      id: 'vec_c',
      layerType: 'TileLayer',
      urlTemplate:
        'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=dark',
      subdomains: [0, 1, 2],
      visible: true,
      crossOrigin: 'anonymous'
    }
  ]

  var boundary = [
    './static/assets/data/bd/S_FeaturesToJSON2.json',
    './static/assets/data/bd/X_FeaturesToJSON2.json'
  ]

  var lakeshp = ['./static/assets/data/bd/lake.json']

  // ----------------------通用部分----------------------------
  var layers = [
    {
      id: 'boundary_layer',
      layerType: 'VectorLayer'
    },
    {
      id: 'lake_layer_shp',
      layerType: 'VectorLayer'
    },
    {
      id: 'label_area',
      layerType: 'VectorLayer'
    },
    {
      id: 'plot_layer',
      layerType: 'VectorLayer'
    },
    {
      id: 'buffer_layer',
      layerType: 'VectorLayer'
    },
    {
      id: 'event_warn',
      layerType: 'AnimateMarkerLayer',
      animation: 'scale,fade',
      globalCompositeOperation: 'lighter',
      animationDuration: 3000,
      randomAnimation: true,
      geometryEvents: false
    },
    {
      id: 'heat_layer',
      layerType: 'HeatLayer',
      radius: 80,
      blur: 30,
      gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
    },
    {
      id: 'cluster_layer',
      layerType: 'VectorLayer'
    },
    {
      id: 'cluster_layer_no_use',
      layerType: 'ClusterLayer',
      noClusterWithOneMarker: true,
      maxClusterZoom: 16,
      symbol: {
        markerType: 'ellipse',
        markerFill: {
          property: 'count',
          type: 'interval',
          stops: [
            [0, 'rgb(135, 196, 240)'],
            [9, '#1bbc9b'],
            [99, 'rgb(216, 115, 149)']
          ]
        },
        markerFillOpacity: 0.7,
        markerLineOpacity: 1,
        markerLineWidth: 3,
        markerLineColor: '#fff',
        markerWidth: {
          property: 'count',
          type: 'interval',
          stops: [[0, 40], [9, 50], [99, 60]]
        },
        markerHeight: {
          property: 'count',
          type: 'interval',
          stops: [[0, 40], [9, 50], [99, 60]]
        }
      },
      drawClusterText: true,
      geometryEvents: true,
      single: true
    }
  ]
  var services = {
    baseServiceUrl: 'http://42.51.32.53/WHWCF',
    // baseServiceUrl: '/gis/WHWCF',
    mapSearchUrl:
      'http://map.tianditu.gov.cn/data/query.shtml?postStr={"keyWord":"{0}","level":"12","mapBound":"110.58838, 29.25286, 118.09204, 31.98012","queryType":"1","count":"5","start":"0"}&type=query'
  }
  var misConfig = {
    env: 'development', // 开发环境
    // env: 'production',//生产环境
    baseServiceUrl: '/geminirest',
    tokenApi: '/basedata/user/login',
    tokenApiArgs: {
      username: 'shangji',
      password: '123456'
    },
    // 事件列表
    eventApi: '/api/m/eventInfo/gis/search/all?page=0&size=50',
    eventApiArgs: {
      infoTypes: [],
      keyWord: '',
      hours: 24
    },
    // 按开始结束时间查询事件列表
    eventInfoList: '/wuhan-site/eventInfo/list/search/all?page=0&size=9999',
    eventInfoListArgs: {
      reportDateStrStart: '2018-00-00',
      reportDateStrEnd: '2019-00-00'
    },
    // 事件续报
    eventContinueApi: '/api/m/eventInfo/showContinueEvent',
    // 拟办意见、审核意见、转办督办
    disposesApi: '/api/m/eventInfo',
    // 一键调度
    oneKeyScheduling: '/wuhan-site/event/headquarter/listpage/search?eventId=',
    oneKeySchedulingByResponseLevel:
      '/wuhan-site/event/headquarter/gis/manager/essential?eventId=',
    // 捷思锐账号
    getJsrAccountInfo: '/wuhan-site/basedata/getJsrAccountInfo',
    // 根据预案获取指挥部信息
    planInfoByEventType:
      '/wuhan-site/eppManage/eppManage/findByEventType?eventType=',
    headquartersInfoByPlan:
      '/wuhan-site/event/headquarter/gis/manage/getGroups?planId=',
    // 内嵌手机详情展示页面
    // instructInfoGis: 'http://yjpt.wuhan.gov.cn:9000/geminihtml/index.html#/deal/instructInfoViewPc/2/'
    instructInfoGis:
      'https://whyj.gsafetyweixinsupport.cn/geminihtml/index.html#/deal/instructInfoViewPc/2/'
  }
  var statisticsEvent = [
    { name: '自然灾害', eventTypeCode: ['11000', '11A00', '11B00', '11Y00'] },
    { name: '事故灾难', eventTypeCode: ['12000', '12G00', '12H00'] },
    { name: '公共卫生', eventTypeCode: ['13000', '13Y00'] },
    { name: '社会安全', eventTypeCode: ['14000'] }
  ]
  var regions = [
    { code: '420102', name: '江岸区', x: 114.2954, y: 30.5897, zoom: 13 },
    { code: '420103', name: '江汉区', x: 114.266, y: 30.604, zoom: 13 },
    { code: '420104', name: '硚口区', x: 114.21, y: 30.584, zoom: 13 },
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
  // 地图右键菜单
  var mapRightClickMenu = [
    {
      title: '周边查询'
    }
  ]
  return {
    mapOptions: mapOptions,
    baseLayers: baseLayers,
    boundary: boundary,
    lakeshp: lakeshp,
    zoomToImg: zoomToImg,
    layers: layers,
    services: services,
    misConfig: misConfig,
    regions: regions,
    statisticsEvent: statisticsEvent,
    mapRightClickMenu: mapRightClickMenu
  }
})()
