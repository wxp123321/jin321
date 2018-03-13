Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    noPayOrders:[],
    noSend:[],
    noRe:[],
    baseUrl:'',
    all:'all',
    noPay:'',
    waitSend:'',
    waitRe:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllOrders();
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
  getAllOrders(){
    var that = this;
    that.setData({
      noPayOrders:[]
    });
    that.setData({
      noSend: []
    }); 
    that.setData({
      noRe: []
    });
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: 'https://www.jin321.cn/jin321/wx/selectOrderformByuid.do',
          method: 'POST',
          data:{
            uid:res.data,
            code:0
          },
          success:function(res){
            if(res.data.length){
              that.setData({
                orders:res.data
              });
              that.setData({
                baseUrl: res.data[0].baseURL
              });
            }
          }
        })
      },
    })
  },
  getNoPayOrders(){
    var that = this;
    that.setData({
      orders:[]
    });
    that.setData({
      noSend: []
    });
    that.setData({
      noRe: []
    });
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: 'https://www.jin321.cn/jin321/wx/selectOrderformByuid.do',
          method: 'POST',
          data: {
            uid: res.data,
            code: 1
          },
          success: function (res) {
            if (res.data.length) {
              that.setData({
                noPayOrders: res.data
              });
              that.setData({
                baseUrl: res.data[0].baseURL
              });
            }
          }
        })
      },
    })
  },
  getNoSend(){
    var that = this;
    that.setData({
      noPayOrders: []
    });
    that.setData({
      orders: []
    });
    that.setData({
      noRe: []
    });
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: 'https://www.jin321.cn/jin321/wx/selectOrderformByuid.do',
          method: 'POST',
          data: {
            uid: res.data,
            code: 2
          },
          success: function (res) {
            if (res.data.length) {
              that.setData({
                noSend: res.data
              });
              that.setData({
                baseUrl: res.data[0].baseURL
              });
            }
          }
        })
      },
    })
  },
  getNoRe(){
    var that = this;
    that.setData({
      noPayOrders: []
    });
    that.setData({
      noSend: []
    });
    that.setData({
      orders: []
    });
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: 'https://www.jin321.cn/jin321/wx/selectOrderformByuid.do',
          method: 'POST',
          data: {
            uid: res.data,
            code: 3
          },
          success: function (res) {
            if (res.data.length) {
              that.setData({
                noRe: res.data
              });
              that.setData({
                baseUrl: res.data[0].baseURL
              });
            }
          }
        })
      },
    })
  },
  all(){
    this.setData({
      all:'all'
    });
    this.setData({
      noPay: ''
    });
    this.setData({
      waitSend: ''
    });
    this.setData({
      waitRe: ''
    });
    this.getAllOrders();
  },
  noPay(){
    this.setData({
      all: ''
    });
    this.setData({
      noPay: 'noPay'
    });
    this.setData({
      waitSend: ''
    });
    this.setData({
      waitRe: ''
    });
    this.getNoPayOrders();
  },
  waitSend(){
    this.setData({
      all: ''
    });
    this.setData({
      noPay: ''
    });
    this.setData({
      waitSend: 'waitSend'
    });
    this.setData({
      waitRe: ''
    });
    this.getNoSend();
  },
  waitRe(){
    this.setData({
      all: ''
    });
    this.setData({
      noPay: ''
    });
    this.setData({
      waitSend: ''
    });
    this.setData({
      waitRe: 'waitRe'
    });
    this.getNoRe();
  },
  delOrder(e){
    var that = this;
    console.log(e.currentTarget.dataset.oid);
    wx.request({
      url: 'https://www.jin321.cn/jin321/wx/deleteOrder.do',
      method:'POST',
      data:{
        oid: e.currentTarget.dataset.oid
      },
      success:function(res){
        if(res.data.code == 1){
          wx.showToast({
            title: '删除成功',
            duration: 500
          });
          if (that.data.orders.length){
            that.getAllOrders();
          }else if(that.data.noPayOrders.length){
            that.getNoPayOrders();
          }else if(that.data.noSend.length){
            that.getNoSend();
          }else{
            that.getNoRe();
          }
        }
      }
    })
  },
  order(e){
    wx.navigateTo({
      url: '../order/order?code=3&oid=' + e.currentTarget.dataset.oid,
    })
  },
  watch(e){
    wx.navigateTo({
      url: '../logistics/logistics?oid=' + e.currentTarget.dataset.oid,
    })
  }
})