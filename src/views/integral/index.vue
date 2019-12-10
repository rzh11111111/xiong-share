<template>
    <div class="app-init">
        <!--<div class="top-bar">-->
            <!--<van-nav-bar-->
                    <!--title="积分说明"-->
                    <!--left-arrow-->
                    <!--@click-left="onClickLeft"-->
            <!--/>-->
        <!--</div>-->
        <div class="top-main">
            <p class="problems">一、什么是积分？</p>
            <p>积分是省钱熊APP通过注册、买赠、活动参与等形式发放给用户，用于减免用户购买支付的优惠补贴措施，１积分可抵现１元。</p>
            <p class="problems">二、如何获取积分？</p>
            <p>1.首次下载省钱熊APP并成功注册后即送1000积分。</p>
            <p>2.用户在平台下单付款后，平台自动发放支付金额的等额积分至用户的账户，可在“我的-我的积分”查看。</p>
            <p class="problems">三、积分如何使用？</p>
            <p>1.用户在品牌商城、本地优品中购买商品时，可以使用积分抵扣部分现金。（具体以APP显示为准。）</p>
            <p>2.用户在本地生活中除生活超市外任一商家店铺购买商品或服务时可以使用积分抵扣部分现金。（具体以APP显示为准。）如：某餐馆会员价使用积分后打6折，A消费了200元，用80积分抵现后，支付120元。 </p>
            <p>3.当本地生活中的生活超市商品通过平台在店内做促销时才可使用积分抵扣现金。（具体以生活超市的实际活动为准。）</p>
            <p class="problems">四、积分的使用规则有哪些</p>
            <p>1.在品牌商城/本地优品中购买商品/服务，当前剩余积分小于须抵扣积分时，须按零售价购买；在本地生活中的实体店铺消费，当前剩余积分小于须抵扣积分时，须全额付款。</p>
            <p>2.积分可以累积，有效期为1年，如2019年5月20日获得200积分，该积分将在2020年5月19日逾期自动作废。用户在使用积分抵现时，优先消耗最早获得的积分。</p>
            <p>3.如使用积分的交易发生退款，已消耗的积分也将退还至用户账户。（如若交易在使用的积分有效期之外发生退款，该部分积分不予退还）。</p>
            <p>4.积分的数值精确到小数点后第2位（小数点第2位后全部舍弃，不进行四舍五入）。</p>
            <p>5.积分不能兑现，不可转让。</p>
            <p>6.用户在购买商品/服务时，在完成该笔交易后，才能获得此次交易的相应积分；交易完成前，积分属于冻结状态，不能抵现使用。</p>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            query: {},
        }
    },
    components: {},
    created() {
    },
    methods: {
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
    height: 50px;
    padding-bottom: 22px;
}

.top-main {
    padding: 0 6.133vw;
    padding-top: 10px;
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
