// pages/canvasImg/canvasImg.js
import { round } from './../../model/round.js'
import { deepCopy, arrayDeepCopy } from './../../utils/utils.js'
var Promise = require('./../../package/bluebird.min.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currRoundArray: [],
    roundArrays: [],
    defaultColor: 'white',
    curColor: '',
    mode: 'canvas',
    speed: '3档 FPS:1',
    speedVal: 1000,
    speedArray: [
      '7档 FPS:18',
      '(标准)6档 FPS:12',
      '5档 FPS:8',
      '4档 FPS:4',
      '2档 FPS:0.5',
      '(最慢)1档 FPS:0.25',
    ],
    imageArray: [

    ],
    years: [
      1990, 1991, 1992, 1993, 1994
    ],
    screesArray: [],
    currScreenIndex: 0,
    count: 0,
    cavasWidth: 0,
    canvasHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log('app', app.globalData.userInfo)
    this.userInfo = app.globalData.userInfo
    this.width = wx.getStorageSync('width')
    this.height = wx.getStorageSync('height')
  },
  premise:  function () {
    let self = this
    console.log('premise')
    return new Promise(function (resolve, reject) {
      var query = wx.createSelectorQuery()
      query.select('#myCanvas').boundingClientRect().exec(function (res) {

        self.setData({
          canvasWidth: res[0].width,
          canvasHeight: res[0].height
        })
      })
      self.setData({
        currRoundArray: self.initRoundArrray(),
        imageArray: []
      })
      self.ctx = wx.createCanvasContext('myCanvas')
      self.currScreenIndex = 0
      self.currRoundArray = self.initRoundArrray()
      setTimeout(function(){
        resolve()
      },200)
     
    })
  },
  oninit: function () {

    this.moveStartTime = Date.parse(new Date());
 
    console.log(1,this.screesArray)
    this.count = 0
    let self = this
    this.premise().then(function (res) {
      self.screesArray = []
      self.screesArray[0] = self.currRoundArray
      self.Canvas()

      self.generatorImage(500).then((imgArray) => {
        console.log('生成图片')
        self.setData({
          imageArray: imgArray
        })
      })
    })

  },
  initRoundArrray: function () {
    var arr = []
    for (let i = 0; i < 16; i++) {
      var arr2 = []
      for (let j = 0; j < 16; j++) {
        var r = new round("black", false)
        arr2[j] = r;
      }
      arr[i] = arr2
    }
    return arr
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.oninit()
    let that = this
    this.timer = setInterval(function () {
      if (this.change) {
        this.change = false;
        this.Canvas()

      }
      if (this.currScreenIndex != this.data.currScreenIndex || this.count != this.data.count) {
        this.setData({
          currScreenIndex: parseInt(this.currScreenIndex),
          count: this.count
        })
      }

      // console.log('canvas')
    }.bind(this), 100)
  },
  canvasRound(x, y, color) {
    // console.log(x,y,color)
    var ctx = this.ctx
    // Draw arc
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, 2 * Math.PI)
    ctx.setFillStyle(color)
    ctx.fill()
  },
  setRound(x, y, color) {
    console.log('setROund', this.currRoundArray[x - 1][y - 1].color, color)
    if (this.currRoundArray[x - 1][y - 1].color === color) {
      return
    } else {
      this.currRoundArray[x - 1][y - 1].color = color
      console.log(this.currRoundArray[x - 1][y - 1])
      this.change = true;
      // this.Canvas()
    }
  },
  Canvas(color = 'black') {
    let width = this.data.canvasWidth
    let height = this.data.canvasHeight
    console.log(this.currRoundArray)
    let ctx = this.ctx
    // console.log('canvas',this.roundArray)
    for (let i = 1; i <= 16; i++) {
      for (let j = 1; j <= 16; j++) {
        let r = this.currRoundArray[i - 1][j - 1]
        let x = (width-20)  / 16
        let y = (height-20)   / 16
        this.xSpacing = x;
        this.ySpacing = y;
        this.canvasRound(x * j, y * i, r.color)
      }
    }
    ctx.draw()
  },
  switchCanvasModel: function () {
    this.setData({
      mode: 'canvas'
    })
    wx.showToast({
      title: '画板',
      icon: 'success',
      duration: 500
    })
  },
  switchClearModel: function () {
    this.setData({
      mode: 'clear'
    })
    wx.showToast({
      title: '橡皮擦',
      icon: 'success',
      duration: 500
    })
  },


  bindInputColor: function (e) {
    this.setData({
      curColor: e.detail.value
    })
  },
  move: function (e) {
    console.log('yy')
    let touches = e.touches[0]
    let x = Math.round(touches.x / this.xSpacing)
    let y = Math.round(touches.y / this.ySpacing)

    var color = this.data.curColor === '' ? 'white' : this.data.curColor
    color = this.data.mode === 'canvas' ? color : 'black'
    this.setRound(y, x, color)
  },
  longpress: function (e) {
    console.log(e)
    let that = this
    let id = e.currentTarget.dataset.index
    wx.showActionSheet({
      itemList: ['复制', '删除', '删除所有桢'],
      success: function (res) {
        console.log(res)
        if (res.tapIndex == 0) {//复制
          that.addScreen(id)
        } else if (res.tapIndex == 1) {
          that.deleteScreen(id)
        } else if (res.tapIndex == 2) {
          console.log('delete')
          that.oninit()
        }
      }
    })
  },
  deleteScreen: function (item) {
    console.log('ff')
    this.currScreenIndex--
    this.count--
    let tmp = deepCopy(this.data.imageArray)
    this.Canvas()
    let flag = false
    for (let idx in tmp) {
      console.log(item)
      if (idx === item) {
        delete tmp[idx]
      } else if (idx > item) {
        tmp[idx - 1] = tmp[idx]
        delete tmp[idx]
      }
    }
    console.log(tmp)
    // delete tmp[item]
    this.setData({
      imageArray: tmp
    })
    console.log(tmp)
  },
  generatorImage: function (inter = 50) {

    let ctx = this.ctx
    let that = this
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas',
          success: function (res) {
            let idx = that.currScreenIndex
            let imgArray = deepCopy(that.data.imageArray)
            let img = {}
            img['path'] = res.tempFilePath
            imgArray[idx] = img

            // imgArray = null
            resolve(imgArray)
          }
        })
      }, inter)

    })

  },
  changeScreen: function (e) {
    let that = this
    let id = e.currentTarget.dataset.index
    if (this.currRoundArray === id) {
      return
    }
    this.screesArray[this.currScreenIndex] = deepCopy(this.currRoundArray)

    // this.screesArray[this.currScreenIndex] = this.currRoundArray'
    console.log(id, this.screesArray)
    that.currRoundArray = deepCopy(this.screesArray[id])
    this.currScreenIndex = id
    this.Canvas()


  },
  canvasImage: function (e) {
    console.log(e)
    let that = this
    this.generatorImage().then(function (imgArray) {
      console.log(imgArray)
      that.setData({
        "imageArray": imgArray
      })
    })
  },
  addScreen(currItem) {
    console.log('zb', currItem)
    let that = this
    this.count++
    this.currScreenIndex = this.count
    if (currItem === undefined) {
      this.currRoundArray = that.initRoundArrray()
    } else {
      this.currRoundArray = deepCopy(this.screesArray[currItem])
    }
    this.screesArray[this.currScreenIndex] = this.currRoundArray
    this.Canvas()
    this.generatorImage(50).then(function (imgArray) {
      that.setData({
        "imageArray": imgArray
      })
    })
  },
  onAddScreen: function (e) {
    let that = this
    this.addScreen()
    console.log(this.currRoundArray)

  },
  saveScreen: function (e) {
    let that = this
    let userInfo = this.userInfo
    console.log('userinfo', userInfo)
    wx.request({
      url: 'http://ng.wcs91.com:3000/screens',
      method: 'POST',
      data: {
        screenArray: that.screesArray,
        speed: that.data.speedVal,
        isTop: false,
        favorite: 0,
        avatarUrl: userInfo.avatarUrl
      },
      success: rtu => {
        console.log('return', rtu)
        let data = rtu.data
        wx.showModal({
          title: '提示',
          content: '图案保存成功',
          cancelText: '离开',
          confirmText: '继续创作',
          success: function (res) {
            if (res.confirm) {
              that.setData({
                id: data.id
              })
            } else if (res.cancel) {
              wx.redirectTo({ url: '/pages/index/index' })
            }

          }
        })
      }
    })
  },
  playAnimation() {
    let that = this
    that.currRoundArray = that.screesArray[0]
    console.log(that.screesArray)
    that.Canvas()
    let count = that.screesArray.length
    let speedVal = that.data.speedVal
    console.log(speedVal)
    return new Promise(function (resolve, reject) {
      for (let i = 1; i < that.screesArray.length; i++) {
        (function (j) {
          setTimeout(function () {
            that.currRoundArray = that.screesArray[j]
            that.Canvas()
            count = count - 1
            if (count === 1) {
              resolve()
            }
          }, (j + 1) * speedVal)
        })(i)
      }
      // resolve()
    })
  },
  Preview: function (e) {
    let idx = this.currScreenIndex

    let that = this
    this.playAnimation().then(function () {
      setTimeout(function () {
        wx.showToast({
          title: "播放完成",
          duration: 500
        })
        console.log('debug',that.screesArray)
        that.currRoundArray = that.screesArray[idx]
        that.Canvas()
      }, 500)

    })

  },
  scroll: function (e) {

  },
  changeSpeed: function (e) {
    let that = this

    wx.showActionSheet({
      itemList: that.data.speedArray,
      success: function (res, val) {
        let tapIndex = res.tapIndex

        let arr = [18, 12, 8, 4, 0.5, 0.25]
        console.log(1000 / arr[tapIndex], tapIndex)
        that.setData({
          speed: that.data.speedArray[tapIndex],
          speedVal: 1000 / arr[tapIndex]
        })
        console.log(res, val)
      }
    })
    console.log('change speed')
  }
})