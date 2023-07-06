<template>
	<view class="common">
		<view class="song-header">
			搜索框
		</view>
		<view class="song-box">
			<view class="song-list-info">
				<view>歌曲信息</view>
			</view>
			<scroll-view :scroll-top="0" scroll-y="true" show-scrollbar=true class="scroll-Y">
				<view class="list-song-item" v-for="item,index in this.dataList">
					<view class="list-song">
						{{item.title}}
					</view>
					<uni-icons type="closeempty" size="20" @click="deleteSong(item.songid)"></uni-icons>
				</view>
			</scroll-view>
		</view>
		<uni-popup ref="SUCCESS" type="message">
			<uni-popup-message type="success" message="删除成功😊" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="deleteSong" type="dialog">
			<uni-popup-dialog cancelText="取消" confirmText="确定" title="通知" content="你确定要删除吗😊"
				@confirm="confirmDeleteSong"></uni-popup-dialog>
		</uni-popup>
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
				values: {
					username: "", //用户名
					usernameid: 1, //用户id
				},
				songId: 500,
			}
		},
		components: {
			musichead
		},
		onLoad(object) {
			console.log(object)
			this.values.username = object.username
			this.values.usernameid = object.usernameid
			uni.showLoading({
					title: '加载中...'
				}),
				this.getAllSongInfo();
		},
		methods: {
			getAllSongInfo() {
				song.getAllSongInfo().then((res) => {
					console.log(res);
					this.dataList = res[1].data.resData;
					console.log(this.dataList);
					uni.hideLoading();
				})
			},
			handleToSonglist(value) {
				console.log(value);
				uni.navigateTo({
					url: '/pages/playlist/playlist?playlistId=' + value.currentTarget.dataset.id.playlistid +
						"&playlistName=" + value.currentTarget.dataset.id.playlistname + '&username=' + this.values
						.username + "&usernameid=" + this.values.usernameid
				});
			},
			deleteSong(songId) {
				console.log(songId)
				this.songId = songId
				this.$refs.deleteSong.open()

			},
			confirmDeleteSong() {
				song.deleteSong(this.songId).then((res) => {
					console.log(res)
					if (res[1].data.message === "SUCCESS") {
						this.$refs.SUCCESS.open()
					}
				})
			},
		}
	}
</script>

<style scoped>
	.common {
		background-color: rgb(237, 236, 236);
	}

	.uni-icons {
		position: absolute;
		right: 10%;
	}

	.song-header {
		position: relative;
		font-size: 30px;
		top: 30px;
		width: 100%;
		height: 15%;
		border-radius: 7px 7px 0px 0px;
	}

	.song-box {
		background-color: rgb(255, 255, 255);
		margin: 0 10px;
		padding: 5px 0 0 0;
		border-radius: 12px;
	}

	.song-list-info {
		display: flex;
		margin: 10px 10px 20px 10px;
	}

	.song-list-info view:nth-child(1) {
		position: relative;
		left: 10px;
		font-size: 18px;
		font-weight: bold;
	}

	.song-list-info view:nth-child(2) {
		position: relative;
		font-size: 13px;
		left: 210px;
		color: #939393;
	}

	.list-song-item {
		display: flex;
		margin: 0 50rpx 0 50rpx;
		padding: 45rpx 0 45rpx 0;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-color: #c8c8c8;
		align-items: center;
	}

	.list-song-item text {
		display: flex;
		font-size: 1rpx;
		color: #9e9e9e;
	}

	.list-song {
		position: relative;
		margin-left: 5px;
		line-height: 40rpx;
		font-size: 17px;
	}

	.scroll-Y {
		height: 510px;
	}
</style>