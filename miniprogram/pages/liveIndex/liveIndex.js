// pages/liveIndex/liveIndex.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    livetips: [],
    state1: [],
    state2: [],
    state3: [],
    state4: [],
    punchstate: [],
    cateItems: [],
    id: '',
    courtyard: '',
    activeKey: 0,
    columns: ['一单元', "二单元", "三单元", "四单元", "五单元", "六单元"],
    show1: false,
    message: [],
    show: false,
  },
  message(e) {
    this.setData({ show: true })
    this.setData({ show_pic: e.currentTarget.dataset.url })
    this.setData({ show_detail: e.currentTarget.dataset.detail })
  },
  onChange2(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },
  showPopup() {
    this.setData({ show1: true });
  },
  onCancel() {
    Toast({
      message: '取消举报',
      duration: 600
    });
    this.setData({ show1: false });
  },
  onClose() {
    this.setData({ show1: false });
  },
  onClose1() {
    this.setData({ show: false });
  },
  onConfirm: function (event) {
    self = this
    const { picker, value, index } = event.detail;
    this.setData({ show1: false });
    var court_mes = ''
    var court_mes1 = ''
    court_mes = this.data.courtyard
    court_mes1 = parseInt(court_mes)
    wx.request({
      url: 'https://example.com/live/dorm_query/',
      method: "POST",
      data: {
        "courtyard": court_mes1,
        "unit": index + 1
      },
      success: function (res) {
        var temp_mes = []
        for (var i = 0; i < res.data.data.length; i++) {
          var temp_json = {}
          temp_json = res.data.data[i].real_name
          var temp_json1 = {}
          temp_json1 = res.data.data[i].room
          var temp_json2 = {}
          temp_json2.name = temp_json
          temp_json2.room = temp_json1
          temp_mes.push(temp_json2)
        }
        self.setData({
          message: temp_mes
        })
      }
    })
  },
  /*侧边导航栏*/
  onChange: function (event) {
    this.setData({
      activeKey: event.detail,
    })
  },
  onChange1: function (event) {
    self = this
    if (event.detail.index == 0) {
      wx.request({
        url: 'https://example.com/live/tips/',
        method: "POST",
        data: {},
        success: function (res) {
          console.log(res.data)
          var t_cateItems = []
          var childid_count = []
          for (var i = 0; i < 2; i++) {
            var temp_json = {}
            temp_json.cate_id = i + 1
            temp_json.ishaveChild = true
            temp_json.children = []
            t_cateItems.push(temp_json)
            childid_count.push(1)
          }//功效食物大类框架
          for (var i = 0; i < res.data.data.length; i++) {
            var temp_json = {}
            var no = res.data.data[i].class - 1
            temp_json.child_id = childid_count[no]++
            temp_json.url = res.data.data[i].url
            temp_json.name = res.data.data[i].name
            temp_json.detail = res.data.data[i].details
            t_cateItems[no].children.push(temp_json)
          }//功效食物每个类别的内容
          // data.cateItems[0].children[0].img = res.data[0].url
          self.setData({
            livetips: t_cateItems
          });
          console.log(t_cateItems)
        }
      })
    }
    if (event.detail.index == 2) {
      wx.request({
        url: 'https://example.com/live/dorm_judge/',
        method: 'POST',
        data: {
          "wx_id": app.globalData.openid,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.result === "Success") {
            var court_mes = ''
            var court_mes1 = ''
            court_mes = res.data.data.courtyard
            self.setData({
              courtyard: court_mes
            })
            court_mes1 = parseInt(court_mes)
            wx.request({
              url: 'https://example.com/live/dorm_query/',
              method: 'POST',
              data: {
                "courtyard": court_mes1, // 围合号
                "unit": 1 // 单元号
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                var temp_mes = []
                for (var i = 0; i < res.data.data.length; i++) {
                  var temp_json = {}
                  temp_json = res.data.data[i].real_name
                  var temp_json1 = {}
                  temp_json1 = res.data.data[i].room
                  var temp_json2 = {}
                  temp_json2.name = temp_json
                  temp_json2.room = temp_json1
                  temp_mes.push(temp_json2)
                }
                self.setData({
                  message: temp_mes
                })
              }
            })
          }
          if (res.data.result !== "Success") {
            console.log(res.data)
            wx.showModal({
              title: '您还未绑定,请前往 我的-绑定围合信息 进行绑定',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateBack({
                    delta: 1,
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              }
            })
          }
        }
      })
    }
  },
  //活动打卡
  onclick: function (event) {
    self = this
    wx.request({
      url: 'https://example.com/live/check/',
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid, // 微信号
        "activity_class": 1 //打卡
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var state_now = []
        var temp_json = {}
        temp_json.state = res.data.result
        state_now.push(temp_json)
        if (res.data.result === "CheckedBefore") {
          wx.showModal({
            title: '请勿重复打卡',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (res.data.result === "Success") {
          self.setData({
            state1: "已打卡"
          })
          wx.showModal({
            title: '打卡成功',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
    })
  },
  onclick1: function (event) {
    self = this
    wx.request({
      url: 'https://example.com/live/check/',
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid, // 微信号
        "activity_class": 2 //打卡
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var state_now = []
        var temp_json = {}
        temp_json.state = res.data.result
        state_now.push(temp_json)
        if (res.data.result === "CheckedBefore") {
          wx.showModal({
            title: '请勿重复打卡',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (res.data.result === "Success") {
          self.setData({
            state2: "已打卡"
          })
          wx.showModal({
            title: '打卡成功',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
    })
  },
  onclick2: function (event) {
    self = this
    wx.request({
      url: 'https://example.com/live/check/',
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid, // 微信号
        "activity_class": 3 //打卡
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var state_now = []
        var temp_json = {}
        temp_json.state = res.data.result
        state_now.push(temp_json)
        if (res.data.result === "CheckedBefore") {
          wx.showModal({
            title: '请勿重复打卡',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (res.data.result === "Success") {
          self.setData({
            state3: "已打卡"
          })
          wx.showModal({
            title: '打卡成功',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
    })
  },
  onclick3: function (event) {
    self = this
    wx.request({
      url: 'https://example.com/live/check/',
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid, // 微信号
        "activity_class": 4 //打卡
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var state_now = []
        var temp_json = {}
        temp_json.state = res.data.result
        state_now.push(temp_json)
        if (res.data.result === "CheckedBefore") {
          wx.showModal({
            title: '请勿重复打卡',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (res.data.result === "Success") {
          self.setData({
            state4: "已打卡"
          })
          wx.showModal({
            title: '打卡成功',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取生活tips

    wx.request({
      url: 'https://example.com/live/tips/',
      method: "POST",
      data: {},
      success: function (res) {
        var t_cateItems = []
        var childid_count = []
        for (var i = 0; i < 2; i++) {
          var temp_json = {}
          temp_json.cate_id = i + 1
          temp_json.ishaveChild = true
          temp_json.children = []
          t_cateItems.push(temp_json)
          childid_count.push(1)
        }//功效食物大类框架
        for (var i = 0; i < res.data.data.length; i++) {
          var temp_json = {}
          var no = res.data.data[i].class - 1
          temp_json.child_id = childid_count[no]++
          temp_json.url = res.data.data[i].url
          temp_json.name = res.data.data[i].name
          temp_json.detail = res.data.data[i].details
          t_cateItems[no].children.push(temp_json)
        }//功效食物每个类别的内容
        // data.cateItems[0].children[0].img = res.data[0].url
        self.setData({
          livetips: t_cateItems
        });
      }
    })

    self = this
    //打卡状态判断
    //按钮1
    wx.request({
      url: 'https://example.com/live/check/status/',
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid,
        "activity_class": 1,
      },
      success: function (res) {
        if (res.data.result === "CheckedBefore") {
          var state = {}
          state = "已打卡"
        }
        if (res.data.result === "NotYet") {
          state = "未打卡"
        }
        self.setData({
          state1: state
        })
      }
    })
    //按钮2
    wx.request({
      url: 'https://example.com/live/check/status/',
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid,
        "activity_class": 2,
      },
      success: function (res) {
        if (res.data.result === "CheckedBefore") {
          var state = {}
          state = "已打卡"
        }
        if (res.data.result === "NotYet") {
          var state = {}
          state = "未打卡"
        }
        self.setData({
          state2: state
        })
        console.log(res.data)
      }
    })
    //按钮3
    wx.request({
      url: 'https://example.com/live/check/status/',
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid,
        "activity_class": 3,
      },
      success: function (res) {
        if (res.data.result === "CheckedBefore") {
          var state = {}
          state = "已打卡"
        }
        if (res.data.result === "NotYet") {
          state = "未打卡"
        }
        self.setData({
          state3: state
        })
      }
    })
    //按钮4
    wx.request({
      url: 'https://example.com/live/check/status/',
      method: 'POST',
      data: {
        "wx_id": app.globalData.openid,
        "activity_class": 4,
      },
      success: function (res) {
        if (res.data.result === "CheckedBefore") {
          var state = {}
          state = "已打卡"
        }
        if (res.data.result === "NotYet") {
          state = "未打卡"
        }
        self.setData({
          state4: state
        })
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