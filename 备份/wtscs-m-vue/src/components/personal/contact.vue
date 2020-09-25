<template>
<div>
    <!-- <div class="claimsLineBtn-blank"></div> -->
    <ul class="claimsLineBtn">
        <li><a href="tel://400-9955-788"><i class="iconfont icon-dianhua"></i><span>电话咨询</span></a></li>
        <li><a href="./exercise/kefu.html"><i class="iconfont icon-duanxin-"></i><span>在线客服</span></a></li> 
    </ul>
</div>
</template>

<script>
export default {
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
 .claimsLineBtn-blank {
    width: r(750);
    @include remCalc(height, 100);
  }
  .claimsLineBtn {
    width: r(750);
    height: r(90);
    position: fixed;
    z-index: 12;
    bottom: 0;
    li {
      float: left;
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      font-size: r(32);
      color: #fff;
      line-height: r(90);
      text-align: center;
      i {
        font-size: r(44);
        vertical-align: middle;
        margin-right: 5px;
        position: relative;
        top: -3px;
      }
      .icon-duanxin-{
        top: 0;
      }
      a {
        color: #fff;
        font-size: r(32);
      }
      &:first-child {
        background-color: $baseColor;
      }
      &:last-child {
        background-color: $personal-col;
      }
    }
  }

</style>