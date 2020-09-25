<template>
<view>
    <tempalte v-if="model.type==2 && model.choosed==1">
        <view class="subTitle" v-if="val.choosed==1" v-for="(val, i) in model.children" :key="val.id">
            <view class="item">{{model.content}}</view> 
            <text v-if="val.content === '是'" class="yes result">{{val.content}}</text>
            <text v-if="val.content !== '是'" class="no result">{{val.content}}</text>
        </view>
        <tempalte v-if="model.children && model.children.length>0"  v-for="(val, i) in model.children">
            <insure-tree :model="p" v-if="val.children && val.children.length>0" v-for="p in val.children" :key="p.id"
            ></insure-tree>
        </tempalte>
    </tempalte>
    <tempalte v-else>
        <tempalte v-if="model.children && model.children.length>0" v-for="p in model.children">
			<view class="treeSubItem" >
				<view class="title" v-if="model.choosed ==1">- {{model.content}}</view>
				<insure-tree :model="p" ></insure-tree>
			</view>
        </tempalte>
    </tempalte>
</view>
</template>

<script>
import insureTree from "./insureTree";
export default {
  props: {
      model: Object,
    },
    components: {
    "insure-tree": insureTree,
  },
};
</script>

<style lang="scss">
@import '../../sass/main.scss';
.treeSubItem{
	background:#fff;
	margin-bottom: 10rpx;
}
  .subTitle{
        position: relative;
        padding-bottom:10rpx;
        background:#fff;
        padding-left: 20rpx;
        padding-top:10rpx;
        vertical-align: middle;
		width: 100%;
		overflow: hidden;
        .item{
            width:80%;
            display:inline-block;
            font-size: 28rpx;
            color:#000;
            line-height:42rpx;
            min-height:48rpx; 
            vertical-align: middle;
        }
        .result{
            display:inline-block;
            width:20%;
            position: absolute;
            right:5rpx;
            top: 50%;
            transform: translateY(-50%);
            font-size: 30rpx;
            text-align: center;
            line-height:36rpx;
            // height:36rpx;
        }
        .yes{
            color: #4580f6;
        }
        .no{
            color:#e70000;
        }
    }
</style>
