<template>
	<view class="fx-issue">
		<view class="fx-tips">请确认您选择的问题：</view>
		<view class="fx-content">
			<view class="wrapper">
				<view class="questionItem" v-if="value.hasQ" v-for="(value,index) in questionJson">
					<!-- <view class="title">{{value.content}}类问题：</view> -->
					<template v-for="p in value.children">
						<insure-tree :model="p"></insure-tree>
					</template>
				</view>
			</view>
		</view>
		<view class="fx-btns">
			<view class="preBtn" @click="goPrev()">返回修改</view>
			<view class="nextBtn" @click="goNext()">确定</view>
		</view>
	</view>
</template>

<script>
import insureTree from "../../components/insureTree/insureTree";
	export default {
		data() {
			return {
				questionJson:[],
			}
		},
		components: {
			"insure-tree": insureTree,
		},
		methods: {
		//返回修改
			goPrev(){
				uni.navigateBack({
					delta: 1
				});
			},
			//确定
			goNext(){
				//SURE_QUES_ILLS
				getApp().globalData.SURE_QUES_ILLS = this.questionJson;
				uni.navigateBack({
					delta: 3
				});
			}
		},
		mounted(){
			uni.hideShareMenu();
			this.questionJson=getApp().globalData.QUES_ILLS;
			console.log(this.questionJson);
		}
	}
</script>

<style lang="scss">
	@import './issue.scss';
</style>
