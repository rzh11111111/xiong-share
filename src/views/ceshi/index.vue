<template>
    <div class="app-init">
        <p>姓名<input type="text" v-model="name"></p>
        <p>手机号<input type="text" v-model="phone"></p>
        <p>身份证<input type="text" v-model="idCard"></p>
        <p>银行卡<input type="text" v-model="bankNo"></p>
        <!--name=仓超&phone=18551563689&idCard=32092519920108205X&bankNo=6228481988219579278-->
        <p class="to-ios" @click="submit">提交</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name:'',
            phone:'',
            idCard:'',
            bankNo:''
        }
    },
    components: {},
    created() {

    },
    methods: {
        submit() {
            let para = {
                name:this.name,
                phone:this.phone,
                idCard:this.idCard,
                bankNo:this.bankNo
            }
            this.Api.getvertify(para).then(res=>{
                console.log('aaa',res)
            })
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

    img {
        width: 65px;
        height: 65px;
        border-radius: 5px;
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
