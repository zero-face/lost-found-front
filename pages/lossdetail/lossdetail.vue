<template>
	<view class="content">
		<view>
			<u-navbar
				:title="detailLoss.name"
				
				left-text="返回"
				@leftClick="back"
				border
				titleWidth="300"
				height="50"
				safeAreaInsetTop
				:bgColor="background.backgroundImage"
			>
			</u-navbar>
		</view>
		<view >
			<!-- //图片显示 -->
			<view>
				<u--image width="100%" height="500rpx" :src="detailLoss.pictureUrl">
					<view slot="error" style="font-size: 24rpx;">失物图片丢失了</view>
				</u--image>
			</view>
			<!-- //详情介绍 -->
			<view class="detail">
				<!-- <view style="display: flex;">
					<view>
						<u-icon name="bag-fill" size="50" color="#ff5500" label="名称" label-pos="bottom" custom-style="{font-weight: bolder}"></u-icon>
						<text style="line-height: 50rpx;">一顶红色的帽子</text>
					</view>
					<view style="margin-left: auto;">
						<u-icon name="tags-fill" size="50" color="#ff5500" label="类型" label-pos="bottom" custom-style="{font-weight: bolder}"></u-icon>
						<text>衣物服饰</text>
					</view>
					
				</view> -->
				<view class="cent">
					<text class="container detail-title">失物类型：</text>
					<text class="container">{{detailLoss.type}}</text><br/>
				</view>
				<view class="cent">
					<text class="detail-title">失物名称：</text>
					<text >{{detailLoss.name}}</text><br/>
				</view>
				<view class="cent">
					<text class="detail-title">丢失时间：</text>
					<text>{{detailLoss.gmtCreate}}</text><br/>
				</view>
				<view class="cent">
					<text class="detail-title">丢失地点：</text>
					<text>{{detailLoss.address}}</text>
				</view>
				<view class="cent">
					<text class="detail-title">失物描述：</text>
					<text>{{detailLoss.description}}</text>
				</view>
				<view class="cent">
					<text class="detail-title">拾取人：</text>
				
					<text @click="getUser(detailLoss.lossUserId,userInfo.id)">{{detailLoss.nickName}}</text>
				</view>
			</view>
			
			<!-- //评论区 -->
			<u-gap height="15" bg-color="#F4F4F4"></u-gap>
			<view style="background-color: #fff;">
				<scroll-view
					style="white-space: nowrap; height:400rpx;"
					scroll-y="true">
					<view class="comments">
						<view v-if="detailComment.length != 0">
							<!-- //统计评论数量 -->
							<view style="text-align: center;">{{commentsNum+"条评论"}}</view>
							<view v-for="(item,index) in detailComment" :key="index">
								<view class="type-1">
									<view class="image">
										<image class="image" mode="top rigth" :src="item.addressUrl"/> 
									</view>
									<view class="nacom">
										<view class="name"> {{item.nickName}}</view>
										<view class="comment">
											{{item.comment}} 
											<view class="reply" @click="treply(item.id,item.nickName)">
												<u-icon name="chat"></u-icon>
											</view>
										</view>
									</view>
								</view>
								<!-- //二级评论 -->
								<view>
									<view class="type-2" v-for="(it,idx) in item.son" :key="idx">
										<view class="image">
											<image class="image" mode="top rigth" :src="it.addressUrl"/> 
										</view>
										<view class="nacom">
											<view class="name"> {{it.nickName}}</view>
											<view class="comment">
												{{it.comment}}
												<view class="reply">
													<u-icon @click="treply(it.fatherId,it.nickName)" name="chat"></u-icon>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view v-else>
							<u-empty
								mode="car"
								icon="http://cdn.uviewui.com/uview/empty/comment.png"
								text="暂无评论"
							>
							</u-empty>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view style="height: 110rpx; background-color: white;"></view>
		<!-- 联系，审核 -->
		<view class="check">
			<!-- <view class="verify" shape="circle" ripple-bg-color="#ff0000"  :ripple="true" type="error" size="medium" @click="claim(userInfo.id,detailLoss.id)">认领</view> -->
			<view class="verify" shape="circle" ripple-bg-color="#ff0000"  :ripple="true" type="error" size="medium" @click="submit(detailLoss.id,userInfo.id)">发送</view>
			<!-- <view class="contact"  @click="getUser(detailLoss.lossUserId,userInfo.id)" shape="circle" ripple-bg-color="#55aaff"  :ripple="true" type="primary" size="medium">联系拾取人</view> -->
			<view class="boleft">
				<view style="height: 70rpx; width: 100%;">
					<textarea class="input" auto-height placeholder-class="sss" :placeholder="left" auto-height v-model="input" />
				</view>
				<!-- <view class="item" @click="comment">
					<u-icon label="评论" labelPos="bottom" labelSize="25" name="chat" size="35"></u-icon>
				</view> 
				<view class="item">
					
					<u-icon v-if="false" label="关注" labelPos="bottom" labelSize="25" name="star-fill" color="#ff5500" size="35"></u-icon>
					<u-icon v-else label="关注" labelPos="bottom" labelSize="25" name="star" size="35"></u-icon>
				</view>
				<view class="item">
					<u-icon label="分享" labelPos="bottom" labelSize="25" name="share" size="35"></u-icon>
				</view>-->
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				load: true,
				lossId: null,
				show: false,
				iscomment: false,
				fatherId: null,
				input:"",
				left: "留下你的精彩评论吧",
				background: {
					// backgroundColor: '#001f3f',
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					backgroundSize: 'cover',
					
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				}
			}
		},
		onLoad(option) {
			this.lossId = option.id;
			this.detail(option.id)
		},
		methods: {
			get() {
				console.log("开始生成")
				
			},
			
			comment() {
				this.show = true;
				//拿到详细评论信息
				this.$store.dispatch("detailComment",this.lossId);
				//拿到评论数量
				this.$store.commit("getCommentNum",this.lossId);
			},
			//返回上一级
			back(){
				uni.navigateBack({
					url: "/pages/index/index"
				})
			},
			//认领
			claim(uid,lossId) {
				console.log("开始申请");
				this.$store.dispatch("claim",[uid,lossId]);
			},
			
			//进入就会执行的方法
			detail(id) {
				//拿到详细事务信息
				console.log("开始获取详细信息")
				this.$store.dispatch("detailLoss",id);
				let username = this.$userInfo.getUsername();
				let token = uni.getStorageSync('token');
				console.log("开始检查token是否过期")
				this.$store.dispatch("checkToken",[token,username]);
				this.comment();
			},
			//联系拾取人
			getUser(id,uid) {
					if(id == uid) {
						console.log("自己发布");
						uni.showToast({
							title: '不能私聊自己哦'
						});
						return ;
					}
					uni.navigateTo({
						url: "../contact/contact?id=" +id + "&uid=" + uid
					})
			},
			//一旦失去焦点
			change() {
				this.iscomment = false;
				this.left = "留下你的精彩评论吧";
				//失去焦点就变为一级
				this.fatherId = null;
			},
		
			//点击二级评论
			treply(fid,name) {
				this.fatherId = fid;//点击就获得fatherid保存为全局，方便后面使用
				//获取username
				let username = this.$userInfo.getUsername();
				let token = uni.getStorageSync("token");
				this.$store.dispatch("checkToken",[token,username]);
				this.iscomment = true;
				this.left= "@" + name  + " ";
			},
			//获取输入框中的内容并保存下来
			oninput(e) {
				this.input = e.target.value;
				
			},
			submit(lossId,uid) {
				let typeId="1";
				this.iscomment = false;
				if(this.left != "留下你的精彩评论吧"){
					typeId = "2";
				}
				if(this.input== "" || this.input == null) {
					uni.showToast({
						title:"发送的内容不能为空",icon:"error"
					})
					return ;
				}
				
				this.$store.commit("submit",[lossId,typeId,uid,this.fatherId,this.input]);
				this.input = null;
				this.left = '留下你的精彩评论吧'
			}
		},
		computed: {
			detailLoss() {
				return this.$store.state.detailLoss;
			},
			detailComment() {
				return this.$store.state.detailComment;
			},
			detailLikes() {
				return this.$store.state.Likes;
			},
			isExpired() {
				return this.$store.state.isExpired;
			},
			userInfo() {
				return this.$store.state.userInfo;
			},
			commentsNum() {
				return this.$store.state.commentsNum;
			}
			
		}
		
	}
</script>

<style lang="scss">
	.comments{
		padding-top: 10rpx;
	}
	.content {
		background-color: #F4F4F4;
	}
	.type-1 {
		display: flex;
		
		.image {
			margin: 3rpx 10rpx 10rpx 3rpx;
			border-radius: 60%;
			overflow: hidden;
			height: 70rpx;
			width: 70rpx;
			display: inline-block;
		}
		.nacom {
			width: 580rpx;
			.name {
				
				display: inline-block;
				line-height: 50rpx;
				text-align: center;
				color: #838383;
				
			}
			.comment {
				display: flex;
				height: auto;
				width: 100%;
				padding-left: 0rpx;
				color: #282828;
				word-wrap:break-word; 
				white-space:pre-wrap; 
				.reply {
					padding-left: 30rpx;
				}
			}
		}
	}
	.type-2 {
		width: 100%;
		height: auto;
		display: flex;
		padding-left: 90rpx;
		margin-top: 20rpx;
		.image {
			margin: 3rpx 10rpx 10rpx 3rpx;
			border-radius: 60%;
			// overflow: hidden;
			height: 70rpx;
			width: 70rpx;
			display: inline-block;
		}
		.name {
			margin-right: 450rpx;
			width: 40rpx;
			display: inline-block;
			line-height: 50rpx;
			text-align: center;
			color: #838383;
		}
		.comment {
			display: flex;
			padding-left: 0rpx;
			color: #282828;
			width: 90%;
			height: auto;
			word-wrap:break-word;
			white-space:pre-wrap; 
			.reply {
				padding-left: 30rpx;
			}
		}
	}
	.cent {
		line-height: 50rpx;
	}
	.detail-title {
		font-size: 30rpx;
		font-weight: bold;
	}
	.detail {
		background-color: #FFFFFF;
		height: auto;
		padding: 10rpx 20rpx 20rpx 20rpx;
		
	}
	.check {
		border-top: 1rpx solid #eee;
		background: white;
		position: fixed;
		right: 15rpx; 
		bottom:0;
		left: 0rpx;
		width:100%;
		height: 90rpx; 
		z-index:999;
		padding: 10rpx 10rpx 10rpx 10rpx;
		.boleft {
			width: 77%;
			display: flex;
			flex-wrap: wrap;
			height: 70rpx;
			justify-content: space-between;
			float: left;
			line-height: 80rpx;
			.item {
				text-align: center;
				width: 70rpx;
				height: 70rpx;
				line-height: 70rpx;
				margin-left: 50rpx;
				// background-color: #fff;
				// border-radius: 50%;
			}
			.input {
				width: 100%;
				min-height: 60rpx; 
				background-color: #eee;
				border-radius: 50rpx; 
				line-height: 60rpx;
				padding-left: 30rpx;
				height: 70rpx;
				max-height: 70rpx;
			}
		}
		
		.contact {
			background: #ffaa00;
			border-radius: 40rpx 0% 0% 40rpx;
			float: right;
			height: 70rpx;
			width: 25%;
			color: white;
			line-height: 70rpx;
			text-align: center;
		}
		.verify {
			color: white;
			line-height: 70rpx;
			text-align: center;
			border-radius: 40rpx;
			margin-right: 10rpx;
			width: 130rpx;
			background: #0055ff;
			float: right;
			height: 70rpx;
			width: 15%;
			
		}
		
		
	}
	
</style>
