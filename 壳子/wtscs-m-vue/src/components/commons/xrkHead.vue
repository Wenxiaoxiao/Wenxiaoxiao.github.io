<template>
<!--底部导航栏-->
<div class="xrk-head">
    <div class="head-blank" v-if="hasBlank"></div>
  <!--头部导航栏-->
    <header class="layout-header">
        <div class="header clearfix">
            <a class="a_left fl" @click="backHome">
                <i class="iconfont icon-arrow-left drawer"></i>
            </a>
            <div class="logo-title">
                <slot></slot>
            </div>
            <div class="btns fr" @click="isPull = true">
                <i class="iconfont icon-gengduo2 drawer"></i>
            </div>
        </div>
    </header>
    <div class="xrk-box">
        <div class="xrk-header-pull-bg" v-show="isPull" @click="isPull = false"></div>
        <div class="xrk-header-pull" :class="isPull?'show':''">
            <img content="img-t" src="static/images/icon_up.png" class="pull-up">
            <a href="https://www.wts999.com">
                <div>官网首页</div>
            </a>
            <router-link to="/">
                <div>保险商城</div>
            </router-link>
            <a href="https://bx.wts999.com/m/claim">
                <div>梧优理赔</div>
            </a>
            <!-- <router-link to="/claim1">
                <div>梧优理赔</div>
            </router-link> -->
            <!-- <router-link to="/claim1">
                <div>梧优理赔测</div>
            </router-link> -->
            <!-- <router-link to="/strategy">
                <div>投保攻略</div>
            </router-link>
            <a href="https://www.wts999.com/question/question.html">
                <div>保险问答</div>
            </a> -->
            <router-link to="/exercise/counselor">
                <div>保险顾问</div>
            </router-link>
            <a href="https://www.wts999.com/theme/m/bdfw.html">
                <div>管家服务</div>
            </a>
            <a href="https://www.wts999.com/dz/dz.html">
                <div>方案定制</div>
            </a>
            <router-link to="/personal">
                <div>个人中心</div>
            </router-link>
            <a href="https://webpage.qidian.qq.com/2/chat/h5/index.html?linkType=1&env=ol&kfuin=2852150563&fid=162&key=3635f50f03b5a57b7dbb7656c9868ee1&cate=7&type=10&ftype=1&_type=wpa&qidian=true&translateSwitch=0&roleValue=1&roleData=69">
                <div> 在线客服 </div>
            </a>
        </div>
    </div>
</div>
</template>

<script>
export default {
props: ['hasBlank'],
  data() {
    return {
        isPull:false
    };
  },
  computed: {},
  methods: {
      backHome(){
          var history=window.history;
          if(history.length>1){
              window.history.go(-1)
          }else{
              location.href="https://www.wts999.com/"
          }
      }
  }
};
</script>

<style lang="scss">
 .xrk-head{
     .head-blank{
         height: 45px;
     }
     .header{
        height: 45px;
        padding: 5px 10px;
     }
     .layout-header{
       height: 45px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 45px;
        background-color: #fff;
        z-index: 888;
        border-bottom: 1px solid #ececec;
        .a_left{
            position: absolute;
            height: 45px;
            top: 0;
            left: 10px;
            height: 100%;
            color: #4580f6;
            z-index: 999;
            >i{
                display: block;
                height: 100%;
                line-height: 45px;
                font-size: r(50);
                text-align: center;
            }
        }
        .btns{
            position: absolute;
            height: 45px;
            top: 0;
            right: 10px;
            height: 100%;
            color: #4580f6;
            z-index: 999;
            >i{
                display: block;
                height: 100%;
                line-height: 45px;
                font-size: r(54);
                text-align: center;
            }
        }
        .logo-title{
            text-align: center;
            line-height: 35px;
            font-size: r(36)
        }
     }
     .xrk-box{
         .xrk-header-pull-bg{
            position: fixed;
            top: 0px;
            left: 0px;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.5);
            height: 100%;
            width: 100%;
            z-index: 100;
            z-index: 998;
         }
         .xrk-header-pull{
            position: fixed;
            top: 1.33333rem;
            right: 0.4rem;
            background: #fff;
            width: 3rem;
            text-align: center;
            z-index: 101;
            padding: 0.06667rem 0.26667rem 0.26667rem 0.26667rem;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            border-radius: 4px;
            z-index: 999;
            transform: scale(0);
            -webkit-transform: scale(0);
            -moz-transform: scale(0);
            -ms-transform: scale(0);
            -o-transform: scale(0);
            &.show{
                 transform: scale(1);
                -webkit-transform: scale(1);
                -moz-transform: scale(1);
                -ms-transform: scale(1);
                -o-transform: scale(1);
                transition: all .2s;
                -webkit-transition: all .2s;
                -moz-transition: all .2s;
                -ms-transition: all .2s;
                -o-transition: all .2s;
            }
            .pull-up{
                position: absolute;
                top: -0.2rem;
                right: 0.36rem;
                width: 0.37333rem;
            }
            a{
                text-decoration: none !important;
                -webkit-tap-highlight-color: transparent;
                color: #000000;
                font-size: 0.42667rem;
                height: 1.2rem;
                line-height: 1.2rem;
                display: block;
                position: relative;
                border-bottom: 1px solid #dadada;
                &:last-child{
                    border-bottom: 0;
                }
            }
         }
     }
 }
</style>