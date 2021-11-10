import Vue from "vue"
import Vuex from 'vuex'
import QQMapWX from "../static/js/qqmap-wx-jssdk.js"
import {getData} from "../apis"

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		city:"西安市",
		lossSearch:[],
		swiper:[],
		detailLoss:{},//详情失物数据
		detailComment:[], //详情评论数据
		list:[], //全体失物数据
		typeLoss:[],  //每种类型的具体数据
		type:[], //loss页面分类的类型数组
		likes:[], //详情页面的评论点赞数
		userInfo:{}, //通过用户名拿到的用户信息
		isExpired: false, //是否过期，检验token
		commentsNum: 0, //评论数量
		pictureUrl:"", //上传的图片地址
		isPub: false,
		code: "",
		mesNum: 0,
		systemNum: 0,
		commentNum: 0,
		likeNum: 0,
		contactNum: 20,
		adminMes:[],
		myPubList: [],
		myFoundList:[],
		chatUserInfo:{},
		historyMes: [],
		offlineMes:[],
		longitude: 0,
		latitude: 0,
		distance: 0, 
		polyline:[],
	},
	//同步方法
	mutations: {
		//发布失物
		submitLoss(state,[time,userid,name,pic,address,type,des]) {
			console.log("开始传输失物数据");
			getData({url:"lost/publoss",data:{"name":name,"pic":pic,"address":address,"type":type,"lossTime":time,"userId":userid,"des":des}}).then(res => {
				if(res.status == "success") {
					state.isPub=true;
					console.log(state.isPub);
					uni.showToast({title:"失物发布成功",icon:"success"});
				} else {
					state.isPub=false;
					uni.showToast({title:"失物发布失败",icon:"error"});
				}
			})
		},
		//提交评论
		submit(state,[lossId,typeId,uid,fatherId,input]) {
			if(fatherId == null) {
				fatherId = 0;
			}
			getData({url:"lcompoment/pubcomment",data:{"com":input,"lossId":lossId,"userId":uid,"type":typeId,"fatherId":fatherId}}).then(res=>{
				if(res.status == "success") {
					state.detailComment = res.data;
					uni.showToast({title:"评论成功",icon:"success"});
					getData({url:"lcompoment/cnum",data:{"lossId":lossId}}).then(res => {
						// console.log("评论数量是：" +res.data);
						if(res.status == "success") {
							state.commentsNum = res.data;
						} 
					});
				} else {
					
					uni.showToast({title:"评论失败",icon:"error"});
				}
			})
		},
		//获取评论数量
		getCommentNum(state,lossId) {
			getData({url:"lcompoment/cnum",data:{"lossId":lossId}}).then(res => {
				// console.log("评论数量是：" +res.data);
				if(res.status == "success") {
					state.commentsNum = res.data;
				} 
			})
		},
	},
	//异步方法
	actions: {
		//获取所有离线消息
		meshistory(context,id) {
			getData({url:"mes/offline",data:{"id":id}}).then(res =>{
				if(res.status == "success") {
					console.log("获取离线的聊天消息，系统消息成功");
					context.state.offlineMes = res.data;
				} else {
					console.log("获取离线的聊天消息，系统消息失败");
					context.state.offlineMes = [];
				}
			})
		},
		checkToken(context,[token,username]) {
			getData({url:"user/check",data:{"token":token}}).then(res => {
				
				if(res.status=="success") {
					console.log("检查token，登录未过期");
					context.state.isExpired = true;
					getData({url:"user",data:{"username":username}}).then(res=>{
						if(res.status=="success") {
							console.log("获取到用户信息");
							context.state.userInfo = res.data; 
						} else {
							state.userInfo = {};
						}
					})
				} else {
					context.state.isExpired = false;
					// 提示未登录，跳转登录页面
					console.log("token过期了");
					uni.showToast({
						title:"未登录，请登录",
						icon:"error"
					});
					setTimeout(function () {
					    uni.hideToast();
						uni.switchTab({
							url:"/pages/user/user"
						})
					}, 1000);
				}
			})
		},
		//获取用户信息
		getUserInfo(state,username) {
			console.log("用户名：" + username);
			getData({url:"user",data:{"username":username}}).then(res=>{
				if(res.status=="success") {
					console.log("获取到用户信息");
					state.userInfo = res.data; 
				} else {
					state.userInfo = {};
				}
			})
		},
		login(context,[code,user]) {
			console.log(code);
			console.log(user.nickName);
			console.log(user.avatarUrl);
			console.log(user.gender);
			getData({url:"user/code",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",data:{"code":code,"nickName":user.nickName,"addressUrl":user.avatarUrl,"sex":user.gender}}).then(res=>{
				if(res.status == "success") {
					context.state.userInfo = res.data;
					context.state.isExpired = true;
					uni.setStorageSync('token', res.data.token);
					uni.showToast({title:"登录成功"});
				}else {
					uni.showToast({title:res.data,icon:"error"});
				}
			})
		},
		history(context,[fromid,toid]){
			getData({url:"mes/history",data:{"fromId":fromid,"toId":toid}}).then(res =>{
				if(res.status == "success") {
					console.log("获取到历史消息");
					context.state.historyMes = res.data;
				} else {
					console.log("没有聊天记录");
					context.state.historyMes  = [];
				}
					
			})
		},
		//根据用户id拿到聊天用户信息
		getChatUser(context,id) {
			getData({url:"user",data:{"id":id}}).then(res => {
				console.log(res);
				if(res.status == "success") {
					// 拿到拾取人信息
					context.state.chatUserInfo = res.data;
				} else {
					uni.showToast({titlt:"系统故障"});
				}
			})
		},
		getUserFound(context,id) {
			console.log(id);
			getData({url:"found/mpub/" + id}).then(res=>{
				console.log(res);
				if(res.status == "success") {
					context.state.myFoundList = res.data;
				} else {
					context.state.myFoundList = [];
					uni.showToast({title:"未有寻求帮助"});
				}
			})
		},
		//获取用户发布失物招领
		getUserLoss(context,id) {
			console.log(id);
			getData({url:"lost/mpub/" + id}).then(res => {
				console.log(res);
				if(res.status =="success") {
					context.state.myPubList = res.data;
				}else {
					context.state.myPubList = [];
					uni.showToast({title: "感人事迹待发现"});
				}
			})
		},
		getCode(context,mail) {
			getData({url:"user/mcode",data:{"mail":mail+"@qq.com"}}).then(res=>{
				if(res.status == "success") {
					context.state.code = res.data;
				}else {
					context.state.code = "";
				}
			})
		},
		updateName(context,[name,id]) {
			getData({url:"user",method:"PUT",header:{"content-type":"application/x-www-form-urlencoded"},data:{"name":name,"id":id}}).then(res =>{
				if(res.status == "success") {
					uni.showToast({title:"修改成功"});
					setTimeout(function() {
						uni.navigateBack({url:"/pages/UserDetail/UserDetail"});
					}, 1000);
					
				} else {
					uni.showToast({title:res.data});
				}
			})
		},
		updateSex(context,[sex,id]) {
			getData({url:"user",method:"PUT",header:{"content-type":"application/x-www-form-urlencoded"} ,data:{"sex":sex,"id":id}}).then(res =>{
				if(res.status == "success") {
					uni.showToast({title:"修改成功"});
					setTimeout(function() {
						uni.navigateBack({url:"/pages/UserDetail/UserDetail"});
					}, 1000);
				} else {
					uni.showToast({title:"修改失败"});
				}
			})
		},
		updateqq(context,[qq,id]) {
			getData({url:"user",method:"PUT",header:{"content-type":"application/x-www-form-urlencoded"} ,data:{"qq":qq,"id":id}}).then(res =>{
				if(res.status == "success") {
					uni.showToast({title:"修改成功"});
					setTimeout(function() {
						uni.navigateBack({url:"/pages/UserDetail/UserDetail"});
					}, 1000);
				} else {
					uni.showToast({title:"修改失败"});
				}
			})
		},
		//提交实名认证
		subAuth({context},[id,name,num,tel,collage,clazz]) {
			getData({url:"user/auth",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",data:{"uid":id,"name":name,"number":num,"tel":tel,"collage":collage,"clazz":clazz}}).then(res=>{
				console.log(res);
				if(res.status =="success") {
					uni.showToast({title:"认证成功",icon:"success"});
					setTimeout(function() {
						uni.navigateBack({url: "/pages/UserDetail/UserDetail"});
					}, 2000);
				}else {
					uni.showToast({title:res.data,icon:'error'});
				}
			})
		},
		//发布寻物
		submitFound({context},[time,userid,name,pic,address,type,des]) {
			console.log("开始传输寻物数据");
			getData({url:"found/pubfound",data:{"name":name,"pic":pic,"address":address,"type":type,"lossTime":time,"userId":userid,"des":des}}).then(res => {
				if(res.status == "success") {
					context.state.isPub=true;
					uni.showToast({title:"寻物发布成功",icon:"success"});
				} else {
					context.state.isPub=false;
					uni.showToast({title:"寻物发布失败",icon:"error"});
				}
			})
		},
		//认领
		claim(context,[uid,lossId]) {
			getData({url:"lost/claim",data:{"lossId":lossId,"userId":uid}}).then(res =>{
				if(res.status == "success") {
					uni.showToast({title:"申请成功，等待管理员审核",icon:"success"});
				}else {
					uni.showToast({title:"申请失败，系统错误",icon:"error"});
				}
			})
		},
		//根据类型获取数据
		getLossByType(context,id) {
			getData({url:"lost/type/"+id}).then(res=>{
				if(res.status=="success"){
					context.state.typeLoss = res.data;
				}else {
					context.state.typeLoss = [];
					uni.showToast({title:"没有该类型失物",icon:"error"});
				}
			})
		},
		
		//获取所有类型
		getType(context) {
			getData({url:"type"}).then(res=>{
				console.log("开始获取所有类型");
				console.log(res);
				if(res.status == "success") {
					context.state.type=res.data;
				} else {
					context.state.type=[];
				}
			})
		},
		//打开地图
		arrive({context},[la,lo]) {
			let qqmapsdk = new QQMapWX({
				key: "JX6BZ-2QJEI-JICGR-5ENQ5-RFLV5-XVBND"
			});
			/* uni.openLocation({
				latitude: 34.382513,
				longitude: 108.978624,
				success: function () {
					console.log('success 打开地图'); */
					console.log("开始进行路线规划");
					qqmapsdk.direction({
					      mode: 'walking',
					      from: {
							latitude: la,
							longitude: lo,
						  },
					      to: '34.382513,108.978624', 
					      success: function (res) {
					        console.log(res);
					        var ret = res;
					        var coors = ret.result.routes[0].polyline, pl = [];
					        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
					        var kr = 1000000;
					        for (var i = 2; i < coors.length; i++) {
					          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
					        }
					        //将解压后的坐标放入点串数组pl中
					        for (var i = 0; i < coors.length; i += 2) {
					          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
					        }
					        console.log(pl)
					        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
							context.state.latitude = pl[0].latitude;
							context.state.longitude = pl[0].longitude;
							context.state.polyline =  [{
					            points: pl,
					            color: '#FF0000DD',
					            width: 4,
								arrowLine: true,
								
					          }];
					      },
					      fail: function (error) {
					        console.error(error);
					      },
					      complete: function (res) {
					        console.log(res);
					      }
					    });
			/* 	}
			}); */
			
		},
		//获取城市
		getCity(context) {
			//检查授权
			// uni.authorize({
			// 	scope: 'scope.userLocation',
			// 	success(){ //已经授权
					//实例化sdk
					let qqmapsdk = new QQMapWX({
						key: "JX6BZ-2QJEI-JICGR-5ENQ5-RFLV5-XVBND"
					});
					//拿到当前的经纬度
					uni.getLocation({
						type: 'gcj02',
						geocode: true,
						success:(res) => {
							context.state.longitude = res.longitude;
							context.state.latitude = res.latitude;
							qqmapsdk.reverseGeocoder({ //经纬度转换为地址
								location: {
									latitude: res.latitude,
									longitude: res.longitude
								},
								success: (res)=> {
									context.state.city=res.result.address_component.city;
									console.log(context.state.city);
								}
							})
						}
					});
					
			// 	},
			// 	fail: (res) => { //未授权
			// 		uni.showToast({
			// 			title:"将要获取您的位置，否则功能无法使用",
			// 			icon: ""
				
			// 		})
			// 	}
			// })
		},
		//获取搜索数据
		search(context,params) {
			getData({url:"lost",data:{s:params}})
				.then(res => {
					console.log(res);
					if(res.status == "success") {
						context.state.lossSearch=res.data;
					}else {
						context.state.lossSearch=[];
						uni.showToast({title:"没有相关结果",icon:"error"});
					}
				});
		},
		//获取轮播图
		myswiper(context) {
			getData({url:"lost/all"})
				.then(res=>{
					console.log(res);
					if(res.status == "success") {
						context.state.swiper=res.data;
					} else {
						uni.showToast({title:"获取失败",icon:"error"});
					}
				});
				setTimeout(function () {
				    uni.hideToast();
				}, 1000);
		},
		//失物的详情
		detailLoss(context,id) {
			console.log("获取详情");
			getData({url:"lost/detail/"+id}).then(res=>{
				console.log(res);
				if(res.status=="success") {
					context.state.detailLoss = res.data;
				}else {
					context.state.detailLoss = [];
					uni.showToast({title:res.data,icon:"error"});
				}
			})
		},
		//失物的评论
		detailComment(context,id) {
			console.log("获取评论");
			getData({url:"lcompoment",data:{"id":id}}).then(res=>{
				console.log(res);
					if(res.status=="success") {
						context.state.detailComment = res.data;
					} else {
						context.state.detailComment = [];
					}
					console.log(context.state.detailComment);
				})
		},
		//获取点赞数
		getLikes(context,id) {
			getData({url:"lcompoment/get/like",data:{"lossId":id}}).then(res=>{
				if(res.status =="success") {
					console.log(res);
					context.state.likes = res.data;
				}else {
					
				}
			})
		},
		getAll(context) {
			getData({url:"lost/list"}).then(res=>{
				console.log(res);
				if(res.status=="success"){
					context.state.list = res.data;
				} else {
					uni.showToast({title:res.data,icon:"error"});
				}
			});
			setTimeout(function () {
			    uni.hideLoading();
			}, 1000);
		}
		
	}
})

	