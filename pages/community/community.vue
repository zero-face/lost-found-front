<!-- <template>
	<view class="u-page">
		<view style="height: 400rpx; width: 100%; margin-bottom: 20rpx;">
			<u--image :src="src" mode="top" width="100%" height="400rpx"></u--image>
		</view>
		<view class="content">
			<view class="album">
				<view class="album__avatar">
					<image
						src="../../static/userInfo.png"
						mode=""
						style="width: 32px;height: 32px;"
					></image>
				</view>
				<view class="album__content">
					<u--text
						text="zero"
						type="primary"
						bold
						size="17"
					></u--text>
					<view :style="{
						marginBottom: '8px',
						width: albumWidth + 'px'
					}">
						<u--text
							text="全面的组件和便捷的工具会让您信手拈来，如鱼得水"
							:customStyle="{
								width: albumWidth + 'px'
							}"
						></u--text>
					</view>
					<u-album
						:urls="urls3"
						@albumWidth="width => albumWidth = width"
						multipleSize="68"
					></u-album>
				</view>
			</view>
			<u-divider></u-divider>
			<view class="album">
				<view class="album__avatar">
					<image
						src="../../static/userInfo.png"
						mode=""
						style="width: 32px;height: 32px;"
					></image>
				</view>
				<view class="album__content">
					<u--text
						text="Zero"
						type="primary"
						bold
						size="17"
					></u--text>
					<view :style="{
						marginBottom: '8px',
						width: albumWidth + 'px'
					}">
						<u--text
							text="全面的组件和便捷的工具会让您信手拈来，如鱼得水"
							:customStyle="{
								width: albumWidth + 'px'
							}"
						></u--text>
					</view>
					<u-album
						:urls="urls3"
						@albumWidth="width => albumWidth = width"
						multipleSize="68"
					></u-album>
				</view>
			</view>
			<u-divider></u-divider>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				albumWidth: 0,
				src:"https://img2.baidu.com/it/u=3319045030,1824020173&fm=26&fmt=auto",
				urls3: [
					'https://cdn.uviewui.com/uview/album/5.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/8.jpg',
				]
			}
		}
	}
</script>

<style lang="scss">
	.album {
		@include flex;
		align-items: flex-start;
		padding: 10rpx 10rpx 10rpx 30rpx;
		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}
</style>
 -->