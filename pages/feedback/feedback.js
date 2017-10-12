// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '未知',
    name: '',
    xb: '',
    city: '',
    animationData:{}
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
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.setData({
          code: res.result
        })
      }
    })
  },
  login: function () {
    let that = this
    wx.login({
      success: function (res) {
        console.log('login',res)
        wx.request({
          url: 'https://test.com/onLogin',
          data: {
            code: res.code
          },
          success:res=>{
            console.log('ff')
          }
        })
        wx.getUserInfo({
          success: function (res) {
            console.log(res, res.userInfo)
            let userInfo = res.userInfo
            that.setData({
              name: userInfo.nickName,
              xb: userInfo.gender == 1 ? '男' : '女',
              city: userInfo.city
            })
          }
        })
      }
    })
  },
  getPhone: function (e) {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })

  },
  showToast: function (e) {
    // wx.showToast({
    //   title: '成功',
    //   icon:'success',
    //   duration:1000
    // })
    // wx.showLoading({
    //   title: '正在加载',

    // })
    // setTimeout(()=>{
    //   wx.hideLoading();
    // },2000)
    // wx.showModal({
    // title: 'modal',
    // content: '这是一个modal框',
    // cancelText:'确认取消',
    // success:function(e){
    //   console.log('你点了确认')
    // }
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success: function (e) {
    //     console.log(e)
    //   }
    // })
    wx.setNavigationBarTitle({
      title: '这是一个导航',
      success:function(e){
        console.log('success')
      }
    })
  },
  show:function(){
    var animation=wx.createAnimation({
      duration:1000,
      timingFunction:'linear'
    })
    this.animation=animation
    animation.translate(50,20).rotate(180).step()
    animation.translate(-50,-20).rotate(180).step()
    this.setData({
      animationData:animation.export()
    })
    console.log('f')
    setTimeout(function(){
      animation.translate(30).step()
    console.log('timeout')
      this.setData({
        animationData:animation.export()
      })
    }.bind(this),2000)
  }

})