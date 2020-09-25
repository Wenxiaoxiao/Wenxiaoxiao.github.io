<template>
<!--服务指南-->
<a href="https://bx.wts999.com/community/service.html" class="return_personal">
    <img src="static/images/flx_fwzn.png" alt="服务指南"/>
</a>
</template>

<script>
export default {
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
.return_personal {
  position: fixed;
  right: 15px;
  bottom: 15%;
  z-index: 999;
  img {
    @include remCalc(width, 100);
    @include remCalc(height, 100);
  }
}

</style>