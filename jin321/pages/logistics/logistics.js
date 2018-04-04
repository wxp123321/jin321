Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid:'',
    imgurl:'',
    expressName:'张鑫快递',
    express:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      oid:options.oid
    });
    wx.request({
      url: 'https://www.jin321.cn/jin321/wx/selectOrderByoid.do',
      method:'POST',
      data:{
        oid:options.oid
      },
      success:function(res){
        that.setData({
          imgurl: res.data.baseURL+res.data.orderformProductPos[0].ppicurl
        });
      }
    });

    wx.request({
      url: 'https://www.jin321.cn/jin321/wx/selectExpressageByOid.do',
      method:'POST',
      data:{
        oid:'888836558644903260'
      },
      success:function(res){
        that.setData({
          express:res.result.list
        });
        that.setData({
          expressName: res.result.company
        });
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