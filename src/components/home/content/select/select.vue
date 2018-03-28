<template>
<div id='_selectList'>
  <div class="select">
    <span id="_iconOuter" @click='gotoSelectResult()'><yd-icon name="search" size=".3rem"></yd-icon></span>
    <input @input='selectText' v-model="selectContent" type="search" name="" value="" placeholder="搜索歌曲、MV、用户名" @keyup.enter='gotoSelectResult()'>
  </div>
  <div class="_hotSelect" v-if='historyShow'>
    <h2>热门搜索</h2>
    <a @click='gotoSelectResult("支爽")'>
      <yd-button bgcolor='rgba(0,0,0,0)' type="primary" shape="circle">支爽</yd-button>
    </a>
    <a @click='gotoSelectResult("莉娅")'>
      <yd-button bgcolor='rgba(0,0,0,0)' type="primary" shape="circle">莉娅</yd-button>
    </a>
    <a @click='gotoSelectResult("飞猪侠")'>
      <yd-button bgcolor='rgba(0,0,0,0)' type="primary" shape="circle">飞猪侠</yd-button>
    </a>
  </div>
  <yd-infinitescroll :callback="loadList" ref="infinitescroll">
    <ul class="_selectResult" v-if='listShow' slot='list'>
      <li class='_mv' v-for="(mv,index) in datas" :id='mv.id' @click='gotomvDetail(mv.id)'>
        <img class='frontCover' :src="address+mv.cover_img" alt="">
        <img src="../../../../assets/_play.png" alt="" class='Resultplay'>
        <p>
          <span class='title'>MV</span>
          <span class='name'>{{mv.title}}</span><br>
          <span class='author'>{{mv.nickname}}</span>
        </p>
        <img src="../../../../assets/play.png" alt="" class='_clickPlay'>
      </li>
      <li v-for='(song,index) in items' :id='song.id' @click='gotosong(song,index,song.id)'>
        <p>
          <span class='name'>{{song.title}}</span><br>
          <span class='author'>{{song.nickname}}</span>
        </p>
        <img src="../../../../assets/play.png" alt="" class='_clickPlay'>
      </li>
    </ul>
    <span slot="doneTip">没有更多数据啦~~</span>
    <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
  </yd-infinitescroll>
</div>
</template>

<script>
import Vue from 'vue'
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  Icons
} from 'vue-ydui/dist/lib.rem/icons'
Vue.component(Icons.name, Icons);
import {
  Button,
  ButtonGroup
} from 'vue-ydui/dist/lib.rem/button'
Vue.component(Button.name, Button)
Vue.component(ButtonGroup.name, ButtonGroup)
import {
  testing
} from 'script/commonVarite'
import {
  InfiniteScroll
} from 'vue-ydui/dist/lib.rem/infinitescroll'
Vue.component(InfiniteScroll.name, InfiniteScroll)
import {
  Toast
} from 'vue-ydui/dist/lib.rem/dialog';

Vue.prototype.$dialog = {
  toast: Toast
};
export default {
  metaInfo() {
    return {
      title: '中国儿童音乐网',
      meta: [{
          charset: 'utf-8'
        },
        {
          name: 'keywords',
          content: "中国儿童音乐网，中国最大的儿童音乐原创平台，音乐人交流平台原创，原创儿歌伴奏，免费伴奏，原创音乐，翻唱，网络歌曲，手机铃声，MV，翻唱音乐，手机彩铃，网络音乐，飞猪星球儿童音乐"
        }, {
          name: 'description',
          content: '中国儿童音乐网，数字音乐网站，汇集了大量的儿童原创音乐歌曲，提供大量歌曲的伴奏、曲谱、MV、歌词免费下载'
        }
      ]
    }
  },
  data() {
    return {
      selectContent: '',
      historyShow: true,
      listShow: false,
      datas: [],
      items: [],
      address: testing.address,
      page: 1,
      pageSize: 10,
      scrolled: false
    }
  },
  computed: {
    ...mapGetters([
      'playing'
    ])
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 155;
      // if (this.scrolled) {
      // }
    },
    ...mapActions([
      'changeState'
    ]),
    selectText() {
      if (this.selectContent == "") {
        this.historyShow = true
        this.listShow = false
      }
    },
    gotosong(item, index, id) {
      let url = testing.address + '/index.php/api/hits'
      this.$http.post(url, {
        'type': 'songs',
        'id': id,
        'skey': this.$cookie.get('skey')
      }, {
        emulateJSON: true
      }).then(data => {

      }, response => {
        this.$dialog.toast({
          mes: "网络开小差了...",
          timeout: 1500
        });
      })
      // 音乐播放
      this.changeState({
        item: this.items,
        index
      })

      this.$router.push({
        path: '/playController',
        query: {
          id
        }
      })
    },
    gotomvDetail(id) {
      let url = testing.address + '/index.php/api/hits'
      this.$http.post(url, {
        'type': 'mv',
        'id': id,
        'skey': this.$cookie.get('skey')
      }, {
        emulateJSON: true
      }).then(data => {

      }, response => {
        this.$dialog.toast({
          mes: "网络开小差了...",
          timeout: 1500
        });
      })

      this.$router.push({
        path: '/mvDetail',
        query: {
          id
        }
      })

    },
    loadList() {
      let url = testing.address + '/index.php/api/m-search/' + this.selectContent + '/' + this.page + '';
      this.$http.get(url).then(function(response) {
        const _list = response.body.data.songs.list
        const _data = response.body.data.mv.list
        this.items = [...this.items, ..._list]
        this.datas = [...this.datas, ..._data]
        //搜索列表
        this.historyShow = false
        this.listShow = true
        if (_list.length < this.pageSize || this.page == 3) {
          this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
        this.page++;
      });
    },
    gotoSelectResult(keyword) {
      keyword == undefined || keyword == null ? this.selectContent = this.selectContent : this.selectContent = keyword

      if (this.selectContent != "") {
        //发送请求
        let url = testing.address + '/index.php/api/m-search/' + this.selectContent + '/' + 1 + '';
        this.$http.get(url).then(data => {
          this.datas = data.body.data.mv.list
          this.items = data.body.data.songs.list
          //total pagesize
          if (data.body.data.mv.totalPage >= data.body.data.songs.totalPage) {
            this.pageSize = data.body.data.mv.totalPage
          } else {
            this.pageSize = data.body.data.songs.totalPage
          }
          //搜索列表
          this.historyShow = false
          this.listShow = true
        }, response => {
          this.$dialog.toast({
            mes: "网络开小差了...",
            timeout: 1500
          });
        })
      }
    }
  }
}
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>
.select
    width 100%
    height 1.25rem
    border-top 1px solid #d3d3d3
    background-color #ececec
    position relative
    input
        width 7.03rem
        height 0.63rem
        background-color #fbfcfe
        border-radius 0.3rem
        margin-top 0.3rem
        padding-left 0.9rem
    .yd-icon-search
        position absolute
        top 0.1rem
        left 0rem
#_iconOuter
    display inline-block
    width 0.5rem
    height 0.5rem
    position absolute
    left 0.5rem
    top 0.35rem

._hotSelect
    padding 0 0.22rem
    text-align left
    min-height 10.3rem
    h2
        text-align left
        height 0.73rem
        line-height 0.73rem
        font-weight normal
        color #333
        font-size 0.27rem
    button
        border 1px solid #d0d0d0
        margin-right 0.4rem
    button:first-of-type
        border 1px solid #ffb105
._selectResult
    padding 0 0.19rem
    min-height 10.3rem
    li
        border-bottom   1px solid #e3e3e3
        text-align left
        position relative
        padding 0.2rem 0.05rem
        height 1.12rem
        p
            float left
            display inline-block
            line-height 0.4rem
            .title
                color #ffb105
                font-size 0.26rem
            .name
                color #000
                font-size 0.31rem
            .author
                color #aaaaac
                font-size 0.24rem
        ._clickPlay
            width 0.48rem
            height 0.48rem
            float right
            margin-top 0.1rem
    ._mv
        height 1.43rem
        .frontCover
            width 1.86rem
            height 100%
            margin-right 0.35rem
            float left
        .Resultplay
            width 0.26rem
            height 0.26rem
            position absolute
            top 0.9rem
            left 0.06rem
        p
            padding-top 0.15rem
        ._clickPlay
            margin-top 0.2rem
</style>





<!--  -->
