<template>
    <div class="home">
        <yd-tab class='_ul'>
            <yd-tab-panel label="新歌" ref='new_song'>
                <swiper></swiper>
                <song></song>
            </yd-tab-panel>
            <yd-tab-panel label="MV" ref='mv'>
                <mv></mv>
            </yd-tab-panel>
            <yd-tab-panel label="歌单" ref='playlist'>
                <playlist></playlist>
            </yd-tab-panel>
            <yd-tab-panel label="搜索" ref='select'>
                <selectCom></selectCom>
            </yd-tab-panel>
        </yd-tab>
    </div>
</template>

<script>
import Vue from 'vue';
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
import swiper from 'component/swiper'
import song from 'components/home/content/newSong/newSong'
import mv from 'components/home/content/mv/mv'
import selectCom from 'components/home/content/select/select'
import playlist from 'components/home/content/playlist/playlist'
import {testing} from 'script/commonVarite'
import {Toast} from 'vue-ydui/dist/lib.rem/dialog';
Vue.prototype.$dialog = {
    toast: Toast
};
export default {
    name:"home",
    components:{
        swiper,
        song,
        mv,
        selectCom,
        playlist
    },
    data(){
        return {

        }
    },
    mounted(){
    },
    beforeRouteLeave(to, from, next) {
      if(to.path=='/playController'){
        next(() => {
          path: to.path
        })
        setTimeout(()=>{
          window.location.reload();
        },1000)
      }else if(to.path=='/mvDetail'){
        next(() => {
          path: to.path
        })
        setTimeout(()=>{
          window.location.reload();
        },1000)
      }else if(to.path=='/plDetail'){
        next(() => {
          path: to.path
        })
        setTimeout(()=>{
          window.location.reload();
        },1000)
      }else{
        next(() => {
          path: to.path
        })
      }

    },
    metaInfo () {
        return {
            title:'中国儿童音乐网',
            meta: [ { charset: 'utf-8' },
            { name: 'keywords', content: "中国儿童音乐网，中国最大的儿童音乐原创平台，音乐人交流平台原创，原创儿歌伴奏，免费伴奏，原创音乐，翻唱，网络歌曲，手机铃声，MV，翻唱音乐，手机彩铃，网络音乐，飞猪星球儿童音乐"},{
                name: 'description', content:'中国儿童音乐网，数字音乐网站，汇集了大量的儿童原创音乐歌曲，提供大量歌曲的伴奏、曲谱、MV、歌词免费下载'
            } ]
        }
    }
}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
@import "./home.styl";
</style>
