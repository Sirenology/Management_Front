<template>
	<view class="common">
		<view class="index-header">
			<musichead title="Like-Music" :icon="false" color="#5b5b5b" :values = "values"></musichead>
				<image class="searchIcon" src="../../utils/static/searchIcon.png"></image>
		</view>
		<view>
			<scroll-view :scroll-top="0" scroll-y="true" show-scrollbar=true class="scroll-Y">
				<view class="list-music-item" v-for="item,index in this.dataList" :key="item.songid"
						@tap="handleToMusic" :data-id="item.title">
					<view class="list-music-top">{{index+1}}</view>
					<view class="list-music-song">
						{{item.title}}
						<text>{{item.artist}}</text>
					</view>
					<text class="list-music-icon iconfont iconbofang"></text>
				</view>
			</scroll-view>
		</view>
		<view class="navigation-buttom">
			<view>
				<image class="navigation-buttom-item1" src="../../utils/static/indexLight.png"></image>
			</view>
			<view @click="handleToUser">
				<image class="navigation-buttom-item2" src="../../utils/static/user.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont.css'
	import {
		song,
	} from '@/utils/CompassUtil.js'
	export default {
		data() {
			return {
				dataList: [],
				playlistId: 1, //歌单id
				values: {
					username: "", //用户名
					usernameid: 1 //用户id
				},
			}
		},
		components: {
			musichead
		},
		onLoad(object) {
			this.values.username = object.username
			this.values.usernameid = object.usernameid
			uni.showLoading({
					title: '加载中...'
				}),
				song.getAllSongInfo().then((res) => {
					console.log(res);
					this.dataList = res[1].data.resData;
					console.log(this.datalist);
					uni.hideLoading();
				})
		},
		methods: {
			handleToUser() {
				uni.navigateTo({
					url: '/pages/user/user?username=' + this.values.username + "&usernameid=" + this.values.usernameid
				});
			},
			handleToMusic(value) {
				console.log(value)
				uni.navigateTo({
					url: '/pages/music/music?username=' + this.values.username + "&usernameid=" + this.values.usernameid +"&title=" + value.currentTarget.dataset.id
				});
			},

		}
	}
</script>

<style scoped>
	.common {
		background-color: rgb(237, 236, 236);
	}

	.index-search {
		border-style: solid;
		border-radius: 10px;
		margin: 20px 20px;
	}

	.searchIcon {
		display: flex;
		margin: auto;
		top: 10px;
		border-style: solid;
		border-width: 1.5px;
		border-radius: 30px;
		width: 240px;
		height: 30px;
		border-color: #5b5b5b;
	}

	.index-header {
		position: relative;
		width: 100%;
		height: 25%;
		border-radius: 7px 7px 0px 0px;
	}

	.index-title {
		margin-top: 20px;
		font-size: 25px;
		text-align: center;
		color: white;
	}

	.songIcon {
		position: relative;
		top: 2px;
		right: 38%;
		width: 83px;
		height: 46px;
	}

	.list-music-top {
		width: 56rpx;
		font-size: 32rpx;
		color: #878787;
	}

	.list-music-item {
		display: flex;
		margin: 18rpx 50rpx 18rpx 30rpx;
		align-items: center;
	}

	.list-music-item text {
		display: flex;
		font-size: 1rpx;
		color: #9e9e9e;
	}

	.list-music-song {
		position: relative;
		margin-left: 15px;
		line-height: 40rpx;
		font-size: 17px;
	}

	.list-music-icon {
		display: flex;
		position: absolute;
		font-size: 30px !important;
		right: 15%;
	}

	.scroll-Y {
		height: 420px;
	}

	.navigation-buttom {
		display: flex;
		position: absolute;
		border-top-style: solid;
		border-top-color: #878787;
		left: 5%;
		width: 90%;
		height: 13%;
		bottom: 0%;
	}

	.navigation-buttom-item1 {
		position: absolute;
		margin-top: 18px;
		left: 18%;
		width: 45px;
		height: 60px;
	}

	.navigation-buttom-item2 {
		position: absolute;
		margin-top: 18px;
		right: 18%;
		width: 45px;
		height: 60px;
	}
</style>