// pages/map/map.js
var QQMapWX = require('qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({key:'2CTBZ-ZC2KR-YETWZ-WXVZG-YF4K7-CUB4F'})
const RADIUS = 4;
var lat = new Array(22.190470,22.188254,22.191776,22.190067,22.189586,22.187206,22.185999,22.185170);
var lon = new Array(113.557048,113.556393,113.558754,113.554838,113.557912,113.558657,113.556747,113.558486);
var sta = new Array("A","U","U","A","U","A","A","A");
var nearestId = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 22.190981,
    longitude:113.556511,
    markers: [{
      id: 1,
      latitude: 22.190470,
      longitude: 113.557048,
      name:'charging pile M01',
      callout: {
          content: 'viable',
          padding: 1,
          display: 'BYCLICK',
          fontSize: 14,
          color: '#74C389',
          borderColor: '#17202A',
          textAlign: 'center',
          borderRadius: RADIUS,
          borderWidth: 1,
          bgColor: '#ffffff'
      }
    },{
      id: 2,
      latitude: 22.188254,
      longitude: 113.556393,
      name:'charging pile M02',
      callout: {
        content: 'unavailable',
        padding: 1,
        display: 'BYCLICK',
        fontSize: 14,
        color: '#E74C3C',
        borderColor: '#17202A',
        textAlign: 'center',
        borderRadius: RADIUS,
        borderWidth: 1,
        bgColor: '#ffffff'
    }
    },{
      id: 3,
      latitude: 22.191776,
      longitude: 113.558754,
      name:'charging pile M03',
      callout: {
        content: 'unavailable',
        padding: 1,
        display: 'BYCLICK',
        fontSize: 14,
        color: '#E74C3C',
        borderColor: '#17202A',
        textAlign: 'center',
        borderRadius: RADIUS,
        borderWidth: 1,
        bgColor: '#ffffff'
    }
    },{
      id: 4,
      latitude: 22.190067,
      longitude: 113.554838,
      name:'charging pile M04',
      callout: {
        content: 'viable',
        padding: 1,
        display: 'BYCLICK',
        fontSize: 14,
        color: '#74C389',
        borderColor: '#17202A',
        textAlign: 'center',
        borderRadius: RADIUS,
        borderWidth: 1,
        bgColor: '#ffffff'
    }
    },{
      id: 5,
      latitude: 22.189586,
      longitude: 113.557912,
      name:'charging pile M05',
      callout: {
        content: 'unavailable',
        padding: 1,
        display: 'BYCLICK',
        fontSize: 14,
        color: '#E74C3C',
        borderColor: '#17202A',
        textAlign: 'center',
        borderRadius: RADIUS,
        borderWidth: 1,
        bgColor: '#ffffff'
    } 
    },{
      id: 6,
      latitude: 22.187206,
      longitude: 113.558657,
      name:'charging pile M06',
      callout: {
        content: 'viable',
        padding: 1,
        display: 'BYCLICK',
        fontSize: 14,
        color: '#74C389',
        borderColor: '#17202A',
        textAlign: 'center',
        borderRadius: RADIUS,
        borderWidth: 1,
        bgColor: '#ffffff'
    } 
    },{
      id: 7,
      latitude: 22.185999,
      longitude: 113.556747,
      name:'charging pile M07',
      callout: {
        content: 'viable',
        padding: 1,
        display: 'BYCLICK',
        fontSize: 14,
        color: '#74C389',
        borderColor: '#17202A',
        textAlign: 'center',
        borderRadius: RADIUS,
        borderWidth: 1,
        bgColor: '#ffffff'
    }
    },{
      id: 8,
      latitude: 22.185170,
      longitude: 113.558486,
      name:'charging pile M08',
      callout: {
        content: 'viable',
        padding: 1,
        display: 'BYCLICK',
        fontSize: 14,
        color: '#74C389',
        borderColor: '#17202A',
        textAlign: 'center',
        borderRadius: RADIUS,
        borderWidth: 1,
        bgColor: '#ffffff'
    } 
    }],
    polyline:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**getData: function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res){
        var latitude = res.latitude,
        var longitude = res.longitude,
        this.setData({
          latitude: latitude,
          longitude: longitude,
        })
      }
    })

  },*/

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      type: 'gcj02',
      success: function(res){
         console.log(res.longitude)
         console.log(res.latitude)
       }
     })
     this.mapCtx.moveToLocation({
     })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  findNearest: function(){
    var _this = this;
    console.log(_this.latitude);
    console.log(_this.longitude);
    qqmapsdk.calculateDistance({
      mode: 'straight',
      from: this.latitude+this.longitude || '',
      /**from: {
        latitude: _this.latitude,
        longitude: _this.longitude
      },*/
      to:[{
        latitude: 22.190470,
        longitude: 113.557048
      },{
        latitude: 22.188254,
        longitude: 113.556393
      },{
        latitude: 22.191776,
        longitude: 113.558754
      },{
        latitude: 22.190067,
        longitude: 113.554838
      },{
        latitude: 22.189586,
        longitude: 113.557912
      },{
        latitude: 22.187206,
        longitude: 113.558657
      },{
        latitude: 22.185999,
        longitude: 113.556747
      },{
        latitude: 22.185170,
        longitude: 113.558486
      }], 
      success: function (res){
        var res = res.result;
        console.log(res.elements);
        for(var i = 0;i < res.elements.length ; i++){
          if(res.elements[i].distance < res.elements[nearestId].distance && sta[i] == "A"){
            nearestId = i;
          }
        }
        console.log(res);
        console.log(nearestId);
        console.log(lat[nearestId]);
        console.log(lon[nearestId]);
        _this.setData({
          markers:[{
            latitude: lat[nearestId],
            longitude: lon[nearestId],
            callout: {
              content: 'Nearest viable',
              padding: 1,
              display: 'ALWAYS',
              fontSize: 14,
              color: '#74C389',
              borderColor: '#17202A',
              textAlign: 'center',
              borderRadius: RADIUS,
              borderWidth: 1,
              bgColor: '#ffffff'
            } 
          }]
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
    qqmapsdk.direction({
      mode: 'driving',
      from: this.latitude+this.longitude || '',
      /**from: {
        latitude: _this.latitude,
        longitude: _this.longitude
      },*/
      to: {
        latitude: lat[nearestId],
        longitude: lon[nearestId]
      },
      success: function (res) {
        console.log(res);
        console.log(lat[nearestId]);
        console.log(lon[nearestId]);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        console.log('11111111111111111111')
        console.log(pl[0].latitude);
        console.log(pl[0].longitude);
        _this.setData({
          latitude:pl[0].latitude,
          longitude:pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
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

  }
})