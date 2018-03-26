Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0,
    moneyBox: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(new Date(1518164040000).toLocaleString());
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: 'https://www.jin321.cn/jin321/wx/Commissions.do',
          method: 'post',
          data:{
            uid: res.data
          },
          success: function(res){
            if(res.data.length){
              var money = 0;
              var moneyBox = [];
              for(var i = 0; i < res.data.length;i++){
                money += res.data[i].paynum;
                moneyBox[i] = {
                  id: res.data[i].uid,
                  date: new Date(res.data[i].paydate).toLocaleString(),
                  message: res.data[i].paymsg,
                  money: res.data[i].paynum
                }
              }
              that.setData({
                money: money
              });
              that.setData({
                moneyBox: moneyBox
              });
            }
          }
        })
      },
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