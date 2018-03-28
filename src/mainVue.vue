<template>
    <div class="main">
        <headerCom :character='character' :nickname='nickname'></headerCom>
        <router-view></router-view>
    </div>
</template>

<script>
import headerCom from 'component/header'
import {testing} from 'script/commonVarite'
export default {
    components:{
        headerCom
    },
    data(){
        return {
            character:'',
            nickname:''
        }
    },
    mounted(){
        setTimeout(()=>{
            this.init()
        },100)
    },
    methods:{
        init(){
            let  url=testing.address+'/index.php/api/user/index';
            this.$http.post(url,{
              "skey":this.$cookie.get('skey')
            },{
                emulateJSON:true
            }).then(data=>{
                if(data.body.status=='ok'){
                    this.$cookie.set('uid',data.body.data.uid)
                    this.$cookie.set('isLogin',data.body.status)
                    this.nickname=data.body.data.nickname
                    this.character=data.body.data.avatar
                }else if(data.body.msg=='请先登录'){
                    this.$cookie.set("isLogin", "", -1);
                    this.$dialog.toast({
                        mes: '您尚未登录哦~',
                        timeout: 1500
                    });
                }
            },response=>{
                this.$dialog.toast({
                    mes: '抱歉！网络出错了~',
                    timeout: 1500
                });
            })
        }
    }
}
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>

</style>
