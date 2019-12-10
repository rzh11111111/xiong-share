<template>
    <div class="app-init">
        <div class="share-main-box">
            <div class="top-bar">
                <div class="height16"></div>
                <van-nav-bar
                        title="分享赚不停"
                        right-text=""
                        :left-arrow="true"
                        class="custom-class"
                        @click-left="onClickLeft"
                        @click-right="onClickRight"
                />
            </div>
            <!--<div class="height58"></div>-->
            <!--<div class="share-box">-->
            <!--<img src="./img/share112.png" alt="">-->

            <!--<p class="btn-img" @click="shareImmediately">-->
            <!--<img src="./img/btn-share.png" alt="">-->
            <!--</p>-->
            <!--</div>-->
            <div class="share-box">
                <img src="./img/share20.jpg" alt="">

                <p class="btn-img" @click="shareImmediately">
                    <img src="./img/btn-share.png" alt="">
                </p>
            </div>
            <div class="share-box">
                <p class="btn-text" @click="toCode">查看我的分享码</p>
                <img src="./img/share21.jpg" alt="">
            </div>
            <div class="share-box">
                <div class="my-main" @click="toInvitation">
                    <div class="img-box">
                        <img :src="myshare.headPicUrl?myshare.headPicUrl:imgUrl"
                             alt="">
                    </div>
                    <div class="name-num-money1">
                        <p class="ellipsis">{{myshare.nickname}}</p>
                        <p>{{myshare.phone}}</p>
                    </div>
                    <div class="name-num-money2">
                        <p>成功邀请：<span>{{myshare.inviteNum}}人</span></p>
                        <p>累计红包：<span>¥{{myshare.moneyMax}}元</span></p>
                        <p class="icon-right">
                            <van-icon name="arrow"/>
                        </p>
                    </div>
                </div>
                <img src="./img/share22.jpg" alt="">
            </div>
            <div class="share-box" style="display: none;">
                <img src="./img/share23.jpg" alt="">
                <div class="ranking-box">
                    <div class="ranking-list">
                        <van-list
                                v-model="loading"
                                :finished="finished"
                                finished-text="没有更多了"
                                @load="onLoad"
                        >
                            <van-cell
                                    v-for="(item,index) in memberInviteRecords"
                                    :key="index">
                                <div slot="title">
                                    <div class="list-box">
                                        <div class="list-left">
                                            <div class="ranking-num">
                                                <span v-if="index==0"><img src="../../assets/img/share4.png"
                                                                           alt=""></span>
                                                <span v-if="index==1"><img src="../../assets/img/share5.png"
                                                                           alt=""></span>
                                                <span v-if="index==2"><img src="../../assets/img/share6.png"
                                                                           alt=""></span>
                                                <span v-if="index>2">{{index+1}}</span>
                                            </div>

                                            <img :src="item.headPicUrl?item.headPicUrl:imgUrl"
                                                 alt="">
                                            <div class="name-phone">
                                                <p>{{item.nickname}}</p>
                                                <p>{{phonestar(item.phone)}}</p>
                                            </div>
                                        </div>
                                        <div class="list-right">
                                            <div class="earnings-time">
                                                <p>¥ {{item.moneyMax}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </van-cell>
                        </van-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {parseQueryString, phonestar} from '@/utils'

export default {
    data() {
        return {
            phonestar,
            imgUrl: require('../../assets/img/Bitmap.png'),
            loading: false,
            finished: false,
            config: {
                logo: require('../../assets/img/logo.png'),
                value: 'http://192.168.10.96:8080/shareregister.html?code=SQX19021454900938'
            },
            code: 'SQX19021454900938',
            query: {},
            myshare: {
                nickname: '', // 名称
                phone: '', // 名称
                inviteNum: '', // 已邀请人
                moneyMax: '', // 累计红包收益
                headPicUrl: '' // 头像
            },

            activityInviteRegister: {
                bgUrl: '',// 活动参数
                title: '',// 标题
                rule: '', // 规则
            },
            share_active: {
                icoUrl: '', // 传给安卓
                title: '',
                content: ''
            },
            memberInviteRecords: []

        }
    },
    created() {
        let obj = parseQueryString(window.location.href.split('?')[1]);
        this.query = obj || {};
        this.code = this.query.code
        this._shareActivityInvite()

    },

    methods: {
        _shareActivityInvite() {
            this.Api.shareActivityInvite(this.query.code).then(res => {
                if (res.status === 1) {
                    let resData = res.data;
                    console.log('aaa', resData)
                    this.myshare = {
                        nickname: resData.member.nickname,
                        phone: resData.member.phone,
                        inviteNum: resData.inviteNum,
                        moneyMax: resData.luckmoney / 100,
                        headPicUrl: resData.member.headPicUrl
                    }
                    this.activityInviteRegister = {
                        bgUrl: resData.activityInviteRegister.bgUrl,
                        title: resData.activityInviteRegister.title,
                        rule: resData.activityInviteRegister.rule
                    }
                    this.share_active = {
                        icoUrl: resData.activityInviteRegister.icoUrl, // 传给安卓
                        title: resData.activityInviteRegister.title,
                        content: resData.activityInviteRegister.content || '哈哈，没内容！'
                    }
                    this.memberInviteRecords = [];
                    resData.memberInviteRecords.map(item => {
                        this.memberInviteRecords.push({
                            phone: item.member.username,
                            nickname: item.member.nickname,
                            headPicUrl: item.member.headPicUrl,
                            moneyMax: item.luckmoney / 100,
                        })
                    })
                }
            })
        },
        shareImmediately() {
            window.location.href = `qtkj://share?title=${this.share_active.title}&content=${this.share_active.content}&url=${this.share_active.icoUrl}`
            // window.native.share(JSON.stringify(this.share_active))
        },
        onClickLeft() {
            window.location.href = (`qtkj://back`);
            // window.native.back();
        },
        // 跳邀请记录列表
        toInvitation() {
            window.location.href = `${this.HTTPLOCAT}/invitation.html?code=${this.code}&inviteNum=${this.myshare.inviteNum}&moneyMax=${this.myshare.moneyMax}`
        },
        onClickRight() {
            window.location.href = `${this.HTTPLOCAT}/rules.html?code=${this.code}`
        },
        onLoad() {
            // 异步更新数据
            // setTimeout(() => {
            // for (let i = 0; i < 10; i++) {
            //     this.list.push(this.list.length + 1);
            // }

            // }, 500);
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            this.finished = true;
            // if (this.memberInviteRecords.length >= 20) {
            //     this.finished = true;
            // }
        },
        toCode() {
            window.location.href = (`qtkj://code`);
        }
    }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "../../assets/css/reset.css";

.share-main-box {
    .top-bar {
        position: fixed;
        left: 0;
        right: 0;
        /*height: 42px;*/
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

        .btn-img {
            position: absolute;
            bottom: 0px;
            left: 0;
            right: 0;
            width: 210px;
            height: 60px;
            line-height: 60px;
            margin: 0 auto;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .btn-text {
            position: absolute;
            top: 8px;
            left: 0;
            right: 0;
            font-size: 12px;
            text-align: center;
            color: #fff;
        }

        .my-main {
            display: flex;
            align-items: center;
            margin: 0 20px;
            padding: 0 20px;
            position: absolute;
            bottom: 22px;
            left: 0;
            right: 0;

            .img-box {
                width: 41px;
                height: 41px;
                margin: 0 auto;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .name-num-money1 {
                padding-left: 7px;

                p:nth-child(1) {
                    width: 80px;
                    height: 20px;
                    font-size: 12px;
                    color: rgba(51, 51, 51, 1);
                    line-height: 20px;
                    padding-bottom: 3.5px;
                }

                p:nth-child(2) {
                    height: 16.5px;
                    font-size: 12px;
                    color: rgba(153, 153, 153, 1);
                    line-height: 16.5px;
                }
            }

            .name-num-money2 {
                padding-left: 20px;
                flex: 1;
                position: relative;

                .icon-right {
                    position: absolute;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    top: 0;
                    right: 0;
                    bottom: 0;
                }

                p:nth-child(1) {
                    height: 20px;
                    font-size: 12px;
                    color: rgba(51, 51, 51, 1);
                    line-height: 20px;
                    padding-bottom: 3.5px;

                    span {
                        color: #E93730;
                    }
                }

                p:nth-child(2) {
                    height: 16.5px;
                    font-size: 12px;
                    color: rgba(51, 51, 51, 1);
                    line-height: 16.5px;

                    span {
                        color: #E93730;
                    }

                    span:nth-child(1) {
                        padding-right: 3px;
                    }
                }
            }

        }


    }

    .my-share-box {
        width: 341.5px;
        height: 130px;
        background: url("../../assets/img/share1.png") no-repeat center;
        background-size: 100% 100%;
        margin: 0 auto;
        margin-bottom: 12.5px;
        position: relative;

        .my-share {
            height: 15.333vw;
            line-height: 15.333vw;
            display: flex;
            align-items: center;
            justify-content: center;

            img:nth-child(1) {
                width: 200px;
                height: 23.5px;
            }

            img:nth-child(2) {
                width: 28px;
                height: 31.5px;
                position: absolute;
                right: 15px;
            }
        }

        .my-main {
            display: flex;
            align-items: center;
            padding: 0 20px;
            padding-top: 7.5px;

            .img-box {
                width: 41px;
                height: 41px;
                margin: 0 auto;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .name-num-money {
                padding-left: 7px;
                flex: 1;

                p:nth-child(1) {
                    height: 20px;
                    font-size: 14px;
                    color: rgba(51, 51, 51, 1);
                    line-height: 20px;
                    padding-bottom: 3.5px;
                }

                p:nth-child(2) {
                    height: 16.5px;
                    font-size: 12px;
                    color: rgba(153, 153, 153, 1);
                    line-height: 16.5px;

                    span {
                        color: #E93730;
                    }

                    span:nth-child(1) {
                        padding-right: 3px;
                    }
                }
            }

            .icon-right {
                padding-left: 7.5px;
            }
        }

    }

    .ranking-box {
        position: absolute;
        left: 0;
        right: 0;
        background: transparent;
        top: 64px;

        .ranking-list {
            box-sizing: border-box;
            margin: 0 auto;
            border-radius: 7.5px;
            overflow: hidden;
            margin: 0 5.333vw;
            padding: 0 5.333vw;

            .list-box {
                height: 63.5px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .list-left {
                    display: flex;
                    align-items: center;

                    .ranking-num {
                        width: 23.5px;
                        height: 23.5px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 5px;

                        img {
                            width: 23.5px;
                            height: 23.5px;
                        }
                    }

                    img {
                        width: 41px;
                        height: 41px;
                        border-radius: 50%;
                    }

                    .name-phone {
                        padding-left: 7.5px;

                        p:nth-child(1) {
                            height: 20px;
                            font-size: 12px;
                            color: rgba(51, 51, 51, 1);
                            line-height: 20px;
                            padding-bottom: 7px;
                        }

                        p:nth-child(2) {
                            height: 16.5px;
                            font-size: 12px;
                            color: rgba(153, 153, 153, 1);
                            line-height: 16.5px;
                        }
                    }
                }

                .list-right {
                    .earnings-time {
                        text-align: right;

                        p:nth-child(1) {
                            height: 20px;
                            font-size: 12px;
                            color: rgba(51, 51, 51, 1);
                            line-height: 20px;
                            padding-bottom: 3.5px;
                        }
                    }
                }
            }
        }
    }
}

// MODEL
.v-popup-top {
    width: 255px;
    height: 253px;
    position: relative;

    .v-code {
        text-align: center;
        padding: 22.5px;
    }
}

.v-popup-bottom {
    width: 247px;
    height: 62px;
    line-height: 62px;
    display: flex;
    align-items: center;

    p {
        width: 200px;
        height: 39px;
        margin: 0 auto;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        line-height: 39px;
        background: url("../../assets/img/share13.png") no-repeat center;
        background-size: 100% 100%;
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
    color: #666;
    font-size: 20px;
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
    font-size: 16px;
}

.van-nav-bar__right .van-nav-bar__text {
    color: #999;
    padding-right: 30px;
}

.share-main-box .van-hairline--bottom::after {
    border-bottom-width: 0;
}

</style>
