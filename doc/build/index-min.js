/*!build time : 2014-08-12 12:29:54 PM*/
KISSY.add("kg/slide/2.0.2/lib/slide-util",function(a){"use strict";a.mix(a,{setHash:function(a,b){var c,d;"object"==typeof a?(c=window.location.href,b=a):c=a,c.indexOf("#")<0&&(c+="#");var e=this.getHash(c);for(d in b)e[d]=b[d];c=c.split("#")[0]+"#";for(d in e)c+=d+"="+e[d]+"&";return c=c.substr(0,c.length-1)},getHash:function(b){var c=b||window.location.href;if(c.indexOf("#")<0)return{};var d=c.split("#")[1];if(""===d)return{};"&"==d[d.length-1]&&(d=d.substr(0,d.length-1)),d=d.replace(/"/gi,"'"),d=d.replace(/=/gi,'":"'),d=d.replace(/&/gi,'","'),d+='"',d='{"'+d+"}";var e=a.JSON.parse(d);return e},_globalEval:function(a){if(a&&/\S/.test(a)){var b=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0],c=document.createElement("script");c.text=a,b.insertBefore(c,b.firstChild),setTimeout(function(){b.removeChild(c)},1)}},execScript:function(b){var c,d,e,f,g,h,i=this,j=new RegExp(/<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/gi),k=a.one("head")[0],l=/\ssrc=(['"])(.*?)\1/i,m=/\scharset=(['"])(.*?)\1/i;for(j.lastIndex=0;c=j.exec(b);)d=c[1],e=d?d.match(l):!1,e&&e[2]?(g=document.createElement("script"),g.src=e[2],(f=d.match(m))&&f[2]&&(g.charset=f[2]),g.async=!0,k.appendChild(g)):(h=c[2])&&h.length>0&&i._globalEval(h)},isDaily:function(){return/daily\.taobao\.net/.test(window.location.hostname)?!0:!1},getHiddenProp:function(){if("hidden"in document)return"hidden";for(var a=["webkit","moz","ms","o"],b=0;b<a.length;b++)if(a[b]+"Hidden"in document)return a[b]+"Hidden";return null},isHidden:function(){var a=this.getHiddenProp();return a?document[a]:!1}})},{requires:["node","json","event"]}),KISSY.add("kg/slide/2.0.2/lib/kissy2yui",function(a){"use strict";var b=a.config("mini")?a.Node.node:a.Node;a.augment(b,{_delegate:function(){var b=this;return a.isFunction(arguments[1])?b.delegate(arguments[0],arguments[2],arguments[1]):b.delegate.apply(b,arguments),b},indexOf:function(b){var c=this;if(a.isUndefined(b))return null;b[0]&&(b=b[0]);var d=0;return c.each(function(a,c){a[0]===b&&(d=c)}),d},size:function(){return this.length},set:function(a,b){return"innerHTML"===a?this.html(b):this.attr(a,b),this},get:function(a){var b=this,c={innerHTML:function(){return b.html()},region:function(){return{height:b.height(),width:b.width()}}};return a in c?c[a]():void 0},appendChild:function(){return this.append.apply(this,arguments),this},setStyle:function(){return this.css.apply(this,arguments),this},setStyles:function(){return this.css.apply(this,arguments),this},cloneNode:function(){return this.clone.apply(this,arguments)}}),a.Node.create=function(b){return a.Node(b)}},{requires:["node","event"]}),KISSY.add("kg/slide/2.0.2/lib/base",function(a){"use strict";var b=(a.Node.all,function(){if(!(this instanceof b))throw new Error('please use "new Slide()"');this.init.apply(this,arguments)});return b.plug=function(){},a.augment(b,a.Event.Target,{init:function(b,c){var d=this;if(a.isObject(b))d.con=b;else if(/^#/i.test(b))d.con=a.one(b);else if(a.one("#"+b))d.con=a.one("#"+b);else{if(!a.one(b))throw new Error("Slide Container Hooker not found");d.con=a.one(b)}if(d.buildParam(c),d.buildHTML(),d.bindEvent(),d.fire("ready",{index:0,navnode:d.tabs.item(0),pannelnode:d.pannels.item(0)}),d.reverse){var e;e=d.previous,d.previous=d.next,d.next=e}if(d.carousel)for(var f=0;f<d.colspan;f++)d.fix_for_transition_when_carousel(2*f);return d.fixSlideSize(),d.layerSlide&&d.initLayer(),d.stoped=null,d.renderPannelTextarea(d.currentTab),this},setWrapperSize:function(b){var c=this;a.isUndefined(b)&&(b=0),c.pannels=c.con.all("."+c.contentClass+" ."+c.pannelClass),c.length=c.pannels.length;var d={none:function(){},vSlide:function(){var a=c.animcon.get("region");c.animwrap.setStyles({height:(c.length+b)*a.height/c.colspan+"px"})},hSlide:function(){var a=c.animcon.get("region");c.animwrap.setStyles({width:(c.length+b)*a.width/c.colspan+"px"})},fade:function(){}};return d[c.effect](),a.isUndefined(b)||c.relocateCurrentTab(),this},add:function(b,c){var d=this;return(a.isUndefined(c)||c>d.length)&&(c=d.length),a.isString(b)&&(b=a.one(b)),d.transitions&&b.css({visibility:"hidden"}),c==d.length?(setTimeout(function(){d.setWrapperSize(1)},0),b.insertAfter(d.pannels[c-1])):b.insertBefore(d.pannels[c]),d.setWrapperSize(),d.fixSlideSize(d.currentTab),d.transitions&&b.css({visibility:""}),d.transitions,this},remove:function(b){var c=this;if(1!==c.length)return b<=c.currentTab&&(c.currentTab--,c.length--),c.transitions&&c.con.css({display:"none"}),a.one(c.pannels[b]).remove(),c.setWrapperSize(),c.transitions&&c.con.css({display:"block"}),c.fixSlideSize(c.currentTab),this},removeLast:function(){var a=this;return a.remove(a.length-1),a},renderLazyData:function(b){if(b.setStyle("display","none"),"1"!=b.attr("lazy-data")){if(b.attr("lazy-data","1"),a.isUndefined(d)){String(a.now())}else{a.stamp(d)}var c=b.get("innerHTML").replace(/&lt;/gi,"<").replace(/&gt;/gi,">"),d=a.Node.create("<div>"+c+"</div>");a.one(d).insertBefore(b),a.execScript(c)}},renderPannelTextarea:function(b){var c=this;if(c.pannels.item(b))for(var d=function(b){var d=(a.one(c.pannels.item(b)),c.pannels.item(b).all(".data-lazyload"));d&&d.each(function(a){c.renderLazyData(a)})},e=0;e<c.colspan;e++)d(b+e)},buildWrap:function(){var b=this;return b.animwrap=a.Node.create('<div style="position:absolute;"></div>'),b.animcon.children().appendTo(b.animwrap),b.animcon.empty().appendChild(b.animwrap),b.pannels=b.con.all("."+b.contentClass+" ."+b.pannelClass),b},doEffectInit:function(){var a=this,b={none:function(){a.pannels=a.con.all("."+a.contentClass+" ."+a.pannelClass),a.pannels.setStyles({display:"none"}),a.pannels.item(a.defaultTab).setStyles({display:"block"})},vSlide:function(){a.buildWrap();var b=a.animcon.get("region");a.pannels.setStyles({"float":"none",overflow:"hidden"}),a.animwrap.setStyles({height:a.length*b.height/a.colspan+"px",overflow:"hidden",top:-1*a.defaultTab*b.height+"px"})},hSlide:function(){a.buildWrap();var b=a.animcon.get("region");a.pannels.setStyles({"float":"left",overflow:"hidden"}),a.animwrap.setStyles(a.transitions?{overflow:"hidden",width:a.length*b.width/a.colspan+"px","-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+-1*a.defaultTab*b.width+"px,0,0)"}:{width:a.length*b.width/a.colspan+"px",overflow:"hidden",left:-1*a.defaultTab*b.width+"px"})},fade:function(){a.pannels=a.con.all("."+a.contentClass+" ."+a.pannelClass),a.pannels.setStyles({position:"absolute",zIndex:0}),a.pannels.each(function(b,c){b.setStyles(c==a.defaultTab?{opacity:1,display:"block"}:{opacity:0,display:"none"})})}};return b[a.effect](),this},buildHTML:function(){var b=this,c=b.con;b.tabs=c.all("."+b.navClass+" "+b.triggerSelector);var d=c.all("."+b.contentClass+" ."+b.pannelClass);if(b.length=d.size(),c.one("."+b.navClass)||a.Node('<ul class="'+b.navClass+'" style="display:none"></ul>').appendTo(b.con),0===b.tabs.size()){for(var e=c.all("."+b.navClass),f="",g=0;g<b.length;g++){var h="";0===g&&(h=b.selectedClass),f+='<li class="'+h+'"><a href="javascript:void(0);">'+(g+1)+"</a></li>"}e.set("innerHTML",f)}return b.tabs=c.all("."+b.navClass+" "+b.triggerSelector),b.animcon=c.one("."+b.contentClass),b.animwrap=null,b.doEffectInit(),b.carousel?(b.fixSlideSize(b.currentTab-b.colspan),b.highlightNav(b.currentTab-b.colspan)):(b.fixSlideSize(b.currentTab),b.highlightNav(b.getWrappedIndex(b.currentTab))),b.autoSlide===!0&&(b.invisibleStop&&b.isSlideVisible()||!b.invisibleStop)&&b.play(),this},getCurrentPannel:function(){var b=this;return a.one(b.pannels[b.currentTab])},renderWidth:function(){var a=this,b=a.animcon.get("region").width;return"hSlide"==a.effect&&(b/=a.colspan),a.pannels.setStyles({width:b+"px"}),this},renderHeight:function(){var a=this,b=a.animcon.get("region").height;return"vSlide"==a.effect&&(b/=a.colspan),a.pannels.setStyles({height:b+"px"}),this},relocateCurrentTab:function(b){var c=this;return a.isUndefined(b)&&(b=c.currentTab),"hSlide"==c.effect?(c.animwrap.setStyles(c.transitions?{"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+-1*b*c.animcon.get("region").width/c.colspan+"px,0,0)","-webkit-backface-visibility":"hidden"}:{left:-1*b*c.animcon.get("region").width/c.colspan}),c.currentTab=b,this):void 0},fixSlideSize:function(a){var b=this;return b.adaptive_fixed_width&&b.renderWidth(),b.adaptive_fixed_height&&b.renderHeight(),b.adaptive_fixed_size&&b.renderHeight().renderWidth(),b.resetSlideSize(a),this},removeHeightTimmer:function(){var b=this;a.isNull(b.heightTimmer)||(clearInterval(b.heightTimmer),b.heightTimmer=null)},addHeightTimmer:function(){var b=this;a.isNull(b.heightTimmer)||(clearInterval(b.heightTimmer),b.heightTimmer=null);var c=function(){"hSlide"==b.effect&&b.animcon.setStyles({height:b.pannels.item(b.currentTab).get("region").height+"px"})};b.heightTimmer=setInterval(c,100),c()},resetSlideSize:function(a){var b,c,d=this;return("undefined"==typeof a||null===a)&&(a=d.currentTab),"hSlide"==d.effect||"vSlide"==d.effect?("hSlide"==d.effect&&(b=d.adaptive_width?d.adaptive_width():d.animcon.get("region").width,c=d.pannels.item(a).get("region").height,d.animwrap.setStyles({width:d.pannels.size()*b+"px"}),b/=d.colspan,d.pannels.setStyles({width:b+"px",display:"block"}),d.animcon.setStyles({width:b*d.colspan+"px",overflow:"hidden"}),d.animWrapperAutoHeightSetting&&d.animcon.setStyles({height:c+"px"})),"vSlide"==d.effect&&(b=d.pannels.item(a).get("region").width,c=d.adaptive_height?d.adaptive_height():d.animcon.get("region").height,d.animwrap.setStyles({height:d.pannels.size()*c+"px"}),c/=d.colspan,d.pannels.setStyles({height:c*d.colspan+"px",display:"block"}),d.animcon.setStyles({height:c*d.colspan+"px",overflow:"hidden"}),d.animWrapperAutoHeightSetting&&d.animcon.setStyles({width:b+"px"})),this):void 0},getWrappedIndex:function(a){var b=this,c=0;return c=b.carousel?a<b.colspan?b.length-3*b.colspan+a:a>=b.length-b.colspan?a-(b.length-b.colspan):a-b.colspan:a},getMousePosition:function(){var b=this,c=function(a){b._t_mouseX=a.clientX,b._t_mouseY=a.clientY};a.one(document).on("mousemove",c),setTimeout(function(){a.one(window).detach("mouseover",c)},b.triggerDelay)},massTrigger:function(b,c){var d=this;return a.inArray(d.eventType,["mouseover","mouseenter"])?(d.getMousePosition(),void(a.isUndefined(d._fired)||a.isNull(d._fired)?d._fired=setTimeout(function(){d.inRegion([d._t_mouseX+a.one(window).scrollLeft(),d._t_mouseY+a.one(window).scrollTop()],a.one(c))&&b(a.one(c)),d._fired=null},d.triggerDelay):(clearTimeout(d._fired),d._fired=setTimeout(function(){d.inRegion([d._t_mouseX+a.one(window).scrollLeft(),d._t_mouseY+a.one(window).scrollTop()],a.one(c))&&b(a.one(c)),d._fired=null},d.triggerDelay)))):void b(a.one(c))},getMaxAnimDelay:function(b){var c=this,d=0;if(c.sublayers)return a.each(c.sublayers[b],function(a){a.durationout+a.delayout>d&&(d=a.durationout+a.delayout)}),d},inRegion:function(a,b){var c=b.offset(),d={width:b.width(),height:b.height()};return a[0]>=c.left&&a[0]<=c.left+d.width&&a[1]>=c.top&&a[1]<=c.top+d.height?!0:!1},bindEvent:function(){var b=this;if(a.inArray(b.eventType,["click","mouseover","mouseenter"])&&b.con._delegate(b.eventType,function(a){a.preventDefault(),b.massTrigger(function(a){var c=Number(b.tabs.indexOf(a));b.carousel&&(c=(c+1)%b.length),b.go(c),b.autoSlide&&b.stoped===!1&&b.stop().play()},a.currentTarget)},"."+b.navClass+" "+b.triggerSelector),b.hoverStop&&(b.con._delegate("mouseover",function(){if(b.isMouseover=!0,b.autoSlide){var a=b.stoped;b.stop(),b.stoped=a}},"."+b.contentClass+" ."+b.pannelClass),b.con._delegate("mouseout",function(){b.isMouseover=!1,b.autoSlide&&b.stoped===!1&&b.play()},"."+b.contentClass+" ."+b.pannelClass)),a.one(window).on("resize",function(){b.fixSlideSize(b.currentTab),b.relocateCurrentTab()}),b.on("beforeSwitch",function(){return"function"==typeof b.before_switch?(b._executeSwitch=b.before_switch(),b._executeSwitch):"boolean"==typeof b.before_switch?(b._executeSwitch=b.before_switch,b.before_switch):(b._executeSwitch=!0,!0)}),!b.touchmove)return this;if(b.con._delegate("touchstart",function(a){b.stop(),b.touching=!0,b.is_last()&&b.carousel&&b.fix_next_carousel(),b.is_first()&&b.carousel&&b.fix_pre_carousel(),b.startX=a.changedTouches[0].clientX,b.startY=a.changedTouches[0].clientY,b.animwrap.setStyles({"-webkit-transition-duration":"0s"}),b.startT=Number(new Date)},"."+b.contentClass),b.con._delegate("touchend",function(a){b.touching=!1;var c=a.changedTouches[0].clientX,d=Number(b.animcon.get("region").width);b.deltaX=Math.abs(c-b.startX);var e=Math.abs(c)<Math.abs(b.startX),f=!e,g=b.carousel?!1:b.is_last()&&e||b.is_first()&&f,h=function(){b.animwrap.setStyles({"-webkit-transition-duration":Number(b.speed)/2+"s","-webkit-transform":"translate3d("+-1*b.currentTab*b.animcon.get("region").width/b.colspan+"px,0,0)"})},i=function(){var a=b.animcon.get("region").width/b.colspan,c=parseInt((b.deltaX-a/2)/a,10);e?(c>=1&&b.length>2&&(b.currentTab+=c+1,b.currentTab>=b.length-b.colspan&&(b.currentTab=b.length-b.colspan-1)),b.next()):(c>=1&&b.length>2&&(b.currentTab+=-1*c-1,b.currentTab<=0&&(b.currentTab=1)),b.previous())};return b.touchmove&&b.deltaX<30?void h():(!g&&(b.touchmove&&b.deltaX>d/3||!b.touchmove&&b.carousel||!b.carousel&&b.touchmove&&"hSlide"==b.effect||!b.touchmove&&!b.carousel||Number(new Date)-b.startT<550)?i():h(),void(b.autoSlide&&b.stoped===!1&&b.play()))},"."+b.contentClass),b.touchmove&&(b.con._delegate("touchmove",function(a){if(!(a.touches.length>1)){b.deltaX=a.touches[0].clientX-b.startX;var c=b.is_last()&&b.deltaX<0||b.is_first()&&b.deltaX>0;if(!b.carousel&&"hSlide"==b.effect&&c&&(b.deltaX=b.deltaX/3),b.isScrolling=Math.abs(b.deltaX)<Math.abs(a.touches[0].clientY-b.startY)?!0:!1,!b.isScrolling){a.preventDefault(),b.stop();var d=Number(b.animcon.get("region").width/b.colspan),e=b.deltaX-b.currentTab*d;b.animwrap.setStyles({"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+e+"px,0,0)"})}}},"."+b.contentClass),b.animwrap&&b.animwrap.on("webkitTransitionEnd",function(){})),b.invisibleStop){var c=a.getHiddenProp();if(c){var d,e=c.replace(/[H|h]idden/,"")+"visibilitychange";a.one(document).on(e,function(){a.isHidden()?b.timer?(d=!0,b.stop()):d=!1:b.isSlideVisible()&&d&&b.play()})}a.one(window).on("scroll resize",function(){b.isSlideVisible()?b.timer||b.hoverStop&&(!b.hoverStop||b.isMouseover)||b.play():b.timer&&b.stop()})}return this},isSlideVisible:function(){var b=this,c=b.animcon.offset().left,d=b.animcon.offset().top,e=b.animcon.width(),f=b.animcon.height(),g=a.one(window).scrollTop(),h=a.one(window).scrollLeft();return g>d+f||g+a.one(window).height()<d||h>c+e||h+a.one(window).width()<c?!1:!0},initLayer:function(){var b=this;if(!("ontouchstart"in document.documentElement||a.UA.ie>0&&a.UA.ie<9)){var c=["durationin","easingin","durationout","easingout","delayin","delayout","slideindirection","slideoutdirection","offsetin","offsetout","alpha","easeInStrong","easeOutStrong","easeBothStrong","easeNone","easeIn","easeOut","easeBoth","elasticIn","elasticOut","elasticBoth","backIn","backOut","backBoth","bounceIn","bounceOut","bounceBoth","left","top","right","bottom"],d={durationin:1e3,easingin:"easeIn",durationout:1e3,easingout:"easeOut",delayin:300,delayout:300,slideindirection:"right",slideoutdirection:"left",alpha:!0,offsetin:50,offsetout:50},e=function(b){function e(a,b){var c=h[b];f[b]=void 0===c||null===c?a:c}var f=this,g=b.attr("rel").replace(/"'/gi,"").replace(new RegExp("("+c.join("|")+")","ig"),'"$1"'),h=a.JSON.parse("{"+g+"}");a.each(d,e),this.el=b,this.left=Number(b.css("left").replace("px","")),this.top=Number(b.css("top").replace("px","")),this.animIn=function(){var b=this,c=b.offsetin,d=b.slideindirection,e={left:function(){b.el.css({left:b.left-c})},top:function(){b.el.css({top:b.top-c})},right:function(){b.el.css({left:b.left+c})},bottom:function(){b.el.css({top:b.top+c})}};e[d](),setTimeout(function(){var c={left:{left:b.left},top:{top:b.top},bottom:{top:b.top},right:{left:b.left}},e={};a.mix(e,c[d]),b.alpha&&a.mix(e,{opacity:1}),a.one(b.el).animate(e,b.durationout/1e3,b.easingin,function(){})},b.delayin),b.alpha&&b.el.css({opacity:0})},this.animOut=function(){var b=this,c=b.offsetout,d=b.slideoutdirection,e={left:function(){b.el.css({left:b.left})},top:function(){b.el.css({top:b.top})},right:function(){b.el.css({left:b.left})},bottom:function(){b.el.css({top:b.top})}};e[d](),setTimeout(function(){var e={left:{left:b.left+c},top:{top:b.top+c},bottom:{top:b.top-c},right:{left:b.left-c}},f={};a.mix(f,e[d]),b.alpha&&a.mix(f,{opacity:0}),a.one(b.el).animate(f,b.durationout/1e3,b.easingout,function(){})},b.delayout),b.alpha&&b.el.css({opacity:1})}};b.sublayers=[],b.pannels.each(function(a,c){return("vSlide"==b.effect||"hSlide"==b.effect)&&a.css({position:"relative"}),0===a.all('[alt="sublayer"]').length?void(b.sublayers[c]=[]):(void 0===b.sublayers[c]&&(b.sublayers[c]=[]),void a.all('[alt="sublayer"]').each(function(a){b.sublayers[c].push(new e(a))}))}),b.on("beforeSwitch",function(a){return a.index===b.currentTab?!1:void b.subLayerRunin(a.index)}),b.on("beforeTailSwitch",function(a){return b.subLayerRunout(a.index),b.getMaxAnimDelay(a.index)})}},subLayerRunin:function(b){var c=this,d=c.sublayers[b];a.each(d,function(a){a.animIn()})},subLayerRunout:function(b){var c=this,d=c.sublayers[b];a.each(d,function(a){a.animOut()})},buildParam:function(b){function c(a,c){var e=b[c];d[c]=void 0===e||null===e?a:e}var d=this;return(void 0===b||null===b)&&(b={}),a.each({autoSlide:!1,speed:300,timeout:3e3,effect:"none",eventType:"click",easing:"easeBoth",hoverStop:!0,invisibleStop:!1,selectedClass:"selected",conClass:"t-slide",navClass:"tab-nav",triggerSelector:"li",contentClass:"tab-content",pannelClass:"tab-pannel",before_switch:!0,carousel:!1,reverse:!1,touchmove:!0,adaptive_fixed_width:!1,adaptive_fixed_height:!1,adaptive_fixed_size:!1,adaptive_width:!1,adaptive_height:!1,defaultTab:0,layerSlide:!1,layerClass:"tab-animlayer",colspan:1,animWrapperAutoHeightSetting:!0,webkitOptimize:!0,triggerDelay:300,autoActived:!0},c),a.mix(d,{tabs:[],animcon:null,pannels:[],timmer:null,touching:!1}),d.speed=d.speed/1e3,0!==d.defaultTab&&(d.defaultTab=Number(d.defaultTab)-1),d.carousel&&(d.defaultTab=0,d.defaultTab=d.colspan+d.defaultTab,d.effect="hSlide"),d.currentTab=d.defaultTab,d.transitions="webkitTransition"in document.body.style&&d.webkitOptimize,d},fix_for_transition_when_carousel:function(a){var b=this;"undefined"==typeof a&&(a=0);var c=b.con;if(b.animcon=b.con.one("."+b.contentClass),b.animwrap=b.animcon.one("div"),b.pannels=c.all("."+b.contentClass+" ."+b.pannelClass),"hSlide"==b.effect){{var d=Number(b.animcon.get("region").width/b.colspan);Number(b.animcon.get("region").height)}b.animwrap.setStyle("width",b.pannels.size()*d+2*d);var e=b.pannels.item(a).cloneNode(!0),f=b.pannels.item(b.pannels.size()-1-a).cloneNode(!0);if(b.animwrap.append(e),b.animwrap.prepend(f),0===b.defaultTab)var g=-1*d*(a/2+1+b.defaultTab-1);else var g=-1*d*(a/2+1);b.transitions?b.animwrap.setStyles({"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+g+"px,0,0)","-webkit-backface-visibility":"hidden",left:"0"}):b.animwrap.setStyle("left",g)}return b.pannels=c.all("."+b.contentClass+" ."+b.pannelClass),b.length=b.pannels.size(),this},isAming:function(){return!1},previous:function(a){var b=this,c=b.currentTab+b.length-1-(b.colspan-1);return c>=b.length-b.colspan+1&&(c%=b.length-b.colspan+1),b.carousel&&b.is_first()?(b.fix_pre_carousel(),b.previous.call(b),this):(b.go(c,a),this)},is_last:function(){var a=this;return a.currentTab==a.length-(a.colspan-1)-1?!0:!1},is_first:function(){var a=this;return 0===a.currentTab?!0:!1},next:function(a){var b=this,c=b.currentTab+1;return c>=b.length-b.colspan+1&&(c%=b.length-b.colspan+1),b.carousel&&b.is_last()?(b.fix_next_carousel(),b.next.call(b),this):(b.go(c,a),this)},fix_next_carousel:function(){var a=this;a.currentTab=a.colspan;var b=a.con;"none"!=a.effect&&(a.pannels=b.all("."+a.contentClass+" ."+a.pannelClass));var c="-"+Number(a.animcon.get("region").width).toString()+"px";"hSlide"==a.effect?a.transitions?a.animwrap.setStyles({"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+c+",0,0)"}):a.animwrap.setStyle("left",c):"vSlide"==a.effect},fix_pre_carousel:function(){var a=this;a.currentTab=a.length-1-2*a.colspan+1;var b=a.con;"none"!=a.effect&&(a.pannels=b.all("."+a.contentClass+" ."+a.pannelClass));var c="-"+(Number(a.animcon.get("region").width/a.colspan)*a.currentTab).toString()+"px";"hSlide"==a.effect?a.transitions?a.animwrap.setStyles({"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+c+",0,0)"}):a.animwrap.setStyle("left",c):"vSlide"==a.effect},highlightNav:function(a){var b=this;return b.carousel&&b.colspan>1?this:(b.tabs.item(a)&&(b.tabs.removeClass(b.selectedClass),b.tabs.item(a).addClass(b.selectedClass)),this)},hightlightNav:function(){var a=this;return a.highlightNav.apply(a,arguments),this},unhighlightNav:function(a){var b=this;return b.carousel&&b.colspan>1?this:(b.tabs.item(a)&&b.tabs.removeClass(b.selectedClass),this)},unhighlightNavAll:function(){var a=this;return a.tabs.removeClass(a.selectedClass),this},switch_to:function(b,c){var d=this;if(c===!1)var e=!1;else var e=!0;var f=function(){a.isFunction(c)&&c.call(d,d),d.fire("afterSwitch",{index:d.currentTab,navnode:d.tabs.item(d.getWrappedIndex(d.currentTab)),pannelnode:d.pannels.item(d.currentTab)})},g=d.fire("beforeTailSwitch",{index:d.currentTab,navnode:d.tabs.item(d.getWrappedIndex(d.currentTab)),pannelnode:d.pannels.item(d.currentTab)});if(d.fixSlideSize(b),d.autoSlide&&d.stoped===!1&&d.stop().play(),b>=d.length&&(b%=d.length),b==d.currentTab)return this;if(d.anim)try{d.anim.stop(),d.anim=null}catch(h){}var i={none:function(a){d.pannels.setStyles({display:"none"}),d.pannels.item(a).setStyles({display:"block"}),f()},vSlide:function(b){d.transitions?(d.animwrap.setStyles({"-webkit-transition-duration":(e?d.speed:"0")+"s","-webkit-transform":"translate3d(0,"+-1*b*d.animcon.get("region").height/d.colspan+"px,0)","-webkit-backface-visibility":"hidden"}),e?(d.anim=a.one(d.animwrap).animate({"-webkit-transition-duration":d.speed+"s","-webkit-transform":"translate3d(0,"+-1*b*d.animcon.get("region").height/d.colspan+"px,0)","-webkit-backface-visibility":"hidden",opacity:1},a.config("mini")?d.speed:.001,d.easing,function(){}),setTimeout(function(){f()},1e3*d.speed)):f()):e?d.anim=a.one(d.animwrap).animate({top:-1*b*d.animcon.get("region").height/d.colspan},d.speed,d.easing,function(){f()}):(d.animwrap.css({top:-1*b*d.animcon.get("region").height/d.colspan}),f())},hSlide:function(b){d.transitions?e?(d.anim=a.one(d.animwrap).animate({"-webkit-transition-duration":d.speed+"s","-webkit-transform":"translate3d("+-1*b*d.animcon.get("region").width/d.colspan+"px,0,0)","-webkit-backface-visibility":"hidden",opacity:1},a.config("mini")?d.speed:.001,d.easing,function(){}),setTimeout(function(){f()},1e3*d.speed)):f():e?d.anim=a.one(d.animwrap).animate({left:-1*b*d.animcon.get("region").width/d.colspan},d.speed,d.easing,function(){f()}):(d.animwrap.css({left:-1*b*d.animcon.get("region").width/d.colspan}),f())},fade:function(b){var c=d.currentTab;d.pannels.item(b).setStyle({display:"block"}),d.pannels.item(b).setStyle("opacity",0),d.pannels.item(c).setStyle("zIndex",1),d.pannels.item(b).setStyle("zIndex",2),d.anim=a.one(d.pannels.item(b)).animate({opacity:1},d.speed,d.easing,function(){d.pannels.item(c).setStyle("zIndex",0),d.pannels.item(b).setStyle("zIndex",1),d.pannels.item(c).setStyle("opacity",0),d.pannels.item(c).setStyles({display:"none"}),f(),d.fire("afterSwitch",{index:b,navnode:d.tabs.item(d.getWrappedIndex(b)),pannelnode:d.pannels.item(b)})})}},j=function(){var a=d.fire("beforeSwitch",{index:b,navnode:d.tabs.item(b),pannelnode:d.pannels.item(b)});a._executeSwitch!==!1&&(b+d.colspan>d.pannels.size()&&(b=d.pannels.size()-d.colspan),i[d.effect](b),d.currentTab=b,d.highlightNav(d.getWrappedIndex(b)),d.fire("switch",{index:b,navnode:d.tabs.item(d.getWrappedIndex(b)),pannelnode:d.pannels.item(b)}),d.renderPannelTextarea(b))};a.isNumber(g)?setTimeout(function(){j()},g):j()},go:function(a,b){var c=this;return c.switch_to(a,b),this},play:function(){var a=this;return null!==a.timer&&clearTimeout(a.timer),a.timer=setTimeout(function(){a.next().play()},Number(a.timeout)),a.stoped=!1,this},stop:function(){var a=this;return clearTimeout(a.timer),a.timer=null,a.stoped=!0,this}}),b},{requires:["node","json","event","anim","ua","./slide-util","./kissy2yui"]}),KISSY.add("kg/slide/2.0.2/index",function(a,b){return b},{requires:["./lib/base"]});