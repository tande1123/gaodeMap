/*
 * @Description: ajax请求
 * @version: 0.1.0
 * @Author: wsw
 * @Date: 2018-12-25 22:12:22
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-07-23 14:34:14
 */

// import * as Types from './mutations-types'
import request from './request'
import common from '../utils/common.es'

export default {
  // setConfigLoaded ({ commit }, data) {
  //   commit(Types.SET_CONFIG_LOADED, data)
  // },
  // setMapLoaded ({ commit }, data) {
  //   commit(Types.SET_MAP_LOADED, data)
  // },
  // setConfig ({ commit }, data) {
  //   commit(Types.SET_CONFIG, data)
  // },
  // setSymbol ({ commit }, data) {
  //   commit(Types.SET_SYMBOL, data)
  // },
  // setLayerTree ({ commit }, data) {
  //   commit(Types.SET_LAYER_TREE, data)
  // },
  // setMap ({ commit }, data) {
  //   commit(Types.SET_MAP, data)
  // },
  // setPanel ({ commit }, data) {
  //   commit(Types.SET_PANEL, data)
  // },
  async loadConfig () {
    let urls = [
      './static/config/map.config.js',
      './static/config/symbol.config.js',
      './static/config/layer.tree.config.js'
    ]
    let res = await request.requestAll(urls)
    let arr = []
    res.forEach(element => {
      arr.push(element.data)
    })
    return arr
  },
  // 获取线路数据
  async loadBusLineConfig ({ commit, state }) {
    let res = await request.request('./static/assets/data/BusLine.json')
    return res
  },
  // 获取显示模板
  async getTemplate ({ commit, state }, templateName) {
    let url = `./static/popwindow/${templateName}.html`
    let data = await request.request(url)
    return data
  },
  // 模型参数请求
  async getTestMVC ({ commit, state }, strParams) {
    let url = '/model/gsafety/modelservice/chemicalLeak.mvc'
    strParams = strParams || '{"101180":"28","101201":"0","101220":"B","103001":"4","103003":"0","103004":"1.5","103007":"0","103008":"[4326,120.0146484375,31.9482421875,1.5]","103041":"chlorine","103042":"Instant","103043":"5000","103044":"25.0","103045":"[4326,121.9482421875,33.6181640625,1.0]","103050":"","103051":"0","110001":"GModel_Leak_Chemical","110010":false,"110021":"","110022":"36000","110023":"20000","110024":"1.5","110026":"4","110027":true,"110028":false,"110031":10,"110032":false,"110051":[4326,101.31,30.212,1.5,101.33,30.232,1],"110321":"6","110322":"60"}'
    let data2 = `strUserName=&strValidID=&strClassName=&strParams=${strParams}`
    let res = await request.request(url, { data: data2, method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    console.log('res', res)
    return res
  },
  // 缓冲区分析
  async bufferSearch ({ commit, state }, args) {
    /**
     * 'WXY_LIST'-->危险源
     * 'FHMB_LIST'-->防护目标
     * 'BNCS_LIST'-->避难场所
     * 'JYDW_LIST'-->救援队伍
     * 'YLJG_LIST'-->医疗机构
     * 'WZCB_LIST'-->物资储备
     * @param {layerIds: ['YLJG_LIST'],point: { x: 114.20562744140626, y: 30.575637817382816 },radius: 5000,unit: 'degree'}
     */
    let url = state.mapConfig.services.baseServiceUrl + '/FeatureService.svc/rest/SearchFeaturesByLayerId'
    args.distance = common.meter2degree(args.radius)
    if (!(args.layerIds instanceof Array)) {
      args.layerIds = [args.layerIds]
    }
    let data = {
      layerIds: args.layerIds,
      x: args.point.x,
      y: args.point.y,
      distance: args.distance,
      unit: args.unit || 'degree',
      allField: null
    }
    let res = await request.request(url, { data: data, method: 'post' })
    let result = common.convertTableArr2objects(res.SearchFeaturesByLayerIdResult)
    return result || []
  },
  async spatialSearch ({ commit, state }, args) {
    /*
      args ={
        coordinates:"114.20150756835939 30.89784622192383,114.07379150390625 30.76601028442383,114.12872314453125 30.586109161376957,114.34158325195312 30.544910430908207,114.4720458984375 30.759143829345707,114.3951416015625 30.816822052001957,114.20150756835939 30.89784622192383"
        districtcodes:[]
        keywords:""
        layers:["31B05"]
        radius:0.008993220292999999
        type:"PolygonBuffer"
      }
    */
    let url = state.mapConfig.services.baseServiceUrl + '/FeatureService.svc/rest/SpatialBufferAnalysis'
    let res = await request.request(url, { data: args, method: 'post' })
    let spatialBufferAnalysisResult = res.SpatialBufferAnalysisResult
    let result = common.convertTable2objects(spatialBufferAnalysisResult)
    let polygonBuffer = null
    if (spatialBufferAnalysisResult) {
      polygonBuffer = spatialBufferAnalysisResult.Name
    }
    return {
      data: result || [],
      bufferPolygon: polygonBuffer
    }
  },
  async getTableInfo ({ commit, state }, { tag, param }) {
    /**
     * @tag String (not null)
     * @param Array or null
     */
    let url = `${state.mapConfig.services.baseServiceUrl}/DataService.svc/rest/json/GetTableInfo?layerId=${tag}`
    if (param && param instanceof Array) {
      url = `${state.mapConfig.services.baseServiceUrl}/DataService.svc/rest/json/GetTableInfo?layerId=${tag}&param=${encodeURI(param.join(','))}`
    }
    let data = await request.request(url)
    let res = common.convertTable2objects(data)
    return res || []
  },
  async searchSinglePoi ({ commit, state }, { layerId, fieldName, fieldValue }) {
    /**
     * @tag String (not null)
     * @param Array or null
     */
    let url = `${state.mapConfig.services.baseServiceUrl}/DataService.svc/rest/json/SearchSinglePoi?layerId=${layerId}&fieldName=${fieldName}&fieldValue=${encodeURI(fieldValue)}`

    let data = await request.request(url)
    let res = common.convertTable2objects(data)
    return res || []
  },
  async getLastWXYTimage ({ commit, state }, count = 6) {
    /**
     * 卫星云图
     */
    let url = `${state.mapConfig.services.baseServiceUrl}/DataService.svc/rest/json/GetLastWXYTimage?count=${count}`
    let data = await request.request(url)
    return data || []
  },
  async getLastRadarCreftImage ({ commit, state }, count = 6) {
    /**
     * 雷达图
     */
    let url = `${state.mapConfig.services.baseServiceUrl}/DataService.svc/rest/json/GetLastRadarCreftImage?count=${count}`
    let data = await request.request(url)
    return data || []
  },
  async getResourceCategory ({ commit, state }, parentId) {
    /**
     * 通过parentId获取子分类tycode
     */
    let url = `${state.mapConfig.services.baseServiceUrl}/DataService.svc/rest/json/GetResourceTypeNotEmpty?parentId=${parentId}`
    let data = await request.request(url)
    return data || []
  },
  // @deprecated 请使用新方法 getTableInfo
  async getTableBySql ({ commit, state }, { tag, param }) {
    let paramArr = []
    switch (tag) {
      case 'EVENT_PLAN': // 事件预案
        paramArr.push(param.eventType)
        break
      case 'RES_EXPERT': // 应急专家
        paramArr.push(param.eventType)
        break
      case 'INFO_KNOWLEDGE': // 应急知识
        paramArr.push(param.eventType)
        break
      case 'INFO_CASE': // 相关案例
        paramArr.push(param.eventType)
        break
      case 'INFO_LAW': // 法律法规
        paramArr.push(param.eventType)
        break
      case 'EVENT_INFO': // 事件基本信息
        break
      case 'EVENT_DISPOSE': // 事件处理
        paramArr.push(param.id)
        break
      case 'WEATHER_INFO': // 气象站
        break
      case 'WEATHER_INFO_HISTORY': // 单个气象站历史数据
        paramArr.push(param.stcd)
        break
      case 'WEATHER_FORECAST_7': // 7天天气预报
        break
      case 'WEATHER_FORECAST_NOW': // 当日天气，主城区监测站数据
        break
      case 'SHOW_MATERIAL': // 物资详情
        paramArr.push(param.id)
        break
      case 'AQI_STATION': // 空气监测站点
        break
      case 'AQI_PM25CITYSUMMARY': // 城市空气质量(无坐标)
        break
      case 'MP_COMPANY': // 重大污染源企业(未关联污染物)
        break
      case 'MP_COMPANY_POLLUTION': // 重大污染源企业(关联污染物)
        break
      case 'CAR_PLATENUM_PIC': // 两客一危车载图片
        paramArr.push(param.platenum)
        break
      case 'CAR_ID_HISTORY': // 两客一危车辆轨迹
        paramArr.push(param.id)
        break
      case 'CAR_PLATENUM_SEARCH': // 两客一危车牌模糊搜索
        paramArr.push(`%${param.platenum}%`)
        break
      case 'RESCUETEAMS_SEARCH': // 救援队伍模糊搜索
        paramArr.push(`%${param.name}%`)
        break
      case 'STORAGE_SEARCH': // 应急物资模糊搜索
        paramArr.push(`%${param.name}%`)
        break
      case 'HEALTH_SEARCH': // 医疗机构模糊搜索
        paramArr.push(`%${param.name}%`)
        break
      case 'DEFOBJ_SEARCH': // 防护目标模糊搜索
        paramArr.push(`%${param.name}%`)
        break
      case 'BNCS_SEARCH': // 避难场所模糊搜索
        paramArr.push(`%${param.name}%`)
        break
      case 'WFP_SEARCH': // 产废企业模糊搜索
        paramArr.push(`%${param.name}%`)
        break
    }
    let url = `${state.mapConfig.services.baseServiceUrl}/DataService.svc/rest/json/GetTableInfo?layerId=${tag}`
    if (paramArr && paramArr instanceof Array && paramArr.length > 0) {
      url = `${state.mapConfig.services.baseServiceUrl}/DataService.svc/rest/json/GetTableInfo?layerId=${tag}&param=${encodeURI(paramArr.join(','))}`
    }
    let data = await request.request(url)
    let res = common.convertTable2objects(data)
    return res || []
  },
  // 读取军运村模型配置文件
  async fetchBuildingJson ({ commit, state }) {
    let urls = state.mapConfig.buildingConfig
    let data = await request.requestAll(urls)
    let arr = []
    data.forEach(element => {
      arr.push(element.data)
    })
    return arr
  },

  /**
   *  卫生保障专题
   */

  // 获取救护车数据
  async getAllAmbulance ({ state }) {
    let url = `${state.mapConfig.services.wsbzServiceUrl}/DataService.svc/rest/json/GetAllAmbulance`
    let data = await request.request(url)
    return data['GetAllAmbulanceResult'] || []
  },
  // 获取救护车 GPS 数据
  async getAllAmbulanceGPS ({ state }) {
    let url = `${state.mapConfig.services.wsbzServiceUrl}/DataService.svc/rest/json/GetAllAmbulanceGPS?hour=-1`
    let data = await request.request(url)
    return data['GetAllAmbulanceGPSResult'] || []
  },
  // 值班信息
  async getDutyDate ({ state }) {
    let url = `${state.mapConfig.services.wsbzServiceUrl}/DataService.svc/rest/json/GetDutyList`
    let data = await request.request(url)
    return data['GetDutyListResult'] || []
  },
  // 初始化数据（医疗中心G01、合同医院G02、代表团医疗站G03、航空救治G04、病媒防治场所G05、体能恢复中心G06）
  async getEnsurePlan ({ state }) {
    let url = state.mapConfig.services.wsbzServiceUrl + `/DataService.svc/rest/json/GetEnsurePlan?type=G01,G02,G03,G04,G05,G06,G07`
    let data = await request.request(url)
    return data['GetEnsurePlanResult'] || []
  },
  // 初始化数据（定点医院G07）
  async getEnsurePlanHospital ({ state }) {
    let url = state.mapConfig.services.wsbzServiceUrl + `/DataService.svc/rest/json/GetEnsurePlanHospital`
    let data = await request.request(url)
    return data['GetEnsurePlanHospitalResult'] || []
  },
  // 医疗组信息
  async getEnsurePlanGroup ({ state }, ID) {
    let url = state.mapConfig.services.wsbzServiceUrl + `/DataService.svc/rest/json/GetEnsurePlanGroup?planID=${ID}`
    let data = await request.request(url)
    return data['GetEnsurePlanGroupResult'] || []
  },
  // 救护车信息
  async getEnsurePlanAmbulance ({ state }, ID) {
    let url = state.mapConfig.services.wsbzServiceUrl + `/DataService.svc/rest/json/GetEnsurePlanAmbulance?planID=${ID}`
    let data = await request.request(url)
    return data['GetEnsurePlanAmbulanceResult'] || []
  },
  // 车载视频信息
  async getGPSVehiclecamera ({ state }, ID) {
    let url = state.mapConfig.services.wsbzServiceUrl + `/DataService.svc/rest/json/GetGPSVehiclecamera?deviceid=${ID}`
    let data = await request.request(url)
    return data['GetGPSVehiclecameraResult'] || []
  },
  // 车载医生信息
  async getEnsurePlanPerson ({ state }, {id, type}) {
    let url = state.mapConfig.services.wsbzServiceUrl + `/DataService.svc/rest/json/GetEnsurePlanPerson?parentID=${id}&type=${type}`
    let data = await request.request(url)
    return data['GetEnsurePlanPersonResult'] || []
  },
  // 车载设备信息
  async getEnsureplanDevice ({ state }, {id, type}) {
    let url = state.mapConfig.services.wsbzServiceUrl + `/DataService.svc/rest/json/GetEnsureplanDevice?parentId=${id}&type=${type}`
    let data = await request.request(url)
    return data['GetEnsureplanDeviceResult'] || []
  },
  // 车载药品信息
  async getEnsureplanMaterials ({ state }, {id, type}) {
    let url = `${state.mapConfig.services.wsbzServiceUrl}/DataService.svc/rest/json/GetEnsureplanMaterials?parentId=${id}&type=${type}`
    let data = await request.request(url)
    return data['GetEnsureplanMaterialsResult'] || []
  },
  // 电话
  async makeCall ({ state }, num) {
    let url = `${state.mapConfig.services.wsbzServiceUrl}/DataService.svc/rest/json/makeCall?num=${num}`
    let data = await request.request(url)
    return data
  },
  // 患者列表
  async getPatientList ({ state }) {
    let url = `${state.mapConfig.services.wsbzServiceUrl}/DataService.svc/rest/json/GetAllPatient`
    let data = await request.request(url)
    return data['GetAllPatientResult'] || []
  },
  // 新增患者
  async AddPatientInfo ({ state }, data) {
    let url = `${state.mapConfig.services.wsbzServiceUrl}/DataService.svc/rest/json/addPatientInfo`
    let res = await request.request(url, { data: data, method: 'post' })
    return res
  },
  // 通用数据获取方法
  async queryParamTable ({ state }, { tag, param }) {
    let methodName = tag // 'QuerySafety'
    let url = `${state.mapConfig.services.baseServiceUrl}/DataService/${methodName}`
    // 拼接URL
    let data = await request.request(url, {
      data: param,
      method: 'post',
      withCredentials: false
    })
    let res = common.convertTable2objects(data[methodName + 'Result'])
    return res || []
  },
  // 安全运行场景的数据加载
  async loadgongjiaoStation ({ commit, state }) {
    let res = await request.request('./static/assets/data/gongjiaoStation.json')
    return res
  },
  // 拨打电话
  async callPhone ({ commit, state }, {phone}) {
    let url = state.mapConfig.misConfig.phoneCall + '/single/call'
    let data = {
      phoneNum: phone
    }
    let res = await request.request(url, { data: data, method: 'post' })
    return res || []
  },
  // 挂断电话
  async clearPhone ({ commit, state }, {phone}) {
    let url = state.mapConfig.misConfig.phoneCall + '/clear/call'
    let data = {
      phoneNum: phone
    }
    let res = await request.request(url, { data: data, method: 'post' })
    return res || []
  },
  // 电话的状态(0-空闲  2 -振铃  4--通话)
  async phoneStatus ({ commit, state }, {phone}) {
    let url = state.mapConfig.misConfig.phoneCall + '/status'
    let data = {
      phoneNum: phone
    }
    let res = await request.request(url, { data: data, method: 'post' })
    return res || []
  },
  // 视频解码
  async decodingVedio ({ commit, state }, par) {
    let url = `${par.urlO}indexCode=${par.id}`
    // 拼接URL
    let data = await request.request(url)
    return data
  }
}
