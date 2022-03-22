// pages/wearCommend/wearCommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: "",
    season: "",
    url: ""
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

  },
  chooseSex(e) {
    let temp = e.detail.value;
    this.setData({
      sex: temp
    })
  },
  chooseSeason(e) {
    let temp = e.detail.value;
    this.setData({
      season: temp
    })
  },
  submit() {
    let sex = this.data.sex;
    let season = this.data.season;
    wx.request({
      url: "https://example.com/wear/commend",
      method: 'POST',
      data: {
        "gender": sex,
        "season": season
      },
      success: res => {
        this.setData({
          url: res.data.url
        })
        wx.showModal({
          title: "获取成功",
          content: "您可以再次点击提交按钮进行刷新"
        })
      }
    })
  }
})