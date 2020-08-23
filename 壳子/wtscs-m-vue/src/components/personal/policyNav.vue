<template>
<!--底部导航栏-->
<div class="policy-nav-box">
    <div class="bom-blank" v-if="hasBlank"></div>
    <div class="nav clearfix">
        <router-link to="/personal/policyMyList" class="nav-lis" :class="{active: navNumber==0}" replace>
          <div class="nav-img1 img"></div>
            <span>保单管理</span>
        </router-link>
        <router-link to="/personal/personalMy" class="nav-lis" :class="{active: navNumber==1}" replace>
          <div class="nav-img2 img "></div>
            <span>保单服务</span>
        </router-link>
        <router-link to="/personal/insureAnalysis" class="nav-lis" :class="{active: navNumber==2}" replace>
          <div class="nav-img3 img "></div>
            <span>保障分析</span>
        </router-link>
        <router-link to="/personal/myClaimsList" class="nav-lis" :class="{active: navNumber==3}" replace>
          <div class="nav-img4 img "></div>
            <span>理赔管理</span>
        </router-link>
    </div>
</div>
</template>

<script>
export default {
  props: ["navNumber",'hasBlank'],
  data() {
    return {};
  },
  computed: {},
  methods: {

  }
};
</script>

<style lang="scss" scoped>
 /*底部导航栏*/
 .policy-nav-box{
   .nav{
    width: 100%;
    max-width: r(750);
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: 997;
    transform: translateX(-50%);
    background-color: #fff;
    border-top: 1px solid #ececec;
    
    .nav-lis{
      position: relative;
      float: left;
      width: 25%;
      height: 100%;
      text-align: center;
      @include remCalc(font-size,24);
      color: #3c3c3c;
    }
    .nav-img1{
      background-image: url("~@/policys/policy1.png");
    }
    .nav-img2{
      background-image: url("~@/policys/service1.png");
    }
    .nav-img3{
      background-image: url("~@/policys/analysis1.png");
    }
    .nav-img4{
      background-image: url("~@/policys/progress1.png");
    }
    .img{
      display: inline-block;
      width: 22px !important;
      height: 22px !important;
      position: absolute;
      top: 9px;
      left: 50%;
      background-size: 100%;
      background-repeat: no-repeat;
      transform: translateX(-50%);
    }
  
    //i{
    //  position: absolute;
    //  top: r(5);
    //  left: 50%;
    //  @include transform(translateX(-50%));
    //  @include remCalc(font-size,38);
    //  color: #3c3c3c;
    //}
    .icon-gerenzhongxin{
      @include remCalc(font-size,36);
    }
  
    span{
      width: 100%;
      position: absolute;
      font-size: 14px;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
    }
    .active{
      color: $baseColor;
      .nav-img1{
        background-image: url("~@/policys/policy2.png");
      }
      .nav-img2{
        background-image: url("~@/policys/service2.png");
      }
      .nav-img3{
        background-image: url("~@/policys/analysis2.png");
      }
      .nav-img4{
        background-image: url("~@/policys/progress2.png");
      }
    }
  }
 }
  
.bom-blank {
  width: 100%;
  height: 60px;
}
@media screen and (max-width: 320px) {
  .foot-p-kfphone {
    width: r(120) !important;
  }
}
</style>