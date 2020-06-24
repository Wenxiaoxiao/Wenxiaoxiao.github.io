<template>
  <!--页面加载动画-->
  <div class="on-settle-layer_mask" v-show="isEttle">
    <div class="on-settle-layer">
        <div class="mui-backdrop"></div>
        <div class="settle-box">
            <img :src="`${$config.api_root}/static/images/settle-top.png`" class="settle-top" alt="">
            <p class="p1">梧优理赔</p>
            <p class="p2"> 24小时理赔专线：400-9955-788 </p>
            <div class="settle-button">
                <div class="button-cancle fl" @click="isEttlement">取消</div>
                <a :href="`tel:${$config.phoneNumber}`" class="button-confirm fr" @click="isEttlement">一键拨打</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  props: ['isEttle'],
  computed: {},
  methods: {
      isEttlement(){
          this.$emit("isEttlement")
      }
  },
  watch: {

  }
};
</script>

<style lang="scss">
//顶部
.on-settle-layer_mask{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
}
.on-settle-layer {
  z-index: 999;
    .settle-box{
        z-index: 999;
        width: r(540);
        height: r(458);
        background-color: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-top: r(-228);
        margin-left: r(-270);
        border-radius: 5px;
        .settle-top{
            width: r(540);
            height: r(294);
            margin-top: r(-100);
        }
        p{
            color: #000;
            text-align: center;
            padding: r(5) 0;
        }
        .p1{
            font-size: r(38);
        }
        .p2{
            font-size: r(32);   
            padding-bottom: r(34);
        }
        .settle-button{
            border-top: 1px solid #ddd;
            >div,a{
                width: 50%;
                height: r(100);
                text-align: center;
                line-height: r(100);
                font-size: r(34);
                color: #999;
                display: block;
            }
            .button-confirm{
                color: #4580f6;
                border-left: 1px solid #ddd;
            }
        }
    }
}
</style>