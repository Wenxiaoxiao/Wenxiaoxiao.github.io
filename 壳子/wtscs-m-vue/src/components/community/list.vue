<template>
<ul class="mainContent">
      <li class="mainList"
      v-for="(value,i) in mainList">
       <dl>
         <div class="problemTip">
            <span class="problemTip-lib dianzan-box" @click="upGive(value.id,i,value.hasPostUp)">
              <span class="problemname">点赞 <span class="dz-num">{{value.ups?value.ups:0}}</span></span>
              <span class="dianzan" :class="value.hasPostUp?'active':''"></span>
            </span>
            <a :href="getUrl(value.id)" class="problemTip-lib">
              <span class="problemname">评论 {{value.commentNum}}</span>
              <i class="iconfont icon-pinglun"></i>
            </a>
          </div>
        <dt>
          <a :href="getUrl(value.id)">
            <div class="textBox">
              <img v-if="value.userId==0" src="static/images/miniLogo.jpg" alt="" class="img-auther"/>
              <img v-else-if="value.headimgurl=='' || value.headimgurl=='/0'" src="static/images/default_auther.png" alt="" class="img-auther"/>
              <img v-else :src="value.headimgurl" alt="" class="img-auther"/>
              <div class="top_box">
                <span class="name" v-html="$options.filters.emoji(value.nickname)"></span>
                <img v-show="value.userId==0" src="static/images/manage.png" class="level">
              </div>
              <div class="time">{{value.createTime | trustTime}}</div>
              
            </div>
          </a>
        </dt>
        <dd class="problemBox">
          <div class="problem">
            <a :href="getUrl(value.id)">
              <p v-if="value.userId == 0" class="text text3 emojiCheck">{{value.intro | fmtContent_T}}<span class="click-more">点击阅读全文&gt;</span></p>
              <p v-else class="text text2" v-html="$options.filters.fmtContent(value.content)">{{value.content}}</p>
            </a>
            <div class="stop">{{value.admin}}</div>
            <div v-if="value.imgUrls && imgIsArr(value.imgUrls)==1" class="imgBox clearfix">
                <span class="img-box-1"><img class="lazy" data-loaded="false" v-lazy="value.imgUrls" alt=""></span>
            </div>
            <div v-else-if="value.imgUrls && imgIsArr(value.imgUrls)==2" class="imgBox clearfix">
                <span class="img-box-2"><img class="lazy" data-loaded="false" v-lazy="arrReturnImg(value.imgUrls,1)" alt=""></span>
                <span class="img-box-2"><img class="lazy" data-loaded="false" v-lazy="arrReturnImg(value.imgUrls,2)" alt=""></span>
            </div>
          </div>

        </dd>
        <a :href="getUrl(value.id)" v-show="value.replys && value.replys.length!=0">
          <dd class="answer">
            <ul class="answerList" id="answerList">
              <li v-for="(values) in value.replys">
                          <span v-html="$options.filters.emoji(values.nickname)"></span>
                          <div class="answerText emojiCheck">{{values.content | subString(150)}}</div>
                      </li>
              <span v-show="value.commentNum>2" class="more-a">查看更多回复 &gt;</span>
            </ul>
          </dd>
        </a>
		</dl>
      </li>
    </ul>
</template>

<script>
import common from '@/api/common.js'  //全局变量
export default {
  props: ["mainData",'type'],
  data() {
    return {
      mainList: [],
    };
  },
  computed: {},
  methods: {
    //判断图片数量
    imgIsArr(content) {
      if (!content) return 0; 
      if(typeof content == "string"){
        if (content.indexOf(",") < 0) {
          return 1;
        } else {
          return 2;
        }
      }else if(Object.prototype.toString.call(content) == "[object Array]"){
        return 2
      }
    },
    //根据图片数量返回图片
    arrReturnImg(content, i) {
      if(typeof content == "string"){
        var arr = content.split(",");
      }else if(Object.prototype.toString.call(content) == "[object Array]"){
        var arr = content
      }
      if (i == 1) {
        return arr[0];
      } else {
        return arr[1];
      }
    },
    upGive(id, i, hasPostUp) {
      //点赞事件
      console.log(111);
      if (hasPostUp) return;
      this.mainList[i].ups++;
      this.mainList[i].hasPostUp = true;
      this.$http.getHttp(
        {
          name: "C_postUp",
          header: 2,
          params: [
            {
              name: "postId",
              val: id
            }
          ]
        },
        (r, er) => {
          console.log(r);
          let goodsdata = localStorage.getItem("goodsdata");
          if (!goodsdata || goodsdata.indexOf(id) < 0) {
            goodsdata = goodsdata ? goodsdata : "";
            goodsdata += id + ",";
          }
          localStorage.setItem("goodsdata", goodsdata);
        }
      );
    },
    initPostUp(data) {
      //初始化点赞事件
      let goodsdata = localStorage.getItem("goodsdata");
      if (!goodsdata) return;
      for (var k=0;k<data.length;k++) {
        if (goodsdata.indexOf(data[k].id) > -1) {
          data[k].hasPostUp = true;
        }
      }
    },
    getUrl(id){
        var base=common.env==1?"https://www.wts999.com/question/":"https://www.wts9999.net/question/";
        return base+id+".html"
    }
  },
  watch: {
    mainData(newVal) {
      this.initPostUp(newVal);
      this.mainList = newVal;
    },
  }
};
</script>

<style lang="scss">
.mainContent {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  .postID {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
  }
  .problemTip {
    display: block;
    height: r(50);
    line-height: r(50);
    position: absolute;
    top: r(10);
    right: 0;
    text-align: right;
    z-index: 9;
    .problemTip-lib {
      display: inline-block;
      @include remCalc(height, 50);
      color: #9d9d9d;
      font-size: r(26);
      padding-right: r(15);
      text-align: left;

      i {
        font-size: r(32);
        float: right;
      }

      .problemname {
        float: right;
        right: r(16);
        margin-left: r(10);
        top: r(-2);
        display: inline-block;
        height: r(50);
      }

      .dianzan {
        float: right;
        display: inline-block;
        @include remCalc(width, 40);
        @include remCalc(height, 50);
        background: url("~@/dianzan.png") no-repeat;
        background-size: contain;
        position: relative;
        top: 2px;
      }

      .hasdianzan {
        float: right;
        display: inline-block;
        @include remCalc(width, 40);
        @include remCalc(height, 50);
        background: url("~@/dianzan-02.png") no-repeat;
        background-size: contain;
        position: relative;
        top: 2px;
      }

      .dianzan.active {
        background: url("~@/dianzan-02.png") no-repeat;
        background-size: contain;
        animation: dianzanActive 0.5s ease forwards;
      }

      @keyframes dianzanActive {
        0% {
          transform: scale(1);
        }

        50% {
          transform: scale(1.5);
        }

        100% {
          transform: scale(1);
        }
      }
    }
  }
  .mainList {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: r(15);
    position: relative;
    background: #fff;

    > dl {
      width: 100%;
      height: auto;
      overflow: hidden;

      > dt {
        width: 100%;
        height: r(120);
        padding: 0 r(30);
        box-sizing: border-box;
        position: relative;
        padding-top: r(20);

        .img-auther {
          width: r(70);
          height: r(70);
          position: absolute;
          left: 0;
          top: 0;
          border-radius: r(35);
        }

        .textBox {
          position: relative;
          width: 100%;
          height: r(70);
          padding-left: r(85);

          .top_box {
            width: 50%;
            padding: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .name {
            height: r(40);
            font-size: r(30);
            color: #000;
            position: relative;
            //top: -2px;
          }

          .level {
            @include remCalc(width, 100);
            display: inline-block;
          }

          .time {
            width: 100%;
            height: r(34);
            line-height: r(36);
            font-size: r(28);
            color: #949494;
          }
        }
      }

      .problemBox {
        width: 100%;
        height: auto;
        padding-right: r(30);
        padding-left: r(30);
        padding-bottom: r(10);

        .problem {
          font-size: r(28);
          line-height: r(38);

          .stop {
            color: $font-color-ff6e06;
          }

          .stop-after {
            position: relative;
          }

          .stop-after:after {
            content: "";
            position: absolute;
            top: 50%;
            left: r(80);
            margin-top: r(-14);
            width: r(18);
            height: r(18);
            transform: rotate(45deg);
            border-right: 1px solid $font-color-ff6e06;
            border-bottom: 1px solid $font-color-ff6e06;
          }

          .stop-active:after {
            margin-top: r(-5);
            transform: rotate(-135deg);
          }

          .textMore {
            display: block;
            text-align: right;
            color: $bg-color-ff6e06;
            @include remCalc(font-size, 28);
          }

          .imgBtn {
            display: inline-block;
            height: 174px;
            width: 248px;
            left: 0;
          }

          .text2 {
            height: auto;
            line-height: 25px;
            color: #000;
            overflow: hidden;
            font-size: r(32);
          }

          .text3 {
            height: auto;
            line-height: r(46);
            color: #000;
            font-size: r(32);
            word-break: break-all;
            word-wrap: break-word;

            .click-more {
              margin-left: r(20);
              color: $font-color-ff6e06;
            }
          }

          .more-color {
            color: #ff6e07;
          }

          .active {
            max-height: 75px;
          }

          .imgBox {
            margin-top: 5px;
            padding-bottom: r(10);

            .img-box-1 {
              float: left;
              max-width: r(450);
              height: r(300);
              overflow: hidden;
              text-align: center;

              img {
                height: 100%;
              }
            }

            .img-box-2 {
              float: left;
              max-width: r(230);
              height: r(180);
              overflow: hidden;
              margin-right: 5px;
              text-align: center;

              img {
                height: 100%;
              }
            }

            .imgOne {
              width: r(450);
              height: r(450);
              margin-right: r(8);
              display: block;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
              position: relative;
              overflow: hidden;
            }

            .imgTwo {
              display: inline-block;
              margin-right: r(10);
              width: r(250);
              height: r(200);
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
              position: relative;
              overflow: hidden;
            }

            .img-hidden {
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
            }
          }

          .videoBox {
            height: auto;
            width: 100%;
            overflow: hidden;

            .video-js {
              width: r(690);
              height: auto;
              max-height: r(388);
              max-width: r(690);

              .vjs-tech {
                width: r(690);
                height: r(388);
              }

              .vjs-big-play-button {
                width: r(102);
                height: r(102);
                text-align: center;
                line-height: r(102);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                margin-left: r(-51);
                margin-top: r(-51);
              }
            }

            .imgTwo {
              width: r(226);
              height: r(226);
              margin-right: r(8);
            }
          }
        }
      }
    }

    .answer {
      width: 100%;
      height: auto;
      overflow: hidden;
      box-sizing: border-box;
      padding: r(20) r(30);
      border-top: 1px solid #e6e6e6;

      .answerList {
        width: 100%;
        height: auto;
        position: relative;
        background: #f7f7f7;
        padding: 5px 0;

        .more-a {
          font-size: r(28);
          line-height: r(46);
          color: #4a7caf;
          padding: 0 5px;
        }

        li {
          width: 100%;
          height: auto;
          overflow: hidden;
          font-size: r(30);
          line-height: r(46);
          color: #4a7caf;
          padding: 0 5px;

          > span {
            float: left;
            margin-right: r(12);
          }

          .answerText {
            color: #000;
          }
        }
      }
    }
  }
}
</style>