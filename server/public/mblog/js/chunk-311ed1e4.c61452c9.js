(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-311ed1e4"],{"60f2":function(t,e,n){"use strict";var s=n("7014"),c=n.n(s);c.a},7014:function(t,e,n){},"72c9":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"recommend"},[n("Navbar",{attrs:{title:"音乐精选"}}),n("van-search",{attrs:{placeholder:"请输入搜索关键词"},on:{search:t.onSearch},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),t.searchList.length?t._e():n("ul",{staticClass:"music-list"},[n("li",{staticClass:"list-tit"},[t._v("热门榜单")]),t._l(t.hots,function(e,s){return n("li",{key:s,staticClass:"music-item",on:{click:function(n){return t.fetchMusicInfo(e.id)}}},[n("p",{staticClass:"tit"},[t._v(t._s(e.name))]),n("p",{staticClass:"con"},t._l(e.ar,function(e,s){return n("span",{key:s},[t._v(t._s(e.name)+" / ")])}),0)])})],2),t.searchList.length?n("ul",{staticClass:"music-list"},[n("li",{staticClass:"list-tit"},[t._v("搜索结果")]),t._l(t.searchList,function(e,s){return n("li",{key:s,staticClass:"music-item",on:{click:function(n){return t.fetchMusicInfo(e.id)}}},[n("p",{staticClass:"tit"},[t._v(t._s(e.name))]),n("p",{staticClass:"con"},[t._v(t._s(e.name))])])})],2):t._e()],1)},c=[],r=(n("8e6e"),n("ac6a"),n("456d"),n("96cf"),n("3b8d")),i=n("bd86"),a=n("2f62");function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,s)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(n,!0).forEach(function(e){Object(i["a"])(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var l={name:"Recommend",data:function(){return{value:"",hots:[],searchList:[]}},methods:u({},Object(a["b"])("music",["fetchMusicInfo"]),{onSearch:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.value,t.next=3,this.$http.get("http://music.qianheye.cn/search?keywords=".concat(e));case 3:n=t.sent,this.searchList=n.data.result.songs;case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}),mounted:function(){var t=this;this.$http.get("http://music.qianheye.cn/top/list?idx=1").then(function(e){t.hots=e.data.playlist.tracks.slice(0,30)})}},h=l,f=(n("60f2"),n("2877")),p=Object(f["a"])(h,s,c,!1,null,"2bcbebfb",null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-311ed1e4.c61452c9.js.map