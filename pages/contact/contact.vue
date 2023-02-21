<template>
	<view>
		<view>
			<u-navbar
				:title="chatUserInfo.nickName"
				left-text="返回"
				@leftClick="back"
				border
				titleWidth="300"
				height="50"
				safeAreaInsetTop
				:bgColor="background.backgroundColor"
			>
			</u-navbar>
			
		</view>
		<view class="content">
			<view class="message">
				<scroll-view scroll-y="true" style="white-space: nowrap; height:1200rpx">
					<view v-for="(item,index) in historyMes" :key="index">
						<view class="he" v-if="item.froms == id">
							<u-avatar size="mini" :src="chatUserInfo.addressUrl"></u-avatar>
							<span>{{item.message}}</span>
						</view>
						<view v-else class="my">
							<span>{{item.message}}</span>
							<u-avatar size="mini" :src="userInfo.addressUrl"></u-avatar>
						</view>
					</view>
					<!-- 实时聊天消息 -->
					<view v-for="(it,ind) in from" :key="it.id">
						<view v-if="it.froms == id" class="he">
							<u-avatar size="mini" :src="chatUserInfo.addressUrl"></u-avatar>
							<span>{{it.message}}</span>
						</view>
						<view v-else class="my">
							<span>{{it.message}}</span>
							<u-avatar size="mini" :src="userInfo.addressUrl"></u-avatar>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="send">
				<view style="height: 100%; width: 70%;"> 
					<textarea class="input" auto-height placeholder-class="sss" :placeholder="left" auto-height v-model="input" />
				</view>
				
				
				<view class="text" @click="send(val)">
					发送
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				val: "",
				background:{
					backgroundColor: '#04B5CF',
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				id: 0,
				socketOpen:false,
				from: [],
				uid: 0,
				sends: "",
			}
		},
		methods: {
			// 判断是否已连接
			checkOpenSocket () {
				console.log("开始判断是否连接");
				let self = this;
				uni.sendSocketMessage({
					data: 'ping',
					success: (res) => {
						return;
					},
					fail: (err) => { // 未连接打开websocket连接
						console.log("未打开websocket连接");
					self.openConnection(); //打开连接
					}
				});
			},
			openConnection () { // 打开连接
				uni.closeSocket(); // 确保已经关闭后再重新打开
				uni.connectSocket({
					// #ifdef  H5
					url: 'ws://123.57.220.238:8888/websocket/' + this.uid,
					// #endif
					// #ifdef  MP-WEIXIN
					url: 'ws://123.57.220.238:8888/websocket/' + this.uid,
					// #endif
					method: 'POST',
					success(res) {
						console.log('连接成功 connectSocket=', res);
					},
					fail(err) {
						console.log('连接失败 connectSocket=', err);
					}
				});
			},
			//点击发送
			send(input) {
				console.log(input);
				if(input == null || input.trim==" " || input.length < 1){
					uni.showToast({title:"请输入内容"});
					return ;
				}
				console.log("开始发送");
				// uni.onSocketOpen( (res) =>{
						console.log("连接打开");
						uni.sendSocketMessage({
							data: JSON.stringify({
								froms: this.uid,
								too: this.id,
								type:"1",
								message: input,
								flag: true //标志点对点
							}),
							success: res=>{
								console.log("发送成功");
								this.from.push({
								froms: this.uid,
								too: this.id,
								type:"1",
								message: input,
								flag: true //标志点对点
							});
								this.val = "";
							},
							fail: res => {
								uni.showToast({title:"连接错误"});
								console.log(res);
							}
						});
					
				// });
			},
			//进入就会触发获取历史消息
			history(fromId,toId) {
				this.$store.dispatch("history",[fromId,toId])
			},
			notify() {
					uni.onSocketMessage( (res) =>{
					  console.log('收到服务器内容：' + res.data);
					  this.from.push(JSON.parse(res.data));
					});
					
			},
			back() {
				//清空 当前聊天
				console.log("清空当前记录");
				this.from = [];
				//关闭连接
				// uni.onSocketOpen(res =>{
					 uni.closeSocket();
				// })
				uni.navigateBack();
			}
		},
		onShow() {
		},
		onLoad(e) {
			this.id = e.id ;
			this.uid = e.uid;
			this.$store.dispatch("getChatUser",e.id);
			//通过token拿名称再拿到用户信息
			let username = this.$userInfo.getUsername();
			let token = uni.getStorageSync('token');
			this.$store.dispatch("checkToken",[token,username]);
			console.log("开始获取历史消息");
			this.history(e.uid,e.id);
			this.checkOpenSocket(); 
			this.notify();
			uni.onSocketClose((res) =>{
				console.log("退出连接，马上重连");
			  this.checkOpenSocket();
			});
		},
		computed: {
			chatUserInfo() {
				return this.$store.state.chatUserInfo;
			},
			historyMes() {
				return this.$store.state.historyMes;
			},
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
	}
</script>

<style lang="scss">
	
	.content {
		background: #eee;
	}
	.message {
		.he{
			text-align: left;
			padding: 20rpx 20rpx 20rpx 20rpx;
			margin-bottom: 40rpx;
			span {
				padding: 15rpx 15rpx 15rpx 15rpx;
				// border-radius: 5%;
				font-size: 30rpx;
				margin: 0rpx 20rpx 30rpx 30rpx;
				background: #fff;
				text-align: left;
				display: inline-block;
			    white-space: pre-wrap;
			    word-wrap: break-word;
				max-width: 70%;
			    width: auto;
			    height: auto;
			}
		}
		.my{
			text-align: right;
			padding: 20rpx 20rpx 20rpx 20rpx;
			margin-bottom: 40rpx;
			span {
				padding: 15rpx 15rpx 15rpx 15rpx;
				font-size: 30rpx;
				margin: 20rpx 20rpx 30rpx 30rpx;
				// border-radius: 5%;
				background: #fff;
				text-align: left;
				display: inline-block;
				white-space: pre-wrap;
				word-wrap: break-word;
				max-width: 70%;
				width: auto ;
				height: auto;
			}
		}
	}
	
	
	.send {
		background: #fff;
		position: fixed;
		right: 20rpx; 
		bottom:10rpx;
		left: 0rpx;
		width:100%;
		height: 70rpx; 
		z-index:999;
		display: flex;
		padding: 20rpx 10rpx 10rpx 10rpx;
		.input {
			width: 100%;
			min-height: 60rpx; 
			background-color: #eee;
			border-radius: 50rpx; 
			line-height: 70rpx;
			padding-left: 30rpx;
			height: 80rpx;
			max-height: 80rpx;
		}
		.text {
			text-align: center;
			color: white;
			background: #55aaff;
			width: 20%;
			height: 90%;
			margin-top:5rpx;
			line-height: 72rpx;
			border-radius: 50rpx 50rpx 50rpx  50rpx;
		}
	}
</style>
