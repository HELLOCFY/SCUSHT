// pages/verify/verify.js

import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuId: '',
    stuNickname: '',
    verifyMessage: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sendTime: '获取验证码',
    sendColor: '#363636',
    snsMsgWait: 60
  },


  idChange(event) {
    this.setData({
      stuId: event.detail
    })
    console.log(this.data.stuId)
  },
  stuNicknameChange(event) {
    this.setData({
      stuNickname: event.detail
    })
    console.log(this.data.stuNickname)
  },
  verifyMessageChange(event) {
    this.setData({
      verifyMessage: event.detail
    })
    console.log(this.data.verifyMessage)
  },

  //发送验证码
  send() {
    var inter = setInterval(function () {
      this.setData({
        smsFlag: true,
        sendColor: '#cccccc',
        sendTime: this.data.snsMsgWait + 's后重发',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendColor: '#363636',
          sendTime: '获取验证码',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);



    wx.request({
      url: "https://example.com/user/register/verify_send/", //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid, // 微信号
        "name": this.data.stuNickname, // 昵称
        "email": this.data.stuId + "@stu.scu.edu.cn" // 邮箱
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })

  },

  bindGetUserInfo(e) {
    wx.getImageInfo({
      src: e.detail.userInfo.avatarUrl,
      success: function (sres) {
        //上传图片
        wx.uploadFile({
          url: "https://example.com/image/upload_user_pic/",
          filePath: sres.path,
          method: "POST",
          name: "file",
          formData: {
            "wx_id": app.globalData.openid,
          }
        });
        console.log(sres.path)
      },

      fail: function (srev) {
        console.log(srev);
      }
    }),
      wx.request({
        url: "https://example.com/user/register/verify/", //仅为示例，并非真实的接口地址
        method: 'POST',
        data: {
          "wx_id": app.globalData.openid, // 微信号
          "verify_code": this.data.verifyMessage
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          if (res.data.result == "Success") {
            wx.request({
              url: "https://example.com/user/info/",
              method: "POST",
              data: {
                "wx_id": app.globalData.openid
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: res => {
                app.globalData.account_level = res.data.account_level;

              }
            })
            setTimeout(function () {
              wx.showToast({
                title: '认证成功',
                icon: "success",
                duration: 2000,
              })
            }, 100)
            wx.navigateBack({
              delta: 1,
            })

          }
          else {
            wx.showToast({
              title: '认证失败',
              icon: "error",
              duration: 2000,
            })
          }

        }
      })
    console.log(e.detail.userInfo.avatarUrl)


  },



  onClickIcon() {
    wx.showModal({
      title: "请输入学号",
      content: "在您输入学号之后，我们会将一份验证邮件发送到您的邮箱中，请您及时查收。"
    })
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