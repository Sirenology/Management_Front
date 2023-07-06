<template>
	<view class="common">
		<musichead title="管理员界面" :icon="false" color="black" :values="values"></musichead>
		<view class="admin-header">
			<image class="adminAvatar" src="../../utils/static/userAvatar.png"></image>
			<view>{{values.username}}</view>
		</view>
		<view class="admin-list-box">
			<view class="list-admin-item">
				<view class="list-admin" @click="handleToManageUser">
					{{dataList[0]}}
				</view>
			</view>
			<view class="list-admin-item">
				<view class="list-admin" @click="handleToManageSong">
					{{dataList[1]}}
				</view>
			</view>
			<view class="list-admin-item">
				<view class="list-admin" @click="handleToManageArtist">
					{{dataList[2]}}
				</view>
			</view>
			<view class="list-admin-item">
				<view class="list-admin" @click="handleToManageAlbum">
					{{dataList[3]}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont.css'
	export default {
		data() {
			return {
				dataList: [],
				values: {
					username: "", //用户名
					usernameid: 1 //用户id
				},
				createPlaylist: {
					dialog: {
						form: {
							playlistname: "",
							userId: "1"
						}
					},
				},
				dataList: ["管理用户", "管理歌曲", "管理歌手", "管理专辑"],
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
		},
		methods: {
			handleToManageUser() {
				uni.navigateTo({
					url: '/pages/manage/user?username=' + this.values.username + "&usernameid=" + this
						.values
						.usernameid
				});
			},
			handleToManageSong() {
				uni.navigateTo({
					url: '/pages/manage/song?username=' + this.values.username + "&usernameid=" + this
						.values
						.usernameid
				});
			},
			handleToManageArtist() {
				uni.navigateTo({
					url: '/pages/manage/artist?username=' + this.values.username + "&usernameid=" +
						this.values
						.usernameid
				});
			},
			handleToManageAlbum() {
				uni.navigateTo({
					url: '/pages/manage/album?username=' + this.values.username + "&usernameid=" + this
						.values
						.usernameid
				});
			},
		}
	}
</script>

<style scoped>
	.common {
		background-color: rgb(237, 236, 236);
	}

	.admin-header {
		position: relative;
		font-size: 30px;
		top: 5px;
		width: 100%;
		height: 25%;
		border-radius: 7px 7px 0px 0px;
	}

	.adminAvatar {
		display: flex;
		margin: auto;
		width: 90px;
		height: 90px;
	}

	.admin-list-box {
		background-color: rgb(255, 255, 255);
		margin: 0 10px;
		padding: 5px 0 0 0;
		border-radius: 12px;
	}

	.admin-list-info {
		display: flex;
		margin: 10px 10px 20px 10px;
	}

	.admin-list-info view:nth-child(1) {
		position: relative;
		left: 10px;
		font-size: 18px;
		font-weight: bold;
	}

	.admin-list-info view:nth-child(2) {
		position: relative;
		font-size: 13px;
		left: 210px;
		color: #939393;
	}

	.admin-list-title {
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

	.list-admin-item {
		display: flex;
		margin: 0 50rpx 0 50rpx;
		padding: 45rpx 0 45rpx 0;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-color: #c8c8c8;
		align-items: center;
	}

	.list-admin-item text {
		display: flex;
		font-size: 1rpx;
		color: #9e9e9e;
	}

	.list-admin {
		position: relative;
		margin-left: 5px;
		line-height: 40rpx;
		font-size: 17px;
	}

	.scroll-Y {
		height: 350px;
	}
</style>