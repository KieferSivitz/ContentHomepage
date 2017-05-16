webpackJsonp([0],[,function(t,e,n){n(17);var o=n(0)(n(10),n(26),null,null);t.exports=o.exports},function(t,e,n){n(16);var o=n(0)(n(12),n(25),null,null);t.exports=o.exports},function(t,e,n){n(19);var o=n(0)(n(13),n(28),null,null);t.exports=o.exports},function(t,e,n){n(18);var o=n(0)(n(14),n(27),null,null);t.exports=o.exports},,function(t,e,n){"use strict";var o=n(5),i=n(30),r=n(23),a=n.n(r);o.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"homeComponent",component:a.a}]})},function(t,e,n){n(20);var o=n(0)(n(9),n(29),null,null);t.exports=o.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),i=n(7),r=n.n(i),a=n(4),c=n.n(a),s=n(3),u=n.n(s),d=n(1),l=n.n(d),m=n(2),p=n.n(m),h=n(6);o.a.config.productionTip=!1,new o.a({el:"#app",router:h.a,template:"<App/>",components:{App:r.a}}),o.a.component({el:"#twitterComponent",router:h.a,template:"<twitterComponent/>",components:{twitterComponent:c.a}}),o.a.component({el:"#twitchComponent",router:h.a,template:"<twitchComponent/>",components:{twitchComponent:u.a}}),o.a.component({el:"#twitchChatComponent",router:h.a,template:"<twitchChatComponent/>",components:{twitchChatComponent:p.a}}),o.a.component({el:"#gridComponent",router:h.a,template:"<gridComponent/>",components:{gridComponent:l.a}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",data:function(){return{msg:"Welcome to the social media aggregator!"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),i=n.n(o),r=n(3),a=n.n(r),c=n(22),s=n.n(c),u=n(2),d=n.n(u),l=s.a.GridLayout,m=s.a.GridItem;e.default={name:"gridComponent",components:{twitterComponent:i.a,twitchComponent:a.a,GridLayout:l,GridItem:m,twitchChatComponent:d.a},data:function(){return{msg:"Welcome to the social media aggregator!",layout:[{x:0,y:0,w:3,h:20,i:"twitterComponent",id:"gridComponent0"},{x:3,y:0,w:9,h:20,i:"twitchComponent",id:"gridComponent1"}]}},methods:{resizeWithContainer:function(t,e,n,o,i){var r=Number(o)-70,a=r*(9/16);a>Number(i)-70&&(a=Number(i)-70),document.getElementById("twitchPlayer").width=r,document.getElementById("twitchPlayer").height=a},resizedEvent:function(t,e,n,o,i){switch(t){case"twitchComponent":this.resizeWithContainer(t,e,n,o,i);break;case"twitterComponent":document.getElementById("twitter-widget-0").style.height=String(i-70+"px")}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n.n(o);e.default={name:"homeComponent",components:{gridComponent:i.a},data:function(){return{msg:"Welcome to the content homepage!"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"twitchChatComponent",data:function(){return{msg:"Welcome to the social media aggregator!"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(21);n.n(o);e.default={name:"twitchComponent",data:function(){return{msg:"Welcome to the social media aggregator!"}},methods:{renderPlayer:function(t){var e=.68*window.innerWidth,n=e*(9/16);n>=600&&(n=720);var o={width:e,height:n,channel:t,autoplay:!1};return new window.Twitch.Player("streamWindow",o)}},mounted:function(){var t=this.renderPlayer("vgbootcamp");document.getElementById("streamWindow").firstChild.id="twitchPlayer",window.addEventListener("resize",function(){var t=Number(document.getElementById("gridComponent1").getBoundingClientRect().width)-70,e=t*(9/16),n=document.getElementById("gridComponent1").getBoundingClientRect().height;e>n-70&&(e=n-70),document.getElementById("twitchPlayer").width=t,document.getElementById("twitchPlayer").height=e}),document.getElementById("twitchInput").addEventListener("keydown",function(e){if(13===e.keyCode){var n=e.target.value;t.setChannel(n)}})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"twitterComponent",data:function(){return{msg:"Welcome to twitter!"}},beforeMount:function(){window.twttr=function(t,e,n){var o,i=t.getElementsByTagName(e)[0],r=window.twttr||{};return t.getElementById(n)?r:(o=t.createElement(e),o.id=n,o.src="https://platform.twitter.com/widgets.js",i.parentNode.insertBefore(o,i),r._e=[],r.ready=function(t){r._e.push(t)},r)}(document,"script","twitter-wjs"),document.getElementById("twitter-wjs").addEventListener("load",function(){twttr.ready(function(t){window.twttr.widgets.createTimeline({sourceType:"list",ownerScreenName:"KieferSivitz",slug:"Smash"},document.getElementById("twitter-feed"),{height:document.getElementById("gridComponent0").getBoundingClientRect().height-40,related:"twitterdev,twitterapi"})})})}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,function(t,e,n){n(15);var o=n(0)(n(11),n(24),null,null);t.exports=o.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"componentContainer"},[t._m(0),t._v(" "),n("gridComponent"),t._v(" "),t._m(1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-title"},[n("h1",[t._v("\n            Welcome to the Content Homepage!\n        ")]),t._v(" "),n("h3",[t._v("\n            Currently combining Twitch and Twitter for Super Smash Brothers Melee!\n        ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-title"},[n("h5",[t._v("\n            More sites and functionality coming in the near future! (Twitch chat, personalized twitter feed, twitch channel options)\n        ")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"twitchChatComponent"},[n("iframe",{attrs:{frameborder:"0",scrolling:"no",id:"twitchChat",src:"https://www.twitch.tv/tradechat/chat",height:"640",width:"480",allowfullscreen:"true"}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"gridComponent"},[n("div",{staticClass:"layout"},[n("grid-layout",{attrs:{layout:t.layout,"col-num":12,"row-height":30,"is-draggable":!0,"is-resizable":!0,"vertical-compact":!0,margin:[10,10],"use-css-transforms":!0}},t._l(t.layout,function(e){return n("grid-item",{key:e.id,staticClass:"gridItems",attrs:{id:e.id,x:e.x,y:e.y,w:e.w,h:e.h,i:e.i},on:{resized:t.resizedEvent}},[n(e.i,{tag:"component",staticClass:"componentContainer"})],1)}))],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"twitterComponent",attrs:{id:"twitterComponent"}},[n("div",{attrs:{id:"twitter-feed"}})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"twitchComponent"},[n("span",{staticStyle:{color:"white"}},[t._v("Change the channel:  ")]),t._v(" "),n("input",{attrs:{type:"text",id:"twitchInput"}}),t._v(" "),n("div",{attrs:{id:"streamWindow"}})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}}],[8]);
//# sourceMappingURL=app.e723b7747702b494ef51.js.map