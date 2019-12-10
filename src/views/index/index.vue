<template>
    <div class="app-init">
        <div class="top-height"></div>
        <div class="avatar">
            <p>
                <img :src="member.headPicUrl?member.headPicUrl:imgUrl"
                     alt="">
            </p>
        </div>
        <div class="reward">
            <p>{{member.nickname}}送您<span>{{awardContent}}积分</span></p>
            <p>{{awardContent}}积分可抵{{awardContent}}元现金</p>
        </div>
        <div class="b-account">
            <ul class="form-box">
                <li class="form-li borderB-1px">
                    <p class="form-left">手机号</p>
                    <div class="form-input">
                        <input type="number" placeholder="请输入手机号" v-model='username'>
                    </div>
                </li>
                <li class="form-li borderB-1px">
                    <p class="form-left">验证码</p>
                    <div class="form-input">
                        <input type="text" placeholder="请输入验证码" v-model='verifyCode'>
                    </div>
                    <div class="btn-code" @click="sendMessageCode">{{messCode}}</div>
                </li>
                <li class="form-li">
                    <p class="form-left">密码</p>
                    <div class="form-input">
                        <input type="password" placeholder="请输入密码" v-model='password'>
                    </div>
                </li>
            </ul>
        </div>
        <div class="discussion-check">
            <van-checkbox v-model="checked" checked-color="#EF278E">
                <span class="text-a">同意</span>
                <span class="text-a text-a-2" @click.stop="handleuseragree">《省钱熊用户协议》</span>,
                <span class="text-a text-a-3" @click.stop="handleprivacy">《省钱熊隐私政策》</span>
            </van-checkbox>
        </div>
        <div class="btn-share">
            <p @click="handleRegister">领取{{awardContent}}积分</p>
        </div>
        <van-popup v-model="show">
            <div class="v-popup-top">
                <p>恭喜获得{{awardContent}}积分</p>
            </div>
            <div class="v-popup-bottom">
                <p @click="downApp">下载省钱熊APP</p>
            </div>
        </van-popup>
        <van-dialog
                v-model="show1"
                title=""
                :closeOnClickOverlay="true"
                :showConfirmButton="false"
                className="down-dialog"
        >
            <div class="down-box">
                <div class="img-box" @click="closeDown"></div>
                <p class="p1">该手机号已注册</p>
                <p class="p2" @click="downApp">下载省钱熊APP</p>
            </div>

        </van-dialog>
    </div>
</template>

<script>
import {parseQueryString} from '@/utils'
import {Toast} from 'vant'

export default {
    data() {
        return {
            show: false,
            show1: false,
            member: {
                nickname: '',
                headPicUrl: '',
            },

            imgUrl: require('../../assets/img/share9.png'),
            messCode: '获取验证码',

            username: '',
            password: '',
            verifyCode: '',

            awardContent: '',
            checked: false
        }
    },
    created() {
        let obj = parseQueryString(window.location.href.split('?')[1]);
        this.query = obj || {};
        if (this.query && this.query.code) {
            this.Api.registerFind(this.query.code).then(res => {
                if (res.status == 1) {
                    let resData = res.data
                    this.member = {
                        nickname: resData.member.nickname,
                        headPicUrl: resData.member.headPicUrl,
                    }
                    if (resData.activitySpreadRegister.awardType == 1) {
                        this.awardContent = resData.activitySpreadRegister.awardContent / 100;
                    }
                }
            })
        }
    },
    methods: {
        closeDown() {
            this.show1 = false
        },
        /* 发送短信验证码*/
        sendMessageCode() {
            let mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[0-9]|16[0-9])[0-9]{8}$/;
            if (!this.username) {
                Toast('请输入手机号！');
                return
            }
            if (!mobileReg.test(this.username)) {
                Toast('请输入正确的手机号！')
                return
            }
            if (!mobileReg.test(this.username)) {
                Toast('请输入正确的手机号！')
                return
            }
            let para = {
                username: this.username
            }
            if (this.messCode == '获取验证码' || this.messCode == '重新发送') {
                this.Api.getMsgCode(para).then(res => {
                    if (res.status === 1) {
                        Toast.success('发送成功');
                        this.countDown();
                    } else if (res.status === 11900) {
                        this.show1 = true
                    }
                })
            }
        },
        countDown() {
            let val = 59;
            this.messCode = val + 's';
            let t = setInterval(() => {
                val--;
                this.messCode = val + 's';
                if (val == 0) {
                    this.messCode = '重新发送';
                    clearInterval(t);
                }
            }, 1000)
        },
        handleRegister() {
            // this.show = true;
            let mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[0-9]|16[0-9])[0-9]{8}$/;
            if (!this.username) {
                Toast('请输入手机号！');
                return
            }
            if (!mobileReg.test(this.username)) {
                Toast('请输入正确的手机号！')
                return
            }
            if (!this.verifyCode) {
                Toast('请输入验证码！')
                return
            }
            if (!this.CheckPassWord(this.password)) {
                Toast('必须为字母加数字且长度不小于8位！')
                return
            }
            if (!this.checked) {
                Toast('请勾选用户协议！')
                return
            }
            let para = {
                code: this.query.code,
                data: {
                    username: this.username,
                    password: this.password,
                    verifyCode: this.verifyCode,
                }
            }

            this.Api.register(para).then(res => {
                if (res.status === 1) {
                    // Toast.success('领取成功！');
                    this.show = true;
                } else if (res.status === 40003) {
                    this.show1 = true
                }
            })
        },
        CheckPassWord(password) {//必须为字母加数字且长度不小于8位
            var str = password;
            if (str == null || str.length < 8) {
                return false;
            }
            var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
            if (!reg1.test(str)) {
                return false;
            }
            var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
            if (reg.test(str)) {
                return true;
            } else {
                return false;
            }
        },
        downApp() {
            window.location.href = `${this.HTTPLOCAT}/download.html`
        },
        handleuseragree() {
            window.location.href = `${this.HTTPLOCAT}/useragree.html`
        },
        handleprivacy() {
            window.location.href = `${this.HTTPLOCAT}/privacy.html`
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

    p {
        width: 65px;
        height: 65px;
        margin: 0 auto;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
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

.form-box {
    width: 283px;
    margin: 0 auto;
    padding: 0 7px;
    background-color: rgba(245, 245, 245, 1);

    .form-li {
        display: flex;
        align-items: center;
        height: 42.5px;
        padding-left: 10px;

        .form-left {
            width: 63px;
            font-size: 14px;
            color: #333333;
        }

        .form-input {
            flex: 1;

            input {
                width: 110px;
                background-color: transparent;
                font-size: 13px;
                color: #333333;
                border: none;
            }
        }

        .btn-code {
            width: 66.5px;
            font-size: 12px;
            color: #100F0F;
        }
    }
}

.discussion-check {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 59px;

    .text-a {
        font-size: 12px;
    }

    .text-a-2, .text-a-3 {
        color: #E93730;
    }
}

.btn-share {
    text-align: center;
    width: 250px;
    height: 45px;
    line-height: 45px;
    margin: 0 auto;
    color: #ffffff;
    padding-top: 21px;

    p {
        background: url("../../assets/img/share10.png") no-repeat center;
        background-size: 100% 100%;
    }
}

.v-popup-top {
    width: 249px;
    height: 161px;
    background: url("../../assets/img/share-bj.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;

    p {
        text-align: center;
        position: absolute;
        bottom: 23.4px;
        left: 0;
        right: 0;
        font-size: 15px;
        color: rgba(255, 255, 255, 1);
    }
}

.v-popup-bottom {
    width: 249px;
    height: 84px;
    line-height: 84px;
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
        background: url("../../assets/img/share11.png") no-repeat center;
        background-size: 100% 100%;
    }
}

.van-popup {
    border-radius: 12px;
}

.discussion-check /deep/ .van-checkbox__icon .van-icon {
    width: 15px;
    height: 15px;
    font-size: 12px;
    border-radius: 5px;
}

.discussion-check /deep/ .van-checkbox__icon {
    line-height: 15px;
    height: 15px;
}

.app-init {
    .down-dialog {
        width: 235px;
        height: 140px;
        overflow: inherit;

        /deep/ .van-dialog__content {
            width: 100%;
            height: 100%;
        }


        .down-box {
            width: 100%;
            height: 100%;
            position: relative;

            .img-box {
                width: 30px;
                height: 52px;
                position: absolute;
                top: -52px;
                right: 0;
                background: url("./img/close.png") no-repeat center;
                background-size: contain;
            }

            .p1 {
                text-align: center;
                font-size: 15px;
                font-weight: 500;
                padding-top: 33px;
                color: rgba(51, 51, 51, 1);
            }

            .p2 {
                width: 184px;
                height: 37px;
                line-height: 37px;
                position: absolute;
                bottom: 22.5px;
                left: 0;
                right: 0;
                font-size: 15px;
                margin: 0 auto;
                text-align: center;
                background: url("./img/bg-btn.png") no-repeat center;
                background-size: 100% 100%;
                color: #fff;
            }
        }
    }
}
</style>
