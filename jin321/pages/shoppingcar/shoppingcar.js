//记录cartid
var carId = [];
//记录购买物品的数量
var products = []; 
//记录pid
var pId = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mall:"",
    products:"",
    isChooseStore:false,
    isChooseProducts:false,
    productName:"",
    sizeName:"",
    pNum:1,
    productPrice:"0",
    rec:[],
    price:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: "https://www.jin321.cn/jin321/wx/selectChartByUserId.do",
          method: "POST",
          data: {
            uid:res.data
          },
          success: function (res) {
            if(res.data.chartDetail){
              var basePath = res.data.baseUrl;
              var data = [];
              for (var i = 0, ind = 0; i < res.data.chartDetail.length; i++) {
                var info = [];
                data[i] = {
                  mall: res.data.chartDetail[i].dname,
                  checked: false
                }
                for (var j = 0; j < res.data.chartDetail[i].chartDetails.length; j++ , ind++) {
                  carId[ind] = res.data.chartDetail[i].chartDetails[j].cartid;
                  products[ind] = res.data.chartDetail[i].chartDetails[j].pnumber;
                  const url = "https://www.jin321.cn/jin321/" + res.data.chartDetail[i].chartDetails[j].ppicurl;
                  pId[url] = res.data.chartDetail[i].chartDetails[j].pid;
                  info[j] = {
                    url: url,
                    pname: res.data.chartDetail[i].chartDetails[j].pname,
                    sizeName: res.data.chartDetail[i].chartDetails[j].sizename,
                    price: res.data.chartDetail[i].chartDetails[j].pssellprice,
                    pNum: res.data.chartDetail[i].chartDetails[j].pnumber,
                    ind: ind,
                    checked: false,
                    pid: res.data.chartDetail[i].chartDetails[j].pid,
                    sid: res.data.chartDetail[i].chartDetails[j].sid,
                    i:i,
                    j:j
                  }
                }
                data[i].info = info;
              }
              that.setData({
                rec: data
              });
            }else{
              console.log("没商品");
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
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: "https://www.jin321.cn/jin321/wx/selectChartByUserId.do",
          method: "POST",
          data: {
            uid: res.data
          },
          success: function (res) {
            if (res.data.chartDetail) {
              var basePath = res.data.baseUrl;
              var data = [];
              for (var i = 0, ind = 0; i < res.data.chartDetail.length; i++) {
                var info = [];
                data[i] = {
                  mall: res.data.chartDetail[i].dname,
                  checked: false
                }
                for (var j = 0; j < res.data.chartDetail[i].chartDetails.length; j++ , ind++) {
                  carId[ind] = res.data.chartDetail[i].chartDetails[j].cartid;
                  products[ind] = res.data.chartDetail[i].chartDetails[j].pnumber;
                  const url = "https://www.jin321.cn/jin321/" + res.data.chartDetail[i].chartDetails[j].ppicurl;
                  pId[url] = res.data.chartDetail[i].chartDetails[j].pid;
                  info[j] = {
                    url: url,
                    pname: res.data.chartDetail[i].chartDetails[j].pname,
                    sizeName: res.data.chartDetail[i].chartDetails[j].sizename,
                    price: res.data.chartDetail[i].chartDetails[j].pssellprice,
                    pNum: res.data.chartDetail[i].chartDetails[j].pnumber,
                    ind: ind,
                    checked: false,
                    pid: res.data.chartDetail[i].chartDetails[j].pid,
                    sid: res.data.chartDetail[i].chartDetails[j].sid,
                    i:i,
                    j:j
                  }
                }
                data[i].info = info;
              }
              that.setData({
                rec: data
              });
            } else {
              console.log("没商品");
            }
          }
        })
      },
    })
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
  reduce:function(e){
    var that = this;
    var ind = e.currentTarget.dataset.ind;
    var carid = carId[ind];
    var rec = this.data.rec;
    var price = 0;
    //现加入购物车的数量
    var number = products[ind]-1;
    //计数
    var sum = 0;
    if(number > 0){
      products[ind]--;
      for (var k = 0; k < rec.length; k++) {
        for (var o = 0; o < rec[k].info.length; o++) {
          if (ind == sum) {
            rec[k].info[o].pNum = number;
            that.setData({
              rec:rec
            });
            sum++;
            wx.request({
              url: "https://www.jin321.cn/jin321/wx/updateChartPnumber.do",
              method: "POST",
              data: {
                chartid: carid,
                pnumber: number
              },
              success: function (res) {
                return;
              }
            })
          } else {
            sum++;
          }
        }
      }
      

    }else{

    }
    for (var i = 0; i < rec.length; i++) {
      for (var j = 0; j < rec[i].info.length; j++) {
        if (rec[i].info[j].checked) {
          price += rec[i].info[j].price * rec[i].info[j].pNum;
        }
      }
    }
    that.setData({
      price: price
    });
  },
  add:function(e){
    var that = this;
    var ind = e.currentTarget.dataset.ind;
    var carid = carId[ind];
    var rec = this.data.rec;
    //现加入购物车的数量
    var number = products[ind] + 1;
    var price = 0;
    var rec = that.data.rec;
    //计数
    var sum = 0;
    if (number > 0) {
      products[ind]++;
      for (var k = 0; k < rec.length; k++) {
        for (var o = 0; o < rec[k].info.length; o++) {
          if (ind == sum) {
            rec[k].info[o].pNum = number;
            that.setData({
              rec: rec
            });
            sum++;
            wx.request({
              url: "https://www.jin321.cn/jin321/wx/updateChartPnumber.do",
              method: "POST",
              data: {
                chartid: carid,
                pnumber: number
              },
              success: function (res) {
                return;
              }
            })
          } else {
            sum++;
          }
        }
      }
    } else {

    }
    for (var i = 0; i < rec.length; i++) {
      for (var j = 0; j < rec[i].info.length; j++) {
        if (rec[i].info[j].checked) {
          price += rec[i].info[j].price * rec[i].info[j].pNum;
        }
      }
    }
    that.setData({
      price: price
    });
  },
  jump:function(e){
    var pid = pId[e.currentTarget.dataset.url];
    wx.navigateTo({
      url: '../merchandise/merchandise?pid=' + pid,
    })
  },
  delete:function(e){
    var that = this;
    var ind = e.currentTarget.dataset.ind;
    var carid = carId[ind];
    var rec = that.data.rec;
    var price = 0;
    wx.request({
      url: "https://www.jin321.cn/jin321/wx/deleteChart.do",
      method:"POST",
      data:{
        chartid:carid
      },
      success:function(res){
        if(res.data.code == 1){
          for (var k = 0; k < rec.length; k++) {
            var q = 0;
            if (rec[k].info.length == 0) {
              
            }else{
              rec.splice(k,1);
              that.setData({
                rec: rec
              });
            }
            for (var o = 0; o < rec[k].info.length; o++ , q++) {
              var sum = rec[k].info[q].ind;
              if(ind == sum){
                that.remove(rec[k].info,rec[k].info[q]);
                console.log(rec);
                that.setData({
                  rec:rec
                });
              }
            }
          }
        }
      }
    })
    for (var i = 0; i < rec.length; i++) {
      for (var j = 0; j < rec[i].info.length; j++) {
        if (rec[i].info[j].checked) {
          price += rec[i].info[j].price * rec[i].info[j].pNum;
        }
      }
    }
    that.setData({
      price: price
    });
  },
  remove: function(arr, val) {
    var that = this;
    var rec = that.data.rec;
    var price = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        for (var i = 0; i < rec.length; i++) {
          for (var j = 0; j < rec[i].info.length; j++) {
            if (rec[i].info[j].checked) {
              price += rec[i].info[j].price * rec[i].info[j].pNum;
            }
          }
        }
        that.setData({
          price: price
        });
        break;
      }
    }
  },
  check:function(e){
    var controller = e.currentTarget.dataset.controller;
    var checked = e.currentTarget.dataset.checked;
    var that = this;
    var rec = that.data.rec;
    var price = 0;
    if(!checked){
      for (var i = 0; i < rec.length; i++) {
        if (controller == i) {
          for (var j = 0; j < rec[i].info.length; j++) {
            rec[i].checked = true;
            rec[i].info[j].checked = true;
          }
          that.setData({
            rec: rec
          });
        }
      }
      for(var i = 0;i < rec.length;i++){
        for(var j = 0;j < rec[i].info.length;j++){
          if(rec[i].info[j].checked){
            console.log(rec[i].info[j].price);
            console.log(rec[i].info[j].pNum);
            price += rec[i].info[j].price * rec[i].info[j].pNum;
          }
        }
      }
      that.setData({
        price:price
      });
    }else{
      for (var i = 0; i < rec.length; i++) {
        if (controller == i) {
          for (var j = 0; j < rec[i].info.length; j++) {
            rec[i].checked = false;
            rec[i].info[j].checked = false;
          }
          that.setData({
            rec: rec
          });
        }
      }
      for (var i = 0; i < rec.length; i++) {
        for (var j = 0; j < rec[i].info.length; j++) {
          if (rec[i].info[j].checked) {
            price += rec[i].info[j].price * rec[i].info[j].pNum;
          }
        }
      }
      console.log(price);
      that.setData({
        price: price
      });
    }
  },
  check2(e){
    var that = this;
    var price = 0;
    var rec = that.data.rec;
    var big = e.currentTarget.dataset.i;
    var small = e.currentTarget.dataset.j;
    rec[big].info[small].checked = !rec[big].info[small].checked;
    for (var i = 0; i < rec.length; i++) {
      for (var j = 0; j < rec[i].info.length; j++) {
        if (rec[i].info[j].checked) {
          price += rec[i].info[j].price * rec[i].info[j].pNum;
        }
      }
    }
    that.setData({
      price: price
    });
    that.setData({
      rec: rec
    });
  },
  order(e){
    var that = this;
    var rec = that.data.rec;
    var price = that.data.price;
    for (var i = 0; i < rec.length; i++) {
      for (var j = 0; j < rec[i].info.length; j++) {
        if (rec[i].info[j].checked) {
          wx.navigateTo({
            url: '../order/order?rec=' + rec + '&price=' + price + '&code=2',
          })
        }
      }
    }
  }
})