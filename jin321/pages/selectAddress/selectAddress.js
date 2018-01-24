Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    pass:'',
    code:0,
    rec:[],
    oid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.code == 1){
      that.setData({
        pass: {
          sid: options.sid,
          pid: options.pid,
          svalue: options.svalue,
          title: options.title,
          dname: options.dname,
          price: options.price
        }
      });
    }else if(options.code == 2){
      that.setData({
        rec:options.rec
      });
    }else{
      console.log(options.oid);
      that.setData({
        oid:options.oid
      });
    }
    that.setData({
      code:options.code
    });
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: 'https://www.jin321.cn/jin321/wx/selectUseraddressByuid.do',
          method:'POST',
          data:{
            uid:res.data
          },
          success:function(res){
            var info = [];
            for (var i = 0; i < res.data.useraddresses.length;i++){
              if(i == 0){
                info[i] = {
                  username: res.data.useraddresses[i].ubname,
                  phoneNumber: res.data.useraddresses[i].uphonenum,
                  default:'[默认地址]',
                  address: res.data.useraddresses[i].uprovince + res.data.useraddresses[i].ucity + res.data.useraddresses[i].uarea + res.data.useraddresses[i].uaddress,
                  uaid: res.data.useraddresses[i].uaid
                }
              }else{
                info[i] = {
                  username: res.data.useraddresses[i].ubname,
                  phoneNumber: res.data.useraddresses[i].uphonenum,
                  address: res.data.useraddresses[i].uprovince + res.data.useraddresses[i].ucity + res.data.useraddresses[i].uarea + res.data.useraddresses[i].uaddress,
                  uaid: res.data.useraddresses[i].uaid
                }
              }
            }
            that.setData({
              info:info
            });
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
    
  },
  backOrder(e){
    var that = this;
    wx.request({
      url: 'https://www.jin321.cn/jin321/wx/setDefaultAddress.do',
      method:'POST',
      data:{
        uaid:e.currentTarget.dataset.uaid
      },
      success:function(res){
        if(that.data.code == 1){
          var pass = that.data.pass;
          wx.navigateTo({
            url: '../order/order?pid=' + pass.pid + '&sid=' + pass.sid + '&svalue=' + pass.svalue + '&title=' + pass.title + '&price=' + pass.price + '&dname=' + pass.dname+'&code=1',
          })
        }else if(that.data.code == 2){
          wx.navigateTo({
            url: '../order/order?rec=' + that.data.rec + '&code=2',
          })
        }else{
          console.log('返回');
          wx.navigateTo({
            url: '../order/order?code=3&oid='+that.data.oid,
          })
        }
      }
    })
  },
  addAddress: function () {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  }
})