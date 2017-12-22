<template>
    <yd-infinitescroll :callback="load2" ref="infinitescroll" id="outerLoad">
        <ul id='_mvList' slot='list'>
            <li v-for='(data,index) in datas' :id='data.id'>
                <img :src='address+data.cover_img' alt="" class='_cover' @click='gotomvDetail(data.id)'>
                <img src="../../../../assets/_play.png" alt="" class='_play'>
                <p>
                    <span>{{data.title}}</span><br>
                    <span>{{data.nickname}}</span>
                </p>
            </li>
        </ul>
        <span slot="doneTip">没有更多数据啦~~</span>
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
    </yd-infinitescroll>

</template>

<script>
import Vue from 'vue'
import {testing} from 'script/commonVarite'

import {Toast} from 'vue-ydui/dist/lib.rem/dialog';

Vue.prototype.$dialog = {
    toast: Toast
};
export default {
    data(){
        return {
            datas:[],
            page: 1,
            pageSize: 10,
            address:testing.address
        }
    },
    created(){
        setTimeout(()=>{
            this.init()
        },20)
    },
    metaInfo () {
        return {
            title:'中国儿童音乐网',
            meta: [ { charset: 'utf-8' },
            { name: 'keywords', content: "中国儿童音乐网，中国最大的儿童音乐原创平台，音乐人交流平台原创，原创儿歌伴奏，免费伴奏，原创音乐，翻唱，网络歌曲，手机铃声，MV，翻唱音乐，手机彩铃，网络音乐，飞猪星球儿童音乐"},{
                name: 'description', content:'中国儿童音乐网，数字音乐网站，汇集了大量的儿童原创音乐歌曲，提供大量歌曲的伴奏、曲谱、MV、歌词免费下载'
            } ]
        }
    },
    methods:{
        init(){
          let  url=testing.address+'/index.php/api/mv/1/'+1+'';
          this.$http.get(url).then(data=>{
              this.datas=data.body.data.list;
          },response=>{
              this.$dialog.toast({
                  mes: "网络开小差了...",
                  timeout: 1500
              });
          })
        },
        load2() {
            let  url=testing.address+'/index.php/api/mv/1/'+this.page+'';
            this.$http.get(url).then(function (response) {
                var _list2 = response.body.data.list;
                this.datas = [...this.datas, ..._list2];
                if (_list2.length < 15 || this.page == 100) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
                this.page++;
            });
        },
        gotomvDetail(id){
            let url=testing.address+'/index.php/api/hits'
              this.$http.post(url,{
                  'type':'mv',
                  'id':id,
                  'skey':this.$cookie.get('skey')
              },{
                  emulateJSON:true
              }).then(data=>{

              },response=>{
                  this.$Notice.warning({
                      title: '出错了哦~',
                      desc: '请检查您的网络是否连接正常哦~'
                  });
              })
            this.$router.push({
                path:'/mvDetail',
                query:{
                    id:id
                }
            })
        }
    }
}
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>
#outerLoad
    min-height 11.5rem
    background #fff
#_mvList
    padding 0 0.25rem
    text-align left
    li
        height 3.03rem
        width 3.39rem
        padding-top 0.11rem
        position relative
        display inline-block
        ._cover
            width 100%
            height 1.93rem
        ._play
            width 0.49rem
            height 0.49rem
            position absolute
            left 0.13rem
            top 1.4rem
        p
            float left
            color #aaaaac
            height 0.98rem
            font-size 0.2rem
            padding-top 0.2rem
            text-align left
            span:first-of-type
                font-size 0.31rem
                color #000
                position relative
                top -0.05rem
    li:nth-of-type(even)
        margin-left 0.14rem
</style>





<!--  -->
