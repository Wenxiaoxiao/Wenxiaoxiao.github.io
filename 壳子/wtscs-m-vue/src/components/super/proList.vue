<template>
    <div class="proList">
       <a v-for="(value,i) in superListData" :key="i" class="nav-groups-lis" :id="value.id" :href="getUrl(value)">
            <div class="groups-right">
                <p class="article-tit lz-line1">{{value.insuranceTitle}}</p>
                <p class="article-txt" v-if="value.designIdea != 'null'">{{value.designIdea | cutString(150)}}</p>
                <p class="article-txt2">
                    <span class="prices">{{value.productPrice}}</span> 元起
                </p>
                <div class="article-btn">查看详情</div>
            </div>
        </a>
    </div>
</template>

<script>
import common from '@/api/common.js'  //全局变量
export default {
  props: ["superListData",'type'],
  data() {
    return {
      mainList: [],
    };
  },
  created() {

  },
  computed: {},
  methods: {
   getUrl(item){
       let id=item.id;
       let url="";
       if(item.source=="policyBase"){
           url='/m/product/'+item.code
       }else{
            url=common.api_root+'/m/market/pros-detail.html?id='+id
       }
       return url;
   }
  },
 
  mounted() {

  },
  watch: {
    superListData(newVal) {
      this.mainList = newVal;
    },
  }
};
</script>

<style lang="scss">
    .nav-groups-lis {
            width: 100%;
            padding: r(30) r(20) r(28) r(30);
            background-color: #fff;
            position: relative;
            display: block;
            margin-bottom: r(18);
            &:last-child{
                margin-bottom: 0;
            }
            overflow: hidden;
            .groups-right {
                width: 100%;
                position: relative;
                padding-bottom: r(60);
                .article-tit {
                    font-size: r(34);
                    color: #000;
                    line-height: 1.2;
                    margin-bottom: r(15);
                }
                .article-txt {
                    line-height: r(40);
                    font-size: r(26) !important;
                    color: #444;
                }
                .article-txt1 {
                    line-height: r(34);
                    font-size: r(26) !important;
                    color: #666;
                }
                .article-txt2 {
                    position: absolute;
                    left: 0;
                    bottom: r(-10);
                    line-height: r(50);
                    color: #ff6f07;
                    font-size: r(26) !important;
                    .prices {
                        font-size: r(40);
                    }
                }
                .article-btn {
                     position: absolute;
                    right: 0;
                    bottom: 0;
                    width: r(140);
                    height: r(40);
                    border-radius: 5px;
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    -ms-border-radius: 5px;
                    -o-border-radius: 5px;
                    border: 1px solid $baseColor;
                    overflow: hidden;
                    color: $baseColor;
                    text-align: center;
                    line-height: r(40);
                    font-size: r(26);
                    &:after {
                        content: "";
                        display: block;
                        width: 100%;
                        height: 1px;
                        background-color: $baseColor;
                        position: absolute;
                        bottom: -1px;
                        left: 0;
                    }
                }
            }
        }
</style>