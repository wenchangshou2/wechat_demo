// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    second_height:0,
    limit:20,
    page:0,
    screensArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    let height=wx.getStorageSync("height")||0
    this.setData({
      second_height:height
    })
    wx.request({
      url: 'http://ng.wcs91.com:3000/screens',
      method: 'GET',
      success:function(res){
        console.log(res)
        that.setData({
          screensArray:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  scroll:function(e){
    console.log('fff')
  }
})