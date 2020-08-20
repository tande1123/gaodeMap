/*
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:58
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 14:58:58
 */
(function () {
  return {
    ploygonSymbols: {
      bufferCircle: {
        strokeColor: '#F77038', // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 1, // 线粗细度
        fillColor: '#F7A887', // 填充颜色
        fillOpacity: 0.5 // 填充透明度
      },
      bufferCircle2: {
        strokeColor: '#F77038', // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 1, // 线粗细度
        fillColor: '#F6C7B3', // 填充颜色
        fillOpacity: 0.35 // 填充透明度
      }
    },
    lineSymbols: {
      'lineBusA': {
        isOutline: false,
        outlineColor: '#ffeeff',
        borderWeight: 2,
        strokeColor: '#0E5D64',
        strokeOpacity: 1,
        strokeWeight: 6,
        // 折线样式还支持 'dashed'
        strokeStyle: 'solid',
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round'
      },
      'lineBusB': {
        isOutline: false,
        outlineColor: '#ffeeff',
        borderWeight: 2,
        strokeColor: '#5ade92',
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeStyle: 'solid',
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round'
      },
      'lineJhc': {
        strokeColor: '#D59469',
        strokeWeight: 2,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 5]
      },
      'lineJhcRed': {
        isOutline: false,
        outlineColor: '#ffeeff',
        borderWeight: 2,
        strokeColor: '#FF00FF',
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeStyle: 'solid',
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round'
      },
      // 定向越野的路线
      'linedxyy': {
        strokeColor: '#C500FF',
        strokeWeight: 4,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 5]
      },
      // 铁人三项路线
      'youyong_line': {
        strokeColor: '#3485FF',
        strokeWeight: 4,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 5]
      },
      'zixingche_line': {
        strokeColor: '#FF9A1B',
        strokeWeight: 4,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 5]
      },
      'malasong_line': {
        strokeColor: '#F62A1B',
        strokeWeight: 4,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 5]
      },
      // 新铁人三项线路
      'swim_line': {
        strokeColor: '#0985cd',
        strokeWeight: 3,
        strokeStyle: 'solid'
      },
      'bike_line': {
        strokeColor: '#e09600',
        strokeWeight: 3,
        strokeStyle: 'solid'
      },
      'running_line': {
        strokeColor: '#21b663',
        strokeWeight: 3,
        strokeStyle: 'solid'
      }
    },
    pictureMarkerSymbols: {
      '21000': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21000.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22000': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22000.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '23000': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/23000.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '24000': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/24000.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32000': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32000.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '39000': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/39000.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '44000': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/44000.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      'markerClose': {
        'markerWidth': 16,
        'markerHeight': 16,
        'markerDx': -8,
        'markerDy': -8,
        'markerRotation': 0,
        'markerFile': './static/assets/symbols/buffer/markerClose.png'
      },
      'markerResize': {
        'markerWidth': 40,
        'markerHeight': 26,
        'markerDx': -20,
        'markerDy': -13,
        'markerFile': './static/assets/symbols/buffer/markerResize.png'
      },
      'markerCenter': {
        'markerWidth': 30,
        'markerHeight': 30,
        'markerDx': -15,
        'markerDy': -15,
        'markerFile': './static/assets/symbols/buffer/markerCenter.png'
      },
      'eventWarnUnRead': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/eventWarnUnRead.png',
        'markerWidth': 60,
        'markerHeight': 60,
        'markerDx': -30,
        'markerDy': -30
      },
      'wrjAnimate': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/wrjAnimate.png',
        'markerWidth': 90,
        'markerHeight': 90,
        'markerDx': -45,
        'markerDy': -45
      },
      'eventWarnRead': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/eventWarnRead.png',
        'markerWidth': 60,
        'markerHeight': 60,
        'markerDx': -30,
        'markerDy': -30
      },
      'eventWarnReadCore2': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/eventWarnReadCore2.png',
        'markerWidth': 20,
        'markerHeight': 20,
        'markerDx': -10,
        'markerDy': -10
      },
      'eventWarnUnReadCore': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/eventWarnUnReadCore.png',
        'markerWidth': 20,
        'markerHeight': 20,
        'markerDx': -10,
        'markerDy': -10
      },
      'jiangan': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/jiangan.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'jianghan': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/jianghan.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'qiaokou': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/qiaokou.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'hanyang': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/hanyang.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'wuchang': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/wuchang.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'qingshan': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/qingshan.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'hongshan': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/hongshan.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'dongxihu': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/dongxihu.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'hannan': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/hannan.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'caidian': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/caidian.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'jiangxia': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/jiangxia.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'huangpi': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/huangpi.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      'xinzhou': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/xinzhou.png',
        'markerWidth': 76,
        'markerHeight': 34,
        'markerDx': -38,
        'markerDy': -17
      },
      '00000': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/00000.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      'bluepoint': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bluepoint.png',
        'markerWidth': 32,
        'markerHeight': 32,
        'markerDx': -16,
        'markerDy': -16
      },
      '43A01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/43A01.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      '47A00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/47A00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '47A01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/47A01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '47A02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/47A02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '47A03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/47A03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '47A04': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/47A04.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '47A05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/47A05.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '47A06': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/47A06.png',
        'markerWidth': 30,
        'markerHeight': 30,
        'markerDx': -15,
        'markerDy': -15
      },
      '47A07': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/47A07.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '47A99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/47A99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '46A00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/46A00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '46A01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/46A01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '46A02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/46A02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '46A03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/46A03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '46A09': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/46A09.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '46A14': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/46A14.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '43A00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/43A00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21D01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21D01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21D02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21D02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21D03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21D03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21D04': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21D04.png',
        'markerWidth': 23,
        'markerHeight': 23,
        'markerDx': -11.5,
        'markerDy': -11.5
      },
      '31J81': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31J81.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31J82': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31J82.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31J83': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31J83.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '831A': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/831A.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '831B': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/831B.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '831C': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/831C.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '831D': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/831D.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21A00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21A00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21A01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21A01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21B03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21B03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '23B00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/23B00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '23C00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/23C00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21B08': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21B08.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21A99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21A99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21F03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21F03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21G00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21G00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21H00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21H00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21D99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21D99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21D06': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21D06.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A04': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A04.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A05.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A06': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A06.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A07': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A07.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A08': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A08.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A09': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A09.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A10': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A10.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A11': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A11.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A12': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A12.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A13': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A13.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A14': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A14.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22C01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22C01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22C02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22C02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22C03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22C03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22C05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22C05.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22C99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22C99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A16': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A16.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22A15': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22A15.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22B04': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22B04.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22D00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22D00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21F00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21F00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21F01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21F01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21F02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21F02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '21G01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/21G01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22D01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22D01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22D02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22D02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22D03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22D03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22W01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22W01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22W02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22W02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22W03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22W03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22W04': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22W04.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22W05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22W05.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '22W06': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/22W06.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '24Y00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/24Y00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '29A00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/29A00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '29C00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/29C00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '29C01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/29C01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '29C02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/29C02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31B00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31B00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31B01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31B01.png',
        'markerWidth': 30,
        'markerHeight': 30,
        'markerDx': -15,
        'markerDy': -15
      },
      '31B02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31B02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31B03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31B03.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      '31B04': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31B04.png',
        'markerWidth': 30,
        'markerHeight': 30,
        'markerDx': -15,
        'markerDy': -15
      },
      '31B05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31B05.png',
        'markerWidth': 30,
        'markerHeight': 30,
        'markerDx': -15,
        'markerDy': -15
      },
      '31B06': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31B06.png',
        'markerWidth': 30,
        'markerHeight': 30,
        'markerDx': -15,
        'markerDy': -15
      },
      '31B08': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31B08.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31B09': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31B09.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31A00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31A00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31D00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31D00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31F00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31F00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31F02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31F02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31F05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31F05.png',
        'markerWidth': 30,
        'markerHeight': 30,
        'markerDx': -15,
        'markerDy': -15
      },
      '31F99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31F99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31G00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31G00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31G01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31G01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31C00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31C00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31E00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31E00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31H00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31H00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31H05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31H05.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31H13': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31H13.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31H18': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31H18.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31H21': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31H21.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31H99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31H99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31H03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31H03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31L00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31L00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32B00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32B00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32B01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32B01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32C00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32C00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32C05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32C05.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32D00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32D00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32D02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32D02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32D99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32D99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32E00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32E00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32E03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32E03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32F00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32F00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32F02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32F02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32F03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32F03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32G05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32G05.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32G09': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32G09.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32J05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32J05.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32J11': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32J11.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31J03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31J03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31J04': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31J04.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31J01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31J01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31J99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31J99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31K01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31K01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31Y00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31Y00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32A01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32A01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '32A99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/32A99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31L02002': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31L02002.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '31L01001': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/31L01001.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E01.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E02.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E03.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E04': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E04.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E05.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E06': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E06.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E07': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E07.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E08': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E08.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E09': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E09.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E10': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E10.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E11': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E11.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E12': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E12.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E13': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E13.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E14': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E14.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E15': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E15.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E16': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E16.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E17': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E17.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E18': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E18.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E19': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E19.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E20': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E20.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E21': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E21.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E22': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E22.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E23': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E23.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E24': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E24.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '42E99': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/42E99.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '45A00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/45A00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '45B00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/45B00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '45C00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/45C00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      '45D00': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/45D00.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      'IncidentPoint2': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/IncidentPoint2.png',
        'markerWidth': 32,
        'markerHeight': 38,
        'markerDx': -16,
        'markerDy': -19
      },
      'VIDEO': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/VIDEO.png',
        'markerWidth': 24,
        'markerHeight': 24,
        'markerDx': -12,
        'markerDy': -12
      },
      'mpStation': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/mpStation.png',
        'markerWidth': 30,
        'markerHeight': 36,
        'markerDx': -15,
        'markerDy': -18
      },
      'weatherStation': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/weatherStation.png',
        'markerWidth': 30,
        'markerHeight': 36,
        'markerDx': -15,
        'markerDy': -18
      },
      'swStation': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/swStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'bzStation': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bzStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'gqStation': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/gqStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'hzStation': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/hzStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'lakeStation': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/lakeStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'reservoirStation': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/reservoirStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'zsStation': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/zsStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'rainStation': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/rainStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'jcIco': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/jcIco.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'truckIco': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/truckIco.png',
        'markerWidth': 27,
        'markerHeight': 58,
        'markerRotation': 0,
        'markerDx': -13.5,
        'markerDy': -29
      },
      'carIco': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/carIco.png',
        'markerWidth': 22,
        'markerHeight': 58,
        'markerRotation': 0,
        'markerDx': -11,
        'markerDy': -29
      },
      'bcss': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bcss.png',
        'markerWidth': 31,
        'markerHeight': 50,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -35
      },
      'bcssfree': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bcssfree.png',
        'markerWidth': 31,
        'markerHeight': 50,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -35
      },
      'bcssActive': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bcssactive.png',
        'markerWidth': 31,
        'markerHeight': 50,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -35
      },
      'ditie': {
        'markerFile': './static/img/site/ditie_marker.png',
        'markerWidth': 30,
        'markerHeight': 44,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -35
      },
      'hospital': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/hospital.png',
        'markerWidth': 92,
        'markerHeight': 104,
        'markerRotation': 0,
        'markerDx': -46,
        'markerDy': -80
      },
      'hospcenter': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/hospcenter.png',
        'markerWidth': 92,
        'markerHeight': 104,
        'markerRotation': 0,
        'markerDx': -46,
        'markerDy': -80
      },
      'start': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/start.png',
        'markerWidth': 112,
        'markerHeight': 160,
        'markerRotation': 0,
        'markerDx': -56,
        'markerDy': -130
      },
      'end': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/end.png',
        'markerWidth': 112,
        'markerHeight': 160,
        'markerRotation': 0,
        'markerDx': -56,
        'markerDy': -130
      },
      'jhc': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/jhc.png',
        'markerWidth': 31,
        'markerHeight': 50,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -25
      },
      'jhcfree': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/jhcfree.png',
        'markerWidth': 31,
        'markerHeight': 50,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -25
      },
      'jhcactive': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/jhcactive.png',
        'markerWidth': 31,
        'markerHeight': 50,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -25
      },
      'G01': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bzStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'G02': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bzStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'G03': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bzStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'G04': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bzStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'G05': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bzStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'G06': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bzStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'G07': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/bzStation.png',
        'markerWidth': 30,
        'markerHeight': 38,
        'markerDx': -15,
        'markerDy': -19
      },
      'AqiDefault': { 'markerFile': './static/assets/symbols/aqi/default.png', 'markerWidth': 24, 'markerHeight': 24, 'markerDx': 0, 'markerDy': 12 },
      'Liang': { 'markerFile': './static/assets/symbols/aqi/liang.png', 'markerWidth': 24, 'markerHeight': 24, 'markerDx': 0, 'markerDy': 12 },
      'QingDuWuRan': { 'markerFile': './static/assets/symbols/aqi/qing.png', 'markerWidth': 24, 'markerHeight': 24, 'markerDx': 0, 'markerDy': 12 },
      'YanZhongWuRan': { 'markerFile': './static/assets/symbols/aqi/yan.png', 'markerWidth': 24, 'markerHeight': 24, 'markerDx': 0, 'markerDy': 12 },
      'You': { 'markerFile': './static/assets/symbols/aqi/you.png', 'markerWidth': 24, 'markerHeight': 24, 'markerDx': 0, 'markerDy': 12 },
      'ZhongDuWuRan': { 'markerFile': './static/assets/symbols/aqi/zhong.png', 'markerWidth': 24, 'markerHeight': 24, 'markerDx': 0, 'markerDy': 12 },
      'ZhongDuWuRan4': { 'markerFile': './static/assets/symbols/aqi/zhong4.png', 'markerWidth': 24, 'markerHeight': 24, 'markerDx': 0, 'markerDy': 12 },
      'com': {
        'markerFile': './static/assets/symbols/pictureMarkerSymbols/IncidentPoint2.png',
        'markerWidth': 32,
        'markerHeight': 38,
        'markerDx': -16,
        'markerDy': -19
      },
      // 定向越野参赛人员
      'csry_people': {
        'markerFile': './static/assets/img/dxyy/dxyy_people.png',
        'markerWidth': 30,
        'markerHeight': 44,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -35
      },
      'csry_people_active': {
        'markerFile': './static/assets/img/dxyy/dxyy_people_active.png',
        'markerWidth': 42,
        'markerHeight': 64,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -35
      },
      // 定向越野 起点
      'dxyy_start': {
        'markerFile': './static/assets/img/dxyy/start.png',
        'markerWidth': 30,
        'markerHeight': 45,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -35
      },
      // 定向越野 终点
      'dxyy_end': {
        'markerFile': './static/assets/img/dxyy/end.png',
        'markerWidth': 30,
        'markerHeight': 45,
        'markerRotation': 0,
        'markerDx': -15,
        'markerDy': -35
      },
      // 铁人三项
      // 男子
      'trsx_man': {'markerFile': './static/assets/img/trsx/man_marker.png', 'markerWidth': 30, 'markerHeight': 44, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      'trsx_man_active': {'markerFile': './static/assets/img/trsx/man_marker_active.png', 'markerWidth': 42, 'markerHeight': 64, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      // 混合团体
      'trsx_hunhe_team': {'markerFile': './static/assets/img/trsx/hunhe_team_marker.png', 'markerWidth': 30, 'markerHeight': 44, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      'trsx_hunhe_team_active': {'markerFile': './static/assets/img/trsx/hunhe_team_marker_active.png', 'markerWidth': 42, 'markerHeight': 64, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      // 女子
      'trsx_wuman': {'markerFile': './static/assets/img/trsx/wuman_marker.png', 'markerWidth': 30, 'markerHeight': 44, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      'trsx_wuman_active': {'markerFile': './static/assets/img/trsx/wuman_marker_active.png', 'markerWidth': 42, 'markerHeight': 64, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      // 女子团体
      'trsx_wuman_team': {'markerFile': './static/assets/img/trsx/wuman_team_marker.png', 'markerWidth': 30, 'markerHeight': 44, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      'trsx_wuman_team_active': {'markerFile': './static/assets/img/trsx/wuman_team_marker_active.png', 'markerWidth': 42, 'markerHeight': 64, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      // 男子团体
      'trsx_man_team': {'markerFile': './static/assets/img/trsx/man_team_marker.png', 'markerWidth': 30, 'markerHeight': 44, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      'trsx_man_team_active': {'markerFile': './static/assets/img/trsx/man_team_marker_active.png', 'markerWidth': 42, 'markerHeight': 64, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      // 自行车
      'trsx_zixingche': {'markerFile': './static/assets/img/trsx/zixingche_marker.png', 'markerWidth': 30, 'markerHeight': 44, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      'trsx_zixingche_active': {'markerFile': './static/assets/img/trsx/zixingche_marker_active.png', 'markerWidth': 42, 'markerHeight': 64, 'markerRotation': 0, 'markerDx': -15, 'markerDy': -35},
      'triathStart': {
        'markerFile': './static/assets/img/trsx/起点.png',
        'markerWidth': 30,
        'markerHeight': 44,
        'markerDx': -15,
        'markerDy': -22
      },
      'triathEnd': {
        'markerFile': './static/assets/img/trsx/终点.png',
        'markerWidth': 30,
        'markerHeight': 44,
        'markerDx': -15,
        'markerDy': -22
      },
      'triathSwim': {
        'markerFile': './static/assets/img/trsx/游泳.png',
        'markerWidth': 20,
        'markerHeight': 20,
        'markerDx': -10,
        'markerDy': -10
      },
      'triathBike': {
        'markerFile': './static/assets/img/trsx/自行车.png',
        'markerWidth': 20,
        'markerHeight': 20,
        'markerDx': -10,
        'markerDy': -10
      },
      'triathRunning': {
        'markerFile': './static/assets/img/trsx/跑步.png',
        'markerWidth': 20,
        'markerHeight': 20,
        'markerDx': -10,
        'markerDy': -10
      }
    }
  }
})()
