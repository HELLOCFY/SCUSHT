// pages/clotheIndex/clotheIndex.js
const app=getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */

  
  //使用说明书
  /*howToUse(){
    wx.showModal({
      title: '使用说明：',
      content: '点击注销按钮可以注销当前登录操作。',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },*/

  verify(){
    wx.navigateTo({
      url: '/pages/verify/verify',
    })
  },
  lookMyMessage(){
    if(app.globalData.account_level<=1){
      wx.showModal({
        title:"提示",
        content:"您的用户等级不够，请先绑定个人信息"
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/lookMyMessage/lookMyMessage',
      })
    }
  },


  lookMyStar(){
      if(app.globalData.account_level<=1){
        wx.showModal({
          title:"提示",
          content:"您的用户等级不够，请先绑定个人信息"
        })
      }
      else{
        wx.navigateTo({
          url: '/pages/lookMyStar/lookMyStar',
        })
      }
  },
  bindMyDormitory(){
    wx.navigateTo({
      url: '/pages/bindMyDormitory/bindMyDormitory',
    })
  },
  adminEntry(){
    if(app.globalData.account_level < 3){
      Toast.fail({
        message:'抱歉，您无权限！',
        duration:1000
      });
    }else{
      wx.navigateTo({
        url: '/pages/developerEntry/developerEntry',
      })
    }
    },

    

  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.account_level)
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