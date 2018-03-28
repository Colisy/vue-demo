<template>
  <div>
    <div v-if='!isHasData' class="nonedatas">
        <img src="../../../../assets/sad.png" alt=""><br>
        抱歉，暂无歌单哦<br>
        推荐您到电脑上对自己喜欢的歌曲添加到歌单呢~
    </div>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
    <ul  v-if='isHasData' id='playlist' slot='list'>
        <li v-for='(item,index) in items' :id='item.id'  @click='selectItem(item.id)'>
          <img :src='address+item.cover_url' alt="" class='_cover' @click='selectItem(item.id)'>
          <p class='hitNumber'>
            <img src="../../../../assets/ear.png" alt="">
            <span>{{item.hits}}</span>
          </p>
          <p style='width:3.58rem;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;'><span class='introduce' style='width:3.58rem;overflow:hidden;white-space: nowrap;display:inline-block;text-overflow:ellipsis;'>{{item.title}}</span><br>
          <span class='_title' style='display:inline-block;width:3.58rem;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;'>{{item.introduce}}</span></p>
        </li>
    </ul>
    <span slot="doneTip">没有更多数据啦~~</span>
    <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
    </yd-infinitescroll>
  </div>
</template>

<script>
import {testing} from 'script/commonVarite'
import Vue from 'vue'
import {Toast} from 'vue-ydui/dist/lib.rem/dialog';
import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.prototype.$dialog = {
    toast: Toast
};
export default {
  data(){
    return{
      page:1,
      pageSize: 10,
      items:"",
      address:testing.address,
      isHasData:true
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    selectItem(id){
      this.$router.push({
          path:'/plDetail',
          query:{
              id:id
          }
      })
    },
    init(){
      let url=testing.address+"/index.php/api/pl/publist"
          this.$http.post(url,{
            'page':this.page
          },{
              emulateJSON:true
          }).then(data=>{
            if(data.body.status=='error'){
              this.isHasData=false
              this.$dialog.toast({
                  mes: data.body.msg+'哦~',
                  timeout: 1500
              });
            }else{
              if(data.body.data.list.length==0){
                this.isHasData=false
              }else{
                this.isHasData=true
                this.totalPage=data.body.data.totalPage+'0';
                this.items=data.body.data.list;
              }
            }
          },response=>{
            this.$dialog.toast({
                mes: "网络开小差了...",
                timeout: 1500
            });
          })
    },
    loadList() {
        let  url=testing.address+'/index.php/api/pl/publist';
        this.$http.post(url,{
          'page':this.page
        },{
            emulateJSON:true
        }).then(function (response) {
            var _list = response.body.data.list;
            this.items = [...this.items, ..._list];
            if (_list.length < 15 || this.page == 100) {
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                return;
            }
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
            this.page++;
        });
    },
  }
}
</script>

<style lang="stylus" scoped rel='stylesheet/stylus'>
.nonedatas
  min-height 80vh
  padding-top 10vh
  font-size 0.3rem
  line-height 0.5rem
  img
    width 2.5rem
    height 2.5rem
    margin-bottom 0.5rem
._cover
  width 3.48rem
  height 3.5rem
.introduce
  font-size 0.31rem
  display inline-block
  line-height 0.5rem
  color rgb(65,65,65)
._title
  color rgb(152,152,152)
  font-size 0.24rem
  display inline-block
  line-height 0.4rem
#playlist
  li
    float left
    margin-top 3px
    position relative
    width 3.48rem
    overflow hidden
    p
      text-align left
      padding-left 3px
    .hitNumber
      position absolute
      right 3px
      top 30px
      img
        width 0.22rem
        height 0.21rem
        margin-right 5px
      span
        font-size 0.24rem
        color #fff
  li:nth-of-type(odd)
      margin-left 0.21rem
  li:nth-of-type(even)
      float right
      margin-right 0.21rem

</style>
