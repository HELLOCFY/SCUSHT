const app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    answer: "",
    post_id: 0,
    comment_answer: "",
    flag: "block",
    pass_src: "/images/pass.png",
    delete_src: "/images/delete.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const post_id = app.globalData.post_id;
    console.log(post_id);  //传回来的点击贴子的post_id

    wx.request({
      url: "https://example.com/query/post/detail/", //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        "post_id": post_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        var i = 0;
        this.setData({
          post_id: post_id
        })
        res.data.time = res.data.time.substring(0, 10) + " " + res.data.time.substring(11, 19)

        //判断图片是否显示
        if (res.data.post_url == "") {
          this.setData({
            flag: "none"
          })
        }
        else {
          this.setData({
            flag: "block"
          })
        }
        this.setData({
          answer: res.data, //answer为一个数组
        });
        console.log(this.data.answer);
        console.log(this.data.postId);
      }

    })
    //获取评论res.data[i]
    wx.request({
      url: 'https://example.com/query/post/comment/',
      method: 'POST',
      data: {
        "post_id": post_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        var i = 0;
        for (i in res.data) {
          res.data[i].time = res.data[i].time.substring(0, 10) + " " + res.data[i].time.substring(11, 19)
        }
        this.setData({
          comment_answer: res.data
        })
        console.log(this.data.comment_answer);
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

  //跳过
  pass() {
    wx.request({
      url: "https://example.com/admin/handle_report/",
      method: 'POST',
      data: {
        "post_id": app.globalData.post_id,
        "handle": 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        if (res.data.result == "Success") {
          setTimeout(function () {
            wx.showToast({
              title: '处理成功',
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
            title: '处理失败',
            icon: "error",
            duration: 2000,
          })
        }

      },
    })
  },
  //删除
  delete() {
    wx.request({
      url: "https://example.com/admin/handle_report/",
      method: 'POST',
      data: {
        "post_id": app.globalData.post_id,
        "handle": 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        if (res.data.result == "Success") {
          setTimeout(function () {
            wx.showToast({
              title: '处理成功',
              icon: "success",
              duration: 2000,
            })
          }, 100)
          wx.navigateBack({
            delta: 1,
          })
        }
        else {
          Toast.fail({
            message: '处理失败',
            duration: 1000
          });
        }

      },

    })

  },

})