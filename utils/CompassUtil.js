/**
	 * 响应示例
	{
		"code": 0,
		"data": {
			"total": 0 //总条数
			"list": [
				{
					"songid": xxx, //歌曲id
					"title": "xxx" //歌曲名
				}
			],
		},
		"message": ""
	}
	 */

export const song = {
	/**
	 * 获取所有歌曲信息
	 */
	getAllSongInfo() {
		return uni.request({
			url: "/api" + "/song/getAllSongInfo",
			method: 'Post',
			data: {},
		});
	},
	
	/**
	 * 获取歌单下所有歌曲信息
	 */
	getAllSongByPlaylistId(playlistId) {
		return uni.request({
			url: "/api" + "/song/getAllSongByPlaylistId",
			method: 'Post',
			data: {
				playlistId,
			},
		});
	},
	/**
	 * 删除歌曲
	 */
	deleteSong(songId){
		return uni.request({
			url: "/api" + "/song/deleteSong",
			method: 'Post',
			data: {
				"songId": songId,
			},
		});
	},
};

export const playlist = {
	/**
	 * 获取用户下所有歌单信息
	 */
	getAllPlaylistByUserId(userId) {
		return uni.request({
			url: "/api" + "/playlist/getAllPlaylistByUserId",
			method: 'Post',
			data: {
				userId,
			},
		});
	},
	
	/**
	 * 创建歌单
	 */
	createPlaylist(value) {
		return uni.request({
			url: "/api" + "/playlist/createPlaylist",
			method: 'Post',
			data: value,
		});
	},
}

export const user = {
	/**
	 * 登录
	 */
	login(username, password) {
		return uni.request({
			url: "/api" + "/user/login",
			method: 'Post',
			data: {
				"password": password,
				"userName": username
			},
		});
	},

	/**
	 * 注册
	 */
	register(username, password) {
		return uni.request({
			url: "/api" + "/user/register",
			method: 'Post',
			data: {
				"password": password,
				"userName": username
			},
		});
	},

	/**
	 * 获取所有用户信息
	 */
	getAllUserInfo() {
		return uni.request({
			url: "/api" + "/user/getAllUserInfo",
			method: 'Post',
			data: {},
		});
	},
	
	/**
	 * 删除用户
	 */
	deleteUser(userId){
		return uni.request({
			url: "/api" + "/user/deleteUser",
			method: 'Post',
			data: {
				"userId": userId,
			},
		});
	},
	
	/**
	 * 更改用户名
	 */
	modifyUser(userId,username){
		return uni.request({
			url: "/api" + "/user/modifyUser",
			method: 'Post',
			data: {
				"userId": userId,
				"username": username
			},
		});
	},
}

export const album = {
	/**
	 * 获取所有专辑信息
	 */
	getAllAlbumInfo() {
		return uni.request({
			url: "/api" + "/album/getAllAlbumInfo",
			method: 'Post',
			data: {},
		});
	},
	
	/**
	 * 删除专辑
	 */
	deleteAlbum(albumId){
		return uni.request({
			url: "/api" + "/album/deleteAlbum",
			method: 'Post',
			data: {
				"albumId": albumId,
			},
		});
	},
	
	/**
	 * 更改专辑名
	 */
	modifyAlbum(albumId,albumname){
		return uni.request({
			url: "/api" + "/album/modifyAlbum",
			method: 'Post',
			data: {
				"albumId": albumId,
				"albumName": albumname
			},
		});
	},
}

export const artist = {
	/**
	 * 获取所有歌手信息
	 */
	getAllArtistInfo() {
		return uni.request({
			url: "/api" + "/artist/getAllArtistInfo",
			method: 'Post',
			data: {},
		});
	},
	
	/**
	 * 删除歌手
	 */
	deleteArtist(artistId){
		return uni.request({
			url: "/api" + "/artist/deleteArtist",
			method: 'Post',
			data: {
				"artistId": artistId,
			},
		});
	},
	
	/**
	 * 创建歌手
	 */
	createArtist(artist){
		return uni.request({
			url: "/api" + "/artist/createArtist",
			method: 'Post',
			data: {
				"artist": artist,
			},
		});
	}
}