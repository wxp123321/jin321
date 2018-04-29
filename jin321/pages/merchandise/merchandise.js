var didId = {};
var sid = {};
var specification1 = [];
var specification2 = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    merchandiseTitle:"",
    merchandisePrice:"",
    merchandiseVolume:"",
    merchandiseOriginal:"",
    specification1:"",
    id:0,
    pid:"",
    img:[],
    content:{},
    content2:{},
    svalue:'',
    dname:'',
    did: '',
    jianjie: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      pid: options.pid
    });
    wx.request({
      url: "https://www.jin321.cn/jin321/wx/selectFullProductById.do",
      method:"POST",
      data:{
        pid:options.pid
      },
      success:function(res){
        that.setData({
          jianjie:res.data.psummary.slice(0,50)+'...'
        });
        that.setData({
          did: res.data.did
        });
        that.setData({
          dname:res.data.dname
        });
        that.setData({
          svalue: res.data.productsizeList[0].sizename
        });
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var arr4 = [];
        var content = {};
        var content2 = {};
        var b = 0;
        var c = 0;
        var d = 0;
        for (var i = 0; i < res.data.productsizeList.length;i++){
          if (res.data.productsizeList[i].sizename.length<300){
            arr1[b] = res.data.productsizeList[i].sizename;
            sid[arr1[b]] = res.data.productsizeList[i].sid;
            content[res.data.productsizeList[i].sizename] = res.data.productsizeList[i].pssellprice;
            content2[res.data.productsizeList[i].sizename] = res.data.productsizeList[i].psoriprice;
            b++;
          }else{
            specification2[c] = res.data.productsizeList[i].sizename;
            content[res.data.productsizeList[i].sizename] = res.data.productsizeList[i].pssellprice;
            content2[res.data.productsizeList[i].sizename] = res.data.productsizeList[i].psoriprice;
            c++;
          } 
        }
        that.setData({
          content2:content2
        });
        that.setData({
          content:content
        });
        for (var o = 0; o < res.data.productpicsList.length;o++){
          arr4[o] = res.data.basePathNoPort + res.data.productpicsList[o].ppicurl;
        }
        for (var k = 0; k < res.data.productdetailList.length;k++){
          arr3[k] = {
            url: res.data.basePathNoPort + res.data.productdetailList[k].picurl
          }
        }
        for(var j = 0;j<arr1.length;j = j+2){
          arr2[d] = {
            "one":arr1[j],
            "two":arr1[j+1]
          }
          d++;
        }
        that.setData({
          imgUrls:arr4
        });
        that.setData({
          specification1: arr2
        });
        that.setData({
          img:arr3
        })
        that.setData({
          merchandiseTitle:res.data.pname
        });
        that.setData({
          merchandisePic: res.data.basePathNoPort+res.data.productpicsList[0].ppicurl
        });
        that.setData({
          merchandisePrice: res.data.productsizeList[0].pssellprice
        });
        that.setData({
          merchandiseOriginal: res.data.productsizeList[0].psoriprice
        });
        that.setData({
          merchandiseVolume: res.data.psellnum
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
    
  },
  chooseSpecification:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var value = e.currentTarget.dataset.content;
    var price = that.data.content[value];
    var price2 = that.data.content2[value];
    that.setData({
      svalue:value
    });
    that.setData({
      id:id
    });
    that.setData({
      merchandisePrice:price
    });
    that.setData({
      merchandiseOriginal:price2
    });
  },
  
  addShoppingCar:function(){
    var that = this;
    var num = this.data.id%2;
    var n = Math.ceil(this.data.id / 2);
    if(num == 0){
      var content = this.data.specification1[n].one;
    }else{
      var content = this.data.specification1[n-1].two;
    }
    var s = sid[content];
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: "https://www.jin321.cn/jin321/wx/insertChart.do",
          method:"POST",
          data:{
            pid:that.data.pid,
            uid:res.data,
            pnumber:1,
            sid:s
          },
          success:function(res){
            wx.showToast({
              title: '添加购物车成功',
              icon: 'success',
              duration: 500
            })
          }
        })
      },
    })
  },
  order:function(e){
    var that = this;
    var id = sid[that.data.svalue];
    var price = that.data.merchandisePrice;
    wx.navigateTo({
      url: '../order/order?code=1&pid=' + that.data.pid + '&sid=' + id + '&svalue=' + that.data.svalue + '&price=' + price + '&title=' + that.data.merchandiseTitle+'&dname='+that.data.dname+'&did='+that.data.did,
    })
  }
})