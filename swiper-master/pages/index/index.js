Page({
  data: {
    huaw:0, //左移距离 勿改
    i: 2, //当前最大的下标 勿改

    list:[1,2,3,4,5,6], //轮播数据
    w:300,              //item 的宽度 rpx
    h:500,              //item 的搞度 rpx
    scale:0.8,          //左右两边的缩放比例
    duration: 300,      //滑动动画时长 ms
    autoplay:true,      //是否自动轮播
    interval: 3000,     //自动切换时间间隔 ms(开启轮播生效)

  },
  onLoad: function () {
    //防止一开始左滑
    var list = this.data.list;
    list.unshift(list[list.length-1]);
    list.pop();
    this.setData({list,huaw:-this.data.w-(this.data.w*3-750)/2});

    if(this.data.autoplay){
      setInterval(() => {
        var i = this.data.i;
        ++i;
        this.setData({ huaw: this.data.huaw - this.data.w, i: i, d: 'right', change: true })
      }, this.data.interval)
    }

  },

  // 过渡动画结束时关闭过渡动画change,
  // 改变数据列表顺序并瞬间恢复原位,覆盖当前效果
  // 此方法滑动过快时依然存在问题
  finish(){
    var list=this.data.list;
    var d=this.data.d;
    if(d=='right'){
      list.push(list[0]);
      list.shift();
    }else{
      list.unshift(list[list.length - 1]);
      list.pop();
    }
    this.setData({ change: false, i: 2, list, huaw: -this.data.w - (this.data.w * 3 - 750) / 2})
  },
  //触摸开始的事件
  swiperTouchstart: function (e) {
    let startClinetX = e.changedTouches[0].clientX;
    this.setData({
      startClinetX: startClinetX, //触摸开始位置；
      startTimestamp: e.timeStamp, //触摸开始时间；
    })
  },
  //触摸结束事件
  swiperTouchend: function (e) {
    let times = e.timeStamp - this.data.startTimestamp, //时间间隔；
        distance = e.changedTouches[0].clientX - this.data.startClinetX; //距离间隔；
    var swiperList = this.data.swiperList;
    var i=this.data.i;
    //判断
    if (times < 500 && Math.abs(distance) > 10&&!this.data.change) {
      this.setData({change:true})
      if (distance > 0) {
        //左滑
        this.setData({ huaw: this.data.huaw+this.data.w,i:--i,d:'left'})
      } else {
        //右滑
        this.setData({ huaw: this.data.huaw - this.data.w,i:++i,d:'right'})
      }
    }
  },

})
