<template>
	<view class="content">
		<!-- //轮播图 -->
		<view>
		    <swiper indicator-active-color="#00ff00" indicator-dots indicator-color="rgba(0, 0, 0, .3)" autoplay interval=3000 circular duration=700>
		        <swiper-item v-for="(item,index) in swiper" :key="index">
					<u-image mode="aspectFit" @click="goDetail(item.id)" width="100%" height="100%" :src="item.pictureUrl"></u-image>
		        </swiper-item>
		        
		    </swiper>
		 </view>
	<!-- 分栏 -->
		 <view class="nav" style="background: '#eee';">
			  <ul>
			     <li @click="myclick(1)">
			         <view class="svg-container">
						 <u-icon size=50rpx name="home" label-size=30rpx></u-icon>
			         </view>
					 <view class = "text-container">
					 	<text>Home</text>
					 </view>
			     </li>
			     <li @click="myclick(2)">
			         <view class="svg-container">
			            <u-icon size=50rpx label-size=30rpx name="search"> </u-icon>
			         </view>
					 <view class = "text-container">
					 	<text>Search</text>
					 </view>
			     </li>
			     <li @click="myclick(3)">
			         <view class="svg-container">
			            <u-icon size=50rpx label-size=30rpx  name="list"></u-icon>
			         </view>
					 <view class = "text-container">
					 	<text>Classfy</text>
					 </view>
			     </li>
			   </ul>

		 </view>
		 
		 
		 <!-- 搜索 -->
		 <view v-if="search===true">
			 <u-search focus shape="round" placeholder="请输入关键词" @search="searcher" @custom="searcher" @clear="clear" margin="30rpx 0 30rpx 0"></u-search>
		 </view>
		<!-- 搜索结果 -->
		<view class="s" v-if="lossSearch!=[]">
			 <view @click="goDetail(item.id)" class="searcher" v-for="(item,index) in lossSearch" :key="index">
			 	<view class="search-left">
			 		<u-image class="search" mode="aspectFit"  width="200rpx" height="200rpx" :src="item.pictureUrl">
			 			<view slot="error" style="font-size: 24rpx;">失物图片丢失了</view>
			 		</u-image>
			 	</view>
				
			 	<view class="search-right">
					<text style="font-size: 30rpx;font-weight: bold;">失物名称：</text>
			 		<text>{{item.name}}</text><br/>
					<text style="font-size: 30rpx;font-weight: bold;">丢失时间：：</text>
			 		<text>{{new Date(item.lossTime*1000).getFullYear() + "/" + (new Date(item.lossTime*1000).getMonth() + 1)+ "/" +  new Date(item.lossTime*1000).getDate() + "/ " + new Date(item.lossTime*1000).getHours() + ":00"}}</text><br/>
					<text style="font-size: 30rpx;font-weight: bold;">丢失地点：：</text>
			 		<text>{{item.address}}</text><br/>
					<text style="font-size: 30rpx;font-weight: bold;">物品描述：</text>
			 		<text>{{item.description}}</text><br/>
			 	</view>
			 </view>
			 <view v-if="lossSearch == []">
			 	<u-empty text="所谓伊人，在水一方" mode="search"></u-empty>
			 </view>
		 </view>
		
		
		 <!-- 所有信息 -->
		<view @click="goDetail(item.id)" v-if="home===true" class="searcher" v-for="(item,index) in list" :key="index">
			 <view class="search-left">
				 <u-image class="search" mode="aspectFit"  width="200rpx" height="200rpx" :src="item.pictureUrl">
				 	<view slot="error" style="font-size: 24rpx;">失物图片丢失了</view>
				 </u-image>
			 </view>
			
			<view class="search-right">
				<text style="font-size: 30rpx;font-weight: bold;">失物名称：</text>
				
				<text>{{item.name}}</text><br/>
				<text style="font-size: 30rpx;font-weight: bold;">丢失时间：</text>
				
				<text>{{new Date(item.lossTime*1000).getFullYear() + "/" + (new Date(item.lossTime*1000).getMonth() + 1)+ "/" +  new Date(item.lossTime*1000).getDate() + "/ " + new Date(item.lossTime*1000).getHours() + ":00"}}</text><br/>
				<text style="font-size: 30rpx;font-weight: bold;">丢失地点：</text>
				
				<text>{{item.address}}</text><br/>
				<text style="font-size: 30rpx;font-weight: bold;">物品描述：</text>
				<text>{{item.description}}</text><br/>
			</view>
		 </view>
		<!-- 按类型展示 -->
		 <view v-if="classfy==true" class="ld">
			 <!-- 类型 -->
			 <view class="left">
				 
				 	<scroll-view 
					style="white-space: nowrap; height:800rpx" 
	 				scroll-y="true" class="scroll-Y" 
					>
						<view  v-for="(item,index) in type" :key="index">
							<view :class="{active:index===currentNum}">
								<view  class="title" @click="getLossByType(item.id)">
									{{item.type}}
								</view>
							</view>
						</view>
				 </scroll-view>
		
			 </view>
			 <!-- 分类图片 -->
			 <view class="right">
				<scroll-view 
				
				style="white-space: nowrap; height:800rpx" 
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
								
								<text>{{new Date(item.lossTime*1000).getFullYear() + "/" + (new Date(item.lossTime*1000).getMonth() + 1)+ "/" +  new Date(item.lossTime*1000).getDate() + "/ " + new Date(item.lossTime*1000).getHours() + ":00"}}</text><br/>
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
				clickId:"",
				currentNum:0
			}
		},
		onShow() {
			this.myswiper();
			this.getAll();
			this.home=true;
			this.search=false;
			this.classfy=false;
		},
		onHide() {
			this.$store.state.lossSearch=[];
			
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
			},typeLoss(){
				return this.$store.state.typeLoss;
			}
		},
		methods: {
			searcher(e){
				console.log(e)
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
				this.$store.state.lossSearch=[];
				this.getAll()();
				this.input="请输入关键词";
			},
			myclick(id) {
				this.$store.state.lossSearch=[];
				console.log("点击了" + id);
				if(id==1) {
					this.getAll();
					this.home =true;
					this.search=false;
					this.classfy=false;
					
				}else if(id==2) {
					this.home =false;
					this.search=true;
					this.classfy=false;
				}else {
					this.getType();
					this.getLossByType()
					this.home =false;
					this.search=false;
					this.classfy=true;
				}
				
			},
			getType(){
				this.$store.dispatch("getType");
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

	.active {
		background-color: white;
	}
	.title{
		font-size: 25rpx;
		font-weight: bold;
		// background-color: red;
		// border: 1rpx solid gray;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
	}
	.ld{
		display: inline-flex;
		height: 700rpx;
		width: 100%;
		.left {
			width: 30%;
			height: 700rpx;
			background-color: #eee;
		}
		.right {
			width: 70%;
			// flex: 1;
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
	  // border-radius: 0% 0% 30rpx 30rpx;
	  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.15);
	  margin: 10rpx 0 10rpx 0;
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
