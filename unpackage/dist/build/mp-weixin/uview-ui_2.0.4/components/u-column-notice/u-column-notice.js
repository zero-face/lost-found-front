(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui_2.0.4/components/u-column-notice/u-column-notice"],{"11ac":function(t,n,e){"use strict";e.r(n);var u=e("2f9b"),i=e("bb18");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("37d0");var c,r=e("f0c5"),a=Object(r["a"])(i["default"],u["b"],u["c"],!1,null,"14777f59",null,!1,u["a"],c);n["default"]=a.exports},"2f9b":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return u}));var u={uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui_2.0.4/components/u-icon/u-icon")]).then(e.bind(null,"8c15"))}},i=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__get_style([t.textStyle])),u=["link","closable"].includes(t.mode);t.$mp.data=Object.assign({},{$root:{s0:e,g0:u}})},o=[]},"37d0":function(t,n,e){"use strict";var u=e("ffeb"),i=e.n(u);i.a},"71a1":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=i(e("cd44"));function i(t){return t&&t.__esModule?t:{default:t}}var o={mixins:[t.$u.mpMixin,t.$u.mixin,u.default],watch:{text:{immediate:!0,handler:function(n,e){t.$u.test.array(n)||t.$u.error("column模式要求text参数为数组")}}},computed:{textStyle:function(){var n={};return n.color=this.color,n.fontSize=t.$u.addUnit(this.fontSize),n},vertical:function(){return"horizontal"!=this.mode}},data:function(){return{}},methods:{clickHandler:function(t){this.$emit("click",t)},close:function(){this.$emit("close")}}};n.default=o}).call(this,e("543d")["default"])},bb18:function(t,n,e){"use strict";e.r(n);var u=e("71a1"),i=e.n(u);for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);n["default"]=i.a},ffeb:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui_2.0.4/components/u-column-notice/u-column-notice-create-component',
    {
        'uview-ui_2.0.4/components/u-column-notice/u-column-notice-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("11ac"))
        })
    },
    [['uview-ui_2.0.4/components/u-column-notice/u-column-notice-create-component']]
]);
