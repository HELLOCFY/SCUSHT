// pages/viewMessage/viewMessage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    answer: "",
    last_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: "https://example.com/query/mypost/", //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        var i = 0;
        for (i in res.data) {
          res.data[i].time = res.data[i].time.substring(0, 10) + " " + res.data[i].time.substring(res.data[i].time.length - 8, res.data[i].time.length)
        }
        this.setData({
          answer: res.data, //answer为一个数组
        });
        console.log(this.data.answer);
      }
    })
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
    this.onLoad()
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
    this.onLoad()
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
  postAMessage() {
    wx.navigateTo({
      url: '/pages/postAMessage/postAMessage',
    })
  },

  showAMessage(e) {
    let index = e.currentTarget.dataset.index; //temp为服务器返回数组的index
    let post_id = this.data.answer[index].post_id
    wx.navigateTo({
      url: `/pages/deleteMessage/deleteMessage?post_id=${post_id}`,
    })
    //console.log(post_id)
    app.globalData.post_id = post_id;
  }
})