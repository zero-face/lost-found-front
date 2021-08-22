<template>
	<view>
		<view>
				<u-navbar @custom-back="back" title-bold back-text="返回" title="基本信息修改">
					<view>
						<u-button @click="save(id,code,userInfo.id)" style="margin-left:500rpx" size="mini" type="primary">保存</u-button>
					</view>
					
				</u-navbar>
				
		</view>
		
		<view v-if="id!=4">
			<u-cell-group>
				
				<u-cell-item title="">
					<u-input type="text" v-model="input"></u-input>	
				</u-cell-item>
				
			</u-cell-group>
		</view>
		<view v-else>
			<u-cell-group>
				
				<u-cell-item title="">
					<u-input type="text" v-model="input"></u-input>	
				</u-cell-item>
				
			</u-cell-group>
			<view>
				<u-form-item label="请输入验证码:" label-position="top">
					<u-toast ref="uToast"></u-toast>
						<u-verification-code seconds="60" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
				</u-form-item>
				<view> 
				<!-- 二维码输入框 -->
					<u-message-input width="40rpx" @finish="finish" :maxlength="6"></u-message-input>
					<view>
						<u-button type="primary" @tap="getCode">{{tips}}</u-button>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				id: 0,
				input: "",
				codes: "",
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			},
			code() {
				return this.$store.state.code;
			}
		},
		methods: {
			finish(e) {
				this.codes = e;
			},
			save(id,code,uid) {
				console.log(uid);
				if(id == 2) {
					this.$store.dispatch("updateName",[this.input,uid]);
				} else if(id == 3) {
					this.$store.dispatch("updateSex",[this.input,uid]);
				} else {
					if(code == this.codes) {
						this.$store.dispatch("updateqq",[this.input,uid]);
					}
					else {
						uni.showToast({title: "验证码不正确"});
					}
				}
				
			},
			back() {
				uni.navigateBack({
					url: "../UserDetail/UserDetail"
				})
			},
			codeChange(text) {
							this.tips = text;
						},
						getCode() {
							if(this.$refs.uCode.canGetCode) {
								this.$store.dispatch("getCode",this.input);
								uni.showLoading({
									title: '正在获取验证码'
								})
								setTimeout(() => {
									uni.hideLoading();
									// 这里此提示会被this.start()方法中的提示覆盖
									this.$u.toast('验证码已发送');
									// 通知验证码组件内部开始倒计时
									this.$refs.uCode.start();
								}, 1500);
							} else {
								this.$u.toast('倒计时结束后再发送');
							}
						},
						end() {
							this.$u.toast('倒计时结束');
						},
						start() {
							this.$u.toast('倒计时开始');
						}
		},
		onShow() {
		},
		onLoad(e) {
			this.id = e.id;
			this.input = e.text;
		}
	}
</script>

<style>

</style>
