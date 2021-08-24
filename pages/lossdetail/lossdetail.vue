<template>
	<view>
		<view>
			<u-navbar 
			back-text="返回" 
			back-icon-color="#fff" 
			:background="background" 
			:title="detailLoss.name"
			title-color="#fff" 
			:custom-back="back"
			title-bold	
			></u-navbar>
		</view>
		<view >
			<!-- //图片显示 -->
			<view>
				<u-image width="100%" height="500rpx" :src="detailLoss.pictureUrl">
					<view slot="error" style="font-size: 24rpx;">失物图片丢失了</view>
				</u-image>
			</view>
			<!-- //详情介绍 -->
			<view class="detail">
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
					<text>{{new Date(detailLoss.lossTime).getFullYear() + "/" + (new Date(detailLoss.lossTime).getMonth() + 1)+ "/" +  new Date(detailLoss.lossTime).getDate() + "/ " + new Date(detailLoss.lossTime).getHours() + ":00"}}</text><br/>
				</view>
				<view class="cent">
					<text class="detail-title">丢失地点：</text>
					<text>{{detailLoss.address}}</text><br/>
				</view>
				<view class="cent">
					<text class="detail-title">失物描述：</text>
					<text>{{detailLoss.description}}</text><br/>
				</view>
				<view class="cent">
					<text class="detail-title">拾取人：</text>
				<!-- 	<image class="image" mode="top rigth" :src="detailLoss.addressUrl"/> -->
					<text @click="getUser(detailLoss.lossUserId)">{{detailLoss.nickName}}</text><br/>
				</view>
			</view>
			<!-- //评论区 -->
			<hr/>
			<scroll-view 
			style="white-space: nowrap; height:900rpx"
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
									{{item.commont}} 
									<view class="reply" @click="treply(item.id,item.nickName)">
										<u-icon name="chat"></u-icon>
									</view>
									
								</view>
								
							
							</view>
							<view class="likes">
								<u-icon v-if="likes.isLike==false" @click="like" name="heart" ></u-icon>
								<u-icon v-else @click="like(item.loss)" name="heart-fill" color="red"></u-icon>
							</view>
							<view v-if="item.likes> 0">{{item.likes}}</view>
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
										{{it.commont}}
										<view class="reply">
											<u-icon @click="treply(it.fatherId,it.nickName)" name="chat"></u-icon>
										</view>
									</view>
								</view>
								<view class="likes">
									<u-icon v-if="likes.isLike==false" @click="like" name="heart" ></u-icon>
									<u-icon v-else @click="like(it.loss)" name="heart-fill" color="red"></u-icon>
								</view>
								<view v-if="it.likes> 0">{{it.likes}}</view>
							</view>
						</view>
					</view>
					
				</view>
				<view v-else style="text-align: center;">暂无评论，来抢沙发</view>
			</view>
		</scroll-view>	
			
		</view>
		<!-- 联系，审核 -->
		<view class="check">
			<view class="verify" shape="circle" ripple-bg-color="#ff0000"  :ripple="true" type="error" size="medium" @click="claim(userInfo.id,detailLoss.id)">认领</view>
			<view @click="getUser(detailLoss.lossUserId)" class="contact" shape="circle" ripple-bg-color="#55aaff"  :ripple="true" type="primary" size="medium">联系拾取人</view>
			<view>
				<input v-model="input" @confirm="submit(detailLoss.id,userInfo.id)" @blur="change" :focus="iscomment" class="comment" type="text" border=true auto-height=true :placeholder="left" trim />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				likes: {isLike:false,likes:0},
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
			this.detail(option.id)
		},
		methods: {
			back(){
				uni.navigateBack({
					url: "/pages/index/index"
				})
			},
			claim(uid,lossId) {
				console.log("开始申请");
				this.$store.dispatch("claim",[uid,lossId]);
			},
			
			//已进入就会执行的方法
			detail(id) {
				//拿到详细事务信息
				this.$store.dispatch("detailLoss",id);
				//拿到详细评论信息
				this.$store.dispatch("detailComment",id);
				//拿到评论数量
				this.$store.commit("getCommentNum",id);
				//通过token拿名称再拿到用户信息
				let username = this.$userInfo.getUsername();
				this.$store.dispatch("getUserInfo",username);
			},
			//联系拾取人
			getUser(id) {
				console.log(id);
				uni.navigateTo({
					url: "../contact/contact?id=" +id
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
				let token = localStorage.getItem("token");
				this.$store.dispatch("checkToken",token);
				if(this.$store.state.isExpired) {
					this.iscomment = true;
					this.left= "@" + name  + " ";
				}
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
	.comments {
		// height: ;
		// position: absolute;
	}
	.content {
		height: 1000rpx;
		display: flex;
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
				padding-left: 0rpx;
				color: #282828;
				.reply {
					padding-left: 30rpx;
				}
			}
		}
		likes {
			padding-top: 50rpx;
			width: 400rpx;
			height: 100%;
			background: red;
		}
		
	}
	.type-2 {
		display: flex;
		padding-left: 90rpx;
		margin-top: 20rpx;
		.image {
			margin: 3rpx 10rpx 10rpx 3rpx;
			border-radius: 60%;
			overflow: hidden;
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
		height: 350rpx;
	}
	
	.check {
		background: white;
		position: fixed;
		right: 15rpx; 
		bottom:0rpx;
		left: 0rpx;
		width:100%;
		height: 80rpx; 
		z-index:999;
		.comment {
			background: white;
			width: 45%;
			margin: 0 0 20rpx ;
			height: 80rpx;
			border: 1rpx solid #b8b8b8;
			border-radius: 60rpx 60rpx 60rpx 60rpx;
			line-height: 130rpx;
			text-align: center;
		}
		.contact {
			background: #ffaa00;
			border-radius: 40rpx 0% 0% 40rpx;
			float: right;
			height: 100%;
			width: 25%;
			color: white;
			line-height: 80rpx;
			text-align: center;
		}
		.verify {
			color: white;
			line-height: 80rpx;
			text-align: center;
			border-radius: 0% 40rpx 40rpx 0%;
			width: 130rpx;
			background: #FF0036;
			float: right;
			height: 100%;
			width: 25%;
			
		}
	}
	
</style>
