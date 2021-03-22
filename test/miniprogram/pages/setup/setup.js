Page({
  data:{
    name:null,
    username:null,
    password:null,
  },

  getName(event) {
    console.log('getName', event.detail.value)
    this.setData({name: event.detail.value})
  },

  getUsername(event) {
    console.log('getUsername', event.detail.value)
    this.setData({username: event.detail.value})
  },

  getPassword(event) {
    console.log('getPassword', event.detail.value)
    this.setData({password: event.detail.value})
  },

  setupBtnClick(){
    let name=this.data.name
    let username=this.data.username
    let password=this.data.password
    console.log('setup')
    console.log('name', name)
    console.log('username', username)
    console.log('password', password)

    if (name.length < 2 || name.length > 15){
      wx.showToast({
        icon:'none',
        title: 'Name must be between 2 to 15 characters'
      })
      return
    }
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
    
    wx.cloud.database().collection('user').add({
      data: {
        name: name,
        username: username,
        password: password,
      },

      success(){
        wx.showToast({
          title: 'Setup success',
        })
        wx.navigateTo({
          url: '../login/login',
        })
      },

      fail(){
        wx.showToast({
        title: 'Setup fail',
        })
      },
    })

    

  }

})