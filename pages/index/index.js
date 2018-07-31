Page({
  data: {
    imgUrls: [
      
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    
  },

  onLoad: function() {
    var temp = this;
  
    wx.request({
      url: 'https://im.meiriv.com/test/get.php',
      data: {
        type: 'GetAll',
        page: Math.floor(Math.random() * 10 + 1),
        count: 5
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        temp.setData({
          articleList: res.data,
        })
      },
    })
  },


  //加载更多
  onReachBottom: function() {
    var temp = this;
    wx.request({
      url: 'https://im.meiriv.com/test/get.php',
      data: {
        type: 'GetAll',
        page: Math.floor(Math.random() * 10 + 1),
        count: 3
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        temp.setData({
          articleList: temp.data.articleList.concat(res.data)
        })
      },
    })
  }
})