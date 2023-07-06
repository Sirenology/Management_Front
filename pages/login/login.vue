<template>
	<view>
		<view class="common">
			<view class="uni-common-mt">
				<view class="uni-form-item-head uni-column">
					<view class="login_label">欢迎登录</view>
				</view>
				<view class="uni-form-item uni-column-input">
					<view>
						<input class="uni-input" v-model="values.username" focus placeholder="用户名:" />
					</view>
				</view>
				<view class="uni-form-item uni-column-input">
					<view>
						<input class="uni-input" v-model="values.password" hold-keyboard placeholder="密码:"
							password=true>
					</view>
				</view>
				<view class="uni-form-item uni-column-button">
					<view>
						<button type="primary" @click="login">登录</button>
					</view>
				</view>
				<view class="uni-form-item uni-column-button">
					<view>
						<button type="primary" @click="handleToRegister">注册</button>
					</view>
				</view>
			</view>
			<uni-popup ref="username" type="message">
				<uni-popup-message type="warn" message="请填写用户名😊" :duration="2000"></uni-popup-message>
			</uni-popup>
			<uni-popup ref="password" type="message">
				<uni-popup-message type="warn" message="密码长度应在 6 ~ 16 位之间😊" :duration="2000"></uni-popup-message>
			</uni-popup>
			<uni-popup ref="USER_NOT_EXISTS" type="message">
				<uni-popup-message type="success" message="用户名不存在😊" :duration="2000"></uni-popup-message>
			</uni-popup>
			<uni-popup ref="PASSWORD_ERROR" type="message">
				<uni-popup-message type="success" message="密码错误😊" :duration="2000"></uni-popup-message>
			</uni-popup>
			<uni-popup ref="SUCCESS" type="message">
				<uni-popup-message type="success" message="登录成功😊" :duration="2000"></uni-popup-message>
			</uni-popup>
			<uni-popup ref="EnterAdmin" type="dialog">
				<uni-popup-dialog cancelText="取消" confirmText="进入" title="通知"
					content="检测到您是管理员是否进入管理员界面😊" @confirm="handleToAdmin" @close="handleToIndex"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		user,
	} from "../../utils/CompassUtil.js"
	export default {
		data() {
			return {
				values: {
					"username": '',
					"password": '',
					"usernameid": 1
				}
			}
		},
		methods: {
			login() {
				if (this.values.username === "") {
					this.$refs.username.open();
				} else if (this.values.password.length > 16 || this.values.password.length < 6) {
					this.$refs.password.open();
				} else {
					user.login(this.values.username, this.values.password).then((res) => {
						console.log(res)
						this.values.username = res[1].data.username
						this.values.usernameid = res[1].data.usernameid
						if (res[1].data.logininfo === "USER_NOT_EXISTS") {
							this.$refs.USER_NOT_EXISTS.open();
						};
						if (res[1].data.logininfo === "PASSWORD_ERROR") {
							this.$refs.PASSWORD_ERROR.open();
						};
						if (res[1].data.logininfo === "SUCCESS") {
							this.$refs.SUCCESS.open();
							if (res[1].data.admininfo === "IS_ADMINISTRATOR") {
								this.$refs.EnterAdmin.open();
							} else {
								this.handleToIndex()
							}
						}
					})
				}
			},
			handleToAdmin() {
				uni.navigateTo({
					url: '/pages/admin/admin?username=' + this.values.username + "&usernameid=" + this.values
						.usernameid
				});
			},
			handleToIndex() {
				uni.navigateTo({
					url: '/pages/index/index?username=' + this.values.username + "&usernameid=" + this.values
						.usernameid
				});
			},
			handleToRegister() {
				uni.navigateTo({
					url: "/pages/register/register"
				});
			}
		}
	}
</script>

<style lang="scss">
	.login_label {
		color: #333333;
		margin: 140px 60px 30px 60px;
		font-size: 35px;
	}

	.uni-form-item-head {
		margin: 30rpx 0;
	}

	.uni-form-item {
		border-style: solid;
		border-radius: 6px;
		border-color: #8c8c8c;
	}

	.uni-column-input {
		display: flex;
		margin: 25px auto;
		width: 60%;
	}

	.uni-input {
		background-color: rgb(237, 236, 236);
		height: 90rpx;
		text-align: left;
		padding-left: 10rpx;
		border-radius: 10rpx;
		font-size: 30rpx;
	}

	.uni-column-button {
		margin: 30px auto;
		width: 70%;
	}

	button {
		font-size: 35rpx;
		background-color: #ff4f4f;
		color: #efefef;
		height: 40px;
	}
</style>