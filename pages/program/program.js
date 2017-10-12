
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    hidden: false,
    nocancel: false,
    nodes:[
      {
        name:'h2',
        attrs:{
          class:'div_class',
          style:'line-height:60px;color:red'
        },
        children:[{
          type:'text',
          text:'wenchangshou'
        }]
      }
    ],
    imageList:[
      {
        url:'1.jpg'
      }, {
        url: '2.jpg'
      }, {
        url: '3.jpg'
      }, {
        url: '4.jpg'
      }, {
        url: '5.jpg'
      }, {
        url: '6.jpg'
      }
    ]
  },
  scroll: function (e) {
    console.log(e)
    
  },
  onLoad:function(e){
    console.log('onload',e)
    console.log(getCurrentPages())
    this.setData({
      'array[0].message':'wenchangshou'
    })
  },
  onPullDownRefresh:function(){
    console.log("pulldown")
  },
  show:function(){
   
  },
  confirm:function(){
    console.log('confirm')
  },
  cancel:function(){
    this.setData({
      hidden:false
    })
  },
  showMap:function(){
    wx.openLocation({
      latitude: 39.92656,
      longitude: 116.45345,
      name:"视渠时代",
      address:"北京朝阳区中纺里37号院14号1002"
    })
  },
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '17090084440',
    })
  }
})
