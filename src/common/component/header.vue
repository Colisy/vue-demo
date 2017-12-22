<template>
    <header>
        <logo></logo>
        <div class="_threeButton" v-if='isShowNotLogin'>

            <a href='#signIn'><yd-button color='#fff'  type="hollow">登录</yd-button></a>
            <a href='#signUp'><yd-button color='#fff'  type="hollow">注册</yd-button></a>
        </div>
        <div class="_threeButton isAlradyLogin" v-if='!isShowNotLogin'>
            <img :src="character" alt="">
            <span v-html='nickname'></span>
            <i @click='outLogin'><yd-button color='#fff' bgcolor='#ffb105' type="primary">退出</yd-button></i>
        </div>
    </header>
</template>

<script>
import logo from './logo'
import Vue from 'vue';
import {Button, ButtonGroup} from 'vue-ydui/dist/lib.rem/button';
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
import {Toast} from 'vue-ydui/dist/lib.rem/dialog';
import {testing} from 'script/commonVarite'
Vue.prototype.$dialog = {
    toast: Toast
};
export default {
    name:"header",
    props:['character','nickname'],
    components:{
        logo
    },
    data(){
        return {
            isShowNotLogin:false
        }
    },
    created(){
        setInterval(()=>{
            this.init()
        },50)
    },
    methods:{
        init(){
            if(this.$cookie.get('isLogin')==null||this.$cookie.get('isLogin')==undefined){
                this.isShowNotLogin=true
            }else{
                this.isShowNotLogin=false
            }

        },
        outLogin(){
            let  url=testing.address+'/index.php/api/user/logout';
            this.$http.post(url,{
                'skey':this.$cookie.get('skey')
            },{
                emulateJSON:true
            }).then(data=>{
                if(data.body.status=='ok'){
                    this.$cookie.set("isLogin", "", -1);
                    this.$dialog.toast({
                        mes: '您已退出登录',
                        timeout: 1500
                    });
                }
            },response=>{
                this.$dialog.toast({
                    mes: '网络状态不佳...',
                    timeout: 1500
                });
            })
        }
    }
}
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>
header
    height 0.89rem
    background-color #fe5047
    width 100%
    box-shadow 0px 4px 10px #dad7d7
    padding-right 0.25rem
    text-align left
    line-height 0.89rem
    img
        width 2.8rem
        height 0.89rem
    ._threeButton
        color #fff
        float right
        button
            width 0.85rem
            height 0.4rem
            padding 0
            line-height 0.4rem
            margin-left 0.1rem
        button:nth-of-type(1)
        button:nth-of-type(2)
                border 1px solid #fff
                border 1px solid #fff
                background transparent

    .isAlradyLogin
        img
            height 0.51rem
            width 0.51rem
            border-radius 50%
        span
            font-size 0.26rem
            display inline-block
            margin 0 0.2rem 0 0.05rem
            position relative
            top 0.03rem





</style>
