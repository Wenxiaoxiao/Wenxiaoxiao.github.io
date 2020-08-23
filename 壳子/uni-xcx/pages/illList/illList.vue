<template>
	<view class="apps">
		<view class="fx-illList">
			<view class="fx-tips">请选择疾病(可多选)</view>
			<view class="illList">
				<view class="point-list">
					<view class="item" v-for="(value, i) in pointList" @click="showChild(i)">
						<text :class="activeIndex == i?'activeItem':''">{{value.content}}</text>
					</view>
				</view>
				<view class="child-list">
					<view class="disease" @click="choseDisease(activeIndex,index,value.choosed)" v-for="(value, index) in pointList[activeIndex].children">
						<view class="diseaseItem" :class="value.choosed?'active':''">{{value.content}}</view>
						<view class="choseIcon" v-if="value.choosed==1">
							<image src="../../static/images/choseIcon.png"></image>
						</view>
					</view>
				</view>
			</view>
			
			<view class="fx-btns">
				<view class="btn preBtn" v-if="!showMore" @click="showMoreIll">查看已选疾病</view>
				<view class="btn preBtn" v-if="showMore" @click="showMoreIll">收起</view>
				<view class="btn nextBtn" @click="submitDiease">选好了</view>
			</view>
		</view>
		<view class="fix-results" v-if="showMore">
			<view class='mask' @click="showMoreIll"></view>
			<view class='fix-main'>
				<view class="titile">
					<text>被保险人所患疾病：</text>
				</view>
				<view class="list">
					<view v-if="value.choosed==1" v-for="(value, index) in pointList">
						<view class="list-item" v-if="p.choosed==1" v-for="(p,n) in value.children" @click="choseDisease(index,n,1)">
							<view class="list-content">{{p.content}}</view>
							<image class="close" src="../../static/images/delete.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				illlistLoading: true,
				pointList: [], //全部疾病列表
				childList: [], //子疾病列表
				viewportHeight: 1340, //页面高度
				showMore: false,
				headerTitle: '智能核保',
				activeIndex:0,
				hasQuestion:false,
				optionDiseaseId:false,
				subActiveIndex:undefined,
				activeParentId:undefined,
			}
		},
		methods: {
			//展示更多
			showMoreIll() {
				if (!this.showMore) {
					var result = this.getAllChoose();
					if (!result || result.length == 0) {
						this.$notice.msg("您尚未选择任何疾病！");
						return;
					}
				}
				this.showMore = !this.showMore;
			},
			//提交疾病
			submitDiease() {
				var result = this.getAllChoose();
				if (!result || result.length == 0) {
					this.$notice.msg("请您先选择疾病！");
					return
				}
				this.hasQuestion=false;
				this.findQuestions(result);
				if(!this.hasQuestion){
					getApp().globalData.SURE_QUES_ILLS = result;
					// getApp().globalData.QUES_ILLS = result
					uni.navigateBack({
						delta: 1
					});
					return;
				}
				this.initList(result,2,3)
				getApp().globalData.QUES_ILLS = result
				uni.navigateTo({
					url: '/pages/question/question'
				});
			},
			findQuestions(data){
				data.map(item=>{
					if(item.type==2){
						this.hasQuestion=true;
						return false;
					}
					if(item.children && item.children.length>0)this.findQuestions(item.children)
				})
			},
			initList(data,type,level){
				data.map((item,index) => {
					if(item.type==type && item.level==level){
						item.choosed=2;
					}
					if(item.children && item.children.length>0)this.initList(item.children,type,level);
				});
			},
			//点击选择疾病
			choseDisease(fatherIndex, index, old) {
				console.time('a')
				this.pointList[fatherIndex].children[index].choosed = old == 1 ? 0 : 1;
				let hasCheckFather = false;
				if (old != 1) {
					hasCheckFather = true;
				} else {
					this.pointList[fatherIndex].children.map((item, n) => {
						if (item.choosed == 1) {
							hasCheckFather = true;
							return false;
						}
					})
				}
				this.pointList[fatherIndex].choosed = hasCheckFather ? 1 : 0;
				console.timeEnd('a')
			},
			checkAllList(fatherIndex, index, old) {
				let hasCheckFather = false;
				if (old != 1) {
					hasCheckFather = true;
				} else {
					this.pointList[fatherIndex].children.map((item, n) => {
						if (item.choosed == 1) {
							hasCheckFather = true;
							return false;
						}
					})
				}
				this.pointList[fatherIndex].choosed = hasCheckFather ? 1 : 0;
			},
			//点击左边获取右边
			showChild(i) {
				this.activeIndex = i;
			},
			//请求疾病列表
			getPointList() {
				// console.log("this.optionDiseaseId",this.optionDiseaseId);
				let optionDiseaseId = this.optionDiseaseId;
				this.$http({
					url: '/api/allHealths',
					method: "GET",
				}).then(res => {
					console.log(res.data)
					let pointList = this.setAllChoose(res.data);
					if(optionDiseaseId){
						//console.log("optionDiseaseId",optionDiseaseId);
						let tmpData = this.findActiveIndex(pointList,optionDiseaseId);
						console.log("activeParentId",this.activeParentId);
						let activeParentId = this.activeParentId;
						tmpData.map((item,index)=>{
							if(item.id == activeParentId){
								item.choosed = 1;
								this.activeIndex = index;
							}
						})
						this.pointList = tmpData;
					}
					else{
						this.pointList = pointList;
					}
					this.illlistLoading = false;
					console.log(this.pointList);
					uni.hideLoading();
				})

			},
			//找到activeIndex
			findActiveIndex(data,optionDiseaseId){
				data.map((item,index)=>{
					if(item.id != optionDiseaseId){
						this.findActiveIndex(item.children,optionDiseaseId);
					}
					else{
						item.choosed = 1;
						this.activeParentId = item.parentId;
					}
				})
				return data;
			},
			// 设置默认选择项
			setAllChoose(data) {
				data.map((item, index) => {
					item.choosed = 0;
					if (item.children && item.children.length > 0) {
						this.setAllChoose(item.children);
					}
				});
				return data;
			},
			// 获取默认选择数组
			getAllChoose() {
				var list = JSON.parse(JSON.stringify(this.pointList));
				var filterData = list.filter((item) => {
					item.children = item.children.filter(t => t.choosed);
					return item.choosed == 1;
				});
				return filterData;
			}
		},
		mounted() { 
			uni.hideShareMenu();
			uni.showLoading({
				title: '加载中...'
			});
			this.getPointList();
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log("option.diseaseId",option.diseaseId);
			this.optionDiseaseId = option.diseaseId;
		}
	}
</script>

<style lang="scss">
	@import './illList.scss';
</style>
