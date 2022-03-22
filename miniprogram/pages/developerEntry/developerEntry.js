// pages/developerEntry/developerEntry.js
const app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    answer: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: "https://example.com/admin/report_query/",
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        if (res.result == 'Sucess') { } {
          var i = 0;
          for (i in res.data.data) {
            var j = 0, a = '';
            res.data.data[i].str = ''
            for (j in res.data.data[i].report_class) {
              if (res.data.data[i].report_class[j] == 0) {
                a = '色情低俗'
              }
              if (res.data.data[i].report_class[j] == 1) {
                a = '政治敏感'
              }
              if (res.data.data[i].report_class[j] == 2) {
                a = '血腥暴力'
              }
              if (res.data.data[i].report_class[j] == 3) {
                a = '个人信息侵犯'
              }
              if (res.data.data[i].report_class[j] == 4) {
                a = '虚假信息'
              }
              if (res.data.data[i].report_class[j] == 5) {
                a = '钓鱼/引战'
              }
              if (res.data.data[i].report_class[j] == 6) {
                a = '欺诈/赌博'
              }
              res.data.data[i].str = res.data.data[i].str + ' ' + a;
            }

          }
          this.setData({
            answer: res.data.data, //answer为一个数组
          });
          console.log(this.data.answer);
        }
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
    wx.request({
      url: "https://example.com/admin/report_query/",
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        if (res.result == 'Sucess') { } {
          var i = 0;
          for (i in res.data.data) {
            var j = 0, a = '';
            res.data.data[i].str = ''
            for (j in res.data.data[i].report_class) {
              if (res.data.data[i].report_class[j] == 0) {
                a = '色情低俗'
              }
              if (res.data.data[i].report_class[j] == 1) {
                a = '政治敏感'
              }
              if (res.data.data[i].report_class[j] == 2) {
                a = '血腥暴力'
              }
              if (res.data.data[i].report_class[j] == 3) {
                a = '个人信息侵犯'
              }
              if (res.data.data[i].report_class[j] == 4) {
                a = '虚假信息'
              }
              if (res.data.data[i].report_class[j] == 5) {
                a = '钓鱼/引战'
              }
              if (res.data.data[i].report_class[j] == 6) {
                a = '欺诈/赌博'
              }
              res.data.data[i].str = res.data.data[i].str + ' ' + a;
            }
          }
          this.setData({
            answer: res.data.data, //answer为一个数组
          });
          console.log(this.data.answer);
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  showAReport(e) {
    let index = e.currentTarget.dataset.index; //temp为服务器返回数组的index
    let post_id = this.data.answer[index].post_id
    wx.navigateTo({
      url: `/pages/showAReport/showAReport?post_id=${post_id}`,
    })
    //console.log(post_id)
    app.globalData.post_id = post_id;
  }
})