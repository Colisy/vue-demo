<template>
<div class="">
  <p>我的邀请链接</p>
  <p id='_invitedInput'>{{invited}}</p>
  <a href='/'><Button type="primary" style="display:inline-block">回到首页</Button></a>
  <Button id="button" type="primary" class="suchRed" style="display:inline-block;margin-left:1rem">复制链接</Button>
</div>
</template>

<script>
import Vue from 'vue'
import '../../../../common/script/clipboard.min.js'
import {Toast} from 'vue-ydui/dist/lib.rem/dialog';

Vue.prototype.$dialog = {
    toast: Toast
};

export default {
  data() {
    return {
      invited: 'http://m.feizhugu.com/signUp'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$cookie.get('uid') == null || this.$cookie.get('uid') == undefined) {
        this.invited = 'http://m.feizhugu.com/signUp'
      } else {
        this.invited = 'http://m.feizhugu.com/signUp?' + this.$cookie.get('uid')
      }

      let _this = this;
      var clipboard = new Clipboard('.suchRed', {
        target: function() {
          return document.querySelector('#_invitedInput');
        }
      });
      clipboard.on('success', function(e) {
        _this.$dialog.toast({
            mes: "复制成功了哦~马上发送给您的好友吧",
            timeout: 1500
        });
      });

      clipboard.on('error', function(e) {
        _this.$dialog.toast({
            mes: "抱歉、复制失败，麻烦您稍后再试！",
            timeout: 1500
        });
      });
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
div
  height 79vh
p
  text-align left
  padding 0.2rem 0.5rem
  margin-top 0.5rem
  font-size 0.32rem
p:nth-of-type(2)
  margin-top 0
button
  padding 0.2rem
  border 0
  background #FE5047
  color #fff
  margin-top 0.5rem
</style>
