Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'张鑫',
    phoneNumber:12345678909,
    address:'山西省太原市尖草坪区中北大学',
    storeName:'辛巴专营',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getInfo();
    if(options.code == 1){
      //从详情页面点击
      var pid = options.pid;
      var sid = options.sid;
      var svalue = options.svalue;
      var price = options.price;
      var titile = options.title;
      
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
  getInfo(){
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: 'https://www.jin321.cn/jin321/wx/ selectUseraddressByuid.do',
          method:"POST",
          success:function(res){
            var data = res.data.useraddresses[0];
            that.setData({
              username: data.ubname
            });
            that.setData({
              phoneNumber: data.uphonenum
            });
            var value = data.uprovince + data.ucity + data.uarea + data.uaddress;
            that.setData({
              address: value.slice(14)+'...'
            });
          }
        })
      },
    })
  },

})