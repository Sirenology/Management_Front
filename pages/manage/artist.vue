<template>
	<view class="common">
		<view class="artist-header">
			搜索框
		</view>
		<view class="artist-box">
			<view class="artist-list-info">
				<view>歌手信息</view>
				<view @click="openCreateArtistDialog">创建歌手</view>
			</view>
			<scroll-view :scroll-top="0" scroll-y="true" show-scrollbar=true class="scroll-Y">
				<view class="list-artist-item" v-for="item,index in this.dataList">
					<view class="list-artist">
						{{item.artistname}}
					</view>
					<uni-icons type="closeempty" size="20" @click="deleteArtist(item.artistid)"></uni-icons>
				</view>
			</scroll-view>
		</view>
		<view>
			<uni-popup ref="createArtistDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="创建歌手" placeholder="歌手名"
					@confirm="submitArtist">
				</uni-popup-dialog>
			</uni-popup>
		</view>
		<uni-popup ref="SUCCESS" type="message">
			<uni-popup-message type="success" message="删除成功😊" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="deleteArtist" type="dialog">
			<uni-popup-dialog cancelText="取消" confirmText="确定" title="通知" content="你确定要删除吗😊"
				@confirm="confirmDeleteArtist"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont.css'
	import {
		artist,
	} from '@/utils/CompassUtil.js'
	export default {
		data() {
			return {
				dataList: [],
				values: {
					username: "", //用户名
					usernameid: 1 //用户id
				},
				artistId: 500,
				createArtist: {
					dialog: {
						form: {
							artist:"",
						}
					},
				}
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
				this.getAllArtistInfo();
		},
		methods: {
			getAllArtistInfo() {
				artist.getAllArtistInfo().then((res) => {
					console.log(res);
					this.dataList = res[1].data.resData;
					console.log(this.dataList);
					uni.hideLoading();
				})
			},
			handleToArtistlist(value) {
				console.log(value);
				uni.navigateTo({
					url: '/pages/playlist/playlist?playlistId=' + value.currentTarget.dataset.id.playlistid +
						"&playlistName=" + value.currentTarget.dataset.id.playlistname + '&username=' + this.values
						.username + "&usernameid=" + this.values.usernameid
				});
			},
			deleteArtist(artistId) {
				console.log(artistId)
				this.artistId = artistId
				this.$refs.deleteArtist.open()
			
			},
			confirmDeleteArtist() {
				artist.deleteArtist(this.artistId).then((res) => {
					console.log(res)
					if (res[1].data.message === "SUCCESS") {
						this.$refs.SUCCESS.open()
					}
				})
			},
			openCreateArtistDialog() {
				this.$refs.createArtistDialog.open();
			},
			submitArtist(value) {
				uni.showLoading({
					title: '创建中...'
				})
				setTimeout(() => {
					uni.hideLoading();
					this.createArtist.dialog.form.artist = value;
					console.log(value)
					artist.createArtist(this.createArtist.dialog.form.artist);
					// 关闭窗口后，恢复默认内容
					this.$refs.createArtistDialog.close();
				}, 1000)
			}
		}
	}
</script>

<style scoped>
	.common {
		background-color: rgb(237, 236, 236);
	}

	.artist-header {
		position: relative;
		font-size: 30px;
		top: 30px;
		width: 100%;
		height: 15%;
		border-radius: 7px 7px 0px 0px;
	}

	.artist-box {
		background-color: rgb(255, 255, 255);
		margin: 0 10px;
		padding: 5px 0 0 0;
		border-radius: 12px;
	}
	
	.uni-icons{
		position: absolute;
		right: 10%;
	}
	
	.artist-list-info {
		display: flex;
		margin: 10px 10px 20px 10px;
	}

	.artist-list-info view:nth-child(1) {
		position: relative;
		left: 10px;
		font-size: 18px;
		font-weight: bold;
	}

	.artist-list-info view:nth-child(2) {
		position: relative;
		font-size: 13px;
		left: 210px;
		color: #939393;
	}

	.list-artist-item {
		display: flex;
		margin: 0 50rpx 0 50rpx;
		padding: 45rpx 0 45rpx 0;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-color: #c8c8c8;
		align-items: center;
	}

	.list-artist-item text {
		display: flex;
		font-size: 1rpx;
		color: #9e9e9e;
	}

	.list-artist {
		position: relative;
		margin-left: 5px;
		line-height: 40rpx;
		font-size: 17px;
	}

	.scroll-Y {
		height: 510px;
	}
</style>