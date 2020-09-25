<template>
    <div id="loading3" v-show="show">
         <div class="demo3"></div>
         <div class="demo3"></div>
         <div class="demo3"></div>
         <div class="demo3"></div>
         <div class="demo3"></div>
         <div class="demo3"></div>
         <div class="demo3"></div>
         <div class="demo3"></div>
    </div>
</template>

<script>
export default {
    props: ["show"],
    data() {
        return {};
    },
    computed: {},
    methods: {
    },
    watch: {
    isTextLogin(newVal) {
      console.log(newVal);
      this.show = newVal;
    }
  }
};
</script>

<style lang="scss">
 /*底部导航栏*/
 #loading3 {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 0 auto;
}
.demo3 {
    width: 3px;
    height: 3px;
    border-radius: 1.5px;
    background: $baseColor;
    position: absolute;
    animation: demo3 linear 0.8s infinite;
    -webkit-animation: demo3 linear 0.8s infinite;
}
.demo3:nth-child(1){
    left: 12px;
    top: 1px;
    animation-delay:0s;
}
.demo3:nth-child(2){
    left: 20px;
    top: 4px;
    animation-delay:0.1s;
}
.demo3:nth-child(3){
    left: 23.5px;
    top: 12px;
    animation-delay:0.1s;
}
.demo3:nth-child(4){
    left: 20px;
    top: 20px;
    animation-delay:0.2s;
}
.demo3:nth-child(5){
    left: 12px;
    top: 23.5px;
    animation-delay:0.4s;
}
.demo3:nth-child(6){
    left: 4px;
    top: 20px;
    animation-delay:0.5s;
}
.demo3:nth-child(7){
    left: 1px;
    top: 12px;
    animation-delay:0.6s;
}
.demo3:nth-child(8){
    left: 4px;
    top: 4px;
    animation-delay:0.7s;
}

@keyframes demo3{
    0%,40%,100% {transform: scale(1);}
    20% {transform: scale(2);}
}
@-webkit-keyframes demo3{
    0%,40%,100% {transform: scale(1);}
    20% {transform: scale(2);}
}
</style>