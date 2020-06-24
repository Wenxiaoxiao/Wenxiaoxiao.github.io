<template>
  <div class="super-container" :class="showHead?'':'active'">
    <xrk-head v-show="true">保险商城</xrk-head>
    <div class="search-event-tap clearfix" ref="search">
      <router-link to="/super/search-compoy" class="fl company-tap">
        保险公司
        <i class="iconfont icon-xiajiantou"></i>
      </router-link>
      <router-link to="/super/search" class="fr pro-tap">
        <i class="iconfont icon-fangdajing"></i> 搜索产品、文章、问答
      </router-link>
    </div>
    <div class="index-nav-pro">
      <ul class="ul-title" ref="navUl">
        <li
          v-for="(value,i) in superAllNav"
          ref="navLi"
          :class="value.code == superCode?'active':''"
          @click="superNavTap(value.code)"
        >{{value.name}}</li>
        <li class="blank"></li>
      </ul>
      <div class="next_btn" v-show="arrowHide">
        <i class="iconfont icon-xiajiantou"></i>
      </div>
    </div>
    <div class="productBox">
      <mescroll-vue ref="mescroll" :up="mescrollUp" :down="mescrollDown" @init="mescrollInit">
        <div class="typeBanner" ref="banner" v-if="bannerList && bannerList[superCode] && bannerList[superCode].length>0">
          <div class="banner-swiper-list">
            <div  class="swiper-wrapper">
              <template v-for="(value,i) in bannerList[superCode]">
                <a v-if="value.articleType == '5'" class="swiper-slide" :href="value.content">
                  <img :src="value.image[0].url" alt />
                </a>
                <a
                  v-else
                  class="swiper-slide"
                  :href="$config.env == '0'?'https://www.wts9999.net/article/'+value.articleId+'.html':'https://www.wts999.com/article/'+value.articleId+'.html'"
                >
                  <img :src="value.image[0].url" alt />
                </a>
              </template>
            </div>
            <div v-if="bannerList && bannerList[superCode].length>1" class="swiper-pagination"></div>
          </div>
        </div>
        <div class="index-nav-groups">
          <!--推荐-->
          <div class="content">
            <pro-list :superListData="superListData"></pro-list>
          </div>
        </div>
      </mescroll-vue>
    </div>
    <app-loading :loaded="loaded"></app-loading>
  </div>
</template>
<script>
import nav from "@/components/commons/nav";
import loading from "@/components/commons/loading";
import proList from "@/components/super/proList";
import xrkHead from "@/components/commons/xrkHead";
import Swiper from "static/js/swiper-4.3.3.min";
import "static/css/swiper-4.3.3.min.css";
import _ from "lodash";
import mscll from "@/api/mescrolls.js"; //工具
import MescrollVue from "mescroll.js/mescroll.vue";
//当前实例组件
var vm = null;
export default {
  data: () => ({
    //加载开关
    loaded: false,
    user: {
      headimgurl: "",
      nickname: "游客"
    },
    superCode: "06",
    //产品列表tap数据
    superAllNav: null,
    //产品数据
    superListData: null,
    //导航滑动标识符显示开关
    arrowHide: false,
    //产品banner列表
    bannerList: null,
    //是否显示顶部头部
    showHead: false
  }),
  components: {
    "app-loading": loading,
    "pro-list": proList,
    "mescroll-vue": MescrollVue,
    "xrk-head": xrkHead
  },
  created() {
    vm = this;
    var shareParam = {
      title: "保险商城",
      desc:
        "梧桐树保险商城拥有全国各大型保险公司优质产品，产品丰富，性价比高，投保安全，方便快捷！"
    };
    this.$weixin.share(shareParam);
    this.superCode = sessionStorage.superCode || "06";
    this.mescrollDomInit();
    vm.showHead = !vm.$tools.isAL();
  },

  beforeRouteLeave (to, from, next) {
    sessionStorage.removeItem("superCode");
    next();
  },
  beforeDestroy() {
    this.mescroll.setBounce(true);
  },

  methods: {
    /** mescroll 初始化*/
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescroll.setBounce(true);
      // 产品列表高级计算 加载下拉刷新
    },
    /*下拉刷新DOM初始化*/
    mescrollDomInit() {
      mscll.init(
        vm,
        { use: false },
        {
          // auto:false,
          callback: vm.superListFn,
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: "50" //每页数据条数,默认10
          }
        }
      );
    },
    /*首页列表数据*/
    superListFn(page, mescroll) {
      this.$http.getHttp(
        {
          name: "Product_dataList",
          params: {
            //产品code
            code: this.superCode,
            //当前页数
            pageNum: page.num,
            //当前条数
            pageSize: page.size,
            pageType: "1"
          }
        },
        data => {
          console.log(data.data);
          //当前产品列表数据
          let superList = _.find(data.data, { code: vm.superCode }).productList;
          //产品列表数据
          if (_.isEmpty(vm.superAllNav)) vm.superAllNav = data.data;
          if (page.num == 1) {
            if (!vm.loaded) vm.loaded = true;
            //当前产品数据
            vm.superListData = superList;
            // 相关dom高度计算
            vm.showDomHeight(data.data.length);
          } else {
            //上拉数据拼接
            vm.superListData = vm.superListData.concat(superList);
          }
          vm.$nextTick(() => {
            mescroll.endSuccess(superList.length); //产品
          });
        }
      );
    },
    /*检查所有产品，code与点击的导航匹配时显示，否则隐藏 */
    bannerListAjax() {
      this.$http.getHttp(
        {
          name: "Product_banner",
          params: { type: "marketInsurance" }
        },
        data => {
          console.log(data);
          vm.bannerList = data.data;
        }
      );
    },
    /*相关dom高度计算*/
    showDomHeight(len) {
      vm.$nextTick(() => {
        if (vm.arrowHide) return;
        // nav 高度计算显示 下滑指示符
        let navTapHeight = vm.$refs.navLi[0].clientHeight;
        let navBoxHeight = vm.$refs.navUl.clientHeight;
        if (navTapHeight * len > navBoxHeight) {
          vm.arrowHide = true;
        }
      });
    },
    /** 产品导航点击切换*/
    superNavTap(code) {
      console.log(code);
      if (this.superCode == code) return;
      this.superCode = code;
      vm.superListData = [];
      this.mescroll.resetUpScroll(); // 刷新列表数据
      sessionStorage.superCode = this.superCode;
    }
  },
  mounted() {
    // 产品banner
    this.bannerListAjax();
  }
};
</script>
<style lang="scss">
@import "~@/sass/pages/super";
</style>