import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import mainVue from '@/mainVue'
import home from '@/components/home/home'

Vue.use(Router)
export default new Router({
    mode: 'history',
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
                    component: resolve => require(['components/home/content/mv/mvDetail'], resolve)
                },
                {
                  path:'/plDetail',
                  component: resolve => require(['components/home/content/playlist/plDetail'], resolve)
                },
                {
                    path:'/playController',
                    component: resolve => require(['component/playController'], resolve)
                },
                {
                  path:'/invite',
                  component:resolve => require(['components/home/content/invite/invite'], resolve)
                }
            ]
        },

        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/login/login'], resolve),
            redirect: {name: 'signIn'},
            children:[
                {
                    path:'/signIn',
                    name: 'signIn',
                    component: resolve => require(['@/components/login/signIn'], resolve)
                },
                {
                    path:'/signUp',
                    name: 'signUp',
                    component: resolve => require(['@/components/login/signUp'], resolve)
                }
            ]
        }
    ]

})
