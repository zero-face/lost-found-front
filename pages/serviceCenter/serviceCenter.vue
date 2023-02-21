<template>
	<view>
		<!-- 自定义导航栏 -->
		<view>
			<u-navbar height="50" is-fixed title="客服中心"></u-navbar>
		</view>
		<view>
			<button open-type="share" @click="test()">点击</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			test() {
				console.log("开始分享")
				
				
				
				// uni.share({
				// 	provider: "weixin",
				// 	scene: "WXSceneTimeline",
				// 	type: 1,
				// 	title: "uni-app分享",
				// 	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				// 	success: function (res) {
				// 		console.log("success:" + JSON.stringify(res));
				// 	},
				// 	fail: function (err) {
				// 		console.log("fail:" + JSON.stringify(err));
				// 	}
				// });
			}
		}
	}
</script>

<style>

</style>
