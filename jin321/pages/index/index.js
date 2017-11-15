//图片Id
var picId = {};
//加密
var sign = function (key, json) {
  var sign2 = "";
  if (key.length > 1) {
    var newkey = key.sort();
    var newjson = {};
    for (var i = 0; i < key.length; i++) {
      const k = newkey[i];
      sign2 += k;
      const value = json[key[i]];
      sign2 += value;
      newjson[k] = value;
    }
    newjson["sign"] = sign2;
    return newjson;
  } else {
    var k = key[0];
    var value = json[k];
    sign2 = k + value;
    json["sign"] = sign2;
    var newjson = json;
    return newjson;
  }

}


var t = function(msd){
  var time = parseFloat(msd) / 1000;
  if (null != time && "" != time) {
    if (time > 60 && time < 60 * 60) {
      const m = parseInt(time / 60.0);
      const s = parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60);
      time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60) + "秒";
      return {
        m:m,
        s:s
      }
    }
    else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      const h = parseInt(time / 3600.0);
      const m = parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60);
      const s = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);  
      time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60) + "分钟" +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
      return{
        h:h,
        m:m,
        s:s
      }    
    }
    else {
      time = parseInt(time) + "秒";
      return {
        s:time
      }
    }
  }
}
var timeDate = function(time){
  
}


Page({
  data: {
    //轮播图图片
    imgUrls: [
      "https://www.jin321.cn/jin321/productpics/1.png"
    ],
    time:{

    },
    //秒杀第一个图
    killpicf:"https://www.jin321.cn/jin321/productpics/1.png",
    killpicfprice:"",
    newkillpicfprice:"",
    //秒杀图片
    killpicUrl:[
      {
        url:"https://www.jin321.cn/jin321/productpics/1.png",
        timestart:"",
        timeend:"",
        psoriprice:"",
        pssellprice:""
      }
    ],
     //合伙人图片
    parentspic:[
      //合伙人商品信息
      {
        url:"https://www.jin321.cn/jin321/productpics/1.png",
        pname:"",
        psummary:"",
        psoriprice:"",
        pssellprice:""
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    mode: "scaleToFill"
  },
  onLoad:function(){
    var that = this;
    this.roast();
    wx.authorize({
      scope: 'scope.userInfo',
    })
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: 'mysession',
          success: function (res) {
            wx.request({
              url: "https://www.jin321.cn/jin321/wx/login.do",
              method: "POST",
              data: {
                session: res.data
              },
              success: function (res) {
                if (res.data.code == 4) {
                  wx.login({
                    success: function (res) {
                      wx.request({
                        url: "https://www.jin321.cn/jin321/wx/login.do",
                        method: "POST",
                        data: {
                          "js_code": res.code
                        },
                        success: function (res) {
                          wx.setStorage({
                            key: 'mysession',
                            data: res.data.session
                          });
                          wx.getUserInfo({
                            withCredentials: "true",
                            success: function (res) {
                              var encryptedData = res.encryptedData;
                              var iv = res.iv;
                              wx.getStorage({
                                key: 'mysession',
                                success: function (res) {
                                  wx.request({
                                    url: "https://www.jin321.cn/jin321/wx/getUserMessage.do",
                                    method: "POST",
                                    data: {
                                      "session": res.data,
                                      "encryptedData": encryptedData,
                                      "iv": iv
                                    },
                                    success: function (res) {
                                      wx.setStorage({
                                        key: 'username',
                                        data: res.data.nickName,
                                      });
                                      wx.setStorage({
                                        key: 'avatarUrl',
                                        data: res.data.avatarUrl,
                                      });
                                    }
                                  })
                                },
                              })
                            }
                          })
                          wx.setStorage({
                            key: 'userid',
                            data: res.data.userid
                          });
                          wx.setStorage({
                            key: 'code',
                            data: res.data.code
                          });
                        }
                      });
                    }
                  })
                }
              }
            })
          },
          fail: function (res) {
            if (!res.data) {
              wx.login({
                success: function (res) {
                  wx.request({
                    url: "https://www.jin321.cn/jin321/wx/login.do",
                    method: "POST",
                    data: {
                      "js_code": res.code
                    },
                    success: function (res) {
                      wx.getUserInfo({
                        withCredentials: "true",
                        success: function (res) {
                          var encryptedData = res.encryptedData;
                          var iv = res.iv;
                          wx.getStorage({
                            key: 'mysession',
                            success: function (res) {
                              wx.request({
                                url: "https://www.jin321.cn/jin321/wx/getUserMessage.do",
                                method: "POST",
                                data: {
                                  "session": res.data,
                                  "encryptedData": encryptedData,
                                  "iv": iv
                                },
                                success: function (res) {
                                  wx.setStorage({
                                    key: 'username',
                                    data: res.data.nickName,
                                  });
                                  wx.setStorage({
                                    key: 'avatarUrl',
                                    data: res.data.avatarUrl,
                                  });
                                }
                              })
                            },
                          })
                        }
                      })
                      wx.setStorage({
                        key: 'mysession',
                        data: res.data.session
                      });

                      wx.setStorage({
                        key: 'userid',
                        data: res.data.userid
                      });
                      wx.setStorage({
                        key: 'code',
                        data: res.data.code
                      });
                    }
                  });
                }
              })
            } else {
              wx.login({
                success: function (res) {
                  wx.request({
                    url: "https://www.jin321.cn/jin321/wx/login.do",
                    method: "POST",
                    data: {
                      "js_code": res.code
                    },
                    success: function (res) {
                      wx.getUserInfo({
                        withCredentials: "true",
                        success: function (res) {
                          var encryptedData = res.encryptedData;
                          var iv = res.iv;
                          wx.getStorage({
                            key: 'mysession',
                            success: function (res) {
                              wx.request({
                                url: "https://www.jin321.cn/jin321/wx/getUserMessage.do",
                                method: "POST",
                                data: {
                                  "session": res.data,
                                  "encryptedData": encryptedData,
                                  "iv": iv
                                },
                                success: function (res) {
                                  wx.setStorage({
                                    key: 'username',
                                    data: res.data.nickName,
                                  });
                                  wx.setStorage({
                                    key: 'avatarUrl',
                                    data: res.data.avatarUrl,
                                  });
                                }
                              })
                            },
                          })
                        }
                      })
                      wx.setStorage({
                        key: 'mysession',
                        data: res.data.session
                      });
                      wx.setStorage({
                        key: 'userid',
                        data: res.data.userid
                      });
                      wx.setStorage({
                        key: 'code',
                        data: res.data.code
                      });

                    }
                  });
                }
              })
            }
          }
        })
      },
      fail: function () {
        wx.login({
          success: function (res) {
            console.log(res.code);
            wx.request({
              url: "https://www.jin321.cn/jin321/wx/login.do",
              method: "POST",
              data: {
                "js_code": res.code
              },
              success: function (res) {
                wx.setStorage({
                  key: 'mysession',
                  data: res.data.session
                });
                wx.setStorage({
                  key: 'userid',
                  data: res.data.userid
                });
                wx.setStorage({
                  key: 'code',
                  data: res.data.code
                });
              }
            });
          }
        })
      }
    })
    
  },      
  
  roast:function(){
    var that = this;
    wx.request({
      url: "https://www.jin321.cn/jin321/wx/firstRequest.do",
      method:"POST",
      success:function(res){
        console.log(res.data);
        var picUrl = [];
        var timeKill = {

        };
        var parentspic = [];
        var parentsinfo = [{

        }];
        var time2 = "";
        const basePath = res.data.basePath;
        const roastPic = res.data.rollingpicks;
        const timekill = res.data.timeproducs;
        const parentsp = res.data.productPos;
        const msd = timekill[0].timeend - timekill[0].timestart;
        var a = t(msd);
        that.setData({
          time:a
        });
        for(var i = 0;i<roastPic.length;i++){
          picUrl[i] = basePath + roastPic[i].rpicurl;
          const a = picUrl[i];
          picId[a] = roastPic[i].pid;
        }
        that.setData({
          killpicfprice: timekill[0].psoriprice
        });
        that.setData({
          newkillpicfprice: timekill[0].pssellprice
        });
        picId[timekill[0].ppicurl] = timekill[0].pid;
        for(var j = 1;j<timekill.length;j++){
          const json = {
            url: basePath + timekill[j].ppicurl,
            timestart: timekill[j].timestart,
            timeend: timekill[j].timeend,
            psoriprice: timekill[j].psoriprice,
            pssellprice: timekill[j].pssellprice
          }
          timeKill[j-1] = json;
          const a = timeKill[j-1].url;
          picId[a] = timekill[j].pid;
        }
        console.log(picId);
        for(var k = 0;k<parentsp.length;k++){
          const json = {
            "url": basePath + parentsp[k].ppicurl,
            "pname": parentsp[k].pname,
            "psummary": parentsp[k].psummary,
            psoriprice: parentsp[k].psoriprice,
            pssellprice: parentsp[k].pssellprice
          }
          parentsinfo[k] = json;
          const a = basePath + parentsp[k].ppicurl;
          picId[a] = parentsp[k].pid;
        }
        that.setData({
          imgUrls:picUrl
        });
        that.setData({
          killpicf: basePath+res.data.timeproducs[0].ppicurl
        });
        that.setData({
          killpicUrl:timeKill
        });
        that.setData({
          parentspic: parentspic
        });
        that.setData({
          parentspic: parentsinfo
        });
      }
    })
  },
  jump:function(e){
    var pid = picId[e.currentTarget.dataset.url];
    wx.navigateTo({
      url: '../merchandise/merchandise?pid='+pid,
    })
  },
  search:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  }

  








});



