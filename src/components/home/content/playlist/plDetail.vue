<template>
<div class="">
  <div class="pl_outer">
    <div class="pl_main-cont">
      <div class="pl_cont">
        <img :src="lists.cover_url" alt=""/>
          <div class='re-s-title'>
            <p class='fontSize'>{{lists.title}}</p>
            <p class='fontSize'>{{lists.introduce}}</p>
          </div>
      </div>
      <div class="pl_play_all">
        <yd-button v-if='!isplaysong' type="danger" shape="circle" @click.native="selectItem(firstId)">播放全部</yd-button>
        <div class="" v-if='isplaysong'>
          <img @click='_playSong' v-if="isPause" class='controller' src="../../../../assets/play.png" alt="">
          <img  @click='_pauseSong' v-if="!isPause" class='controller' src="../../../../assets/pause.png" alt="">
          <p>
            <span>{{playSong.title}}</span><br>
            <span>{{playSong.nickname}}-{{playSong.title}}</span>
          </p>
          <audio ref='audio' autoplay :src="address+playSong.audio_url"></audio>
          <a class='download' :href='address+playSong.audio_url'>
            <yd-icon color='rgba(255,255,255,0.8)' name="download"></yd-icon>
          </a>
        </div>
      </div>
    </div>
    <div class="pl_bg" :style='"background:#fff url("+lists.cover_url+") left bottom;"'></div>
    <div class="pl_dark"></div>
  </div>
  <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
      <ul id='pl_detail_infimation' slot='list'>
          <li v-for='(item,index) in items' :id='item.id'  @click='selectItem(item.id)'>
              <p>{{index+1}}</p>
              <p>
                  <span>{{item.title}}</span><br>
                  <span>{{item.nickname}}-{{item.title}}</span>
              </p>
          </li>
  </ul>
        <span slot="doneTip">没有更多数据啦~~</span>
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
      </yd-infinitescroll>
</div>
</template>

<script>
import {
  testing
} from 'script/commonVarite'
import Vue from 'vue'
import {
  Toast
} from 'vue-ydui/dist/lib.rem/dialog';
import {
  InfiniteScroll
} from 'vue-ydui/dist/lib.rem/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
import {
  Button,
  ButtonGroup
} from 'vue-ydui/dist/lib.rem/button';
Vue.prototype.$dialog = {
  toast: Toast
};
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      items: [],
      address: testing.address,
      lists: [],
      isplaysong: false,
      isPause: true,
      playSong: {},
      firstId:""
    }
  },
  metaInfo () {
    return {
      title:this.lists.title+' - '+this.lists.introduce+'-中国儿童音乐网'
    }
  },
  mounted() {
    // 分享
    var url2 = testing.address + "/index.php/api/wx_conf?url=" + window.location.href
    var that = this;
    this.$http.get(url2).then(data => {
      wx.config({
        debug: data.body.debug,
        appId: data.body.appId,
        timestamp: data.body.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.body.nonceStr, // 必填，生成签名的随机串
        signature: data.body.signature, // 必填，签名，见附录1
        jsApiList: data.body.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function() {

        // 发送给朋友
        wx.onMenuShareAppMessage({
          title: that.lists.title + '-' + that.lists.introduce, // 分享标题
          desc:that.lists.title + '-中国儿童音乐网', // 分享描述
          link: window.location.href+"?shan",
          imgUrl: that.lists.cover_url, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {

          },
          cancel: function() {
            alert('分享失败')
          }
        });
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: that.lists.title + '-' + that.lists.introduce+"-中国儿童音乐网", // 分享标题
          link: window.location.href+"?shan",
          imgUrl: that.lists.cover_url, // 分享图标
          success: function() {
          },
          cancel: function() {
            alert('分享失败')
          }
        });

        // 出错的时候
        wx.error(function(res) {
          console.log(res)
        });
      });
    })

    this.init()

  },
  methods: {

    // 暂停歌曲
    _pauseSong(){
      this.$refs.audio.pause()
      this.isPause = true
    },
    // 播放歌曲
    _playSong(){
      this.$refs.audio.play()
      this.isPause = false
    },
    // 点击列表
    selectItem(id) {
      //发送请求获取控件的url
      let url = testing.address + "/index.php/api/song-detail/" + id;
      this.$http.get(url).then(data => {
        this.playSong = data.body.data;
        // 播放控件出现
        this.isplaysong = true;
        this.isPause = false
      })
    },
    init() {
      let _id ='';
    if(window.location.search.indexOf('shan')==-1){
     _id=window.location.search.substring(window.location.search.indexOf('=') + 1, window.location.search.length);
    }else{
      _id = window.location.search.substring(window.location.search.indexOf('=') + 1, window.location.search.indexOf('shan')-3);
    }
      let url = testing.address + "/index.php/api/pl/pubdetail"
      this.$http.post(url, {
        'id': _id,
        'page':this.page
      }, {
        emulateJSON: true
      }).then(data => {
        this.firstId=data.body.data.songlist.list[0].id;
        this.lists = data.body.data;
        this.totalPage = data.body.data.songlist.totalPage + '0';
        this.items = data.body.data.songlist.list;
      }, response => {
        this.$dialog.toast({
          mes: "网络开小差了...",
          timeout: 1500
        });
      })
    },
    loadList() {
      this.page++;
      let _id = window.location.search.substring(window.location.search.indexOf('=') + 1, window.location.search.length);
      let url = testing.address + '/index.php/api/pl/pubdetail';
      this.$http.post(url, {
        'id': _id,
        'page':this.page
      }, {
        emulateJSON: true
      }).then(function(response) {
        if (this.page >= response.body.data.songlist.totalPage||_list.length < 20) {
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        var _list = response.body.data.songlist.list;
        this.items = [...this.items, ..._list];
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        this.page++;
      });
    },
  }
}
</script>

<style lang="stylus" scoped rel='stylesheet/stylus'>
li
    height 1.05rem
    border-bottom 0.01rem solid #d0d0d0
    text-align left
    list-style none
    p
        float left
        width 5.5rem
        color #aaaaac
        padding-top 0.33rem
        line-height 0.3rem
        font-size 0.2rem
        height 100%
        span:first-of-type
            font-size 0.3rem
            color #000
            position relative
            top -0.1rem
    p:first-of-type
        width 1.5rem
        text-align center
        font-size 0.3rem
        color #FE5047
.pl_play_all
  height 1.16rem
  button
    margin-top 0.25rem
    min-width 3rem
    height 0.7rem
    font-size 0.3rem
    padding-top 0rem
  .controller
    width 0.9rem
    height 0.9rem
    float left
    margin 0.12rem 0.12rem 0.12rem 0.25rem
  .yd-icon-download
    float right
    margin 0.27rem 0.3rem 0 0
  p
    float left
    color #fff
    width 5.2rem
    overflow hidden
    /*文本不换行*/
    white-space nowrap
    /*文字超出用省略号*/
    text-overflow ellipsis
    text-align left
    padding-top 0.2rem
    line-height 0.4rem
    font-size 0.3rem
    span:nth-of-type(2)
      color rgba(255,255,255,0.8)
      font-size 0.27rem
.pl_cont
  height 3rem
  padding 0.35rem 0.35rem 0
  img
    width 2.6rem
    height 2.6rem
    margin-right 0.35rem
    border-radius 5px
    float left
  .re-s-title
    float left
    width 3.5rem
    color rgba(255, 255, 255, 0.9)
    padding 0.5rem 0
    text-align left
    p
      line-height 0.5rem
      font-size 0.25rem
    p:nth-of-type(1)
      font-size 0.33rem
.pl_outer
.pl_main-cont
  height 4.2rem
  width 100%
  position relative
  z-index 4
  overflow hidden
.pl_bg
  background-size cover
  z-index 1
  filter:blur(36px)
  transform:scale(1.1) translateZ(0)
  -webkit-filter:blur(36px)
  -webkit-transform:scale(1.1) translateZ(0)
.pl_dark
.pl_bg
  position absolute
  bottom 0
  top 0
  width 100%
.pl_dark
  z-index 2
  background rgba(0,0,0,0.5)
</style>
















<!--  -->
