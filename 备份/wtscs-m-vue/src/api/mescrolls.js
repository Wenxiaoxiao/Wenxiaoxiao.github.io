import _ from "lodash";
import {tools} from '@static/js/wtsTools.esm.min.js' //工具


const mescrollFn = (function (){
    return {
        /** 组件初始化*/
        init(vm,down,up){
            this.vm = vm;
            vm.mescrollDown = this.mescrollDown(down)
            vm.mescrollUp = this.mescrollUp(up);
            // vm.$nextTick(() => {
            //     this.mescrollHeight()
            // })  
        },
        /*下拉刷新的配置*/
        mescrollDown(down){
            if(tools.ios || tools.iPhone){
                down.isBounce=false;
            }
            return _.assign({
                use:false,
                auto: false,
                isBoth: false,
                offset: 80, //下拉长度
                minAngle: 45,
                mustToTop: true,
                outOffsetRate: 0.2,
                hardwareClass: "mescroll-hardware",
                warpClass: "mescroll-downwarp",
                htmlContent: '<p class="downwarp-progress"></p> <p class="downwarp-tip">下拉刷新</p>' //下拉出现dom
            },down)
        },
        /*上拉加载的配置*/
        mescrollUp(up){
            if(tools.ios || tools.iPhone){
                up.isBounce=false;
            }
            return _.assign({ 
                auto: true,
                callback: null,
                // 以下是一些常用的配置,当然不写也可以的.
                page: {
                    num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                    size:"20" //每页数据条数,默认10
                },
                htmlNodata: '<p class="upwarp-nodata" style="font-size:16px">-- 暂无更多数据 --</p>',
                noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
                hardwareClass:"mescroll-hardware",//硬件加速
                lazyLoad: {
                    use: true // 是否开启懒加载,默认false
                  }
            },up)
        },
        mescrollHeight(){
            this.vm.$refs.mescroll.$el.style.height = (document.body.offsetHeight-this.vm.$refs.mescroll.$el.offsetTop-55)+"px"
        }
    }
})()
export default mescrollFn