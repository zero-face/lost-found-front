<template>
	<view class="content">
		<!-- 搜索栏 -->
		<u-gap height="1" bgColor="#fff"></u-gap>
		<view style="background-color: #aaaa7f;  height: 100rpx; display: flex;justify-content: left; align-items: center;">
			
		 <view @click="poiShow=true" style="
			text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap; display: flex; justify-content: center; align-items: center; margin-left: 20rpx; width: 25%;">
			 <text style="color: #fff;">{{street}}</text>
			 <view style="margin-left: 5rpx;">
				 <u-icon name="arrow-down-fill" color="#fff" size="15"></u-icon>
			 </view>
			 
		 </view>	
		 <view style="margin-left: 20rpx; width: 65%;">
			<u-search  shape="square"
			   placeholder="想找什么? 搜索一下"
			   v-model="keyword"
			   :showAction="false"
			   bgColor="#fff"
			></u-search>
		 </view>
		<!-- 位置弹出层 -->
		<u-popup :show="poiShow"
		 closeable
		 closeIconPos="top-left"
		 zIndex="50000"

		 @close="poiShow=false"
		 @open="open">
		            <view style="height: 100vh;">
		                <view style="height: 80rpx; border-bottom: #eee 1rpx solid; text-align: center; line-height: 80rpx;">
							选择位置
						</view>
						<view style="margin: 30rpx 20rpx 10rpx 30rpx;">
							<view style="display: flex;">
								<text>当前位置:</text>
								<view style="margin-left: 20rpx; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; ">{{address}}</view>
							</view>
							<view style="display: flex; justify-content: left; align-items: center; line-height: 80rpx; margin-top: 20rpx;">
								<view style="width: 220rpx; height: 80rpx; background-color: #eee;  text-align: center; line-height: 80rpx; color: #909090;">
									<text>{{street}}</text>
								</view>
								
							</view>
							
						</view>
		            </view>
				</u-popup>
		</view>
		<!-- //轮播图 -->
	<!-- 	<view>
		    <swiper indicator-active-color="#00ff00" indicator-dots indicator-color="rgba(0, 0, 0, .3)" autoplay interval=3000 circular duration=700>
		        <swiper-item v-for="(item,index) in swiper" :key="index">
					<u--image mode="aspectFill" @click="goDetail(item.id)" width="400" height="200" :src="item.pictureUrl"></u--image>
		        </swiper-item>
		    </swiper>
		</view> -->
		<!-- 分栏 -->
		 <!-- <view class="nav" style="background: '#eee';">
			  <ul>
			     <li @click="myclick(1)">
			         <view class="svg-container">
						 <u-icon color="black" size=55rpx name="home" labelSize=30rpx></u-icon>
			         </view>
					 <view class = "text-container">
					 	<text>Home</text>
					 </view>
			     </li>
			     <li @click="myclick(2)">
			         <view class="svg-container">
			            <u-icon color="black" size=63rpx labelSize=30rpx name="search"> </u-icon>
			         </view>
					 <view class = "text-container">
					 	<text>Search</text>
					 </view>
			     </li>
			     <li @click="myclick(3)">
			         <view class="svg-container">
			            <u-icon color="black" size=55rpx labelSize=30rpx  name="list"></u-icon>
			         </view>
					 <view class = "text-container">
					 	<text>Classfy</text>
					 </view>
			     </li>
			   </ul>
		 </view> -->
		
		
		 <!-- 搜索 -->
		 <view v-if="search==true" style="background-color: white; padding: 1rpx 0 1rpx 0;">
			 <u-search focus shape="round" placeholder="请输入关键词" @search="searcher" @custom="searcher" @clear="clear" margin="30rpx 0 30rpx 0"></u-search>
		 </view>
		<!-- 搜索结果 -->
		<view v-if="lossSearch!=[]">
			 <view @click="goDetail(item.id)"  v-for="(item,index) in lossSearch" :key="index">
				 <u-gap height="13" bgColor="#eee"></u-gap>
			 	<view class="all-item">
					 <view class="all-img" @click="goDetail(item.id)">
						 <image :src="item.pictureUrl" mode="aspectFit"></image>
					 </view>
					 <view class="all-nav">
						 <view style="display: flex; height: 50rpx; width: auto;">
							 <view @click="goDetail(item.id)">
								 <u--text mode="text" bold :text="'#' + item.name + '#'"></u--text>
							 </view>
							 <view style="margin-left: auto;line-height: 40rpx;">
								 <u--text prefixIcon="calendar" mode="text" size="13" align="right" :text="item.lossTime"></u--text>
							 </view>
						 </view>
						 <!-- 描述 -->
						 <view style="display: flex; width: 100%; margin-bottom: 10rpx;">
							 <view @click="getUser(item.lossUserId,userInfo.id)" style="background-color: orange; padding: 0 10rpx 0 10rpx; border-radius: 10rpx; margin-right: 10rpx;">
								<u--text iconStyle="30px" color="white" bold mode="text" :text="item.lossNickName"></u--text>
							 </view>
							 <view style="width: auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
								 <u--text bold mode="text" lines="1" :text="item.description"></u--text>
							 </view>
						 </view>
						 <!-- 地址 -->
						 <view style="background-color: #F5DEB3; border-radius: 10rpx; padding: 5rpx; margin-bottom: 10rpx;">
							 <u--text lines="1" color="#D2691E" :text="item.address"></u--text>
						 </view>
						 <view style="height: 6rpx; border-top: 1rpx solid #fff8d8;"></view>
						 <!-- 信息栏 -->
						 <view style="display: flex; margin-top: 7rpx;">
							<view style="display: flex; align-items: center; ">
													 <view style="align-items: center;justify-content: center; margin-left: 10rpx;">
														<u-icon label="0" labelPos="right" labelSize="15" name="chat" size="25"></u-icon>
													 </view> 
													 <view style="align-items: center;justify-content: center; margin-left: 10rpx;">
														<u-icon label="0" labelPos="right" labelSize="15" name="star" size="25"></u-icon>
													 </view>
													 <view style="align-items: center;justify-content: center; margin-left: 10rpx;">
														<u-icon label="0" labelPos="right" labelSize="15" name="share" size="25"></u-icon>
													 </view>
							</view>
							<view class="button" style="">认领</view>
						 </view>
						 
					 </view>
			 	</view>
			 	<u-gap height="10" bgColor="#eee"></u-gap>
				<view v-if="lossSearch == []">
					<u-empty text="所谓伊人，在水一方" mode="search"></u-empty>
				</view>
			</view>
		 </view>
		
		<!-- 全部信息 -->
		<view v-if="home==true" v-for="(item,index) in list" :key="index">
			<u-skeleton avatar avatarSize="100" 
				avatarShape="square" 
				:loading="indexSkeleton"
				rowsWidth="80%"
				rows="4" 
				:animate="true"
				titleHeight="30"
				>
			<u-gap height="13" bgColor="#eee"></u-gap>
			 <view class="all-item">
				 <view class="all-img" @click="goDetail(item.id)">
					 <image :src="item.pictureUrl" mode="aspectFill"></image>
				 </view>
				 <view class="all-nav">
					 <view style="display: flex; height: 50rpx; width: auto;">
						 <view @click="goDetail(item.id)">
							 <u--text mode="text" bold :text="'#' + item.name + '#'"></u--text>
						 </view>
						 <view style="margin-left: auto;line-height: 40rpx;">
							 <u--text prefixIcon="calendar" mode="text" size="13" align="right" :text="item.lossTime"></u--text>
						 </view>
					 </view>
					 <!-- 描述 -->
					 <view style="display: flex; width: 100%; margin-bottom: 10rpx;">
						 <view @click="getUser(item.lossUserId,userInfo.id)" style="background-color: orange; padding: 0 10rpx 0 10rpx; border-radius: 10rpx; margin-right: 10rpx;">
							<u--text iconStyle="30px" color="white" bold mode="text" :text="item.lossNickName"></u--text>
						 </view>
						 <view style="width: auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
							 <u--text bold mode="text" lines="1" :text="item.description"></u--text>
						 </view>
					 </view>
					 <!-- 地址 -->
					 <view style="background-color: #F5DEB3; border-radius: 10rpx; padding: 5rpx; margin-bottom: 10rpx;">
						 <u--text lines="1" color="#D2691E" :text="item.address"></u--text>
					 </view>
					 <view style="height: 6rpx; border-top: 1rpx solid #fff8d8;"></view>
					 <!-- 信息栏 -->
					 <view style="display: flex; margin-top: 7rpx;">
						<view style="display: flex; align-items: center; ">
							 <view style="align-items: center;justify-content: center; margin-left: 10rpx;">
								<u-icon label="0" labelPos="right" labelSize="15" name="chat" size="25"></u-icon>
							 </view> 
							 <view style="align-items: center;justify-content: center; margin-left: 10rpx;">
								<u-icon label="0" labelPos="right" labelSize="15" name="star" size="25"></u-icon>
							 </view>
							 <view style="align-items: center;justify-content: center; margin-left: 10rpx;">
								<u-icon label="0" labelPos="right" labelSize="15" name="share" size="25"></u-icon>
							 </view>
						</view>
						<view class="button" @click="claim(userInfo.id,item.id)">认领</view>
					 </view>
				 </view>
			 </view>
			 </u-skeleton>
		</view>
		
		<!-- 按类型展示 -->
		 <view v-if="classfy==true" class="ld">
			 <!-- 类型 -->
			 <view class="left">
				<view  v-for="(item,index) in type" :key="index">
					<view :class="{active:index===currentNum}"  style="border-radius: 30rpx 0rpx 0rpx 30rpx;">
						<view class="title" @click="getLossByType(item.typeId)">
							{{item.type}}
						</view>
					</view>
				</view>
			 </view>
			 <!-- 分类图片 -->
			 <view class="right">
				<scroll-view 
				enable-flex="true"
				style="white-space: nowrap; height:650rpx" 
				scroll-y="true">
						<view class =type v-for="(it,idx) in typeLoss" :key="idx">
							<view class="type-image">
								 <u-image mode="aspectFit" @click="goDetail(it.id)" width="200rpx" height="200rpx" :src="it.pictureUrl">
								 	<view slot="error" style="font-size: 24rpx;">失物图片丢失了</view>
								 </u-image>
							 </view>
							
							<view class="type-text">
								<text style="font-size: 30rpx;font-weight: bold;">失物名称：</text>
								
								<text>{{it.name}}</text><br/>
								<text style="font-size: 30rpx;font-weight: bold;">丢失时间：</text>
								
								<text>{{it.lossTime}}</text><br/>
								<text style="font-size: 30rpx;font-weight: bold;">丢失地点：</text>
								
								<text>{{it.address.length > 11?it.address:it.address}}</text><br/>
								<text style="font-size: 30rpx;font-weight: bold;">物品描述：</text>
								<text>{{it.description.length > 11?it.description:it.description}}</text><br/>
							</view>
						</view>
						<u-divider color="#d1d1d1" half-width="200" border-color="#6d6d6d">没有内容更多了</u-divider>
				</scroll-view>
			 </view>
		 </view>
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {
				input:"",
				home:true,
				search:false,
				classfy:false,
				currentNum:0,
				poiShow: false
			}
		},
		onShow() {
			this.getAll();
		},
		onHide() {
			this.$store.state.lossSearch=[];
			this.$store.state.list=[];
			
		},
		
		onLoad() {
			this.myswiper();
			this.choosePositive()
		},
		computed: {
			lossSearch(){
				return this.$store.state.lossSearch;
			},
			swiper() {
				return this.$store.state.swiper;
			},
			list() {
				return this.$store.state.list;
			},
			type() {
				return this.$store.state.type;
			},
			typeLoss(){
				return this.$store.state.typeLoss;
			},
			userInfo() {
				return this.$store.state.userInfo;
			},
			indexSkeleton() {
				return this.$store.state.indexSkeleton;
			},
			street() {
				return this.$store.state.street;
			},
			address() {
				return this.$store.state.address;
			}
		},
		methods: {
			
			
			
			//选择位置
			choosePositive() {
				console.log("选择位置")
				this.$store.dispatch("getCity")
			},
			//认领
			claim(uid,lossId) {
				console.log(uid);
				console.log(lossId);
				console.log("开始申请");
				if(uid == undefined || uid == null || uid == '') {
					uni.showModal({
						title: '提示',
						content: '请先登录',
						confirmText: '登录',
						success: res => {
							if(res.confirm) {
								uni.switchTab({
									url:'/pages/user/user'
								})
							}
						}
					});
					return;
				}
				this.$store.dispatch("claim",[uid,lossId]);
			},
			
			//联系拾取人
			getUser(id,uid) {
				if(uid == undefined || uid == null || uid == '') {
					uni.showModal({
						title: '提示',
						content: '请先登录',
						confirmText: '登录',
						success: res => {
							if(res.confirm) {
								uni.switchTab({
									url:'/pages/user/user'
								})
							}
						}
					});
					return;
				}
				if(id != undefined && uid != undefined &&id == uid) {
					console.log("自己发布");
					uni.showToast({
						title: '不能私聊自己哦'
					});
					return ;
				}
				uni.navigateTo({
					url: "../contact/contact?id=" +id + "&uid=" + uid
				})
			},
			searcher(e){
				this.$store.dispatch("search",e.replace(/(^\s*)|(\s*$)/g, ""));
				this.$store.state.list=[];
			},
			myswiper() {
				this.$store.dispatch("myswiper");
			},
			goDetail(id) {
				uni.navigateTo({
					url: "../lossdetail/lossdetail?id=" + id
				})
			},
			getAll() {
				 this.$store.dispatch("getAll")
			},
			clear() {
				// this.$store.state.lossSearch=[];
				// this.getAll();
			},
			myclick(id) {
				//点击
				if(id==1) {
					this.$store.state.lossSearch=[];
					this.getAll();
					this.home =true;
					this.search=false;
					this.classfy=false;
				}else if(id==2) {
					this.home =false;
					this.search=true;
					this.classfy=false;
				}else {
					this.$store.state.lossSearch=[];
					this.getType();
					this.getLossByType()
					this.home =false;
					this.search=false;
					this.classfy=true;
				}
				
			},
			getType(){
				this.$store.dispatch("getType1");
			},
			getLossByType(id) {
				let rid = id || 1; 
				this.currentNum = id -1 || 0;
				console.log(this.currentNum);
				this.$store.dispatch("getLossByType",rid);
			}
			
		}
	}
	
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: auto;
		background-color: #eee;
	}
	.active {
		background-color: white;
		border-radius: 30rpx 0rpx 0rpx 30rpx;
	}
	.title{
		font-size: 25rpx;
		font-weight: bold;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
	}
	.ld{
		display: inline-flex;
		height: 500rpx;
		width: 100%;
		.left {
			width: 30%;
			height: 700rpx;
			background-color: #eee;
			.title {
				
				margin-bottom: 25rpx;
			}
		}
		.right {
			width: 70%;
			background-color: white;
			border: 1rpx solid "#939393";
			.type {
				margin-bottom: 40rpx;
				border-bottom: 1rpx solid #cecece;
			}
			.type-text {
				line-height: 50rpx;
				height: 100%;
				margin-left: 10rpx;
				line-height: 50rpx;
			}
			.type-image {
				height: 100%;
				padding: 20rpx 0 10rpx 2rpx;
			}
		}
	}
	//淘宝2.0版本
	.all-item {
		width: auto;
		height: 800rpx;
		margin: 0rpx 20rpx 0rpx 20rpx;
		border-radius: 30rpx;
		border-bottom: 1rpx solid #cecece;
		.all-img {
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;   
			width: auto;
			height: 67%;
			background-color: #fff;
			border-radius: 30rpx 30rpx 0 0;
			// border: 1rpx solid #eee;
		}
		.all-nav {
			width: auto;
			height: 30%;
			// border: 1rpx solid #eee;
			background-color: #fff;
			padding: 10rpx 10rpx 10rpx 10rpx;
			border-radius: 0rpx 0rpx 30rpx 30rpx;
			.item {
				text-align: center;
				width: 70rpx;
				height: 70rpx;
				line-height: 70rpx;
				margin-left: 50rpx;
			}
			.button {
				color: white;
				height: 70rpx;
				line-height: 70rpx; 
				width: 160rpx; 
				background-color: red; 
				text-align: center; 
				margin-left: auto;
				border-radius: 50rpx;
			}
		}
	}

	.s {
		background: #eee;
	}
	.searcher{
		display: inline-block;
		height: 100%;
		width: 100%;
		background: #fff;
		border-bottom: 1rpx solid #cecece;
	}
	.search-right {
		text-align: left; 
		display: inline-block;
		margin-left: 20rpx;
		height: 100%;
		width: 60%;
		line-height: 50rpx;
		margin-bottom: 20rpx;
		.hiden{
			width: 66%;
			overflow: hidden; //超出的文本隐藏
			text-overflow: ellipsis; //溢出用省略号显示
			white-space: nowrap; //溢出不式
		}
	}
	.search-left {
		margin-left: 10rpx;
		display: inline-block;
		height:100%;
		width: 30%;
	}
	.nav {
	  display: flex;
	  background: #253598;
	  color: #211d69;
	  font-family: sans-serif;
	  align-items: center;
	  justify-content: center;
	  font-weight: 700;
	  padding: 60rpx 20rpx 0rpx 20rpx;
	  background: #55aaff;
	  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.15);
	}
	ul,
	li {
	  list-style-type: none;
	  padding: 0;
	  display: flex;
	  margin-bottom: 0;
	}
	u-icon {
	  width: 31px;
	  height: 20px;
	  margin: 0px 5px;
	  transition: 0.45s ease-in-out all;
	}
	li {
	  display: flex;
	  align-items: center;
	  flex-direction: column;
	  text-align: center;
	  cursor: pointer;
	  min-width: 200rpx;
	  position: relative;
	  text-decoration:none;
	  color:#211d69;
	}
	li:before {
	  position: absolute;
	  content: "";
	  top: 60%;
	  left: 46%;
	  height: 6px;
	  width: 6px;
	  border-radius: 50%;
	  background: #211d69;
	  transform: scale(0);
	  transform-origin: 50% 50%;
	  transition: 0.45s ease-in-out all;
	}
	
	.nav text {
	  transition: 0.45s ease-in-out all;
	  position: absolute;
	  top: 11px;
	}
	.text-container,
	.svg-container {
	  display: flex;
	  justify-content: center;
	  -webkit-mask-image: url("https://kasperdebruyne.be/img/mask2.svg");
	  -webkit-mask-composite: source-out;
	  -webkit-mask-position: 0px -14px;
	  -webkit-mask-repeat: no-repeat;
	  -webkit-mask-size: 100px 40px;
	  position: relative;
	  width: 100%;
	  height: 20px;
	  transition: 0.45s ease-in-out all;
	}
	.text-container {
	  transition-delay: 0.1s;
	}
	.svg-container {
	  -webkit-mask-size: 100px 60px;
	  -webkit-mask-position: 0px 0px;
	  transform:translateZ(0); /* Firefox  */
	}
	li:hover .svg-container {
	  transform: translateY(-24px);
	  -webkit-mask-position: 0px -40px;
	}
	li:hover:before {
	  transform: scale(1);
	  transition-delay: 0.15s;
	}
	li:hover text {
	  transform: translateY(-10px);
	}
	li:hover .text-container {
	  transform: translateY(-34px);
	  -webkit-mask-position: 0px 0px;
	}
</style>
