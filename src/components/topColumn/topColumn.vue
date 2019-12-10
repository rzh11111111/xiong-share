<template>
    <div>
      <header :class="topHeader.heade" class="heade">
        <!--登录页顶部左-->
        <img @click="$router.go(-1)" src="@/icons/svg/backlcon.svg"  class="backlcon" v-if="topHeader.left=='1'" />
        <!--常用顶部左-->
        <img @click="$router.go(-1)" src="@/icons/svg/backlist.svg"  class="backlcon" v-if="topHeader.left=='2'" />
        <!--编辑资料顶部左-->
        <img @click="goback" src="@/icons/svg/backlist.svg"  class="backlcon" v-if="topHeader.left=='3'" />
        <!--首页顶部左-->
        <van-icon name="user-o" class="backlcon2" v-if="topHeader.left=='4'" size="40px" @click="tominedetail" />
        <!--<img src="@/icons/svg/backlist.svg"  class="backlcon"  />-->
        <h1 class="headline">{{topHeader.name}}</h1>
        <!--<div > +</div>-->
        <!--<div>321123</div>-->
        <div class="rightlcon">
          <img @click="clicktimechoose" src="@/icons/svg/datachoose.png"  class="rightlcon1" v-if="topHeader.right1" />
          <img @click="" src="@/icons/svg/search.svg"  class="rightlcon1" v-if="topHeader.right2" />
          <div @click="" class="right1" v-if="topHeader.right3" >{{topHeader.right3content}}</div>
          <div @click="tobingcard" class="right1" v-if="topHeader.right4" >编辑</div>
          <!--<div @click="" class="right1" v-if="topHeader.right4">{{topHeader.right4content.content}}({{topHeader.right4content.now}}/{{topHeader.right4content.all}})</div>-->
        </div>
      </header>
      <div class="headerbottom"></div>

    </div>
</template>

<script>

export default {
  props: [
    'topHeader'
  ],
  data () {
    return {

    }
  },
  components:{

  },
  methods: {
    toadd () {
      console.log(this.$route.query.id)
      switch (this.$route.query.id) {
        case 0:
          this.$router.push('/AddTogether')
          break
        case 1:
          this.$router.push('/AddPopularize')
          break
        case 2:
          this.$router.push('/AddSeed')
        default:
          break
      }

    },
    goback() {
      this.$parent.goback();
    },
    tominedetail(){
      this.$emit('tominedetail','click')
      // this.$router.push('/MineDetail')
    },
    clicktimechoose(){
      this.$emit('clickcallback','click')
    },
    tobingcard(){
      this.$router.push('/BindCard')
    }

  }
}
</script>

<style scoped>
.heade{
  width: 375px;
  height: 44px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30000;
}
.headerbottom{
  width: 375px;
  height: 43px;
}
.header1{
  background: #0088FD;
  background: -webkit-linear-gradient(to right,#00A7FC, #0088FD);
  background: -moz-linear-gradient(to right,#00A7FC, #0088FD);
  background: linear-gradient(to right,#00A7FC, #0088FD);
  color: #ffffff;
}
.backlcon{
  width: 20px;
  height: 20px;
  position: absolute;
  left: 18px;
  top:12px;
}
.backlcon2{
  width: 22px;
  height: 22px;
  position: absolute;
  /*border-radius: 50%;*/
  /*border: 1px solid #fff;*/
  left: 18px;
  top:12px;
}
  .headline{
    position: absolute;
    left: 50%;
    font-size: 18px;
    line-height: 44px;
    transform: translateX(-50%);
  }
  .rightlcon{
    float: right;
    display: flex;
  }
  .rightlcon1{
    width: 20px;
    height: 20px;
    margin: 12px 18px 12px 0;
  }
  .right1{
    font-size: 14px;
    line-height: 44px;
    margin-right: 18px;
  }
</style>
