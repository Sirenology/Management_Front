<template>
	<view class="common">
		<view class="playlist-header">
			<musichead title="歌单" :icon="true" color="white" :values="values"></musichead>
			<view class="playlist-title">{{this.playlistInfo.playlistName}}</view>
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

	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont.css'
	import {
		playlist,
		song
	} from '@/utils/CompassUtil.js'
	export default {
		data() {
			return {
				dataList: [],
				playlistInfo: {
					playlistId: 1, //歌单id
					playlistName: "" //歌单名
				},
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
			this.playlistInfo.playlistId = object.playlistId
			this.playlistInfo.playlistName = object.playlistName
			this.values.username = object.username
			this.values.usernameid = object.usernameid
			console.log("playlistId = " + this.playlistInfo.playlistId)
			uni.showLoading({
					title: '加载中...'
				}),
				song.getAllSongByPlaylistId(this.playlistInfo.playlistId).then((res) => {
					this.dataList = res[1].data.resData;
					console.log(this.datalist);
					uni.hideLoading();
				})
		},
		methods: {
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
	.playlist-header {
		position: relative;
		width: 100%;
		height: 25%;
		background-color: rgb(108, 112, 106);
		border-radius: 7px 7px 0px 0px;
	}

	.playlist-title {
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
		height: 510px;
	}
</style>