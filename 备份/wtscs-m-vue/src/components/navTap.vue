<template>
 <div class="navTapBox clearfix">
    <ul class="nav-ul">
        <li class="nav-li" v-for="item in navTapData" >
            <router-link :to="item.path">
                <p class="nav-img">
                    <img :src="item.icon" alt="">
                </p>
                <p class="lz-col-fff">{{item.title}}</p>
            </router-link>
        </li>
        
    </ul>
</div>
</template>

<script>
export default {
  props: {
      navTapData:undefined
  },
  data () {
    return {
      // 保险分类数据
 
    }
  },
  methods:{
   
  },
  mounted:function(){

  },
  watch:{
    navTapData(newVal){
      console.log(newVal);
    }
  }
  
}
</script>

<style lang="scss">
 .navTapBox{
    background: linear-gradient(top , rgb(68, 118, 255) 29% , rgb(73, 163, 255) 74%);
    background: -o-linear-gradient(top , rgb(68, 118, 255) 29% , rgb(73, 163, 255) 74%);
    background: -ms-linear-gradient(top , rgb(68, 118, 255) 29% , rgb(73, 163, 255) 74%);
    background: -moz-linear-gradient(top , rgb(68, 118, 255) 29% , rgb(73, 163, 255) 74%);
    background: -webkit-linear-gradient(top , rgb(68, 118, 255) 29% , rgb(73, 163, 255) 74%);
     .nav-ul{
         text-align: center;
         font-size: r(28);
         .nav-li{
            float: left;
            position: relative;
            width: 33.3%;
            color: #5f5f5f;
            line-height: 2.3;
            padding-top: r(30);
            padding-bottom: r(10);
            .nav-img{
                width: r(90);
                height: r(90);
                margin: 0 auto;
                >img{
                    width: r(100);
                    vertical-align: middle;
                }
            }
            .column-line{
                position: absolute;
                background: #efeff4;
                width: 1px;
                height: r(130);
                right: 0;
                top: .4rem;
            }     
         }
     }
 }
    
</style>