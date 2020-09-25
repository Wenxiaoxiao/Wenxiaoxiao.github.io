<template>
  <div>
    <!--底部导航栏-->
    <ul class="order-ul">
      <li v-for="(item,index) in orders">
        <div @click="actionDetail(item)">
          <div class="head">
            <p class="title">{{item.insuranceProductName}}</p>
          </div>
          <div class="center">
            <p class="txt">保单号：{{item.policyNo | subString(20)}}</p>
            <p
              v-if="item.insuranceRelationship==1"
              class="txt"
            >被保险人：{{item.policyholderName | subString(10)}}</p>
            <p v-else class="txt">被保险人：{{item.insurederName | subString(10)}}</p>
            <p class="txt">
              保障期限：{{item.guaranteeStartTime | timeNum(10)}}至
              <template
                v-if="item.guarateeType == 1"
              >终身</template>
              <template v-else>{{item.guaranteeEndTime | timeNum(10)}}</template>
            </p>
            <img
              v-if="item.logo && item.logo.length >0"
              :src="item.logo[0].url"
              alt
              class="img-compangs"
            />
          </div>
        </div>
        <div class="order-other-btn clearfix" :class="item.isSort == 0?'':'order-w-3'">
          <button
            v-if="item.isSort == 0 && (!hidesort || hidesort!='true') && item.policyNo!=0 && !iconIsHide"
            :disabled="iconIsHide"
            class="order-item-btn"
            @click="$emit('showMember',true,item)"
          >成员分类</button>
          <button
            class="order-item-btn"
            :class="btnIsDisabled01(item)?'btn-disable':''"
            :disabled="btnIsDisabled01(item)"
            @click="checkPolicyE(item)"
          >电子保单</button>

          <!-- 申请理赔 -->
          <button
            class="order-item-btn"
            :class="btnIsDisabled(item)?'btn-disable':''"
            :disabled="btnIsDisabled(item)"
            @click="$router.push('/personal/onlineClaims/'+item.policyNo)"
          >在线理赔</button>
          <button
            :disabled="btnIsDisabled(item)|| item.hasComment == 1 || isCommentTime(item.createTime)"
            :class="btnIsDisabled(item)|| item.hasComment == 1 || isCommentTime(item.createTime)?'btn-disable':''"
            @click="commentPro(item)"
            class="order-item-btn"
          >评价商品</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "static/js/moment.min.js";
var vm;
export default {
  props: ["orders", "iconIsHide", "hidesort"],
  data() {
    return {
      policyDate: null,
      orderState: "1"
    };
  },
  created() {
    vm = this;
  },
  computed: {},
  methods: {
    //产品评价的点击事件
    commentPro(item) {
      var policyNo = item.policyNo;
      var productId = item.insuranceProductId;
      var productName = item.insuranceProductName;
      location.href =
        "./market/sendComment.html?policyNo=" +
        policyNo +
        "&productId=" +
        productId +
        "&productName=" +
        productName;
    },
    actionDetail(item) {
      if (item.policyNo == 0) return this.$popup.msg("保单正在生成中！");
      this.$router.push(
        `/personal/policyDetail/${item.pid}/true` +
          (this.iconIsHide ? "/true" : "")
      );
    },
    //点击获取电子保单
    checkPolicyE(item) {
      this.$http.getHttp(
        {
          name: "P_verifyBdurlExist",
          params: { policyNo: item.policyNo }
        },
        (data, isError) => {
          if (!isError) return;
          var WTS_TOKEN_A = vm.$config.token;
          var url = window.location.origin +
            "/tools/bdurl/api/downloadPolicy?policyNo=" +
            item.policyNo +
            "&WTS_TOKEN_A=" +
            WTS_TOKEN_A;
            if(vm.$tools.isWtsNativeApp()){
              nativeApp.general.deviceready(function(){
                nativeApp.general.readPdf({url:url,title:item.insuranceProductName});
              })
            return;
          }
          location.href =url; 
        }
      );
    },
    /**是否禁用按钮 */
    btnIsDisabled01(item) {
      if (vm.iconIsHide) return true; //是否禁用按钮 true 是 false否
      if (item.policyNo == 0 || !item.policyNo || item.policyNo.length < 5)
        return true;
      if (item.status != "1") return true; //不是保障中的
      return false;
    },

    /**是否禁用按钮 */
    btnIsDisabled(item) {
      if (vm.iconIsHide) return true; //是否禁用按钮 true 是 false否
      if (item.policyNo == 0 || !item.policyNo || item.policyNo.length < 5)
        return true;
      if (item.status != "1" || item.isPlat!=1) return true; //不是保障中的
      return false;
    },
    // 评价时间计算
    isCommentTime(createTime) {
      var _thisTime = moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD");
      var policyTime = moment(createTime).format("YYYY-MM-DD");
      return _thisTime > policyTime;
    }
  }
};
</script>

<style lang="scss">
.order-ul {
  width: 100%;

  li {
    position: relative;
    width: 100%;
    font-size: r(32);
    background-color: #fff;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    .order-other-btn {
      width: 100%;
      padding: r(15) 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      display: flex;
      flex-direction: row;
      .order-item-btn {
        // float: left;
        flex-grow: 1;
        display: inline-block;
        width: 22%;
        border: 1px solid $baseColor;
        font-size: r(28);
        padding: r(10) 3px;
        color: $baseColor;
        letter-spacing: r(1);
        border-radius: r(8);
        margin: 0 5px;

        &.btn-disable {
          color: #888;
          border-color: #888;
        }
      }
    }

    .order-w-3 {
      .order-item-btn {
        width: 30%;
      }
    }
  }

  .head {
    height: r(80);
    line-height: r(80);
    color: #000;
    padding: 0 10px;

    .title {
      display: inline-block;
      width: 100%;
      height: 100%;
      @include textOver(1);
      line-height: r(80);
      font-size: r(34);
      font-weight: 900;
      p {
        color: #000;
      }
    }

    .status {
      line-height: r(60);
      font-size: r(32);
      float: right;
      color: $personal-col;
    }
  }

  .center {
    position: relative;
    border-top: 1px dashed #f3f3f3;
    border-bottom: 1px dashed #f3f3f3;
    padding: 10px;
    color: #000;

    .txt {
      line-height: r(50);
      font-size: r(32);
      position: relative;
      z-index: 2;
    }

    .img-compangs {
      position: absolute;
      right: 5px;
      top: r(50);
      height: r(80);
      max-width: 50%;
      z-index: 1;
      opacity: 0.8;
    }
  }

  .bottom {
    height: r(100);
    line-height: r(60);
    color: #000;
    padding: r(20) 10px;

    .price {
      color: $personal-col;

      i {
        font-weight: 800;
      }
    }
  }

  .btn {
    position: absolute;
    right: 10px;
    bottom: r(20);
    height: r(60);
    line-height: r(60);
    padding: 0 10px;
    background-color: $personal-col;
  }
}
</style>