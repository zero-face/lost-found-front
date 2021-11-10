import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import Base64 from './utils/Base64.js'
import userInfo from './utils/userInfo.js'
import GoEasy from './components/goeasy-1.0.3.js'

import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$store=store;
Vue.prototype.$Base64=Base64;
Vue.prototype.$userInfo=userInfo;
App.mpType = 'app'

Vue.prototype.$goEasy = new GoEasy({
    host: "hangzhou.goeasy.io", //应用所在的区域地址: 【hangzhou.goeasy.io | singapore.goeasy.io】
    appkey: "BC-8dbb37d2803b4078a657a52dad877085", //替换为您的应用appkey
    onConnected: function() {
        console.log('goeasy连接成功！')
    },
    onDisconnected: function() {
        console.log('goeasy连接断开！')
    },
    onConnectFailed: function(error) {
        console.log('goeasy连接失败或错误！')
    }
});

const app = new Vue({
    ...App
})
app.$mount()
