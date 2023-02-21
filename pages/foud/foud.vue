<template>
	<view class="content">
		<view class="search">
			<u-search :clearabled="true" shape="round" placeholder="请输入关键词" v-model="keyword"></u-search>
		</view>
		<view class="u-demo-block">
			<view style="background-color: white;">
				<u-tabs name="type" :list="type" activeStyle="{color: '#303133'}" :is-scroll="true" :current="current" @click="change">
				</u-tabs>
			</view>
		</view>
		<view v-if="foundThingList.length == 0"style="height: 100vh;">
			<u-empty
				mode="car"
				icon="http://cdn.uviewui.com/uview/empty/data.png"
				text="暂无寻物消息"
			>	
			</u-empty>
		</view>
		<view v-for="(item,index) in foundThingList" :key = "index">
			<u-gap height="13" bgColor="#eee"></u-gap>
			<view class="card">
				<view class="head">
					<view style="height: 70rpx;">
						<image class="ava" mode="top rigth" :src="item.userAddress"/>
					</view>
					<view style="height: 70rpx;">
						<view style="font-weight: bolder;margin: 0rpx 20rpx 0rpx 15rpx;"            >{{item.nickName}}</view>
						<view style="font-size: 20rpx; margin: 10rpx 20rpx 20rpx 10rpx;"            >{{item.gmtCreate}}</view>
					</view>
				</view>
				<u-divider margin-top="10" margin-bottom="30"></u-divider>
				<view class="body">
					<view class="title">{{'#' + item.name + '#'}}</view>
					<view>{{'丢失时间：'+item.loseTime}}</view>
					<view>{{'丢失地点：'+ item.address}}</view>
					<view>{{'物品描述：'+ item.description}}</view>
				</view>
				<view class="image" v-if="item.pictureUrl != null">
					<view style="width: 300rpx; height: 300rpx; margin-right: 10rpx; margin-bottom: 20rpx;">
						<image style="width: 100%; height: 100%; border-radius: 30rpx;" :lazy-load="true" mode="aspectFit" :src="item.pictureUrl"></image>
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
				current: 0,
				list: [{
					type:'全部',
					id: 0,
					typeId: 0,
				}],
				keyword: "",
			}
		},
		onLoad() {
			this.$store.dispatch("getType");
		},
		onShow() {
			this.$store.dispatch("getAllFound",0);
		},
		onHide() {
			this.$store.state.foundThingList=[];
		},
		methods: {
			navigateBack() {
				uni.navigateBack()
			},
			change(item,index) {
				console.log("开始改变")
				this.$store.state.foundThingList=[];
				this.current = index;
				this.$store.dispatch("getAllFound",item.typeId);
			}
			
		},
		computed: {
			type() {
				return this.list.concat(this.$store.state.type);
			},
			foundThingList() {
				return this.$store.state.foundThingList;
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #eee;
		height: auto;
		width: 100%;
		.search {
			width: 100%;
			height: auto;
			background-color: white;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
		}
		.card {
			width: auto;
			height: auto;
			word-wrap:break-word;
			white-space:pre-wrap; 
			background-color: #fff;
			margin: 10rpx 30rpx 0rpx 30rpx;
			padding: 30rpx;
			border-radius: 30rpx;
			.head{
				width: 100%;
				height: 80rpx;
				display: flex;
				.ava {
					border-radius: 60%;
					height: 70rpx;
					width: 70rpx;
					display: inline-block;
				}
			}
			.body {
				height: auto;
				margin-bottom: 30rpx;
				.title {
					font-weight: bolder;
					margin-bottom: 20rpx;
				}
				
			}
			.image{
				height: auto;
				max-height: 100%;
				width: 100%;
				display: flex;
				// justify-content: center; /* 水平居中 */
				align-items: center;   
				
				border-radius: 30rpx;
				// background-color: red;
			}
		}
	}
	
</style>
