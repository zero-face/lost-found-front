<template>
	<view>
		<view>
			<u-navbar :title="chatUserInfo.nickName"></u-navbar>
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
			
		},
		onLoad(e) {
			this.$store.dispatch("getChatUser",e.id);
		},
		computed: {
			chatUserInfo() {
				return this.$store.chatUserInfo;
			}
		},
	}
</script>

<style>

</style>
