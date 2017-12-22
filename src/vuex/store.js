import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const state={
    count : true,
    src : require("../assets/stop.png")
}

const mutations = {
    incre(state){
        if(state.count){
            state.src=require("../assets/stop.png")
            state.count=false
        }else{
            state.src=require("../assets/cplay.png")
            state.count=true
        }

    }
}

const actions = {
    incre:({commit}) => commit('incre')
}

const getters = {
    // count : state => state.count
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
