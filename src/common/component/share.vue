<template>
    <!-- 分享 -->
    <div class="share-container" style="display: none;">
        <div class="mask"></div>
        <div class="content ">
            <header>分享到</header>
            <ul>
                <li class="J-share-item-inapp">
                    <a href="http://service.weibo.com/share/share.php?appkey=&title=&url=&pic=&searchPic=false&style=simple" target="_blank" class="bds_tsina"  data-app="weibo"><span>新浪微博</span></a>
                </li>
                <li id="weixinMoments" class="J-share-item-inapp">
                    <a href="javascript:;" class="weixin" data-app="wechatFriend"><span>微信</span></a>
                </li>
                <li id="weixinTimeline" class="J-share-item-inapp">
                    <a href="javascript:;" class="weixin_moments" data-app="wechatTimeline"><span>朋友圈</span></a>
                </li>
                <li class="J-share-item-inapp">
                    <a href="http://connect.qq.com/widget/shareqq/index.html?',s.join('&'), '" class="bds_qq" data-app="qqFriend"><span>QQ</span></a>
                </li>
                <li class="J-share-item-inapp">
                    <a href="javascript:;" onclick="window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(document.location.href));return false;" title="分享到QQ空间" class="bds_qzone" data-app="qZone"><span>QQ空间</span></a>
                </li>
            </ul>
            <div class="btns-wrapper">
                <div class="button" id="cancel">
                    <a >取消</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.init()
    },
    methods:{
        init(){
            window._bd_share_config={"common":
                {"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"32"},
                "share":{},"image":{"viewList":["weixin","tsina","qzone","tqq"],"viewText":"分享到：","viewSize":"16"},
                "selectShare":{"bdContainerClass":null,"bdSelectMiniList":["weixin","tsina","qzone","tqq"]}
            }
            // with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
        }
    }
}
</script>

<style scoped>
/*转发固定框*/
.share-container {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
}
.share-container .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.3);
}

.share-container .content {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    z-index: 1001;
    transform: translate3d(0px, 0px, 0px);
    opacity: 1;
}
.share-container .content header {
    color: #666;
    font-size: 0.28rem;
    display: block;
    line-height: 1rem;
}
.share-container .content ul {
    width: 86.25%;
    overflow: hidden;
    margin: 0 auto;
}
.share-container .content ul>li {
    float: left;
    width: 33%;
    box-sizing: border-box;
}
.share-container .content ul>li a.bds_tsina {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAABxCAMAAADVoLziAAAAgVBMV…zlUM0hpqdxvUFl+hrvVl2F78DDzL2wQ/jo5Tqq/XRI8QWh0ooz8cvzmQAAAABJRU5ErkJggg==);
}
.share-container .content ul>li a {
    display: block;
    height: 1rem;
    width: 2rem;
    margin: 0 auto 0.5rem;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
}
.share-container .content ul>li a span {
    text-align: center;
    display: block;
    position: absolute;
    bottom: -0.35rem;
    width: 150%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
        color: #4f5157;
}
.share-container .content .btns-wrapper {
    border-top: 1px solid #C7C7C7;
    overflow: hidden;
}
.share-container .content .btns-wrapper button, .share-container .content .btns-wrapper .button {
    float: left;
    font-size: 0.28rem;
    height: 1rem;
    line-height: 1rem;
    padding: 0;
    border: 0;
    width: 100%;
    background-color: #fff;
    color: #ff819f;
    text-align: center;
}
.share-container .content .btns-wrapper button a, .share-container .content .btns-wrapper .button a {
    display: block;
    height: 100%;
    color: #4f5157;
}
.share-container .content ul>li a.bds_tsina {
    background-image: url(../img/weibo.svg);
    background-size: 0.8rem 0.8rem;
}
.share-container .content ul>li a.bds_tqq {
    background-image: url(../img/txweibo.svg);
    background-size: 0.8rem 0.8rem
}
.share-container .content ul>li a.weixin {
    background-image: url(../img/weixin.svg);
    background-size: 0.8rem 0.8rem
}
.share-container .content ul>li a.weixin_moments {
    background-image: url(../img/pengyouquan.svg);
    background-size: 0.8rem 0.8rem
}
.share-container .content ul>li a.bds_qq {
    background-image: url(../img/qq.svg);
    background-size: 0.8rem 0.8rem
}
.share-container .content ul>li a.bds_qzone {
    background-image: url(../img/QQkongjian.svg);
    background-size: 0.8rem 0.8rem
}
.share-container .content ul>li a.repin {
    background-image: url(../img/shoucang.svg);
    background-size: 0.8rem 0.8rem
}
</style>
