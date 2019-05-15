// pages/pay/pay.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    type:null,
    id:null,
    sn:null,
    original:null,
    derate:null,
    money:null,

    typegoods:false,
    typeproduct:false,

    state:'等待支付'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      console.log(options)
      if (options.type) {
        this.setData({
          type: options.type
        })

        if (options.type == 'goods'){
          this.setData({
            typegoods: true
          })
        } else if (options.type == 'product'){
          this.setData({
            typeproduct: true
          })
        }else{

        }
      }
      if (options.id) {
        this.setData({
          id: options.id
        })
        this.pay();
      }
      if (options.sn) {
        this.setData({
          sn: options.sn
        })
      }
      if (options.original) {
        this.setData({
          original: options.original
        })
      }
      if (options.derate) {
        this.setData({
          derate: options.derate
        })
      }
      if (options.money) {
        this.setData({
          money: options.money
        })
      }
    },

    pay:function(){
      var that = this;
      var url = null;
      if (that.data.type == 'goods') {
        url = "my";
      } else if (that.data.type == 'product') {
        url = "member";
      } else {

      }
      wx.request({
        url: 'https://fanfan.skyable.cn/app/wxPay?openid='+app.globalData.user.openid,
        data: {
          TYPE: that.data.type,
          ID: that.data.id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if (res.data.STATEFLAG=='OK'){
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: 'MD5',
            paySign: res.data.paySign,
            success: function (event) {
              // success   
              console.log(event);
              
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000,
                success: function(){
                  if(url=="my"){
                    wx.navigateTo({
                      url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/app/orders/useinfo?ORDER_ID=' + that.data.id + '&openid=' + app.globalData.user.openid)
                    })
                  }else{
                  wx.navigateTo({
                    url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/app/' + url + '?openid=' + app.globalData.user.openid)
                  })
                  }
                }
              });

              console.log("支付成功")
            },
            fail: function (error) {
              wx.showModal({
                title: '系统提示',
                content: '您已经取消订单或支付不成功，是否再次支付?',
                success(res) {
                  if (res.confirm) {
                    that.pay();
                  } else if (res.cancel) {
                    wx.navigateTo({
                      url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/app/' + url + '?openid=' + app.globalData.user.openid)
                    })
                  }
                }
              })

              console.log("支付失败")
              console.log(error)
            },
            complete: function () {
              // complete   
              console.log("pay complete")
            }
          });
          }else{
            wx.showModal({
              title: '系统提示',
              content: '该订单参数错误或已经支付',
              success(res) {
                wx.navigateTo({
                  url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/app/' + url + '?openid=' + app.globalData.user.openid)
                })
              },
              showCancel:false
            })
          }
        }
      })
    }
  }
})
