// pages/showAMessage/showAMessage.js
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
    columns: ['色情低俗', '政治敏感', '血腥暴力', '个人信息侵犯', '虚假信息', '钓鱼/引战', '欺诈/赌博'],
    show: false,
    like_src: "/images/like.png",
    save_src: "/images/save.png",
    report_src: "/images/report.png"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    //Toast(`当前值：${value}, 当前索引：${index}`);
  },

  onConfirm(event) {
    if (this.data.report_src == "/images/report.png") {
      const { picker, value, index } = event.detail;
      this.setData({ show: false });
      //Toast(`当前值：${value}, 当前索引：${index}`);
      console.log(value, index);
      wx.request({
        url: "https://example.com/post/report/",
        method: 'POST',
        data: {
          "reporter_wxid": app.globalData.openid, // 微信号
          "post_id": app.globalData.post_id, // 帖子id
          "report_class": index // 举报类型
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          if (res.data.result == 'Success') {
            Toast.success({
              message: '举报成功',
              duration: 600
            });
          } else {
            Toast.fail({
              message: '举报失败',
              duration: 600
            });
          }
        }
      })
      this.onLoad()
    }
    else {
      wx.showToast({
        title: '只能举报一次',
        icon: "error"
      })
    }

  },

  onCancel() {
    Toast({
      message: '取消举报',
      duration: 600
    });
    this.setData({ show: false });
  },

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

    wx.request({
      url: 'https://example.com/query/check/',
      method: 'POST',
      data: {
        "post_id": post_id,
        "wx_id": app.globalData.openid
      },
      success: res => {
        console.log(res.data)
        if (res.data.like == "Already") {
          this.setData({
            like_src: "/images/like_sel.png"
          })
        }
        else {
          this.setData({
            like_src: "/images/like.png"
          })
        }

        if (res.data.save == "Already") {
          this.setData({
            save_src: "/images/save_sel.png"
          })
        }
        else {
          this.setData({
            save_src: "/images/save.png"
          })
        }



        if (res.data.report == "Already") {
          this.setData({
            report_src: "/images/report_sel.png"
          })
        }
        else {
          this.setData({
            report_src: "/images/report.png"
          })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  postAComment() {
    let post_id = this.data.post_id;
    console.log(this.data.post_id);
    wx.navigateTo({
      url: `/pages/postACommnet/postAComment?post_id=${post_id}`,
    })
  },


  //点赞
  like() {
    if (this.data.like_src == "/images/like.png") {
      wx.request({
        url: "https://example.com/post/like/", //仅为示例，并非真实的接口地址
        method: 'POST',
        data: {
          "post_id": app.globalData.post_id,
          "wx_id": app.globalData.openid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          let temp = this.data.answer.like_nums + 1;
          this.setData({
            'answer.like_nums': temp
          })
          if (res.data.result == "Success") {
            wx.showToast({
              title: '点赞成功',
              icon: "success",
              duration: 2000,
            })

          }
          else {
            wx.showToast({
              title: '点赞失败',
              icon: "error",
              duration: 2000,
            })
          }
        }
      })
      this.onLoad()
    }
    else {
      wx.showToast({
        title: '不能重复点赞',
        icon: "error"
      })
    }


  },
  //收藏
  save() {
    if (this.data.save_src == "/images/save.png") {
      wx.request({
        url: "https://example.com/post/save/", //仅为示例，并非真实的接口地址
        method: 'POST',
        data: {
          "post_id": app.globalData.post_id,
          "wx_id": app.globalData.openid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          let temp = this.data.answer.save_nums + 1;
          this.setData({
            'answer.save_nums': temp
          })
          if (res.data.result == "Success") {
            wx.showToast({
              title: '收藏成功',
              icon: "success",
              duration: 2000,
            })
          }
          else {
            wx.showToast({
              title: '收藏失败',
              icon: "error",
              duration: 2000,
            })
          }
        }
      })
      this.onLoad()
    }
    else {
      wx.showToast({
        title: '不能重复收藏',
        icon: "error"
      })
    }

  },

  /*report(){
    if(this.data.report_src=="/images/举报.png"){
      wx.request({
        url: "https://example.com/post/report/", //仅为示例，并非真实的接口地址
        method:'POST',
        data: {
          "post_id" : app.globalData.post_id,
          "reporter_wxid":app.globalData.openid,
          //默认为0，如果后续需要修改由管理员进行修改完善
          "report_class" :0         
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:res=>{
          console.log(res.data.result)   //这里要写是否举报成功
          if(res.data.result=="Success"){
            wx.showToast({
              title: '举报成功',
              icon:"success",
              duration: 2000,
            })
          }
          else{
            wx.showToast({
              title: '举报失败',
              icon:"error",
              duration: 2000,
            })
          }
        }
     })
     this.onLoad()
    }
    else{
      wx.showToast({
        title: '不能重复举报',
        icon:"error"
      })
    }
   
  }*/
})