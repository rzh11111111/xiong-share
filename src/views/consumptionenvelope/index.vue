<template>
    <div class="app-init">
        <div class="share-main-box scroll-box">
            <!--<div class="top-bar">-->
                <!--<div class="height16"></div>-->
                <!--<van-nav-bar-->
                        <!--title="消费得红包"-->
                        <!--right-text=""-->
                        <!--:left-arrow="false"-->
                        <!--class="custom-class"-->
                <!--/>-->
            <!--</div>-->
            <!--<div class="height58"></div>-->
            <div class="share-box">
                <img src="./img/envelope01.jpg" alt="">
            </div>
            <div class="share-box">
                <img src="./img/envelope02.jpg" alt="">
            </div>
            <div class="share-box">
                <img src="./img/envelope03.jpg" alt="">
            </div>
            <div class="share-box">
                <img src="./img/envelope04.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import {parseQueryString, phonestar} from '@/utils'

export default {
    data() {
        return {}
    },
    created() {

    },
    methods: {}
}
</script>
<style type="text/css" lang="scss" scoped>
@import "../../assets/css/reset.css";

.top-bar {
    position: fixed;
    left: 0;
    right: 0;
    /*height: 42px;*/
    background: #fff;
    z-index: 999;

    .height16 {
        height: 16px;
        background-color: #fff;
    }
}
.height58 {
    height: 58px;
}
.share-box {
    position: relative;
    font-size: 0;
    vertical-align: middle;

    img {
        width: 100%;
        height: auto;
    }
}

/*vant样式修改*/
.van-list /deep/ .van-cell {
    background: transparent;
}

.van-popup {
    border-radius: 12px;
}

.share-main-box .van-nav-bar .van-icon {
    color: #ffffff;
    padding-left: 12px;
}

.custom-class {
    background: #ffffff;
}

.share-main-box .van-nav-bar {
    /*background-color: rgba(255, 255, 255, 0.4);*/
}

.van-nav-bar .van-nav-bar__title {
    font-weight: 400;
}

.van-nav-bar__right .van-nav-bar__text {
    color: #999;
    padding-right: 30px;
}

.share-main-box .van-hairline--bottom::after {
    border-bottom-width: 0;
}

</style>
