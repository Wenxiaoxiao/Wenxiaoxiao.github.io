<template>
<div>
    <!--底部导航栏-->
    <ul class="order-ul">
        <li v-for="(item,index) in orders">
        <div>
            <div class="head">
            <p class="title">{{item.policyName}}</p>
            </div>
            <div class="center">
            <p class="txt" style="color:#ff7204;">应交保费：{{item.policyFee}}元</p>
            <p class="txt">交费日期：{{item.payTime | timeString(10)}} </p>
            </div>
        </div>
        </li>
    </ul>
</div>
</template>

<script>
var vm;
export default {
  props: ["orders"],
  data() {
    return {
    };
  },
  created() {
      vm = this;
  },
  computed: {},
  methods: {
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
      background-color: #FFF;
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

        .order-item-btn {
          // float: left;
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
        opacity: .8;
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