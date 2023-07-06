<template>
	<view class="common">
		<view class="album-header">
			搜索框
		</view>
		<view class="album-box">
			<view class="album-list-info">
				<view>专辑信息</view>
			</view>
			<scroll-view :scroll-top="0" scroll-y="true" show-scrollbar=true class="scroll-Y">
				<view class="list-album-item" v-for="item,index in this.dataList">
					<view class="list-album" @click="openModifyAlbumDialog(item.albumid)">
						{{item.title}}
					</view>
					<uni-icons type="closeempty" size="20" @click="deleteAlbum(item.albumid)"></uni-icons>
				</view>
			</scroll-view>
		</view>
		<uni-popup ref="SUCCESS" type="message">
			<uni-popup-message type="success" message="删除成功😊" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="deleteAlbum" type="dialog">
			<uni-popup-dialog cancelText="取消" confirmText="确定" title="通知" content="你确定要删除吗😊"
				@confirm="confirmDeleteAlbum"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="modifyAlbum" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="更名" placeholder="新专辑名" @confirm="modifyAlbum">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont.css'
	import {
		album,
	} from '@/utils/CompassUtil.js'
	export default {
		data() {
			return {
				dataList: [],
				values: {
					username: "", //用户名
					usernameid: 1 //用户id
				},
				albumId: 500
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
				this.getAllAlbumInfo();
		},
		methods: {
			getAllAlbumInfo() {
				album.getAllAlbumInfo().then((res) => {
					console.log(res);
					this.dataList = res[1].data.resData;
					console.log(this.dataList);
					uni.hideLoading();
				})
			},
			deleteAlbum(albumId) {
				console.log(albumId)
				this.albumId = albumId
				this.$refs.deleteAlbum.open()

			},
			confirmDeleteAlbum() {
				album.deleteAlbum(this.albumId).then((res) => {
					console.log(res)
					if (res[1].data.message === "SUCCESS") {
						this.$refs.SUCCESS.open()
					}
				})
			},
			openModifyAlbumDialog(albumId) {
				console.log(albumId)
				this.albumId = albumId
				this.$refs.modifyAlbum.open()
			},
			modifyAlbum(albumname){
				console.log(albumname)
				album.modifyAlbum(this.albumId,albumname)
			}
		}
	}
</script>

<style scoped>
	.common {
		background-color: rgb(237, 236, 236);
	}

	.album-header {
		position: relative;
		font-size: 30px;
		top: 30px;
		width: 100%;
		height: 15%;
		border-radius: 7px 7px 0px 0px;
	}

	.album-box {
		background-color: rgb(255, 255, 255);
		margin: 0 10px;
		padding: 5px 0 0 0;
		border-radius: 12px;
	}

	.uni-icons {
		position: absolute;
		right: 10%;
	}

	.album-list-info {
		display: flex;
		margin: 10px 10px 20px 10px;
	}

	.album-list-info view:nth-child(1) {
		position: relative;
		left: 10px;
		font-size: 18px;
		font-weight: bold;
	}

	.album-list-info view:nth-child(2) {
		position: relative;
		font-size: 13px;
		left: 210px;
		color: #939393;
	}

	.list-album-item {
		display: flex;
		margin: 0 50rpx 0 50rpx;
		padding: 45rpx 0 45rpx 0;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-color: #c8c8c8;
		align-items: center;
	}

	.list-album-item text {
		display: flex;
		font-size: 1rpx;
		color: #9e9e9e;
	}

	.list-album {
		position: relative;
		margin-left: 5px;
		line-height: 40rpx;
		font-size: 17px;
	}

	.scroll-Y {
		height: 510px;
	}
</style>