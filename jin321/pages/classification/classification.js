//一级标签
var typeId = [];


Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:[],
    borderRight:"",
    borderLeft:"",
    id:0,
    secondType:[],
    
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://www.jin321.cn/jin321/wx/selectAllFirstProducttype.do",
      method:"POST",
      success:function(res){
        var typename = [];
        for(var i = 0;i<res.data.length;i++){
          typename[i] = res.data[i].typename;
          const a = typename[i];
          typeId[a] = res.data[i].tid; 
        }
        that.setData({
          type:typename
        });
        var tid = typeId[res.data[0].typename];
        var secondType = [];
        wx.request({
          url: "https://www.jin321.cn/jin321/wx/selectSecondProducttype.do",
          method: "POST",
          data: {
            tid: tid
          },
          success: function (res) {
            var j = 0;
            for (var i = 0; i < res.data.length; i = i + 3,j++) {
              if (i + 1 == res.data.length) {
                secondType[j] = [{
                  url: "https://www.jin321.cn/jin321/" + res.data[i].picurl,
                  name: res.data[i].typename,
                  tid:res.data[i].tid
                }
                ];
              } else if (i + 2 == res.data.length) {
                secondType[j] = [{
                  url: "https://www.jin321.cn/jin321/" + res.data[i].picurl,
                  name: res.data[i].typename,
                  tid: res.data[i].tid
                },
                {
                  url: "https://www.jin321.cn/jin321/" + res.data[i + 1].picurl,
                  name: res.data[i + 1].typename,
                  tid: res.data[i+1].tid
                }
                ];
              } else if (i + 3 <= res.data.length) {
                secondType[j] = [{
                  url: "https://www.jin321.cn/jin321/" + res.data[i].picurl,
                  name: res.data[i].typename,
                  tid: res.data[i].tid
                },
                {
                  url: "https://www.jin321.cn/jin321/" + res.data[i + 1].picurl,
                  name: res.data[i + 1].typename,
                  tid: res.data[i+1].tid
                },
                {
                  url: "https://www.jin321.cn/jin321/" + res.data[i + 2].picurl,
                  name: res.data[i + 2].typename,
                  tid: res.data[i+2].tid
                }];
              }
            }
            that.setData({
              secondType: secondType
            });
          }
        })
      }
    });
   

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
  chooseType:function(e){
    var that = this;
    var secondType = [];
    var id = e.currentTarget.dataset.id;
    this.setData({
      id: id
    });
    var tid = typeId[e.currentTarget.dataset.content];
    wx.request({
      url: "https://www.jin321.cn/jin321/wx/selectSecondProducttype.do",
      method:"POST",
      data:{
        tid:tid
      },
      success:function(res){
        var j = 0;
        for(var i = 0;i<res.data.length;i=i+3,j++){
          if(i+1 == res.data.length){
            secondType[j] = [{
              url: "https://www.jin321.cn/jin321/" + res.data[i].picurl,
              name: res.data[i].typename,
              tid:res.data[i].tid
            }
            ]
          }else if(i+2 == res.data.length){
            secondType[j] = [{
              url: "https://www.jin321.cn/jin321/" + res.data[i].picurl,
              name: res.data[i].typename,
              tid: res.data[i].tid
            },
            {
              url: "https://www.jin321.cn/jin321/" + res.data[i + 1].picurl,
              name: res.data[i + 1].typename,
              tid: res.data[i+1].tid
            }
            ]
          }else if(i+3 <= res.data.length){
            secondType[j] = [{
              url: "https://www.jin321.cn/jin321/" + res.data[i].picurl,
              name: res.data[i].typename,
              tid: res.data[i].tid
            },
            {
              url: "https://www.jin321.cn/jin321/" + res.data[i + 1].picurl,
              name: res.data[i + 1].typename,
              tid: res.data[i+1].tid
            },
            {
              url: "https://www.jin321.cn/jin321/" + res.data[i + 2].picurl,
              name: res.data[i + 2].typename,
              tid: res.data[i+2].tid
            }]
          }
        }
        that.setData({
          secondType:secondType
        });
      }
    })
  },
  thirdType:function(e){
    var tid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../search/search?tid='+tid,
    })
  },
  search: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  }

  
})