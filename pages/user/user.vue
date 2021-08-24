<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<view>
			<u-navbar
			back-icon-color="#fff" 
			:background="background" 
			title="个人中心"
			:is-back="false" 
			title-bold	
			></u-navbar>
		</view>
		<!-- 个人用户信息 -->
		<view>
			<view class="info" >
				<view class="pic"></view>
				<u-avatar @click="preview(userInfo.addressUrl)" size="large" :src="userInfo.addressUrl" mode="circle" ></u-avatar>
				<view @click="userDetail(userInfo.id)" class="user">
					{{userInfo.nickName}}
				</view>
				<view>
					<u-icon size="35rpx" name="arrow-right" class="right"  ></u-icon>
				</view>
			</view>
		</view>
		<!-- //其他信息 -->
		<view>
		 	<view class="renzheng"  @click="auth(userInfo.id,userInfo.isTrue)">
		 		<view class="image-content">
		 		                    <image style="width: 50rpx; height: 50rpx; background-color: #eeeeee;" mode="aspectFit" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.erfN5tHcyMygj3deWc3trgAAAA?w=176&h=180&c=7&o=5&dpr=1.12&pid=1.7" ></image>
		 		</view>
		 		<view class="text">实名认证</view>
		 		
		 	</view>
		 	<view class="second">
				<u-cell-group>
						<u-cell-item @click="mess(userInfo.id)" icon="bell-fill" title="消息通知">
							<view>
								<u-badge style="margin-right:50rpx;margin-top: 20rpx;" :is-dot="false" type="error" :count="mesNum"></u-badge>
							</view>
						</u-cell-item>
						<u-cell-item @click="myPub(userInfo.id)" icon="file-text-fill" title="我的发布" ></u-cell-item>
				</u-cell-group>
		 	</view> 
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(255, 255, 127), rgb(141, 198, 63))'},
				text: "用户未登录",
				id: 0,
				
			}
		},
		onReady() {
			
		},
		onShow() {
			//通过token拿名称再拿到用户信息
			let username = this.$userInfo.getUsername();
			// #ifdef  H5
			let token = localStorage.getItem("token");
			// #endif
			// #ifdef  MP-WEIXIN
			let token = this.data.token;
			// #endif
			this.$store.dispatch("checkToken",token);
			this.$store.dispatch("getUserInfo",username);
			this.id = this.$store.state.userInfo.id;
			setTimeout(res=> {
				this.sub();
			}, 2000);
		},
		methods: {
			myPub(id) {
				uni.navigateTo({
					url: '/pages/myPub/myPub?id=' + id
				});
			},
			sub() {
				console.log(this.id);
				console.log("开始订阅");
				this.$goEasy.subscribe({
				            channel: 1,
				            onMessage: function (message) {
								this.$store.state.mesNum = this.$store.state.mesNum+1;
				                console.log("Channel:" + message.channel + " content:" + message.content);
				            },
				            onSuccess: function () {
				                console.log("Subscribe successfully.");
				            },
				            onFailed: function () {
				                console.log("Subscribe successfully.");
				            }
				
				        });
			},
			//点击进入消息详情
			mess(id) {
				this.$store.state.mesNum=0;
				console.log("用户id:"+id);
				uni.navigateTo({
					url: "/pages/mesDetail/mesDetail?id=" + id
				});
			},
			
			//点击实名认证
			auth(id,isAuth) {
				if(isAuth == null || id == null) {
					uni.showToast({title:"请先登录"});
					return;
				}
				uni.navigateTo({url:"/pages/auth/auth?id=" + id + "&isTrue=" + isAuth})
				
			},
			userDetail(id) {
				
				if(id !=null) {
					uni.navigateTo({
					    url: '../UserDetail/UserDetail?id=' + id
					});
				}else {
					uni.showToast({
						title: "请先登录",icon:"error"
					});
				}
				
				
			},
			preview(url) {
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
			}
		},
		onLoad() {
			//通过token拿名称再拿到用户信息
			let username = this.$userInfo.getUsername();
			// #ifdef  H5
			let token = localStorage.getItem("token");
			// #endif
			// #ifdef  MP-WEIXIN
			let token = this.data.token;
			// #endif
			this.$store.dispatch("checkToken",token);
			if(isExpired == true) {
				this.$store.dispatch("getUserInfo",username);
			}
		},
		computed: {
			mesNum() {
				return this.$store.state.mesNum;
			},
			userInfo() {
				return this.$store.state.userInfo;
			},
			isExpired() {
				return this.$store.state.isExpired;
			}
			
		}
	}
</script>

<style>
	.second {
		margin-top: 20rpx;
		background: #fff;
	}

	.mess {
		display: flex;
		margin-top: 20rpx;
		padding: 20rpx 10rpx 10rpx 100rpx;
		height: 70rpx;
		width: 100%;
	}
	.pub {
		display: flex;
		margin-top: 20rpx;
		padding: 20rpx 0 0 100rpx;
		height: 70rpx;
		width: 100%;
	}
	.icon {
		height: 20rpx;
		width: 30rpx;
	}
	
	.content{
		height: 92.5vh;
		background: #eee;
	}
	.box{
		background-color: red;
	}
	.info {
		background: #fff;
		height: 30%;
		width: 100%;
		padding: 30rpx 00rpx 30rpx 20rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.pic{
		height: 100%;
	}
	.user {
		height: 100%;
		width: 60%;
		margin-left: 50rpx;
		line-height: 130rpx;
	}
	.right {
		line-height: 100rpx;
		height: 100%;
	}
	.renzheng {
		display: flex;
		margin-top: 20rpx;
		background: #fff;
		padding: 20rpx 0 10rpx 25rpx;
	}
	.text {
		padding-left: 10rpx;
	}
	
	
</style>
