// 定义一些公共的变量
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
//测试服
export const testing={
    "address": 'http://www.feizhugu.com',
    "apicom" : 'http://www.feizhugu.com'
    // 'address':'http://192.168.88.123',
    // 'apicom':'http://192.168.88.123'
}

//信息验证
export const valid={
    'mobileRegex':/^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/,
    "codeVerity" : /^\d{6}$/
}
