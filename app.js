//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    console.log('onLaunch')
    let systemInfo = wx.getSystemInfoSync();
    console.log(systemInfo)
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('width', systemInfo.windowWidth)
    wx.setStorageSync('height', systemInfo.windowHeight)

    // 登录
    //1460eeca72351535011a32aceae54329
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('login', res)
     /*   wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            js_code: res.code.trim(),
            appid:'wx42023154480732f1',
            secret:'1460eeca72351535011a32aceae54329',
            grant_type:'authorization_code'
          },
          success:res=>{
            console.log('success',res)
            wx.showModal({
              title: '获取的ID',
              content: res.data.openid
            })
          }
        })*/
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })

        }
      },
      fail: res => {
        console.log('fail', res)
      }
    })
  },
  globalData: {
    userInfo: null
  },
  onShow: function (options) {
    console.log("onshow", options.scene)
  }
})