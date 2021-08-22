<template>
	<view>
		<view>
			<u-cell-group title="基本信息" >
					<u-cell-item title="头像" @click="update(1)">
						<image style="width: 150rpx; height: 100rpx; background-color: #eeeeee;" mode="aspectFill" :src="userInfo.addressUrl"></image>
					</u-cell-item>
					<u-cell-item @click="update(2,userInfo.nickName)" title="昵称" :value="userInfo.nickName"></u-cell-item>
					<u-cell-item @click="update(3,userInfo.sex)" title="性别" :value="userInfo.sex"></u-cell-item>
					<u-cell-item @click="update(4,userInfo.qq)" title="qq" :value="userInfo.qq"></u-cell-item>
			</u-cell-group>
			<view v-if="userInfo.isTrue == true">
				<u-cell-group title="实名信息">
					<u-cell-item title="真实姓名" :value="userInfo.trueName"></u-cell-item>
					<u-cell-item title="学号" :value="userInfo.number"></u-cell-item>
					<u-cell-item title="电话" :value="userInfo.tel"></u-cell-item>
					<u-cell-item title="学院" :value="userInfo.collage"></u-cell-item>
					<u-cell-item title="班级" :value="userInfo.clazz"></u-cell-item>
				</u-cell-group>
			</view>
			<view v-else>
				<button type="primary" @click="auth(userInfo.id)">实名认证</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id : 0,
				avatar:"",
			}
		},
		onShow() {
			this.updateUserInfo();
		},
		onLoad(e) {
			this.updateUserInfo();
			this.id = e.id;
		},
		onPullDownRefresh() {
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
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			},
			isExpired() {
				return this.$store.state.isExpired;
			}
		},
		created() {
					// 监听从裁剪页发布的事件，获得裁剪结果
					uni.$on('uAvatarCropper', path => {
						this.avatar = res.data;//保存头像地址 = path;
						// 可以在此上传到服务端
						uni.uploadFile({
							url: 'http://localhost:8888/api/v1/lost/upload',
							filePath: path,
							name: 'picture',
							complete: (res) => {
								console.log(res.data);
								this.avatar = res.data;//保存头像地址
							}
						});
					})
				},
		methods: {
			//更改基本信息
			update(id,text) {
				if(id !=1) {
					uni.navigateTo({
						url: "../userUpdate/userUpdate?id=" + id + "&text=" +text,
					});
				}
				
			},
			updateUserInfo() {
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
				
			},
			auth(id) {
				console.log("实名认证id："+id);
				uni.navigateTo({
					url: '../auth/auth?id=' + id
				})
			}
		}
	}
</script>

<style>

</style>
