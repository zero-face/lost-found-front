<template>
	<view>
		<view>
			<u-navbar
			
			back-icon-color="#fff" 
			:background="background" 
			title="消息发布"
			:is-back=false
			title-color="#fff" 
			title-bold	
			></u-navbar>
		</view>
		<u-notice-bar type="warning" mode="horizontal" :is-circular="true" :list="meslist"></u-notice-bar>
		<view >
				<u-subsection width="20rpx" @change="sectionChange" bgColor="#72c35b" active-color="#ff9900" animation mode="button" :list="list" :current="current"></u-subsection>
		</view> 
		<!-- //表单 -->
		<view  class="form">
			<u-form :model="form" ref="uForm" :error-type="errorType">
					<!-- //物品名称 -->
					<u-form-item label-position=top border-bottom left-icon="bag" label="物品名称" prop="name">
						<u-input v-model="form.name" placeholder="请输入物品名称"/>
					</u-form-item>
					<!-- //物品拾取地点 -->
					<u-form-item label-position=top left-icon="coupon" label="拾取(丢失)地点" prop="address">
						<u-input v-model="form.address" type="text" placeholder="请详细描述拾取(丢失)地址"/>
					</u-form-item>
					<!-- //拾取时间 -->
					<u-form-item label-position=top left-icon="calendar" label="拾取(丢失)时间" prop="time">
						<u-input v-model="selectedTime" type="text" placeholder="请选择拾取(丢失)时间" ></u-input>
						<u-picker @confirm="selectTime" :params="params" title="选择时间" v-model="shows" mode="time"></u-picker>
						<u-button @click="showTime" :ripple="true" plain size="mini" shape="square" type="primary">选择时间</u-button>
						
					</u-form-item>
					<!-- //描述物品 -->
					<u-form-item label-position=top left-icon="attach" label="物品描述" prop="des">
						<u-input v-model="form.des" type="text" placeholder="请尽可能描述物品特征" />
					</u-form-item>
					
					<!-- 选择物品类型 -->
					<view>
						<u-form-item label-position=top left-icon="list" label="物品类型">
							<u-input  v-model="type[form.type].type" type="text" placeholder="请选择物品类型" ></u-input>
							<u-picker @confirm="confir" title="失物类型" :range="type"  range-key="type" :default-selector='[0]' v-model="show" mode="selector"></u-picker>						
							<u-button :ripple="true" plain size="mini" shape="square" type="primary" @click="clicki">选择类型</u-button>
						</u-form-item>
						
					</view>
					
					
				</u-form>
				<!-- //选择图片 -->
				
				<u-upload @on-error="errorUpload" @on-success="successUpload" name="picture" max-count="1" :action="action"></u-upload>
			<view>
				<u-button :ripple="true"  size="default" shape="square" type="primary" @click="submit(type[form.type].id,userInfo.id,isPub)">发布</u-button>
			</view>
			<!-- //选择失物还是寻物 -->
			<view>
				
			</view>
		</view>
	
			
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action:"http://localhost:8888/api/v1/lost/upload",
				pictureUrl: "",
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				
				fileList: [], //默认的上传图片，无用
				list: [
					"失物",
					"寻物"
				],
				meslist: [
					"请注意：失物发布和寻物发布使用同一个表单，失物发布必须上传照片，寻物发布可以不用上传照片，寻物失物的发布都代表本人，一旦发布认定丢失（寻找人）都是发布者"
				],
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'},
				current: 0,
				form: {
					name: '',
					des: '',
					time: '',
					type: 0,
					address:""
				},
				selectedTime: "",
				show: false, //是否打开类型选择器
				shows: false,
				errorType: ['message', 'border-bottom'],
				rules: {
					name: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					des: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					time: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					address: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					]
				},
				
			}
		},
		computed: {
			isPub() {
				return this.$store.state.isPub;
			},
			type() {
				return this.$store.state.type;
			},
			userInfo() {
				return this.$store.state.userInfo;
			},
			isExpired() {
				return this.$store.state.isExpired;
			}
		},
		onShow() {
			/* //通过token拿名称再拿到用户信息
			let username = this.$userInfo.getUsername();
			// #ifdef  H5
			let token = localStorage.getItem("token");
			// #endif
			// #ifdef  MP-WEIXIN
			let token = this.data.token;
			// #endif
			this.$store.dispatch("checkToken",token);
			this.$store.dispatch("getUserInfo",username);
			this.$store.dispatch("getType"); */
		},
		onReady() {
				this.$refs.uForm.setRules(this.rules);//规范检查
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
			this.$store.dispatch("getUserInfo",username);
			this.$store.dispatch("getType");
		},
		methods: {
			errorUpload(res, index, lists, name) {
				console.log(res);
			},
			successUpload(data, index, lists, name) {
				if(data.status == "success") {
					this.pictureUrl = data.data;
					uni.showToast({
						title: '图片上传成功',
						icon:"success"
					});
				}else {
					this.pictureUrl = "";
					uni.showToast({
						title: '图片上传失败',
						icon:"error"
					});
				}
				
			},
			selectTime(index) {
				this.form.time = index.year +"-" + index.month +"-"+ index.day;
				this.selectedTime = index.year +"年" + index.month + "月"+ index.day + "日" + index.hour + "时" + index.minute + "分";
			},
			showTime() {
				this.shows = true;
			},
			submit(type,uid,isPub) {
				this.$refs.uForm.validate(valid => {
					let token = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ6ZXJvIiwiZXhwIjoxNjI5NjQ3NDc4LCJpYXQiOjE2Mjk1NjEwNzgsInVzZXJuYW1lIjoiemVybyJ9.TZpkvPLlrxLyAcR4apWpoojcGrTWVVvmSPHHRjY_EFyamQ1Rawd7QWy9toetOMN6QvkZgkwxOdUvV-6KD8XO_8DL927bvAsTrI_HMII7yqz8QLV2kjhZMZQjNY-Tuss4ZyGJYbypX06vwfd6frnw45PxGbAdGiG3plMM7ABzsy8";
					localStorage.setItem("token",token);
								if (valid) {
									console.log('验证通过');
									//发布失物
									if(this.current == "0") {
										if(this.pictureUrl!=null && this.pictureUrl.length > 0) {
																		
										this.$store.dispatch("submitLoss",[Date.parse(this.form.time),uid,this.form.name,this.pictureUrl,this.form.address,type,this.form.des]);
										if(isPub) {
											this.clear();
											isPub=false;
											console.log("发布成功");
										}else {
											console.log("发布失败");
										}
										
										} else {
											uni.showToast({
												title:"图片上传失败",icon:"warning"
											});
											setTimeout(function (){
												uni.hideToast();
											},1000);
										}     
									}
									//发布寻物
									else {
										console.log("发布寻物");
										console.log(uid);
										this.$store.dispatch("submitFound",[Date.parse(this.form.time),uid,this.form.name,this.pictureUrl,this.form.address,type,this.form.des]);
										if(isPub) {
											this.clear();
											isPub=false;
											console.log("发布成功");
										}else {
											console.log("发布失败");
										}
									}
								} else {
									console.log('验证失败');
								}
							});
			},
			confir(index) {
				this.index = index[0];
				this.form.type=index[0];
			},
			clicki() {
				this.show = true;
			},
			sectionChange(index) {
				this.current = index;
				this.clear();
			},
			clear() {
				this.form.time="",
				this.form.name="",
				this.pictureUrl="", 
				this.form.address="",
				this.form.type=0,
				this.selectedTime="",
				this.form.des="";	
			}
		}
	}
</script>

<style lang="scss">
	.form {
		
	}
</style>
