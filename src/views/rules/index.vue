<template>
    <div class="app-init">
        <div class="top-bar">
            <div class="height16"></div>
            <van-nav-bar
                    title="规则说明"
                    :left-arrow="false"
                    @click-left="onClickLeft"
            />
        </div>
        <div class="top-main">
            <p class="problems">一、活动时间：</p>
            <p>1、红包获取时间：长期。</p>
            <p>2、获得的红包使用时间：长期。</p>
            <p class="problems">二、活动规则：</p>
            <p> 1、参与赚红包的用户（下称“分享用户”）可以通过分享个人二维码或分享省钱熊平台的商品/服务链接邀请其他未注册用户，被邀请的用户下载省钱熊APP并注册成为省钱熊新用户（下称“被分享用户”）。
            </p>
            <p>2、被分享用户在平台消费，每次实付金额满30元，分享用户就可以获得一个分享红包。（注：实际支付金额不包括红包抵现部分。）</p>
            <p>3、同一天内，若同一用户被多人分享邀请，则按照该用户最后扫描的二维码或点击的链接为准，该用户注册后，发出邀请的用户成为他/她的分享用户。</p>
            <p>4、分享用户获得的红包金额随机，最高200元，所得红包可在“我的-红包”查看。</p>
            <p>5、分享用户邀请的注册新用户越多，可获得的红包越多。</p>
            <p>6、分享用户每天可获得的红包数量无上限限制。</p>
            <p class="problems">三、红包使用规则：</p>
            <p>1、分享用户在平台消费任何商品/服务时都可以使用红包抵扣现金。红包可拆分，支付时需手动输入抵扣的红包金额。</p>
            <p>2、红包可以提现。</p>
            <p>3、分享用户在平台下单付款（实付金额满30元）后，被分享用户立即获得红包；当被分享用户的订单已确认收货并过了15天，被分享用户获得的红包才可以在平台下单抵现或提现。</p>
            <p>4、红包可以用于单件商品的抵现付款，也可以用于多件商品合并下单的抵扣付款。</p>
            <p>5、使用红包的订单若发生退款，抵扣的红包会退回账户中，可在“我的-红包”查看。</p>
            <p>6、若被分享用户实付金额满30元的订单发生退款，分享用户获得的红包须退回（系统自动扣除）。</p>
            <p>7、红包面额支持开具发票。用户使用分享红包的订单在开具发票时，发票金额包含使用的分享红包面额。</p>
            <p>8、红包可抵现的金额≤订单金额。</p>
            <p>9、分享用户每天可抵现的红包金额无上限限制，每天可使用红包的次数无上限限制。</p>
            <p>10、红包不可转赠他人，不可为他人付款。</p>
            <p class="problems">四、红包提现规则：</p>
            <p>1、可提现时间：每月6日、16日、26日。</p>
            <p>2、提现次数：每个提现日仅可提现一次。</p>
            <p>3、可提现红包总金额低于50元时无法提现。</p>
            <p>
                4、红包收入属于偶然所得，提现时须缴纳20%个人所得税，由平台依法代扣代缴。同时，银行收取1%手续费。个人所得税和银行手续费从提现金额中扣除，所以提现实际到账金额=申请提现金额-申请提现金额*20%-申请提现金额*1%。例如：提现100元红包金额，到账金额=100-100*20%-100*1%=100-20-1=79元。</p>
            <p>五、注意事项</p>
            <p>在获取和使用红包的过程中，如果用户出现违规行为（如作弊领取、恶意套现、刷取信誉、虚假交易等），平台将取消违规用户的获取资格，并有权撤销违规交易，
                收回通过违规行为获得红包，必要时追究法律责任。
            </p>
        </div>

    </div>
</template>

<script>
import {parseQueryString} from '@/utils'

export default {
    data() {
        return {
            query: {},
            activityInviteRegister: {}
        }
    },
    components: {},
    created() {
        let obj = parseQueryString(window.location.href.split('?')[1]);
        this.query = obj || {};
        this._shareActivityInvite()
    },
    methods: {

        _shareActivityInvite() {
            this.Api.shareActivityInvite(this.query.code).then(res => {
                if (res.status === 1) {
                    let resData = res.data;
                    this.activityInviteRegister = {
                        rule: resData.activityInviteRegister.rule
                    }
                }
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

.top-main {
    padding: 0 6.133vw;
    padding-top: 17.467vw;
    padding-bottom: 3.467vw;
    font-size: 3.733vw;
    font-weight: 400;
    background-color: #F7F7F7;

    .problems {
        font-weight: bold;
    }

    p {
        text-align: justify;
        text-indent: 10px;
        font-size: 12px;
        line-height: 25px;
    }
}

/*vant样式修改*/
.top-bar .van-nav-bar .van-icon {
    color: #333333;
    padding-left: 12px;
}

.top-bar .van-nav-bar {
    background-color: #fff;
}

.van-nav-bar .van-nav-bar__title {
    color: #333333;
    font-weight: 400;
}

.top-bar .van-hairline--bottom::after {
    border-bottom-width: 0;
}
</style>
