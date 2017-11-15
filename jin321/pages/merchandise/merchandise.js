var didId = {};
var sid = {};
var specification1 = [];
var specification2 = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchandisePic:"https://www.jin321.cn/jin321/productpics/1.png",
    merchandiseTitle:"一本讲述了张鑫的成神之路和张鑫的大学生活的书",
    merchandisePrice:"",
    merchandiseVolume:"",
    merchandiseOriginal:"",
    specification1:"",
    id:0,
    pid:""
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
        var arr1 = [];
        var arr2 = [];
        var b = 0;
        var c = 0;
        var d = 0;
        for (var i = 0; i < res.data.productsizeList.length;i++){
          if (res.data.productsizeList[i].sizename.length<13){
            arr1[b] = res.data.productsizeList[i].sizename
            sid[arr1[b]] = res.data.productsizeList[i].sid;
            b++;
          }else{
            specification2[c] = res.data.productsizeList[i].sizename
            c++;
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
          specification1: arr2
        });
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
    var id = e.currentTarget.dataset.id;
    console.log(id);
    this.setData({
      id: id
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
  }
})