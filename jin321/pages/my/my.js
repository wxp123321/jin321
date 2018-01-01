Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "用户名",
    myportrait: "../../images/white.png",
    session:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'username',
      success: function (res) {
        that.setData({
          username: res.data.slice(0,6)
        });
      },
    });
    wx.getStorage({
      key: 'avatarUrl',
      success: function (res) {
        that.setData({
          myportrait: res.data.slice
        })
      },
    });
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
    var that = this;
    wx.getStorage({
      key: 'username',
      success: function (res) {
        console.log(res.data);
        that.setData({
          username: res.data
        });
      },
      fail:function(res){
        console.log("没缓存");
        wx.login({
          success: function (res) {
            wx.request({
              url: "https://www.jin321.cn/jin321/wx/login.do",
              method: "POST",
              data: {
                "js_code": res.code
              },
              success: function (res) {
                wx.getUserInfo({
                  withCredentials: "true",
                  success: function (res) {
                    var encryptedData = res.encryptedData;
                    var iv = res.iv;
                    wx.getStorage({
                      key: 'mysession',
                      success: function (res) {
                        wx.request({
                          url: "https://www.jin321.cn/jin321/wx/getUserMessage.do",
                          method: "POST",
                          data: {
                            "session": res.data,
                            "encryptedData": encryptedData,
                            "iv": iv
                          },
                          success: function (res) {
                            wx.setStorage({
                              key: 'username',
                              data: res.data.nickName,
                            });
                            wx.setStorage({
                              key: 'avatarUrl',
                              data: res.data.avatarUrl,
                            });
                          }
                        })
                      },
                    })
                  }
                })
                wx.setStorage({
                  key: 'mysession',
                  data: res.data.session
                });
                wx.setStorage({
                  key: 'userid',
                  data: res.data.userid
                });
                wx.setStorage({
                  key: 'code',
                  data: res.data.code
                });

              }
            });
          }
        })
      }
    });
    wx.getStorage({
      key: 'avatarUrl',
      success: function (res) {
        console.log(res.data);
        that.setData({
          myportrait: res.data
        })
      },
      fail:function(res){
        console.log("没缓存");
        wx.login({
          success: function (res) {
            wx.request({
              url: "https://www.jin321.cn/jin321/wx/login.do",
              method: "POST",
              data: {
                "js_code": res.code
              },
              success: function (res) {
                wx.getUserInfo({
                  withCredentials: "true",
                  success: function (res) {
                    var encryptedData = res.encryptedData;
                    var iv = res.iv;
                    wx.getStorage({
                      key: 'mysession',
                      success: function (res) {
                        wx.request({
                          url: "https://www.jin321.cn/jin321/wx/getUserMessage.do",
                          method: "POST",
                          data: {
                            "session": res.data,
                            "encryptedData": encryptedData,
                            "iv": iv
                          },
                          success: function (res) {
                            wx.setStorage({
                              key: 'username',
                              data: res.data.nickName,
                            });
                            wx.setStorage({
                              key: 'avatarUrl',
                              data: res.data.avatarUrl,
                            });
                          }
                        })
                      },
                    })
                  }
                })
                wx.setStorage({
                  key: 'mysession',
                  data: res.data.session
                });
                wx.setStorage({
                  key: 'userid',
                  data: res.data.userid
                });
                wx.setStorage({
                  key: 'code',
                  data: res.data.code
                });

              }
            });
          }
        })
      }
    });
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
    
  },
  manageAddress:function(e){
    wx.navigateTo({
      url: '../address/address',
    })
  }
})