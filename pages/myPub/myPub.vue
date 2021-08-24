<template>
	<view>
		<view>
			<u-subsection  @change="getThing" :list="nav" mode="subsection" :current="current"></u-subsection>
		</view >
		<view v-if="myPubList != null && myPubList.length > 0 && current == 0"  class="context">
			<view v-for="(item,index) in myPubList" :key="index">
				<view class="loss">
					<span>我发布了一条失物招领启示 </span>
					<span class="span" @click="goDetail(item.id)">{{item.name}}</span>
					
						<u-image @click="pre(item.pictureUrl)" :fade="true" width="100%"height="80%" mode="aspectFit" :src="item.pictureUrl">
							<view slot="error" style="font-size: 24rpx;">没有图片</view>
						</u-image>
					<view>
						<view v-if=" Date.parse(new Date()) - item.lossTime / (24 * 3600 * 1000) >= 86400000">
							{{Math.floor((Date.parse(new Date()) - item.lossTime) / (24 * 3600 * 1000))}}天前
						</view>
						<view v-else-if=" Date.parse(new Date()) - item.lossTime / (24 * 3600 * 1000) >= 3600000">
							{{Math.floor((Date.parse(new Date()) - item.lossTime) / (24 * 3600 * 1000))}}小时前
						</view>
						<view v-else-if=" Date.parse(new Date()) - item.lossTime / (24 * 3600 * 1000) >= 60000">
							{{Math.floor((Date.parse(new Date()) - item.lossTime) / (24 * 3600 * 1000))}}分钟前
						</view>
						<view v-else>
							{{Math.floor((Date.parse(new Date()) - item.lossTime) / (24 * 3600 * 1000))}}秒前
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view v-if="(myPubList == null || myPubList.length == 0) && current == 0" >
			<u-empty text="没有任何感人事迹" mode="data"></u-empty>
		</view>
		<view  class="context">
		<view v-if="myFoundList != null && myFoundList.length > 0" v-for="(item,index) in myFoundList" :key="index" >
				<view class="loss">
					<span>我发布了一条寻物启示 </span>
					<span class="span" @click="goDetailFound(item.id)">{{item.name}}</span>
					
						<u-image @click="pre(item.pictureUrl)" :fade="true" width="100%"height="80%" mode="aspectFit" :src="item.pictureUrl">
							<view slot="error" style="font-size: 24rpx;">没有图片</view>
						</u-image>
					<view>
						<view v-if=" (Date.parse(new Date()) - item.loseTime / (24 * 3600 * 1000)) >= 86400000">
							{{Math.floor((Date.parse(new Date()) - item.loseTime) / (24 * 3600 * 1000))}}天前
						</view>
						<view v-else-if=" (Date.parse(new Date()) - item.loseTime / (24 * 3600 * 1000)) >= 3600000">
							{{Math.floor((Date.parse(new Date()) - item.loseTime) / (24 * 3600 * 1000))}}小时前
						</view>
						<view v-else-if=" (Date.parse(new Date()) - item.loseTime / (24 * 3600 * 1000)) >= 60000">
							{{Math.floor((Date.parse(new Date()) - item.loseTime) / (24 * 3600 * 1000))}}分钟前
						</view>
						<view v-else>
							{{Math.floor((Date.parse(new Date()) - item.loseTime) / (24 * 3600 * 1000))}}秒前
						</view>
						
					</view>
				</view>
		</view>
		
		
	</view>
	<view v-if="(myFoundList == null || myFoundList.length == 0) && current == 1" >
		<u-empty text="没有想要寻求帮助的迹象" mode="data"></u-empty>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav: [
					{name:"感人事迹"},
					{name:"寻物启示"}
				],
				current: 0,
				id: 0,
			}
		},
		methods: {
			goDetailFound() {
				//跳转寻物详情（未完成）
			},
			goDetail(id) {
				uni.navigateTo({
					url: "/pages/lossdetail/lossdetail?id=" + id
				})
			},
			pre(url) {
				uni.previewImage({
					urls: [url],
					longPressActions: {
						itemList: ['保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			getThing(index) {
				this.current = index;
				if(index == 0) {
					this.$store.state.myFoundList = [];
					this.$store.dispatch("getUserLoss",this.id);
				} else {
					this.$store.state.myPubList = [];
					this.$store.dispatch("getUserFound",this.id);
				}
			}
		},
		onLoad(e) {
			this.id = e.id;
			if(e.id == null || e.id == "undefined") {
				uni.showToast({title:"未登录"});
				setTimeout(function() {
					uni.navigateBack();
				}, 1000);
			} else {
				this.getThing(0);
			}
		},
		computed: {
			myPubList() {
				return this.$store.state.myPubList;
			},
			myFoundList() {
				return this.$store.state.myFoundList;
			}
		},
	}
</script>

<style lang="scss">
	.context {
		background: #eee;
		margin-top: 20rx;
	}
	span {
		font-weight: bold;
	}
	.span {
		color: #0000FF;
	}
	.loss {
		height: 700rpx;
		margin: 20rpx 20rpx 10rpx 0rpx;
		padding: 10rpx 0 10rpx 20rpx;
		width: 100%;
		background: #fff;
		
	}
</style>
