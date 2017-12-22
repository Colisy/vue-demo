import Vue from 'vue'
import Vuex from 'vuex';
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex);

const state={
    playing : true,
    // src : require("../assets/stop.png")
    playIndex:0,
    // isShowplay:false,
    songs:[{}],
    item:'',
    picture:'',
    isPlayNextFlag:false
}
 const store=new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store
