// pages/goOutIndex/goOutIndex.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pic_id: [],
    pic: [],
    name: [],
    message: [],
    active: 0,
    show: false,
    show_pic: null,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    columns1: ['江安', '望江', '华西'],
    columns2: ['江安', '望江', '华西'],
    place1: '',
    place2: '',
    way: [],
  },
  showPopup3() {
    this.setData({ show4: true });
  },

  onClose3() {
    this.setData({ show4: false });
  },
  showPopup4() {
    this.setData({ show5: true });
  },

  onClose4() {
    this.setData({ show5: false });
  },
  onChange1(event) {
    const { picker, value, index } = event.detail;
  },
  onChange2(event) {
    const { picker, value, index } = event.detail;
  },
  showPopup1() {
    this.setData({ show1: true });
  },
  showPopup2() {
    this.setData({ show2: true });
  },
  onCancel1() {
    Toast({
      message: '取消举报',
      duration: 600
    });
    this.setData({ show1: false });
  },
  onClose1() {
    this.setData({ show1: false });
  },
  onCancel2() {
    Toast({
      message: '取消举报',
      duration: 600
    });
    this.setData({ show2: false });
  },
  onClose2() {
    this.setData({ show2: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this
    wx.request({
      url: 'https://example.com/travel/place/',
      method: "POST",
      data: {},
      success: function (res) {
        var temp_mes = []
        temp_mes = res.data.data
        console.log(temp_mes)
        self.setData({
          message: temp_mes
        })
        console.log(res.data.data)
      }
    })
  },
  onConfirm1: function (event) {
    self = this
    const { picker, value, index } = event.detail;
    this.setData({ show1: false });
    this.setData({
      place1: value
    })
    if (this.data.place1 === this.data.place2) {
      this.setData({ show3: true })
    }
  },
  onConfirm2: function (event) {
    self = this
    const { picker, value, index } = event.detail;
    this.setData({ show2: false });
    this.setData({
      place2: value
    })
    if (this.data.place1 === this.data.place2) {
      this.setData({ show3: true })
    }
  },

  onClose() {
    this.setData({ show: false });
  },
  onClick(e) {
    this.setData({ show: true })
    this.setData({ show_pic: e.currentTarget.dataset.url })
    this.setData({ show_detail: e.currentTarget.dataset.detail })
  },

  showPopup() {
    this.setData({ show3: true });
  },

  onClose1() {
    this.setData({ show3: false });
  },
  send: function (event) {
    self = this
    if (this.data.place1 === this.data.place2) {
      this.setData({ show3: true })
    }
    if (this.data.place1 !== this.data.place2) {
      wx.request({
        url: 'https://example.com/travel/way/',
        method: "POST",
        data: {
          "departure": this.data.place1,
          "destination": this.data.place2
        },
        success: function (res) {
          var detail = res.data.detail.replace(/(\\n)/g, '\n')
          console.log(res.data)
          res.data.detail = detail
          self.setData({
            way: res.data
          })
        }
      })
    }
  },
  /**
   * 点击取消
   */
  /**
   *  点击确认
   */
  // do something
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