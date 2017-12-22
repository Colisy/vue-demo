import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import mainVue from '@/mainVue'
import login from '@/components/login/login'
import signIn from '@/components/login/signIn'
import signUp from '@/components/login/signUp'
import home from '@/components/home/home'
import mvDetail from 'components/home/content/mv/mvDetail'

import playController from 'component/playController'
Vue.use(Router)
export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'mainVue',
            component: mainVue,
            children:[
                {
                    path: '/',
                    component: home
                },
                {
                    path:'/mvDetail',
                    component: mvDetail,
                }
            ]
        },
        {
            path:'/playController',
            component: playController
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            redirect: {name: 'signIn'},
            children:[
                {
                    path:'/signIn',
                    name: 'signIn',
                    component: signIn
                },
                {
                    path:'/signUp',
                    name: 'signUp',
                    component: signUp
                }
            ]
        }
    ]

})






//
