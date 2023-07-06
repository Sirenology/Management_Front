<template>
	<view class="common">
		<view class="user-header">
			搜索框
		</view>
		<view class="user-box">
			<view class="user-list-info">
				<view>用户信息</view>
			</view>
			<scroll-view :scroll-top="0" scroll-y="true" show-scrollbar=true class="scroll-Y">
				<view class="list-user-item" v-for="item,index in this.dataList">
					<view class="list-user" @click="openModifyUserDialog(item.usernameid)">
						{{item.username}}
					</view>
					<uni-icons type="closeempty" size="20" @click="deleteUser(item.usernameid)"></uni-icons>
				</view>
			</scroll-view>
		</view>
		<uni-popup ref="SUCCESS" type="message">
			<uni-popup-message type="success" message="删除成功😊" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="deleteUser" type="dialog">
			<uni-popup-dialog cancelText="取消" confirmText="确定" title="通知" content="你确定要删除吗😊"
				@confirm="confirmDeleteUser"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="modifyUser" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="更名" placeholder="新用户名" @confirm="modifyUser">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont.css'
	import {
		user,
	} from '@/utils/CompassUtil.js'
	export default {
		data() {
			return {
				dataList: [],
				values: {
					username: "", //用户名
					usernameid: 1 //用户id
				},
				userId: 500,
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
				this.getAllUserInfo();
		},
		methods: {
			getAllUserInfo() {
				user.getAllUserInfo().then((res) => {
					console.log(res);
					this.dataList = res[1].data.resData;
					console.log(this.dataList);
					uni.hideLoading();
				})
			},
			handleToUserlist(value) {
				console.log(value);
				uni.navigateTo({
					url: '/pages/playlist/playlist?playlistId=' + value.currentTarget.dataset.id.playlistid +
						"&playlistName=" + value.currentTarget.dataset.id.playlistname + '&username=' + this.values
						.username + "&usernameid=" + this.values.usernameid
				});
			},
			handleToIndex() {
				uni.navigateTo({
					url: '/pages/index/index?username=' + this.values.username + "&usernameid=" + this.values
						.usernameid
				});
			},
			deleteUser(userId) {
				console.log(userId)
				this.userId = userId
				this.$refs.deleteUser.open()
			
			},
			confirmDeleteUser() {
				user.deleteUser(this.userId).then((res) => {
					console.log(res)
					if (res[1].data.message === "SUCCESS") {
						this.$refs.SUCCESS.open()
					}
				})
			},
			openModifyUserDialog(userId) {
				console.log(userId)
				this.userId = userId
				this.$refs.modifyUser.open()
			},
			modifyUser(username){
				console.log(username)
				user.modifyUser(this.userId,username)
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
		height: 15%;
		border-radius: 7px 7px 0px 0px;
	}

	.user-box {
		background-color: rgb(255, 255, 255);
		margin: 0 10px;
		padding: 5px 0 0 0;
		border-radius: 12px;
	}

	.uni-icons {
		position: absolute;
		right: 10%;
	}

	.user-list-info {
		display: flex;
		margin: 10px 10px 20px 10px;
	}

	.user-list-info view:nth-child(1) {
		position: relative;
		left: 10px;
		font-size: 18px;
		font-weight: bold;
	}

	.user-list-info view:nth-child(2) {
		position: relative;
		font-size: 13px;
		left: 210px;
		color: #939393;
	}

	.list-user-item {
		display: flex;
		margin: 0 50rpx 0 50rpx;
		padding: 45rpx 0 45rpx 0;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-color: #c8c8c8;
		align-items: center;
	}

	.list-user-item text {
		display: flex;
		font-size: 1rpx;
		color: #9e9e9e;
	}

	.list-user {
		position: relative;
		margin-left: 5px;
		line-height: 40rpx;
		font-size: 17px;
	}

	.scroll-Y {
		height: 510px;
	}
</style>