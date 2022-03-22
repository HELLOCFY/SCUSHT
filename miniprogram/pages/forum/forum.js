// pages/clotheIndex/clotheIndex.js
Page({

  /**
   * 页面的初始数据
   */
  //获取今日穿搭推荐
  getTodayClothe(){
    wx.showModal({
      title: '今日穿搭推荐为：',
      content: '（此处填写随机获取的一个穿搭推荐）',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //转到发帖界面执行发帖操作
  postAMessage(){
    wx.navigateTo({
      url: '/pages/postAMessage/postAMessage',
    })
  },

  //使用说明书
  howToUse(){
    wx.showModal({
      title: '使用说明：',
      content: '点击发帖按钮可以进行发帖操作，贴子可以包含文字和图片；点击查看发帖信息可以进行查看操作，在查看时，您可以输入关键词进行查询；如果您需要删除您的贴子或者评论，请到我的-->贴子管理/评论管理中进行删除。',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 查看其余用户的发帖信息
  viewMessage(){
    wx.navigateTo({
      url: '/pages/viewMessage/viewMessage',
    })
  },







  data: {

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