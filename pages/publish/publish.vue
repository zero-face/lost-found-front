<template>
	<!-- <u-overlay show="true" @click="show = false">
		<view style="display: flex; height: 100vh; position: fixed;z-index:999;right: 15rpx; 
		bottom:0;left: 0rpx;">
			<view style="height: 200rpx; width: 200rpx;">
				<image style="height: 150rpx; width: 150rpx;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqAPJRAkSm3swZ6laKYbkgFQZsQDnMURDeFQ&usqp=CAU">寻物启示</image>
			</view>
			<view style="height: 200rpx; width: 200rpx;">
				<image style="height: 150rpx; width: 150rpx;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMlOXlWk_1k3mIRzkr9NJPBiQ8XqQWHVg5Lw&usqp=CAU">失物招领</image>
			</view>
		</view>
	</u-overlay> -->
	<view>
		<view>
			<u-navbar
				title="消息发布"
				border
				titleWidth="300"
				safeAreaInsetTop
				height="50"
				bgColor="#00aa7f"
				disLeft="false"
			>
			</u-navbar>
		</view>
		 <u-notice-bar :text="meslist" mode="closable" url="/pages/componentsB/tag/tag"></u-notice-bar>
		<!-- <u-notice-bar mode="closable" type="warning" :is-circular="true" :text="meslist"></u-notice-bar> -->
		<view>
				<u-subsection width="20rpx" @change="sectionChange" bgColor="#72c35b" active-color="#ff9900" animation mode="button" :list="list" :current="current"></u-subsection>
		</view>
		<!-- 表单 -->
		<view class="form">
			<u--form 
			:model="form" 
			ref="uForm" 
			:error-type="errorType" 
			labelPosition="bottom">
				<u-form-item border-bottom leftIconStyle="margin:0" leftIcon="bag" label="物品名称" prop="name" label-width="200">
					<u--input v-model="form.name" placeholder="请输入物品名称"/>
				</u-form-item>
				
				<u-form-item border-bottom label-position=top leftIconStyle="margin:0" left-icon="coupon" label="拾取(丢失)地点" prop="address" label-width="200">
					<u--input v-model="form.address" type="text" placeholder="请详细描述拾取(丢失)地址"/>
				</u-form-item>
				
				<u-form-item border-bottom label-position=top leftIconStyle="margin:0" left-icon="calendar" label="拾取(丢失)时间" prop="time" label-width="200">
					<view>{{selectedTime}}</view>
					
					<u--input v-model="value2" type="text" placeholder="请选择拾取(丢失)时间" />
					<u-datetime-picker
						ref="datetimePicker"
						:show="shows"
						v-model="value1"
						mode="datetime"
						title="选择时间"
						:formatter="formatter"
						 @confirm="selectTime"
						 @cancel="pclose"
					></u-datetime-picker>
					<u-button @click="shows = true" :ripple="true" plain hair-line="false" size="mini" shape="square" type="primary">选择时间</u-button>
				</u-form-item>
				
				<u-form-item border-bottom label-position=top leftIconStyle="margin:0" left-icon="attach" label="物品描述" prop="des" label-width="200">
					<u--input v-model="form.des" type="text" placeholder="请尽可能描述物品特征" />
				</u-form-item>
				
				<view>
					<u-form-item border-bottom label-position=top leftIconStyle="margin:0" left-icon="list" label="物品类型" label-width="200">
						<u--input  v-model="selectType" type="text" placeholder="请选择物品类型" />
						<u-picker title="失物类型" @confirm="confir" :show="show" :columns="type" keyName="type"></u-picker>
						<!-- <u-picker @confirm="confir" title="失物类型" :range="type"  range-key="type" :default-selector='[0]' :show="show" mode="selector"></u-picker>						 -->
						<u-button :ripple="true" plain size="mini" shape="square" type="primary" @click="clicki">选择类型</u-button>
					</u-form-item>
				</view>
			
			</u--form>
		
			<view>
				<u-upload
					:fileList="fileList3"
					@afterRead="afterRead"
					@delete="deletePic"
					name="picture"
					multiple
					:maxCount="1"
					:previewFullImage="true"
				></u-upload>
			</view>
			<view>
				<u-button :ripple="true"  size="default" shape="square" type="primary" @click="submit(form.type, userInfo.id, isPub)">发布</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectType:"",
				col:[["zhongguo","riben"]],
				value1: Number(new Date()),
				value2: "",
				action:"http://123.57.220.238:8888/api/v1/lost/upload",
				pictureUrl: "",
				token:"",
				list: [
					"失物",
					"寻物"
				],
				meslist: "请注意：失物发布和寻物发布使用同一个表单，失物发布必须上传照片，寻物发布可以不用上传照片，寻物失物的发布都代表本人，一旦发布认定丢失（寻找人）都是发布者",
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
				show: false, 
				shows: false,
				errorType: ['message', 'border-bottom'],
				rules: {
					'name': [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}],
					'address': [{
						type: 'string',
						required: true,
						message: '请填写地址',
						trigger: ['blur', 'change']
					}],
					'des': [{
						type: 'string',
						required: true,
						message: '请填写描述',
						trigger: ['blur', 'change']
					}],
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
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			// 微信小程序需要用此写法
			this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		onLoad() {
			this.$store.dispatch("getType");
		},
		methods: {
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				if (type === 'hour') {
					return `${value}时`
				}
				if (type === 'minute') {
					return `${value}分`
				}
				return value
			},
			//判断是否登录
			isLogin() {
				// 通过token拿名称再拿到用户信息
				let token = uni.getStorageSync('token');
				let username = this.$userInfo.getUsername();
				// 检验token是否过期
				if(token == undefined) {
					this.$store.state.isExpired = false;
					return;
				}
				this.$store.dispatch("checkToken",[token, username]);
			},
			// errorUpload(res, index, lists, name) {
			// 	console.log(res);
			// },
			// successUpload(data, index, lists, name) {
			// 	if(data.status == "success") {
			// 		this.pictureUrl = data.data;
			// 		uni.showToast({
			// 			title: '图片上传成功',
			// 			icon:"success"
			// 		});
			// 	}else {
			// 		this.pictureUrl = "";
			// 		uni.showToast({
			// 			title: '图片上传失败',
			// 			icon:"error"
			// 		});
			// 	}
				
			// },
			
			selectTime(index) {
				this.shows = false
				var time = new Date(index.value)
				console.log(index.value)
				var v = time.getFullYear() + "年" + time.getMonth() + "月" + time.getDay() +"日" + time.getHours() +"时" +time.getMinutes() + "分"
				this.value2 = v
				this.form.time = index.value
			},
	
			pclose() {
				this.shows = false
				this.value1 = ""
			},
			showTime() {
				this.shows = true
			},
			async submit(type, uid, isPub) {
				console.log("开始验证");
				// this.$refs.uForm.validateField("name","des").then(res => {
					uni.$u.toast('校验通过')
					console.log("验证成功")
					// console.log(res)
					if(this.current == "0") {
						if(this.pictureUrl != null && this.pictureUrl.length > 0) {	
							console.log(this.form.time)
							console.log(this.form.name)
							console.log(this.form.address)
							console.log(this.form.des)
							this.$store.commit("submitLoss",[this.form.time, uid, this.form.name, this.pictureUrl, this.form.address, type, this.form.des]);
							if(isPub == true) {
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
					} else {
						console.log("发布寻物");
						console.log(uid);
						this.$store.dispatch("submitFound",[this.form.time,uid,this.form.name,this.pictureUrl,this.form.address,type,this.form.des]);
						if(isPub == true) {
							this.clear();
							isPub = false;
							console.log("发布成功");
						}else {
							console.log("发布失败");
						}
					}			
				// }).catch(errors => {
					// uni.$u.toast('校验失败')
					// console.log('验证失败')
				// })
				// this.$refs.uForm.validate(valid => {
				// 	console.log(valid)
				// 	if (valid) {
				// 		console.log('验证通过');
						
				// 	} else {
						
				// 	}
				// });
			},
			confir(index) {
				// console.log(index.value[0].type)
				this.show = false
				this.selectType = index.value[0].type
				this.form.type=index.value[0].typeId
			},
			cancelType() {
				this.show = false
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
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// console.log("11111")
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				// let fileListLen = this[`fileList${event.name}`].length
				// lists.map((item) => {
				// 	this[`fileList${event.name}`].push({
				// 		...item,
				// 		status: 'uploading',
				// 		message: '上传中'
				// 	})
				// })
				// console.log('test')
				for (let i = 0; i < lists.length; i++) {
					console.log(lists[i].url)
					const result = await this.uploadFilePromise(lists[i].url)
					// let item = this[`fileList${event.name}`][fileListLen]
					// this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					// 	status: 'success',
					// 	message: '',
					// 	url: result
					// }))
					// fileListLen++
				}
			},
			uploadFilePromise(url) {
				console.log('开始上传图片')
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://82.157.191.65:8888/api/v1/lost/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'picture',
						formData: {
							user: 'test'
						},
						success: (res) => {
							// console.log(res.data)
							res = JSON.parse(res.data)
							// console.log(res.status)
							if (res.status == "success") {
								console.log("图片上传成功")
								this.pictureUrl = res.data;
								uni.showToast({
									title: '图片上传成功',
									icon:"success"
								});
							} else {
								console.log("图片上传失败")
								this.pictureUrl = "";
								uni.showToast({
									title: '图片上传失败',
									icon:"error"
								});
							}
						},
					});
				})
			},
		}
	}
</script>

<style lang="scss">
</style>
