(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userUpdate/userUpdate"],{"01fe":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return u}));var u={uNavbar:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui_2.0.4/components/u-navbar/u-navbar")]).then(n.bind(null,"c76d"))},uButton:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui_2.0.4/components/u-button/u-button")]).then(n.bind(null,"6041"))},uCellGroup:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui_2.0.4/components/u-cell-group/u-cell-group")]).then(n.bind(null,"f82b"))},uCell:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui_2.0.4/components/u-cell/u-cell")]).then(n.bind(null,"4a38"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui_2.0.4/components/u-input/u-input")]).then(n.bind(null,"50ee"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui_2.0.4/components/u-form-item/u-form-item")]).then(n.bind(null,"0f6c"))},uToast:function(){return n.e("uview-ui_2.0.4/components/u-toast/u-toast").then(n.bind(null,"ac6f"))},uCode:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui_2.0.4/components/u-code/u-code")]).then(n.bind(null,"e19b"))},uCodeInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui_2.0.4/components/u-code-input/u-code-input")]).then(n.bind(null,"e8e1"))}},o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"44a8":function(t,e,n){"use strict";(function(t){n("1a67");u(n("66fd"));var e=u(n("e575"));function u(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"4e4f":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{tips:"",id:0,input:"",codes:""}},computed:{userInfo:function(){return this.$store.state.userInfo},code:function(){return this.$store.state.code}},methods:{finish:function(t){this.codes=t},save:function(e,n,u){console.log(u),2==e?this.$store.dispatch("updateName",[this.input,u]):3==e?this.$store.dispatch("updateSex",[this.input,u]):n==this.codes?this.$store.dispatch("updateqq",[this.input,u]):t.showToast({title:"验证码不正确"})},back:function(){t.navigateBack({url:"../UserDetail/UserDetail"})},codeChange:function(t){this.tips=t},getCode:function(){var e=this;this.$refs.uCode.canGetCode?(this.$store.dispatch("getCode",this.input),t.showLoading({title:"正在获取验证码"}),setTimeout((function(){t.hideLoading(),e.$u.toast("验证码已发送"),e.$refs.uCode.start()}),1500)):this.$u.toast("倒计时结束后再发送")},end:function(){this.$u.toast("倒计时结束")},start:function(){this.$u.toast("倒计时开始")}},onShow:function(){},onLoad:function(t){this.id=t.id,this.input=t.text,console.log(t.text)}};e.default=n}).call(this,n("543d")["default"])},a177:function(t,e,n){"use strict";n.r(e);var u=n("4e4f"),o=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);e["default"]=o.a},e575:function(t,e,n){"use strict";n.r(e);var u=n("01fe"),o=n("a177");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);var r,c=n("f0c5"),s=Object(c["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);e["default"]=s.exports}},[["44a8","common/runtime","common/vendor"]]]);