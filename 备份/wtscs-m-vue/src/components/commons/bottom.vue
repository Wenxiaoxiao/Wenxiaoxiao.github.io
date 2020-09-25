<template>
<!--页面加载动画-->
<div>
    <div class="lz-bottom-call margin-top-15 clearfix">
        <div class="call-pic fl">
            <img src="static/images/icon-call.png" alt="">
        </div>
        <div class="call-text fl">
            <p class="title">梧桐树保险网客服</p>
            <p class="phone">客服电话： <a href='tel://400-9955-788'>400-9955-788</a></p>
        </div>
        <a href="./exercise/kefu.html" class="button fr clickQidian">点击咨询</a>
    </div>
</div>
</template>

<script>
export default {
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
.lz-bottom-call {
    background-color: #fff;
    padding: r(20);
    z-index: 100;
    .call-pic {
        width: r(110);
        >img {
            display: block;
            height: r(90);
        }
    }
    .call-text {
        width: r(395);
        text-align: left;
        .title {
            font-size: r(32);
            color: #000;
        }
        .phone {
            font-size: r(28);
            color: #333;
            a {
                color: $baseColor
            }
        }
    }
    >.button {
        margin-top: r(20);
        display: block;
        width: r(161);
        height: r(50);
        border: 1px solid  $baseColor;
        border-radius: 4px;
        color: $baseColor;
        text-align: center;
        line-height: r(50);
        font-size: r(30);
        box-sizing:content-box;
    }
}
</style>