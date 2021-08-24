<template>
	<view>
		<view>
			<ul class="nav">
				<li :class="{'active':cur == 1}" @click="cli(1)">
					<view >评论消息</view> 
				</li>
				<li :class="{'active':cur == 2}" @click="cli(2)">
					<view>点赞消息</view> 
				</li> 
				<li :class="{'active':cur == 3}" @click="cli(3)">
					<view>聊天消息</view>
				</li> 
				<li :class="{'active':cur == 4}" @click="cli(4)">
					<view>系统消息</view>
				</li>
			</ul>
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
			this.sub();
		},
		
		methods: {
			cli(id) {
				this.cur = id;
			},
			sub() {
				this.$goEasy.subscribe({
				            channel: this.id,
				            onMessage: function (message) {
				                console.log("Channel:" + message.channel + " content:" + message.content)
				            },
				            onSuccess: function () {
				                console.log("Subscribe successfully.")
				            },
				            onFailed: function () {
				                console.log("Subscribe successfully.")
				            }
				
				        });
			}
		}
	}
</script>

<style>
	
	ul{
		 display: flex;  
		 margin: 10rpx 40rpx 10rpx 0rpx;
		 background: #fff;
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
