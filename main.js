import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import Base64 from './utils/Base64.js'
import userInfo from './utils/userInfo.js'
import WebSocketPolyfill from './utils/websocket-polyfill.js'

// import uView2 from "./uview-ui/";
import uView2 from "uview-ui_2.0.4";
Vue.use(uView2);

// global.WebSocket = WebSocketPolyfill;
Vue.config.productionTip = false
Vue.prototype.$store=store;
Vue.prototype.$Base64=Base64;
Vue.prototype.$userInfo=userInfo;
App.mpType = 'app';
const app = new Vue({
    ...App
})
app.$mount();


