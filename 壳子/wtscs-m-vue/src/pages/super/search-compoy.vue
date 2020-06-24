<template>
  <div class="search-container">
        <div class="searchBox" ref="searchInput">
            <div class="search-chunk clearfix">
                <i class="iconfont icon-fangdajing fl"></i>
                <input type="text" autocomplete="off" placeholder="请输入搜索内容" v-model:value="searchName" id="searchWords" @input="searchInput">
                <i class="iconfont icon-guanbi fr" v-show="!resultHide" @click="resultInit"></i>
            </div>
        </div>
        <div id="init-hide" v-show="resultHide">
            <div class="search-all-compoy">
                <h4 class="search-compoy-title">全部公司</h4>
                <div class="search-compoy-text">
                    <span v-for="(value,s) in companyData" class="seachText" @click="tapTextFn(value.shortName)">{{value.shortName}}</span>
                </div>
            </div>
        </div>
        <mescroll-vue ref="mescroll" v-show="!resultHide" :up="mescrollUp" :down="mescrollDown" @init="mescrollInit">
            <div class="search-result" v-show="!resultHide">
                <div class="search-tip">
                    共搜到<span class="search-num">{{searchNum}}</span>条与 &nbsp;"<span class="search-text">{{searchName}}</span>"&nbsp; 相关的信息
                </div>

                <div class="search-result-list">
                    <div class="index-nav-groups">
                        <search-pro :superListData="superListData"></search-pro>
                    </div>
                </div>
            </div>
        </mescroll-vue>
  </div>
</template>
<script>
import loading from "@/components/commons/loading";
import proList from "@/components/super/proList";
import _ from "lodash";
import mscll from '@/api/mescrolls.js'  //工具
import MescrollVue from "mescroll.js/mescroll.vue";
//当前实例组件
var vm = null;
export default {
   data() {
      return {
      //加载开关
      loaded: false,
      user: {
        headimgurl: "",
        nickname: "游客"
      },
      //结果盒子是否隐藏
      resultHide:true,
      //输入类型 true:input false:点击 
      inputType:true,
      //热门搜索
      companyData:[],
      //搜索类型
      searchType:'1',
      //搜索内容
      searchName:"",
      //搜索总条数
      searchNum:0,
      //搜索产品结果
      superListData:[]
    }
  },
  components: {
    //产品组件
    "search-pro":proList,  
    "app-loading": loading,
    "mescroll-vue": MescrollVue
  },
  created() {
    vm = this;
    // 下拉刷新DOM初始化
    this.mescrollDomInit()
  },
  methods: {
    /** mescroll 初始化*/
    mescrollInit(mescroll) {
       this.mescroll = mescroll;
       vm.$refs.mescroll.$el.style.height = (document.body.offsetHeight-this.$refs.searchInput.clientHeight)+"px"
       this.mescroll.setBounce(true)
    },
    /*下拉刷新DOM初始化*/
    mescrollDomInit(){
        mscll.init(vm,{use:false},{
            auto:false,
            callback:vm.getSearchResult
        })
    },
    /**请求搜索结果*/
    getSearchResult(page,mescroll){
        //当前搜索参数处理
        let datas = this.searchParams(page)
        this.$http.getHttp({ 
         name: "Product_search",
         params: datas}, data => {
             console.log(data)
            if(page.num == 1){
                vm.superListData = data.data.procucts;
                vm.searchNum = data.data.total;
            }else{
              //下拉树数据拼接
                vm.superListData = vm.superListData.concat(data.data.procucts);
            }
            vm.$nextTick(() => {
                mescroll.endSuccess(data.data.procucts.length);
            });
        },error => {
            mescroll.endErr();
        });
    },
    /*当前搜索参数处理*/
    searchParams(page){
        let datas = {type:this.searchType,pageSize:page.num+"", pageNum:page.size+"",query:"",company:""}
        if(this.inputType){
            //输入类型搜索
            datas.query = this.searchName;
        }else{
            //公司类型搜索
            datas.company = this.searchName;
        }
        return datas
    },
     /**保险公司*/
    companyAjax(page, mescroll){
      this.$http.getHttp({ name: "Product_company", params: {pageSize:'100'} 
      }, data => {
        vm.loaded = true;
        console.log(data)
        //保险公司数据赋值
        vm.companyData = data.data
      },error => {
      });
    },
     /*搜索框监听*/
    searchInput: _.debounce((event)=>{
        if(vm.searchName == "") return vm.resultHide = true
        //切换输入类型
         vm.inputType = true;
        // 显示结果开关
        vm.resultHide = false;
        vm.mescroll.resetUpScroll(); // 刷新列表数据
    },1000),
    //点击搜索
    tapTextFn:_.throttle((name)=>{
        vm.searchName = name;
        //切换点击类型
        vm.inputType = false;
        setTimeout(()=>{
            vm.resultHide = false;
            vm.mescroll.resetUpScroll(); // 刷新列表数据
         },500)  
    },500),
    //关掉搜索页面
    resultInit(){
        vm.resultHide = true;
         //搜索产品结果
        vm.superListData = [],
        vm.searchName = "";
    }
  },
  mounted() {
    this.companyAjax()
  }
};
</script>
<style lang="scss" scoped>
@import "~@/sass/pages/search";
</style>