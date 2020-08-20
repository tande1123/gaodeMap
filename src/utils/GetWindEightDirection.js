/*
 * @Descripttion: Descripttion
 * @version: version
 * @Author: Do not Edit
 * @Date: 2019-08-09 14:58:57
 * @LastEditors: qiulongwen
 * @LastEditTime: 2019-08-09 15:23:51
 */
/**
 * @name:
 * @param : undefined
 * @return : undefined
 * 根据接口返回风向描述
 */
function GetWindEightDirection (dir, speed) {
  var retString = ''
  if (speed === 0) {
    retString = '静风'
  } else {
    var grade = 0
    var val = parseFloat(dir) + 25
    if (val < 360) {
      grade = parseInt(Math.floor(val / 45))
    } else {
      grade = 0
    }
    switch (grade) {
      case 0:
        retString = '北'
        break
      case 1:
        retString = '东北'
        break
      case 2:
        retString = '东'
        break
      case 3:
        retString = '东南'
        break
      case 4:
        retString = '南'
        break
      case 5:
        retString = '西南'
        break
      case 6:
        retString = '西'
        break
      case 7:
        retString = '西北'
        break
    }
  }
  return retString
}
export default {
  GetWindEightDirection
}
