<template>
    <ul class="signIn signUp">
        <li>
            <img src="../../assets/login_07.png" alt="">
            <input v-model='telephone' type="text" name="" value="" placeholder="请输入手机号" />
        </li>
        <li>
            <img src="../../assets/login_11.png" alt="">
            <input v-model='password' type="password" name="" value="" placeholder="请输入密码">
        </li>
        <li class='_border'>
             <yd-checkbox v-model="checkbox1">.</yd-checkbox>
             <span id='agree' class='marginZero'>记住密码</span>
             <span class='_forgetPass'>忘记密码？</span>
        </li>
        <li  class='_commmitButton _border' @click='_immedit'>
            <yd-button class='_immedit' type="primary" shape="circle">登录</yd-button>
        </li>
        <li class='_border _wechartCom'>
            <p>------------- &nbsp; &nbsp;&nbsp;&nbsp;微信登录&nbsp;&nbsp;&nbsp; &nbsp; -------------</p>
            <a href='http://www.feizhugu.com/index.php/api/oauth/wxlogin' >
                <yd-icon name="weixin" color='#9EEA6A' size='1rem'></yd-icon>
            </a>
        </li>
        <li class='_border'>
            <a href="#signUp">还没有账号？立即注册</a>
        </li>
    </ul>
</template>

<script>
import Vue from 'vue';
import {Button, ButtonGroup} from 'vue-ydui/dist/lib.rem/button';
import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.rem/checkbox';
Vue.component(Button.name, Button);
Vue.component(CheckBox.name, CheckBox);
import {testing} from 'script/commonVarite'
import {Toast} from 'vue-ydui/dist/lib.rem/dialog';

Vue.prototype.$dialog = {
    toast: Toast
};
export default {
    name:'signIn',
    data(){
        return {
            value:'check',
            checkbox1:false,
            telephone:'',
            password:""
        }
    },
    vuerify:{
        // telephone:{
        //     test:/^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/,
        //     message:'手机号输入不正确'
        // },
        telephone:'required',
        password:'required'
    },
    computed:{

    },
    created(){
    },
    metaInfo () {
        return {
            title:'中国儿童音乐网-登录'
        }
    },
    methods:{
        normalLogin(){
            let url=testing.address+'/index.php/api/user/login',
            remember="";
            if(this.checkbox1==true){
                remember='on'
            }else{
                remember='off'
            }
           this.$http.post(url,{
               "username":this.telephone,
               "password":this.password,
               "autologin":remember
           },{
               emulateJSON:true
           }).then(data=>{
               if(data.body.msg=='请勿重复登录'){
                 this.$cookie.set('skey',data.body.skey)
                   this.$dialog.toast({
                       mes: data.body.msg,
                       timeout: 1500
                   });
                   setTimeout(()=>{
                       this.$router.push({
                           path:'/'
                       })
                   },2000)
               }else if(data.body.status=='ok'){
                 this.$cookie.set('skey',data.body.skey)
                //    this.$cookie.set('isLogin',data.body.status)
                   this.$router.push({
                       path:'/'
                   })
               }
           },response=>{
               this.$dialog.toast({
                   mes: '抱歉！网络出错了~',
                   timeout: 1500
               });
           })
       },
       wechatLogin(){
           let url=testing.address+'/index.php/api/user/wx_bind',
           remember="";
           if(this.checkbox1==true){
               remember='on'
           }else{
               remember='off'
           }
          this.$http.post(url,{
              "username":this.telephone,
              "password":this.password,
              "autologin":remember,
              'auth':window.location.hash.substring(window.location.hash.indexOf('=')+1,window.location.hash.length)
          },{
              emulateJSON:true
          }).then(data=>{
              if(data.body.status=='ok'){
                   this.$cookie.set('isLogin',data.body.status)
                  this.$dialog.toast({
                      mes: '微信绑定成功~',
                      timeout: 1500
                  });
                  this.$router.push({
                      path:'/'
                  })
              }else{
                  this.$dialog.toast({
                      mes: data.body.msg,
                      timeout: 1500
                  });
              }
          },response=>{
              this.$dialog.toast({
                  mes: '抱歉！网络出错了~',
                  timeout: 1500
              });
          })
       },
        _immedit(){
            if(this.$vuerify.check()){
                if(window.location.hash.indexOf('auth')==-1){
                    this.normalLogin()
                }else{
                    this.wechatLogin()
                }
            }else{
                this.$dialog.toast({
                    mes: '手机号、密码不能为空',
                    timeout: 1500
                });
            }
        }
    }

}
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>
@import "./login.styl";
</style>
