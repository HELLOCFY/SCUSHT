// pages/foodIndex/foodIndex.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    picresult: [],
    cateItems: [],
    breakfirst: [],
    zaocan: [],
    zaocan1: '',
    lunch: [],
    dinner: [],
    curNav: 1,
    curIndex: 0
  },
  show: false,
  show1: false,
  show2: false,
  show3: false,
  show4: false,
  show5: false,
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  button1: function (event0) {
    self = this
    wx.request({
      url: 'https://example.com/eat/commend/',
      method: "POST",
      data: {},
      success: function (res) {
        var t_breakfirst = []
        for (var i = 0; i < res.data.url.length; i++) {
          var temp_json = {}
          temp_json.url = res.data.url[i]
          temp_json.detail = res.data.detail[i]
          t_breakfirst.push(temp_json)
        }
        self.setData({
          zaocan: t_breakfirst
        });
        console.log(t_breakfirst)
      }
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onClose2() {
    this.setData({ show1: false });
  },
  onClose3() {
    this.setData({ show2: false });
  },
  onClose4() {
    this.setData({ show3: false });
  },
  icon: function (e) {
    this.setData({ show4: true })
  },
  onClose1() {
    this.setData({ show4: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //固定侧边栏

    //功效食物接口
    self = this
    wx.request({
      url: 'https://example.com/eat/effect/',
      method: "POST",
      data: {},
      success: function (res) {
        /*self.setData({
          picresult:res.data,
        });*/
        var t_cateItems = []
        var childid_count = []
        for (var i = 0; i < 4; i++) {
          var temp_json = {}
          temp_json.cate_id = i + 1
          if (temp_json.cate_id == 1) {
            temp_json.cate_name = "减脂代谢"
          }
          if (temp_json.cate_id == 2) {
            temp_json.cate_name = "排毒养颜"
          }
          if (temp_json.cate_id == 3) {
            temp_json.cate_name = "清热降火"
          }
          if (temp_json.cate_id == 4) {
            temp_json.cate_name = "增强免疫"
          }
          temp_json.ishaveChild = true
          temp_json.children = []
          t_cateItems.push(temp_json)
          childid_count.push(0)
        }//功效食物大类框架
        for (var i = 0; i < res.data.data.length; i++) {
          var temp_json = {}
          var no = res.data.data[i].class - 1
          temp_json.child_id = childid_count[no]++
          temp_json.name = res.data.data[i].name
          temp_json.image = res.data.data[i].url
          temp_json.detail = res.data.data[i].detail
          t_cateItems[no].children.push(temp_json)
        }//功效食物每个类别的内容

        // data.cateItems[0].children[0].img = res.data[0].url
        self.setData({
          cateItems: t_cateItems
        });
      }
    })

    //三餐推荐接口
    wx.request({
      url: 'https://example.com/eat/commend/',
      method: "POST",
      data: {},
      success: function (res) {
        var t_breakfirst = []
        for (var i = 0; i < res.data.url.length; i++) {
          var temp_json = {}
          temp_json.url = res.data.url[i]
          temp_json.detail = res.data.detail[i]
          t_breakfirst.push(temp_json)
        }
        self.setData({
          zaocan: t_breakfirst
        });
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  message(e) {
    this.setData({ show: true })
    this.setData({ show_pic: e.currentTarget.dataset.url })
    this.setData({ show_detail: e.currentTarget.dataset.detail })
  },
  message1(e) {
    this.setData({ show1: true })
    this.setData({ show_pic: e.currentTarget.dataset.url })
    this.setData({ show_detail: e.currentTarget.dataset.detail })
  },
  message2(e) {
    this.setData({ show2: true })
    this.setData({ show_pic: e.currentTarget.dataset.url })
    this.setData({ show_detail: e.currentTarget.dataset.detail })
  },
  message3(e) {
    this.setData({ show3: true })
    this.setData({ show_pic: e.currentTarget.dataset.url })
    this.setData({ show_detail: e.currentTarget.dataset.detail })
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