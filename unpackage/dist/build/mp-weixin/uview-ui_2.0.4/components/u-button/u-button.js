(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui_2.0.4/components/u-button/u-button"],{6041:function(t,n,i){"use strict";i.r(n);var e=i("bc8f"),o=i("cf4e");for(var r in o)"default"!==r&&function(t){i.d(n,t,(function(){return o[t]}))}(r);i("965d");var u,c=i("f0c5"),l=Object(c["a"])(o["default"],e["b"],e["c"],!1,null,"9e67c118",null,!1,e["a"],u);n["default"]=l.exports},"965d":function(t,n,i){"use strict";var e=i("e2eb"),o=i.n(e);o.a},bc8f:function(t,n,i){"use strict";i.d(n,"b",(function(){return o})),i.d(n,"c",(function(){return r})),i.d(n,"a",(function(){return e}));var e={uLoadingIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uview-ui_2.0.4/components/u-loading-icon/u-loading-icon")]).then(i.bind(null,"30d6"))},uIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uview-ui_2.0.4/components/u-icon/u-icon")]).then(i.bind(null,"8c15"))}},o=function(){var t=this,n=t.$createElement,i=(t._self._c,t.__get_style([t.baseColor,t.$u.addStyle(t.customStyle)])),e=Number(t.hoverStartTime),o=Number(t.hoverStayTime);t.$mp.data=Object.assign({},{$root:{s0:i,m0:e,m1:o}})},r=[]},c40f:function(t,n,i){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=u(i("0ed3")),o=u(i("cff8")),r=u(i("10eb"));function u(t){return t&&t.__esModule?t:{default:t}}var c={name:"u-button",mixins:[t.$u.mpMixin,t.$u.mixin,e.default,o.default,r.default],data:function(){return{}},computed:{bemClass:function(){return this.color?this.bem("button",["shape","size"],["disabled","plain","hairline"]):this.bem("button",["type","shape","size"],["disabled","plain","hairline"])},loadingColor:function(){return this.plain?this.color?this.color:this.$u.config.color["u-".concat(this.type)]:"info"===this.type?"#c9c9c9":"rgb(200, 200, 200)"},iconColor:function(){return this.plain?this.color?this.color:this.type:"#ffffff"},baseColor:function(){var t={};return this.color&&(t.color=this.plain?this.color:"white",this.plain||(t["background-color"]=this.color),-1!==this.color.indexOf("gradient")?(t.borderTopWidth=0,t.borderRightWidth=0,t.borderBottomWidth=0,t.borderLeftWidth=0,this.plain||(t.backgroundImage=this.color)):(t.borderColor=this.color,t.borderWidth="1px",t.borderStyle="solid")),t},nvueTextStyle:function(){var t={};return"info"===this.type&&(t.color="#323233"),this.color&&(t.color=this.plain?this.color:"white"),t.fontSize=this.textSize+"px",t},textSize:function(){var t=14,n=this.size;return"large"===n&&(t=16),"normal"===n&&(t=14),"small"===n&&(t=12),"mini"===n&&(t=10),t}},methods:{clickHandler:function(){this.disabled||this.loading||this.$emit("click")},getphonenumber:function(t){this.$emit("getphonenumber",t)},getuserinfo:function(t){this.$emit("getuserinfo",t)},error:function(t){this.$emit("error",t)},opensetting:function(t){this.$emit("opensetting",t)},launchapp:function(t){this.$emit("launchapp",t)}}};n.default=c}).call(this,i("543d")["default"])},cf4e:function(t,n,i){"use strict";i.r(n);var e=i("c40f"),o=i.n(e);for(var r in e)"default"!==r&&function(t){i.d(n,t,(function(){return e[t]}))}(r);n["default"]=o.a},e2eb:function(t,n,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui_2.0.4/components/u-button/u-button-create-component',
    {
        'uview-ui_2.0.4/components/u-button/u-button-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6041"))
        })
    },
    [['uview-ui_2.0.4/components/u-button/u-button-create-component']]
]);