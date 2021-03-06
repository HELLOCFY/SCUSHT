//app.js
App({
  data: {
    test: 0
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.openid = res.result.openid;

        //刷新直接获取openid进行登录
        wx.request({
          url: "https://example.com/user/register/", //仅为示例，并非真实的接口地址
          method: 'POST',
          data: {
            "wx_id": this.globalData.openid, // 微信号
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
          }
        })

        //保存用户的等级
        wx.request({
          url: "https://example.com/user/info/",
          method: "POST",
          data: {
            "wx_id": this.globalData.openid
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            this.globalData.account_level = res.data.account_level;
          }
        })
        console.log(res.result.openid);
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  }
})
