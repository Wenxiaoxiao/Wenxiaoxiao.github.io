<template>
	<view>
		<template v-if="model.type==2">
			<view class="questionItem">
				<text class="subTitle">{{model.content}}</text>
				<view class="btns fc">
					<template v-for="(btnData, n) in model.children">
						<text class="btn" :class="n==activeIndex?'active':''" @click="checkBtn(model.id,n)">{{btnData.content}}</text>
					</template>
				</view>
			</view>
			<view class="divider" v-if="model.children[activeIndex] && model.children[activeIndex].children && model.children[activeIndex].children.length>0"></view>
			<question-tree :model="p" :parentActive="childActive" v-if="model.children[activeIndex] && model.children[activeIndex].children && model.children[activeIndex].children.length>0"
			 v-for="p in model.children[activeIndex].children" :key="p.id"></question-tree>
		</template>
		<template v-else>
			<view class="questionSubItem" v-if="model.children && model.children.length>0">
				<view class="title" v-if="model.children && model.children.length>0">- {{model.content}}</view>
				<question-tree :model="p" v-for="p in model.children" v-if="model.children && model.children.length>0" :key="p.id"></question-tree>
			</view>
		</template>
	</view>
</template>

<script>
	import questionTree from "./questionTree";
	export default {
		props: {
			model: Object,
			parentActive: {
				type: Number,
				default: -1
			}
		},
		components: {
			"question-tree": questionTree,
		},
		data() {
			return {
				activeIndex: -1,
				childActive: -1
			}
		},
		methods: {
			// 选择按钮，修改当前激活序列，修改atore中数据
			checkBtn(id, n) {
				this.activeIndex = n;
                this.childActive = this.childActive - 1; // 选择按钮时，重置子组件中的activeIndex
                var QUES_ILLS=getApp().globalData.QUES_ILLS;
                this.eachList(QUES_ILLS,id, n)
                getApp().globalData.QUES_ILLS=QUES_ILLS;
            },
            eachList(data,id,i){
                data.map(element => {
                    if(element.id==id){
                        element.choosed=1;
                        element.children.map((item,n)=>{
                            if(n==i){
                                item.choosed= 1;
                                if(item.children && item.children.length>0){
                                    item.children.map((c,s)=>{
                                        if(c.type==2)c.choosed=2;
                                    })
                                }
                            }else{
                                item.choosed= 0;
                                if(item.children && item.children.length>0){
                                    item.children.map((c,s)=>{
                                        if(c.type==2)c.choosed=0;
                                    })
                                }
                            }
                        })
                    }
                    if(element.children && element.children.length>0)this.eachList(element.children,id,i);
                });
            }
		},
		watch: {
			// 监听父组件的activeIndex修改，并重置当前组件的activeIndex；
			parentActive(newVal) {
				this.activeIndex = -1;
			},
        },
	};
</script>

<style lang="scss" scope>
	@import "../../sass/main.scss";
	.questionSubItem{
		margin-bottom: 10rpx;
		background: #fff;
		padding: 20rpx;
	}
	.questionItem {
		background: #fff;

		.subTitle {
			width: 710rpx;
			font-size: 30rpx;
			color: #000;
			line-height: 42rpx;
			padding-top: 27rpx;
		}

		.btns {
			flex-wrap: wrap;
			margin-top: 15rpx;
			.btn {
                display:inline-block;
				min-width: 210rpx;
				padding: 15rpx 30rpx;
                // height: 80rpx;
                font-size: 30rpx;
				text-align: center;
				// line-height: 76rpx;
				margin-right: 30rpx;
				border: 1rpx solid #dddddd;
				border-radius: 70rpx;
				// border-radius: 15rpx;
				margin-bottom: 15rpx;
				&.active {
					background-color: #4580f6;
					color: #fff;
					border-color: #4580f6;
				}
			}
		}
	}
	.divider{
		height:2rpx;
		background:#eee;
		width: 750rpx;
		margin-left: -20rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	 }
</style>
