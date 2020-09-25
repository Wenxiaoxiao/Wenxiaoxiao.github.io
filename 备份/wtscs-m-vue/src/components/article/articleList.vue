<template>
<ul class="ul-js">
    <li v-for="(value,i) in articleData" class="tab_list_1i ck_event" :class="value.articleType == '2' || value.articleType == '5'?'tab_list_1i1':''">
         <a :href="value.articleType == '5'?value.content:articleBaseUrl+value.id+'.html'">
             <template v-if="value.articleType && (value.articleType == '5' || value.articleType == '2')">
                <img data-loaded="false" v-if="value.imgUrl" v-lazy="value.imgUrl[0]" alt="" class="img-right lazy"> 
                <div class="type-text-l">
                    <p class="lis-title">{{value.articleTitle|subString(28)}}</p>
                    <div class="list-module clearfix" style="width:110%;">
                        <div class="fl span" v-if="value.tag" v-html="$options.filters.tagText(value.tag)"></div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="type-text-l">
                    <template v-if="value.articleType && value.articleType == '3'" >
                        <p class="lis-title">{{value.articleTitle|subString(28)}}</p>
                        <div class="img-center-box">
                            <img v-for="(img,n) in value.imgUrl" data-loaded="false" v-lazy="img" alt="" class="img-right lazy"> 
                        </div>
                    </template>
                    <template v-else>
                        <p class="lis-title">{{value.articleTitle|subString(28)}}</p>
                        <div class="img-center-box">
                            <img v-if="value.videoImg" data-loaded="false" v-lazy="value.videoImg" alt="" class="img-big lazy"> 
                            <img v-if="" :src="value.articleType=='1'?'static/images/start.png':'static/images/audio.png'" alt="" class="btn-start"> 
                            <span v-if="value.videoTime && value.videoTime!='null'" class="pay-time">{{value.videoTime}}</span>
                        </div>
                    </template>
                    <div class="list-module clearfix">
                        <div class="fl span" v-if="value.tag" v-html="$options.filters.tagText(value.tag)"></div>
                        <p class="fr" v-if="value.updateTime">{{value.updateTime|trustTime01}}</p>
                    </div>
                </div>
            </template>
        </a>
    </li>
</ul>
</template>

<script>
export default {
  props: {
      articleData:undefined
    },
  data() {
    return {
      articleBaseUrl:this.$config.env == "0"?'https://www.wts9999.net/article/':'https://www.wts999.com/article/'
    };
  },
  created() {},
  computed: {},
  methods: {
   
  },
 
  mounted() {

  },
  watch: {
    articleData(newVal) {},
  }
};
</script>

<style lang="scss">
    .ul-js{
      width: 100%;
      position: relative;
      display: block;
      background-color: #fff;
      .tab_list_1i{
        position: relative;
        word-wrap: break-word; 
        word-break: normal; 
        padding:r(30) r(20) 0;
        width: 100%;
        >a{
          width: 100%;
          border-bottom: 1px solid #ececec;
          height: 100%;
          display: block;
          padding-bottom: r(10);
        }
        .img-center-box{
          padding: r(10) 0 r(20);
          position: relative;
          display: flex;
          justify-content:space-between;
          display: -webkit-flex;
          -webkit-justify-content:space-between;
          .timg{
            width: 100%;
          }
          .btn-start{
            position: absolute;
            width: r(105);
            height: r(105);
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%)
          }
          .pay-time{
            position: absolute;
            right: r(15);
            bottom: r(35);
            text-align: center;
            padding: 0 r(30);
            height: r(40);
            line-height: r(40);
            background-color: rgba($color: #000, $alpha: .6);
            color: #fff;
            border-radius:r(20)
          }
        }
        .block{
          width: 100%;
          height: r(400);
          background-color: #000;
        }
        .img-right{
          @include remCalc(width,230);
          @include remCalc(height,153);
        }
        .img-big{
          @include remCalc(width,710);
          @include remCalc(height,400);
        }
        &.tab_list_1i1{
          height: r(196);
          >a{
            @include remCalc(padding-right,250);
          }
          .img-right{
            position: absolute;
            right: r(20);
            top:50%;
            transform:translateY(-50%);
          }
          .type-text-l{
            .lis-title{
              height: r(82);
              margin-bottom: r(18);
              word-break: break-all;
              line-clamp: 2;
              -webkit-line-clamp: 2;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              text-overflow: -o-ellipsis-lastline;
              -webkit-box-orient: vertical;
            }
          }
        }
       
        .type-text-l{
          height: 100%;
          position: relative;
          font-size: r(26);
          .lis-title{
            @include remCalc(font-size,34);
            color: #000;
            line-height: r(42);
            word-break: break-all;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .list-module {
            width: 100%;
            .span {
              text-align: center;
              float: left;
              @include remCalc(font-size,26);
              span{
                display: inline-block;
                @include remCalc(border-radius,5);
                padding: 0 r(10);
                height: r(40);
                line-height: r(40);
                color: $font-color-ff6e06;
                border: 1px solid $font-color-ff6e06;
                margin-right: r(10);
                box-sizing: content-box;
                &:last-child{
                  margin: 0;
                }
              }
            }
            p{
              color: #666;
              font-size:r(26);   
              .iconfont{
                vertical-align: middle;
                margin-right: r(8);
              }
            }
          }
        }
      }
      li.li-img{
        padding-right: 0;
        border-top: none;
        .top-img{
          width: 100%;
        }
      }
      
      .lis-text{
        @include remCalc(font-size,28);
        color: #666;
        line-height: r(36);
      }
      
      .sp{
        padding: 0 6px;
        @include remCalc(font-size,24);
        color: $bg-color-ff6e06;
        display: inline-block;
        border-radius:8px;
        border: 1px solid $bg-color-ff6e06;
        margin-right: 5px;
      }
      &.active{
        display: block;
      }
      .list-more{
        display: block;
        height: r(90);
        line-height: r(90);
        text-align: center;
        font-size: r(28);
        color: #676767;
        span{
          font:400 13px/13px simsun;
        }
      }
    }
</style>