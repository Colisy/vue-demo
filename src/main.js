// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  'script/position.js'
import 'vue-ydui/dist/ydui.base.css';
import  'style/reset.css'
import  'style/common.styl'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
import store from '@/vuex/index.js'
import Vuerify from 'vuerify'
import fastclick from 'fastclick'
import VueCookie from 'vue-cookie'
Vue.use(Vuerify)
Vue.use(VueCookie)
fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(YDUI);

import wx from 'weixin-js-sdk'
import Meta from 'vue-meta'
import $ from 'jquery'
Vue.use(Meta)

new Vue({
  el: '#app',
  router,
  store,
  // render:h=>h(demo),
  template: '<App/>',
  components: { App }
})
