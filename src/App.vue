<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app',
  created() {
    if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      // 歌曲https://localhost:8088/#/playController?id=19
      if (window.location.hash.substr(window.location.hash, window.location.hash.indexOf('?')) == '#/playController') {
        window.location.href = "https://www.feizhugu.com/song/songDetail?id="+window.location.hash.substr( window.location.hash.indexOf('=')+1);

        // mv
      }else if(window.location.hash.substr(window.location.hash, window.location.hash.indexOf('?'))=='#/mvDetail'){
        window.location.href = "https://www.feizhugu.com/mv/MVDetail?id="+window.location.hash.substr( window.location.hash.indexOf('=')+1);
      }else{
        window.location.href ='https://www.feizhugu.com/';
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.28rem;
  width: 7.5rem;
  height: 100%;
}
</style>
