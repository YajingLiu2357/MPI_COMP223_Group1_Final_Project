
Page({

  data: {
    jssj:'2021-03-22 19:36:00',  //假設充電完成结束时间
    timer:'', //倒计时定时器名称
    djs:{hour:'00',min:'00',sec:'00'}, //倒计时
  },
  onLoad: function (options) {
    let that = this;
    that.timeDown();
  },
  timeDown(){
    let that = this;
    that.setData({
      timer:setInterval(function(){
        var leftTime = parseInt((new Date(that.data.jssj.replace(/-/g,'/')).getTime()-new Date().getTime()));
        if(leftTime<=0){
          that.setData({
            djs:{hour:'00',min:'00',sec:'00'}
          });
          wx.showModal({                                     //到時彈窗
            title: 'TIPS',
            content: '閣下的充电桩已完成充電, 請盡快領取電池。',
            success (res) {
              if (res.confirm) {              //確定BUTTON
                console.log('用户点击确定')
              } else if (res.cancel) {        //取消BUTTON
                console.log('用户点击取消')
              }
            }
          })
          clearInterval(that.data.timer);   //倒計時結束後清除DATA
          return;
        }

        var h = parseInt(leftTime/1000/3600%24);  //小时
        var m = parseInt(leftTime/1000/60%60);    //分钟
        var s = parseInt(leftTime/1000%60);       //秒

        h < 10 ? h = '0' + h : h;
        m < 10 ? m = '0' + m : m;
        s < 10 ? s = '0' + s : s;
        that.setData({
          djs:{hour:h,min:m,sec:s}
        })
      },1000)
    })
  }
})




