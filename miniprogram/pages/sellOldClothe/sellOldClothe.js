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


  titleInput: function (e) {
    this.setData({
      titleVal: e.detail.value
    })
    //console.log(this.data.titleVal)  
  },
  contentInput: function (e) {
    this.setData({
      contentVal: e.detail.value
    })
    //console.log(this.data.contentVal)  
  },
  save() {
    //console.log(this.data.titleVal)  
    //console.log(this.data.contentVal)
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var Title = this.data.titleVal;
    var Content = this.data.contentVal;
    var img_url = this.data.img_url;
    wx.request({
      url: "https://example.com/post/", //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid, // 微信号
        "content": Content, // 帖子内容
        "title": Title, // 帖子标题
        "url": img_url,
        "clothes_post": 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data);
        setTimeout(function () {
          wx.showToast({
            title: '发帖成功',
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



  //上传图片
  upimg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      success: function (res) {
        that.setData({
          img_arr: res.tempFilePaths
        }),
          console.log(that.data.img_arr);


        //上传文件
        wx.uploadFile({
          //请求后台的路径
          url: "https://example.com/image/upload_post_pic/",
          //小程序本地的路径
          filePath: that.data.img_arr.toString(),
          //后台获取我们图片的key
          name: 'file',
          //额外的参数formData
          success: function (res) {
            //上传成功
            console.log(JSON.parse(res.data).url),
              wx.showToast({
                title: '上传成功！',
                icon: "success"
              })
            that.setData({
              img_url: JSON.parse(res.data).url
            })
          },
          fail: function (res) {
            //console.log(res)
          },
        })
      }
    })

    // wx.uploadFile({
    //   url: "https://example.com/image/upload_post_pic/",
    //   filePath: this.data.img_arr,
    //   method:"POST",
    //   name: "file",
    //   success:res=> {
    //   //上传成功
    //     console.log(res);
    //   },
    //   fail:res=>{
    //     console.log(this.data.img_arr);
    //   }
    // });



  },












  data: {
    titleVal: "",
    contentVal: "",
    img_arr: "",
    img_url: ""
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