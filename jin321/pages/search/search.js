var tid = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    text1:"text1",
    text2:"text2",
    info:[],
    focus:false,
    thirdType:[],
    firstType:"",
    type1:"thirdType clearfix",
    type2:"changeType2",
    type3:"thirdType2 clearfix",
    triangle:"triangle2",
    typeId:0,
    thirdId:{},
    dataId:'',
    searchValue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      type1: "searchHidden"
    });
    that.setData({
      dataId: options.tid
    });
    if(options.tid >= 0){
      var thirdId = {};
      wx.request({
        url: "https://www.jin321.cn/jin321/wx/selectSecondProducttype.do",
        method: "POST",
        data: {
          tid: options.tid
        },
        success: function (res) {
          var thirdType = [];
          var firstType = res.data[0].typename;
          for (var i = 0; i < res.data.length; i++) {
            thirdType[i] = res.data[i].typename;
            thirdId[res.data[i].typename] = res.data[i].tid;
          }
          that.setData({
            thirdId:thirdId
          });
          that.setData({
            firstType: firstType
          });
          that.setData({
            thirdType: thirdType
          });
          tid = res.data[0].tid;
          wx.request({
            url: "https://www.jin321.cn/jin321/wx/selectProductByptypeb.do",
            method: "POST",
            data: {
              ptypeb: tid,
              code: 0
            },
            success: function (res) {
              console.log(res);
              var info = [];
              for (var i = 0; i < res.data.length; i++) {
                info[i] = {
                  url: "https://www.jin321.cn/jin321/" + res.data[i].ppicurl,
                  name: res.data[i].pname,
                  price: res.data[i].pssellprice,
                  psellnum: res.data[i].psellnum,
                  pid: res.data[i].pid
                }
              }
              that.setData({
                type1: "thirdType clearfix"
              });
              that.setData({
                info: info
              });
            }
          })


        }
      });
    }else{
      that.setData({
        focus: true
      });
    }
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
    
  },
  changeText:function(e){
    // var that = this;
    // var id = e.currentTarget.dataset.id;
    // if(id == 0){
    //   that.setData({
    //     text1:"text1"
    //   });
    //   that.setData({
    //     text2: "text2"
    //   });
    //   wx.request({
    //     url: "https://www.jin321.cn/jin321/wx/selectProductByptypeb.do",
    //     method: "POST",
    //     data: {
    //       ptypeb: tid,
    //       code: 0
    //     },
    //     success: function (res) {
    //       console.log(res);
    //       var info = [];
    //       for (var i = 0; i < res.data.length; i++) {
    //         info[i] = {
    //           url: "https://www.jin321.cn/jin321/" + res.data[i].ppicurl,
    //           name: res.data[i].pname,
    //           price: res.data[i].pssellprice,
    //           psellnum: res.data[i].psellnum,
    //           pid:res.data[i].pid
    //         }
    //       }
    //       that.setData({
    //         info: info
    //       });
    //     }
    //   })
    // }else if(id == 1){
    //   that.setData({
    //     text1: "text2"
    //   });
    //   that.setData({
    //     text2: "text1"
    //   });
    //   wx.request({
    //     url: "https://www.jin321.cn/jin321/wx/selectProductByptypeb.do",
    //     method: "POST",
    //     data: {
    //       ptypeb: tid,
    //       code: 1
    //     },
    //     success: function (res) {
    //       var info = [];
    //       for (var i = 0; i < res.data.length; i++) {
    //         info[i] = {
    //           url: "https://www.jin321.cn/jin321/" + res.data[i].ppicurl,
    //           name: res.data[i].pname,
    //           price: res.data[i].pssellprice,
    //           psellnum: res.data[i].psellnum
    //         }
    //       }
    //       that.setData({
    //         info: info
    //       });
    //     }
    //   })
    // }
    var that = this;
    var id = e.currentTarget.dataset.code;
    if(id == 1){
      that.setData({
        text1:"text2"
      });
      that.setData({
        text2: "text1"
      });
    }else{
      that.setData({
        text2: "text2"
      });
      that.setData({
        text1: "text1"
      });
    }
    var f = that.data.searchValue?true:false
    if(f){
      wx.request({
        url: "https://www.jin321.cn/jin321/wx/selectProductBykey.do",
        method: "POST",
        data: {
          key: that.data.searchValue,
          code:id
        },
        success: function (res) {
          var info = [];
          for (var i = 0; i < res.data.length; i++) {
            info[i] = {
              url: "https://www.jin321.cn/jin321/" + res.data[i].ppicurl,
              name: res.data[i].pname,
              price: res.data[i].pssellprice,
              psellnum: res.data[i].psellnum,
              pid: res.data[i].pid
            }
          }
          that.setData({
            info: info
          });
        }
      })
    }else{
      wx.request({
        url: "https://www.jin321.cn/jin321/wx/selectProductByptypeb.do",
        method: "POST",
        data: {
          ptypeb: tid,
          code: id
        },
        success: function (res) {
          var info = [];
          for (var i = 0; i < res.data.length; i++) {
            info[i] = {
              url: "https://www.jin321.cn/jin321/" + res.data[i].ppicurl,
              name: res.data[i].pname,
              price: res.data[i].pssellprice,
              psellnum: res.data[i].psellnum,
              pid: res.data[i].pid
            }
          }
          that.setData({
            type1: "thirdType clearfix"
          });
          that.setData({
            info: info
          });
        }
      })
    }
    
    
  },
  hidden:function(){
    var that = this;
    that.setData({
      type1: "searchHidden"
    });
  },
  search:function(e){
    var that = this;
    var value = e.detail.value;
    that.setData({
      searchValue:value
    });
    wx.request({
      url: "https://www.jin321.cn/jin321/wx/selectProductBykey.do",
      method:"POST",
      data:{
        key:value
      },
      success:function(res){
        var info = [];
        for (var i = 0; i < res.data.length; i++) {
          info[i] = {
            url: "https://www.jin321.cn/jin321/" + res.data[i].ppicurl,
            name: res.data[i].pname,
            price: res.data[i].pssellprice,
            psellnum: res.data[i].psellnum,
            pid: res.data[i].pid
          }
        }
        that.setData({
          info: info
        });
      }
    })
  },
  choose:function(e){
    var that = this;
    var data = e.currentTarget.dataset.content;
    that.setData({
      firstType:data
    });
    var tid = that.data.thirdId[data];
    wx.request({
      url: "https://www.jin321.cn/jin321/wx/selectProductByptypeb.do",
      method: "POST",
      data: {
        ptypeb: tid,
        code: 0
      },
      success: function (res) {
        console.log(res);
        var info = [];
        for (var i = 0; i < res.data.length; i++) {
          info[i] = {
            url: "https://www.jin321.cn/jin321/" + res.data[i].ppicurl,
            name: res.data[i].pname,
            price: res.data[i].pssellprice,
            psellnum: res.data[i].psellnum,
            pid: res.data[i].pid
          }
        }
        that.setData({
          info: info
        });
        that.setData({
          type1: "thirdType clearfix"
        });
        that.setData({
          type3: "thirdType2 clearfix"
        });
        that.setData({
          triangle: "triangle2"
        });
        that.setData({
          type2: "changeType2"
        });
      }
    })
  },
  watchProduct:function(e){
    var pid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../merchandise/merchandise?pid='+pid,
    })
  },
  third:function(e){
    var that = this;
    if(that.data.typeId == 1){
      that.setData({
        typeId:0
      });
      that.setData({
        type2:"changeType2"
      });
      that.setData({
        triangle:"triangle2"
      });
    }else{
      that.setData({
        type1:"borderH clearfix"
      });
      that.setData({
        typeId: 1
      });
      that.setData({
        type2: "thirdType2 clearfix"
      });
      that.setData({
        triangle: "triangle"
      });
    }
  }


});