<template>
	<view>
		<view class="common">
			<view class="uni-common-mt">
				<view class="uni-form-item-head uni-column">
					<view class="register_label">创建您的音乐账户</view>
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
						<button type="primary" @click="register">创建</button>
					</view>
				</view>
			</view>
			<uni-popup ref="username" type="message">
				<uni-popup-message type="warn" message="请填写用户名😊" :duration="2000"></uni-popup-message>
			</uni-popup>
			<uni-popup ref="password" type="message">
				<uni-popup-message type="warn" message="密码长度应在 6 ~ 16 位之间😊" :duration="2000"></uni-popup-message>
			</uni-popup>
			<uni-popup ref="SUCCESS" type="message">
				<uni-popup-message type="success" message="注册成功😊" :duration="2000"></uni-popup-message>
			</uni-popup>
			<uni-popup ref="USER_EXISTS" type="message">
				<uni-popup-message type="warn" message="用户名已存在😊" :duration="2000"></uni-popup-message>
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
					"password": ''
				}
			}
		},
		methods: {
			register() {
				if (this.values.username === "") {
					this.$refs.username.open();
				} else if (this.values.password.length > 16 || this.values.password.length < 6) {
					this.$refs.password.open();
				} else {
					user.register(this.values.username, this.values.password).then((res) => {
						console.log(res)
						if (res[1].data === "USER_EXISTS") {
							this.$refs.USER_EXISTS.open();
						}
						if (res[1].data === "SUCCESS") {
							this.$refs.SUCCESS.open();
							uni.navigateTo({
								url: '/pages/login/login'
							});
						};
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.register_label {
		color: #333333;
		margin: 200px 60px 30px 60px;
		font-size: 21px;
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
		margin: 20px auto;
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
		margin: 45px auto;
		width: 70%;
	}

	button {
		font-size: 40rpx;
		background-color: #ff4f4f;
		color: #efefef;
		height: 50px;
	}
</style>