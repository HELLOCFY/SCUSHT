// pages/clotheIndex/clotheIndex.js
Page({

  /**
   * 页面的初始数据
   */
  //获取今日穿搭推荐
  getTodayClothe(){
    // wx.showModal({
    //   title: '今日穿搭推荐为：',
    //   content: '（此处填写随机获取的一个穿搭推荐）',
    //   success (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    wx.navigateTo({
      url: '/pages/wearCommend/wearCommend',
    })
  },


  //使用说明书
  howToUse(){
    wx.showModal({
      title: '使用说明：',
      content: '点击获取穿搭推荐按钮可以随机获取一条今日穿搭，如果不满意可以多次获取;点击旧物转让发帖按钮可以进行旧物转让操作，您需要写上您的联系方式（售价）以及所在校区等信息，在转让完成之后需要及时进行删除操作。',
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
  lookSellOldClothe(){
    wx.navigateTo({
      url: '/pages/lookSellOldClothe/lookSellOldClothe',
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