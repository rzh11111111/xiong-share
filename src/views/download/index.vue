<template>
    <div class="app-init">
        <div class="top-height"></div>
        <div class="avatar">
            <p class="img-box">
                <img src="../../assets/img/logo.png"
                     alt="">
            </p>
            <p>下载省钱熊 省钱省一半</p>
        </div>
        <div class="height209"></div>
        <p class="to-android" v-if="isAndroid" @click="downAndroid">安卓版下载</p>
        <p class="to-ios" v-if="isIos" @click="downIos">IOS版下载</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isAndroid: false,
            isIos: false,
            isWinxin: false,
        }
    },
    components: {},
    created() {
        let ua = window.navigator.userAgent,
            app = window.navigator.appVersion;
        if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            // ios端 
            this.isIos = true;
        } else if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
            // android端 
            this.isAndroid = true
        }
        if (ua.match(/MicroMessenger/i) == 'MicroMessenger') {
            // 微信浏览器 
            this.isWinxin = true
            var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight;

            this.loadHtml()

            var cssText = `
            #weixin-tip{
            position: fixed;
            left:0; top:0;
            background: rgba(0,0,0,0.8);
            filter:alpha(opacity=80);
            width: 100%;
            height:100%;
            z-index: 100;}
            #weixin-tip p{text-align: center;padding-top: 18px;padding-right: 10px;padding-left: 70px;}
            #weixin-tip p img{width:100%;}
            `;
            var style = document.createElement('style');
            style.rel = 'stylesheet';
            style.type = 'text/css';
            try {
                style.appendChild(document.createTextNode(cssText));
            } catch (e) {
                style.styleSheet.cssText = cssText; //ie9以下
            }
            var head = document.getElementsByTagName("head")[0]; //head标签之间加上style样式
            head.appendChild(style);
        }
    },
    methods: {
        loadHtml() {
            var div = document.createElement('div');
            div.id = 'weixin-tip';
            div.innerHTML = '<p><img src="' + require("./img/iswinxingimg.png") + '" alt="微信打开"/></p>';
            document.body.appendChild(div);
        },
        downAndroid() {
            // 多环境下载
            if (process.env.NODE_ENV == 'development') { // 本地
                window.location.href = 'http://download.shengqianxiong8.com/app-yyb-release.apk'
            } else if (process.env.NODE_ENV == 'production') {
                if (process.env.VUE_APP_FLAG === 'pro') {
                    // 生产环境
                    window.location.href = 'http://download.shengqianxiong8.com/app-yyb-release.apk'
                } else if (process.env.VUE_APP_FLAG === 'sit') {
                    // 预发布
                    window.location.href = 'http://download.shengqianxiong8.com/app-yyb-release.apk'
                } else if (process.env.VUE_APP_FLAG === 'test') {
                    // 测试
                    window.location.href = 'http://download.shengqianxiong8.com/app-yyb-release.apk'
                }
            }
        },
        downIos() {
            // 多环境下载
            if (process.env.NODE_ENV == 'development') { // 本地
                window.location.href = 'https://itunes.apple.com/cn/app/id1458689353'
            } else if (process.env.NODE_ENV == 'production') {
                if (process.env.VUE_APP_FLAG === 'pro') {
                    // 生产环境
                    window.location.href = 'https://itunes.apple.com/cn/app/id1458689353'
                } else if (process.env.VUE_APP_FLAG === 'sit') {
                    // 预发布
                    window.location.href = 'https://itunes.apple.com/cn/app/id1458689353'
                } else if (process.env.VUE_APP_FLAG === 'test') {
                    // 测试
                    window.location.href = 'https://itunes.apple.com/cn/app/id1458689353'
                }
            }
        }
    }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "../../assets/css/reset.css";

.top-height {
    height: 100px;
}

.avatar {
    padding-bottom: 11px;
    text-align: center;

    .img-box {
        width: 65px;
        height: 65px;
        margin: 0 auto;
        img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }

    p {
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        margin-top: 9px;
    }
}

.height209 {
    height: 106px;
}

.to-android {
    width: 280px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 12px;
    border: 1px solid rgba(151, 151, 151, 1);
    border-radius: 4px;
}

.to-ios {
    width: 280px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0 auto;
    border: 1px solid rgba(151, 151, 151, 1);
    border-radius: 4px;
}

.reward {
    font-size: 14px;
    padding-bottom: 35px;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    color: #333333;
    text-align: center;

    p:nth-child(1) {
        span {
            color: #E93730;
        }
    }
}

</style>
