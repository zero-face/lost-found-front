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
			<view class="info">
				<view class="pic">
					<u-avatar @click="preview(userInfo.addressUrl)" size="large" :src="userInfo.addressUrl" mode="circle" ></u-avatar>
				</view>
					<view @click="login" v-if="isExpired == false" class="user">请重新登录</view>
				<view v-else @click="userDetail(userInfo.id)" class="user" >
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
						<u-cell-item @click="mess(userInfo.id,mesNum)" icon="bell-fill" title="消息通知">
							
								<u-badge :is-dot="false" type="error" :count="mesNum"></u-badge>
							
						</u-cell-item>
						<u-cell-item @click="myPub(userInfo.id)" icon="file-text-fill" title="我的发布" >
							
						</u-cell-item>
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
				user:{},
				mes: [],
				id: 0,
			}
		},
		methods: {
			sub() {
				this.$goEasy.subscribe({
					            channel: this.$store.state.userInfo.id + "",
					            onMessage: message=>{
					                console.log("Channel:" + message.channel + " content:" + message.content);
									this.$store.state.mesNum++;
									console.log(JSON.parse(message.content).type);
									if(JSON.parse(message.content).type == '0'){
										this.$store.state.systemNum ++;
									} else if(JSON.parse(message.content).type == 1){
										this.$store.state.contactNum ++;
										console.log(this.$store.state.contactNum);
									}
									else if(JSON.parse(message.content).type == '3'){
										this.$store.state.commentNum ++;
									}else if(JSON.parse(message.content).type == '4'){
										this.$store.state.likeNum ++;
									}
									// this.$store.state.adminMes.push(JSON.parse(message.content));
					            },
					            onSuccess: function () {
					                console.log("Subscribe successfully.")
					            },
					            onFailed: function () {
					                console.log("Subscribe successfully.")
					            }
				});
			},
			//微信登录
			login() {
				uni.getUserProfile({
					desc: "用户登录，填充用户基本信息",
					lang:"zh_CN",
					success: res =>{
						console.log(res);
						this.user = res.userInfo;
						uni.login({
							scopes: "auth_user",
							success: res => {
								this.$store.dispatch("login",[res.code,this.user]);
								this.sub();
							},
							fail: res => {
								console.log(res);
							}
						})
					},
					fail: res =>{
						console.log(res);
					}
				});
			},
			//点击我的发布
			myPub(id) {
				uni.navigateTo({
					url: '/pages/myPub/myPub?id=' + id
				});
			},
			//点击进入消息详情
			mess(id,mesNum) {
				mesNum = 0;
				console.log("用户id:"+id);
				uni.navigateTo({
					url: "/pages/mesDetail/mesDetail?id=" + id
				});
			},
			detail() {
				//token
				let token = uni.getStorageSync('token');
				let username = this.$userInfo.getUsername();
				//检验token是否过期
				if(token == undefined) {
					this.$store.state.isExpired = false;
					return;
				}
				this.$store.dispatch("checkToken",[token,username]);
				this.sub();
			},
			//订阅消息
			auditMes() {
				this.$goEasy.subscribe({
					channel: this.$store.state.userInfo.id,
					onMessage: function (message) {
					    console.log("subChannel:" + message.channel + " content:" + message.content);
						this.mesNum ++;
					},
					onSuccess: function () {
					    console.log("Subscribe successfully.")
					},
					onFailed: function () {
					    console.log("Subscribe successfully.")
					}
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
			this.detail();
			this.auditMes();
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

<style lang="scss">
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
		height: auto;
		width: 100%;
		padding: 30rpx 0rpx 30rpx 20rpx;
		display: flex;
		// flex-direction: row;
		// flex-wrap: wrap;
		.pic {
			line-height: 30rpx;
			width: 20%;
		}
		.user {
			font-size: 30rpx;
			margin-left: 5rpx;
			line-height: 130rpx;
		}
		.right {
			float: right;
			margin-left: 280rpx;
			width: 20%;
			line-height: 100rpx;
			height: 100%;
		}
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
