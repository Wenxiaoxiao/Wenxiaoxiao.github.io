<template>
	<view class="apps" id="apps">
		<view class="hb-consult">
			<view class="wrapper">
				<scroll-view class="wrapper-scroll" id="scrollDom" scroll-y="true" :scroll-with-animation="true" :scroll-top="scrollTop"
				 :style="'height:'+windowHeight+'px'">
					<view class="hotIll scrollheight">
						<view class="title">
							<image src="../../static/images/1.png" class="titleImg"></image>
							<text>常见疾病</text>
						</view>
						<span class="content">
							<span class="item" v-for="(value,index) in hotIll" :key="index">
								<span @click="choseHotIll(value)" v-if="index<5">{{value.name}}</span>
							</span>
						</span>
					</view>
					<view class="content1 scrollheight">
						<view class="item animated fadeInLeft">
							<span class="left">
								<image src="../../static/images/3.png"></image>
							</span>
							<span class="right">
								<image src="../../static/images/2.png"></image>
								hi，你好，罹患疾病不知该投什么产品？告知疾病，梧桐君帮您筛选可承保的优质产品!
							</span>
						</view>
						<view class="item animated fadeInLeft">
							<span class="left">
								<image src="../../static/images/3.png"></image>
							</span>
							<span class="right">
								<image src="../../static/images/2.png"></image>
								请先根据对于情况选择疾病名称，查看核保建议，建议仅供参考，最终核保结果以保险公司为准
							</span>
						</view>
						<view class="item animated fadeInLeft">
							<span class="left">
								<image src="../../static/images/3.png"></image>
							</span>
							<span class="right">
								<image src="../../static/images/2.png"></image>

								<span class="content">
									<span class="item1" v-for="(value,index) in lookIll" :key="index">
										<span>{{value.name}}</span>
									</span>
								</span>
								<view class="linkItem" @click="goIllList">点击选择疾病&nbsp;&gt;</view>
							</span>
						</view>
					</view>
					<view class="content2 animated fadeInRight scrollheight" v-if="questionJsons.length>0">
						<view class="item">
							<span class="left">
								<image :src="imgsrc1"></image>
							</span>
							<span class="right">
								<image src="../../static/images/4.png"></image>
								被保险人所患疾病：
								<span v-for="(value,index) in questionJsons" :key="index">
									<span>- {{value}}</span>
								</span>
							</span>
						</view>
					</view>
					<view class="content1 animated fadeInLeft scrollheight" v-if="questionJson.length>0">
						<view class="item">
							<span class="left">
								<image src="../../static/images/3.png"></image>
							</span>
							<span class="right">
								<image src="../../static/images/2.png"></image>
								<view class="answer" v-for="(value,index) in questionJson" :key="index">
									<!-- <view class="type">- {{value.content}}类问题：</view> -->
									<template v-for="p in value.children">
										<insure-tree class="ques" :model="p"></insure-tree>
									</template>
								</view>
							</span>
						</view>
					</view>
					<view class="content1 animated fadeInLeft scrollheight" v-if="diseaseIds.length>0">
						<view class="item">
							<span class="left">
								<image src="../../static/images/3.png"></image>
							</span>
							<span class="right">
								<image src="../../static/images/2.png"></image>
								<span class="type1">针对上述疾病，</span>梧桐君会为根据每个人的不同情况为您进行量身定制的核保，请根据被保险人实际情况，如实回答下列几个问题！
							</span>
						</view>
						<view class="item animated fadeInLeft">
							<span class="left">
								<image src="../../static/images/3.png"></image>
							</span>
							<span class="right">
								<image src="../../static/images/2.png"></image>
								<span class="ques">请问被保险人的性别是：</span>
								<view class="sex">
									<view @click="choseSex(i)" v-for="(value,i) in sexData" :key="i">
										<view v-if="value.chosed" class="active">
											<image :src="value.src"></image>
										</view>
										<view v-else>
											<image :src="value.src"></image>
										</view>
										<text>{{value.text}}</text>
									</view>
								</view>
							</span>
						</view>
					</view>
					<view class="content2 animated fadeInRight scrollheight" v-if="sex != ''">
						<view class="item">
							<span class="left">
								<image :src="imgsrc1"></image>
							</span>
							<span class="right">
								<image src="../../static/images/4.png"></image>
								<span v-if="sex == '1'">男</span>
								<span v-if="sex == '2'">女</span>
							</span>
						</view>
					</view>
					<view class="content1 animated fadeInLeft scrollheight" v-if="sex != ''">
						<view class="item">
							<span class="left">
								<image src="../../static/images/3.png"></image>
							</span>
							<span class="right">
								<image src="../../static/images/2.png"></image>
								<span class="ques">请问被保险人的出生年份是：</span>
								<view class="year-select select-text">
									<view class="section" @click="setDefaultYear">
										<picker mode="selector" @change="bindPickerChange" :value="year.yearsIndex" :range="year.yearArr">
											<view class="picker">
												{{yearFlag?'请选择':year.yearArr[year.yearsIndex]}}
											</view>
										</picker>
									</view>
								</view>
							</span>
						</view>
					</view>
					<view class="content2 animated fadeInRight scrollheight" v-if="year.year != ''">
						<view class="item">
							<span class="left">
								<image :src="imgsrc1"></image>
							</span>
							<span class="right">
								<image src="../../static/images/4.png"></image>
								<span>被保险人出生年份：{{year.year}}年</span>
							</span>
						</view>
					</view>
					<view class="content1 animated fadeInLeft scrollheight" style="display:none;" v-if="year.year != ''">
						<view class="item">
							<span class="left">
								<image src="../../static/images/3.png"></image>
							</span>
							<span class="right">
								<image src="../../static/images/2.png"></image>
								<span class="ques">你感兴趣的险种类型是：</span>
								<span class="content">
									<span class="item1" v-for="(value,index) in insureStyles" :key="index" @click="choseStyle(value)">
										<span>{{value.label}}</span>
									</span>
								</span>
							</span>
						</view>
					</view>
					<view class="content2 animated fadeInRight scrollheight" style="display:none;" v-if="insureStyle != ''">
						<view class="item">
							<span class="left">
								<image :src="imgsrc1"></image>
							</span>
							<span class="right">
								<image src="../../static/images/4.png"></image>
								<span>{{insureStyle.label}}</span>
							</span>
						</view>
					</view>
					<view class="content1 animated fadeInLeft scrollheight" v-if="recommendProducts.length>0 && showResult === 1">
						<view class="item">
							<span class="left">
								<image src="../../static/images/3.png"></image>
							</span>
							<span class="right">
								<image src="../../static/images/2.png"></image>
								<span class="content">
									<span class="item2">
										根据您的健康状况，梧桐君为您筛选出来可能可以承保的产品， 你可尝试投保，<span>投保前仍需仔细 阅读告知已确认是否可承保! </span>
									</span>
								</span>
							</span>
						</view>
					</view>
					<view class="content3 animated fadeInLeft scrollheight" v-if="recommendProducts.length>0 && showResult === 1">
						<view class="title">
							<image src="../../static/images/line.png"></image><span>重大疾病</span>
							<image src="../../static/images/line.png"></image>
						</view>
						<view class="itemWrapper" v-for="(value,index) in recommendProducts" :key="index">
							<view class="item" v-if="index<5">
								<view class="left">
									<image :src="value.productIco"></image>
								</view>
								<view class="right">
									<span class="name">{{value.name}}</span>
									<span class="productDesc">{{value.productDesc}}</span>
									<span class="fee"><span>￥ {{value.fee}} </span>起</span>
								</view>
							</view>
							<view class="advisory" v-if="value.infos.length>0">
								<view v-for="(item,m) in value.infos" :key="m">
									<view class="title">{{item.title}}</view>
									<view class="content">{{item.content}}</view>
									<view v-if="item.questionShow === true" v-for="(theval,theindex) in item.question" :key="theindex" class="questions">
										<view class="question">{{theval.content}}</view>
										<view v-if="theval.chosedType == '是'" class="answer yes">{{theval.chosedType}}</view>
										<view v-if="theval.chosedType != '是'" class="answer no">{{theval.chosedType}}</view>
									</view>
									<view v-if="item.questionShow === false && item.question.length>0" class="arrow" @click="questionShowOrNot(true,index,m)">
										查看更多
										<!-- <image src="../../static/images/circle-arrow-down.png"></image> -->
									</view>
									<view v-if="item.questionShow === true && item.question.length>0" class="arrow" @click="questionShowOrNot(false,index,m)">
										收起
										<!-- <image src="../../static/images/circle-arrow-up.png"></image> -->
									</view>
								</view>
							</view>
						</view>
						<view class="footer">
							<image src="../../static/images/foot.png"></image>
							<button class="kefu" :session-from="'nickName='+userInfo.nick+'|'+'country='+userInfo.country+'|'+'city='+userInfo.city+'|'+'avatarUrl='+userInfo.ico+'|'+'gender='+userInfo.sex+'|'+'province='+userInfo.province"
							 open-type="contact"></button>
						</view>
					</view>
					<view class="content1 animated fadeInLeft scrollheight" v-if="recommendProducts.length == 0  && showResult === 2">
						<view class="item">
							<span class="left">
								<image src="../../static/images/3.png"></image>
							</span>
							<span class="right">
								<image src="../../static/images/2.png"></image>
								<span class="content">
									<span class="item2">
										<span>抱歉，没有相关产品推荐，</span>针对上述疾病，您可能会被拒保，请您联系核保老师核保或者重新核保。
									</span>
								</span>
							</span>
						</view>
					</view>
					<view class="content4 animated fadeInLeft scrollheight" v-if="recommendProducts.length == 0 && showResult === 2">
						<view class="footer">
							<image src="../../static/images/foot.png"></image>
							<button class="kefu" :session-from="'nickName='+userInfo.nick+'|'+'country='+userInfo.country+'|'+'city='+userInfo.city+'|'+'avatarUrl='+userInfo.ico+'|'+'gender='+userInfo.sex+'|'+'province='+userInfo.province"
							 open-type="contact"></button>
						</view>
					</view>
					<view style='height:131rpx;width:100%;'></view>
				</scroll-view>
			</view>
			<view class="footBtn" @click="reVerify" v-if="showReVerify">
				重新核保
			</view>
		</view>
	</view>
</template>

<script>
	import insureTree from "../../components/insureTree/insureTree";
	export default {
		data() {
			return {
				yearFlag: true,
				showResult: 0,
				QUES_ILLS: [],
				windowHeight: 1300,
				scrollView: 10,
				scrollDirection: 'vertical',
				scrollTop: 1600,
				hotIll: [],
				lookIll: [],
				// lookIll:[{name:'胆结石'},{name:'肾结石'},{name:'结石'},{name:'尿道结石'},{name:'胆管结石'}],
				insureStyles: [{
					"label": "重疾",
					"value": 1,
				}, {
					"label": "医疗",
					"value": 2,
				}, {
					"label": "意外",
					"value": 3,
				}, {
					"label": "寿险",
					"value": 4,
				}],
				insureStyle: 1,
				illList: [],
				questionShow: false,
				questionJson: [],
				questionJsons: [],
				diseaseIds: [],
				recommendProducts: [],
				consultLoading: false,
				pointList: [],
				sex: '',
				sexData: [{
					type: '1',
					text: '男',
					chosed: false,
					src: require("../../static/images/man.png")
				}, {
					type: '2',
					text: '女',
					chosed: false,
					src: require("../../static/images/woman.png")
				}],
				year: {
					defaultIndex: null,
					yearsIndex: null,
					year: '',
					yearArr: []
				},
				imgsrc1: "",
				showReVerify: false, //是否显示重新核保
				userInfo: Object, //用户信息
			}
		},
		components: {
			"insure-tree": insureTree,
		},
		methods: {
			//分享
			onShareAppMessage(res) {
				if (res.from === 'button') { // 来自页面内分享按钮
					console.log("res.target", res.target);
				}
				return {
					title: '身体有些小毛病可以投保吗，快来问问梧桐树核保助手',
					path: '/pages/index/index',
					imageUrl: '../../static/images/share.jpg'
				}
			},
			choseHotIll(value) {
				console.log("value", value);
				uni.navigateTo({
					url: '/pages/illList/illList?diseaseId=' + value.diseaseId
				})
			},
			scrollToBottom(val) {
				let THAT = this;
				wx.createSelectorQuery().selectAll('.scrollheight').boundingClientRect(function(rect) {
					if (rect) {
						let scrollheight = 0;
						//console.log("rect1",rect);
						rect.map((item, index) => {
							if (index === rect.length - 1) {

							} else {
								//console.log(item.height);
								scrollheight = scrollheight + item.height;
							}
						})
						//console.log("scrollheight",scrollheight);
						let scrollHeight = scrollheight * 2 + val * 2;
						THAT.scrollTop = scrollHeight;
					}
				}).exec()
			},
			goExpert() { //https://bx.wts999.com/m/customer/index.html
				uni.navigateTo({
					url: '/pages/webView/webView'
				})
			},
			//重新审核
			reVerify() {
				getApp().globalData.SURE_QUES_ILLS = [];
				//设置默认值
				this.questionJsons = [];
				this.questionJson = [];
				this.diseaseIds = [];
				this.recommendProducts = [];
				this.sex = '';
				this.year.year = "";
				this.showResult = 0;
				//this.insureStyle = "";
				let date = new Date(),
					toYear = date.getFullYear();
				this.year.yearsIndex = this.year.defaultIndex = toYear - 1940;
				this.sexData.map(item => {
					item.chosed = false;
				})
				uni.navigateTo({
					url: '/pages/illList/illList'
				})
			},
			//跳转到疾病列表
			goIllList() {
				this.reVerify();
			},
			//是否展示问题+答案
			questionShowOrNot(val, index, m) {
				this.recommendProducts[index].infos[m].questionShow = val;
			},
			//选择性别
			choseSex(index) {
				//this.sex = "";
				//this.sex = this.sexData[index].type;
				this.recommendProducts = [];
				let sexData = this.sexData;
				sexData.map((item, i) => {
					if (i == index) {
						sexData[i].chosed = true;
					} else {
						sexData[i].chosed = false;
					}
				})
				this.sex = sexData[index].type;
				this.getProductsList();
				this.scrollBottom();
			},
			//选择出生年份 wx.getSystemInfo
			bindPickerChange: function(e) {
				this.recommendProducts = [];
				this.year.yearsIndex = this.year.defaultIndex = e.detail.value;
				console.log("e.detail.value", e.detail.value);
				if (e.detail.value != 0) {
					this.year.year = this.year.yearArr[e.detail.value];
					this.scrollBottom();
					let THAT = this;
					setTimeout(function() {
						THAT.getProductsList();
					}, 100)
				}
			},
			//获取产品
			getProductsList() {
				let THAT = this;
				//console.log(value);
				//递归算法 找到与目标id相同的 item
				var returnedItem;
				var findId = function(arr, id) {
					arr.forEach((item) => {
						if (item.id == id) {
							returnedItem = item;
							return item;
						} else if (item.children.length > 0) {
							findId(item.children, id);
						}
					})
				}
				//递归算法 找到与目标id相同的 item 如果 该item 有parentid则向上查找到 最高层/第二层
				var parentItem;
				var findParentId = function(arr, id, List) {
					//console.log("arr",arr);
					var tmp = findId(arr, id);
					//console.log("returnedItem",returnedItem);
					if (List.indexOf(returnedItem.parentId) === -1) {
						findParentId(arr, returnedItem.parentId, List);
					} else {
						parentItem = returnedItem;
						return parentItem;
					}
				}
				var parentItem2;
				var findParentId2 = function(arr, id) {
					var tmp = findId(arr, id);
					//console.log("returnedItem",returnedItem);
					if (returnedItem.parentId !== "0") {
						findParentId2(arr, returnedItem.parentId);
					} else if (returnedItem.parentId === "0") {
						parentItem2 = returnedItem;
						return parentItem2;
					}
				}
				//递归算法 
				var childItem = [];
				var findChidId = function(arr) {
					arr.forEach((item) => {
						// console.log(item);
						if (childItem.indexOf(item.id) == -1) {
							childItem.push(item.id);
						}
						if (item.children.length > 0) {
							findChidId(item.children);
						}
					})
				}
				if (THAT.year.year !== "" && THAT.insureStyle !== "" && THAT.sex !== "") {
					//请求产品列表
					this.$http({
						url: '/api/recommends',
						data: {
							"birthday": THAT.year.year,
							"diseaseIds": THAT.diseaseIds,
							"policyType": [1],
							"sex": THAT.sex
						},
						method: "POST",
					}).then(res => {
						console.log("成功!", res);
						let recommendProducts = res.data;
						if (recommendProducts.length > 0) {
							this.showResult = 1;
						} else {
							this.showResult = 2;
						}
						//循环产品列表，通过infos里面的diseaseId匹配疾病列表里面的id 
						//通过获得的id去匹配疾病列表里面 改id 的父级，祖父级 。。。 一直找到最高层
						//循环遍历之后得到 匹配的疾病 病种 和 该疾病下 回答过的问题 和 答案
						//赋值给该 infos item1["title"]=>病种  item1["question"]=>回答过的问题 和 答案
						this.$http({
							url: '/api/allHealths',
							method: "GET",
						}).then(pointListdata => {
							let pointList = pointListdata.data;
							var firstParentList = [];
							pointList.map((itm) => {
								console.log("itm", itm);
								firstParentList.push(itm.id);
							})
							recommendProducts.map((item, theindex1) => {
								item.infos.map((item1, theindex) => {
									item1["questionShow"] = false;
									//console.log("item1", item1);
									//得到当前id所在的item
									var tmp = findId(pointList, item1.diseaseId);
									//得到最上面一层的父节点


									var tmp3 = findParentId(pointList, item1.diseaseId, firstParentList);
									var tmp5 = findParentId2(pointList, item1.diseaseId);
									//console.log("parentItem2",parentItem2);
									//找到该id对应的item
									item1["title"] = parentItem.content;
									let tmpArr = [];
									//console.log(THAT.questionJson);
									THAT.questionJson.map(item2 => {
										//console.log("item2", item2);
										if (item2.id === parentItem2.id) {
											//找到该id下所有的问题
											var quesList = [];
											var findAllQues = function(item) {
												let tmpItem = {
													"content": '',
													"chosedType": ''
												};
												if (item.type === 2 && item.choosed === 1) {
													tmpItem.content = item.content;
													item.children.map(item2 => {
														if (item2.choosed === 1 && item2.type === 3 && item2.parentId === item.id) {
															tmpItem.chosedType = item2.content;
														}
													})
													quesList.push(tmpItem);
												}
												if (item.children.length > 0) {
													item.children.forEach((item1) => {
														findAllQues(item1);
													})
												}
											}
											var tmp4 = findAllQues(item2);
											console.log("quesList1", quesList);
											item1["question"] = quesList;
										}
									})
									//console.log("quesList2", quesList);

								})
							})
							setTimeout(() => {
								THAT.recommendProducts = recommendProducts;
								THAT.consultLoading = false;
								THAT.$forceUpdate();
								THAT.scrollBottom();
							}, 0);
						})
					}).catch(err => {
						console.log(err);
					})
				}
			},
			//选择险种类型：
			choseStyle(value) {
				this.consultLoading = true;
				this.insureStyle = value;
				this.scrollBottom();
				this.getProductsList();
			},
			//获取所有的疾病ID
			getAllDiseaseIds() {
				//递归算法 
				var childItem = [];
				var findAllId = function(arr) {
					arr.forEach((item) => {
						//console.log("item",item);
						if (childItem.indexOf(item.id) === -1 && item.choosed === 1) {
							childItem.push(item.id);
						}
						if (item.children.length > 0) {
							findAllId(item.children);
						}
					})
				}
				let QUES_ILLS = getApp().globalData.SURE_QUES_ILLS;
				if (QUES_ILLS && QUES_ILLS instanceof Array) {
					let tmp = findAllId(QUES_ILLS);
					console.log("QUES_ILLS", QUES_ILLS);
					//console.log("childItem",childItem);
					this.diseaseIds = childItem;
				}
			},
			//获取已选择的产品的一级名称
			getListANames() {
				var hasQuestion = false;
				var findQuestions = function(data) {
					data.map(item => {
						if (item.type == 2) {
							hasQuestion = true;
							return false;
						}
						if (item.children && item.children.length > 0) findQuestions(item.children)
					})
				};
				let QUES_ILLS = getApp().globalData.SURE_QUES_ILLS;
				if (QUES_ILLS && QUES_ILLS instanceof Array && QUES_ILLS.length > 0) {
					let tmpArr = [];
					QUES_ILLS.forEach(item => {
						console.log("item", item);
						if (item.choosed == 1) {
							item.children.map((item1) => {
								tmpArr.push(item1.content);
							})
						}
					})
					this.questionJsons = tmpArr;
					console.log("tmpArr", tmpArr);
					var tmp = findQuestions(QUES_ILLS);
					if (hasQuestion) { //有问题的时候
						this.questionJson = QUES_ILLS;
					}
					console.log("this.questionJson", this.questionJson);
					// console.log("QUES_ILLS",QUES_ILLS);
					this.showReVerify = true;
					this.scrollBottom();

				}
			},
			scrollBottom() {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#scrollDom').boundingClientRect(data => {
						console.log("得到布局位置信息", data);
						this.scrollTop = this.scrollTop + 500;
						console.log(this.scrollTop);
					}).exec();
				}, 500)
			},
			setDefaultYear() {
				let THAT = this;
				setTimeout(function() {
					THAT.yearFlag = false;
				}, 1000)
			}
		},
		mounted() {
			//获取常见疾病
			this.$http({
				url: '/api/hotDiseases',
				method: "GET"
			}).then(res => {
				console.log("res.data===", res.data);
				this.hotIll = res.data;
			}).catch(err => {
				console.log('==err', err);
			})
			//获取用户图像
			let THAT = this;
			const userInfo = uni.getStorageSync('userInfo');
			console.log("userInfo", userInfo);
			if (userInfo) {
				this.imgsrc1 = userInfo.ico;
			}

			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight = res.windowHeight
				}
			});
		},
		onShow() {
			//获取疾病信息 包含父子关系
			this.getListANames();
			this.getAllDiseaseIds(); //???
			this.QUES_ILLS = getApp().globalData.SURE_QUES_ILLS;
			console.log("this.QUES_ILLS", this.QUES_ILLS);
			console.log("this.year", this.year);
			this.$tools.getRecentVersion();
			//年份 1940至今
			let date = new Date(),
				toYear = date.getFullYear();
			let yearArr = [];
			for (let m = toYear, n = 0; m >= 1940; m--, n++) {
				yearArr.push(m);
				if (this.year.year !== "") {
					this.yearFlag = false;
					if (m === this.year.year) {
						this.year.yearsIndex = this.year.defaultIndex = n;
					}
				} else {
					this.yearFlag = true;
					if (m === 1990) {
						this.year.yearsIndex = this.year.defaultIndex = n;
					}
				}

			}
			//console.log("yearArr",yearArr);
			this.year.yearArr = yearArr;
		}
	}
</script>

<style lang="scss">
	@import "../../sass/animate.less";
	@import './consult.scss';
</style>
