<template>
	<view class="common">
		<musichead v-bind:title="title" :icon="true" color="#e6e6e6" :values="values"></musichead>
		<view class="music_middle">
			<image class="record" src="/static/record.png"></image>
		</view>
		<view class="music_end">
			<view @click="collect">
				<image class="collect" src="/static/collect.png"></image>
			</view>
			<view @click="play">
				<image class="start" src="/static/play.png"></image>
			</view>
			<view @click="download">
				<image class="download" src="/static/download.png"></image>
			</view>
		</view>
		<uni-popup ref="collect" type="message">
			<uni-popup-message type="success" message="已收藏😊" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="play" type="message">
			<uni-popup-message type="success" message="正在播放歌曲😊" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="download" type="message">
			<uni-popup-message type="success" message="已将歌曲下载到本地😊" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				values: {
					username: "", //用户名
					usernameid: 1 //用户id
				},
			}
		},
		onLoad(object) {
			this.values.username = object.username
			this.values.usernameid = object.usernameid
			this.title = object.title
		},
		methods: {
			collect() {
				this.$refs.collect.open();
			},
			play() {
				this.$refs.play.open();
			},
			download() {
				this.$refs.download.open();
			}
		}
	}
</script>

<style>
	.common {
		background-color: #706B6A;
	}

	.music_top {
		height: 5px;
		width: 100%;
		text-align: center;
		padding-top: 20px;

	}

	.music_middle {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.record {
		width: 300px;
		height: 300px;
		margin-top: 75px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: auto;
	}

	.music_end {
		width: 100%;
		height: 10%;
		margin-top: 105px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.collect {

		width: 50px;
		height: 50px;
	}

	.start {
		width: 100px;
		height: 100px;
		margin-left: 20px;
		margin-right: 20px;
	}

	.download {

		width: 50px;
		height: 50px;
	}
</style>