<template>
	<view class="apps">
		<view class="hb-index">
			<image src="../../static/images/indexBg.png" class="indexBg"></image>
			<view class="text1">健康确认&nbsp;&nbsp;无痕核保</view>
			<view class="text2">给您更安心的保险选择</view>
			<view class="text3">核保只需一分钟，大数据帮您筛选可投保产品</view>
			<view class="text3">保险公司不留底</view>
			<view class="bigsmall">
				<view class="text4"></view>
				<view class="text5">
					<image src="../../static/images/btn.png" class="btnImg"></image>
					<view>
						<button v-if="!logined" class="text" open-type="getUserInfo" @getuserinfo="getInfoCallback" withCredentials="true"></button>
						<button v-if="logined" class="text" @click="goNext"></button>
					</view>
				</view>
			</view>
			<view class="text6">核保结果仅供参考，不作为保险公司最终核保结论</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				loginInfo: {},
				code: '',
				session: '',
				logined:false,//是否登录
			}
		},
		methods: {
			goNext(){
				// 直接进入下一页
				uni.navigateTo({
					url:'/pages/consult/consult'
				})
			},
			//获取用户授权回调
			getInfoCallback(e) {
				console.log('e',e);
				if (e.detail && e.detail.errMsg == "getUserInfo:ok") {
					let userInfo=e.detail.userInfo;
					this.userInfo = userInfo;
					
					this.goConsult();
				} else {
					this.$notice.msg("您已拒绝了授权！");
				}
			},
			//跳转我的定制页
			goConsult() {
				let userInfo=this.userInfo;
				let infos = {
					city:userInfo["city"],
					country:userInfo["country"],
					ico:userInfo["avatarUrl"],
					nick:userInfo["nickName"],
					province:userInfo["province"],
					sex:userInfo["gender"],
				};
				this.userAuth(infos);
			},
			//userAuth post
			userAuth(param) {
				this.$http({
					url: '/api/auth',
					data: param
				}).then(res => {
					console.log("=成功!", res);
					uni.setStorageSync('userInfo', param);
					uni.navigateTo({
						url:'/pages/consult/consult'
					})
				}).catch(err => {
					console.log('=err',err);
				})
			},
			//登录 
			goLogin(code) {
				this.$http({
					url: '/api/login',
					method: "GET",
					data: {
						code: code
					}
				}).then(res => {
					console.log("成功!", res);
					this.session = res.data.session;
					uni.setStorageSync('session',this.session);
					uni.setStorageSync('userInfo', res.data);
					this.logined=true;
					uni.hideLoading();
				}).catch(err => {
					console.log('==err', err);
					this.session = err.data.session;
					uni.setStorageSync('session',this.session);
					uni.hideLoading();
				})
			},
			//获取微信code
			getWxCode() {
				uni.login({
				provider: 'weixin',
				success: (res)=> {
					console.log(res);
					
					if (res.code) {
						this.code = res.code; 
						this.goLogin(res.code);//获取用户信息
					} else {
						this.$notice.alert('获取微信code失败，异常原因：'+res.errMsg)
					}
				}
				});
			},
		},
		mounted() {
			uni.showLoading({
				title: '加载中'
			});
			this.getWxCode();
		},
		onShow(){
			this.$tools.getRecentVersion();
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
