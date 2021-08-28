<template>
	<view class="content">
		<view>
			<u-navbar 
			back-text="返回" 
			back-icon-color="#000000" 
			:background="{ background: '#ffaa7f' }" 
			title="消息中心"
			title-color="#000000" 
			:custom-back="back"
			title-bold	
			></u-navbar>
		</view>

		<view>
			<ul class="nav">
				<li :class="{'active':cur == 1}" @click="cli(1)">
					<view >评论消息</view> 
					<view>
						<u-badge :is-dot="false" type="error" :count="commentNum"></u-badge>
					</view>
				</li>
				<li :class="{'active':cur == 2}" @click="cli(2)">
					<view>点赞消息</view> 
					<view>
						<u-badge :is-dot="false" type="error" :count="likeNum"></u-badge>
					</view>
				</li> 
				<li :class="{'active':cur == 3}" @click="cli(3)">
					
					<view>聊天消息</view>
					<view>
						<u-badge :is-dot="false" type="error" :count="contactNum"></u-badge>
					</view>
				</li> 
				<li :class="{'active':cur == 4}" @click="cli(4)">
					<view>系统消息</view>
					<view>
						<u-badge :is-dot="false" type="error" :count="systemNum"></u-badge>
					</view>
				</li>
			</ul>
		</view>
		
		<view>
			<view>
				<!-- 历史消息 -->
				<view v-for="(item,index) in offlineMes" :key="index">
					<!-- 历史系统消息 -->
					<view v-if="item.type == '0' && cur == 4" class="system">
					
						<u-avatar class="ava" :src="item.addressUrl" size="mini" mode="circle"></u-avatar>
						<view class="text">
							{{item.message}}
						</view>
					</view>
					<!-- 历史聊天消息 -->
					<view v-if="item.type == '1' && cur == 3" class="system">
					
						<u-avatar class="ava" :src="item.addressUrl" size="mini" mode="circle"></u-avatar>	
						<view class="text">
							<span>{{item.nickName}}</span>向你发送了一条消息 {{item.message}}
						</view>
					</view>
					<view v-if="item.type == '2' && cur == 1" class="system">
						<u-avatar class="ava" :src="item.addressUrl" size="mini" mode="circle"></u-avatar>
						<view class="text">
							<span>{{item.nickName}}</span>评论了你的发布内容<span>{{item.name}}</span>:  {{item.message}}
						</view>
					</view>
					<view v-if="item.type == '3' && cur == 2" class="system">
						<u-avatar class="ava" :src="item.addressUrl" size="mini" mode="circle"></u-avatar>
						<view class="text">
							<span>{{item.nickName}}</span>点赞了你的评论 <sapn>{{item.message}}</sapn>  
						</view>
					</view>
				</view>
			
			</view>
			
			
			
			
			
			<!-- <view v-for="(item,idx) in comment " :key="idx" >
				<view v-if="item.type == '2' && cur == 1" class="system">
					<u-avatar class="ava" :src="item.addressUrl" size="mini" mode="circle"></u-avatar>
					<view class="text">
						<span>{{item.nickName}}</span>评论了你的发布内容<span>{{item.name}}</span>:  {{item.message}}
					</view>
				</view>
				<view v-if="item.type == '3' && cur == 2" class="system">
					<u-avatar class="ava" :src="item.addressUrl" size="mini" mode="circle"></u-avatar>
					<view class="text">
						<span>{{item.nickName}}</span>点赞了你的评论 <sapn>{{item.message}}</sapn>  
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				cur: 1,
			}
		},
		onLoad(e) {
			this.id = e.id;
			console.log(e.id)
			this.history();
		},
		
		methods: {
			history() {
				console.log("开始获取历史的系统，聊天消息");
				this.$store.dispatch("meshistory",this.id);
			},
			cli(id) {
				this.cur = id;
				if(id==1) {
					this.$store.state.commentNum = 0;
				} else if(id == 2){
					this.$store.state.likeNum = 0;
				}else if(id == 3){
					this.$store.state.contactNum = 0;
				} else {
					this.$store.state.systemNum = 0;
				}
			},
			back() {
				this.$store.state.mesNum = 0;
				this.$store.state.offlineMes=[];
				uni.navigateBack();
			}
			
		},
		computed: {
			adminMes() {
				return this.$store.state.adminMes;
			},
			offlineMes() {
				return this.$store.state.offlineMes;
			},
			systemNum() {
				return this.$store.state.systemNum;
			},
			commentNum() {
				return this.$store.state.commentNum;
			},
			contactNum() {
				return this.$store.state.contactNum;
			},
			likeNum() {
				return this.$store.state.likeNum;
			},
		},
	}
</script>

<style lang="scss">
	.content {
		background: #eee;
		height: 10000px;
	}
	.system {
		margin: 10rpx 0 0 10rpx;
		display: flex;
		background: #fff;
		width: 100%;
		height: auto;
		.ava {
			width: 30%;
			margin: 30rpx 0 10rpx 10rpx;
		}
		.text {
			width: auto;
			height: auto;
			margin: 10rpx 20rpx 10rpx 20rpx;
			padding: 20rpx 20rpx 50rpx 20rpx;
			font-size: 30rpx;
		}
	}

	ul{
		 display: flex;  
		 margin: 10rpx 00rpx 10rpx 0rpx;
		 background: #fff;
		 padding-right: 40rpx;
	}
	.active {
		height: 100%;
		color: #00a4ff;
		border-bottom: 2px solid #00a4ff;
	}
	li:hover {
		color: #00a4ff;
		border-bottom: 2px solid #00a4ff;
	}
	li {
		background: #fff;
		line-height: 60rpx;
		height: 100%;
		text-align: center;
		/* margin: auto; */
		width: 30%;
		list-style: none;
	}

</style>
