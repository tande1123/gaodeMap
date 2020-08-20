const fs = require('fs')
const path = require('path')
const config = require('../config')
const packageJson = require('../package.json')

function Logger () {}
[
  [ 'warn', '\x1b[35m' ],
  [ 'error', '\x1b[31m' ],
  [ 'log', '\x1b[2m' ]
].forEach(function (pair) {
  const method = pair[0]
  const reset = '\x1b[0m'
  const color = '\x1b[36m' + pair[1]
  Logger.prototype[method] = console[method].bind(console, color, method.toUpperCase(), reset)
})

const consoleLog = new Logger()

let isOk = true
if (!config.dev.useEslint) {
  isOk = false
  consoleLog.error('Set config.dev.useEslint = true.')
  consoleLog.warn('请设置 config.dev.useEslint = true.')
  consoleLog.log(path.join(__dirname, '../config'))
}
readDirSync(path.join(__dirname, '../src'))

if (!isOk) {
  process.exit(1)
}

function readDirSync (path) {
  const files = fs.readdirSync(path)
  files.forEach(function (ele) {
    const info = fs.statSync(path + '/' + ele)
    if (info.isDirectory()) {
      checkMd(path + '/' + ele)
      readDirSync(path + '/' + ele)
    } else {
      checkComments(path + '/' + ele)
    }
  })
}
function checkComments (file) {
  const extname = path.extname(file)
  if (extname === '.vue' || extname === '.js') {
    const lines = fs.readFileSync(file).toString().replace(/(^\s*)|(\s*$)/g, '')
    if (lines.startsWith('<!--') || lines.startsWith('/*')) {

    } else {
      consoleLog.error('Add file header comments.')
      consoleLog.warn('请添加文件头部注释.')
      consoleLog.log(file)
      isOk = false
    }
  }
}
function checkMd (folder) {
  const fileRegExp = /^.*\.(md|MD)$/
  const files = fs.readdirSync(folder)
  let isHaveMd = false
  files.forEach(function (ele) {
    const fullFilePath = folder + '/' + ele
    const info = fs.statSync(fullFilePath)
    if (info.isFile() && fileRegExp.test(fullFilePath)) {
      isHaveMd = true
    }
  })
  if (!isHaveMd && includeFolder(folder)) {
    consoleLog.error('Add .md file.')
    consoleLog.warn('文件夹下缺少 md 注释文件.')
    consoleLog.log(path.join(folder))
    isOk = false
  }
}

function includeFolder (folder) {
  let result = false
  const { checkMds } = packageJson
  if (checkMds instanceof Array && checkMds.length > 0) {
    checkMds.forEach(e => {
      if (folder.includes(e)) {
        result = true
      }
    })
  }
  return result
}
