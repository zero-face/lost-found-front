<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui_2.0.4/index.scss";
	// @import "uview-ui/index.scss";
	// @import "uview-ui/index.scss";
	
</style>
<script>
	// import Stomp from './utils/stompjs'
	// import SockJS from "sockjs-client";
	// import SockJS from "./static/js/sockjs.min.js"
	// import Stomp from "./static/js/stomp.min.js"
	export default {
		onLaunch: function() { 
			
			// const websocket = new SockJS("http://localhost:8888/websocket", [], { transports: "websocket" });
			// console.log(websocket)
			// const stompClient = Stomp.Stomp.over(websocket);
			// console.log(stompClient)
			
			// stompClient.connect(
			//   {},
			//   (res) => {
			// 	  console.log("连接成功")
			// 	  stompClient.subscribe("/subscribe", (msg) => {
			// 		  console.log("订阅成功")
			//       console.log(msg);
			//     });
			//     console.log(res);
			//   },
			//   (error) => {
			//     console.error("error", error);
			//   }
			// );
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
		
	}
</script>


