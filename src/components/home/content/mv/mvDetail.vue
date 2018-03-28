<template>
    <div id='mvDetail' v-if='meDetail'>
        <div class="detailOfVideo">
            <video controls ref='myVideo' :poster="address+item.cover_img" id="myvideo" :src='address+item.mv_url' webkit-playsinline="true"></video>
        </div>
        <div class="description">
            <p>
                <span class='name'>{{item.title}}</span><br>
                <span class='proson'>发布者：{{item.nickname}}</span>
            </p>
            <img src="../../../../assets/12.png" alt=""  class="jiathis_style">
            <img v-if='ifCollect' @click='collect(item.id)'  src="../../../../assets/212.png" alt="">
            <yd-icon v-if='!ifCollect' class='isCollect' name="star" color='#ff5045' size='0.4rem'></yd-icon>
            <a :href='address+item.mv_url'><img src="../../../../assets/4523523.png" alt=""></a>
        </div>
        <div class="detailInfomation">
            <p class='grayFade left'>播放量：<span class='ff5'>{{item.hits}}</span></p>
            <p class='grayFade left'>作词：{{item.lyricist}}，作曲：{{item.composer}}，演唱：{{item.singer}}，编曲：{{item.editor}}，导演：{{item.director}}，剪辑：{{item.midi}}，制作：{{item.producer}}，出品：{{item.publisher}}</p>
            <p class='black left'>
                简介：<br>
                {{item.brief}}
            </p>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {testing} from 'script/commonVarite'
import {Toast} from 'vue-ydui/dist/lib.rem/dialog';
Vue.prototype.$dialog = {
    toast: Toast
};
export default {
    name : 'mvDetail',
    components:{

    },
    data(){
        return {
            item:{},
            address:testing.address,
            ifCollect:true,
            meDetail:false
        }
    },
    watch:{
        item(newItem){
            if(newItem.mv_url!=undefined||newItem.mv_url!=null){
                this.meDetail=true
            }
        }
    },
    created(){
        setTimeout(()=>{
            this.init()
        },20)
    },
    metaInfo () {
        return {
            title:this.item.title+' - '+this.item.nickname+'-中国儿童音乐网'
        }
    },
    mounted(){
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
            title: that.item.title + '-' + that.item.nickname, // 分享标题
            desc:'中国儿童音乐网', // 分享描述
            link: window.location.href+"?shan",
            imgUrl: testing.address+that.item.cover_img, // 分享图标
            type: 'video', // 分享类型,music、video或link，不填默认为link
            dataUrl: testing.address+that.item.mv_url, // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {

            },
            cancel: function() {
              alert('分享失败')
            }
          });
          // 分享到朋友圈
          wx.onMenuShareTimeline({
              title: that.item.title + '-' + that.item.nickname + '-中国儿童音乐网', // 分享标题
              link: window.location.href+"?shan",
              imgUrl: testing.address+that.item.cover_img, // 分享图标
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
    },
    methods:{

        init(){
          let _id ='';
        if(window.location.search.indexOf('shan')==-1){
         _id=window.location.search.substring(window.location.search.indexOf('=') + 1, window.location.search.length);
        }else{
          _id = window.location.search.substring(window.location.search.indexOf('=') + 1, window.location.search.indexOf('shan')-3);
        }
          let  url=testing.address+"/index.php/api/mv-detail/"+_id+"";
            this.$http.get(url).then(data=>{
                this.item=data.body.data;
            },response=>{
                this.$dialog.toast({
                    mes: "网络开小差了...",
                    timeout: 1500
                });
            })
        },
        collect(id){
            let  url=testing.address+'/index.php/api/fav';
            this.$http.post(url,{
                'type':'mv',
                'id':id
            },{
                emulateJSON:true
            }).then(data=>{
                this.$dialog.toast({
                    mes: data.body.msg,
                    timeout: 1500
                });
                if(data.body.remove==false){
                    this.ifCollect=true
                }else{
                    this.ifCollect=false
                }
            },response=>{
                this.$dialog.toast({
                    mes: "网络开小差了...",
                    timeout: 1500
                });
            })
        }
    }
}
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>
padding=0 0.23rem
#mvDetail
    position relative
    background #fff
    .detailOfVideo
        width 100%
        height 4.5rem
        video
            width 100%
            height 100%
            padding 0
            background #fff
            object-fit cover
    #_play
        width 0.97rem
        width 0.97rem
        position absolute
        top 1.6rem
        left 3.4rem
    #_pause
        top 3.5rem
        right 0.5rem
        position absolute
        width 0.8rem
        height 0.8rem
    .description
        width 100%
        height 1.48rem
        padding padding
        border-bottom 0.07rem solid #eff0f2
        p
            float left
            text-align left
            line-height 0.5rem
            padding-top 0.3rem
            .name
                font-size 0.32rem
                color #000
            .proson
                color #aaaaac
                font-size 0.26rem
        img
            width 0.34rem
            height 0.34rem
            float right
            margin 0.46rem 0.2rem 0 0.2rem
        .isCollect
            float right
            margin 0.4rem 0.2rem 0 0.2rem
    .detailInfomation
        min-height 6rem
        padding padding
        padding-top 0.1rem
        p
            font-size 0.24rem
            line-height 0.55rem





</style>
