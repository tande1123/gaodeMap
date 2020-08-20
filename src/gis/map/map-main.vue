<!--
 * @Description: 地图核心组件
 * @version: 0.1.0
 * @Author:
 * @Date: 2018-12-04 13:38:01
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-15 11:18:11
 -->
<template>
	<div id="map_container" class="map-cover" v-show="mapvisible">
	</div>
</template>

<script>
import AMap from 'AMap'
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import common from '@/utils/common.es'
import popbcss from '../../components/pop-bcss'
export default {
  /**
   * @name: 从store中取数据
   */
  components: {
    popbcss
  },
  computed: {
    ...mapGetters(['configLoaded', 'mapConfig', 'symbol', 'panel', 'clickMarkerData', 'mapVisible'])
  },
  data () {
    return {
      layers: null,
      mapvisible: true
    }
  },
  /**
   * @name: 监听配置文件加载
   */
  watch: {
    configLoaded () {
      this.initMap()
    },
    mapVisible () {
      this.mapvisible = this.mapVisible
    }
  },
  methods: {
    ...mapActions(['loadConfig']),

    /**
   * @name: 地图初始化
   */
    initMap () {
      if (this.configLoaded) {
        this.$nextTick(e => this.doInit())
      }
    },
    doInit () {
      const conf = this.mapConfig
      let mapOpt = {}
      Object.assign(mapOpt, conf.mapOptions)
      if (this.layers && this.layers instanceof Array) {
        mapOpt.layers = this.layers
      }
      const map = new AMap.Map('map_container', mapOpt)
      // 初始图层不显示
      var lyrs = map.getLayers()
      if (lyrs) {
        for (var l = 0; l < lyrs.length; l++) {
          lyrs[l].hide()
        }
      }

      const infoWindow = new AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        closeWhenClickMap: false,
        content: '<div class="msgBox-content"></div>',
        offset: new AMap.Pixel(0, 0)
      })
      let clustererLyr = null
      map.on('click', (e) => {
        console.log(e)
        infoWindow.close()
      })
      /**
       * @name: 封装地图对象
       * @param : null
       * @return : object
       */
      const _map = {
        // 地图实例
        getInstance () {
          return map
        },
        // 移除元素地图
        // 'marker'点 'polyline'线 'polygon'面  ‘layername’属性配置构造图层  labelLayer
        //  null 全移除
        //  object 移除传入的对象
        clear (type) {
          if (!type) {
            map.clearMap()
          } else if (typeof type === 'string') {
            switch (type) {
              case 'marker':
              case 'polyline':
              case 'polygon':
              case 'text':
                map.remove(map.getAllOverlays(type))
                break
              default:
                // 删除构建的数据
                var markers = map.getAllOverlays('marker')
                for (let i = 0; i < markers.length; i++) {
                  var markersDataP = markers[i].C.extData
                  if (markersDataP.layername && markersDataP.layername === type) {
                    map.remove(markers[i])
                  }
                }
                var polylines = map.getAllOverlays('polyline')
                for (let i = 0; i < polylines.length; i++) {
                  // var markersDataL = polylines[i].C.extData
                  // if (markersDataL.layername && markersDataL.layername === type) {
                  map.remove(polylines[i])
                  // }
                }
                var polygons = map.getAllOverlays('polygon')
                for (let i = 0; i < polygons.length; i++) {
                  // var markersDataPG = polygons[i].C.extData
                  // if (markersDataPG.layername && markersDataPG.layername === type) {
                  map.remove(polygons[i])
                  // }
                }
                break
            }
          } else if (typeof type === 'object') {
            if (type instanceof Array) {
              type.forEach(e => {
                map.remove(e)
              })
            } else {
              map.remove(type)
            }
          }
        },
        // 清除聚合图层数据
        clearClusterLayer () {
          clustererLyr && clustererLyr.clearMarkers()
        },
        // 弹窗实例
        getInfoWindow () {
          return infoWindow
        },
        // 显示弹窗
        showInfoWindow ({ x, y, dx, dy, title, content, lnglat, offset, data, methods }) {
          offset = offset || new AMap.Pixel(dx || 0, dy || 0)
          lnglat = lnglat || new AMap.LngLat(x || 0, y || 0)
          let uid = `pop_${common.uuid(8)}`
          infoWindow.setContent(this._createInfoWindow(title, `<div id="${uid}"></div>`))
          infoWindow.setOffset(offset)
          this._renderTemplate(uid, content, data, methods)
          infoWindow.open(map, lnglat)
        },
        // 关闭弹窗
        hideInfoWindow () {
          infoWindow.close()
        },
        // 坐标转变换
        parseLngLat (x, y) {
          return {
            x: x - 0,
            y: y - 0
          }
        },
        // 普通加点
        addPoints (dataArr, options) {
          if (dataArr instanceof Array && dataArr.length > 0) {
            const { fitView } = { ...{ fitView: false }, ...options }
            let markers = this._creatElements(dataArr, options)
            if (markers.length > 0) {
              map.add(markers)
              fitView && map.setFitView(markers)
            }
            if (markers.length === 1) {
              map.setCenter(markers[0].getPosition())
            }
            return markers
          }
        },
        // 聚类加点
        addCluster (dataArr, options) {
          let markers = this.addPoints(dataArr, options)

          let config = this.getLayerConfigById('PoiClusterLayer')
          if (config instanceof Array) config = config[0]
          if (config.visible) {
            clustererLyr ? clustererLyr.addMarkers(markers)
              : clustererLyr = new AMap.MarkerClusterer(map, markers, {
                styles: options.styles || config.styles, // 自定义聚类图标
                gridSize: options.gridSize || config.gridSize || 80
              })
          }
          return markers
        },
        // 普通线  及多条线
        addlines (linestr, options) {
          var lineArr = linestr.split(';;')
          var dataArr = []
          for (var i = 0; i < lineArr.length; i++) {
            var line2 = lineArr[i].split(';')
            var Arr = []
            if (line2.length === 1) {
              var line3 = line2[0].split(',')
              for (var m = 0; m < line3.length - 1; m += 2) {
                Arr.push([line3[m] * 1, line3[m + 1] * 1])
                console.log(line3[m] * 1 + '-----' + line3[m + 1] * 1)
              }
            } else {
              for (var j = 0; j < line2.length; j++) {
                Arr.push([line2[j].split(',')[0] * 1, line2[j].split(',')[1] * 1])
              }
            }
            dataArr.push(Arr)
          }
          if (dataArr instanceof Array && dataArr.length > 0) {
            const { fitView } = { ...{ fitView: false }, ...options }
            let polyline = this._creatLineElements(dataArr, options)
            if (polyline) {
              map.add(polyline)
              fitView && map.setFitView(polyline)
            }
            return polyline
          }
        },
        // 获取聚类图层
        getClusterLayer () {
          return clustererLyr
        },
        // 获取图层配置
        getLayerConfigById (id, configs) {
          configs = configs || conf.layers
          return configs.filter(item => item.id === id) || []
        },
        // 获取聚类子图层配置
        getSubLayersConfigById (id, configs) {
          let poi = this.getLayerConfigById('PoiClusterLayer')[0]
          if (poi) {
            poi = poi.subLayers || []
          }
          configs = configs || poi || []
          return configs.filter(item => item.id === id) || []
        },
        // 添加3D模型
        add3DModel (Obj) {
          map.setPitch(Obj.pitch || 55)
          map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 1)
          map.DirectionLight = new AMap.Lights.DirectionLight([1, 0, -0.5], [1, 1, 1], 1)
          this._loadModel(Obj)
        },
        // 加载模型
        // @private
        _loadModel (modelObj) {
          var objLoader = new THREE.OBJLoader2()
          function callbackOnLoad (event) {
            var object3Dlayer = new AMap.Object3DLayer()
            var meshes = event.detail.loaderRootNode.children
            for (var i = 0; i < meshes.length; i++) {
              var vecticesF3 = meshes[i].geometry.attributes.position
              var vecticesNormal3 = meshes[i].geometry.attributes.normal
              var vecticesUV2 = meshes[i].geometry.attributes.uv

              var vectexCount = vecticesF3.count

              var mesh = new AMap.Object3D.MeshAcceptLights()

              var geometry = mesh.geometry

              // 底部一圈

              var c, opacity

              var material = meshes[i].material[0] || meshes[i].material

              if (material.map) { mesh.textures.push(modelObj.bmp) }

              c = material.color
              opacity = material.opacity

              for (var j = 0; j < vectexCount; j += 1) {
                var s = j * 3
                geometry.vertices.push(vecticesF3.array[s], vecticesF3.array[s + 2], -vecticesF3.array[s + 1])

                if (vecticesNormal3) {
                  geometry.vertexNormals.push(vecticesNormal3.array[s], vecticesNormal3.array[s + 2], -vecticesNormal3.array[s + 1])
                }
                if (vecticesUV2) {
                  geometry.vertexUVs.push(vecticesUV2.array[j * 2], 1 - vecticesUV2.array[j * 2 + 1])
                }
                geometry.vertexColors.push(c.r, c.g, c.b, opacity)
              }
              mesh.DEPTH_TEST = material.depthTest
              // mesh.backOrFront = 'both'
              mesh.transparent = opacity < 1
              mesh.scale(...modelObj.scale)
              mesh.rotateZ(modelObj.rotateZ)
              mesh.position(new AMap.LngLat(modelObj.x, modelObj.y))
              object3Dlayer.add(mesh)
            }
            map.add(object3Dlayer)
          }
          function onLoadMtl (materials) {
            var modelName = 'building'
            objLoader.setModelName(modelName)
            objLoader.setMaterials(materials)
          }
          objLoader.loadMtl(modelObj.mtl, null, onLoadMtl)
          objLoader.load(modelObj.obj, callbackOnLoad, null, null, null, false)
        },
        // 构造点元素
        // @private
        _creatElements (dataArr, options) {
          debugger
          if (dataArr instanceof Array && dataArr.length > 0) {
            let markers = []
            const { x, y, symbol, click, label, text, tips, hover, mouseout } = { ...{ x: 'X', y: 'Y', click: null, label: null, text: null, tips: null, hover: null, mouseout: null }, ...options }
            let _symbol = symbol
            if (typeof symbol !== 'function') {
              _symbol = function () {
                return symbol
              }
            }
            let _label = label
            if (label && typeof label !== 'function') {
              _label = function () {
                return label
              }
            }
            let _text = text
            if (text && typeof text !== 'function') {
              _text = function () {
                return text
              }
            }
            let _tips = tips
            if (tips && typeof tips !== 'function') {
              _tips = function () {
                return tips
              }
            }
            dataArr.forEach(element => {
              if (!element) return
              let xy = _map.parseLngLat(element[x], element[y])
              if (isNaN(xy.x) || isNaN(xy.y)) {
                return
              }
              let sym = _symbol(element) || {}
              if (!common.isType(sym, 'Object')) sym = {}
              let clickable = false
              let cursor = 'default'
              if (typeof click === 'function') {
                clickable = true
                cursor = 'pointer'
              }

              let marker = new AMap.Marker({
                position: new AMap.LngLat(xy.x, xy.y),
                icon: sym.markerFile,
                offset: new AMap.Pixel(sym.markerDx || 0, sym.markerDy || 0),
                angle: sym.markerRotation || 0,
                clickable: clickable,
                autoRotation: true,
                cursor: cursor,
                extData: element
              })
              // 添加鼠标滑过显示一个tips的效果
              if (tips) {
                let _title = _tips(element) || ''
                if (!common.isType(_title, 'String')) _title = ''
                marker.setTitle(_title)
              }
              click && marker.on('click', click)
              // 鼠标滑过事件
              hover && marker.on('mouseover', hover)
              // 鼠标移出事件
              mouseout && marker.on('mouseout', mouseout)
              if (label) {
                let labelOpt = _label(element) || {}
                if (!common.isType(labelOpt, 'Object')) labelOpt = {}
                marker.setLabel({
                  autoRotation: false,
                  offset: new AMap.Pixel(labelOpt.dx || 0, labelOpt.dy || 0),
                  // content: `<div class='marker-info'>${labelOpt.content}</div>`
                  content: `<div class='marker-info' style='color:${labelOpt.fontcolor};font-size: 15px'>${labelOpt.content}</div>`
                })
              }
              markers.push(marker)
              if (text) {
                let textOpt = _text(element) || {}
                if (!common.isType(textOpt, 'Object')) textOpt = {}
                let textmarker = new AMap.Text({
                  position: new AMap.LngLat(xy.x, xy.y),
                  // icon: sym.markerFile,
                  offset: new AMap.Pixel(textOpt.dx || 0, textOpt.dy || 0),
                  angle: sym.markerRotation || 0,
                  autoRotation: false,
                  cursor: cursor,
                  extData: element,
                  // content: `<div class='marker-info' style='color:${textOpt.fontcolor};font-size: 15px'>${textOpt.content}</div>`
                  text: `<div class='marker-info' style='color:${textOpt.fontcolor};font-size: 14px'>${textOpt.content}</div>`
                })
                markers.push(textmarker)
              }
            })
            return markers
          } else {
            return []
          }
        },
        _creatLineElements (dataArr, options) {
          if (dataArr instanceof Array && dataArr.length > 0) {
            let polylines = []
            const { symbol } = { ...{}, ...options }
            let _symbol = symbol
            // if (typeof symbol !== 'function') {
            //   _symbol = function () {
            //     return symbol
            //   }
            // }
            // let _label = label
            // if (label && typeof label !== 'function') {
            //   _label = function () {
            //     return label
            //   }
            // }
            // console.log(_label)

            let m = 0
            dataArr.forEach(element => {
              if (!element) return
              // let sym = _symbol(element) || {}
              // if (!common.isType(sym, 'Object')) sym = {}
              // let clickable = false
              // let cursor = 'default'
              // if (typeof click === 'function') {
              //   clickable = true
              //   cursor = 'pointer'
              // }
              var polyline
              if (m === 0) {
                polyline = new AMap.Polyline({
                  path: element,
                  isOutline: _symbol[0].isOutline, // false,
                  outlineColor: _symbol[0].outlineColor, // '#ffeeff',
                  borderWeight: _symbol[0].borderWeight, // 2,
                  strokeColor: _symbol[0].strokeColor, // '#0E5D64',
                  strokeOpacity: _symbol[0].strokeOpacity, // 1,
                  strokeWeight: _symbol[0].strokeWeight, // 6,
                  strokeStyle: _symbol[0].strokeStyle, // 'solid',
                  strokeDasharray: _symbol[0].strokeDasharray, // [10, 5],
                  lineJoin: _symbol[0].lineJoin, // 'round',
                  lineCap: _symbol[0].lineCap, // 'round',
                  zIndex: 50
                })
              } else if (m === 1) {
                polyline = new AMap.Polyline({
                  path: element,
                  isOutline: _symbol[1].isOutline,
                  outlineColor: _symbol[1].outlineColor,
                  borderWeight: _symbol[1].borderWeight,
                  strokeColor: _symbol[1].strokeColor,
                  strokeOpacity: _symbol[1].strokeOpacity,
                  strokeWeight: _symbol[1].strokeWeight,
                  strokeStyle: _symbol[1].strokeStyle,
                  strokeDasharray: _symbol[1].strokeDasharray,
                  lineJoin: _symbol[1].lineJoin,
                  lineCap: _symbol[1].lineCap,
                  zIndex: 50
                })
              } else {
                polyline = new AMap.Polyline({
                  path: element,
                  isOutline: _symbol[2].isOutline,
                  outlineColor: _symbol[2].outlineColor,
                  borderWeight: _symbol[2].borderWeight,
                  strokeColor: _symbol[2].strokeColor,
                  strokeOpacity: _symbol[2].strokeOpacity,
                  strokeWeight: _symbol[2].strokeWeight,
                  strokeStyle: _symbol[2].strokeStyle,
                  strokeDasharray: _symbol[2].strokeDasharray,
                  lineJoin: _symbol[2].lineJoin,
                  lineCap: _symbol[2].lineCap,
                  zIndex: 50
                })
              }
              m++
              polylines.push(polyline)
            })
            return polylines
          } else {
            return []
          }
        },
        // 弹窗 html 构建
        // @private
        _createInfoWindow (title, content) {
          let info = document.createElement('div')
          info.className = 'custom-info input-card content-window-card'

          // 定义顶部标题
          var top = document.createElement('div')
          // var titleD = document.createElement('div')
          var closeX = document.createElement('i')
          top.className = 'info-top'
          // titleD.innerHTML = title
          closeX.onclick = () => {
            infoWindow.close()
          }
          // top.appendChild(titleD)
          top.appendChild(closeX)
          info.appendChild(top)

          // 定义中部内容
          var middle = document.createElement('div')
          middle.className = 'info-middle'
          middle.style.backgroundColor = 'white'
          middle.innerHTML = content
          info.appendChild(middle)

          // 定义底部内容
          var bottom = document.createElement('div')
          bottom.className = 'info-bottom'
          bottom.style.position = 'relative'
          bottom.style.top = '0px'
          bottom.style.margin = '0 auto'
          var sharp = document.createElement('i')
          bottom.appendChild(sharp)
          info.appendChild(bottom)
          return info
        },
        // 弹窗 html 渲染
        // @private
        _renderTemplate (domId, content = '', data = {}, methods = {}) {
          // 类型检查
          if (!domId || !common.isType(domId, 'String')) return
          if (!common.isType(content, 'String')) return
          if (!common.isType(data, 'Object')) return
          if (!common.isType(methods, 'Object')) return
          setTimeout(() => {
            let wrapper = document.getElementById(domId)
            if (!wrapper) {
              this._renderTemplate(domId, content, data, methods)
              return
            }
            try {
              new Vue({
                template: `<div>${content}</div>`,
                data () {
                  return { ...data }
                },
                methods: {
                  ...methods,
                  innerMethod (type, index) {
                    this[type] = index
                  }
                }
              }).$mount(`#${domId}`)
            } catch (error) {
              console.error('模板渲染失败，请检查模板是否含有非html元素。')
            }
          }, 100)
        },
        // 路径分析
        RoadNetWork (start, end, callback) {
          // 构造路线导航类
          var driving = new AMap.Driving({
            map: map
          })
          // 根据起终点名称规划驾车导航路线
          driving.search([
            { keyword: start, city: '武汉' },
            { keyword: end, city: '武汉' }
          ], function (status, result) {
            let LineArr = []
            if (status === 'complete') {
              console.log('路径规划完成')
              let steps = result.routes['0'].steps
              for (let i = 0; i < steps.length; i++) {
                let path = steps[i].path
                for (let j = 0; j < path.length; j++) {
                  LineArr.push(path[j].lng + ',' + path[j].lat + ';')
                }
              }
              callback(LineArr)
            } else {
              console.log('路径规划失败：' + result)
              callback(LineArr)
            }
            driving.clear()
          })
        },
        // 轨迹显示 lineArr=[[1,2],[1,2]]
        ShowHistoryLine (lineArr, timeArr, marker, textmarker) {
          let line = Object.assign([], lineArr)
          console.log(lineArr)
          console.log(timeArr)
          console.log(line)
          // let marker = new AMap.Marker({
          //   map: map,
          //   position: lineArr[0],
          //   icon: 'https://webapi.amap.com/images/car.png',
          //   offset: new AMap.Pixel(-26, -13),
          //   autoRotation: true,
          //   angle: -90
          // })

          let polyline = new AMap.Polyline({
            path: lineArr,
            showDir: true,
            strokeColor: '#28F',
            strokeWeight: 6
          })
          map.add(polyline)
          console.log(polyline)
          let passedPolyline = new AMap.Polyline({
            map: map,
            strokeColor: '#AF5', // 线颜色
            strokeWeight: 6 // 线宽
          })
          marker.on('moving', function (e) {
            var len = e.passedPath.length
            // var rate = res.data[len - 1].rate
            var location = e.passedPath[len - 1]
            var lll = new AMap.LngLat(location.lng, location.lat)
            textmarker.setPosition(lll)

            passedPolyline.setPath(e.passedPath)
            // console.log(marker)
            // console.log(e)
            // console.log(passedPolyline)
          })
          // textmarker.on('moving', function (e) {
          //   passedPolyline.setPath(e.passedPath)
          // })

          let time = 0
          let timeT = 0
          marker.moveAlong(lineArr, 1000, function (k) {
            time++
            // console.log(marker.Le.move.Sf[0]['lng'] + '   ' + marker.Le.move.Sf[0]['lat'])
            // let tempLL = new AMap.LngLat(marker.Le.move.Sf[0]['lng'], marker.Le.move.Sf[0]['lat'])
            if (time > 0 && time % 100 === 0) {
              timeT++
              if (timeT === timeArr.length) {
                timeT = timeArr.length - 1
              }
              // if (line[time] && line[time][0] && line[time][1]) {
              //   let tempLL = new AMap.LngLat(line[time][0], line[time][1])
              //   textmarker.setPosition(tempLL)
              // }
              textmarker.setText(
                `<div class='marker-info' style='color:#2cd775;font-size: 14px'>
                    <div style="width:90px;height:46px;background:url('./static/assets/img/ylss/yjjx.png') no-repeat center center;background-size:100% 100%;padding-left:10px;padding-top:1px;color: #fff;">
                      <p> ${timeArr[timeT].substring(0, 10)}</p>
                      <p style="padding-left:10px;"> ${timeArr[timeT].substring(10, 19)}</p>
                    </div>
                  </div>`
              )

              // let newtextmarker = new AMap.Text({
              //   text: `<div class='marker-info' style='color:#2cd775;font-size: 15px'>
              //    <div style="width:90px;height:46px;background:url('./static/assets/img/ylss/yjjx.png') no-repeat center center;background-size:100% 100%;padding-left:10px;padding-top:1px;color: #fff;">
              //         <p> ${timeArr[timeT].substring(0, 10)}aaaaaaaaaa</p>
              //         <p style="padding-left:10px;"> ${timeArr[timeT].substring(10, 19)}</p>
              //       </div>
              //       </div>`
              // })

              // marker.setLabel({
              //   content: `<div style="width:90px;height:46px;background:url('./static/assets/img/ylss/yjjx.png') no-repeat center center;background-size:100% 100%;padding-left:10px;padding-top:6px;">
              //      <p> ${timeArr[timeT].substring(0, 10)}</p>
              //      <p style="padding-left:10px;"> ${timeArr[timeT].substring(10, 19)}</p>
              //  </div>`,
              //  // offset: marker.getLabel().offset,
              //  direction: 'center'
              // })
            }
            return k
          })
        },
        SetMarkerOffset (x, y) {
          return new AMap.Pixel(x, y)
        }
      }
      this.$store.commit('setMap', _map)
      this.$store.commit('setMapLoaded', true)
    }
  },
  created () {

  },
  mounted () {
    this.initMap()
  }
}
</script>
<style lang='less'>
@import "../../assets/less/set.less";
#map_container {
	background: none !important;
}
.map-cover {
	width: 100%;
	height: 100%;
}
#map_container .amap-logo {
	left: -1000px !important;
	display: none !important;
}
#map_container .amap-copyright {
	opacity: 0;
}
.content-window-card {
	.info-middle {
		width: 540px;
		background: rgba(255, 255, 255, 0) !important;
		.bcssInfo {
			width: 372px;
			margin: auto;
			color: #00effe;
			background: url("../../assets/images/pop/layer.png") center center no-repeat;
			background-size: 100% 100%;
			border-radius: 5px;
			padding-bottom: 16px;
			i {
				display: inline-block;
				width: 66px;
				height: 41px;
				background: url("../../assets/images/pop/close.png") center center no-repeat;
				background-size: 100% 100%;
				margin-left: 300px;
				margin-top: 4px;
			}
			div {
				font-size: 16px;
				height: 41px;
				line-height: 41px;
				display: flex;
				align-items: center;
				span {
					width: 142px;
					height: 41px;
					font-size: 16px;
					line-height: 41px;
					display: inline-block;
					text-align: justify;
					color: #fff;
					text-justify: inter-ideograph;
					-ms-text-justify: inter-ideograph;
					overflow: hidden;
					position: relative;
					padding-right: 20px;
					letter-spacing: 3px;
					&::before {
						position: absolute;
						top: 0;
						right: 11px;
						color: #fff;
						content: ":";
						height: 41px;
						display: inline-block;
					}
					&::after {
						width: 100%;
						content: "";
						display: inline-block;
					}
				}
			}

			.peopleCount {
				i {
					background: url("../../assets/images/pop/camera.png") center center no-repeat;
					background-size: 100% 100%;
					cursor: pointer;
				}
			}
			.telphone {
				i {
					background: url("../../assets/images/pop/tel.png") center center no-repeat;
					background-size: 100% 100%;
				}
			}
			.peopleCount,
			.telphone {
				position: relative;
				i {
					width: 52px;
					height: 41px;
					position: absolute;
					right: 10px;
					top: 0;
				}
			}
		}
	}
}
// 医疗服务弹框上面的label
.amap-marker-label {
	border: 0px !important;
	background: none !important;
	color: #fff;
}
.jycInfo {
	position: relative;
	width: 360px;
	color: #fff;
	background: url("../../assets/images/pop/layer2.png") center center no-repeat;
	background-size: 100% 100%;
	border-radius: 5px;
	margin: auto;
	.jycInfo_x {
		display: inline-block;
		width: 66px;
		height: 41px;
		background: url("../../assets/images/pop/close.png") center center no-repeat;
		background-size: 100% 100%;
		margin-left: 290px;
		margin-top: 4px;
	}
	.jyc_title {
		width: 340px;
		font-size: 18px;
		font-weight: bold;
		color: #00f0ff;
		height: 30px;
		position: absolute;
		left: 16px;
		top: 16px;
	}
	.bar {
		display: inline-block;
		width: 340px;
		height: 5px;
		background: url("../../assets/images/pop/bor.png") center center no-repeat;
		background-size: 100% 100%;
		position: absolute;
		left: 16px;
		top: 50px;
	}
	.xq {
		padding-top: 20px;
		margin-left: 12px;
		width: 340px;
		border-bottom: 1px dotted #00f0ff;
		padding-bottom: 5px;
		div {
			display: flex;
			span {
				font-size: 16px;
				color: #fff;
				line-height: 30px;
				&:nth-child(1) {
					width: 90px;
					text-align: justify;
					text-align-last: justify;
					-moz-text-align-last: justify;
					-webkit-text-align-last: justify;
					word-wrap: break-word;
					word-break: break-all;
					text-justify: inter-ideograph; /*ie中必须有这个*/
					text-align-last: justify;
					display: block; /*ie中必须有这个*/
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				&:nth-child(2) {
					padding: 0 5px;
					color: #00f0ff;
				}
				&:nth-child(3) {
					margin-left: 10px;
					color: #00f0ff;
					line-height: 30px;
				}
			}
		}
	}
	.sxt {
		position: absolute;
		display: inline-block;
		width: 52px;
		height: 41px;
		right: 16px;
		top: 90px;
		background: url("../../assets/images/pop/camera.png") center center no-repeat;
		background-size: 100% 100%;
		cursor: pointer;
	}
	.dh {
		position: absolute;
		display: inline-block;
		width: 52px;
		height: 41px;
		right: 16px;
		top: 146px;
		background: url("../../assets/images/pop/tel.png") center center no-repeat;
		background-size: 100% 100%;
		cursor: pointer;
	}
	.ry {
		margin-left: 12px;
		width: 340px;
		position: relative;
		padding-bottom: 24px;
		.ry_title {
			width: 340px;
			font-size: 16px;
			font-weight: bold;
			color: #00f0ff;
			height: 16px;
			height: 20px;
			line-height: 20px;
			margin-top: 12px;
		}
		.ry_bar {
			display: inline-block;
			width: 340px;
			height: 5px;
			background: url("../../assets/images/pop/bor.png") center center no-repeat;
			background-size: 100% 100%;
		}
		div {
			display: flex;
			span {
				font-size: 16px;
				color: white;
				line-height: 30px;
				&:nth-child(1) {
					width: 60px;
					text-align: justify;
					text-align-last: justify;
					-moz-text-align-last: justify;
					-webkit-text-align-last: justify;
					word-wrap: break-word;
					word-break: break-all;
					text-justify: inter-ideograph; /*ie中必须有这个*/
					text-align-last: justify;
					display: block; /*ie中必须有这个*/
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				&:nth-child(2) {
					padding: 0 5px;
					color: #00f0ff;
				}
				&:nth-child(3) {
					margin-left: 10px;
					color: #00f0ff;
				}
			}
		}
		.tubiao {
			position: absolute;
			display: inline-block;
			width: 52px;
			height: 41px;
			right: 6px;
			top: 80px;
			background: url("../../assets/images/pop/ax.png") center center no-repeat;
			background-size: 100% 100%;
			cursor: pointer;
		}
	}
}
// 医疗中心及合同医院
.ylzx {
	width: 542 * @px;
	height: 266 * @px;
	margin: auto;
	.ylzx_box {
		width: 542 * @px;
		height: 246 * @px;
		background: #fff;
		position: relative;
		box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
		border-radius: 5 * @px;
		.ylzx_title {
			align-items: center;
			display: flex;
			justify-content: space-between;
			padding-right: 14 * @px;
			height: 40 * @px;
			background: url("../../../static/assets/img/wsbz/headbg.png") center center no-repeat;
			background-size: 100% 100%;
			span:nth-child(1) {
				font-weight: bold;
				font-size: 16 * @px;
				text-indent: 14 * @px;
				color: #fff;
				line-height: 40 * @px;
			}
			span:nth-child(2) {
				cursor: pointer;
				display: inline-block;
				width: 18 * @px;
				height: 18 * @px;
				background: url("../../../static/assets/img/wsbz/x.png") no-repeat center center;
				background-size: 100% 100%;
				cursor: pointer;
			}
		}
		.dz {
			width: 500 * @px;
			margin: 10 * @px 0px 10 * @px 20 * @px;
			span:nth-child(1) {
				font-size: 16 * @px;
				font-weight: bold;
				line-height: 28 * @px;
			}
			span:nth-child(2) {
				margin-left: 30 * @px;
				font-size: 16 * @px;
				line-height: 28 * @px;
			}
		}
		.rydh {
			width: 500 * @px;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 0px 0px 10 * @px 20 * @px;
			& > div:nth-child(1) {
				span:nth-child(1) {
					font-size: 16 * @px;
					font-weight: bold;
					line-height: 28 * @px;
				}
				span:nth-child(2) {
					margin-left: 30 * @px;
					font-size: 16 * @px;
					line-height: 28 * @px;
					width: 60 * @px;
				}
			}
			& > div:nth-child(2) {
				margin-left: 50 * @px;
				span:nth-child(1) {
					font-size: 16 * @px;
					font-weight: bold;
					line-height: 28 * @px;
				}
				span:nth-child(2) {
					font-size: 16 * @px;
					line-height: 28 * @px;
				}
			}
			& > i {
				margin-left: 55 * @px;
				display: inline-block;
				width: 20 * @px;
				height: 20 * @px;
				background: url("../../../static/assets/img/wsbz/phone02.png") no-repeat center center;
				background-size: 100% 100%;
			}
		}
		.ylzx_xq {
			width: 500 * @px;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 0px 0px 0px 20 * @px;
			& > div:nth-child(1) {
				span:nth-child(1) {
					font-size: 16 * @px;
					font-weight: bold;
					line-height: 28 * @px;
				}
				span:nth-child(2) {
					margin-left: 10 * @px;
					font-size: 16 * @px;
					line-height: 28 * @px;
					width: 60 * @px;
				}
			}
			& > div:nth-child(2) {
				margin-left: 70 * @px;
				span:nth-child(1) {
					font-size: 16 * @px;
					font-weight: bold;
					line-height: 28 * @px;
				}
				span:nth-child(2) {
					font-size: 16 * @px;
					line-height: 28 * @px;
				}
			}
			& > div:nth-child(3) {
				margin-left: 48px;
				span:nth-child(1) {
					font-size: 16 * @px;
					font-weight: bold;
					line-height: 28 * @px;
				}
				span:nth-child(2) {
					font-size: 16 * @px;
					line-height: 28 * @px;
				}
			}
		}
		.ylzx_table {
			margin-left: 26 * @px;
			margin-top: 20 * @px;
			a {
				width: 112 * @px;
				display: inline-block;
				background: #03a5e5;
				border-radius: 5 * @px;
				color: #fff;
				text-align: center;
				line-height: 40 * @px;
				font-size: 16 * @px;
			}
			.active {
				width: 112 * @px;
				display: inline-block;
				background: #e89e19;
				border-radius: 5 * @px;
				color: #fff;
				text-align: center;
				line-height: 40 * @px;
				font-size: 16 * @px;
			}
		}
	}
	.ylzx_box::after {
		position: absolute;
		bottom: -10px;
		left: 48%;
		font-size: 0;
		line-height: 0;
		border-width: 10px;
		border-color: #fff;
		border-bottom-width: 0;
		border-style: dashed;
		border-top-style: solid;
		border-left-color: transparent;
		border-right-color: transparent;
		content: "";
	}
}
// 航空救治弹框
.hkbox {
	width: 322 * @px;
	height: 212 * @px;
	margin: auto;
	.hkbox_box {
		width: 322 * @px;
		height: 192 * @px;
		background: #fff;
		box-shadow: 0 0 * @px 15 * @px rgba(0, 0, 0, 0.2);
		border-radius: 5 * @px;
		div {
			&:nth-child(1) {
				.hkbox_title {
					align-items: center;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding-right: 14 * @px;
					height: 40 * @px;
					background: url("../../../static/assets/img/wsbz/headbg.png") center center no-repeat;
					background-size: 100% 100%;
					span:nth-child(1) {
						font-weight: bold;
						font-size: 16 * @px;
						text-indent: 14 * @px;
						color: #fff;
						line-height: 40 * @px;
						display: inline-block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					span:nth-child(2) {
						cursor: pointer;
						display: inline-block;
						width: 18 * @px;
						height: 18 * @px;
						background: url("../../../static/assets/img/wsbz/x.png") no-repeat center center;
						background-size: 100% 100%;
						cursor: pointer;
					}
				}
			}
			&:nth-child(2) {
				display: flex;
				flex-direction: row;
				margin-top: 26 * @px;
				margin-left: 29 * @px;
				span {
					display: inline-block;
					&:nth-child(1) {
						font-size: 16 * @px;
						font-weight: bold;
					}
					&:nth-child(2) {
						display: inline-block;
						width: 80%;
						font-size: 16 * @px;
					}
				}
			}
			&:nth-child(3) {
				margin-top: 10 * @px;
				margin-left: 29 * @px;
				float: left;
				span {
					display: inline-block;
					&:nth-child(1) {
						font-size: 16 * @px;
						font-weight: bold;
					}
					&:nth-child(2) {
						font-size: 16 * @px;
					}
				}
			}
			&:nth-child(4) {
				margin-top: 10 * @px;
				margin-left: 29 * @px;
				float: left;
				span {
					display: inline-block;
					&:nth-child(1) {
						font-size: 16 * @px;
						font-weight: bold;
					}
					&:nth-child(2) {
						font-size: 16 * @px;
					}
				}
			}
			&:nth-child(5) {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 46 * @px;
				margin-left: 28 * @px;
				span {
					display: inline-block;
					&:nth-child(1) {
						font-size: 16 * @px;
						font-weight: bold;
					}
					&:nth-child(2) {
						// width: 100 * @px;
						font-size: 16 * @px;
					}
				}
				i {
					display: inline-block;
					width: 20 * @px;
					height: 20 * @px;
					background: url("../../../static/assets/img/wsbz/phone02.png") no-repeat center center;
					background-size: 100% 100%;
					margin-left: 56 * @px;
				}
			}
		}
	}
	.hkbox_box::after {
		position: absolute;
		bottom: 10px;
		left: 48%;
		font-size: 0;
		line-height: 0;
		border-width: 10px;
		border-color: #fff;
		border-bottom-width: 0;
		border-style: dashed;
		border-top-style: solid;
		border-left-color: transparent;
		border-right-color: transparent;
		content: "";
	}
}
// 交通专项弹框样式
.jrbcInfo {
	width: 372 * @px;
	margin: auto;
	color: #fff;
	background: url("../../assets/images/pop/layer2.png") center center no-repeat;
	background-size: 100% 100%;
	border-radius: 5 * @px* @px;
	padding-bottom: 16 * @px;
	i {
		display: inline-block;
		width: 66 * @px;
		height: 41 * @px;
		background: url("../../assets/images/pop/close.png") center center no-repeat;
		background-size: 100% 100%;
		margin-left: 300 * @px;
		margin-top: 4 * @px;
	}
	div {
		font-size: 16 * @px;
		height: 40 * @px;
		color: #00effe;
		display: flex;
		align-items: center;
		span {
			width: 142 * @px;
			height: 40 * @px;
			font-size: 16 * @px;
			line-height: 40 * @px;
			display: inline-block;
			text-align: justify;
			color: #fff;
			text-justify: inter-ideograph;
			-ms-text-justify: inter-ideograph;
			overflow: hidden;
			position: relative;
			padding-right: 20 * @px;
			letter-spacing: 3 * @px;
			&::before {
				position: absolute;
				top: 0;
				right: 11 * @px;
				color: #fff;
				content: ":";
				height: 40 * @px;
				display: inline-block;
			}
			&::after {
				width: 100%;
				content: "";
				display: inline-block;
			}
		}
	}

	.peopleCount {
		i {
			background: url("../../assets/images/pop/camera.png") center center no-repeat;
			background-size: 100% 100%;
			cursor: pointer;
		}
	}
	.telphone {
		i {
			background: url("../../assets/images/pop/tel.png") center center no-repeat;
			background-size: 100% 100%;
		}
	}
	.peopleCount,
	.telphone {
		position: relative;
		i {
			width: 52 * @px;
			height: 40 * @px;
			position: absolute;
			right: 10 * @px;
			top: 0;
		}
	}
}
// 定向越野-参赛人员
.dxyy_info {
	width: 300px;
	height: 180px;
	background: #fff;
	position: absolute;
	left: 50%;
	margin-left: -150px;
	bottom: 0;
	border-radius: 5px;
	font-size: 20px;
	overflow: hidden;
	box-shadow: 0 0 10px 1px #ccc;
	.dxyy-infw-tiplist {
		font-size: 20px !important;
		width: 100px;
		display: inline-block;
		text-align: right;
		text-align: justify;
		text-align-last: justify;
		text-justify: inter-ideograph;
	}
}
// 医疗赛事hover的样式
.ylss-hover {
	height: 40px;
	width: 280px;
	padding: 0 6px 0 1px;
	background: rgba(56, 73, 110, 0.6);
	border: 1px solid #00cdfe;
	position: relative;
	span {
		display: inline-block;
		color: #fff;
		font-size: 14px;
		font-weight: bold;
		text-align: center;
		line-height: 40px;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
	}
	&::after {
		position: absolute;
		bottom: -8px;
		left: 0;
		right: 0;
		margin: 0 auto;
		content: "";
		display: inline-block;
		width: 13px;
		height: 8px;
		background: url("../../assets/images/pop/lssj.png") center center no-repeat;
		background-size: 100% 100%;
	}
}
</style>
