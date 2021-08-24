<template>
	<view>
		<view>
			<u-form :model="form" ref="uForm" :error-type="errorType">
			<u-cell-group >
				<u-form-item prop="name">
					<u-cell-item title="真实姓名" required>
						<input :disabled="use" :focus="use" v-model="form.name" type="text" :placeholder="userInfo.trueName"/>
					
					</u-cell-item>
				</u-form-item>
				<u-form-item prop="number">
					<u-cell-item title="学号" required>
						<input :disabled="use" v-model="form.number" type="text" :placeholder="userInfo.number"/>
					</u-cell-item>
				</u-form-item>
				<u-form-item prop="tel">
					<u-cell-item title="电话" required>
						<input :disabled="use" v-model="form.tel" type="text" :placeholder="userInfo.tel"/>
					</u-cell-item>
				</u-form-item>
				<u-form-item prop="collage">
					<u-cell-item title="学院" required>
						<input :disabled="use" v-model="form.collage" type="text" :placeholder="userInfo.collage"/>
					</u-cell-item>
				</u-form-item>
				<u-form-item prop="clazz">
					<u-cell-item title="班级" required>
						<input :disabled="use" v-model="form.clazz" type="text" :placeholder="userInfo.clazz"/>
					</u-cell-item>
				</u-form-item>
			</u-cell-group>
			</u-form>
			<view>
				
				<button v-if="isAuth == 'true'" type="warn" @click="update(userInfo)">修改</button>
				<button v-else type="primary" @click="submit">认证</button>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				use: false,
				errorType: ['message', 'border-bottom'],
				form:{
					name:"",
					number:"",
					tel:"",
					collage:"",
					clazz:""
				},
				isAuth: "false",
				id:"",
				rules: {
					name: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					number: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					tel: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					collage: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					clazz: [
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
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);//规范检查
		},
		onLoad(id) {
			console.log(id.isTrue);
			this.id = id.id;
			this.isAuth = id.isTrue;
			if(id.isTrue == "true") {
				this.use = true;
				uni.showToast({title:"您已经实名认证"});
			}
			
		},
		methods: {
			update(userInfo) { //更改实名信息 到那时仍然让没改的信息保持到表单中
				this.use=false;
				this.isAuth = false;
				this.form.number = userInfo.number;
				this.form.name = userInfo.trueName;
				this.form.tel = userInfo.tel;
				this.form.collage = userInfo.collage;
				this.form.clazz=userInfo.clazz;
			},
			submit() { //认证
				this.$refs.uForm.validate(valid => {
					if(valid) {
						this.$store.dispatch("subAuth",[this.id,this.form.name,this.form.number,this.form.tel,this.form.collage,this.form.clazz]);
					}else {
						console.log("验证失败");
					}
				})
			}
		}
	}
</script>

<style>

</style>
