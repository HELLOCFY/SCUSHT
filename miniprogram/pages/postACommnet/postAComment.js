// pages/postAMessage/postAMessage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  //在点击了保存按钮之后接受到的前端的标题和内容
  save: function (e) {
    var title = e.detail.value.title.trim();
    var content = e.detail.value.content.trim();
    console.log(e);
  },
  howToUse() {
    wx.showModal({
      title: '使用说明：',
      content: '请遵守社区规则！！！\r\n如果需要上传图片请点击上传附件按钮。',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  contentInput: function (e) {
    this.setData({
      contentVal: e.detail.value
    })
    console.log(this.data.contentVal)
  },
  save() {
    //console.log(this.data.titleVal)  
    //console.log(this.data.contentVal)
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var Content = this.data.contentVal;
    wx.request({
      url: "https://example.com/post/comment/", //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        // "wx_id" : app.globalData.openid, // 微信号
        // "content" : Content, // 帖子内容
        // "title" : Title // 帖子标题
        "wx_id": app.globalData.openid, // 微信号
        "post_id": this.data.post_id, // 帖子id
        "content": Content //评论内容
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data);
        setTimeout(function () {
          wx.showToast({
            title: '评论成功',
            duration: 2000,
            icon: "success",
          })
        }, 500)

        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },













  data: {
    contentVal: "",
    post_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const post_id = options.post_id;
    console.log(options.post_id);  //传回来的点击贴子的post_id
    this.setData({
      post_id: post_id
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