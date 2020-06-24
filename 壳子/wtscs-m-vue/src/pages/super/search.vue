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
            <div class="search-hot">
                <h4 class="search-hot-title">热门搜索</h4>
                <div class="search-hot-text">
                    <span v-for="(value,s) in hotData" class="seachText" @click="tapTextFn(value)">{{value}}</span>
                </div>
            </div>
            <div class="search-history">
                <h4 class="search-history-title">搜索记录</h4>
                <div class="search-history-text">
                     <span v-if="historyLocal.length>0" v-for="(value,s) in historyLocal" @click="tapTextFn(value)" class="seachText"><i class="iconfont icon-shijian"></i>{{value}}</span>
                     <div v-if="historyLocal.length==0" class="historyNone">暂无记录</div>
                </div>
                
                <div v-show="historyLocal.length>0" @click="addHistoryFn('',true)" class="search-history-record">
                    <i class="iconfont icon-lajitong"></i> 清除搜索记录
                </div>
            </div>
        </div>
        <mescroll-vue ref="mescroll" v-show="!resultHide" :up="mescrollUp" :down="mescrollDown" @init="mescrollInit">
            <div class="search-result" v-show="!resultHide">
                <div class="search-nav-type">
                    <div class="search-nav-fixed">
                        <div v-for="list in taps" :class="['fl search-type',{active:searchType == list.type}]" @click="navTapEvt(list.type)">{{list.name}}</div>
                    </div>
                </div>
                <div class="search-tip">
                    共搜到<span class="search-num">{{searchNum}}</span>条与 &nbsp;"<span class="search-text">{{searchName}}</span>"&nbsp; 相关的信息
                </div>

                <div class="search-result-list">
                    <div class="index-nav-groups" v-show="searchType == '1'">
                        <search-pro :superListData="superListData"></search-pro>
                    </div>
                    <div v-show="searchType == '2'">
                        <search-article :articleData="articleData"></search-article>
                    </div>
                    <div v-show="searchType == '3'">
                        <search-main :mainData="mainList"></search-main>
                    </div>
                </div>
            </div>
        </mescroll-vue>
  </div>
</template>
<script>
import loading from "@/components/commons/loading";
import articleList from "@/components/article/articleList";
import proList from "@/components/super/proList";
import list from "@/components/community/list";
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
      taps:[
          {key:"pro",type:'1',name:'产品'},
          {key:"article",type:'2',name:'文章'},
          {key:"main",type:'3',name:'问答'}
      ],
      //结果盒子是否隐藏
      resultHide:true,
      //热门搜索
      hotData:[],
      //历史记录
      historyLocal:[],
      //搜索类型
      searchType:'1',
      //搜索内容
      searchName:"",
      //搜索总条数
      searchNum:0,
      //搜索产品结果
      superListData:[],
      //文章搜索结果
      articleData:[],
      //问答搜索结果
      mainList:[]
    }
  },
  components: {
    //产品组件
    "search-pro":proList,  
    //文章组件
    "search-article":articleList,
    //问答组件
    "search-main":list,
    "app-loading": loading,
    "mescroll-vue": MescrollVue
  },
  created() {
    vm = this;
    // 下拉刷新初始化
    mscll.init(vm,{use:false},{
      auto:false,
      callback:vm.getSearchResult
    })
  },
  methods: {
    /** mescroll 初始化*/
    mescrollInit(mescroll) {
       this.mescroll = mescroll;
       vm.$refs.mescroll.$el.style.height = (document.body.offsetHeight-this.$refs.searchInput.clientHeight)+"px"
       this.mescroll.setBounce(true)
    },
    /**请求搜索结果*/
    getSearchResult(page,mescroll){
        this.$http.getHttp({ 
         name: "Product_search",
         params: {
            type:this.searchType,
            query:this.searchName,
            pageSize:page.num+"",
            pageNum:page.size+"",
            company:""
        }}, data => {
             console.log(data)
            if(page.num == 1){
                //分别判断当前搜索类型对应赋值
                if(vm.searchType == "1")vm.superListData = data.data.procucts;//产品
                if(vm.searchType == "2")vm.articleData = data.data.articles;//文章
                if(vm.searchType == "3")vm.mainList = data.data.posts; //问答
                vm.searchNum = data.data.total;
            }else{
              //下拉树数据拼接
                if(vm.searchType == "1")vm.superListData =  vm.superListData.concat(data.data.procucts);//产品
                if(vm.searchType == "2")vm.articleData = vm.articleData.concat(data.data.articles);//文章
                if(vm.searchType == "3")vm.mainList = vm.mainList.concat(data.data.posts);//问答
            }
            vm.$nextTick(() => {
              if(vm.searchType == "1")mescroll.endSuccess(data.data.procucts.length);//产品
              if(vm.searchType == "2")mescroll.endSuccess(data.data.articles.length);//文章
              if(vm.searchType == "3")mescroll.endSuccess(data.data.posts.length);//问答
            });
        },error => {
            mescroll.endErr();
        });
    },
     //热门搜索数据请求
    hotAjax(page, mescroll){
      this.$http.getHttp({ name: "Product_hot", params: {} 
      }, data => {
        vm.loaded = true;
        console.log(data)
        vm.hotData = data.data
      },error => {
      });
    },
     /*搜索框监听*/
    searchInput: _.debounce((event)=>{
        if(vm.searchName == "") return vm.resultHide = true
        // 显示结果开关
        vm.resultHide = false;
        //存储到历史记录
        vm.addHistoryFn(vm.searchName);
        vm.mescroll.resetUpScroll(); // 刷新列表数据
    },1000),
    /**切换搜索类型*/
    navTapEvt(type){
        this.searchType = type; 
        this.mescroll.setScrollTop(0)
        this.mescroll.resetUpScroll(); // 刷新列表数据
    },
    //点击搜索
    tapTextFn:_.throttle((name)=>{
        vm.searchName = name;
        setTimeout(()=>{
            vm.resultHide = false;
            //添加历史记录数据
            vm.addHistoryFn(name);
            vm.mescroll.resetUpScroll(); // 刷新列表数据
         },500)  
    },500),
    //历史记录逻辑处理
    addHistoryFn(name,isRemove){
        if(isRemove){
            // 为true时清除历史记录
            vm.historyLocal = [];
            localStorage.removeItem("historyLocal");
            return
        }
        //获取本地存储的历史记录
        if(vm.historyLocal.length == 0) vm.historyLocal = JSON.parse(localStorage.getItem("historyLocal")) || [];
        //匹配是否存在当前记录
        if(!name || _.indexOf(vm.historyLocal,name) > -1)return;
        if(Object.prototype.toString.call(vm.historyLocal) == "[object Array]"){
            vm.historyLocal.unshift(name)
        }else {
            vm.historyLocal = vm.historyLocal.split(",");
            vm.historyLocal.unshift(name)
        }
        //长达大于10时 只取最新10条
        if(vm.historyLocal.length>10)vm.historyLocal = _.slice(vm.historyLocal,0,10);
        console.log(vm.historyLocal)
        //存储历史记录
        localStorage.setItem("historyLocal",JSON.stringify(vm.historyLocal))
    },
    //关掉搜索页面
    resultInit(){
        vm.resultHide = true;
         //搜索产品结果
        vm.superListData = [],
        //文章搜索结果
        vm.articleData = [],
        //问答搜索结果
        vm.mainList = []
        vm.searchName = "";
    }
  },
  mounted() {
    this.hotAjax();
    vm.addHistoryFn()
  }
};
</script>
<style lang="scss" scoped>
@import "~@/sass/pages/search";
</style>