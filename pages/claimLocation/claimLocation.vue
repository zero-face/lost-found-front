<template>
	<view>
		<!-- 自定义导航栏 -->
		<view>
			<u-navbar back-icon-color="white" title-color="white" title="领取地点" :background="background"></u-navbar>
		</view>
		<!-- 简介 -->
		<view>
			<u-image width="100%" height="300rpx" src="@/static/service.jpg"></u-image>
			<view class="info">
				<view @click="phone(number)">联系电话：{{number}}</view>
				<view @click="arrive(latitude,longitude)">校内地址：陕西省西安市未央区陕西科技大学西安校区阳光服务中心</view>
			</view>
		</view>
		<view>
			<!-- <u-button>开始导航</u-button> -->
		</view>
		<!-- 地图引入 -->
		<view>
		</view>
		<view >
			<map class="map" show-location show-compass enable-building :polyline="polyline" :markers="marks" :longitude="longitude" :latitude="latitude">
			</map>
		</view>
	</view>
</template>

<script>
	import QQMapWX from "../../static/js/qqmap-wx-jssdk.js"
	export default {
		data() {
			return {
				marks: [{
					latitude: 34.382513,
					longitude: 108.978624,
					iconPath: "../../static/point.png",
					title:"阳光服务中心",
					scale: 5,
					width: 20,
					height: 20
					}
				],
				background: {
					backgroundColor: '#ff0000',
				},
				number: "19802980992",
				polyline: [],
			}
		},
		onLoad() {
			//加载页面即获取位置
			this.$store.dispatch("getCity");
		},
		methods: {
			phone(number) {
				uni.makePhoneCall({
					phoneNumber: number
				})
			},
			arrive(latitude,longitude) {
				// this.$store.dispatch("arrive",[latitude,longitude]);
				let qqmapsdk = new QQMapWX({
					key: "JX6BZ-2QJEI-JICGR-5ENQ5-RFLV5-XVBND"
				});
				console.log("开始进行路线规划");
				qqmapsdk.direction({
				      mode: 'walking',
				      from: {
						latitude: latitude,
						longitude: longitude,
					  },
				      to: '34.382513,108.978624', 
				      success: (res) => {
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
				        // console.log(pl)
				        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
						// latitude = pl[0].latitude;
						// longitude = pl[0].longitude;
						this.polyline =  [{
				            points: pl,
				            color: '#4f9fefdd',
				            width: 10,
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
			}
		},
		computed: {
			/* polyline() {
				return this.$store.state.polyline;
			}, */
			longitude() {
				return this.$store.state.longitude;
			},
			latitude() {
				return this.$store.state.latitude;
			}
		},
	}
</script>

<style lang="scss">
	.info {
		padding:10rpx 20rpx;
		view {
			line-height: 60rpx;
			border-bottom: 1px solid #eee;
		}
	}
	.map {		
		width: 100%;
		height: 400px;
	}
</style>
