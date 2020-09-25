<template>
<!--底部导航栏-->
<div class="nav-box">
  <div v-if="!hasBlank" class="bom-blank"></div>
    <div class="nav clearfix">
         <!-- <router-link to="/" class="nav-lis" :class="{active: navNumber==0}">
          <div class="nav-img1 img"></div>
            <span>首页</span>
        </router-link> -->
        <router-link to="/" class="nav-lis" :class="{active: navNumber==1}">
            <div class="nav-img4 img"></div>
            <span>产品</span>
        </router-link>
        <a href="https://bx.wts999.com/m/index.html#/strategy" class="nav-lis" :class="{active: navNumber==2}">
            <div class="nav-img6 img"></div>
            <span>课堂</span>
        </a>
        <a href="https://www.wts999.com/question/" class="nav-lis" :class="{active: navNumber==3}">
          <div class="nav-img5 img"></div>
            <span>问答</span>
        </a>
        <router-link :to="hasLogin('/personal/policyMyList')" class="nav-lis" :class="{active: navNumber==4}">
          <div class="nav-img2 img"></div>
            <span>保单</span>
        </router-link>
        <router-link to="/personal" class="nav-lis" :class="{active: navNumber==5}">
          <div class="nav-img3 img "></div>
            <span>我的</span>
        </router-link>
    </div>

</div>
</template>

<script>
export default {
  props: ["navNumber",'hasBlank'],
  data() {
    return {
      hasLogin(path){
        if(this.$config.user && this.$config.user.id){
          return path
        }else {
          return {
            path:'/BDmobileHtml',
            query: {
              redUrl: path
            }
          }
        }
      }
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
 /*底部导航栏*/
  .nav{
    width: 100%;
    max-width: r(750);
    height: 55px;
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: 999;
    transform: translateX(-50%);
    background-color: #fff;
    border-top: 1px solid #ececec;
    padding: 0 r(20);
    .nav-lis{
      position: relative;
      float: left;
      width: 20%;
      height: 100%;
      text-align: center;
      @include remCalc(font-size,22);
      color: #3c3c3c;
    }
    .nav-img1{
      background-image: url("~@/home1.png");
    }
    .nav-img2{
      background-image: url("~@/community1.png");
    }
    .nav-img3{
      background-image: url("~@/mine1.png");
    }
    .nav-img4{
      background-image: url("~@/product1.png");
    }
    .nav-img5{
      background-image: url("~@/ask1.png");
    }
    .nav-img6{
      background-image: url("~@/share1.png");
    }
    .img{
      display: inline-block;
      width: 20px !important;
      height: 20px !important;
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
        background-image: url("~@/home2.png");
      }
      .nav-img2{
        background-image: url("~@/community2.png");
      }
      .nav-img3{
        background-image: url("~@/mine2.png");
      }
      .nav-img4{
        background-image: url("~@/product2.png");
      }
      .nav-img5{
        background-image: url("~@/ask2.png");
      }
      .nav-img6{
        background-image: url("~@/share2.png");
      }
    }
  }
.bom-blank {
  width: 100%;
  @include remCalc(height,104);
}
@media screen and (max-width: 320px) {
  .foot-p-kfphone {
    width: r(120) !important;
  }
}
</style>