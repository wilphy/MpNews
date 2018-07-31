// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '000'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var temp = this;
    wx.request({
      url: 'https://im.meiriv.com/test/get.php',
      data: {
        type: 'GetGraphic',
        id: options.id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        temp.setData({
          cover: res.data.cover,
          title: options.title,
          time: timestampToTime(res.data.time),
          contentDetail: JSON.parse(res.data.content),
        });
      },
    });

    // 时间戳转换
    function timestampToTime(timestamp) {
      var date = new Date(timestamp * 1);
      var Y = date.getFullYear() + '-',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
        D = date.getDate() + ' ',
        h = date.getHours() + ':',
        m = date.getMinutes() + ':',
        s = date.getSeconds();
      return Y + M + D + h + m + s;
    };


    // 时间处理
    var retTime = temp.data.time.time;
    console.log(retTime);

    function handleTime(retTime) {
      var temp = this;

      var now = new Date().getTime();
      var intervalTime = (now - retTime) / (24 * 60 * 60 * 1000);

      if (intervalTime > 1) {
        console.log(intervalTime);
        // temp.setData({
        //   time: intervalTime
        // })
      } else {
        console.log(intervalTime);
        // temp.setData({
        //   time: "adad"
        // })
      }
    }
    handleTime();

    

    //推荐列表请求
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
      success: function(res) {
        temp.setData({
          articleList: res.data
        })
      },
    });
  },

  // //时间处理
  // handleTime: function(time) {
  //   var temp = this;

  //   var now = new Date().getTime();
  //   var intervalTime = (now - time) / (24 * 60 * 60 * 1000);

  //   if (intervalTime > 1) {
  //     console.log("aaa");
  //     temp.setData({
  //       time: intervalTime
  //     })
  //   } else {
  //     console.log("aaa");      
  //     temp.setData({
  //       time: "adad"
  //     })
  //   }
  // }
  
})