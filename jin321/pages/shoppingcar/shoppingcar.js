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
    mall:"jin商城",
    products:"",
    isChooseStore:false,
    isChooseProducts:false,
    productName:"张鑫大神张鑫大",
    sizeName:"手稿",
    pNum:1,
    productPrice:"0",
    rec:[],
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
            var basePath = res.data.baseUrl;
            var data = [];
            for (var i = 0, ind = 0;i<res.data.chartDetail.length;i++){
              var info = [];
              data[i] = {
                mall: res.data.chartDetail[i].dname,
                checked:false
              }
              for (var j = 0; j < res.data.chartDetail[i].chartDetails.length; j++ , ind++){
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
                  ind:ind,
                  checked:false
                }
              }
              data[i].info = info;
            }
            that.setData({
              rec:data
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
            var basePath = res.data.baseUrl;
            var data = [];
            for (var i = 0, ind = 0; i < res.data.chartDetail.length; i++) {
              var info = [];
              data[i] = {
                mall: res.data.chartDetail[i].dname,
                checked:false
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
                  checked:false,
                }
              }
              data[i].info = info;
            }
            that.setData({
              rec: data
            });
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
  },
  add:function(e){
    var that = this;
    var ind = e.currentTarget.dataset.ind;
    var carid = carId[ind];
    var rec = this.data.rec;
    //现加入购物车的数量
    var number = products[ind] + 1;
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
    console.log(carid);
    wx.request({
      url: "https://www.jin321.cn/jin321/wx/deleteChart.do",
      method:"POST",
      data:{
        "chartid":carid
      },
      success:function(res){
        console.log(res);
        var sum = 0;
        var rec = that.data.rec;
        console.log(rec);
        if(res.data.code == 1){
          for (var k = 0; k < rec.length; k++) {
            var q = 0;
            for (var o = 0; o < rec[k].info.length; o++ , q++) {
              if(ind == sum){
                that.remove(rec[k].info,rec[k].info[q]);
                console.log(rec);
                that.setData({
                  rec:rec
                });
              }else{
                sum++;
              }
            }
          }
        }
      }
    })
  },
  remove: function(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  },
  check:function(e){
    var controller = e.currentTarget.dataset.controller;
    var checked = e.currentTarget.dataset.checked;
    var that = this;
    var rec = that.data.rec;
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
          break;
        }
      }
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
          break;
        }
      }
    }
  }

})