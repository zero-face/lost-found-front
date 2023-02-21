import Base64 from "./Base64.js"
const userInfo = {
	getUsername: function(e) {
		let username="";
		let token = uni.getStorageSync('token');
		/* if(token == null) {
			// 提示未登录，跳转登录页面
			console.log("没有登录");
			uni.showToast({
				title:"未登录，请重新登录..",
				icon:"error"
			});
			setTimeout(function () {
			    uni.hideToast();
				console.log("马上跳转登录页面");
				uni.switchTab({
					url:"/pages/user/user"
				})
			}, 1000);
			return;
		} */
		if(token != null) {
			let tokens = token.split(".");
			let UserInfo = tokens[1];
			let user = Base64.decode(UserInfo);
			if(user != null) {
				username = user.substr(0,user.lastIndexOf('\"'));
				username = username.substr(username.lastIndexOf(":")+2);
			}
			return username;
		}
		return null;
	}
}
export default userInfo;