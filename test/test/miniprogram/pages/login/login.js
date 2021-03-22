Page({
  data:{
    username:null,
    password:null,
  },

  getUsername(event) {
  //  console.log('getUsername', event.detail.value)
    this.setData({username: event.detail.value})
  },

  getPassword(event) {
  //  console.log('getPassword', event.detail.value)
    this.setData({password: event.detail.value})
  },

  loginBtnClick(){
    let username=this.data.username
    let password=this.data.password
    console.log('login')
    console.log('username', username)
    console.log('password', password)

    if (username.length < 7 || username.length > 20){
      wx.showToast({
        icon:'none',
        title: 'Username must be between 7 to 20 characters'
      })
      return
    }
    if (password.length < 7 || password.length > 20){
      wx.showToast({
        icon:'none',
        title: 'Password must be between 7 to 20 characters'
      })
      return
    }
    
    wx.cloud.database().collection('user').where({
      username:username
    }).get({
      success(res) {
        let user=res.data[0]
        console.log("user", user)
        if (password == user.password) {
         // console.log("login success")
          wx.showToast({
            title: 'Login success',
          })

          wx.navigateTo({
            url: '../home/home?name=' + user.name,
          })

        }else{
        //  console.log("login fail")
        wx.showToast({
          icon:'none',
          title: 'Wrong password',
        })
        }
      },
      fail(res) {
        wx.showToast({
          icon:'none',
          title: 'Wrong username ',
        })
      }

    })
  },

  setupBtn(){
    wx.navigateTo({
      url: '/pages/setup/setup',
    })
  }

})