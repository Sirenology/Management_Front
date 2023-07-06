<template>
	<view>
		<view class="music-head" :style="{color:color}">
			{{title}}
			<view v-if="icon" class="music-head-icon" :class="{'music-head-iconblack' : iconBlack}">
				<text class="iconfont iconzuojiantou-copy" @tap="handleToBack"></text>
				| <text class="iconfont iconshouye" @tap="handleToHome"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "musichead",
		data() {
			return {
				username: "", //用户名
				usernameid: 1 //用户id

			};
		},
		props: ['title', 'icon', 'color', 'iconBlack', 'values'],
		mounted() {
			this.username = this.values.username
			this.usernameid = this.values.usernameid
		},
		methods: {
			handleToBack() {
				uni.navigateBack();
			},
			handleToHome() {
				uni.navigateTo({
					url: '../../pages/index/index?username=' + this.values.username + "&usernameid=" + this.values.usernameid
				});
			},
		}
	}
</script>
<!-- scoped表示当前页面样式才生效，不会影响其他界面 -->
<style scoped>
	.music-head {
		width: 100%;
		/* 这里的高度不应该自适应，应保持不变 */
		height: 75px;
		font-size: 18px;
		line-height: 80px;
		text-align: center;
		color: #5d5d5e;
	}

	.music-head-icon {
		position: absolute;
		left: 8px;
		top: 24px;
		width: 85px;
		height: 27px;
		background: rgb(233, 233, 233);
		color: #5d5d5e;
		/* 行高会继承，需要重新设置 */
		line-height: 31px;
		border-radius: 15px;
		display: flex;
		justify-content: space-evenly;
	}

	.music-head-iconblack {
		color: #5d5d5e;
		border: 2rpx #f6f6f6 solid;
		background: white;
	}
</style>