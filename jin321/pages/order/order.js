//记录cartid
var carId = [];
//记录购买物品的数量
var products = [];
//记录pid
var pId = {};
//买家留言
var message = {};
var uaid= 0;
//随机字符串
var nonceStr = '';
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
    orderformproducts:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
    var that = this;
    if(options.code == 1){
      //从详情页面点击
      var pid = options.pid;
      var sid = options.sid;
      var svalue = options.svalue;
      var price = options.price;
      var title = options.title;
      var dname = options.dname;
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
              name: title,
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
            orderformproducts: [[{
              pid: pid,
              sid: sid,
              pamount: 1
            }]]
          });
        }
      })
      
    }else if(options.code == 2){
      //从购物车点击
      var rec = options.rec;
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
            var data = {
              url: rec[i].info[j].url,
              name: rec[i].info[j].pname,
              svalue: rec[i].info[j].sizeName,
              price: rec[i].info[j].pssellprice,
              num: 'X'+rec[i].info[j].pnumber
            }
            var json = {
              pid:rec[i].info[j].pid,
              sid:rec[i].info[j].sid,
              pamount: rec[i].info[j].pnumber
            }
            price += rec[i].info[j].pssellprice * rec[i].info[j].pnumber;
            arr.push(json);
            info.push(data);
          }else if(j == rec[i].info.length-1&&info.length>0){
            newData[index] = {
              mall:rec[i].mall,
              price:price,
              info:info
            }
            index++;
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
            var data = res.data.useraddresses[0];
            uaid = res.data.useraddresses[0].uaid;
            that.setData({
              username: data.ubname.slice(0,6)
            });
            that.setData({
              phoneNumber: data.uphonenum.slice(0,12)
            });
            var value = data.uprovince + data.ucity + data.uarea + data.uaddress;
            that.setData({
              address: value.slice(0,14)+'...'
            });
          }
        })
      },
    })
  },
  buy(e){
    var that = this;
    if(that.data.phoneNumber){
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
              wx.request({
                url: 'https://www.jin321.cn/jin321/wx/insertOrder.do',
                method: 'POST',
                data: {
                  uid: userid,
                  uaid: uaid,
                  omessage: '',
                  session: session,
                  orderformproducts: that.data.orderformproducts
                },
                success: function (res) {
                  wx.requestPayment({
                    timeStamp: res.data.timeStamp + '',
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    signType: 'MD5',
                    paySign: res.data.paySign,
                    success: function (res) {
                      console.log(res);
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
    var mall = e.currentTarget.dataset.mall;
    message[mall] = e.detail.value;
  }
})