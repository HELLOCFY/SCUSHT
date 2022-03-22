// pages/bindMyDormitory/bindMyDormitory.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    real_name: '',
    courtyard: '',
    unit: '',
    room: ''

  },
  onClickIcon() {
    wx.showModal({
      title: "请输入围合信息",
      content: "在您输入围合信息之后，您的信息将可被同围合的用户查询，同时您也能查询到其他用户信息"
    })
  },
  name_change(event) {
    this.setData({
      real_name: event.detail
    })
    console.log(this.data.real_name)

  },
  yard_change(event) {
    this.setData({
      courtyard: event.detail,
    })
    console.log(this.data.courtyard)
  },
  unit_change(event) {
    this.setData({
      unit: event.detail
    })
    console.log(this.data.unit)
  },
  room_change(event) {
    this.setData({
      room: event.detail
    })
    console.log(this.data.room)
  },

  onclick: function (event) {
    var yard = 0
    var unit1 = 0
    unit1 = parseInt(this.data.unit)
    yard = parseInt(this.data.courtyard)
    if (this.data.real_name !== '' && this.data.room !== '') {
      wx.request({
        url: 'https://example.com/user/dorm/',
        method: 'POST',
        data: {
          "wx_id": app.globalData.openid,
          "real_name": this.data.real_name, // 真实姓名
          "courtyard": yard, // 围合号
          "unit": unit1, // 单元号
          "room": this.data.room, // 寝室号
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data.result)
          if (res.data.result === "Success") {
            wx.showModal({
              title: '绑定成功',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateBack({
                    delta: 1,
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              }
            })
          }
          if (res.data.result !== "Success") {
            wx.showModal({
              title: '数据不全',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    }
    if (this.data.real_name === '' || this.data.room === '') {
      wx.showModal({
        title: '数据不全',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
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

  }
})