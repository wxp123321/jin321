Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress();
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
    this.getAddress();
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
  delete:function(e){
    var uaid = e.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: "https://www.jin321.cn/jin321/wx/deleteUseraddressByid.do",
      method:"POST",
      data:{
        uaid:uaid
      },
      success:function(res){
        wx.getStorage({
          key: 'userid',
          success: function (res) {
            wx.request({
              url: "https://www.jin321.cn/jin321/wx/ selectUseraddressByuid.do",
              method: "POST",
              data: {
                uid: res.data
              },
              success: function (res) {
                wx.showToast({
                  title: '删除地址成功',
                  icon: 'success',
                  duration: 500
                });
                that.getAddress();
              }
            })
          },
        })
      }
    })
  },
  addAddress:function(){
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  getAddress() {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: "https://www.jin321.cn/jin321/wx/selectUseraddressByuid.do",
          method: "POST",
          data: {
            uid: res.data
          },
          success: function (res) {
            var address = [];
            for (var i = 0; i < res.data.useraddresses.length; i++) {
              if (i > 0) {
                address[i] = {
                  address: res.data.useraddresses[i].uprovince + res.data.useraddresses[i].ucity + res.data.useraddresses[i].uarea + res.data.useraddresses[i].uaddress,
                  username: res.data.useraddresses[i].ubname,
                  phoneNumber: res.data.useraddresses[i].uphonenum,
                  checked: false,
                  id: res.data.useraddresses[i].uaid
                }
              } else {
                address[i] = {
                  address: res.data.useraddresses[i].uprovince + res.data.useraddresses[i].ucity + res.data.useraddresses[i].uarea + res.data.useraddresses[i].uaddress,
                  username: res.data.useraddresses[i].ubname,
                  phoneNumber: res.data.useraddresses[i].uphonenum,
                  checked: true,
                  id: res.data.useraddresses[i].uaid
                }
              }
            }
            that.setData({
              address: address
            })
          }
        })
      },
    })
  }
})