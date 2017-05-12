webpackJsonp([0],[,function(t,e,n){n(19);var o=n(0)(n(13),n(28),null,null);t.exports=o.exports},function(t,e,n){n(18);var o=n(0)(n(14),n(27),null,null);t.exports=o.exports},function(t,e,n){n(17);var o=n(0)(n(10),n(26),null,null);t.exports=o.exports},function(t,e,n){n(16);var o=n(0)(n(12),n(25),null,null);t.exports=o.exports},,function(t,e,n){"use strict";var o=n(5),i=n(30),r=n(1),a=n.n(r),c=n(2),s=n.n(c),d=n(23),m=n.n(d);o.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"homeComponent",component:m.a},{path:"/twitter",name:"twitterComponent",component:s.a},{path:"/twitchComponent",name:"twitchComponent",component:a.a}]})},function(t,e,n){n(20);var o=n(0)(n(9),n(29),null,null);t.exports=o.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),i=n(7),r=n.n(i),a=n(2),c=n.n(a),s=n(1),d=n.n(s),m=n(3),u=n.n(m),l=n(4),p=n.n(l),w=n(6);o.a.config.productionTip=!1,new o.a({el:"#app",router:w.a,template:"<App/>",components:{App:r.a}}),o.a.component({el:"#twitterComponent",router:w.a,template:"<twitterComponent/>",components:{twitterComponent:c.a}}),o.a.component({el:"#twitchComponent",router:w.a,template:"<twitchComponent/>",components:{twitchComponent:d.a}}),o.a.component({el:"#twitchChatComponent",router:w.a,template:"<twitchChatComponent/>",components:{twitchChatComponent:p.a}}),o.a.component({el:"#gridComponent",router:w.a,template:"<gridComponent/>",components:{gridComponent:u.a}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",data:function(){return{msg:"Welcome to the social media aggregator!"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),i=n.n(o),r=n(1),a=n.n(r),c=n(22),s=n.n(c),d=n(4),m=n.n(d),u=s.a.GridLayout,l=s.a.GridItem;e.default={name:"gridComponent",components:{twitterComponent:i.a,twitchComponent:a.a,GridLayout:u,GridItem:l,twitchChatComponent:m.a},data:function(){return{msg:"Welcome to the social media aggregator!",layout:[{x:0,y:0,w:3,h:20,i:"twitterComponent",id:"gridComponent0"},{x:3,y:0,w:9,h:20,i:"twitchComponent",id:"gridComponent1"}],resizedEvent:function(t,e,n,o,i){switch(t){case"twitchComponent":var r=Number(o)-40,a=r*(9/16);a>Number(i)&&(a=Number(i)-40),document.getElementById("twitchPlayer").width=r,document.getElementById("twitchPlayer").height=a;break;case"twitterComponent":document.getElementById("twitter-widget-0").style.height=String(i-40+"px")}}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),i=n.n(o);e.default={name:"homeComponent",components:{gridComponent:i.a},data:function(){return{msg:"Welcome to the social media aggregator!"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"twitchChatComponent",data:function(){return{msg:"Welcome to the social media aggregator!"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(21);n.n(o);e.default={initialWidthModifier:.68,name:"twitchComponent",data:function(){return{msg:"Welcome to the social media aggregator!"}},methods:{renderPlayer:function(t){var e=.68*window.innerWidth,n=e*(9/16),o={width:e,height:n,channel:t,autoplay:!1};new window.Twitch.Player("streamWindow",o).setVolume(.5)}},mounted:function(){this.renderPlayer("vgbootcamp"),document.getElementById("streamWindow").firstChild.id="twitchPlayer",window.addEventListener("resize",function(){var t=Number(document.getElementById("gridComponent1").getBoundingClientRect().width)-40,e=t*(9/16),n=document.getElementById("gridComponent1").getBoundingClientRect().height;e>n&&(e=n-40),document.getElementById("twitchPlayer").width=t,document.getElementById("twitchPlayer").height=e})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"twitterComponent",data:function(){return{msg:"Welcome to twitter!"}},beforeMount:function(){window.twttr=function(t,e,n){var o,i=t.getElementsByTagName(e)[0],r=window.twttr||{};return t.getElementById(n)?r:(o=t.createElement(e),o.id=n,o.src="https://platform.twitter.com/widgets.js",i.parentNode.insertBefore(o,i),r._e=[],r.ready=function(t){r._e.push(t)},r)}(document,"script","twitter-wjs"),document.getElementById("twitter-wjs").addEventListener("load",function(){twttr.ready(function(t){window.twttr.widgets.createTimeline({sourceType:"list",ownerScreenName:"KieferSivitz",slug:"Smash"},document.getElementById("twitter-feed"),{height:.57*window.innerHeight,related:"twitterdev,twitterapi"})})})},mounted:function(){document.getElementById("twitter-widget-0").style.height=String(document.getElementById("gridComponent0").innerHeight-40+"px")}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,function(t,e,n){n(15);var o=n(0)(n(11),n(24),null,null);t.exports=o.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"componentContainer"},[n("gridComponent")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"twitchChatComponent"},[n("iframe",{attrs:{frameborder:"0",scrolling:"no",id:"twitchChat",src:"https://www.twitch.tv/tradechat/chat",height:"640",width:"480",allowfullscreen:"true"}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"gridComponent"},[n("div",{staticClass:"layout"},[n("grid-layout",{attrs:{layout:t.layout,"col-num":12,"row-height":30,"is-draggable":!0,"is-resizable":!0,"vertical-compact":!0,margin:[10,10],"use-css-transforms":!0}},t._l(t.layout,function(e){return n("grid-item",{key:e.id,staticClass:"gridItems",attrs:{id:e.id,x:e.x,y:e.y,w:e.w,h:e.h,i:e.i},on:{resized:t.resizedEvent}},[n(e.i,{tag:"component",staticClass:"componentContainer"})],1)}))],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"twitterComponent",attrs:{id:"twitterComponent"}},[n("div",{attrs:{id:"twitter-feed"}})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"twitchComponent"},[n("div",{attrs:{id:"streamWindow"}})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}}],[8]);
//# sourceMappingURL=app.70fc4491e207c62c9bfb.js.map