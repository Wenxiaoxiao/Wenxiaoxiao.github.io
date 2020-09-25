<template>
	<view class="fx-question">
		<view class="fx-tips">请如实回答下列问题：</view>
		<view class="fx-content">
			<view class="wrapper">
				<view class="questionItems" v-if="vals.hasQ" v-for="(vals,i) in QUES_ILLS">
					<!-- <view class="title" v-if="vals.children && vals.children.length>0">{{vals.content}}问题：</view> -->
					<question-tree :model="p" parentActive="-1" v-for="p in vals.children"></question-tree>
				</view>
			</view>
		</view>
		<view class="fx-btns">
			<view class="preBtn" @click="goPrev()">上一步</view>
			<view class="nextBtn" @click="goNext()">确定</view>
		</view>
	</view>
</template>

<script>
import questionTree from "../../components/questionTree/questionTree";
	export default {
		data() {
			return {
				QUES_ILLS:[],//疾病列表
				hasMoreQueation:'',//是否还有未选择的问题
				listShow:Array,//列表是否有一级问题
			}
		},
		components: {
			"question-tree": questionTree,
		},
		methods: {
			//确定
			goNext(){
				var data=getApp().globalData.QUES_ILLS;
				this.hasMoreQueation='';
				this.checkMoreQuestion(data);
				if(!this.hasMoreQueation){
					uni.navigateTo({
						url: '/pages/issue/issue'
					});
				}
			},
			//上一步
			goPrev(){
				uni.navigateBack({
					delta: 1
				});
			},
			// 校验是否还有未选择的问题
			checkMoreQuestion(data){
				if(this.hasMoreQueation)return;
				data.forEach((item,i)=>{
					if(item.type==2 && item.choosed==2){
						this.hasMoreQueation=item.content;
						this.$notice.alert('问题--"'+item.content+'"尚未选择，请您选择后再提交！');
						return false;
					}
					if(item.children && item.children.length>0)this.checkMoreQuestion(item.children);
				})
			},
			checkHasQuestion(data){
				data.forEach((item,i)=>{
					item.hasQ=false;
					item.children.forEach((p,n)=>{
						if(p.children && p.children.length>0){
							item.hasQ=true;
							return false;
						}
					})
				})
			}
		},
		mounted(){
			uni.hideShareMenu();
			let QUES_ILLS=getApp().globalData.QUES_ILLS;
			this.checkHasQuestion(QUES_ILLS)
			getApp().globalData.QUES_ILLS=QUES_ILLS;
			this.QUES_ILLS=QUES_ILLS;
			console.log(this.QUES_ILLS);
			
		}
	}
</script>

<style lang="scss">
	@import './question.scss';
</style>
