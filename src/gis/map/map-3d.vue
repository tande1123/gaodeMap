<!--
 * @Description: 地图核心组件
 * @version: 0.1.0
 * @Author:
 * @Date: 2018-12-04 13:38:01
 * @LastEditors: wsw
 * @LastEditTime: 2019-03-11 11:10:34
 -->
<template>
  <div id="map3d_container"></div>

</template>

<script>
import AMap from 'AMap'
import { mapGetters, mapActions } from 'vuex'
let self
export default {
  data () {
    return {
      lon: 0,
      lat: 0,
      angle: 0,
      buildingData: [],
      bmpurl: './static/assets/data/join.jpg',
      mtlurl: './static/assets/data/number_2.mtl',
      objurl: './static/assets/data/number_2.obj'
    }
  },
  /**
   * @name: 监听配置文件加载
   */
  watch: {
    configLoaded () {
      this.configLoaded && this.initMap()
    }
  },
  /**
   * @name: 从store中取数据
   */
  computed: {
    ...mapGetters(['configLoaded', 'config', 'symbol'])
  },
  mounted () {
    self = this
    this.$nextTick(() => {
      this.configLoaded && this.initMap()
    })
  },
  methods: {
    ...mapActions(['setMap', 'setMapLoaded', 'setConfig', 'setSymbol', 'setLayerTree', 'setConfigLoaded', 'loadConfig']),
    /**
   * @name: 地图初始化
   */
    initMap () {
      if (this.configLoaded) {
        this.doInit()
        this.load3dModel()
      }
    },
    doInit () {

    },
    // 获取模型位置配置文件
    load3dModel () {
      this.$store.dispatch('fetchBuildingJson').then((result) => {
        this.buildingData = result[0].building
        console.log('buildingData', this.buildingData)
        this.add3DModel()
      })
    },
    // 添加3D模型
    add3DModel () {
      const map = new AMap.Map('map3d_container', {
        viewMode: '3D',
        showBuildingBlock: false,
        center: [114.2933, 30.42672],
        pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
        zoom: 17,
        mapStyle: 'amap://styles/darkblue'
      })
      let circle = new AMap.Circle({
        center: [114.2943, 30.42873],
        map: map,
        radius: 700,
        fillColor: 'white',
        strokeWeight: 1,
        strokeColor: 'white',
        strokeOpacity: 0.01,
        fillOpacity: 0.05
      })
      const _map3d = {
        // 地图实例
        getInstance () {
          return map
        }
      }
      this.$store.commit('setMap3d', _map3d)
      map.add(circle)
      // 环境光源
      map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 1)
      // 平行光源
      map.DirectionLight = new AMap.Lights.DirectionLight([1, 0, -0.5], [1, 1, 1], 0.5)
      this._loadModel(map)
    },
    // 加载模型
    // @private
    _loadModel (map) {
      var objLoader = new THREE.OBJLoader2()
      var callbackOnLoad = function (event) {
        console.log('objLoader111111111')
        console.log('objLoader', self.buildingData)

        var object3Dlayer = new AMap.Object3DLayer()
        for (let k = 0; k < self.buildingData.length; k++) {
          self.lat = self.buildingData[k].latitude
          self.lon = self.buildingData[k].longitude
          self.angle = self.buildingData[k].yall

          var meshes = event.detail.loaderRootNode.children
          for (var i = 0; i < meshes.length; i++) {
            var vecticesF3 = meshes[i].geometry.attributes.position
            var vecticesNormal3 = meshes[i].geometry.attributes.normal
            var vecticesUV2 = meshes[i].geometry.attributes.uv

            var vectexCount = vecticesF3.count

            var mesh = new AMap.Object3D.MeshAcceptLights()

            var geometry = mesh.geometry
            var c, opacity

            var material = meshes[i].material[0] || meshes[i].material
            // debugger
            if (material.map) { mesh.textures.push(self.bmpurl) }

            c = material.color
            opacity = material.opacity

            // debugger
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
            // debugger
            mesh.DEPTH_TEST = material.depthTest
            // mesh.backOrFront = 'both'
            mesh.transparent = opacity < 1
            mesh.scale(12, 12, 12)
            mesh.rotateZ(self.angle)
            mesh.position(new AMap.LngLat(self.lon, self.lat))
            object3Dlayer.add(mesh)
          }
          // map.setCenter([self.lon, self.lat])
        }
        map.add(object3Dlayer)
      }
      var onLoadMtl = function (materials) {
        var modelName = 'building'
        objLoader.setModelName(modelName)
        objLoader.setMaterials(materials)
      }
      objLoader.loadMtl(self.mtlurl, null, onLoadMtl)
      objLoader.load(self.objurl, callbackOnLoad, null, null, null, false)
    }
  }
}

</script>
<style>
#map3d_container {
  width: 100%;
  height: 100%;
}
#map3d_container .amap-logo {
  left: -1000px !important;
  display: none !important;
}
#map3d_container .amap-copyright {
  opacity: 0;
}
</style>
