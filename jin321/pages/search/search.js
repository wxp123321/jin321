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
    focus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.tid >=0){
      tid = options.tid;
      wx.request({
        url: "https://www.jin321.cn/jin321/wx/selectProductByptypeb.do",
        method: "POST",
        data: {
          ptypeb: options.tid,
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
              pid:res.data[i].pid
            }
          }
          that.setData({
            info: info
          });
        }
      })
    }else{
      that.setData({
        focus:true
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
    var that = this;
    var id = e.currentTarget.dataset.id;
    if(id == 0){
      that.setData({
        text1:"text1"
      });
      that.setData({
        text2: "text2"
      });
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
              pid:res.data[i].pid
            }
          }
          that.setData({
            info: info
          });
        }
      })
    }else if(id == 1){
      that.setData({
        text1: "text2"
      });
      that.setData({
        text2: "text1"
      });
      wx.request({
        url: "https://www.jin321.cn/jin321/wx/selectProductByptypeb.do",
        method: "POST",
        data: {
          ptypeb: tid,
          code: 1
        },
        success: function (res) {
          console.log(res);
          var info = [];
          for (var i = 0; i < res.data.length; i++) {
            info[i] = {
              url: "https://www.jin321.cn/jin321/" + res.data[i].ppicurl,
              name: res.data[i].pname,
              price: res.data[i].pssellprice,
              psellnum: res.data[i].psellnum
            }
          }
          that.setData({
            info: info
          });
        }
      })
    }
  },
  search:function(e){
    var that = this;
    var value = e.detail.value;
    wx.request({
      url: "https://www.jin321.cn/jin321/wx/selectProductBykey.do",
      method:"POST",
      data:{
        key:value
      },
      success:function(res){
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
      }
    })
  },
  watchProduct:function(e){
    var pid = e.currentTarget.dataset.id;
    console.log(pid);
    wx.navigateTo({
      url: '../merchandise/merchandise?pid='+pid,
    })
  }
})