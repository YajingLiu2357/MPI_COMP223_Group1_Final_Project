// pages/user/user.js
const app = getApp()

Page({
  data: {
    name:''
  },

  onLoad: function(options) {
    console.log("options", options)
    this.setData({
      name:options.name
    })
  },

  onReady:function(){
  },

  onShow:function(){
  },

  onHide:function(){
  },

  onUnload:function(){
  },

 // userBtn(){
 //   wx.navigateTo({
 //     url: '../user/user?name=' 
 //   })
//  },

})