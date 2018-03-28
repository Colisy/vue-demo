<template>
<div class="page-playController">
  <div id='playController'>
    <div class="playController">
      <img :src="picture.cover_url" alt="" style='border-radius:10px;width:1rem;
                height:1rem;float:left;margin:0.15rem;'>
      <p :class='playDetail ? "p2" : "p1"'>
        <span class='fff'>{{picture.title}}</span><br>
        <span class='grayFade'>{{picture.nickname}}</span>
      </p>
    </div>
    <div class="play">
      <div style="height:55vh;overflow:scroll;position:relative;width:100%">
        <div style='margin-top:0.3rem;'>
          <p style="text-align:center">{{picture.title}}</p>
          <p style="text-align:center">作词：{{picture.lyrics}}</p>
          <p style="text-align:center">作曲：{{picture.composer}}</p>
          <p style="text-align:center">演唱：{{picture.sing}}</p>
          <p style="text-align:center" v-for='(item,index) in picture.lrc_text.split(/\n|！|\?|？|。|,|，/)'>{{item}}</p>
        </div>
      </div>
      <p>
        <img class='_img' v-if='ifCollect' @click='collectSong(picture.id)' src="../../assets/212.png" alt="">
        <yd-icon v-if='!ifCollect' class='_img isCollect' name="star" color='#ff5045' size='0.4rem'></yd-icon>
        <img src="../../assets/12.png" alt="">
      </p>
      <!-- 音乐控件 -->
      <a-player class='_aplayer' style='height:1rem' ref='player' theme='#ff5045' :music="songs" v-if='flag' :autoplay='flag'></a-player>
      <!-- 下载 -->
      <a @click='gotoPrice'><button class="weui-btn" id='download' type="primary" plain="true">
                <img src='../img/logo.png' class='_logo' /> 参与抽奖活动
            </button></a>
    </div>
  </div>
  <!-- 背景 -->
  <div class="page__bg" :style='"background-image:url("+picture.cover_url+");"'></div>
  <!-- 遮罩-->
  <div class='bg_mask' style='opacity:0.76'></div>
</div>
</template>

<script>
import Vue from 'vue'
import VueAplayer from 'vue-aplayer'
import "style/play.styl"
import {
  Icons
} from 'vue-ydui/dist/lib.rem/icons'
Vue.component(Icons.name, Icons)
import {
  testing
} from 'script/commonVarite'
import {
  Toast
} from 'vue-ydui/dist/lib.rem/dialog';
import {
  Slider,
  SliderItem
} from 'vue-ydui/dist/lib.rem/slider';

Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
Vue.prototype.$dialog = {
  toast: Toast
};
export default {
  name: 'playController',
  components: {
    'a-player': VueAplayer
  },
  data() {
    return {
      address: testing.address,
      datas: [],
      playDetail: true,
      ifCollect: true,
      picture: '',
      songs: [],
      flag: false
    }
  },
  watch: {
    songs(newMusic) {
      var obj = newMusic[0];
      if (this.flag) {
        setTimeout(() => {
          let aplayer = this.$refs.player.control;
          aplayer.play();
        }, 20)

      }
    }
  },
  beforeRouteLeave(to, from, next) {
    let aplayer = this.$refs.player.control
    aplayer.pause()
    next(() => {
      path: to.path
    })
  },
  beforeRouteEnter(to, from, next) {
    if (from.fullPath == '/') {
      localStorage.setItem('isSongPlayed', 'true')
    } else {
      localStorage.clear('isSongPlayed');
    }
    next(() => {
      path: to.path
    })
  },
  mounted() {
    // 分享
    var url2 = testing.address + "/index.php/api/wx_conf?url=" + window.location.href
    var localurl = window.location.href;
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
          title: that.picture.title + '-' + that.picture.nickname, // 分享标题
          desc:'中国儿童音乐网', // 分享描述
          link: window.location.href+"?shan",
          imgUrl: that.picture.cover_url, // 分享图标
          type: 'music', // 分享类型,music、video或link，不填默认为link
          dataUrl: testing.address + that.picture.audio_url, // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            that.shareCount(that)
          },
          cancel: function() {
            alert('分享失败')
          }
        });
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: that.picture.title + '-' + that.picture.nickname + '-中国儿童音乐网', // 分享标题
          link: window.location.href+"?shan",
          imgUrl: that.picture.cover_url, // 分享图标
          success: function() {
            that.shareCount(that)
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

    setTimeout(() => {
      this.init()
    }, 20);

  },
  metaInfo () {
      return {
          title:this.picture.title + '-' + this.picture.nickname + '-中国儿童音乐网'
      }
  },
  methods: {
    gotoPrice(){
      window.location.href="http://m.feizhugu.com/luckyDraw?uid="+this.$cookie.get('uid')
    },
    shareCount(that) {
      let url = testing.address + '/index.php/prize/add';
      that.$http.post(url, {
        'uid': that.$cookie.get('uid'),
        'type':'wx'
      }, {
        emulateJSON: true
      }).then(data => {
        if(data.body.status=='ok'){
        that.$dialog.toast({
          mes: data.body.msg,
          timeout: 1500
        });
        }
      })
    },
    init() {
        let _id ='';
      if(window.location.search.indexOf('shan')==-1){
       _id=window.location.search.substring(window.location.search.indexOf('=') + 1, window.location.search.length);
      }else{
        _id = window.location.search.substring(window.location.search.indexOf('=') + 1, window.location.search.indexOf('shan')-3);
      }
      let  url = testing.address + "/index.php/api/song-detail/" + _id;
      localStorage.setItem('idid', _id)
      this.$http.get(url).then(data => {
        this.picture = data.body.data;
        this.songs = [{
          author: data.body.data.sing,
          url: testing.address + data.body.data.audio_url,
          pic: data.body.data.cover_url
        }]
        this.flag = true;
      })
    },
    collectSong(id) {
      let url = testing.address + '/index.php/api/fav';
      this.$http.post(url, {
        'type': 'song',
        'id': id
      }, {
        emulateJSON: true
      }).then(data => {
        this.$dialog.toast({
          mes: data.body.msg,
          timeout: 1500
        });
        if (data.body.remove == false) {
          this.ifCollect = true
        } else {
          this.ifCollect = false
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel='stylesheet/stylus'>
/*下载  */
#download{
  width:70%;
  position:relative;
  z-index:4;
  border-radius:30px;
  background-color: #ff5045;
  border:0;
  padding:0;
  height:0.9rem;
  font-size:0.35rem;
  color:#fff;
}
#download ._logo{
  width:0.7rem;
  height:0.7rem;
  position:absolute;
  top:0.1rem;
  left:0.1rem;
}

.page__bg
    position absolute
    top 0.89rem
    left 0
    bottom 0
    z-index 1
    width 100%
    background-size  cover
    background-repeat  no-repeat
    background-position  bottom center
.bg_mask
  position absolute
  top 0.89rem
  bottom 0
  left 0
  z-index 2
  width 100%
  background-color #000

#playController
    position relative
    z-index 4
    width 100%
    top 0
    left 0
    bottom 0
.playController
    height 1.24rem
    -webkit-transform translateZ(0)
    background rgba(0,0,0,0.1)
    width 100%
    p
        float left
        line-height 0.45rem
        text-align left
        padding 0.25rem 0 0 0.3rem
        span:first-of-type
            font-size 0.3rem
        span:nth-of-type(2)
            font-size 0.26rem
    .p1
        width 4rem
        text-align left
    .p2
        width 4.5rem
        height 90%
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        text-align center
    ._cplay
    ._next
    ._cpause
        margin 0.3rem 0.25rem
        float right
        width 0.55rem
        height 0.6rem
        display inline-block
    ._cplay
        background url('../../assets/cplay.png') no-repeat center center;
        background-size 100% 100%
    ._cpause
        background url('../../assets/stop.png') no-repeat center center;
        background-size 100% 100%
.play
    width 100%
    div
        overflow scroll
        position relative
        span
            display inline-block
            width 5rem
            height 5rem
            border-radius 50%
            position absolute
            left 18%
            top 15%
            background linear-gradient(to top, #e8a409, #4e4f50)
        img
            width 96%
            height 96%
            border-radius 50%
            margin 2.5% 2%
        &>div
            line-height 0.94rem
            font-size 0.3rem
            color #fff
    p
        text-align left
        img
            width 0.5rem
            height 0.5rem
            margin-left 0.4rem
            position relative
            margin-top 0
            vertical-align top
        .isCollect
        ._img
            float right
            right 0.4rem
            position absolute
._playIconHome
    float left
    position relative
    margin 0.4rem 0 0 0.3rem
    width 0.5rem
    height 0.5rem
    transform rotate(-90deg)
    -moz-transform rotate(-90deg)
    -webkit-transform rotate(-90deg)
</style>
