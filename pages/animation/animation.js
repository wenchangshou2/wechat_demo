// pages/animation/animation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:{},
    brightness:'',
    tempFilePaths:'',
    ctx:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.ctx=wx.createCanvasContext('myCanvas')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  left:function(e){
    var animation=wx.createAnimation({
      duration:1000,
      timingFunction:'linear'
    })
    
    this.animation=animation
    animation.translate(50).step()
    animation.scale(2).step()
    this.setData({
      animationData:animation.export()
    })
  },
  vibrate:function(e){
    wx.vibrateLong({
      
    })
  },
  jietu:function(){

    console.log('jietu')
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function (res) {
            console.log(res)
            var savedFilePath = res.savedFilePath
          }
        })
      }
    })
  },
  getfile:function(){
    console.log(wx.getSavedFileList({
      success:function(res){
        console.log(res)
      }
    }))
  },
  getBrightness:function(){
    let that=this;
    wx.getScreenBrightness({
      success:function(res){
        console.log(res)
        that.setData({
          brightness:res.value
        })
      }
    })
  },
  canvas:function(x,y){
    const ctx=this.ctx
    // Draw arc
    ctx.beginPath()
    ctx.arc(150, 75, 10, 0, 2 * Math.PI)
    ctx.setFillStyle('red')
    ctx.fill()

    ctx.draw()
  }, 
  
  start:function(e){
    console.log(e)
  },
  move:function(e){
    console.log(e)
  },
  saveImage:function(e){
    let that=this
    wx.canvasToTempFilePath({
      x: 100,
      y: 200,
      width: 50,
      height: 50,
      destWidth: 100,
      destHeight: 100,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        that.setData({
          tempFilePaths:res.tempFilePath
        })
      } 
    })
  }
})