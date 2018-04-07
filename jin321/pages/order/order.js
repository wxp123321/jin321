//记录cartid
var carId = [];
//记录购买物品的数量
var products = [];
//记录pid
var pId = {};
//买家留言
var message = [];
var message2 = '';
var uaid= 0;
//随机字符串
var nonceStr = '';
//快递方式
var type = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    phoneNumber:'',
    address:'',
    res:[],
    price:0,
    orderformproducts:[],
    code:0,
    pass:{
      
    },
    oid:'',
    did: '',
    express: [' 快递 免邮',' 自提'],
    index2: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
    var that = this;
    that.setData({
      code:options.code
    });
    if(options.code == 1){
      //从详情页面点击
      var pid = options.pid;
      var sid = options.sid;
      var svalue = options.svalue;
      var price = options.price;
      var title = options.title;
      var dname = options.dname;
      that.setData({
        did: options.did
      });
      that.setData({
        pass:{
          sid: sid,
          pid: pid,
          svalue: svalue,
          title: title,
          dname: dname,
          price:price
        }
      });
      var url = '';
      var rec = [];
      message[dname] = '';
      wx.request({
        url: 'https://www.jin321.cn/jin321/wx/selectHeadpicsByPid.do',
        method:'POST',
        data:{
          pid:pid
        },
        success:function(res){
          url = res.data.path;
          rec[0] = {
            'mall': dname,
            'price': price,
            'num': 1,
            'info': [{
              url: url,
              name: title.slice(0,14)+'...',
              svalue: svalue,
              price: price,
              num:'X1'
            }]
          }
          that.setData({
            rec: rec
          });
          that.setData({
            price:price
          });
          that.setData({
            orderformproducts: [{
              pid: pid,
              sid: sid,
              pamount: 1
            }]
          });
        }
      })
      
    }else if(options.code == 2){
      //从购物车点击
      var rec = wx.getStorageSync('rec');
      var newData = [];
      var index = 0;
      //存放pid sid
      var arr = [];
      for(var i = 0;i<rec.length;i++){
        var info = [];
        //每个商家小计价格
        var price = 0;
        for(var j = 0;j<rec[i].info.length;j++){
          if (rec[i].info[j].checked){
            console.log('checked');
            var data = {
              url: rec[i].info[j].url,
              name: rec[i].info[j].pname,
              svalue: rec[i].info[j].sizeName,
              price: rec[i].info[j].price,
              num: 'X'+rec[i].info[j].pNum
            }
            var json = {
              pid:rec[i].info[j].pid,
              sid:rec[i].info[j].sid,
              pamount: rec[i].info[j].pNum
            }
            price += rec[i].info[j].price * rec[i].info[j].pNum;
            arr.push(json);
            info.push(data);
            if (j == rec[i].info.length - 1 && info.length > 0) {
              newData[index] = {
                mall: rec[i].mall,
                price: price,
                info: info
              }
              index++;
            }
          }
        }
      }
      that.setData({
        rec:newData
      });
      that.setData({
        price:options.price
      });
      that.setData({
        orderformproducts:arr
      });
    }else{
      //从订单页面点击
      that.setData({
        code:options.code
      });
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
          var address = res.data.useraddress.uprovince + res.data.useraddress.ucity + res.data.useraddress.uarea + res.data.useraddress.uaddress;
          var username = res.data.useraddress.ubname;
          var phoneNumber = res.data.useraddress.uphonenum;
          var rec = [];
          that.setData({
            address:address
          });
          that.setData({
            username:username
          });
          that.setData({
            phoneNumber:phoneNumber
          });
          var info = [];
          var price = 0;
          for (var j = 0; j < res.data.orderformProductPos.length;j++){
            console.log('b');
            info[j] = {
              url: res.data.baseURL+res.data.orderformProductPos[j].ppicurl,
              name: res.data.orderformProductPos[j].pname,
              svalue: res.data.orderformProductPos[j].sizename,
              price: res.data.orderformProductPos[j].pbuyprice,
              num: 'X' + res.data.orderformProductPos[j].pamount
            }
            price += res.data.orderformProductPos[j].pbuyprice;
          }
          rec[0] = {
            mall: res.data.dname,
            price: price,
            info: info
          }
          that.setData({
            rec:rec
          });
          that.setData({
            price:price
          });
        }
      })
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
          url: 'https://www.jin321.cn/jin321/wx/selectUseraddressByuid.do',
          method:"POST",
          data:{
            uid:res.data
          },
          success:function(res){
            if (res.data.useraddresses.length > 0){
              var data = res.data.useraddresses[0];
              uaid = res.data.useraddresses[0].uaid;
              that.setData({
                username: data.ubname.slice(0, 6)
              });
              that.setData({
                phoneNumber: data.uphonenum.slice(0, 12)
              });
              var value = data.uprovince + data.ucity + data.uarea + data.uaddress;
              that.setData({
                address: value.slice(0, 14) + '...'
              });
            }
          }
        })
      },
    })
  },
  buy(e){
    var that = this;
    if(that.data.phoneNumber && that.data.code == 1){
      var userid = 0;
      var session = '';
      var rec = that.data.rec;
      var orderNumber = rec.length;
      wx.getStorage({
        key: 'userid',
        success: function (res) {
          userid = res.data;
          wx.getStorage({
            key: 'mysession',
            success: function (res) {
              session = res.data;
              if(type == '自提'){
                var data = [{
                  uid: userid,
                  did: that.data.did,
                  uaid: uaid,
                  session: session,
                  orderformproducts: that.data.orderformproducts,
                  omessage: message[0],
                  osendmethod: '自提'
                }]
              }else{
                var data = [{
                  uid: userid,
                  did: that.data.did,
                  uaid: uaid,
                  session: session,
                  orderformproducts: that.data.orderformproducts,
                  omessage: message[0]
                }]
              }
              wx.request({
                url: 'https://www.jin321.cn/jin321/wx/insertOrder.do',
                method: 'POST',
                data: data,
                success: function (res) {
                  wx.requestPayment({
                    timeStamp: res.data.timeStamp + '',
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    signType: 'MD5',
                    paySign: res.data.paySign,
                    success: function (res){
                      wx.navigateTo({
                        url: '../orderSuccess/orderSuccess?address='+that.data.address+'&name='+that.data.username
                      })
                    },
                    fail: function (err) {
                      console.log(err);
                    }
                  });
                }
              })
            },
          })
        }
      });
    } else if (that.data.phoneNumber && that.data.code == 2){
      var userid = 0;
      var session = '';
      var rec = that.data.rec;
      var orderNumber = rec.length;
      var data = []

      wx.getStorage({
        key: 'userid',
        success: function (res) {
          userid = res.data;
          wx.getStorage({
            key: 'mysession',
            success: function (res) {
              session = res.data;
              wx.getStorage({
                key: 'rec',
                success: function(res) {
                  for(var i = 0; i<res.data.length;i++){
                    data[i] = {
                      uid: userid,
                      did: res.data[i].did,
                      uaid: uaid,
                      session: session,
                      orderformproducts: that.data.orderformproducts,
                      omessage: message[i]
                    }
                  }
                  wx.request({
                    url: 'https://www.jin321.cn/jin321/wx/insertOrder.do',
                    method: 'POST',
                    data: data,
                    success: function (res) {
                      wx.requestPayment({
                        timeStamp: res.data.timeStamp + '',
                        nonceStr: res.data.nonceStr,
                        package: res.data.package,
                        signType: 'MD5',
                        paySign: res.data.paySign,
                        success: function (res) {
                          wx.navigateTo({
                            url: '../orderSuccess/orderSuccess?address=' + that.data.address + '&name=' + that.data.username
                          })
                        },
                        fail: function (err) {
                          console.log(err);
                        }
                      });
                    }
                  })
                },
              })
            },
          })
        }
      });

    } else if (that.data.phoneNumber && that.data.code == 3){
      wx.getStorage({
        key: 'mysession',
        success: function(res) {
          var session = res.data;
          wx.request({
            url: 'https://www.jin321.cn/jin321/wx/payOrder.do',
            method: 'POST',
            data:{
              oid:that.data.oid,
              session:session
            },
            success:function(res){
              wx.requestPayment({
                timeStamp: res.data.timeStamp + '',
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: 'MD5',
                paySign: res.data.paySign,
                success: function (res) {
                  wx.navigateTo({
                    url: '../orderSuccess/orderSuccess?address=' + that.data.address + '&name=' + that.data.username
                  })
                },
                fail: function (err) {
                  console.log(err);
                }
              });
            }
          })
        },
      })
    }else{
      wx.showToast({
        title: '请填写收货地址',
        image: '../../images/warn.png',
        duration: 500
      })
    }
  },
  //获取买家留言
  getMessage(e){
    var item = e.currentTarget.dataset.item;
    message[item] = e.detail.value;
  },
  selectAddress(){
    var that = this;
    if(that.data.code == 1){
      var pass = that.data.pass;
      wx.navigateTo({
        url: '../selectAddress/selectAddress?pid=' + pass.pid + '&sid=' + pass.sid + '&svalue=' + pass.svalue + '&title=' + pass.title + '&price=' + pass.price + '&dname=' + pass.dname + '&code=1',
      })
    }else if(that.data.code == 2){
      wx.navigateTo({
        url: '../selectAddress/selectAddress?rec='+that.data.rec+'&code=2',
      })
    }else{
      wx.navigateTo({
        url: '../selectAddress/selectAddress?code=3&oid='+that.data.oid
      })
    }
  },
  getExpress(e){
    var that = this;
    if (that.data.code == 1){
      if (e.detail.value == 1){
        type = '自提'
      }
    }
    this.setData({
      index2: e.detail.value
    })
  }
})