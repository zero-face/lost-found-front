<template>
	<view>
		<view>
			<ul class="nav">
				<li>
					<view class="title" >评论消息</view> 
				</li>
				<li class="nav-item" >
					<view class="title" >点赞消息</view> 
				</li> 
				<li class="nav-item" >
					<view class="title" >系统消息</view> <!---->
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
			}
		},
		onLoad(e) {
			this.id = e.id;
			console.log(e.id)
			this.sub();
		},
		
		methods: {
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
	.nav {
		display: flex;
		max-width: 960px;
		height: 100%;
		margin: auto;
		display: flex;
		align-items: center;
		line-height: 1;
	}
	ul{
		    list-style-type: disc;
		    margin-block-start: 1em;
		    margin-block-end: 1em;
		    margin-inline-start: 0px;
		    margin-inline-end: 0px;
		    padding-inline-start: 40px;
	}
	
	.nav-item.active, .nav-item:hover {
	    box-shadow: inset 0 -2px currentColor;
	}
	.view-nav .nav-list .nav-item {
	    height: 100%;
	    align-items: center;
	    display: flex;
	    flex-shrink: 0;
	    font-size: 1.16rem;
	    color: #71777c;
	    padding: 0 1rem;
	}
	.nav-item {
	    position: relative;
	    cursor: pointer;
	}
	li {
	    list-style: none;
	}
	user agent stylesheet
	li {
	    display: list-item;
	    text-align: -webkit-match-parent;
	}
</style>
