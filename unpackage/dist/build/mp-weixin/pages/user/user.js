(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"0a8b":function(e,n,t){"use strict";t.r(n);var u=t("7f69"),o=t("8629");for(var s in o)"default"!==s&&function(e){t.d(n,e,(function(){return o[e]}))}(s);t("1c2a");var c,i=t("f0c5"),a=Object(i["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);n["default"]=a.exports},"1c2a":function(e,n,t){"use strict";var u=t("cdc1"),o=t.n(u);o.a},"750e":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{background:{backgroundImage:"linear-gradient(45deg, rgb(255, 255, 127), rgb(141, 198, 63))"},text:"用户未登录",user:{},mes:[],id:0}},methods:{sub:function(){var e=this;this.$goEasy.subscribe({channel:this.$store.state.userInfo.id+"",onMessage:function(n){console.log("Channel:"+n.channel+" content:"+n.content),e.$store.state.mesNum++,console.log(JSON.parse(n.content).type),"0"==JSON.parse(n.content).type?e.$store.state.systemNum++:1==JSON.parse(n.content).type?(e.$store.state.contactNum++,console.log(e.$store.state.contactNum)):"3"==JSON.parse(n.content).type?e.$store.state.commentNum++:"4"==JSON.parse(n.content).type&&e.$store.state.likeNum++},onSuccess:function(){console.log("Subscribe successfully.")},onFailed:function(){console.log("Subscribe successfully.")}})},login:function(){var n=this;e.getUserProfile({desc:"用户登录，填充用户基本信息",lang:"zh_CN",success:function(t){console.log(t),n.user=t.userInfo,e.login({scopes:"auth_user",success:function(e){n.$store.dispatch("login",[e.code,n.user]),n.sub()},fail:function(e){console.log(e)}})},fail:function(e){console.log(e)}})},myPub:function(n){e.navigateTo({url:"/pages/myPub/myPub?id="+n})},mess:function(n,t){console.log("用户id:"+n),e.navigateTo({url:"/pages/mesDetail/mesDetail?id="+n})},detail:function(){var n=e.getStorageSync("token"),t=this.$userInfo.getUsername();void 0!=n?(this.$store.dispatch("checkToken",[n,t]),this.sub()):this.$store.state.isExpired=!1},auditMes:function(){this.$goEasy.subscribe({channel:this.$store.state.userInfo.id,onMessage:function(e){console.log("subChannel:"+e.channel+" content:"+e.content),this.mesNum++},onSuccess:function(){console.log("Subscribe successfully.")},onFailed:function(){console.log("Subscribe successfully.")}})},auth:function(n,t){null!=t&&null!=n?e.navigateTo({url:"/pages/auth/auth?id="+n+"&isTrue="+t}):e.showToast({title:"请先登录"})},userDetail:function(n){null!=n?e.navigateTo({url:"../UserDetail/UserDetail?id="+n}):e.showToast({title:"请先登录",icon:"error"})},preview:function(n){e.previewImage({urls:[n],longPressActions:{itemList:["保存图片","收藏"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}})}},onLoad:function(){this.detail(),this.auditMes()},computed:{mesNum:function(){return this.$store.state.mesNum},userInfo:function(){return this.$store.state.userInfo},isExpired:function(){return this.$store.state.isExpired}}};n.default=t}).call(this,t("543d")["default"])},"7f69":function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return u}));var u={uNavbar:function(){return t.e("uview-ui/components/u-navbar/u-navbar").then(t.bind(null,"59a7"))},uAvatar:function(){return t.e("uview-ui/components/u-avatar/u-avatar").then(t.bind(null,"7056"))},uIcon:function(){return t.e("uview-ui/components/u-icon/u-icon").then(t.bind(null,"d0ac"))},uCellGroup:function(){return t.e("uview-ui/components/u-cell-group/u-cell-group").then(t.bind(null,"f764"))},uCellItem:function(){return t.e("uview-ui/components/u-cell-item/u-cell-item").then(t.bind(null,"6b35"))},uBadge:function(){return t.e("uview-ui/components/u-badge/u-badge").then(t.bind(null,"a718"))}},o=function(){var e=this,n=e.$createElement;e._self._c},s=[]},8629:function(e,n,t){"use strict";t.r(n);var u=t("750e"),o=t.n(u);for(var s in u)"default"!==s&&function(e){t.d(n,e,(function(){return u[e]}))}(s);n["default"]=o.a},c343:function(e,n,t){"use strict";(function(e){t("1a67");u(t("66fd"));var n=u(t("0a8b"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},cdc1:function(e,n,t){}},[["c343","common/runtime","common/vendor"]]]);