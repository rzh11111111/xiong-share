<template>
    <div class="app-init">
        <div class="top-bar">
            <div class="height16"></div>
            <van-nav-bar
                    title="邀请记录"
                    :left-arrow="true"
                    @click-left="onClickLeft"
            />
        </div>
        <div class="height58"></div>
        <div class="top-main">
            <div class="num-left">
                <span>已邀请：</span>
                <span>{{query.inviteNum}}人</span>
            </div>
            <div class="num-right">
                <span>累计分享红包：</span>
                <span>¥{{query.moneyMax}}元</span>
            </div>
        </div>
        <div class="invitation-list">
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
                                <div class="img-box">
                                    <img :src="item.headPicUrl?item.headPicUrl:imgUrl"
                                         alt="">
                                </div>
                                <div class="name-phone">
                                    <p>{{item.phone}}</p>
                                    <p>{{item.nickname}}</p>
                                </div>
                            </div>
                            <div class="list-right">
                                <div class="earnings-time">
                                    <p>获得红包收益：¥{{item.moneyMax}}</p>
                                    <p>注册时间：{{item.createTime.split(' ')[0]}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
import {parseQueryString} from '@/utils'
export default {
    data() {
        return {
            imgUrl: require('../../assets/img/share9.png'),
            loading: false,
            finished: false,
            query: {},
            pagination: {
                page: 1,
                count: 10
            },
            memberInviteRecords: []
        }
    },
    components: {},
    created() {
        let obj = parseQueryString(window.location.href.split('?')[1]);
        this.query = obj || {};
        this._shareInviteInvite()
    },
    methods: {
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
        _shareInviteInvite() {
            let para = {
                code: this.query.code,
                data: {
                    pageNo: this.pagination.page,
                    pageSize: this.pagination.count
                }
            }
            this.Api.shareInviteInvite(para).then(res => {
                let resData = res.data.list;
                this.memberInviteRecords = [];
                resData.map(item => {
                    this.memberInviteRecords.push({
                        phone: item.member.username,
                        nickname: item.member.nickname,
                        headPicUrl: item.member.headPicUrl,
                        createTime: item.createTime,
                        moneyMax: (item.luckmoney / 100) || 0,
                    })
                })
                console.log('aaaa', this.memberInviteRecords)
            })
        },
        onClickLeft() {
            window.history.go(-1);
        },
    }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "../../assets/css/reset.css";

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

.top-main {
    display: flex;
    padding: 0 30px;
    padding-bottom: 26px;
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    background-color: #F7F7F7;

    .num-left {
        color: rgba(51, 51, 51, 1);

        span:nth-child(2) {
            color: #E93730;
        }
    }

    .num-right {
        padding-left: 36px;

        span:nth-child(2) {
            color: #E93730;
        }
    }
}

.invitation-list {
    background-color: #FFFFFF;
    margin: 0 30px;

    .list-box {
        height: 63px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .list-left {
            display: flex;
            align-items: center;
            .img-box {
                width: 41px;
                height: 41px;
                margin:  0 auto;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .name-phone {
                padding-left: 15px;

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

                p:nth-child(2) {
                    height: 16.5px;
                    font-size: 12px;
                    color: rgba(153, 153, 153, 1);
                    line-height: 16.5px;
                }
            }
        }
    }
}

/*vant样式修改*/
.top-bar .van-nav-bar .van-icon {
    color: #666;
    font-size: 20px;
    padding-left: 12px;
}

.top-bar .van-nav-bar {
    /*background-color: transparent;*/
}

.van-nav-bar .van-nav-bar__title {
    color: #333333;
    font-size: 16px;
    font-weight: 400;
}

.top-bar .van-hairline--bottom::after {
    border-bottom-width: 0;
}
</style>
