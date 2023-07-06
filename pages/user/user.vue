<template>
	<view class="common">
		<view class="user-header">
			<image class="userAvatar" src="../../utils/static/userAvatar.png"></image>
			<view>{{values.username}}</view>
		</view>
		<view class="playlist-box">
			<view class="play-list-info">
				<view>我的歌单</view>
				<view @click="openCreatePlaylistDialog">创建歌单</view>
			</view>
			<scroll-view :scroll-top="0" scroll-y="true" show-scrollbar=true class="scroll-Y">
				<view class="list-playlist-item" v-for="item,index in this.dataList" :key="item.playlistid"
						@tap="handleToPlaylist" :data-id="item">
					<view class="list-playlist-song">
						{{item.playlistname}}
						<text>{{item.artist}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view>
			<uni-popup ref="createPlaylistDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="创建歌单" placeholder="歌单名"
					@confirm="submitPlaylist">
				</uni-popup-dialog>
			</uni-popup>
		</view>
		<view class="navigation-buttom">
			<view @click="handleToIndex">
				<image class="navigation-buttom-item1" src="../../utils/static/index.png"></image>
			</view>
			<view>
				<image class="navigation-buttom-item2" src="../../utils/static/userLight.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont.css'
	import {
		playlist,
	} from '@/utils/CompassUtil.js'
	export default {
		data() {
			return {
				dataList: [],
				values:{
					username:"", //用户名
					usernameid:1 //用户id
				},
				createPlaylist: {
					dialog: {
						form: {
							playlistname: "",
							userId: "1"
						}
					},
				}
			}
		},
		components: {
			musichead
		},
		// updated() {
		// 	this.getAllPlaylistByUserId();
		// },
		onLoad(object) {
			console.log(object)
			this.values.username = object.username
			this.values.usernameid = object.usernameid
			uni.showLoading({
					title: '加载中...'
				}),
				this.getAllPlaylistByUserId();
		},
		methods: {
			openCreatePlaylistDialog() {
				this.$refs.createPlaylistDialog.open();
			},
			submitPlaylist(value) {
				uni.showLoading({
					title: '创建中...'
				})
				setTimeout(() => {
					uni.hideLoading();
					this.createPlaylist.dialog.form.playlistname = value;
					playlist.createPlaylist(this.createPlaylist.dialog.form);
					// 关闭窗口后，恢复默认内容
					this.$refs.createPlaylistDialog.close();
				}, 1000)
			},
			getAllPlaylistByUserId() {
				playlist.getAllPlaylistByUserId(this.values.usernameid).then((res) => {
					console.log(res);
					this.dataList = res[1].data.resData;
					console.log(this.datalist);
					uni.hideLoading();
				})
			},
			handleToPlaylist(value){
				console.log(value);
				uni.navigateTo({
					url: '/pages/playlist/playlist?playlistId=' + value.currentTarget.dataset.id.playlistid + "&playlistName=" + value.currentTarget.dataset.id.playlistname + '&username=' + this.values.username + "&usernameid=" + this.values.usernameid
				});
			},
			handleToIndex(){
				uni.navigateTo({
					url: '/pages/index/index?username=' + this.values.username + "&usernameid=" + this.values.usernameid
				});
			}
		}
	}
</script>

<style scoped>
	.common {
		background-color: rgb(237, 236, 236);
	}

	.user-header {
		position: relative;
		font-size: 30px;
		top: 30px;
		width: 100%;
		height: 25%;
		border-radius: 7px 7px 0px 0px;
	}
	.user-header view::nth-child(2){
		position: relative;
		top: px;
	}

	.playlist-box {
		background-color: rgb(255, 255, 255);
		margin: 10px 10px;
		padding: 5px 0 0 0;
		border-radius: 12px;
	}

	.play-list-info {
		display: flex;
		margin: 10px 10px 20px 10px;
	}

	.play-list-info view:nth-child(1) {
		position: relative;
		left: 10px;
		font-size: 18px;
		font-weight: bold;
	}

	.play-list-info view:nth-child(2) {
		position: relative;
		font-size: 13px;
		left: 210px;
		color: #939393;
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

	.list-playlist-item {
		display: flex;
		margin: 0 50rpx 0 50rpx;
		padding: 45rpx 0 45rpx 0;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-color: #c8c8c8;
		align-items: center;
	}

	.list-playlist-item text {
		display: flex;
		font-size: 1rpx;
		color: #9e9e9e;
	}

	.list-playlist-song {
		position: relative;
		margin-left: 5px;
		line-height: 40rpx;
		font-size: 17px;
	}

	.userAvatar {
		display: flex;
		margin: auto;
		width: 90px;
		height: 90px;
	}

	.scroll-Y {
		height: 350px;
	}
	
	.navigation-buttom{
		display: flex;
		position: absolute;
		border-top-style: solid;
		border-top-color: #878787;
		left: 5%;
		width: 90%;
		height: 13%;
		bottom: 0%;
	}
	.navigation-buttom-item1{
		position: absolute;
		margin-top: 18px;
		left: 18%;
		width: 45px;
		height: 60px;
	}
	.navigation-buttom-item2{
		position: absolute;
		margin-top: 18px;
		right: 18%;
		width: 45px;
		height: 60px;
	}
</style>