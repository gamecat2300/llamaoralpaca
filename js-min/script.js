(function ($) {
	"use strict";

	$.fn.halloweenBats = function (options) {
		var Bat,
			bats = [],
			$body= $('body'),
			innerWidth = $body.innerWidth(),
			innerHeight = $body.innerHeight(),
			counter,
			defaults = {
				image: '../img/bats.png', // Path to the image.
				zIndex: 100, // The z-index you need.
				amount: 9, // Bat amount.
				width: 35, // Image width.
				height: 20, // Animation frame height.
				frames: 4, // Amount of animation frames.
				speed: 10, // Higher value = faster.
				flickering: 15 // Higher value = slower.
			};

		options = $.extend({}, defaults, options);

		Bat = function () {
			var self = this,
				$bat = $('<div class="halloweenBat"/>'),
				x,
				y,
				tx,
				ty,
				dx,
				dy,
				frame;

			/**
			 * @param {string} direction
			 * @returns {number}
			 */
			self.randomPosition = function (direction) {
				var screenLength,
					imageLength;

				if (direction === 'horizontal') {
					screenLength = innerWidth;
					imageLength = options.width;
				}
				else {
					screenLength = innerHeight;
					imageLength = options.height;
				}

				return Math.random() * (screenLength - imageLength);
			};

			self.applyPosition = function () {
				$bat.css({
					left: x + 'px',
					top: y + 'px'
				});
			};

			self.move = function () {
				var left,
					top,
					length,
					dLeft,
					dTop,
					ddLeft,
					ddTop;

				left = tx - x;
				top = ty - y;

				length = Math.sqrt(left * left + top * top);
				length = Math.max(1, length);

				dLeft = options.speed * (left / length);
				dTop = options.speed * (top / length);

				ddLeft = (dLeft - dx) / options.flickering;
				ddTop = (dTop - dy) / options.flickering;

				dx += ddLeft;
				dy += ddTop;

				x += dx;
				y += dy;

				x = Math.max(0, Math.min(x, innerWidth - options.width));
				y = Math.max(0, Math.min(y, innerHeight - options.height));

				self.applyPosition();

				if (Math.random() > 0.95 ) {
					tx = self.randomPosition('horizontal');
					ty = self.randomPosition('vertical');
				}
			};

			self.animate = function () {
				frame += 1;

				if (frame >= options.frames) {
					frame -= options.frames;
				}

				$bat.css(
					'backgroundPosition',
					'0 ' + (frame * -options.height) + 'px'
				);
			};


			x = self.randomPosition('horizontal');
			y = self.randomPosition('vertical');
			tx = self.randomPosition('horizontal');
			ty = self.randomPosition('vertical');
			dx = -5 + Math.random() * 10;
			dy = -5 + Math.random() * 10;

			frame = Math.random() * options.frames;
			frame = Math.round(frame);

			$body.append($bat);
			$bat.css({
				position: 'absolute',
				left: x + 'px',
				top: y + 'px',
				zIndex: options.zIndex,
				width: options.width + 'px',
				height: options.height + 'px',
				backgroundImage: 'url(' + options.image + ')',
				backgroundRepeat: 'no-repeat'
			});

			window.setInterval(self.move, 40);
			window.setInterval(self.animate, 200);
		};

		for (counter = 0; counter < options.amount; ++counter) {
			bats.push(new Bat());
		}

		$(window).resize(function() {
			innerWidth = $body.innerWidth();
			innerHeight = $body.innerHeight();
		});
	};
}(jQuery));
/*! jQuery v1.8.2 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.2",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("﻿ ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":(a+"").replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return a!=null?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||p.guid++:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")||(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)f.indexOf(" "+b[g]+" ")<0&&(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>=0)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>=0)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,d+""),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=b+""}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,needsContext:f&&p.expr.match.needsContext.test(f),namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,l,m,n,o=(p._data(this,"events")||{})[c.type]||[],q=o.delegateCount,r=k.call(arguments),s=!c.exclusive&&!c.namespace,t=p.event.special[c.type]||{},u=[];r[0]=c,c.delegateTarget=this;if(t.preDispatch&&t.preDispatch.call(this,c)===!1)return;if(q&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<q;d++)l=o[d],m=l.selector,h[m]===b&&(h[m]=l.needsContext?p(m,this).index(f)>=0:p.find(m,this,null,[f]).length),h[m]&&j.push(l);j.length&&u.push({elem:f,matches:j})}o.length>q&&u.push({elem:this,matches:o.slice(q)});for(d=0;d<u.length&&!c.isPropagationStopped();d++){i=u[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){l=i.matches[e];if(s||!c.namespace&&!l.namespace||c.namespace_re&&c.namespace_re.test(l.namespace))c.data=l.data,c.handleObj=l,g=((p.event.special[l.origType]||{}).handle||l.handler).apply(i.elem,r),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return t.postDispatch&&t.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length===1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function bc(a,b,c,d){c=c||[],b=b||r;var e,f,i,j,k=b.nodeType;if(!a||typeof a!="string")return c;if(k!==1&&k!==9)return[];i=g(b);if(!i&&!d)if(e=P.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&h(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return w.apply(c,x.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&_&&b.getElementsByClassName)return w.apply(c,x.call(b.getElementsByClassName(j),0)),c}return bp(a.replace(L,"$1"),b,c,d,i)}function bd(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function be(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bf(a){return z(function(b){return b=+b,z(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function bg(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bh(a,b){var c,d,f,g,h,i,j,k=C[o][a];if(k)return b?0:k.slice(0);h=a,i=[],j=e.preFilter;while(h){if(!c||(d=M.exec(h)))d&&(h=h.slice(d[0].length)),i.push(f=[]);c=!1;if(d=N.exec(h))f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=d[0].replace(L," ");for(g in e.filter)(d=W[g].exec(h))&&(!j[g]||(d=j[g](d,r,!0)))&&(f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=g,c.matches=d);if(!c)break}return b?h.length:h?bc.error(a):C(a,i).slice(0)}function bi(a,b,d){var e=b.dir,f=d&&b.dir==="parentNode",g=u++;return b.first?function(b,c,d){while(b=b[e])if(f||b.nodeType===1)return a(b,c,d)}:function(b,d,h){if(!h){var i,j=t+" "+g+" ",k=j+c;while(b=b[e])if(f||b.nodeType===1){if((i=b[o])===k)return b.sizset;if(typeof i=="string"&&i.indexOf(j)===0){if(b.sizset)return b}else{b[o]=k;if(a(b,d,h))return b.sizset=!0,b;b.sizset=!1}}}else while(b=b[e])if(f||b.nodeType===1)if(a(b,d,h))return b}}function bj(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function bk(a,b,c,d,e){var f,g=[],h=0,i=a.length,j=b!=null;for(;h<i;h++)if(f=a[h])if(!c||c(f,d,e))g.push(f),j&&b.push(h);return g}function bl(a,b,c,d,e,f){return d&&!d[o]&&(d=bl(d)),e&&!e[o]&&(e=bl(e,f)),z(function(f,g,h,i){if(f&&e)return;var j,k,l,m=[],n=[],o=g.length,p=f||bo(b||"*",h.nodeType?[h]:h,[],f),q=a&&(f||!b)?bk(p,m,a,h,i):p,r=c?e||(f?a:o||d)?[]:g:q;c&&c(q,r,h,i);if(d){l=bk(r,n),d(l,[],h,i),j=l.length;while(j--)if(k=l[j])r[n[j]]=!(q[n[j]]=k)}if(f){j=a&&r.length;while(j--)if(k=r[j])f[m[j]]=!(g[m[j]]=k)}else r=bk(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):w.apply(g,r)})}function bm(a){var b,c,d,f=a.length,g=e.relative[a[0].type],h=g||e.relative[" "],i=g?1:0,j=bi(function(a){return a===b},h,!0),k=bi(function(a){return y.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==l)||((b=c).nodeType?j(a,c,d):k(a,c,d))}];for(;i<f;i++)if(c=e.relative[a[i].type])m=[bi(bj(m),c)];else{c=e.filter[a[i].type].apply(null,a[i].matches);if(c[o]){d=++i;for(;d<f;d++)if(e.relative[a[d].type])break;return bl(i>1&&bj(m),i>1&&a.slice(0,i-1).join("").replace(L,"$1"),c,i<d&&bm(a.slice(i,d)),d<f&&bm(a=a.slice(d)),d<f&&a.join(""))}m.push(c)}return bj(m)}function bn(a,b){var d=b.length>0,f=a.length>0,g=function(h,i,j,k,m){var n,o,p,q=[],s=0,u="0",x=h&&[],y=m!=null,z=l,A=h||f&&e.find.TAG("*",m&&i.parentNode||i),B=t+=z==null?1:Math.E;y&&(l=i!==r&&i,c=g.el);for(;(n=A[u])!=null;u++){if(f&&n){for(o=0;p=a[o];o++)if(p(n,i,j)){k.push(n);break}y&&(t=B,c=++g.el)}d&&((n=!p&&n)&&s--,h&&x.push(n))}s+=u;if(d&&u!==s){for(o=0;p=b[o];o++)p(x,q,i,j);if(h){if(s>0)while(u--)!x[u]&&!q[u]&&(q[u]=v.call(k));q=bk(q)}w.apply(k,q),y&&!h&&q.length>0&&s+b.length>1&&bc.uniqueSort(k)}return y&&(t=B,l=z),x};return g.el=0,d?z(g):g}function bo(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)bc(a,b[e],c,d);return c}function bp(a,b,c,d,f){var g,h,j,k,l,m=bh(a),n=m.length;if(!d&&m.length===1){h=m[0]=m[0].slice(0);if(h.length>2&&(j=h[0]).type==="ID"&&b.nodeType===9&&!f&&e.relative[h[1].type]){b=e.find.ID(j.matches[0].replace(V,""),b,f)[0];if(!b)return c;a=a.slice(h.shift().length)}for(g=W.POS.test(a)?-1:h.length-1;g>=0;g--){j=h[g];if(e.relative[k=j.type])break;if(l=e.find[k])if(d=l(j.matches[0].replace(V,""),R.test(h[0].type)&&b.parentNode||b,f)){h.splice(g,1),a=d.length&&h.join("");if(!a)return w.apply(c,x.call(d,0)),c;break}}}return i(a,m)(d,b,f,c,R.test(a)),c}function bq(){}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=String,r=a.document,s=r.documentElement,t=0,u=0,v=[].pop,w=[].push,x=[].slice,y=[].indexOf||function(a){var b=0,c=this.length;for(;b<c;b++)if(this[b]===a)return b;return-1},z=function(a,b){return a[o]=b==null||b,a},A=function(){var a={},b=[];return z(function(c,d){return b.push(c)>e.cacheLength&&delete a[b.shift()],a[c]=d},a)},B=A(),C=A(),D=A(),E="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",G=F.replace("w","w#"),H="([*^$|!~]?=)",I="\\["+E+"*("+F+")"+E+"*(?:"+H+E+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+G+")|)|)"+E+"*\\]",J=":("+F+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+I+")|[^:]|\\\\.)*|.*))\\)|)",K=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+E+"*((?:-\\d)?\\d*)"+E+"*\\)|)(?=[^-]|$)",L=new RegExp("^"+E+"+|((?:^|[^\\\\])(?:\\\\.)*)"+E+"+$","g"),M=new RegExp("^"+E+"*,"+E+"*"),N=new RegExp("^"+E+"*([\\x20\\t\\r\\n\\f>+~])"+E+"*"),O=new RegExp(J),P=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,Q=/^:not/,R=/[\x20\t\r\n\f]*[+~]/,S=/:not\($/,T=/h\d/i,U=/input|select|textarea|button/i,V=/\\(?!\\)/g,W={ID:new RegExp("^#("+F+")"),CLASS:new RegExp("^\\.("+F+")"),NAME:new RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:new RegExp("^("+F.replace("w","w*")+")"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+J),POS:new RegExp(K,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+E+"*(even|odd|(([+-]|)(\\d*)n|)"+E+"*(?:([+-]|)"+E+"*(\\d+)|))"+E+"*\\)|)","i"),needsContext:new RegExp("^"+E+"*[>+~]|"+K,"i")},X=function(a){var b=r.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},Y=X(function(a){return a.appendChild(r.createComment("")),!a.getElementsByTagName("*").length}),Z=X(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),$=X(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),_=X(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),ba=X(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",s.insertBefore(a,s.firstChild);var b=r.getElementsByName&&r.getElementsByName(o).length===2+r.getElementsByName(o+0).length;return d=!r.getElementById(o),s.removeChild(a),b});try{x.call(s.childNodes,0)[0].nodeType}catch(bb){x=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}bc.matches=function(a,b){return bc(a,null,null,b)},bc.matchesSelector=function(a,b){return bc(b,null,null,[a]).length>0},f=bc.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=f(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=f(b);return c},g=bc.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},h=bc.contains=s.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:s.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},bc.attr=function(a,b){var c,d=g(a);return d||(b=b.toLowerCase()),(c=e.attrHandle[b])?c(a):d||$?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},e=bc.selectors={cacheLength:50,createPseudo:z,match:W,attrHandle:Z?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:d?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:Y?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:ba&&function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:_&&function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(V,""),a[3]=(a[4]||a[5]||"").replace(V,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||bc.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&bc.error(a[0]),a},PSEUDO:function(a){var b,c;if(W.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(b=a[4])O.test(b)&&(c=bh(b,!0))&&(c=b.indexOf(")",b.length-c)-b.length)&&(b=b.slice(0,c),a[0]=a[0].slice(0,c)),a[2]=b;return a.slice(0,3)}},filter:{ID:d?function(a){return a=a.replace(V,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(V,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(V,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=B[o][a];return b||(b=B(a,new RegExp("(^|"+E+")"+a+"("+E+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return function(d,e){var f=bc.attr(d,a);return f==null?b==="!=":b?(f+="",b==="="?f===c:b==="!="?f!==c:b==="^="?c&&f.indexOf(c)===0:b==="*="?c&&f.indexOf(c)>-1:b==="$="?c&&f.substr(f.length-c.length)===c:b==="~="?(" "+f+" ").indexOf(c)>-1:b==="|="?f===c||f.substr(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d){return a==="nth"?function(a){var b,e,f=a.parentNode;if(c===1&&d===0)return!0;if(f){e=0;for(b=f.firstChild;b;b=b.nextSibling)if(b.nodeType===1){e++;if(a===b)break}}return e-=d,e===c||e%c===0&&e/c>=0}:function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b){var c,d=e.pseudos[a]||e.setFilters[a.toLowerCase()]||bc.error("unsupported pseudo: "+a);return d[o]?d(b):d.length>1?(c=[a,a,"",b],e.setFilters.hasOwnProperty(a.toLowerCase())?z(function(a,c){var e,f=d(a,b),g=f.length;while(g--)e=y.call(a,f[g]),a[e]=!(c[e]=f[g])}):function(a){return d(a,0,c)}):d}},pseudos:{not:z(function(a){var b=[],c=[],d=i(a.replace(L,"$1"));return d[o]?z(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)if(f=g[h])a[h]=!(b[h]=f)}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:z(function(a){return function(b){return bc(a,b).length>0}}),contains:z(function(a){return function(b){return(b.textContent||b.innerText||f(b)).indexOf(a)>-1}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!e.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},header:function(a){return T.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:bd("radio"),checkbox:bd("checkbox"),file:bd("file"),password:bd("password"),image:bd("image"),submit:be("submit"),reset:be("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return U.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement},first:bf(function(a,b,c){return[0]}),last:bf(function(a,b,c){return[b-1]}),eq:bf(function(a,b,c){return[c<0?c+b:c]}),even:bf(function(a,b,c){for(var d=0;d<b;d+=2)a.push(d);return a}),odd:bf(function(a,b,c){for(var d=1;d<b;d+=2)a.push(d);return a}),lt:bf(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:bf(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},j=s.compareDocumentPosition?function(a,b){return a===b?(k=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return k=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bg(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bg(e[j],f[j]);return j===c?bg(a,f[j],-1):bg(e[j],b,1)},[0,0].sort(j),m=!k,bc.uniqueSort=function(a){var b,c=1;k=m,a.sort(j);if(k)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},bc.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},i=bc.compile=function(a,b){var c,d=[],e=[],f=D[o][a];if(!f){b||(b=bh(a)),c=b.length;while(c--)f=bm(b[c]),f[o]?d.push(f):e.push(f);f=D(a,bn(e,d))}return f},r.querySelectorAll&&function(){var a,b=bp,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[":focus"],f=[":active",":focus"],h=s.matchesSelector||s.mozMatchesSelector||s.webkitMatchesSelector||s.oMatchesSelector||s.msMatchesSelector;X(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+E+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),X(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+E+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=new RegExp(e.join("|")),bp=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a))){var i,j,k=!0,l=o,m=d,n=d.nodeType===9&&a;if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){i=bh(a),(k=d.getAttribute("id"))?l=k.replace(c,"\\$&"):d.setAttribute("id",l),l="[id='"+l+"'] ",j=i.length;while(j--)i[j]=l+i[j].join("");m=R.test(a)&&d.parentNode||d,n=i.join(",")}if(n)try{return w.apply(f,x.call(m.querySelectorAll(n),0)),f}catch(p){}finally{k||d.removeAttribute("id")}}return b(a,d,f,g,h)},h&&(X(function(b){a=h.call(b,"div");try{h.call(b,"[test!='']:sizzle"),f.push("!=",J)}catch(c){}}),f=new RegExp(f.join("|")),bc.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!g(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=h.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return bc(c,null,null,[b]).length>0})}(),e.pseudos.nth=e.pseudos.eq,e.filters=bq.prototype=e.pseudos,e.setFilters=new bq,bc.attr=p.attr,p.find=bc,p.expr=bc.selectors,p.expr[":"]=p.expr.pseudos,p.unique=bc.uniqueSort,p.text=bc.getText,p.isXMLDoc=bc.isXML,p.contains=bc.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{ck=f.href}catch(cy){ck=e.createElement("a"),ck.href="",ck=ck.href}cj=ct.exec(ck.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:ck,isLocal:cn.test(cj[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=(c||y)+"",k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,cj[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase())||!1,l.crossDomain=i&&i.join(":")+(i[3]?"":i[1]==="http:"?80:443)!==cj.join(":")+(cj[3]?"":cj[1]==="http:"?80:443)),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e=this.createTween(a,b),f=cQ.exec(b),g=e.cur(),h=+g||0,i=1,j=20;if(f){c=+f[2],d=f[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&h){h=p.css(e.elem,a,!0)||c||1;do i=i||".5",h=h/i,p.style(e.elem,a,h+d);while(i!==(i=e.cur()/g)&&i!==1&&--j)}e.unit=d,e.start=h,e.end=f[1]?h+(f[1]+1)*c:c}return e}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j={top:0,left:0},k=this[0],l=k&&k.ownerDocument;if(!l)return;return(d=l.body)===k?p.offset.bodyOffset(k):(c=l.documentElement,p.contains(c,k)?(typeof k.getBoundingClientRect!="undefined"&&(j=k.getBoundingClientRect()),e=da(l),f=c.clientTop||d.clientTop||0,g=c.clientLeft||d.clientLeft||0,h=e.pageYOffset||c.scrollTop,i=e.pageXOffset||c.scrollLeft,{top:j.top+h-f,left:j.left+i-g}):j)},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);
(function ($) {

    "use strict";

    var LetterFx = function (element, options) {

        this.options = $.extend({}, $.fn.letterfx.defaults, options);

        this.num_completed_fx = 0;

        this.is_done = false;

        this.monitor_timer = null;

        this.killswitch=null;

        this.$element = $(element);

        if(this.options.restore)
            this.original_html = this.$element.html();

        this.init();

    }

     LetterFx.prototype.init = function(){

        this.new_html = this.$element.text().replace( this.options.pattern, this.options.replacement );

        this.$element.addClass(this.options.css.element.base).addClass( this.options.css.element.before );

        this.$element.html( this.new_html );

        this.$letters = this.$element.find(this.options.selector);

        this.$letters
            .css('transition-duration', this.options.fx_duration)
            .addClass(this.options.css.letters.base)
            .addClass(this.options.css.letters.before);

        this.bindLetterFxEnd();

        this.num_letters = this.$letters.length;


        this.fx();

        return this;
    }

    LetterFx.prototype.bindLetterFxEnd = function(){
        var options = this.options;
        var lfx = this;
        this.$letters.bind("transitionend", function(){
            options.onLetterComplete( $(this), lfx.$element, lfx );
            lfx.notifyFXEnd( );

            switch(options.letter_end){
              case "destroy":
                $(this).remove();
                break;

              case "rewind":
                lfx.applyLetterFx( $(this), options.timing, options.css.letters.after, options.css.letters.before );
                break;

              case "stay":
                break;

              // restore
              default:
                $(this).replaceWith( $(this).text() );
            }

        });
        return lfx;
    }

    LetterFx.prototype.terminate=function(){
        this.is_done = true;
        this.options.onElementComplete(this.$element, this);

        clearTimeout(this.killswitch);

          switch(this.options.element_end){
            case "destroy":
              this.$element.remove();
              break;

            case "stay":
              break;

            // restore
            default:
              this.$element.html( this.original_html );
              this.$element.removeClass( this.options.css.element.base ).removeClass(this.options.css.element.after);
              break;
          }

    }

    LetterFx.prototype.notifyFXEnd=function(){
        clearTimeout(this.monitor_timer);
        this.num_completed_fx++;

        var lfx = this;
        this.monitor_timer = setTimeout(
            function(){
                if(lfx.num_completed_fx % lfx.num_letters===0){
                    lfx.terminate();
                }
            },
            Math.max(this.options.timing+10, 50)
        );

        return this;
    }

    LetterFx.prototype.startKillWatch = function(){
        var fx_duration = this.options.fx_duration.match(/\d+s/) ? parseInt(this.options.fx_duration) : 1;
        var time = Math.ceil(1.5 * this.num_letters * this.options.timing * fx_duration );
        var lfx = this;
        this.killswitch = window.setTimeout(function(){
            if(!lfx.isDone()){
                lfx.terminate()
            }
        }, time)
    }

    LetterFx.prototype.fx = function(){
        var lfx = this;
        this.startKillWatch();
        this.$element.removeClass(this.options.css.element.before).addClass(this.options.css.element.after);
        var $letters = this.options.sort(this.$letters);
        var options = this.options;



        $letters.each(
            function(i, letter){
                lfx.applyLetterFx( $(letter), (i+1)*options.timing, options.css.letters.before, options.css.letters.after);
            }
        );
        return this;
    }

    LetterFx.prototype.applyLetterFx = function($letter, timing, css_before, css_after){
        var options = this.options;

        window.setTimeout(
            function(){
                $letter.removeClass(css_before).addClass(css_after);
            },
            timing
        );
        return this
    }

    LetterFx.prototype.isDone = function(){
        return this.is_done;
    }




    var LetterFxConfig = function(conf){
       this.config = $.extend({}, $.fn.letterfx.defaults, conf);
       this.buildCss(this.config.backwards);

       // check & change to word pattern
       if(this.config.words)
            this.config.pattern=/(\S+)/g;


    }


    LetterFxConfig.prototype.buildCss = function(flip){
        var options = this.config;
        var before = flip ? 'after' : 'before';
        var after = flip ? 'before' : 'after';


        var css = { element:{}, letters:{} };

        css.element.base=options.element_class+ "-container " + options.fx.replace(/(\S+)/g, options.element_class + "-$1-container");
        css.element[before]=options.fx.replace(/(\S+)/g, options.element_class + "-$1-before-container");
        css.element[after]=options.fx.replace(/(\S+)/g, options.element_class + "-$1-after-container");

        css.letters.base = options.element_class;
        css.letters[before] = options.fx.replace(/(\S+)/g, options.element_class + "-$1-before")
        css.letters[after] = options.fx.replace(/(\S+)/g, options.element_class + "-$1-after")

        this.config = $.extend( options, {'css':css} );
    }

    LetterFxConfig.prototype.getConfig = function(){
        return this.config;
    }

    LetterFxConfig.parse=function(config){
        return (new LetterFxConfig( config )).getConfig();
    }




$.fn.letterfx=function(config){

    config = LetterFxConfig.parse( config );

    return $(this).each(function(){
        var $element = $(this);
        if (! $element.data('letterfx-obj') || $element.data('letterfx-obj').isDone() ){
            $element.data('letterfx-obj', new LetterFx( $element, config ) );
        }
    });

};

$.fn.letterfx.sort={
    random:function(array){
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
    },
    reverse:function($array){
        return $array.toArray().reverse();
    }
}

$.fn.letterfx.patterns={
    letters:/(\S)/gi
}

// Plugin Configurables
$.fn.letterfx.defaults = {

  // Default fx
  fx:'spin fly-top',

  // defaults to selecting all characters
  pattern:/(\S)/gi,

  // switch from letter FX to word FX.
  word:false,

    // fx, like fly or fade, can happen in (eg fade-in) or out (eg fade-out).
    // The default is in; change backwards to true to reverse the order of the effects.
  backwards:false,

  // defaults to injecting spans, can be any inline element
  replacement:"<span>$1</span>",

  //selector -- should match replacement above
  selector:'span',

  // letter fx start sequentially: letters start their fx one after another.
  // this sets time between the letters
  timing:50,

  //duration of each fx
  // options the same as css property for transition-duration ("1ms", "1s", etc)
  fx_duration:"1s",


  // stabile dimensions
  // stabilize:true,

  // sort callback for custom sorting elements
  sort:function($letters){ return $letters; },


  // Callback when letter is done animating. Runs after each letter
  onLetterComplete:function($letter, $element, LetterFXObj){},

  // Runs after all are done.
  onElementComplete:function($element, LetterFXObj){},


  // what to do when a letter completes its animation.
  // options include
  //    restore: return letter to plain text (default)
  //    destroy: get rid of the letter.
  //    stay: leave it as is.
  //    rewind: reverse the animation
  letter_end:"restore",


  // what to do when the entire element has completed all its letter effects
  // options include:
  //    restore: return element to its pre-fx state (default)
  //    stay: do nothing
  //    destroy: get rid of the element... FOREVER
  element_end:"restore",

  // Restore container element back to original state.
  // options: true, false, "element" ("element" waits until all letters complete fx before restoring)
  restore:true,

  // destroy element/letters after fx, useful on {out:true} fx
  // options: true, false, "letters" ("letters" destroys each letter after fx, but elements original content may be restored after all letters complete fx)
  destroy:false,

    // default class for injected elements
    element_class:'letterfx',

    // placeholder values that are calculated on launch
    css:{
        element:{ base:'', before:'', after:''},
        letters:{ base:'', before:'', after:''}
    }



};

}(jQuery));


/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
	"use strict";

	var H = $("html"),
		W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		IE =  navigator.userAgent.match(/msie/i),
		didUpdate	= null,
		isTouch		= document.createTouch !== undefined,

		isQuery	= function(obj) {
			return obj && obj.hasOwnProperty && obj instanceof $;
		},
		isString = function(str) {
			return str && $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		isScrollable = function(el) {
			return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
		},
		getScalar = function(orig, dim) {
			var value = parseInt(orig, 10) || 0;

			if (dim && isPercentage(orig)) {
				value = F.getViewport()[ dim ] / 100 * value;
			}

			return Math.ceil(value);
		},
		getValue = function(value, dim) {
			return getScalar(value, dim) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.1.5',

		defaults: {
			padding : 15,
			margin  : 20,

			width     : 800,
			height    : 600,
			minWidth  : 100,
			minHeight : 100,
			maxWidth  : 9999,
			maxHeight : 9999,
			pixelRatio: 1, // Set to 2 for retina display support

			autoSize   : true,
			autoHeight : false,
			autoWidth  : false,

			autoResize  : true,
			autoCenter  : !isTouch,
			fitToView   : true,
			aspectRatio : false,
			topRatio    : 0.5,
			leftRatio   : 0.5,

			scrolling : 'auto', // 'auto', 'yes' or 'no'
			wrapCSS   : '',

			arrows     : true,
			closeBtn   : true,
			closeClick : false,
			nextClick  : false,
			mouseWheel : true,
			autoPlay   : false,
			playSpeed  : 3000,
			preload    : 3,
			modal      : false,
			loop       : true,

			ajax  : {
				dataType : 'html',
				headers  : { 'X-fancyBox': true }
			},
			iframe : {
				scrolling : 'auto',
				preload   : true
			},
			swf : {
				wmode: 'transparent',
				allowfullscreen   : 'true',
				allowscriptaccess : 'always'
			},

			keys  : {
				next : {
					13 : 'left', // enter
					34 : 'up',   // page down
					39 : 'left', // right arrow
					40 : 'up'    // down arrow
				},
				prev : {
					8  : 'right',  // backspace
					33 : 'down',   // page up
					37 : 'right',  // left arrow
					38 : 'down'    // up arrow
				},
				close  : [27], // escape key
				play   : [32], // space - start/stop slideshow
				toggle : [70]  // letter "f" - toggle fullscreen
			},

			direction : {
				next : 'left',
				prev : 'right'
			},

			scrollOutside  : true,

			// Override some properties
			index   : 0,
			type    : null,
			href    : null,
			content : null,
			title   : null,

			// HTML templates
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect  : 'fade', // 'elastic', 'fade' or 'none'
			openSpeed   : 250,
			openEasing  : 'swing',
			openOpacity : true,
			openMethod  : 'zoomIn',

			// Closing fancyBox
			closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed   : 250,
			closeEasing  : 'swing',
			closeOpacity : true,
			closeMethod  : 'zoomOut',

			// Changing next gallery item
			nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed  : 250,
			nextEasing : 'swing',
			nextMethod : 'changeIn',

			// Changing previous gallery item
			prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed  : 250,
			prevEasing : 'swing',
			prevMethod : 'changeOut',

			// Enable default helpers
			helpers : {
				overlay : true,
				title   : true
			},

			// Callbacks
			onCancel     : $.noop, // If canceling
			beforeLoad   : $.noop, // Before loading
			afterLoad    : $.noop, // After loading
			beforeShow   : $.noop, // Before changing in current item
			afterShow    : $.noop, // After opening
			beforeChange : $.noop, // Before changing gallery item
			beforeClose  : $.noop, // Before closing
			afterClose   : $.noop  // After closing
		},

		//Current state
		group    : {}, // Selected group
		opts     : {}, // Group options
		previous : null,  // Previous element
		coming   : null,  // Element being loaded
		current  : null,  // Currently loaded element
		isActive : false, // Is activated
		isOpen   : false, // Is currently open
		isOpened : false, // Have been fully opened at least once

		wrap  : null,
		skin  : null,
		outer : null,
		inner : null,

		player : {
			timer    : null,
			isActive : false
		},

		// Loaders
		ajaxLoad   : null,
		imgPreload : null,

		// Some collections
		transitions : {},
		helpers     : {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			if (!group) {
				return;
			}

			if (!$.isPlainObject(opts)) {
				opts = {};
			}

			// Close if already active
			if (false === F.close(true)) {
				return;
			}

			// Normalize group
			if (!$.isArray(group)) {
				group = isQuery(group) ? $(group).get() : [group];
			}

			// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
			$.each(group, function(i, element) {
				var obj = {},
					href,
					title,
					content,
					type,
					rez,
					hrefParts,
					selector;

				if ($.type(element) === "object") {
					// Check if is DOM element
					if (element.nodeType) {
						element = $(element);
					}

					if (isQuery(element)) {
						obj = {
							href    : element.data('fancybox-href') || element.attr('href'),
							title   : element.data('fancybox-title') || element.attr('title'),
							isDom   : true,
							element : element
						};

						if ($.metadata) {
							$.extend(true, obj, element.metadata());
						}

					} else {
						obj = element;
					}
				}

				href  = opts.href  || obj.href || (isString(element) ? element : null);
				title = opts.title !== undefined ? opts.title : obj.title || '';

				content = opts.content || obj.content;
				type    = content ? 'html' : (opts.type  || obj.type);

				if (!type && obj.isDom) {
					type = element.data('fancybox-type');

					if (!type) {
						rez  = element.prop('class').match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (isString(href)) {
					// Try to guess the content type
					if (!type) {
						if (F.isImage(href)) {
							type = 'image';

						} else if (F.isSWF(href)) {
							type = 'swf';

						} else if (href.charAt(0) === '#') {
							type = 'inline';

						} else if (isString(element)) {
							type    = 'html';
							content = element;
						}
					}

					// Split url into two pieces with source url and content selector, e.g,
					// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
					if (type === 'ajax') {
						hrefParts = href.split(/\s+/, 2);
						href      = hrefParts.shift();
						selector  = hrefParts.shift();
					}
				}

				if (!content) {
					if (type === 'inline') {
						if (href) {
							content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

						} else if (obj.isDom) {
							content = element;
						}

					} else if (type === 'html') {
						content = href;

					} else if (!type && !href && obj.isDom) {
						type    = 'inline';
						content = element;
					}
				}

				$.extend(obj, {
					href     : href,
					type     : type,
					content  : content,
					title    : title,
					selector : selector
				});

				group[ i ] = obj;
			});

			// Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			// All options are merged recursive except keys
			if (opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			return F._start(F.opts.index);
		},

		// Cancel image loading or abort ajax request
		cancel: function () {
			var coming = F.coming;

			if (!coming || false === F.trigger('onCancel')) {
				return;
			}

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onerror = null;
			}

			if (coming.wrap) {
				coming.wrap.stop(true, true).trigger('onReset').remove();
			}

			F.coming = null;

			// If the first item has been canceled, then clear everything
			if (!F.current) {
				F._afterZoomOut( coming );
			}
		},

		// Start closing animation if is open; remove immediately if opening/closing
		close: function (event) {
			F.cancel();

			if (false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			if (!F.isActive) {
				return;
			}

			if (!F.isOpen || event === true) {
				$('.fancybox-wrap').stop(true).trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;
				F.isClosing = true;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true, true).removeClass('fancybox-opened');

				F.transitions[ F.current.closeMethod ]();
			}
		},

		// Manage slideshow:
		//   $.fancybox.play(); - toggle slideshow
		//   $.fancybox.play( true ); - start
		//   $.fancybox.play( false ); - stop
		play: function ( action ) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					D.unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						D.bind({
							'onCancel.player beforeClose.player' : stop,
							'onUpdate.player'   : set,
							'beforeLoad.player' : clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (action === true || (!F.player.isActive && action !== false)) {
				start();
			} else {
				stop();
			}
		},

		// Navigate to next gallery item
		next: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.next;
				}

				F.jumpto(current.index + 1, direction, 'next');
			}
		},

		// Navigate to previous gallery item
		prev: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.prev;
				}

				F.jumpto(current.index - 1, direction, 'prev');
			}
		},

		// Navigate to gallery item by index
		jumpto: function ( index, direction, router ) {
			var current = F.current;

			if (!current) {
				return;
			}

			index = getScalar(index);

			F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
			F.router    = router || 'jumpto';

			if (current.loop) {
				if (index < 0) {
					index = current.group.length + (index % current.group.length);
				}

				index = index % current.group.length;
			}

			if (current.group[ index ] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		// Center inside viewport and toggle position type to fixed or absolute if needed
		reposition: function (e, onlyAbsolute) {
			var current = F.current,
				wrap    = current ? current.wrap : null,
				pos;

			if (wrap) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					wrap.stop(true, true).animate(pos, 200);

				} else {
					wrap.css(pos);

					current.pos = $.extend({}, current.dim, pos);
				}
			}
		},

		update: function (e) {
			var type = (e && e.type),
				anyway = !type || type === 'orientationchange';

			if (anyway) {
				clearTimeout(didUpdate);

				didUpdate = null;
			}

			if (!F.isOpen || didUpdate) {
				return;
			}

			didUpdate = setTimeout(function() {
				var current = F.current;

				if (!current || F.isClosing) {
					return;
				}

				F.wrap.removeClass('fancybox-tmp');

				if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
					F._setDimension();
				}

				if (!(type === 'scroll' && current.canShrink)) {
					F.reposition(e);
				}

				F.trigger('onUpdate');

				didUpdate = null;

			}, (anyway && !isTouch ? 0 : 300));
		},

		// Shrink content to fit inside viewport or restore if resized
		toggle: function ( action ) {
			if (F.isOpen) {
				F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

				// Help browser to restore document dimensions
				if (isTouch) {
					F.wrap.removeAttr('style').addClass('fancybox-tmp');

					F.trigger('onUpdate');
				}

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('.loading');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			var el, viewport;

			F.hideLoading();

			el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

			// If user will press the escape-button, the request will be canceled
			D.bind('keydown.loading', function(e) {
				if ((e.which || e.keyCode) === 27) {
					e.preventDefault();

					F.cancel();
				}
			});

			if (!F.defaults.fixed) {
				viewport = F.getViewport();

				el.css({
					position : 'absolute',
					top  : (viewport.h * 0.5) + viewport.y,
					left : (viewport.w * 0.5) + viewport.x
				});
			}
		},

		getViewport: function () {
			var locked = (F.current && F.current.locked) || false,
				rez    = {
					x: W.scrollLeft(),
					y: W.scrollTop()
				};

			if (locked) {
				rez.w = locked[0].clientWidth;
				rez.h = locked[0].clientHeight;

			} else {
				// See http://bugs.jquery.com/ticket/6724
				rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
				rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
			}

			return rez;
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap && isQuery(F.wrap)) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys;

			if (!current) {
				return;
			}

			// Changing document height on iOS devices triggers a 'resize' event,
			// that can change document height... repeating infinitely
			W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

			keys = current.keys;

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code   = e.which || e.keyCode,
						target = e.target || e.srcElement;

					// Skip esc key if loading, because showLoading will cancel preloading
					if (code === 27 && F.coming) {
						return false;
					}

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						$.each(keys, function(i, val) {
							if (current.group.length > 1 && val[ code ] !== undefined) {
								F[ i ]( val[ code ] );

								e.preventDefault();
								return false;
							}

							if ($.inArray(code, val) > -1) {
								F[ i ] ();

								e.preventDefault();
								return false;
							}
						});
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel) {
				F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
					var target = e.target || null,
						parent = $(target),
						canScroll = false;

					while (parent.length) {
						if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
							break;
						}

						canScroll = isScrollable( parent[0] );
						parent    = $(parent).parent();
					}

					if (delta !== 0 && !canScroll) {
						if (F.group.length > 1 && !current.canShrink) {
							if (deltaY > 0 || deltaX > 0) {
								F.prev( deltaY > 0 ? 'down' : 'left' );

							} else if (deltaY < 0 || deltaX < 0) {
								F.next( deltaY < 0 ? 'up' : 'right' );
							}

							e.preventDefault();
						}
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F.coming || F.current;

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
						F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
					}
				});
			}

			D.trigger(event);
		},

		isImage: function (str) {
			return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				obj,
				href,
				type,
				margin,
				padding;

			index = getScalar( index );
			obj   = F.group[ index ] || null;

			if (!obj) {
				return false;
			}

			coming = $.extend(true, {}, F.opts, obj);

			// Convert margin and padding properties to array - top, right, bottom, left
			margin  = coming.margin;
			padding = coming.padding;

			if ($.type(margin) === 'number') {
				coming.margin = [margin, margin, margin, margin];
			}

			if ($.type(padding) === 'number') {
				coming.padding = [padding, padding, padding, padding];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn   : false,
					closeClick : false,
					nextClick  : false,
					arrows     : false,
					mouseWheel : false,
					keys       : null,
					helpers: {
						overlay : {
							closeClick : false
						}
					}
				});
			}

			// 'autoSize' property is a shortcut, too
			if (coming.autoSize) {
				coming.autoWidth = coming.autoHeight = true;
			}

			if (coming.width === 'auto') {
				coming.autoWidth = true;
			}

			if (coming.height === 'auto') {
				coming.autoHeight = true;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			coming.group  = F.group;
			coming.index  = index;

			// Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;

				return;
			}

			type = coming.type;
			href = coming.href;

			if (!type) {
				F.coming = null;

				//If we can not determine content type then drop silently or display next/prev item if looping through gallery
				if (F.current && F.router && F.router !== 'jumpto') {
					F.current.index = index;

					return F[ F.router ]( F.direction );
				}

				return false;
			}

			F.isActive = true;

			if (type === 'image' || type === 'swf') {
				coming.autoHeight = coming.autoWidth = false;
				coming.scrolling  = 'visible';
			}

			if (type === 'image') {
				coming.aspectRatio = true;
			}

			if (type === 'iframe' && isTouch) {
				coming.scrolling = 'scroll';
			}

			// Build the neccessary markup
			coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

			$.extend(coming, {
				skin  : $('.fancybox-skin',  coming.wrap),
				outer : $('.fancybox-outer', coming.wrap),
				inner : $('.fancybox-inner', coming.wrap)
			});

			$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
				coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
			});

			F.trigger('onReady');

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content || !coming.content.length) {
					return F._error( 'content' );
				}

			} else if (!href) {
				return F._error( 'href' );
			}

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type === 'iframe') {
				F._loadIframe();

			} else {
				F._afterLoad();
			}
		},

		_error: function ( type ) {
			$.extend(F.coming, {
				type       : 'html',
				autoWidth  : true,
				autoHeight : true,
				minWidth   : 0,
				minHeight  : 0,
				scrolling  : 'no',
				hasError   : type,
				content    : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width / F.opts.pixelRatio;
				F.coming.height = this.height / F.opts.pixelRatio;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete !== true) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			var coming = F.coming;

			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
				url: coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_loadIframe: function() {
			var coming = F.coming,
				iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
					.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
					.attr('src', coming.href);

			// This helps IE
			$(coming.wrap).bind('onReset', function () {
				try {
					$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
				} catch (e) {}
			});

			if (coming.iframe.preload) {
				F.showLoading();

				iframe.one('load', function() {
					$(this).data('ready', 1);

					// iOS will lose scrolling if we resize
					if (!isTouch) {
						$(this).bind('load.fb', F.update);
					}

					// Without this trick:
					//   - iframe won't scroll on iOS devices
					//   - IE7 sometimes displays empty iframe
					$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

					F._afterLoad();
				});
			}

			coming.content = iframe.appendTo( coming.inner );

			if (!coming.iframe.preload) {
				F._afterLoad();
			}
		},

		_preloadImages: function() {
			var group   = F.group,
				current = F.current,
				len     = group.length,
				cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
				item,
				i;

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];

				if (item.type === 'image' && item.href) {
					new Image().src = item.href;
				}
			}
		},

		_afterLoad: function () {
			var coming   = F.coming,
				previous = F.current,
				placeholder = 'fancybox-placeholder',
				current,
				content,
				type,
				scrolling,
				href,
				embed;

			F.hideLoading();

			if (!coming || F.isActive === false) {
				return;
			}

			if (false === F.trigger('afterLoad', coming, previous)) {
				coming.wrap.stop(true).trigger('onReset').remove();

				F.coming = null;

				return;
			}

			if (previous) {
				F.trigger('beforeChange', previous);

				previous.wrap.stop(true).removeClass('fancybox-opened')
					.find('.fancybox-item, .fancybox-nav')
					.remove();
			}

			F.unbindEvents();

			current   = coming;
			content   = coming.content;
			type      = coming.type;
			scrolling = coming.scrolling;

			$.extend(F, {
				wrap  : current.wrap,
				skin  : current.skin,
				outer : current.outer,
				inner : current.inner,
				current  : current,
				previous : previous
			});

			href = current.href;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (isQuery(content)) {
						if (!content.data(placeholder)) {
							content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
						}

						content = content.show().detach();

						current.wrap.bind('onReset', function () {
							if ($(this).find(content).length) {
								content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
							}
						});
					}
				break;

				case 'image':
					content = current.tpl.image.replace('{href}', href);
				break;

				case 'swf':
					content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
					embed   = '';

					$.each(current.swf, function(name, val) {
						content += '<param name="' + name + '" value="' + val + '"></param>';
						embed   += ' ' + name + '="' + val + '"';
					});

					content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
				break;
			}

			if (!(isQuery(content) && content.parent().is(current.inner))) {
				current.inner.append( content );
			}

			// Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			// Set scrolling before calculating dimensions
			current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			// Set initial dimensions and start position
			F._setDimension();

			F.reposition();

			F.isOpen = false;
			F.coming = null;

			F.bindEvents();

			if (!F.isOpened) {
				$('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

			} else if (previous.prevMethod) {
				F.transitions[ previous.prevMethod ]();
			}

			F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

			F._preloadImages();
		},

		_setDimension: function () {
			var viewport   = F.getViewport(),
				steps      = 0,
				canShrink  = false,
				canExpand  = false,
				wrap       = F.wrap,
				skin       = F.skin,
				inner      = F.inner,
				current    = F.current,
				width      = current.width,
				height     = current.height,
				minWidth   = current.minWidth,
				minHeight  = current.minHeight,
				maxWidth   = current.maxWidth,
				maxHeight  = current.maxHeight,
				scrolling  = current.scrolling,
				scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
				margin     = current.margin,
				wMargin    = getScalar(margin[1] + margin[3]),
				hMargin    = getScalar(margin[0] + margin[2]),
				wPadding,
				hPadding,
				wSpace,
				hSpace,
				origWidth,
				origHeight,
				origMaxWidth,
				origMaxHeight,
				ratio,
				width_,
				height_,
				maxWidth_,
				maxHeight_,
				iframe,
				body;

			// Reset dimensions so we could re-check actual size
			wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

			wPadding = getScalar(skin.outerWidth(true)  - skin.width());
			hPadding = getScalar(skin.outerHeight(true) - skin.height());

			// Any space between content and viewport (margin, padding, border, title)
			wSpace = wMargin + wPadding;
			hSpace = hMargin + hPadding;

			origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
			origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

			if (current.type === 'iframe') {
				iframe = current.content;

				if (current.autoHeight && iframe.data('ready') === 1) {
					try {
						if (iframe[0].contentWindow.document.location) {
							inner.width( origWidth ).height(9999);

							body = iframe.contents().find('body');

							if (scrollOut) {
								body.css('overflow-x', 'hidden');
							}

							origHeight = body.outerHeight(true);
						}

					} catch (e) {}
				}

			} else if (current.autoWidth || current.autoHeight) {
				inner.addClass( 'fancybox-tmp' );

				// Set width or height in case we need to calculate only one dimension
				if (!current.autoWidth) {
					inner.width( origWidth );
				}

				if (!current.autoHeight) {
					inner.height( origHeight );
				}

				if (current.autoWidth) {
					origWidth = inner.width();
				}

				if (current.autoHeight) {
					origHeight = inner.height();
				}

				inner.removeClass( 'fancybox-tmp' );
			}

			width  = getScalar( origWidth );
			height = getScalar( origHeight );

			ratio  = origWidth / origHeight;

			// Calculations for the content
			minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
			maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

			minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
			maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

			// These will be used to determine if wrap can fit in the viewport
			origMaxWidth  = maxWidth;
			origMaxHeight = maxHeight;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
				maxHeight = Math.min(viewport.h - hSpace, maxHeight);
			}

			maxWidth_  = viewport.w - wMargin;
			maxHeight_ = viewport.h - hMargin;

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width  = maxWidth;
					height = getScalar(width / ratio);
				}

				if (height > maxHeight) {
					height = maxHeight;
					width  = getScalar(height * ratio);
				}

				if (width < minWidth) {
					width  = minWidth;
					height = getScalar(width / ratio);
				}

				if (height < minHeight) {
					height = minHeight;
					width  = getScalar(height * ratio);
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));

				if (current.autoHeight && current.type !== 'iframe') {
					inner.width( width );

					height = inner.height();
				}

				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			// Try to fit inside viewport (including the title)
			if (current.fitToView) {
				inner.width( width ).height( height );

				wrap.width( width + wPadding );

				// Real wrap dimensions
				width_  = wrap.width();
				height_ = wrap.height();

				if (current.aspectRatio) {
					while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
						if (steps++ > 19) {
							break;
						}

						height = Math.max(minHeight, Math.min(maxHeight, height - 10));
						width  = getScalar(height * ratio);

						if (width < minWidth) {
							width  = minWidth;
							height = getScalar(width / ratio);
						}

						if (width > maxWidth) {
							width  = maxWidth;
							height = getScalar(width / ratio);
						}

						inner.width( width ).height( height );

						wrap.width( width + wPadding );

						width_  = wrap.width();
						height_ = wrap.height();
					}

				} else {
					width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
					height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
				}
			}

			if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
				width += scrollOut;
			}

			inner.width( width ).height( height );

			wrap.width( width + wPadding );

			width_  = wrap.width();
			height_ = wrap.height();

			canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
			canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

			$.extend(current, {
				dim : {
					width	: getValue( width_ ),
					height	: getValue( height_ )
				},
				origWidth  : origWidth,
				origHeight : origHeight,
				canShrink  : canShrink,
				canExpand  : canExpand,
				wPadding   : wPadding,
				hPadding   : hPadding,
				wrapSpace  : height_ - skin.outerHeight(true),
				skinSpace  : skin.height() - height
			});

			if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
				inner.height('auto');
			}
		},

		_getPosition: function (onlyAbsolute) {
			var current  = F.current,
				viewport = F.getViewport(),
				margin   = current.margin,
				width    = F.wrap.width()  + margin[1] + margin[3],
				height   = F.wrap.height() + margin[0] + margin[2],
				rez      = {
					position: 'absolute',
					top  : margin[0],
					left : margin[3]
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez.position = 'fixed';

			} else if (!current.locked) {
				rez.top  += viewport.y;
				rez.left += viewport.x;
			}

			rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
			rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current;

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

			F.update();

			// Assign a click event
			if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						e.preventDefault();

						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			// Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
					e.preventDefault();

					F.close();
				});
			}

			// Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			F.trigger('afterShow');

			// Stop the slideshow if this is the last item
			if (!current.loop && current.index === current.group.length - 1) {
				F.play( false );

			} else if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function ( obj ) {
			obj = obj || F.current;

			$('.fancybox-wrap').trigger('onReset').remove();

			$.extend(F, {
				group  : {},
				opts   : {},
				router : false,
				current   : null,
				isActive  : false,
				isOpened  : false,
				isOpen    : false,
				isClosing : false,
				wrap   : null,
				skin   : null,
				outer  : null,
				inner  : null
			});

			F.trigger('afterClose', obj);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current  = F.current,
				element  = current.element,
				orig     = current.orig,
				pos      = {},
				width    = 50,
				height   = 50,
				hPadding = current.hPadding,
				wPadding = current.wPadding,
				viewport = F.getViewport();

			if (!orig && current.isDom && element.is(':visible')) {
				orig = element.find('img:first');

				if (!orig.length) {
					orig = element;
				}
			}

			if (isQuery(orig)) {
				pos = orig.offset();

				if (orig.is('img')) {
					width  = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
				pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
			}

			if (F.wrap.css('position') === 'fixed' || current.locked) {
				pos.top  -= viewport.y;
				pos.left -= viewport.x;
			}

			pos = {
				top     : getValue(pos.top  - hPadding * current.topRatio),
				left    : getValue(pos.left - wPadding * current.leftRatio),
				width   : getValue(width  + wPadding),
				height  : getValue(height + hPadding)
			};

			return pos;
		},

		step: function (now, fx) {
			var ratio,
				padding,
				value,
				prop       = fx.prop,
				current    = F.current,
				wrapSpace  = current.wrapSpace,
				skinSpace  = current.skinSpace;

			if (prop === 'width' || prop === 'height') {
				ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

				if (F.isClosing) {
					ratio = 1 - ratio;
				}

				padding = prop === 'width' ? current.wPadding : current.hPadding;
				value   = now - padding;

				F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
				F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
			}
		},

		zoomIn: function () {
			var current  = F.current,
				startPos = current.pos,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = $.extend({opacity : 1}, startPos);

			// Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0.1;
				}

			} else if (effect === 'fade') {
				startPos.opacity = 0.1;
			}

			F.wrap.css(startPos).animate(endPos, {
				duration : effect === 'none' ? 0 : current.openSpeed,
				easing   : current.openEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomIn
			});
		},

		zoomOut: function () {
			var current  = F.current,
				effect   = current.closeEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0.1};

			if (elastic) {
				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0.1;
				}
			}

			F.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var current   = F.current,
				effect    = current.nextEffect,
				startPos  = current.pos,
				endPos    = { opacity : 1 },
				direction = F.direction,
				distance  = 200,
				field;

			startPos.opacity = 0.1;

			if (effect === 'elastic') {
				field = direction === 'down' || direction === 'up' ? 'top' : 'left';

				if (direction === 'down' || direction === 'right') {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
					endPos[ field ]   = '+=' + distance + 'px';

				} else {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
					endPos[ field ]   = '-=' + distance + 'px';
				}
			}

			// Workaround for http://bugs.jquery.com/ticket/12273
			if (effect === 'none') {
				F._afterZoomIn();

			} else {
				F.wrap.css(startPos).animate(endPos, {
					duration : current.nextSpeed,
					easing   : current.nextEasing,
					complete : F._afterZoomIn
				});
			}
		},

		changeOut: function () {
			var previous  = F.previous,
				effect    = previous.prevEffect,
				endPos    = { opacity : 0.1 },
				direction = F.direction,
				distance  = 200;

			if (effect === 'elastic') {
				endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
			}

			previous.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : previous.prevSpeed,
				easing   : previous.prevEasing,
				complete : function () {
					$(this).trigger('onReset').remove();
				}
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		defaults : {
			closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
			speedOut   : 200,       // duration of fadeOut animation
			showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
			css        : {},        // custom CSS properties
			locked     : !isTouch,  // if true, the content will be locked into overlay
			fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
		},

		overlay : null,      // current handle
		fixed   : false,     // indicates if the overlay has position "fixed"
		el      : $('html'), // element that contains "the lock"

		// Public methods
		create : function(opts) {
			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.close();
			}

			this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
			this.fixed   = false;

			if (opts.fixed && F.defaults.fixed) {
				this.overlay.addClass('fancybox-overlay-fixed');

				this.fixed = true;
			}
		},

		open : function(opts) {
			var that = this;

			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.overlay.unbind('.overlay').width('auto').height('auto');

			} else {
				this.create(opts);
			}

			if (!this.fixed) {
				W.bind('resize.overlay', $.proxy( this.update, this) );

				this.update();
			}

			if (opts.closeClick) {
				this.overlay.bind('click.overlay', function(e) {
					if ($(e.target).hasClass('fancybox-overlay')) {
						if (F.isActive) {
							F.close();
						} else {
							that.close();
						}

						return false;
					}
				});
			}

			this.overlay.css( opts.css ).show();
		},

		close : function() {
			var scrollV, scrollH;

			W.unbind('resize.overlay');

			if (this.el.hasClass('fancybox-lock')) {
				$('.fancybox-margin').removeClass('fancybox-margin');

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.removeClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			$('.fancybox-overlay').remove().hide();

			$.extend(this, {
				overlay : null,
				fixed   : false
			});
		},

		// Private, callbacks

		update : function () {
			var width = '100%', offsetWidth;

			// Reset width/height so it will not mess
			this.overlay.width(width).height('100%');

			// jQuery does not return reliable result for IE
			if (IE) {
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				if (D.width() > offsetWidth) {
					width = D.width();
				}

			} else if (D.width() > W.width()) {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		// This is where we can manipulate DOM, because later it would cause iframes to reload
		onReady : function (opts, obj) {
			var overlay = this.overlay;

			$('.fancybox-overlay').stop(true, true);

			if (!overlay) {
				this.create(opts);
			}

			if (opts.locked && this.fixed && obj.fixed) {
				if (!overlay) {
					this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
				}

				obj.locked = this.overlay.append( obj.wrap );
				obj.fixed  = false;
			}

			if (opts.showEarly === true) {
				this.beforeShow.apply(this, arguments);
			}
		},

		beforeShow : function(opts, obj) {
			var scrollV, scrollH;

			if (obj.locked) {
				if (this.margin !== false) {
					$('*').filter(function(){
						return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
					}).addClass('fancybox-margin');

					this.el.addClass('fancybox-margin');
				}

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.addClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			this.open(opts);
		},

		onUpdate : function() {
			if (!this.fixed) {
				this.update();
			}
		},

		afterClose: function (opts) {
			// Remove overlay if exists and fancyBox is not opening
			// (e.g., it is not being open using afterClose callback)
			//if (this.overlay && !F.isActive) {
			if (this.overlay && !F.coming) {
				this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
			}
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		defaults : {
			type     : 'float', // 'float', 'inside', 'outside' or 'over',
			position : 'bottom' // 'top' or 'bottom'
		},

		beforeShow: function (opts) {
			var current = F.current,
				text    = current.title,
				type    = opts.type,
				title,
				target;

			if ($.isFunction(text)) {
				text = text.call(current.element, current);
			}

			if (!isString(text) || $.trim(text) === '') {
				return;
			}

			title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

			switch (type) {
				case 'inside':
					target = F.skin;
				break;

				case 'outside':
					target = F.wrap;
				break;

				case 'over':
					target = F.inner;
				break;

				default: // 'float'
					target = F.skin;

					title.appendTo('body');

					if (IE) {
						title.width( title.width() );
					}

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
				break;
			}

			title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var index,
			that     = $(this),
			selector = this.selector || '',
			run      = function(e) {
				var what = $(this).blur(), idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = what.attr(relType);

					if (!relVal) {
						relType = 'rel';
						relVal  = what.get(0)[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					// Stop an event from bubbling if everything is fine
					if (F.open(what, options) !== false) {
						e.preventDefault();
					}
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (!selector || options.live === false) {
			that.unbind('click.fb-start').bind('click.fb-start', run);

		} else {
			D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
		}

		this.filter('[data-fancybox-start=1]').trigger('click');

		return this;
	};

	// Tests that need a body at doc ready
	D.ready(function() {
		var w1, w2;

		if ( $.scrollbarWidth === undefined ) {
			// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
			$.scrollbarWidth = function() {
				var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					child  = parent.children(),
					width  = child.innerWidth() - child.height( 99 ).innerWidth();

				parent.remove();

				return width;
			};
		}

		if ( $.support.fixedPosition === undefined ) {
			$.support.fixedPosition = (function() {
				var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
					fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

				elem.remove();

				return fixed;
			}());
		}

		$.extend(F.defaults, {
			scrollbarWidth : $.scrollbarWidth(),
			fixed  : $.support.fixedPosition,
			parent : $('body')
		});

		//Get real width of page scroll-bar
		w1 = $(window).width();

		H.addClass('fancybox-lock-test');

		w2 = $(window).width();

		H.removeClass('fancybox-lock-test');

		$("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
	});

}(window, document, jQuery));
/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2014 Happyworm Ltd
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Author: Mark J Panaghiston
 * Version: 2.9.2
 * Date: 14th December 2014
 */

/* Support for Zepto 1.0 compiled with optional data module.
 * For AMD or NODE/CommonJS support, you will need to manually switch the related 2 lines in the code below.
 * Search terms: "jQuery Switch" and "Zepto Switch"
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory); // jQuery Switch
		// define(['zepto'], factory); // Zepto Switch
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery')); // jQuery Switch
		//factory(require('zepto')); // Zepto Switch
	} else {
		// Browser globals
		if(root.jQuery) { // Use jQuery if available
			factory(root.jQuery);
		} else { // Otherwise, use Zepto
			factory(root.Zepto);
		}
	}
}(this, function ($, undefined) {

	// Adapted from jquery.ui.widget.js (1.8.7): $.widget.bridge - Tweaked $.data(this,XYZ) to $(this).data(XYZ) for Zepto
	$.fn.jPlayer = function( options ) {
		var name = "jPlayer";
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;

		// prevent calls to internal methods
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $(this).data( name ),
					methodValue = instance && $.isFunction( instance[options] ) ?
						instance[ options ].apply( instance, args ) :
						instance;
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $(this).data( name );
				if ( instance ) {
					// instance.option( options || {} )._init(); // Orig jquery.ui.widget.js code: Not recommend for jPlayer. ie., Applying new options to an existing instance (via the jPlayer constructor) and performing the _init(). The _init() is what concerns me. It would leave a lot of event handlers acting on jPlayer instance and the interface.
					instance.option( options || {} ); // The new constructor only changes the options. Changing options only has basic support atm.
				} else {
					$(this).data( name, new $.jPlayer( options, this ) );
				}
			});
		}

		return returnValue;
	};

	$.jPlayer = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
		if ( arguments.length ) {
			this.element = $(element);
			this.options = $.extend(true, {},
				this.options,
				options
			);
			var self = this;
			this.element.bind( "remove.jPlayer", function() {
				self.destroy();
			});
			this._init();
		}
	};
	// End of: (Adapted from jquery.ui.widget.js (1.8.7))

	// Zepto is missing one of the animation methods.
	if(typeof $.fn.stop !== 'function') {
		$.fn.stop = function() {};
	}

	// Emulated HTML5 methods and properties
	$.jPlayer.emulateMethods = "load play pause";
	$.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate";
	$.jPlayer.emulateOptions = "muted volume";

	// Reserved event names generated by jPlayer that are not part of the HTML5 Media element spec
	$.jPlayer.reservedEvent = "ready flashreset resize repeat error warning";

	// Events generated by jPlayer
	$.jPlayer.event = {};
	$.each(
		[
			'ready',
			'setmedia', // Fires when the media is set
			'flashreset', // Similar to the ready event if the Flash solution is set to display:none and then shown again or if it's reloaded for another reason by the browser. For example, using CSS position:fixed on Firefox for the full screen feature.
			'resize', // Occurs when the size changes through a full/restore screen operation or if the size/sizeFull options are changed.
			'repeat', // Occurs when the repeat status changes. Usually through clicks on the repeat button of the interface.
			'click', // Occurs when the user clicks on one of the following: poster image, html video, flash video.
			'error', // Event error code in event.jPlayer.error.type. See $.jPlayer.error
			'warning', // Event warning code in event.jPlayer.warning.type. See $.jPlayer.warning

			// Other events match HTML5 spec.
			'loadstart',
			'progress',
			'suspend',
			'abort',
			'emptied',
			'stalled',
			'play',
			'pause',
			'loadedmetadata',
			'loadeddata',
			'waiting',
			'playing',
			'canplay',
			'canplaythrough',
			'seeking',
			'seeked',
			'timeupdate',
			'ended',
			'ratechange',
			'durationchange',
			'volumechange'
		],
		function() {
			$.jPlayer.event[ this ] = 'jPlayer_' + this;
		}
	);

	$.jPlayer.htmlEvent = [ // These HTML events are bubbled through to the jPlayer event, without any internal action.
		"loadstart",
		// "progress", // jPlayer uses internally before bubbling.
		// "suspend", // jPlayer uses internally before bubbling.
		"abort",
		// "error", // jPlayer uses internally before bubbling.
		"emptied",
		"stalled",
		// "play", // jPlayer uses internally before bubbling.
		// "pause", // jPlayer uses internally before bubbling.
		"loadedmetadata",
		// "loadeddata", // jPlayer uses internally before bubbling.
		// "waiting", // jPlayer uses internally before bubbling.
		// "playing", // jPlayer uses internally before bubbling.
		"canplay",
		"canplaythrough"
		// "seeking", // jPlayer uses internally before bubbling.
		// "seeked", // jPlayer uses internally before bubbling.
		// "timeupdate", // jPlayer uses internally before bubbling.
		// "ended", // jPlayer uses internally before bubbling.
		// "ratechange" // jPlayer uses internally before bubbling.
		// "durationchange" // jPlayer uses internally before bubbling.
		// "volumechange" // jPlayer uses internally before bubbling.
	];

	$.jPlayer.pause = function() {
		$.jPlayer.prototype.destroyRemoved();
		$.each($.jPlayer.prototype.instances, function(i, element) {
			if(element.data("jPlayer").status.srcSet) { // Check that media is set otherwise would cause error event.
				element.jPlayer("pause");
			}
		});
	};

	// Default for jPlayer option.timeFormat
	$.jPlayer.timeFormat = {
		showHour: false,
		showMin: true,
		showSec: true,
		padHour: false,
		padMin: true,
		padSec: true,
		sepHour: ":",
		sepMin: ":",
		sepSec: ""
	};
	var ConvertTime = function() {
		this.init();
	};
	ConvertTime.prototype = {
		init: function() {
			this.options = {
				timeFormat: $.jPlayer.timeFormat
			};
		},
		time: function(s) { // function used on jPlayer.prototype._convertTime to enable per instance options.
			s = (s && typeof s === 'number') ? s : 0;

			var myTime = new Date(s * 1000),
				hour = myTime.getUTCHours(),
				min = this.options.timeFormat.showHour ? myTime.getUTCMinutes() : myTime.getUTCMinutes() + hour * 60,
				sec = this.options.timeFormat.showMin ? myTime.getUTCSeconds() : myTime.getUTCSeconds() + min * 60,
				strHour = (this.options.timeFormat.padHour && hour < 10) ? "0" + hour : hour,
				strMin = (this.options.timeFormat.padMin && min < 10) ? "0" + min : min,
				strSec = (this.options.timeFormat.padSec && sec < 10) ? "0" + sec : sec,
				strTime = "";

			strTime += this.options.timeFormat.showHour ? strHour + this.options.timeFormat.sepHour : "";
			strTime += this.options.timeFormat.showMin ? strMin + this.options.timeFormat.sepMin : "";
			strTime += this.options.timeFormat.showSec ? strSec + this.options.timeFormat.sepSec : "";

			return strTime;
		}
	};
	var myConvertTime = new ConvertTime();
	$.jPlayer.convertTime = function(s) {
		return myConvertTime.time(s);
	};

	// Adapting jQuery 1.4.4 code for jQuery.browser. Required since jQuery 1.3.2 does not detect Chrome as webkit.
	$.jPlayer.uaBrowser = function( userAgent ) {
		var ua = userAgent.toLowerCase();

		// Useragent RegExp
		var rwebkit = /(webkit)[ \/]([\w.]+)/;
		var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
		var rmsie = /(msie) ([\w.]+)/;
		var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	};

	// Platform sniffer for detecting mobile devices
	$.jPlayer.uaPlatform = function( userAgent ) {
		var ua = userAgent.toLowerCase();

		// Useragent RegExp
		var rplatform = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/;
		var rtablet = /(ipad|playbook)/;
		var randroid = /(android)/;
		var rmobile = /(mobile)/;

		var platform = rplatform.exec( ua ) || [];
		var tablet = rtablet.exec( ua ) ||
			!rmobile.exec( ua ) && randroid.exec( ua ) ||
			[];

		if(platform[1]) {
			platform[1] = platform[1].replace(/\s/g, "_"); // Change whitespace to underscore. Enables dot notation.
		}

		return { platform: platform[1] || "", tablet: tablet[1] || "" };
	};

	$.jPlayer.browser = {
	};
	$.jPlayer.platform = {
	};

	var browserMatch = $.jPlayer.uaBrowser(navigator.userAgent);
	if ( browserMatch.browser ) {
		$.jPlayer.browser[ browserMatch.browser ] = true;
		$.jPlayer.browser.version = browserMatch.version;
	}
	var platformMatch = $.jPlayer.uaPlatform(navigator.userAgent);
	if ( platformMatch.platform ) {
		$.jPlayer.platform[ platformMatch.platform ] = true;
		$.jPlayer.platform.mobile = !platformMatch.tablet;
		$.jPlayer.platform.tablet = !!platformMatch.tablet;
	}

	// Internet Explorer (IE) Browser Document Mode Sniffer. Based on code at:
	// http://msdn.microsoft.com/en-us/library/cc288325%28v=vs.85%29.aspx#GetMode
	$.jPlayer.getDocMode = function() {
		var docMode;
		if ($.jPlayer.browser.msie) {
			if (document.documentMode) { // IE8 or later
				docMode = document.documentMode;
			} else { // IE 5-7
				docMode = 5; // Assume quirks mode unless proven otherwise
				if (document.compatMode) {
					if (document.compatMode === "CSS1Compat") {
						docMode = 7; // standards mode
					}
				}
			}
		}
		return docMode;
	};
	$.jPlayer.browser.documentMode = $.jPlayer.getDocMode();

	$.jPlayer.nativeFeatures = {
		init: function() {

			/* Fullscreen function naming influenced by W3C naming.
			 * No support for: Mozilla Proposal: https://wiki.mozilla.org/Gecko:FullScreenAPI
			 */

			var d = document,
				v = d.createElement('video'),
				spec = {
					// http://www.w3.org/TR/fullscreen/
					w3c: [
						'fullscreenEnabled',
						'fullscreenElement',
						'requestFullscreen',
						'exitFullscreen',
						'fullscreenchange',
						'fullscreenerror'
					],
					// https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
					moz: [
						'mozFullScreenEnabled',
						'mozFullScreenElement',
						'mozRequestFullScreen',
						'mozCancelFullScreen',
						'mozfullscreenchange',
						'mozfullscreenerror'
					],
					// http://developer.apple.com/library/safari/#documentation/WebKit/Reference/ElementClassRef/Element/Element.html
					// http://developer.apple.com/library/safari/#documentation/UserExperience/Reference/DocumentAdditionsReference/DocumentAdditions/DocumentAdditions.html
					webkit: [
						'',
						'webkitCurrentFullScreenElement',
						'webkitRequestFullScreen',
						'webkitCancelFullScreen',
						'webkitfullscreenchange',
						''
					],
					// http://developer.apple.com/library/safari/#documentation/AudioVideo/Reference/HTMLVideoElementClassReference/HTMLVideoElement/HTMLVideoElement.html
					// https://developer.apple.com/library/safari/samplecode/HTML5VideoEventFlow/Listings/events_js.html#//apple_ref/doc/uid/DTS40010085-events_js-DontLinkElementID_5
					// Events: 'webkitbeginfullscreen' and 'webkitendfullscreen'
					webkitVideo: [
						'webkitSupportsFullscreen',
						'webkitDisplayingFullscreen',
						'webkitEnterFullscreen',
						'webkitExitFullscreen',
						'',
						''
					],
					ms: [
						'',
						'msFullscreenElement',
						'msRequestFullscreen',
						'msExitFullscreen',
						'MSFullscreenChange',
						'MSFullscreenError'
					]
				},
				specOrder = [
					'w3c',
					'moz',
					'webkit',
					'webkitVideo',
					'ms'
				],
				fs, i, il;

			this.fullscreen = fs = {
				support: {
					w3c: !!d[spec.w3c[0]],
					moz: !!d[spec.moz[0]],
					webkit: typeof d[spec.webkit[3]] === 'function',
					webkitVideo: typeof v[spec.webkitVideo[2]] === 'function',
					ms: typeof v[spec.ms[2]] === 'function'
				},
				used: {}
			};

			// Store the name of the spec being used and as a handy boolean.
			for(i = 0, il = specOrder.length; i < il; i++) {
				var n = specOrder[i];
				if(fs.support[n]) {
					fs.spec = n;
					fs.used[n] = true;
					break;
				}
			}

			if(fs.spec) {
				var s = spec[fs.spec];
				fs.api = {
					fullscreenEnabled: true,
					fullscreenElement: function(elem) {
						elem = elem ? elem : d; // Video element required for webkitVideo
						return elem[s[1]];
					},
					requestFullscreen: function(elem) {
						return elem[s[2]](); // Chrome and Opera want parameter (Element.ALLOW_KEYBOARD_INPUT) but Safari fails if flag used.
					},
					exitFullscreen: function(elem) {
						elem = elem ? elem : d; // Video element required for webkitVideo
						return elem[s[3]]();
					}
				};
				fs.event = {
					fullscreenchange: s[4],
					fullscreenerror: s[5]
				};
			} else {
				fs.api = {
					fullscreenEnabled: false,
					fullscreenElement: function() {
						return null;
					},
					requestFullscreen: function() {},
					exitFullscreen: function() {}
				};
				fs.event = {};
			}
		}
	};
	$.jPlayer.nativeFeatures.init();

	// The keyboard control system.

	// The current jPlayer instance in focus.
	$.jPlayer.focus = null;

	// The list of element node names to ignore with key controls.
	$.jPlayer.keyIgnoreElementNames = "A INPUT TEXTAREA SELECT BUTTON";

	// The function that deals with key presses.
	var keyBindings = function(event) {
		var f = $.jPlayer.focus,
			ignoreKey;

		// A jPlayer instance must be in focus. ie., keyEnabled and the last one played.
		if(f) {
			// What generated the key press?
			$.each( $.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(i, name) {
				// The strings should already be uppercase.
				if(event.target.nodeName.toUpperCase() === name.toUpperCase()) {
					ignoreKey = true;
					return false; // exit each.
				}
			});
			if(!ignoreKey) {
				// See if the key pressed matches any of the bindings.
				$.each(f.options.keyBindings, function(action, binding) {
					// The binding could be a null when the default has been disabled. ie., 1st clause in if()
					if(
						(binding && $.isFunction(binding.fn)) &&
						((typeof binding.key === 'number' && event.which === binding.key) ||
						(typeof binding.key === 'string' && event.key === binding.key))
					) {
						event.preventDefault(); // Key being used by jPlayer, so prevent default operation.
						binding.fn(f);
						return false; // exit each.
					}
				});
			}
		}
	};

	$.jPlayer.keys = function(en) {
		var event = "keydown.jPlayer";
		// Remove any binding, just in case enabled more than once.
		$(document.documentElement).unbind(event);
		if(en) {
			$(document.documentElement).bind(event, keyBindings);
		}
	};

	// Enable the global key control handler ready for any jPlayer instance with the keyEnabled option enabled.
	$.jPlayer.keys(true);

	$.jPlayer.prototype = {
		count: 0, // Static Variable: Change it via prototype.
		version: { // Static Object
			script: "2.9.2",
			needFlash: "2.9.0",
			flash: "unknown"
		},
		options: { // Instanced in $.jPlayer() constructor
			swfPath: "js", // Path to jquery.jplayer.swf. Can be relative, absolute or server root relative.
			solution: "html, flash", // Valid solutions: html, flash, aurora. Order defines priority. 1st is highest,
			supplied: "mp3", // Defines which formats jPlayer will try and support and the priority by the order. 1st is highest,
			auroraFormats: "wav", // List the aurora.js codecs being loaded externally. Its core supports "wav". Specify format in jPlayer context. EG., The aac.js codec gives the "m4a" format.
			preload: 'metadata',  // HTML5 Spec values: none, metadata, auto.
			volume: 0.8, // The volume. Number 0 to 1.
			muted: false,
			remainingDuration: false, // When true, the remaining time is shown in the duration GUI element.
			toggleDuration: false, // When true, clicks on the duration toggle between the duration and remaining display.
			captureDuration: true, // When true, clicks on the duration are captured and no longer propagate up the DOM.
			playbackRate: 1,
			defaultPlaybackRate: 1,
			minPlaybackRate: 0.5,
			maxPlaybackRate: 4,
			wmode: "opaque", // Valid wmode: window, transparent, opaque, direct, gpu. 
			backgroundColor: "#000000", // To define the jPlayer div and Flash background color.
			cssSelectorAncestor: "#jp_container_1",
			cssSelector: { // * denotes properties that should only be required when video media type required. _cssSelector() would require changes to enable splitting these into Audio and Video defaults.
				videoPlay: ".jp-video-play", // *
				play: ".jp-play",
				pause: ".jp-pause",
				stop: ".jp-stop",
				seekBar: ".jp-seek-bar",
				playBar: ".jp-play-bar",
				mute: ".jp-mute",
				unmute: ".jp-unmute",
				volumeBar: ".jp-volume-bar",
				volumeBarValue: ".jp-volume-bar-value",
				volumeMax: ".jp-volume-max",
				playbackRateBar: ".jp-playback-rate-bar",
				playbackRateBarValue: ".jp-playback-rate-bar-value",
				currentTime: ".jp-current-time",
				duration: ".jp-duration",
				title: ".jp-title",
				fullScreen: ".jp-full-screen", // *
				restoreScreen: ".jp-restore-screen", // *
				repeat: ".jp-repeat",
				repeatOff: ".jp-repeat-off",
				gui: ".jp-gui", // The interface used with autohide feature.
				noSolution: ".jp-no-solution" // For error feedback when jPlayer cannot find a solution.
			},
			stateClass: { // Classes added to the cssSelectorAncestor to indicate the state.
				playing: "jp-state-playing",
				seeking: "jp-state-seeking",
				muted: "jp-state-muted",
				looped: "jp-state-looped",
				fullScreen: "jp-state-full-screen",
				noVolume: "jp-state-no-volume"
			},
			useStateClassSkin: false, // A state class skin relies on the state classes to change the visual appearance. The single control toggles the effect, for example: play then pause, mute then unmute.
			autoBlur: true, // GUI control handlers will drop focus after clicks.
			smoothPlayBar: false, // Smooths the play bar transitions, which affects clicks and short media with big changes per second.
			fullScreen: false, // Native Full Screen
			fullWindow: false,
			autohide: {
				restored: false, // Controls the interface autohide feature.
				full: true, // Controls the interface autohide feature.
				fadeIn: 200, // Milliseconds. The period of the fadeIn anim.
				fadeOut: 600, // Milliseconds. The period of the fadeOut anim.
				hold: 1000 // Milliseconds. The period of the pause before autohide beings.
			},
			loop: false,
			repeat: function(event) { // The default jPlayer repeat event handler
				if(event.jPlayer.options.loop) {
					$(this).unbind(".jPlayerRepeat").bind($.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
						$(this).jPlayer("play");
					});
				} else {
					$(this).unbind(".jPlayerRepeat");
				}
			},
			nativeVideoControls: {
				// Works well on standard browsers.
				// Phone and tablet browsers can have problems with the controls disappearing.
			},
			noFullWindow: {
				msie: /msie [0-6]\./,
				ipad: /ipad.*?os [0-4]\./,
				iphone: /iphone/,
				ipod: /ipod/,
				android_pad: /android [0-3]\.(?!.*?mobile)/,
				android_phone: /(?=.*android)(?!.*chrome)(?=.*mobile)/,
				blackberry: /blackberry/,
				windows_ce: /windows ce/,
				iemobile: /iemobile/,
				webos: /webos/
			},
			noVolume: {
				ipad: /ipad/,
				iphone: /iphone/,
				ipod: /ipod/,
				android_pad: /android(?!.*?mobile)/,
				android_phone: /android.*?mobile/,
				blackberry: /blackberry/,
				windows_ce: /windows ce/,
				iemobile: /iemobile/,
				webos: /webos/,
				playbook: /playbook/
			},
			timeFormat: {
				// Specific time format for this instance. The supported options are defined in $.jPlayer.timeFormat
				// For the undefined options we use the default from $.jPlayer.timeFormat
			},
			keyEnabled: false, // Enables keyboard controls.
			audioFullScreen: false, // Enables keyboard controls to enter full screen with audio media.
			keyBindings: { // The key control object, defining the key codes and the functions to execute.
				// The parameter, f = $.jPlayer.focus, will be checked truethy before attempting to call any of these functions.
				// Properties may be added to this object, in key/fn pairs, to enable other key controls. EG, for the playlist add-on.
				play: {
					key: 80, // p
					fn: function(f) {
						if(f.status.paused) {
							f.play();
						} else {
							f.pause();
						}
					}
				},
				fullScreen: {
					key: 70, // f
					fn: function(f) {
						if(f.status.video || f.options.audioFullScreen) {
							f._setOption("fullScreen", !f.options.fullScreen);
						}
					}
				},
				muted: {
					key: 77, // m
					fn: function(f) {
						f._muted(!f.options.muted);
					}
				},
				volumeUp: {
					key: 190, // .
					fn: function(f) {
						f.volume(f.options.volume + 0.1);
					}
				},
				volumeDown: {
					key: 188, // ,
					fn: function(f) {
						f.volume(f.options.volume - 0.1);
					}
				},
				loop: {
					key: 76, // l
					fn: function(f) {
						f._loop(!f.options.loop);
					}
				}
			},
			verticalVolume: false, // Calculate volume from the bottom of the volume bar. Default is from the left. Also volume affects either width or height.
			verticalPlaybackRate: false,
			globalVolume: false, // Set to make volume and muted changes affect all jPlayer instances with this option enabled
			idPrefix: "jp", // Prefix for the ids of html elements created by jPlayer. For flash, this must not include characters: . - + * / \
			noConflict: "jQuery",
			emulateHtml: false, // Emulates the HTML5 Media element on the jPlayer element.
			consoleAlerts: true, // Alerts are sent to the console.log() instead of alert().
			errorAlerts: false,
			warningAlerts: false
		},
		optionsAudio: {
			size: {
				width: "0px",
				height: "0px",
				cssClass: ""
			},
			sizeFull: {
				width: "0px",
				height: "0px",
				cssClass: ""
			}
		},
		optionsVideo: {
			size: {
				width: "480px",
				height: "270px",
				cssClass: "jp-video-270p"
			},
			sizeFull: {
				width: "100%",
				height: "100%",
				cssClass: "jp-video-full"
			}
		},
		instances: {}, // Static Object
		status: { // Instanced in _init()
			src: "",
			media: {},
			paused: true,
			format: {},
			formatType: "",
			waitForPlay: true, // Same as waitForLoad except in case where preloading.
			waitForLoad: true,
			srcSet: false,
			video: false, // True if playing a video
			seekPercent: 0,
			currentPercentRelative: 0,
			currentPercentAbsolute: 0,
			currentTime: 0,
			duration: 0,
			remaining: 0,
			videoWidth: 0, // Intrinsic width of the video in pixels.
			videoHeight: 0, // Intrinsic height of the video in pixels.
			readyState: 0,
			networkState: 0,
			playbackRate: 1, // Warning - Now both an option and a status property
			ended: 0

/*		Persistant status properties created dynamically at _init():
			width
			height
			cssClass
			nativeVideoControls
			noFullWindow
			noVolume
			playbackRateEnabled // Warning - Technically, we can have both Flash and HTML, so this might not be correct if the Flash is active. That is a niche case.
*/
		},

		internal: { // Instanced in _init()
			ready: false
			// instance: undefined
			// domNode: undefined
			// htmlDlyCmdId: undefined
			// autohideId: undefined
			// mouse: undefined
			// cmdsIgnored
		},
		solution: { // Static Object: Defines the solutions built in jPlayer.
			html: true,
			aurora: true,
			flash: true
		},
		// 'MPEG-4 support' : canPlayType('video/mp4; codecs="mp4v.20.8"')
		format: { // Static Object
			mp3: {
				codec: 'audio/mpeg',
				flashCanPlay: true,
				media: 'audio'
			},
			m4a: { // AAC / MP4
				codec: 'audio/mp4; codecs="mp4a.40.2"',
				flashCanPlay: true,
				media: 'audio'
			},
			m3u8a: { // AAC / MP4 / Apple HLS
				codec: 'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',
				flashCanPlay: false,
				media: 'audio'
			},
			m3ua: { // M3U
				codec: 'audio/mpegurl',
				flashCanPlay: false,
				media: 'audio'
			},
			oga: { // OGG
				codec: 'audio/ogg; codecs="vorbis, opus"',
				flashCanPlay: false,
				media: 'audio'
			},
			flac: { // FLAC
				codec: 'audio/x-flac',
				flashCanPlay: false,
				media: 'audio'
			},
			wav: { // PCM
				codec: 'audio/wav; codecs="1"',
				flashCanPlay: false,
				media: 'audio'
			},
			webma: { // WEBM
				codec: 'audio/webm; codecs="vorbis"',
				flashCanPlay: false,
				media: 'audio'
			},
			fla: { // FLV / F4A
				codec: 'audio/x-flv',
				flashCanPlay: true,
				media: 'audio'
			},
			rtmpa: { // RTMP AUDIO
				codec: 'audio/rtmp; codecs="rtmp"',
				flashCanPlay: true,
				media: 'audio'
			},
			m4v: { // H.264 / MP4
				codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				flashCanPlay: true,
				media: 'video'
			},
			m3u8v: { // H.264 / AAC / MP4 / Apple HLS
				codec: 'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',
				flashCanPlay: false,
				media: 'video'
			},
			m3uv: { // M3U
				codec: 'audio/mpegurl',
				flashCanPlay: false,
				media: 'video'
			},
			ogv: { // OGG
				codec: 'video/ogg; codecs="theora, vorbis"',
				flashCanPlay: false,
				media: 'video'
			},
			webmv: { // WEBM
				codec: 'video/webm; codecs="vorbis, vp8"',
				flashCanPlay: false,
				media: 'video'
			},
			flv: { // FLV / F4V
				codec: 'video/x-flv',
				flashCanPlay: true,
				media: 'video'
			},
			rtmpv: { // RTMP VIDEO
				codec: 'video/rtmp; codecs="rtmp"',
				flashCanPlay: true,
				media: 'video'
			}
		},
		_init: function() {
			var self = this;
			
			this.element.empty();
			
			this.status = $.extend({}, this.status); // Copy static to unique instance.
			this.internal = $.extend({}, this.internal); // Copy static to unique instance.

			// Initialize the time format
			this.options.timeFormat = $.extend({}, $.jPlayer.timeFormat, this.options.timeFormat);

			// On iOS, assume commands will be ignored before user initiates them.
			this.internal.cmdsIgnored = $.jPlayer.platform.ipad || $.jPlayer.platform.iphone || $.jPlayer.platform.ipod;

			this.internal.domNode = this.element.get(0);

			// Add key bindings focus to 1st jPlayer instanced with key control enabled.
			if(this.options.keyEnabled && !$.jPlayer.focus) {
				$.jPlayer.focus = this;
			}

			// A fix for Android where older (2.3) and even some 4.x devices fail to work when changing the *audio* SRC and then playing immediately.
			this.androidFix = {
				setMedia: false, // True when media set
				play: false, // True when a progress event will instruct the media to play
				pause: false, // True when a progress event will instruct the media to pause at a time.
				time: NaN // The play(time) parameter
			};
			if($.jPlayer.platform.android) {
				this.options.preload = this.options.preload !== 'auto' ? 'metadata' : 'auto'; // Default to metadata, but allow auto.
			}

			this.formats = []; // Array based on supplied string option. Order defines priority.
			this.solutions = []; // Array based on solution string option. Order defines priority.
			this.require = {}; // Which media types are required: video, audio.
			
			this.htmlElement = {}; // DOM elements created by jPlayer
			this.html = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
			this.html.audio = {};
			this.html.video = {};
			this.aurora = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
			this.aurora.formats = [];
			this.aurora.properties = [];
			this.flash = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
			
			this.css = {};
			this.css.cs = {}; // Holds the css selector strings
			this.css.jq = {}; // Holds jQuery selectors. ie., $(css.cs.method)

			this.ancestorJq = []; // Holds jQuery selector of cssSelectorAncestor. Init would use $() instead of [], but it is only 1.4+

			this.options.volume = this._limitValue(this.options.volume, 0, 1); // Limit volume value's bounds.

			// Create the formats array, with prority based on the order of the supplied formats string
			$.each(this.options.supplied.toLowerCase().split(","), function(index1, value1) {
				var format = value1.replace(/^\s+|\s+$/g, ""); //trim
				if(self.format[format]) { // Check format is valid.
					var dupFound = false;
					$.each(self.formats, function(index2, value2) { // Check for duplicates
						if(format === value2) {
							dupFound = true;
							return false;
						}
					});
					if(!dupFound) {
						self.formats.push(format);
					}
				}
			});

			// Create the solutions array, with prority based on the order of the solution string
			$.each(this.options.solution.toLowerCase().split(","), function(index1, value1) {
				var solution = value1.replace(/^\s+|\s+$/g, ""); //trim
				if(self.solution[solution]) { // Check solution is valid.
					var dupFound = false;
					$.each(self.solutions, function(index2, value2) { // Check for duplicates
						if(solution === value2) {
							dupFound = true;
							return false;
						}
					});
					if(!dupFound) {
						self.solutions.push(solution);
					}
				}
			});
				
			// Create Aurora.js formats array
			$.each(this.options.auroraFormats.toLowerCase().split(","), function(index1, value1) {
				var format = value1.replace(/^\s+|\s+$/g, ""); //trim
				if(self.format[format]) { // Check format is valid.
					var dupFound = false;
					$.each(self.aurora.formats, function(index2, value2) { // Check for duplicates
						if(format === value2) {
							dupFound = true;
							return false;
						}
					});
					if(!dupFound) {
						self.aurora.formats.push(format);
					}
				}
			});

			this.internal.instance = "jp_" + this.count;
			this.instances[this.internal.instance] = this.element;

			// Check the jPlayer div has an id and create one if required. Important for Flash to know the unique id for comms.
			if(!this.element.attr("id")) {
				this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count);
			}

			this.internal.self = $.extend({}, {
				id: this.element.attr("id"),
				jq: this.element
			});
			this.internal.audio = $.extend({}, {
				id: this.options.idPrefix + "_audio_" + this.count,
				jq: undefined
			});
			this.internal.video = $.extend({}, {
				id: this.options.idPrefix + "_video_" + this.count,
				jq: undefined
			});
			this.internal.flash = $.extend({}, {
				id: this.options.idPrefix + "_flash_" + this.count,
				jq: undefined,
				swf: this.options.swfPath + (this.options.swfPath.toLowerCase().slice(-4) !== ".swf" ? (this.options.swfPath && this.options.swfPath.slice(-1) !== "/" ? "/" : "") + "jquery.jplayer.swf" : "")
			});
			this.internal.poster = $.extend({}, {
				id: this.options.idPrefix + "_poster_" + this.count,
				jq: undefined
			});

			// Register listeners defined in the constructor
			$.each($.jPlayer.event, function(eventName,eventType) {
				if(self.options[eventName] !== undefined) {
					self.element.bind(eventType + ".jPlayer", self.options[eventName]); // With .jPlayer namespace.
					self.options[eventName] = undefined; // Destroy the handler pointer copy on the options. Reason, events can be added/removed in other ways so this could be obsolete and misleading.
				}
			});

			// Determine if we require solutions for audio, video or both media types.
			this.require.audio = false;
			this.require.video = false;
			$.each(this.formats, function(priority, format) {
				self.require[self.format[format].media] = true;
			});

			// Now required types are known, finish the options default settings.
			if(this.require.video) {
				this.options = $.extend(true, {},
					this.optionsVideo,
					this.options
				);
			} else {
				this.options = $.extend(true, {},
					this.optionsAudio,
					this.options
				);
			}
			this._setSize(); // update status and jPlayer element size

			// Determine the status for Blocklisted options.
			this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
			this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
			this.status.noVolume = this._uaBlocklist(this.options.noVolume);

			// Create event handlers if native fullscreen is supported
			if($.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled) {
				this._fullscreenAddEventListeners();
			}

			// The native controls are only for video and are disabled when audio is also used.
			this._restrictNativeVideoControls();

			// Create the poster image.
			this.htmlElement.poster = document.createElement('img');
			this.htmlElement.poster.id = this.internal.poster.id;
			this.htmlElement.poster.onload = function() { // Note that this did not work on Firefox 3.6: poster.addEventListener("onload", function() {}, false); Did not investigate x-browser.
				if(!self.status.video || self.status.waitForPlay) {
					self.internal.poster.jq.show();
				}
			};
			this.element.append(this.htmlElement.poster);
			this.internal.poster.jq = $("#" + this.internal.poster.id);
			this.internal.poster.jq.css({'width': this.status.width, 'height': this.status.height});
			this.internal.poster.jq.hide();
			this.internal.poster.jq.bind("click.jPlayer", function() {
				self._trigger($.jPlayer.event.click);
			});
			
			// Generate the required media elements
			this.html.audio.available = false;
			if(this.require.audio) { // If a supplied format is audio
				this.htmlElement.audio = document.createElement('audio');
				this.htmlElement.audio.id = this.internal.audio.id;
				this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio); // Test is for IE9 on Win Server 2008.
			}
			this.html.video.available = false;
			if(this.require.video) { // If a supplied format is video
				this.htmlElement.video = document.createElement('video');
				this.htmlElement.video.id = this.internal.video.id;
				this.html.video.available = !!this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video); // Test is for IE9 on Win Server 2008.
			}

			this.flash.available = this._checkForFlash(10.1);

			this.html.canPlay = {};
			this.aurora.canPlay = {};
			this.flash.canPlay = {};
			$.each(this.formats, function(priority, format) {
				self.html.canPlay[format] = self.html[self.format[format].media].available && "" !== self.htmlElement[self.format[format].media].canPlayType(self.format[format].codec);
				self.aurora.canPlay[format] = ($.inArray(format, self.aurora.formats) > -1);
				self.flash.canPlay[format] = self.format[format].flashCanPlay && self.flash.available;
			});
			this.html.desired = false;
			this.aurora.desired = false;
			this.flash.desired = false;
			$.each(this.solutions, function(solutionPriority, solution) {
				if(solutionPriority === 0) {
					self[solution].desired = true;
				} else {
					var audioCanPlay = false;
					var videoCanPlay = false;
					$.each(self.formats, function(formatPriority, format) {
						if(self[self.solutions[0]].canPlay[format]) { // The other solution can play
							if(self.format[format].media === 'video') {
								videoCanPlay = true;
							} else {
								audioCanPlay = true;
							}
						}
					});
					self[solution].desired = (self.require.audio && !audioCanPlay) || (self.require.video && !videoCanPlay);
				}
			});
			// This is what jPlayer will support, based on solution and supplied.
			this.html.support = {};
			this.aurora.support = {};
			this.flash.support = {};
			$.each(this.formats, function(priority, format) {
				self.html.support[format] = self.html.canPlay[format] && self.html.desired;
				self.aurora.support[format] = self.aurora.canPlay[format] && self.aurora.desired;
				self.flash.support[format] = self.flash.canPlay[format] && self.flash.desired;
			});
			// If jPlayer is supporting any format in a solution, then the solution is used.
			this.html.used = false;
			this.aurora.used = false;
			this.flash.used = false;
			$.each(this.solutions, function(solutionPriority, solution) {
				$.each(self.formats, function(formatPriority, format) {
					if(self[solution].support[format]) {
						self[solution].used = true;
						return false;
					}
				});
			});

			// Init solution active state and the event gates to false.
			this._resetActive();
			this._resetGate();

			// Set up the css selectors for the control and feedback entities.
			this._cssSelectorAncestor(this.options.cssSelectorAncestor);
			
			// If neither html nor aurora nor flash are being used by this browser, then media playback is not possible. Trigger an error event.
			if(!(this.html.used || this.aurora.used || this.flash.used)) {
				this._error( {
					type: $.jPlayer.error.NO_SOLUTION, 
					context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
					message: $.jPlayer.errorMsg.NO_SOLUTION,
					hint: $.jPlayer.errorHint.NO_SOLUTION
				});
				if(this.css.jq.noSolution.length) {
					this.css.jq.noSolution.show();
				}
			} else {
				if(this.css.jq.noSolution.length) {
					this.css.jq.noSolution.hide();
				}
			}

			// Add the flash solution if it is being used.
			if(this.flash.used) {
				var htmlObj,
				flashVars = 'jQuery=' + encodeURI(this.options.noConflict) + '&id=' + encodeURI(this.internal.self.id) + '&vol=' + this.options.volume + '&muted=' + this.options.muted;

				// Code influenced by SWFObject 2.2: http://code.google.com/p/swfobject/
				// Non IE browsers have an initial Flash size of 1 by 1 otherwise the wmode affected the Flash ready event. 

				if($.jPlayer.browser.msie && (Number($.jPlayer.browser.version) < 9 || $.jPlayer.browser.documentMode < 9)) {
					var objStr = '<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>';

					var paramStr = [
						'<param name="movie" value="' + this.internal.flash.swf + '" />',
						'<param name="FlashVars" value="' + flashVars + '" />',
						'<param name="allowScriptAccess" value="always" />',
						'<param name="bgcolor" value="' + this.options.backgroundColor + '" />',
						'<param name="wmode" value="' + this.options.wmode + '" />'
					];

					htmlObj = document.createElement(objStr);
					for(var i=0; i < paramStr.length; i++) {
						htmlObj.appendChild(document.createElement(paramStr[i]));
					}
				} else {
					var createParam = function(el, n, v) {
						var p = document.createElement("param");
						p.setAttribute("name", n);	
						p.setAttribute("value", v);
						el.appendChild(p);
					};

					htmlObj = document.createElement("object");
					htmlObj.setAttribute("id", this.internal.flash.id);
					htmlObj.setAttribute("name", this.internal.flash.id);
					htmlObj.setAttribute("data", this.internal.flash.swf);
					htmlObj.setAttribute("type", "application/x-shockwave-flash");
					htmlObj.setAttribute("width", "1"); // Non-zero
					htmlObj.setAttribute("height", "1"); // Non-zero
					htmlObj.setAttribute("tabindex", "-1");
					createParam(htmlObj, "flashvars", flashVars);
					createParam(htmlObj, "allowscriptaccess", "always");
					createParam(htmlObj, "bgcolor", this.options.backgroundColor);
					createParam(htmlObj, "wmode", this.options.wmode);
				}

				this.element.append(htmlObj);
				this.internal.flash.jq = $(htmlObj);
			}

			// Setup playbackRate ability before using _addHtmlEventListeners()
			if(this.html.used && !this.flash.used) { // If only HTML
				// Using the audio element capabilities for playbackRate. ie., Assuming video element is the same.
				this.status.playbackRateEnabled = this._testPlaybackRate('audio');
			} else {
				this.status.playbackRateEnabled = false;
			}

			this._updatePlaybackRate();

			// Add the HTML solution if being used.
			if(this.html.used) {

				// The HTML Audio handlers
				if(this.html.audio.available) {
					this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio);
					this.element.append(this.htmlElement.audio);
					this.internal.audio.jq = $("#" + this.internal.audio.id);
				}

				// The HTML Video handlers
				if(this.html.video.available) {
					this._addHtmlEventListeners(this.htmlElement.video, this.html.video);
					this.element.append(this.htmlElement.video);
					this.internal.video.jq = $("#" + this.internal.video.id);
					if(this.status.nativeVideoControls) {
						this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
					} else {
						this.internal.video.jq.css({'width':'0px', 'height':'0px'}); // Using size 0x0 since a .hide() causes issues in iOS
					}
					this.internal.video.jq.bind("click.jPlayer", function() {
						self._trigger($.jPlayer.event.click);
					});
				}
			}
			
			// Add the Aurora.js solution if being used.
			if(this.aurora.used) {
				// Aurora.js player need to be created for each media, see setMedia function.
			}

			// Create the bridge that emulates the HTML Media element on the jPlayer DIV
			if( this.options.emulateHtml ) {
				this._emulateHtmlBridge();
			}

			if((this.html.used || this.aurora.used) && !this.flash.used) { // If only HTML, then emulate flash ready() call after 100ms.
				setTimeout( function() {
					self.internal.ready = true;
					self.version.flash = "n/a";
					self._trigger($.jPlayer.event.repeat); // Trigger the repeat event so its handler can initialize itself with the loop option.
					self._trigger($.jPlayer.event.ready);
				}, 100);
			}

			// Initialize the interface components with the options.
			this._updateNativeVideoControls();
			// The other controls are now setup in _cssSelectorAncestor()
			if(this.css.jq.videoPlay.length) {
				this.css.jq.videoPlay.hide();
			}

			$.jPlayer.prototype.count++; // Change static variable via prototype.
		},
		destroy: function() {
			// MJP: The background change remains. Would need to store the original to restore it correctly.
			// MJP: The jPlayer element's size change remains.

			// Clear the media to reset the GUI and stop any downloads. Streams on some browsers had persited. (Chrome)
			this.clearMedia();
			// Remove the size/sizeFull cssClass from the cssSelectorAncestor
			this._removeUiClass();
			// Remove the times from the GUI
			if(this.css.jq.currentTime.length) {
				this.css.jq.currentTime.text("");
			}
			if(this.css.jq.duration.length) {
				this.css.jq.duration.text("");
			}
			// Remove any bindings from the interface controls.
			$.each(this.css.jq, function(fn, jq) {
				// Check selector is valid before trying to execute method.
				if(jq.length) {
					jq.unbind(".jPlayer");
				}
			});
			// Remove the click handlers for $.jPlayer.event.click
			this.internal.poster.jq.unbind(".jPlayer");
			if(this.internal.video.jq) {
				this.internal.video.jq.unbind(".jPlayer");
			}
			// Remove the fullscreen event handlers
			this._fullscreenRemoveEventListeners();
			// Remove key bindings
			if(this === $.jPlayer.focus) {
				$.jPlayer.focus = null;
			}
			// Destroy the HTML bridge.
			if(this.options.emulateHtml) {
				this._destroyHtmlBridge();
			}
			this.element.removeData("jPlayer"); // Remove jPlayer data
			this.element.unbind(".jPlayer"); // Remove all event handlers created by the jPlayer constructor
			this.element.empty(); // Remove the inserted child elements
			
			delete this.instances[this.internal.instance]; // Clear the instance on the static instance object
		},
		destroyRemoved: function() { // Destroy any instances that have gone away.
			var self = this;
			$.each(this.instances, function(i, element) {
				if(self.element !== element) { // Do not destroy this instance.
					if(!element.data("jPlayer")) { // Check that element is a real jPlayer.
						element.jPlayer("destroy");
						delete self.instances[i];
					}
				}
			});
		},
		enable: function() { // Plan to implement
			// options.disabled = false
		},
		disable: function () { // Plan to implement
			// options.disabled = true
		},
		_testCanPlayType: function(elem) {
			// IE9 on Win Server 2008 did not implement canPlayType(), but it has the property.
			try {
				elem.canPlayType(this.format.mp3.codec); // The type is irrelevant.
				return true;
			} catch(err) {
				return false;
			}
		},
		_testPlaybackRate: function(type) {
			// type: String 'audio' or 'video'
			var el, rate = 0.5;
			type = typeof type === 'string' ? type : 'audio';
			el = document.createElement(type);
			// Wrapping in a try/catch, just in case older HTML5 browsers throw and error.
			try {
				if('playbackRate' in el) {
					el.playbackRate = rate;
					return el.playbackRate === rate;
				} else {
					return false;
				}
			} catch(err) {
				return false;
			}
		},
		_uaBlocklist: function(list) {
			// list : object with properties that are all regular expressions. Property names are irrelevant.
			// Returns true if the user agent is matched in list.
			var	ua = navigator.userAgent.toLowerCase(),
				block = false;

			$.each(list, function(p, re) {
				if(re && re.test(ua)) {
					block = true;
					return false; // exit $.each.
				}
			});
			return block;
		},
		_restrictNativeVideoControls: function() {
			// Fallback to noFullWindow when nativeVideoControls is true and audio media is being used. Affects when both media types are used.
			if(this.require.audio) {
				if(this.status.nativeVideoControls) {
					this.status.nativeVideoControls = false;
					this.status.noFullWindow = true;
				}
			}
		},
		_updateNativeVideoControls: function() {
			if(this.html.video.available && this.html.used) {
				// Turn the HTML Video controls on/off
				this.htmlElement.video.controls = this.status.nativeVideoControls;
				// Show/hide the jPlayer GUI.
				this._updateAutohide();
				// For when option changed. The poster image is not updated, as it is dealt with in setMedia(). Acceptable degradation since seriously doubt these options will change on the fly. Can again review later.
				if(this.status.nativeVideoControls && this.require.video) {
					this.internal.poster.jq.hide();
					this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
				} else if(this.status.waitForPlay && this.status.video) {
					this.internal.poster.jq.show();
					this.internal.video.jq.css({'width': '0px', 'height': '0px'});
				}
			}
		},
		_addHtmlEventListeners: function(mediaElement, entity) {
			var self = this;
			mediaElement.preload = this.options.preload;
			mediaElement.muted = this.options.muted;
			mediaElement.volume = this.options.volume;

			if(this.status.playbackRateEnabled) {
				mediaElement.defaultPlaybackRate = this.options.defaultPlaybackRate;
				mediaElement.playbackRate = this.options.playbackRate;
			}

			// Create the event listeners
			// Only want the active entity to affect jPlayer and bubble events.
			// Using entity.gate so that object is referenced and gate property always current
			
			mediaElement.addEventListener("progress", function() {
				if(entity.gate) {
					if(self.internal.cmdsIgnored && this.readyState > 0) { // Detect iOS executed the command
						self.internal.cmdsIgnored = false;
					}
					self._getHtmlStatus(mediaElement);
					self._updateInterface();
					self._trigger($.jPlayer.event.progress);
				}
			}, false);
			mediaElement.addEventListener("loadeddata", function() {
				if(entity.gate) {
					self.androidFix.setMedia = false; // Disable the fix after the first progress event.
					if(self.androidFix.play) { // Play Android audio - performing the fix.
						self.androidFix.play = false;
						self.play(self.androidFix.time);
					}
					if(self.androidFix.pause) { // Pause Android audio at time - performing the fix.
						self.androidFix.pause = false;
						self.pause(self.androidFix.time);
					}
					self._trigger($.jPlayer.event.loadeddata);
				}
			}, false);
			mediaElement.addEventListener("timeupdate", function() {
				if(entity.gate) {
					self._getHtmlStatus(mediaElement);
					self._updateInterface();
					self._trigger($.jPlayer.event.timeupdate);
				}
			}, false);
			mediaElement.addEventListener("durationchange", function() {
				if(entity.gate) {
					self._getHtmlStatus(mediaElement);
					self._updateInterface();
					self._trigger($.jPlayer.event.durationchange);
				}
			}, false);
			mediaElement.addEventListener("play", function() {
				if(entity.gate) {
					self._updateButtons(true);
					self._html_checkWaitForPlay(); // So the native controls update this variable and puts the hidden interface in the correct state. Affects toggling native controls.
					self._trigger($.jPlayer.event.play);
				}
			}, false);
			mediaElement.addEventListener("playing", function() {
				if(entity.gate) {
					self._updateButtons(true);
					self._seeked();
					self._trigger($.jPlayer.event.playing);
				}
			}, false);
			mediaElement.addEventListener("pause", function() {
				if(entity.gate) {
					self._updateButtons(false);
					self._trigger($.jPlayer.event.pause);
				}
			}, false);
			mediaElement.addEventListener("waiting", function() {
				if(entity.gate) {
					self._seeking();
					self._trigger($.jPlayer.event.waiting);
				}
			}, false);
			mediaElement.addEventListener("seeking", function() {
				if(entity.gate) {
					self._seeking();
					self._trigger($.jPlayer.event.seeking);
				}
			}, false);
			mediaElement.addEventListener("seeked", function() {
				if(entity.gate) {
					self._seeked();
					self._trigger($.jPlayer.event.seeked);
				}
			}, false);
			mediaElement.addEventListener("volumechange", function() {
				if(entity.gate) {
					// Read the values back from the element as the Blackberry PlayBook shares the volume with the physical buttons master volume control.
					// However, when tested 6th July 2011, those buttons do not generate an event. The physical play/pause button does though.
					self.options.volume = mediaElement.volume;
					self.options.muted = mediaElement.muted;
					self._updateMute();
					self._updateVolume();
					self._trigger($.jPlayer.event.volumechange);
				}
			}, false);
			mediaElement.addEventListener("ratechange", function() {
				if(entity.gate) {
					self.options.defaultPlaybackRate = mediaElement.defaultPlaybackRate;
					self.options.playbackRate = mediaElement.playbackRate;
					self._updatePlaybackRate();
					self._trigger($.jPlayer.event.ratechange);
				}
			}, false);
			mediaElement.addEventListener("suspend", function() { // Seems to be the only way of capturing that the iOS4 browser did not actually play the media from the page code. ie., It needs a user gesture.
				if(entity.gate) {
					self._seeked();
					self._trigger($.jPlayer.event.suspend);
				}
			}, false);
			mediaElement.addEventListener("ended", function() {
				if(entity.gate) {
					// Order of the next few commands are important. Change the time and then pause.
					// Solves a bug in Firefox, where issuing pause 1st causes the media to play from the start. ie., The pause is ignored.
					if(!$.jPlayer.browser.webkit) { // Chrome crashes if you do this in conjunction with a setMedia command in an ended event handler. ie., The playlist demo.
						self.htmlElement.media.currentTime = 0; // Safari does not care about this command. ie., It works with or without this line. (Both Safari and Chrome are Webkit.)
					}
					self.htmlElement.media.pause(); // Pause otherwise a click on the progress bar will play from that point, when it shouldn't, since it stopped playback.
					self._updateButtons(false);
					self._getHtmlStatus(mediaElement, true); // With override true. Otherwise Chrome leaves progress at full.
					self._updateInterface();
					self._trigger($.jPlayer.event.ended);
				}
			}, false);
			mediaElement.addEventListener("error", function() {
				if(entity.gate) {
					self._updateButtons(false);
					self._seeked();
					if(self.status.srcSet) { // Deals with case of clearMedia() causing an error event.
						clearTimeout(self.internal.htmlDlyCmdId); // Clears any delayed commands used in the HTML solution.
						self.status.waitForLoad = true; // Allows the load operation to try again.
						self.status.waitForPlay = true; // Reset since a play was captured.
						if(self.status.video && !self.status.nativeVideoControls) {
							self.internal.video.jq.css({'width':'0px', 'height':'0px'});
						}
						if(self._validString(self.status.media.poster) && !self.status.nativeVideoControls) {
							self.internal.poster.jq.show();
						}
						if(self.css.jq.videoPlay.length) {
							self.css.jq.videoPlay.show();
						}
						self._error( {
							type: $.jPlayer.error.URL,
							context: self.status.src, // this.src shows absolute urls. Want context to show the url given.
							message: $.jPlayer.errorMsg.URL,
							hint: $.jPlayer.errorHint.URL
						});
					}
				}
			}, false);
			// Create all the other event listeners that bubble up to a jPlayer event from html, without being used by jPlayer.
			$.each($.jPlayer.htmlEvent, function(i, eventType) {
				mediaElement.addEventListener(this, function() {
					if(entity.gate) {
						self._trigger($.jPlayer.event[eventType]);
					}
				}, false);
			});
		},
		_addAuroraEventListeners : function(player, entity) {
			var self = this;
			//player.preload = this.options.preload;
			//player.muted = this.options.muted;
			player.volume = this.options.volume * 100;

			// Create the event listeners
			// Only want the active entity to affect jPlayer and bubble events.
			// Using entity.gate so that object is referenced and gate property always current
			
			player.on("progress", function() {
				if(entity.gate) {
					if(self.internal.cmdsIgnored && this.readyState > 0) { // Detect iOS executed the command
						self.internal.cmdsIgnored = false;
					}
					self._getAuroraStatus(player);
					self._updateInterface();
					self._trigger($.jPlayer.event.progress);
					// Progress with song duration, we estimate timeupdate need to be triggered too.
					if (player.duration > 0) {
						self._trigger($.jPlayer.event.timeupdate);
					}
				}
			}, false);
			player.on("ready", function() {
				if(entity.gate) {
					self._trigger($.jPlayer.event.loadeddata);
				}
			}, false);
			player.on("duration", function() {
				if(entity.gate) {
					self._getAuroraStatus(player);
					self._updateInterface();
					self._trigger($.jPlayer.event.durationchange);
				}
			}, false);
			player.on("end", function() {
				if(entity.gate) {
					// Order of the next few commands are important. Change the time and then pause.
					self._updateButtons(false);
					self._getAuroraStatus(player, true);
					self._updateInterface();
					self._trigger($.jPlayer.event.ended);
				}
			}, false);
			player.on("error", function() {
				if(entity.gate) {
					self._updateButtons(false);
					self._seeked();
					if(self.status.srcSet) { // Deals with case of clearMedia() causing an error event.
						self.status.waitForLoad = true; // Allows the load operation to try again.
						self.status.waitForPlay = true; // Reset since a play was captured.
						if(self.status.video && !self.status.nativeVideoControls) {
							self.internal.video.jq.css({'width':'0px', 'height':'0px'});
						}
						if(self._validString(self.status.media.poster) && !self.status.nativeVideoControls) {
							self.internal.poster.jq.show();
						}
						if(self.css.jq.videoPlay.length) {
							self.css.jq.videoPlay.show();
						}
						self._error( {
							type: $.jPlayer.error.URL,
							context: self.status.src, // this.src shows absolute urls. Want context to show the url given.
							message: $.jPlayer.errorMsg.URL,
							hint: $.jPlayer.errorHint.URL
						});
					}
				}
			}, false);
		},
		_getHtmlStatus: function(media, override) {
			var ct = 0, cpa = 0, sp = 0, cpr = 0;

			// Fixes the duration bug in iOS, where the durationchange event occurs when media.duration is not always correct.
			// Fixes the initial duration bug in BB OS7, where the media.duration is infinity and displays as NaN:NaN due to Date() using inifity.
			if(isFinite(media.duration)) {
				this.status.duration = media.duration;
			}

			ct = media.currentTime;
			cpa = (this.status.duration > 0) ? 100 * ct / this.status.duration : 0;
			if((typeof media.seekable === "object") && (media.seekable.length > 0)) {
				sp = (this.status.duration > 0) ? 100 * media.seekable.end(media.seekable.length-1) / this.status.duration : 100;
				cpr = (this.status.duration > 0) ? 100 * media.currentTime / media.seekable.end(media.seekable.length-1) : 0; // Duration conditional for iOS duration bug. ie., seekable.end is a NaN in that case.
			} else {
				sp = 100;
				cpr = cpa;
			}
			
			if(override) {
				ct = 0;
				cpr = 0;
				cpa = 0;
			}

			this.status.seekPercent = sp;
			this.status.currentPercentRelative = cpr;
			this.status.currentPercentAbsolute = cpa;
			this.status.currentTime = ct;

			this.status.remaining = this.status.duration - this.status.currentTime;

			this.status.videoWidth = media.videoWidth;
			this.status.videoHeight = media.videoHeight;

			this.status.readyState = media.readyState;
			this.status.networkState = media.networkState;
			this.status.playbackRate = media.playbackRate;
			this.status.ended = media.ended;
		},
		_getAuroraStatus: function(player, override) {
			var ct = 0, cpa = 0, sp = 0, cpr = 0;

			this.status.duration = player.duration / 1000;

			ct = player.currentTime / 1000;
			cpa = (this.status.duration > 0) ? 100 * ct / this.status.duration : 0;
			if(player.buffered > 0) {
				sp = (this.status.duration > 0) ? (player.buffered * this.status.duration) / this.status.duration : 100;
				cpr = (this.status.duration > 0) ? ct / (player.buffered * this.status.duration) : 0;
			} else {
				sp = 100;
				cpr = cpa;
			}
			
			if(override) {
				ct = 0;
				cpr = 0;
				cpa = 0;
			}

			this.status.seekPercent = sp;
			this.status.currentPercentRelative = cpr;
			this.status.currentPercentAbsolute = cpa;
			this.status.currentTime = ct;

			this.status.remaining = this.status.duration - this.status.currentTime;

			this.status.readyState = 4; // status.readyState;
			this.status.networkState = 0; // status.networkState;
			this.status.playbackRate = 1; // status.playbackRate;
			this.status.ended = false; // status.ended;
		},
		_resetStatus: function() {
			this.status = $.extend({}, this.status, $.jPlayer.prototype.status); // Maintains the status properties that persist through a reset.
		},
		_trigger: function(eventType, error, warning) { // eventType always valid as called using $.jPlayer.event.eventType
			var event = $.Event(eventType);
			event.jPlayer = {};
			event.jPlayer.version = $.extend({}, this.version);
			event.jPlayer.options = $.extend(true, {}, this.options); // Deep copy
			event.jPlayer.status = $.extend(true, {}, this.status); // Deep copy
			event.jPlayer.html = $.extend(true, {}, this.html); // Deep copy
			event.jPlayer.aurora = $.extend(true, {}, this.aurora); // Deep copy
			event.jPlayer.flash = $.extend(true, {}, this.flash); // Deep copy
			if(error) {
				event.jPlayer.error = $.extend({}, error);
			}
			if(warning) {
				event.jPlayer.warning = $.extend({}, warning);
			}
			this.element.trigger(event);
		},
		jPlayerFlashEvent: function(eventType, status) { // Called from Flash
			if(eventType === $.jPlayer.event.ready) {
				if(!this.internal.ready) {
					this.internal.ready = true;
					this.internal.flash.jq.css({'width':'0px', 'height':'0px'}); // Once Flash generates the ready event, minimise to zero as it is not affected by wmode anymore.

					this.version.flash = status.version;
					if(this.version.needFlash !== this.version.flash) {
						this._error( {
							type: $.jPlayer.error.VERSION,
							context: this.version.flash,
							message: $.jPlayer.errorMsg.VERSION + this.version.flash,
							hint: $.jPlayer.errorHint.VERSION
						});
					}
					this._trigger($.jPlayer.event.repeat); // Trigger the repeat event so its handler can initialize itself with the loop option.
					this._trigger(eventType);
				} else {
					// This condition occurs if the Flash is hidden and then shown again.
					// Firefox also reloads the Flash if the CSS position changes. position:fixed is used for full screen.

					// Only do this if the Flash is the solution being used at the moment. Affects Media players where both solution may be being used.
					if(this.flash.gate) {

						// Send the current status to the Flash now that it is ready (available) again.
						if(this.status.srcSet) {

							// Need to read original status before issuing the setMedia command.
							var	currentTime = this.status.currentTime,
								paused = this.status.paused; 

							this.setMedia(this.status.media);
							this.volumeWorker(this.options.volume);
							if(currentTime > 0) {
								if(paused) {
									this.pause(currentTime);
								} else {
									this.play(currentTime);
								}
							}
						}
						this._trigger($.jPlayer.event.flashreset);
					}
				}
			}
			if(this.flash.gate) {
				switch(eventType) {
					case $.jPlayer.event.progress:
						this._getFlashStatus(status);
						this._updateInterface();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.timeupdate:
						this._getFlashStatus(status);
						this._updateInterface();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.play:
						this._seeked();
						this._updateButtons(true);
						this._trigger(eventType);
						break;
					case $.jPlayer.event.pause:
						this._updateButtons(false);
						this._trigger(eventType);
						break;
					case $.jPlayer.event.ended:
						this._updateButtons(false);
						this._trigger(eventType);
						break;
					case $.jPlayer.event.click:
						this._trigger(eventType); // This could be dealt with by the default
						break;
					case $.jPlayer.event.error:
						this.status.waitForLoad = true; // Allows the load operation to try again.
						this.status.waitForPlay = true; // Reset since a play was captured.
						if(this.status.video) {
							this.internal.flash.jq.css({'width':'0px', 'height':'0px'});
						}
						if(this._validString(this.status.media.poster)) {
							this.internal.poster.jq.show();
						}
						if(this.css.jq.videoPlay.length && this.status.video) {
							this.css.jq.videoPlay.show();
						}
						if(this.status.video) { // Set up for another try. Execute before error event.
							this._flash_setVideo(this.status.media);
						} else {
							this._flash_setAudio(this.status.media);
						}
						this._updateButtons(false);
						this._error( {
							type: $.jPlayer.error.URL,
							context:status.src,
							message: $.jPlayer.errorMsg.URL,
							hint: $.jPlayer.errorHint.URL
						});
						break;
					case $.jPlayer.event.seeking:
						this._seeking();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.seeked:
						this._seeked();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.ready:
						// The ready event is handled outside the switch statement.
						// Captured here otherwise 2 ready events would be generated if the ready event handler used setMedia.
						break;
					default:
						this._trigger(eventType);
				}
			}
			return false;
		},
		_getFlashStatus: function(status) {
			this.status.seekPercent = status.seekPercent;
			this.status.currentPercentRelative = status.currentPercentRelative;
			this.status.currentPercentAbsolute = status.currentPercentAbsolute;
			this.status.currentTime = status.currentTime;
			this.status.duration = status.duration;
			this.status.remaining = status.duration - status.currentTime;

			this.status.videoWidth = status.videoWidth;
			this.status.videoHeight = status.videoHeight;

			// The Flash does not generate this information in this release
			this.status.readyState = 4; // status.readyState;
			this.status.networkState = 0; // status.networkState;
			this.status.playbackRate = 1; // status.playbackRate;
			this.status.ended = false; // status.ended;
		},
		_updateButtons: function(playing) {
			if(playing === undefined) {
				playing = !this.status.paused;
			} else {
				this.status.paused = !playing;
			}
			// Apply the state classes. (For the useStateClassSkin:true option)
			if(playing) {
				this.addStateClass('playing');
			} else {
				this.removeStateClass('playing');
			}
			if(!this.status.noFullWindow && this.options.fullWindow) {
				this.addStateClass('fullScreen');
			} else {
				this.removeStateClass('fullScreen');
			}
			if(this.options.loop) {
				this.addStateClass('looped');
			} else {
				this.removeStateClass('looped');
			}
			// Toggle the GUI element pairs. (For the useStateClassSkin:false option)
			if(this.css.jq.play.length && this.css.jq.pause.length) {
				if(playing) {
					this.css.jq.play.hide();
					this.css.jq.pause.show();
				} else {
					this.css.jq.play.show();
					this.css.jq.pause.hide();
				}
			}
			if(this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length) {
				if(this.status.noFullWindow) {
					this.css.jq.fullScreen.hide();
					this.css.jq.restoreScreen.hide();
				} else if(this.options.fullWindow) {
					this.css.jq.fullScreen.hide();
					this.css.jq.restoreScreen.show();
				} else {
					this.css.jq.fullScreen.show();
					this.css.jq.restoreScreen.hide();
				}
			}
			if(this.css.jq.repeat.length && this.css.jq.repeatOff.length) {
				if(this.options.loop) {
					this.css.jq.repeat.hide();
					this.css.jq.repeatOff.show();
				} else {
					this.css.jq.repeat.show();
					this.css.jq.repeatOff.hide();
				}
			}
		},
		_updateInterface: function() {
			if(this.css.jq.seekBar.length) {
				this.css.jq.seekBar.width(this.status.seekPercent+"%");
			}
			if(this.css.jq.playBar.length) {
				if(this.options.smoothPlayBar) {
					this.css.jq.playBar.stop().animate({
						width: this.status.currentPercentAbsolute+"%"
					}, 250, "linear");
				} else {
					this.css.jq.playBar.width(this.status.currentPercentRelative+"%");
				}
			}
			var currentTimeText = '';
			if(this.css.jq.currentTime.length) {
				currentTimeText = this._convertTime(this.status.currentTime);
				if(currentTimeText !== this.css.jq.currentTime.text()) {
					this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));
				}
			}
			var durationText = '',
				duration = this.status.duration,
				remaining = this.status.remaining;
			if(this.css.jq.duration.length) {
				if(typeof this.status.media.duration === 'string') {
					durationText = this.status.media.duration;
				} else {
					if(typeof this.status.media.duration === 'number') {
						duration = this.status.media.duration;
						remaining = duration - this.status.currentTime;
					}
					if(this.options.remainingDuration) {
						durationText = (remaining > 0 ? '-' : '') + this._convertTime(remaining);
					} else {
						durationText = this._convertTime(duration);
					}
				}
				if(durationText !== this.css.jq.duration.text()) {
					this.css.jq.duration.text(durationText);
				}
			}
		},
		_convertTime: ConvertTime.prototype.time,
		_seeking: function() {
			if(this.css.jq.seekBar.length) {
				this.css.jq.seekBar.addClass("jp-seeking-bg");
			}
			this.addStateClass('seeking');
		},
		_seeked: function() {
			if(this.css.jq.seekBar.length) {
				this.css.jq.seekBar.removeClass("jp-seeking-bg");
			}
			this.removeStateClass('seeking');
		},
		_resetGate: function() {
			this.html.audio.gate = false;
			this.html.video.gate = false;
			this.aurora.gate = false;
			this.flash.gate = false;
		},
		_resetActive: function() {
			this.html.active = false;
			this.aurora.active = false;
			this.flash.active = false;
		},
		_escapeHtml: function(s) {
			return s.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
		},
		_qualifyURL: function(url) {
			var el = document.createElement('div');
			el.innerHTML= '<a href="' + this._escapeHtml(url) + '">x</a>';
			return el.firstChild.href;
		},
		_absoluteMediaUrls: function(media) {
			var self = this;
			$.each(media, function(type, url) {
				if(url && self.format[type] && url.substr(0, 5) !== "data:") {
					media[type] = self._qualifyURL(url);
				}
			});
			return media;
		},
		addStateClass: function(state) {
			if(this.ancestorJq.length) {
				this.ancestorJq.addClass(this.options.stateClass[state]);
			}
		},
		removeStateClass: function(state) {
			if(this.ancestorJq.length) {
				this.ancestorJq.removeClass(this.options.stateClass[state]);
			}
		},
		setMedia: function(media) {
		
			/*	media[format] = String: URL of format. Must contain all of the supplied option's video or audio formats.
			 *	media.poster = String: Video poster URL.
			 *	media.track = Array: Of objects defining the track element: kind, src, srclang, label, def.
			 *	media.stream = Boolean: * NOT IMPLEMENTED * Designating actual media streams. ie., "false/undefined" for files. Plan to refresh the flash every so often.
			 */

			var	self = this,
				supported = false,
				posterChanged = this.status.media.poster !== media.poster; // Compare before reset. Important for OSX Safari as this.htmlElement.poster.src is absolute, even if original poster URL was relative.

			this._resetMedia();
			this._resetGate();
			this._resetActive();

			// Clear the Android Fix.
			this.androidFix.setMedia = false;
			this.androidFix.play = false;
			this.androidFix.pause = false;

			// Convert all media URLs to absolute URLs.
			media = this._absoluteMediaUrls(media);

			$.each(this.formats, function(formatPriority, format) {
				var isVideo = self.format[format].media === 'video';
				$.each(self.solutions, function(solutionPriority, solution) {
					if(self[solution].support[format] && self._validString(media[format])) { // Format supported in solution and url given for format.
						var isHtml = solution === 'html';
						var isAurora = solution === 'aurora';

						if(isVideo) {
							if(isHtml) {
								self.html.video.gate = true;
								self._html_setVideo(media);
								self.html.active = true;
							} else {
								self.flash.gate = true;
								self._flash_setVideo(media);
								self.flash.active = true;
							}
							if(self.css.jq.videoPlay.length) {
								self.css.jq.videoPlay.show();
							}
							self.status.video = true;
						} else {
							if(isHtml) {
								self.html.audio.gate = true;
								self._html_setAudio(media);
								self.html.active = true;

								// Setup the Android Fix - Only for HTML audio.
								if($.jPlayer.platform.android) {
									self.androidFix.setMedia = true;
								}
							} else if(isAurora) {
								self.aurora.gate = true;
								self._aurora_setAudio(media);
								self.aurora.active = true;
							} else {
								self.flash.gate = true;
								self._flash_setAudio(media);
								self.flash.active = true;
							}
							if(self.css.jq.videoPlay.length) {
								self.css.jq.videoPlay.hide();
							}
							self.status.video = false;
						}
						
						supported = true;
						return false; // Exit $.each
					}
				});
				if(supported) {
					return false; // Exit $.each
				}
			});

			if(supported) {
				if(!(this.status.nativeVideoControls && this.html.video.gate)) {
					// Set poster IMG if native video controls are not being used
					// Note: With IE the IMG onload event occurs immediately when cached.
					// Note: Poster hidden by default in _resetMedia()
					if(this._validString(media.poster)) {
						if(posterChanged) { // Since some browsers do not generate img onload event.
							this.htmlElement.poster.src = media.poster;
						} else {
							this.internal.poster.jq.show();
						}
					}
				}
				if(typeof media.title === 'string') {
					if(this.css.jq.title.length) {
						this.css.jq.title.html(media.title);
					}
					if(this.htmlElement.audio) {
						this.htmlElement.audio.setAttribute('title', media.title);
					}
					if(this.htmlElement.video) {
						this.htmlElement.video.setAttribute('title', media.title);
					}
				}
				this.status.srcSet = true;
				this.status.media = $.extend({}, media);
				this._updateButtons(false);
				this._updateInterface();
				this._trigger($.jPlayer.event.setmedia);
			} else { // jPlayer cannot support any formats provided in this browser
				// Send an error event
				this._error( {
					type: $.jPlayer.error.NO_SUPPORT,
					context: "{supplied:'" + this.options.supplied + "'}",
					message: $.jPlayer.errorMsg.NO_SUPPORT,
					hint: $.jPlayer.errorHint.NO_SUPPORT
				});
			}
		},
		_resetMedia: function() {
			this._resetStatus();
			this._updateButtons(false);
			this._updateInterface();
			this._seeked();
			this.internal.poster.jq.hide();

			clearTimeout(this.internal.htmlDlyCmdId);

			if(this.html.active) {
				this._html_resetMedia();
			} else if(this.aurora.active) {
				this._aurora_resetMedia();
			} else if(this.flash.active) {
				this._flash_resetMedia();
			}
		},
		clearMedia: function() {
			this._resetMedia();

			if(this.html.active) {
				this._html_clearMedia();
			} else if(this.aurora.active) {
				this._aurora_clearMedia();
			} else if(this.flash.active) {
				this._flash_clearMedia();
			}

			this._resetGate();
			this._resetActive();
		},
		load: function() {
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_load();
				} else if(this.aurora.active) {
					this._aurora_load();
				} else if(this.flash.active) {
					this._flash_load();
				}
			} else {
				this._urlNotSetError("load");
			}
		},
		focus: function() {
			if(this.options.keyEnabled) {
				$.jPlayer.focus = this;
			}
		},
		play: function(time) {
			var guiAction = typeof time === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
			if(guiAction && this.options.useStateClassSkin && !this.status.paused) {
				this.pause(time); // The time would be the click event, but passing it over so info is not lost.
			} else {
				time = (typeof time === "number") ? time : NaN; // Remove jQuery event from click handler
				if(this.status.srcSet) {
					this.focus();
					if(this.html.active) {
						this._html_play(time);
					} else if(this.aurora.active) {
						this._aurora_play(time);
					} else if(this.flash.active) {
						this._flash_play(time);
					}
				} else {
					this._urlNotSetError("play");
				}
			}
		},
		videoPlay: function() { // Handles clicks on the play button over the video poster
			this.play();
		},
		pause: function(time) {
			time = (typeof time === "number") ? time : NaN; // Remove jQuery event from click handler
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_pause(time);
				} else if(this.aurora.active) {
					this._aurora_pause(time);
				} else if(this.flash.active) {
					this._flash_pause(time);
				}
			} else {
				this._urlNotSetError("pause");
			}
		},
		tellOthers: function(command, conditions) {
			var self = this,
				hasConditions = typeof conditions === 'function',
				args = Array.prototype.slice.call(arguments); // Convert arguments to an Array.

			if(typeof command !== 'string') { // Ignore, since no command.
				return; // Return undefined to maintain chaining.
			}
			if(hasConditions) {
				args.splice(1, 1); // Remove the conditions from the arguments
			}

			$.jPlayer.prototype.destroyRemoved();
			$.each(this.instances, function() {
				// Remember that "this" is the instance's "element" in the $.each() loop.
				if(self.element !== this) { // Do not tell my instance.
					if(!hasConditions || conditions.call(this.data("jPlayer"), self)) {
						this.jPlayer.apply(this, args);
					}
				}
			});
		},
		pauseOthers: function(time) {
			this.tellOthers("pause", function() {
				// In the conditions function, the "this" context is the other instance's jPlayer object.
				return this.status.srcSet;
			}, time);
		},
		stop: function() {
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_pause(0);
				} else if(this.aurora.active) {
					this._aurora_pause(0);
				} else if(this.flash.active) {
					this._flash_pause(0);
				}
			} else {
				this._urlNotSetError("stop");
			}
		},
		playHead: function(p) {
			p = this._limitValue(p, 0, 100);
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_playHead(p);
				} else if(this.aurora.active) {
					this._aurora_playHead(p);
				} else if(this.flash.active) {
					this._flash_playHead(p);
				}
			} else {
				this._urlNotSetError("playHead");
			}
		},
		_muted: function(muted) {
			this.mutedWorker(muted);
			if(this.options.globalVolume) {
				this.tellOthers("mutedWorker", function() {
					// Check the other instance has global volume enabled.
					return this.options.globalVolume;
				}, muted);
			}
		},
		mutedWorker: function(muted) {
			this.options.muted = muted;
			if(this.html.used) {
				this._html_setProperty('muted', muted);
			}
			if(this.aurora.used) {
				this._aurora_mute(muted);
			}
			if(this.flash.used) {
				this._flash_mute(muted);
			}

			// The HTML solution generates this event from the media element itself.
			if(!this.html.video.gate && !this.html.audio.gate) {
				this._updateMute(muted);
				this._updateVolume(this.options.volume);
				this._trigger($.jPlayer.event.volumechange);
			}
		},
		mute: function(mute) { // mute is either: undefined (true), an event object (true) or a boolean (muted).
			var guiAction = typeof mute === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
			if(guiAction && this.options.useStateClassSkin && this.options.muted) {
				this._muted(false);
			} else {
				mute = mute === undefined ? true : !!mute;
				this._muted(mute);
			}
		},
		unmute: function(unmute) { // unmute is either: undefined (true), an event object (true) or a boolean (!muted).
			unmute = unmute === undefined ? true : !!unmute;
			this._muted(!unmute);
		},
		_updateMute: function(mute) {
			if(mute === undefined) {
				mute = this.options.muted;
			}
			if(mute) {
				this.addStateClass('muted');
			} else {
				this.removeStateClass('muted');
			}
			if(this.css.jq.mute.length && this.css.jq.unmute.length) {
				if(this.status.noVolume) {
					this.css.jq.mute.hide();
					this.css.jq.unmute.hide();
				} else if(mute) {
					this.css.jq.mute.hide();
					this.css.jq.unmute.show();
				} else {
					this.css.jq.mute.show();
					this.css.jq.unmute.hide();
				}
			}
		},
		volume: function(v) {
			this.volumeWorker(v);
			if(this.options.globalVolume) {
				this.tellOthers("volumeWorker", function() {
					// Check the other instance has global volume enabled.
					return this.options.globalVolume;
				}, v);
			}
		},
		volumeWorker: function(v) {
			v = this._limitValue(v, 0, 1);
			this.options.volume = v;

			if(this.html.used) {
				this._html_setProperty('volume', v);
			}
			if(this.aurora.used) {
				this._aurora_volume(v);
			}
			if(this.flash.used) {
				this._flash_volume(v);
			}

			// The HTML solution generates this event from the media element itself.
			if(!this.html.video.gate && !this.html.audio.gate) {
				this._updateVolume(v);
				this._trigger($.jPlayer.event.volumechange);
			}
		},
		volumeBar: function(e) { // Handles clicks on the volumeBar
			if(this.css.jq.volumeBar.length) {
				// Using $(e.currentTarget) to enable multiple volume bars
				var $bar = $(e.currentTarget),
					offset = $bar.offset(),
					x = e.pageX - offset.left,
					w = $bar.width(),
					y = $bar.height() - e.pageY + offset.top,
					h = $bar.height();
				if(this.options.verticalVolume) {
					this.volume(y/h);
				} else {
					this.volume(x/w);
				}
			}
			if(this.options.muted) {
				this._muted(false);
			}
		},
		_updateVolume: function(v) {
			if(v === undefined) {
				v = this.options.volume;
			}
			v = this.options.muted ? 0 : v;

			if(this.status.noVolume) {
				this.addStateClass('noVolume');
				if(this.css.jq.volumeBar.length) {
					this.css.jq.volumeBar.hide();
				}
				if(this.css.jq.volumeBarValue.length) {
					this.css.jq.volumeBarValue.hide();
				}
				if(this.css.jq.volumeMax.length) {
					this.css.jq.volumeMax.hide();
				}
			} else {
				this.removeStateClass('noVolume');
				if(this.css.jq.volumeBar.length) {
					this.css.jq.volumeBar.show();
				}
				if(this.css.jq.volumeBarValue.length) {
					this.css.jq.volumeBarValue.show();
					this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"]((v*100)+"%");
				}
				if(this.css.jq.volumeMax.length) {
					this.css.jq.volumeMax.show();
				}
			}
		},
		volumeMax: function() { // Handles clicks on the volume max
			this.volume(1);
			if(this.options.muted) {
				this._muted(false);
			}
		},
		_cssSelectorAncestor: function(ancestor) {
			var self = this;
			this.options.cssSelectorAncestor = ancestor;
			this._removeUiClass();
			this.ancestorJq = ancestor ? $(ancestor) : []; // Would use $() instead of [], but it is only 1.4+
			if(ancestor && this.ancestorJq.length !== 1) { // So empty strings do not generate the warning.
				this._warning( {
					type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
					context: ancestor,
					message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
					hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
				});
			}
			this._addUiClass();
			$.each(this.options.cssSelector, function(fn, cssSel) {
				self._cssSelector(fn, cssSel);
			});

			// Set the GUI to the current state.
			this._updateInterface();
			this._updateButtons();
			this._updateAutohide();
			this._updateVolume();
			this._updateMute();
		},
		_cssSelector: function(fn, cssSel) {
			var self = this;
			if(typeof cssSel === 'string') {
				if($.jPlayer.prototype.options.cssSelector[fn]) {
					if(this.css.jq[fn] && this.css.jq[fn].length) {
						this.css.jq[fn].unbind(".jPlayer");
					}
					this.options.cssSelector[fn] = cssSel;
					this.css.cs[fn] = this.options.cssSelectorAncestor + " " + cssSel;

					if(cssSel) { // Checks for empty string
						this.css.jq[fn] = $(this.css.cs[fn]);
					} else {
						this.css.jq[fn] = []; // To comply with the css.jq[fn].length check before its use. As of jQuery 1.4 could have used $() for an empty set. 
					}

					if(this.css.jq[fn].length && this[fn]) {
						var handler = function(e) {
							e.preventDefault();
							self[fn](e);
							if(self.options.autoBlur) {
								$(this).blur();
							} else {
								$(this).focus(); // Force focus for ARIA.
							}
						};
						this.css.jq[fn].bind("click.jPlayer", handler); // Using jPlayer namespace
					}

					if(cssSel && this.css.jq[fn].length !== 1) { // So empty strings do not generate the warning. ie., they just remove the old one.
						this._warning( {
							type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
							context: this.css.cs[fn],
							message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[fn].length + " found for " + fn + " method.",
							hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
						});
					}
				} else {
					this._warning( {
						type: $.jPlayer.warning.CSS_SELECTOR_METHOD,
						context: fn,
						message: $.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
						hint: $.jPlayer.warningHint.CSS_SELECTOR_METHOD
					});
				}
			} else {
				this._warning( {
					type: $.jPlayer.warning.CSS_SELECTOR_STRING,
					context: cssSel,
					message: $.jPlayer.warningMsg.CSS_SELECTOR_STRING,
					hint: $.jPlayer.warningHint.CSS_SELECTOR_STRING
				});
			}
		},
		duration: function(e) {
			if(this.options.toggleDuration) {
				if(this.options.captureDuration) {
					e.stopPropagation();
				}
				this._setOption("remainingDuration", !this.options.remainingDuration);
			}
		},
		seekBar: function(e) { // Handles clicks on the seekBar
			if(this.css.jq.seekBar.length) {
				// Using $(e.currentTarget) to enable multiple seek bars
				var $bar = $(e.currentTarget),
					offset = $bar.offset(),
					x = e.pageX - offset.left,
					w = $bar.width(),
					p = 100 * x / w;
				this.playHead(p);
			}
		},
		playbackRate: function(pbr) {
			this._setOption("playbackRate", pbr);
		},
		playbackRateBar: function(e) { // Handles clicks on the playbackRateBar
			if(this.css.jq.playbackRateBar.length) {
				// Using $(e.currentTarget) to enable multiple playbackRate bars
				var $bar = $(e.currentTarget),
					offset = $bar.offset(),
					x = e.pageX - offset.left,
					w = $bar.width(),
					y = $bar.height() - e.pageY + offset.top,
					h = $bar.height(),
					ratio, pbr;
				if(this.options.verticalPlaybackRate) {
					ratio = y/h;
				} else {
					ratio = x/w;
				}
				pbr = ratio * (this.options.maxPlaybackRate - this.options.minPlaybackRate) + this.options.minPlaybackRate;
				this.playbackRate(pbr);
			}
		},
		_updatePlaybackRate: function() {
			var pbr = this.options.playbackRate,
				ratio = (pbr - this.options.minPlaybackRate) / (this.options.maxPlaybackRate - this.options.minPlaybackRate);
			if(this.status.playbackRateEnabled) {
				if(this.css.jq.playbackRateBar.length) {
					this.css.jq.playbackRateBar.show();
				}
				if(this.css.jq.playbackRateBarValue.length) {
					this.css.jq.playbackRateBarValue.show();
					this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate ? "height" : "width"]((ratio*100)+"%");
				}
			} else {
				if(this.css.jq.playbackRateBar.length) {
					this.css.jq.playbackRateBar.hide();
				}
				if(this.css.jq.playbackRateBarValue.length) {
					this.css.jq.playbackRateBarValue.hide();
				}
			}
		},
		repeat: function(event) { // Handle clicks on the repeat button
			var guiAction = typeof event === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
			if(guiAction && this.options.useStateClassSkin && this.options.loop) {
				this._loop(false);
			} else {
				this._loop(true);
			}
		},
		repeatOff: function() { // Handle clicks on the repeatOff button
			this._loop(false);
		},
		_loop: function(loop) {
			if(this.options.loop !== loop) {
				this.options.loop = loop;
				this._updateButtons();
				this._trigger($.jPlayer.event.repeat);
			}
		},

		// Options code adapted from ui.widget.js (1.8.7).  Made changes so the key can use dot notation. To match previous getData solution in jPlayer 1.
		option: function(key, value) {
			var options = key;

			 // Enables use: options().  Returns a copy of options object
			if ( arguments.length === 0 ) {
				return $.extend( true, {}, this.options );
			}

			if(typeof key === "string") {
				var keys = key.split(".");

				 // Enables use: options("someOption")  Returns a copy of the option. Supports dot notation.
				if(value === undefined) {

					var opt = $.extend(true, {}, this.options);
					for(var i = 0; i < keys.length; i++) {
						if(opt[keys[i]] !== undefined) {
							opt = opt[keys[i]];
						} else {
							this._warning( {
								type: $.jPlayer.warning.OPTION_KEY,
								context: key,
								message: $.jPlayer.warningMsg.OPTION_KEY,
								hint: $.jPlayer.warningHint.OPTION_KEY
							});
							return undefined;
						}
					}
					return opt;
				}

				 // Enables use: options("someOptionObject", someObject}).  Creates: {someOptionObject:someObject}
				 // Enables use: options("someOption", someValue).  Creates: {someOption:someValue}
				 // Enables use: options("someOptionObject.someOption", someValue).  Creates: {someOptionObject:{someOption:someValue}}

				options = {};
				var opts = options;

				for(var j = 0; j < keys.length; j++) {
					if(j < keys.length - 1) {
						opts[keys[j]] = {};
						opts = opts[keys[j]];
					} else {
						opts[keys[j]] = value;
					}
				}
			}

			 // Otherwise enables use: options(optionObject).  Uses original object (the key)

			this._setOptions(options);

			return this;
		},
		_setOptions: function(options) {
			var self = this;
			$.each(options, function(key, value) { // This supports the 2 level depth that the options of jPlayer has. Would review if we ever need more depth.
				self._setOption(key, value);
			});

			return this;
		},
		_setOption: function(key, value) {
			var self = this;

			// The ability to set options is limited at this time.

			switch(key) {
				case "volume" :
					this.volume(value);
					break;
				case "muted" :
					this._muted(value);
					break;
				case "globalVolume" :
					this.options[key] = value;
					break;
				case "cssSelectorAncestor" :
					this._cssSelectorAncestor(value); // Set and refresh all associations for the new ancestor.
					break;
				case "cssSelector" :
					$.each(value, function(fn, cssSel) {
						self._cssSelector(fn, cssSel); // NB: The option is set inside this function, after further validity checks.
					});
					break;
				case "playbackRate" :
					this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate);
					if(this.html.used) {
						this._html_setProperty('playbackRate', value);
					}
					this._updatePlaybackRate();
					break;
				case "defaultPlaybackRate" :
					this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate);
					if(this.html.used) {
						this._html_setProperty('defaultPlaybackRate', value);
					}
					this._updatePlaybackRate();
					break;
				case "minPlaybackRate" :
					this.options[key] = value = this._limitValue(value, 0.1, this.options.maxPlaybackRate - 0.1);
					this._updatePlaybackRate();
					break;
				case "maxPlaybackRate" :
					this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate + 0.1, 16);
					this._updatePlaybackRate();
					break;
				case "fullScreen" :
					if(this.options[key] !== value) { // if changed
						var wkv = $.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
						if(!wkv || wkv && !this.status.waitForPlay) {
							if(!wkv) { // No sensible way to unset option on these devices.
								this.options[key] = value;
							}
							if(value) {
								this._requestFullscreen();
							} else {
								this._exitFullscreen();
							}
							if(!wkv) {
								this._setOption("fullWindow", value);
							}
						}
					}
					break;
				case "fullWindow" :
					if(this.options[key] !== value) { // if changed
						this._removeUiClass();
						this.options[key] = value;
						this._refreshSize();
					}
					break;
				case "size" :
					if(!this.options.fullWindow && this.options[key].cssClass !== value.cssClass) {
						this._removeUiClass();
					}
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this._refreshSize();
					break;
				case "sizeFull" :
					if(this.options.fullWindow && this.options[key].cssClass !== value.cssClass) {
						this._removeUiClass();
					}
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this._refreshSize();
					break;
				case "autohide" :
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this._updateAutohide();
					break;
				case "loop" :
					this._loop(value);
					break;
				case "remainingDuration" :
					this.options[key] = value;
					this._updateInterface();
					break;
				case "toggleDuration" :
					this.options[key] = value;
					break;
				case "nativeVideoControls" :
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
					this._restrictNativeVideoControls();
					this._updateNativeVideoControls();
					break;
				case "noFullWindow" :
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls); // Need to check again as noFullWindow can depend on this flag and the restrict() can override it.
					this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
					this._restrictNativeVideoControls();
					this._updateButtons();
					break;
				case "noVolume" :
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					this.status.noVolume = this._uaBlocklist(this.options.noVolume);
					this._updateVolume();
					this._updateMute();
					break;
				case "emulateHtml" :
					if(this.options[key] !== value) { // To avoid multiple event handlers being created, if true already.
						this.options[key] = value;
						if(value) {
							this._emulateHtmlBridge();
						} else {
							this._destroyHtmlBridge();
						}
					}
					break;
				case "timeFormat" :
					this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
					break;
				case "keyEnabled" :
					this.options[key] = value;
					if(!value && this === $.jPlayer.focus) {
						$.jPlayer.focus = null;
					}
					break;
				case "keyBindings" :
					this.options[key] = $.extend(true, {}, this.options[key], value); // store a merged DEEP copy of it, incase not all properties changed.
					break;
				case "audioFullScreen" :
					this.options[key] = value;
					break;
				case "autoBlur" :
					this.options[key] = value;
					break;
			}

			return this;
		},
		// End of: (Options code adapted from ui.widget.js)

		_refreshSize: function() {
			this._setSize(); // update status and jPlayer element size
			this._addUiClass(); // update the ui class
			this._updateSize(); // update internal sizes
			this._updateButtons();
			this._updateAutohide();
			this._trigger($.jPlayer.event.resize);
		},
		_setSize: function() {
			// Determine the current size from the options
			if(this.options.fullWindow) {
				this.status.width = this.options.sizeFull.width;
				this.status.height = this.options.sizeFull.height;
				this.status.cssClass = this.options.sizeFull.cssClass;
			} else {
				this.status.width = this.options.size.width;
				this.status.height = this.options.size.height;
				this.status.cssClass = this.options.size.cssClass;
			}

			// Set the size of the jPlayer area.
			this.element.css({'width': this.status.width, 'height': this.status.height});
		},
		_addUiClass: function() {
			if(this.ancestorJq.length) {
				this.ancestorJq.addClass(this.status.cssClass);
			}
		},
		_removeUiClass: function() {
			if(this.ancestorJq.length) {
				this.ancestorJq.removeClass(this.status.cssClass);
			}
		},
		_updateSize: function() {
			// The poster uses show/hide so can simply resize it.
			this.internal.poster.jq.css({'width': this.status.width, 'height': this.status.height});

			// Video html or flash resized if necessary at this time, or if native video controls being used.
			if(!this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls) {
				this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
			}
			else if(!this.status.waitForPlay && this.flash.active && this.status.video) {
				this.internal.flash.jq.css({'width': this.status.width, 'height': this.status.height});
			}
		},
		_updateAutohide: function() {
			var	self = this,
				event = "mousemove.jPlayer",
				namespace = ".jPlayerAutohide",
				eventType = event + namespace,
				handler = function(event) {
					var moved = false,
						deltaX, deltaY;
					if(typeof self.internal.mouse !== "undefined") {
						//get the change from last position to this position
						deltaX = self.internal.mouse.x - event.pageX;
						deltaY = self.internal.mouse.y - event.pageY;
						moved = (Math.floor(deltaX) > 0) || (Math.floor(deltaY)>0); 
					} else {
						moved = true;
					}
					// store current position for next method execution
					self.internal.mouse = {
							x : event.pageX,
							y : event.pageY
					};
					// if mouse has been actually moved, do the gui fadeIn/fadeOut
					if (moved) {
						self.css.jq.gui.fadeIn(self.options.autohide.fadeIn, function() {
							clearTimeout(self.internal.autohideId);
							self.internal.autohideId = setTimeout( function() {
								self.css.jq.gui.fadeOut(self.options.autohide.fadeOut);
							}, self.options.autohide.hold);
						});
					}
				};

			if(this.css.jq.gui.length) {

				// End animations first so that its callback is executed now.
				// Otherwise an in progress fadeIn animation still has the callback to fadeOut again.
				this.css.jq.gui.stop(true, true);

				// Removes the fadeOut operation from the fadeIn callback.
				clearTimeout(this.internal.autohideId);
				// undefine mouse
				delete this.internal.mouse;

				this.element.unbind(namespace);
				this.css.jq.gui.unbind(namespace);

				if(!this.status.nativeVideoControls) {
					if(this.options.fullWindow && this.options.autohide.full || !this.options.fullWindow && this.options.autohide.restored) {
						this.element.bind(eventType, handler);
						this.css.jq.gui.bind(eventType, handler);
						this.css.jq.gui.hide();
					} else {
						this.css.jq.gui.show();
					}
				} else {
					this.css.jq.gui.hide();
				}
			}
		},
		fullScreen: function(event) {
			var guiAction = typeof event === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
			if(guiAction && this.options.useStateClassSkin && this.options.fullScreen) {
				this._setOption("fullScreen", false);
			} else {
				this._setOption("fullScreen", true);
			}
		},
		restoreScreen: function() {
			this._setOption("fullScreen", false);
		},
		_fullscreenAddEventListeners: function() {
			var self = this,
				fs = $.jPlayer.nativeFeatures.fullscreen;

			if(fs.api.fullscreenEnabled) {
				if(fs.event.fullscreenchange) {
					// Create the event handler function and store it for removal.
					if(typeof this.internal.fullscreenchangeHandler !== 'function') {
						this.internal.fullscreenchangeHandler = function() {
							self._fullscreenchange();
						};
					}
					document.addEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, false);
				}
				// No point creating handler for fullscreenerror.
				// Either logic avoids fullscreen occurring (w3c/moz), or their is no event on the browser (webkit).
			}
		},
		_fullscreenRemoveEventListeners: function() {
			var fs = $.jPlayer.nativeFeatures.fullscreen;
			if(this.internal.fullscreenchangeHandler) {
				document.removeEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, false);
			}
		},
		_fullscreenchange: function() {
			// If nothing is fullscreen, then we cannot be in fullscreen mode.
			if(this.options.fullScreen && !$.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement()) {
				this._setOption("fullScreen", false);
			}
		},
		_requestFullscreen: function() {
			// Either the container or the jPlayer div
			var e = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0],
				fs = $.jPlayer.nativeFeatures.fullscreen;

			// This method needs the video element. For iOS and Android.
			if(fs.used.webkitVideo) {
				e = this.htmlElement.video;
			}

			if(fs.api.fullscreenEnabled) {
				fs.api.requestFullscreen(e);
			}
		},
		_exitFullscreen: function() {

			var fs = $.jPlayer.nativeFeatures.fullscreen,
				e;

			// This method needs the video element. For iOS and Android.
			if(fs.used.webkitVideo) {
				e = this.htmlElement.video;
			}

			if(fs.api.fullscreenEnabled) {
				fs.api.exitFullscreen(e);
			}
		},
		_html_initMedia: function(media) {
			// Remove any existing track elements
			var $media = $(this.htmlElement.media).empty();

			// Create any track elements given with the media, as an Array of track Objects.
			$.each(media.track || [], function(i,v) {
				var track = document.createElement('track');
				track.setAttribute("kind", v.kind ? v.kind : "");
				track.setAttribute("src", v.src ? v.src : "");
				track.setAttribute("srclang", v.srclang ? v.srclang : "");
				track.setAttribute("label", v.label ? v.label : "");
				if(v.def) {
					track.setAttribute("default", v.def);
				}
				$media.append(track);
			});

			this.htmlElement.media.src = this.status.src;

			if(this.options.preload !== 'none') {
				this._html_load(); // See function for comments
			}
			this._trigger($.jPlayer.event.timeupdate); // The flash generates this event for its solution.
		},
		_html_setFormat: function(media) {
			var self = this;
			// Always finds a format due to checks in setMedia()
			$.each(this.formats, function(priority, format) {
				if(self.html.support[format] && media[format]) {
					self.status.src = media[format];
					self.status.format[format] = true;
					self.status.formatType = format;
					return false;
				}
			});
		},
		_html_setAudio: function(media) {
			this._html_setFormat(media);
			this.htmlElement.media = this.htmlElement.audio;
			this._html_initMedia(media);
		},
		_html_setVideo: function(media) {
			this._html_setFormat(media);
			if(this.status.nativeVideoControls) {
				this.htmlElement.video.poster = this._validString(media.poster) ? media.poster : "";
			}
			this.htmlElement.media = this.htmlElement.video;
			this._html_initMedia(media);
		},
		_html_resetMedia: function() {
			if(this.htmlElement.media) {
				if(this.htmlElement.media.id === this.internal.video.id && !this.status.nativeVideoControls) {
					this.internal.video.jq.css({'width':'0px', 'height':'0px'});
				}
				this.htmlElement.media.pause();
			}
		},
		_html_clearMedia: function() {
			if(this.htmlElement.media) {
				this.htmlElement.media.src = "about:blank";
				// The following load() is only required for Firefox 3.6 (PowerMacs).
				// Recent HTMl5 browsers only require the src change. Due to changes in W3C spec and load() effect.
				this.htmlElement.media.load(); // Stops an old, "in progress" download from continuing the download. Triggers the loadstart, error and emptied events, due to the empty src. Also an abort event if a download was in progress.
			}
		},
		_html_load: function() {
			// This function remains to allow the early HTML5 browsers to work, such as Firefox 3.6
			// A change in the W3C spec for the media.load() command means that this is no longer necessary.
			// This command should be removed and actually causes minor undesirable effects on some browsers. Such as loading the whole file and not only the metadata.
			if(this.status.waitForLoad) {
				this.status.waitForLoad = false;
				this.htmlElement.media.load();
			}
			clearTimeout(this.internal.htmlDlyCmdId);
		},
		_html_play: function(time) {
			var self = this,
				media = this.htmlElement.media;

			this.androidFix.pause = false; // Cancel the pause fix.

			this._html_load(); // Loads if required and clears any delayed commands.

			// Setup the Android Fix.
			if(this.androidFix.setMedia) {
				this.androidFix.play = true;
				this.androidFix.time = time;

			} else if(!isNaN(time)) {

				// Attempt to play it, since iOS has been ignoring commands
				if(this.internal.cmdsIgnored) {
					media.play();
				}

				try {
					// !media.seekable is for old HTML5 browsers, like Firefox 3.6.
					// Checking seekable.length is important for iOS6 to work with setMedia().play(time)
					if(!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) {
						media.currentTime = time;
						media.play();
					} else {
						throw 1;
					}
				} catch(err) {
					this.internal.htmlDlyCmdId = setTimeout(function() {
						self.play(time);
					}, 250);
					return; // Cancel execution and wait for the delayed command.
				}
			} else {
				media.play();
			}
			this._html_checkWaitForPlay();
		},
		_html_pause: function(time) {
			var self = this,
				media = this.htmlElement.media;

			this.androidFix.play = false; // Cancel the play fix.

			if(time > 0) { // We do not want the stop() command, which does pause(0), causing a load operation.
				this._html_load(); // Loads if required and clears any delayed commands.
			} else {
				clearTimeout(this.internal.htmlDlyCmdId);
			}

			// Order of these commands is important for Safari (Win) and IE9. Pause then change currentTime.
			media.pause();

			// Setup the Android Fix.
			if(this.androidFix.setMedia) {
				this.androidFix.pause = true;
				this.androidFix.time = time;

			} else if(!isNaN(time)) {
				try {
					if(!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) {
						media.currentTime = time;
					} else {
						throw 1;
					}
				} catch(err) {
					this.internal.htmlDlyCmdId = setTimeout(function() {
						self.pause(time);
					}, 250);
					return; // Cancel execution and wait for the delayed command.
				}
			}
			if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
				this._html_checkWaitForPlay();
			}
		},
		_html_playHead: function(percent) {
			var self = this,
				media = this.htmlElement.media;

			this._html_load(); // Loads if required and clears any delayed commands.

			// This playHead() method needs a refactor to apply the android fix.

			try {
				if(typeof media.seekable === "object" && media.seekable.length > 0) {
					media.currentTime = percent * media.seekable.end(media.seekable.length-1) / 100;
				} else if(media.duration > 0 && !isNaN(media.duration)) {
					media.currentTime = percent * media.duration / 100;
				} else {
					throw "e";
				}
			} catch(err) {
				this.internal.htmlDlyCmdId = setTimeout(function() {
					self.playHead(percent);
				}, 250);
				return; // Cancel execution and wait for the delayed command.
			}
			if(!this.status.waitForLoad) {
				this._html_checkWaitForPlay();
			}
		},
		_html_checkWaitForPlay: function() {
			if(this.status.waitForPlay) {
				this.status.waitForPlay = false;
				if(this.css.jq.videoPlay.length) {
					this.css.jq.videoPlay.hide();
				}
				if(this.status.video) {
					this.internal.poster.jq.hide();
					this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
				}
			}
		},
		_html_setProperty: function(property, value) {
			if(this.html.audio.available) {
				this.htmlElement.audio[property] = value;
			}
			if(this.html.video.available) {
				this.htmlElement.video[property] = value;
			}
		},
		_aurora_setAudio: function(media) {
			var self = this;            
			
			// Always finds a format due to checks in setMedia()
			$.each(this.formats, function(priority, format) {
				if(self.aurora.support[format] && media[format]) {
					self.status.src = media[format];
					self.status.format[format] = true;
					self.status.formatType = format;
			
					return false;
				}
			});
			
			this.aurora.player = new AV.Player.fromURL(this.status.src);
			this._addAuroraEventListeners(this.aurora.player, this.aurora);

			if(this.options.preload === 'auto') {
				this._aurora_load();
				this.status.waitForLoad = false;
			}
		},
		_aurora_resetMedia: function() {
			if (this.aurora.player) {
				this.aurora.player.stop();
			}
		},
		_aurora_clearMedia: function() {
			// Nothing to clear.
		},
		_aurora_load: function() {
			if(this.status.waitForLoad) {
				this.status.waitForLoad = false;
				this.aurora.player.preload();
			}
		},
		_aurora_play: function(time) {
			if (!this.status.waitForLoad) {
				if (!isNaN(time)) {
					this.aurora.player.seek(time);
				}
			}
			if (!this.aurora.player.playing) {
				this.aurora.player.play();
			}
			this.status.waitForLoad = false;
			this._aurora_checkWaitForPlay();
			
			// No event from the player, update UI now.
			this._updateButtons(true);
			this._trigger($.jPlayer.event.play);
		},
		_aurora_pause: function(time) {
			if (!isNaN(time)) {
				this.aurora.player.seek(time * 1000);
			}
			this.aurora.player.pause();
			
			if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
				this._aurora_checkWaitForPlay();
			}
			
			// No event from the player, update UI now.
			this._updateButtons(false);
			this._trigger($.jPlayer.event.pause);
		},
		_aurora_playHead: function(percent) {
			if(this.aurora.player.duration > 0) {
				// The seek() sould be in milliseconds, but the only codec that works with seek (aac.js) uses seconds.
				this.aurora.player.seek(percent * this.aurora.player.duration / 100); // Using seconds
			}
				
			if(!this.status.waitForLoad) {
				this._aurora_checkWaitForPlay();
			}
		},
		_aurora_checkWaitForPlay: function() {
			if(this.status.waitForPlay) {
				this.status.waitForPlay = false;
			}
		},
		_aurora_volume: function(v) {
			this.aurora.player.volume = v * 100;
		},
		_aurora_mute: function(m) {
			if (m) {
				this.aurora.properties.lastvolume = this.aurora.player.volume;
				this.aurora.player.volume = 0;
			} else {
				this.aurora.player.volume = this.aurora.properties.lastvolume;
			}
			this.aurora.properties.muted = m;
		},
		_flash_setAudio: function(media) {
			var self = this;
			try {
				// Always finds a format due to checks in setMedia()
				$.each(this.formats, function(priority, format) {
					if(self.flash.support[format] && media[format]) {
						switch (format) {
							case "m4a" :
							case "fla" :
								self._getMovie().fl_setAudio_m4a(media[format]);
								break;
							case "mp3" :
								self._getMovie().fl_setAudio_mp3(media[format]);
								break;
							case "rtmpa":
								self._getMovie().fl_setAudio_rtmp(media[format]);
								break;
						}
						self.status.src = media[format];
						self.status.format[format] = true;
						self.status.formatType = format;
						return false;
					}
				});

				if(this.options.preload === 'auto') {
					this._flash_load();
					this.status.waitForLoad = false;
				}
			} catch(err) { this._flashError(err); }
		},
		_flash_setVideo: function(media) {
			var self = this;
			try {
				// Always finds a format due to checks in setMedia()
				$.each(this.formats, function(priority, format) {
					if(self.flash.support[format] && media[format]) {
						switch (format) {
							case "m4v" :
							case "flv" :
								self._getMovie().fl_setVideo_m4v(media[format]);
								break;
							case "rtmpv":
								self._getMovie().fl_setVideo_rtmp(media[format]);
								break;		
						}
						self.status.src = media[format];
						self.status.format[format] = true;
						self.status.formatType = format;
						return false;
					}
				});

				if(this.options.preload === 'auto') {
					this._flash_load();
					this.status.waitForLoad = false;
				}
			} catch(err) { this._flashError(err); }
		},
		_flash_resetMedia: function() {
			this.internal.flash.jq.css({'width':'0px', 'height':'0px'}); // Must do via CSS as setting attr() to zero causes a jQuery error in IE.
			this._flash_pause(NaN);
		},
		_flash_clearMedia: function() {
			try {
				this._getMovie().fl_clearMedia();
			} catch(err) { this._flashError(err); }
		},
		_flash_load: function() {
			try {
				this._getMovie().fl_load();
			} catch(err) { this._flashError(err); }
			this.status.waitForLoad = false;
		},
		_flash_play: function(time) {
			try {
				this._getMovie().fl_play(time);
			} catch(err) { this._flashError(err); }
			this.status.waitForLoad = false;
			this._flash_checkWaitForPlay();
		},
		_flash_pause: function(time) {
			try {
				this._getMovie().fl_pause(time);
			} catch(err) { this._flashError(err); }
			if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
				this.status.waitForLoad = false;
				this._flash_checkWaitForPlay();
			}
		},
		_flash_playHead: function(p) {
			try {
				this._getMovie().fl_play_head(p);
			} catch(err) { this._flashError(err); }
			if(!this.status.waitForLoad) {
				this._flash_checkWaitForPlay();
			}
		},
		_flash_checkWaitForPlay: function() {
			if(this.status.waitForPlay) {
				this.status.waitForPlay = false;
				if(this.css.jq.videoPlay.length) {
					this.css.jq.videoPlay.hide();
				}
				if(this.status.video) {
					this.internal.poster.jq.hide();
					this.internal.flash.jq.css({'width': this.status.width, 'height': this.status.height});
				}
			}
		},
		_flash_volume: function(v) {
			try {
				this._getMovie().fl_volume(v);
			} catch(err) { this._flashError(err); }
		},
		_flash_mute: function(m) {
			try {
				this._getMovie().fl_mute(m);
			} catch(err) { this._flashError(err); }
		},
		_getMovie: function() {
			return document[this.internal.flash.id];
		},
		_getFlashPluginVersion: function() {

			// _getFlashPluginVersion() code influenced by:
			// - FlashReplace 1.01: http://code.google.com/p/flashreplace/
			// - SWFObject 2.2: http://code.google.com/p/swfobject/

			var version = 0,
				flash;
			if(window.ActiveXObject) {
				try {
					flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					if (flash) { // flash will return null when ActiveX is disabled
						var v = flash.GetVariable("$version");
						if(v) {
							v = v.split(" ")[1].split(",");
							version = parseInt(v[0], 10) + "." + parseInt(v[1], 10);
						}
					}
				} catch(e) {}
			}
			else if(navigator.plugins && navigator.mimeTypes.length > 0) {
				flash = navigator.plugins["Shockwave Flash"];
				if(flash) {
					version = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1");
				}
			}
			return version * 1; // Converts to a number
		},
		_checkForFlash: function (version) {
			var flashOk = false;
			if(this._getFlashPluginVersion() >= version) {
				flashOk = true;
			}
			return flashOk;
		},
		_validString: function(url) {
			return (url && typeof url === "string"); // Empty strings return false
		},
		_limitValue: function(value, min, max) {
			return (value < min) ? min : ((value > max) ? max : value);
		},
		_urlNotSetError: function(context) {
			this._error( {
				type: $.jPlayer.error.URL_NOT_SET,
				context: context,
				message: $.jPlayer.errorMsg.URL_NOT_SET,
				hint: $.jPlayer.errorHint.URL_NOT_SET
			});
		},
		_flashError: function(error) {
			var errorType;
			if(!this.internal.ready) {
				errorType = "FLASH";
			} else {
				errorType = "FLASH_DISABLED";
			}
			this._error( {
				type: $.jPlayer.error[errorType],
				context: this.internal.flash.swf,
				message: $.jPlayer.errorMsg[errorType] + error.message,
				hint: $.jPlayer.errorHint[errorType]
			});
			// Allow the audio player to recover if display:none and then shown again, or with position:fixed on Firefox.
			// This really only affects audio in a media player, as an audio player could easily move the jPlayer element away from such issues.
			this.internal.flash.jq.css({'width':'1px', 'height':'1px'});
		},
		_error: function(error) {
			this._trigger($.jPlayer.event.error, error);
			if(this.options.errorAlerts) {
				this._alert("Error!" + (error.message ? "\n" + error.message : "") + (error.hint ? "\n" + error.hint : "") + "\nContext: " + error.context);
			}
		},
		_warning: function(warning) {
			this._trigger($.jPlayer.event.warning, undefined, warning);
			if(this.options.warningAlerts) {
				this._alert("Warning!" + (warning.message ? "\n" + warning.message : "") + (warning.hint ? "\n" + warning.hint : "") + "\nContext: " + warning.context);
			}
		},
		_alert: function(message) {
			var msg = "jPlayer " + this.version.script + " : id='" + this.internal.self.id +"' : " + message;
			if(!this.options.consoleAlerts) {
				alert(msg);
			} else if(window.console && window.console.log) {
				window.console.log(msg);
			}
		},
		_emulateHtmlBridge: function() {
			var self = this;

			// Emulate methods on jPlayer's DOM element.
			$.each( $.jPlayer.emulateMethods.split(/\s+/g), function(i, name) {
				self.internal.domNode[name] = function(arg) {
					self[name](arg);
				};

			});

			// Bubble jPlayer events to its DOM element.
			$.each($.jPlayer.event, function(eventName,eventType) {
				var nativeEvent = true;
				$.each( $.jPlayer.reservedEvent.split(/\s+/g), function(i, name) {
					if(name === eventName) {
						nativeEvent = false;
						return false;
					}
				});
				if(nativeEvent) {
					self.element.bind(eventType + ".jPlayer.jPlayerHtml", function() { // With .jPlayer & .jPlayerHtml namespaces.
						self._emulateHtmlUpdate();
						var domEvent = document.createEvent("Event");
						domEvent.initEvent(eventName, false, true);
						self.internal.domNode.dispatchEvent(domEvent);
					});
				}
				// The error event would require a special case
			});

			// IE9 has a readyState property on all elements. The document should have it, but all (except media) elements inherit it in IE9. This conflicts with Popcorn, which polls the readyState.
		},
		_emulateHtmlUpdate: function() {
			var self = this;

			$.each( $.jPlayer.emulateStatus.split(/\s+/g), function(i, name) {
				self.internal.domNode[name] = self.status[name];
			});
			$.each( $.jPlayer.emulateOptions.split(/\s+/g), function(i, name) {
				self.internal.domNode[name] = self.options[name];
			});
		},
		_destroyHtmlBridge: function() {
			var self = this;

			// Bridge event handlers are also removed by destroy() through .jPlayer namespace.
			this.element.unbind(".jPlayerHtml"); // Remove all event handlers created by the jPlayer bridge. So you can change the emulateHtml option.

			// Remove the methods and properties
			var emulated = $.jPlayer.emulateMethods + " " + $.jPlayer.emulateStatus + " " + $.jPlayer.emulateOptions;
			$.each( emulated.split(/\s+/g), function(i, name) {
				delete self.internal.domNode[name];
			});
		}
	};

	$.jPlayer.error = {
		FLASH: "e_flash",
		FLASH_DISABLED: "e_flash_disabled",
		NO_SOLUTION: "e_no_solution",
		NO_SUPPORT: "e_no_support",
		URL: "e_url",
		URL_NOT_SET: "e_url_not_set",
		VERSION: "e_version"
	};

	$.jPlayer.errorMsg = {
		FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ", // Used in: _flashError()
		FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ", // Used in: _flashError()
		NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.", // Used in: _init()
		NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.", // Used in: setMedia()
		URL: "Media URL could not be loaded.", // Used in: jPlayerFlashEvent() and _addHtmlEventListeners()
		URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.", // Used in: load(), play(), pause(), stop() and playHead()
		VERSION: "jPlayer " + $.jPlayer.prototype.version.script + " needs Jplayer.swf version " + $.jPlayer.prototype.version.needFlash + " but found " // Used in: jPlayerReady()
	};

	$.jPlayer.errorHint = {
		FLASH: "Check your swfPath option and that Jplayer.swf is there.",
		FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
		NO_SOLUTION: "Review the jPlayer options: support and supplied.",
		NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
		URL: "Check media URL is valid.",
		URL_NOT_SET: "Use setMedia() to set the media URL.",
		VERSION: "Update jPlayer files."
	};

	$.jPlayer.warning = {
		CSS_SELECTOR_COUNT: "e_css_selector_count",
		CSS_SELECTOR_METHOD: "e_css_selector_method",
		CSS_SELECTOR_STRING: "e_css_selector_string",
		OPTION_KEY: "e_option_key"
	};

	$.jPlayer.warningMsg = {
		CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
		CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
		CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
		OPTION_KEY: "The option requested in jPlayer('option') is undefined."
	};

	$.jPlayer.warningHint = {
		CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
		CSS_SELECTOR_METHOD: "Check your method name.",
		CSS_SELECTOR_STRING: "Check your css selector is a string.",
		OPTION_KEY: "Check your option name."
	};
}));

/*
 *
 * jquery.sound.js
 * (c) Vipin Kumar Rajput
 *
 */
(function($) {
    //
    // plugin definition
    //
    $.fn.soundPlay = function(options) {
        
        // build main options before element iteration
        var opts = $.extend({}, $.fn.soundPlay.defaults, options);
        // iterate and reformat each matched element
        if(opts.command == "play") {
            $.fn.soundPlay.play(opts);
        } else if(opts.command == "stop") {
            $.fn.soundPlay.stop(opts);
        } else {
            
        }
    };

    function debug($obj) {
        if (window.console && window.console.log)
            window.console.log('soundPlay: ' + $obj.size());
    };

    $.fn.soundPlay.play = function(opts) {
        url = opts.url;
        id = opts.playerId;
        $("body").append('<embed id="' + id + '" src="'+url+'" autostart="true" hidden="true"></embed>');
        return false;
    };
    $.fn.soundPlay.stop = function(opts) {
        $('#'+opts.playerId).remove();
        return false;
    };
    //
    // plugin defaults
    //
    $.fn.soundPlay.defaults = {
        url: '',
        playerId: 'player',
        command: 'play'
    };

})(jQuery);

/*
	jquery.twitterbutton.js - http://socialmediaautomat.com/jquery-twitterbutton-js.php
	Copyright (c) 2011 Stephan Helbig
	This plugin available for use in all personal or commercial projects under both MIT and GPL licenses.
*/

(function($){  
$.fn.twitterbutton = function(options) {  
	
  //Set the default values, use comma to separate the settings 
  var defaults = {  
		user: false,
		user_description: false,
		url: false,
		count_url: false,
		title: false,
		mode: 'insert',
		layout: 'vertical', //vertical|horizontal|none
		action: 'tweet',		//tweet|follow
		lang: 'en',					//en|de|ja|fr|es
		hideafterlike:false,
		googleanalytics:false,							//true|false
		googleanalytics_obj: 'pageTracker',	//pageTracker|_gaq
		ontweet: function(){return true;},
		onretweet: function(){return true;},
		onfollow: function(){return true;}
	}  

	var options =  $.extend(defaults, options);  
	var script_loaded = false;
  return this.each(function() {
  var o = options;  
  var obj = $(this);
  if(!o.url) var dynUrl = document.location;
  else var dynUrl = o.url;
  if(!o.title)var dynTitle = document.title;
  else var dynTitle = o.title;
	
	if(!o.count_url)o.count_url=dynUrl;
	
	if(!script_loaded){
		var e = document.createElement('script'); e.type="text/javascript"; e.async = true; 
		e.src = 'http://platform.twitter.com/widgets.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(e);
		
		$(e).load(function() {
			function clickEvent(intent_event) {
			  if (intent_event) {
					var label = intent_event.region;
				  if(o.googleanalytics){
						if(o.googleanalytics_obj!='_gaq'){
							_gaq.push(['_trackEvent', 'twitter_web_intents', intent_event.type, label]);
						} else {
							pageTracker._trackEvent('twitter_web_intents', intent_event.type, label);
						}
					}
			  };      
			}       
			function tweetIntent(intent_event) {
			  if (intent_event) {
					var label = intent_event.data.tweet_id;
				  if(o.googleanalytics){
						if(o.googleanalytics_obj!='_gaq'){
							_gaq.push(['_trackEvent', 'twitter_web_intents', intent_event.type, label]);
						} else {
							pageTracker._trackEvent('twitter_web_intents', intent_event.type, label);
						}
					}
			 		o.ontweet.call(intent_event);
			  	if(o.hideafterlike)$(obj).hide();
			  };      
			}       
			function favIntent(intent_event) {
				tweetIntent(intent_event);
			}       
			function retweetIntent(intent_event) {
			  if (intent_event) {
					var label = intent_event.data.source_tweet_id;
				  if(o.googleanalytics){
						if(o.googleanalytics_obj!='_gaq'){
							_gaq.push(['_trackEvent', 'twitter_web_intents', intent_event.type, label]);
						} else {
							pageTracker._trackEvent('twitter_web_intents', intent_event.type, label);
						}
					}
			 		o.onretweet.call(intent_event);
			  	if(o.hideafterlike)$(obj).hide();
			  };      
			}       
			function followIntent(intent_event) {
			  if (intent_event) {
					var label = intent_event.data.user_id + " (" + intent_event.data.screen_name + ")";
				  if(o.googleanalytics){
						if(o.googleanalytics_obj!='_gaq'){
							_gaq.push(['_trackEvent', 'twitter_web_intents', intent_event.type, label]);
						} else {
							pageTracker._trackEvent('twitter_web_intents', intent_event.type, label);
						}
					}
			 		o.onfollow.call(intent_event);
			  	if(o.hideafterlike)$(obj).hide();
			  };      
			}       
			twttr.events.bind('click',    clickEvent);
			twttr.events.bind('tweet',    tweetIntent);
			twttr.events.bind('retweet',  retweetIntent);
			twttr.events.bind('favorite', favIntent);
			twttr.events.bind('follow',   followIntent);
			script_loaded = true;
		});
	}

	
	  if(o.action=='tweet'){
	  	var via = '';
	  	var related = '';
	  	if(o.user!=false){
	  		via = 'data-via="'+o.user+'" ';
	  		if(o.user_description!=false){
	  			related = 'data-related="'+o.user+':'+o.user_description+'" ';
	  		}
	  	}
	  	var counturl = '';
	  	if(o.count_url!=dynUrl)counturl = 'data-counturl="'+o.count_url+'" ';
	  	var thtml = '<div><a href="http://twitter.com/share" class="twitter-share-button" data-url="'+dynUrl+'" '+counturl+''+via+'data-text="'+dynTitle+'" data-lang="'+o.lang+'" '+related+'data-count="'+o.layout+'">Tweet</a></div>';
	  } else {
	  	var thtml = '<div><a href="http://twitter.com/'+o.user+'" class="twitter-follow-button">Follow</a></div>';
	  }
	  if(o.mode=='append')$(obj).append(thtml);
	  else $(obj).html(thtml);

  });  
}  
})(jQuery);







$( function($){
	var quizMulti = {

    multiList: [
	{
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/one.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/two.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/three.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/four.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/five.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/six.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/seven.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/eight.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/nine.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/ten.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/eleven.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    }, {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/twelve.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/13.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/14.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/15.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/16.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/17.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/18.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/19.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/20.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/21.jpg'>",
        ans: "Llama",
        ansSel: [ "Alpaca",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/22.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    },
     {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/23.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    },
    {
        ques: "<h2>Llama Or Alpaca?</h2><img src='img/24.jpg'>",
        ans: "Alpaca",
        ansSel: [ "Llama",null ]
    }]
    };
	$("#quizArea").jQuizMe(quizMulti);
});



    /*
* jQuizMe - jQuery quiz plugin
*
* @version 2.2.1
* @author Larry Battle <http://bateru.com/news>
* @license MIT <http://opensource.org/licenses/mit-license.php>
* @date 10/08/2012
* @project page <http://code.google.com/p/jquizme/>
*/
function goodMove() {
  $("#game_sounds").jPlayer("setMedia",{
    mp3: "http://www.llamaoralpaca.com/sounds/advance_or_proceed.mp3",
    oga: "http://www.llamaoralpaca.com/sounds/advance_or_proceed.ogg",
    supplied: "mp3, ogg"
  }).jPlayer("play");
};

function badMove() {
  $("#game_sounds").jPlayer("setMedia",{
    mp3: "http://www.llamaoralpaca.com/sounds/badMove.m4a",
    oga: "http://www.llamaoralpaca.com/sounds/badMove.ogg",
    supplied: "mp3, ogg"
  }).jPlayer("play");
};


(function($){
	var _jQuizMeLayout = $("<div/>").addClass( "quiz-el").append(
		$("<div/>").addClass( "q-review-menu q-innerArea").append(
			$("<div/>").addClass( "resultsHeader" ).append(
				"<div class='resultsTitle'></div><div class='resultsScore'><span class='resultsScoregB'></span></div>"),
//			$("<input type='button'/>").addClass( "q-details-btn q-reviewBar-btns" ),
//			$("<input type='button'/>").addClass( "q-review-btn q-reviewBar-btns" ),
			$("<div/>").addClass( "q-reviewBar q-innerArea").append(
				$("<input type='button'/>").attr({ "class": "q-leftArrow q-review-arrows", "value": "<-" }),
				$("<input type='button'/>").attr({ "class": "q-rightArrow q-review-arrows", "value": "->" }),
				$( "<span/>" ).addClass( "q-review-nav" ).append(
					$("<select/>").addClass( "q-review-index-all q-review-index"),
					$("<select/>").addClass( "q-review-index-missed q-review-index").hide(),
					$("<span/>").addClass( "q-missMarker" ).show(),
					$("<input type='checkbox'/>").addClass( "q-showOnlyMissed-btn")
				)
			).hide()
		),
		$("<div/>").addClass( "q-intro q-innerArea" ).append(
			$( '<p/>' ).addClass( "q-intro-info" ),
			$( '<input type="button"/>' ).addClass( "q-begin-btn" )
		).hide(),
		$("<div/>").addClass( "q-prob q-innerArea" ).append(
			$("<div/>").addClass( "q-ques q-probArea"),
			$("<div/>").addClass( "q-ans q-probArea").append(
					$( "<div/>" ).addClass( "q-ansSel" ),
					$( "<input type='button'/>" ).addClass( "q-check-btn" ),
					$( "<input type='button'/>" ).addClass( "q-next-btn" )
				),
			$("<div/>").addClass( "q-result q-probArea" ).hide()
		),
		$("<div/>").addClass( "q-gameOver q-innerArea" ).append(
			$("<div/>").addClass( "q-stat q-probArea").append(
					$("<span/>").addClass( "q-statTotal q-center"),
					$("<blockquote/>").addClass( "q-statDetails"),
					$("<div/>").addClass( "q-extraStat" )
			),
			$("<div/>").addClass( "q-options q-probArea q-center").append(
				$("<input type='button' onclick='ga('send', 'event', 'game', 'restarted_game', 'restarted_game', 1);'/>").addClass( "q-restart-btn" ),
				$("<br />Share Your Score<br /><a href='#' class='share-button' id='facebookShare' onclick='shareFB()'>Share</a> <a href='javascript:void(0)' id='twitterbutton' tw:count='none'></a>"),
				$("<input type='button'/>").addClass( "q-del-btn" )
			)
		).hide()
	);
	// Note: areArraysSame will fail when there is an object within the array.
	var areArraysSame = function( mainArr, testArr) {
		if ( mainArr.length != testArr.length ){ return false; }
		var i = mainArr.length;

		while( i-- ) {
			if ( ( isArray( mainArr[i] ) && !areArraysSame( mainArr[i], testArr[i] ) ) || mainArr[i] !== testArr[i] ) {
				return false;
			}
		}
		return true;
	},
	getStrWithSeeableHTML = function( str, allow ) {
		if( !allow || typeof str !== "string" ){ return str; }
		return str.replace( /</g, '&#60;' );
	},
	getStrArrOfSeeableHTML = function( arr, allow ){
		if( !allow ){ return arr; }
		if( isArray( arr ) ){
			var i = arr.length;
			while( i-- ){
				arr[ i ] = getStrWithSeeableHTML( arr[ i ], true );
			}
		}
		return arr;
	},
	getNumRange = function( i ){
		var arr = [];
		while( i-- ){
			arr[ i ] = i;
		}
		return arr;
	},
	getObjProps = function( obj ){
		var keys = [];
		for( var prop in obj ){
			if( obj.hasOwnProperty( prop ) ){
				keys[ keys.length ] = prop;
			}
		}
		return keys;
	},
	rNum = function( len ){
		return Math.floor( Math.random() * len );
	},
	rBool = function(){
		return ( (rNum( 100 ) % 2) != 1);
	},
	makeArrayRandom = function( arr ){
		var j, x, i = arr.length;
		while( i ){
			j = parseInt(Math.random() * i, 10);
			x = arr[--i];
			arr[i] = arr[j];
			arr[j] = x;
		}
		return arr;
	},


	getArrayOfSwappedArrayElements = function( arr, iArr ){
		if( !isArray( arr ) || !isArray( iArr ) || arr.length !== iArr.length ){
			return -1;
		}
		var x = [], i = arr.length;
		while( i-- ){
			x[ i ] = arr[ iArr[ i ] ];
		}
		return x;
	},
	isArray = function( obj ){
		return Object.prototype.toString.call( obj ) == "[object Array]";
	},
	isMSIE = window.navigator.userAgent.match(/MSIE \d/),
	isBadMSIE = ( isMSIE && isMSIE[0].match(/\d/)[0] < 9 ),


	_lang = {
			ans:{
				corrAns: '<div class="wrong"><h3>Sorry.</h3><h2 class="small">That&#146;s wrong!</h2></div><div id="wrong"></div>',
				praise: '<div class="right"><h3>Great Job.</h3><h2 class="small">That&#146;s right!</h2></div><div id="right"></div>',
				retry: 'Incorrect.<br/>Please try another answer.',
				whyAns: "Info:",
				yourAns: "Your Answer:"
			},
			btn:{	// [ "text", "title" ]
				begin: [ "Begin Quiz" ],
				check: [ "Check", "Check your answer" ],
				del: [ "Delete", "Delete quiz" ],
				help: [ "Help", 'Click for help'],
				next: [ "Next", "Next question" ],
				restart: [ "Restart", "Restart the quit over" ],
				details: [ "Details", "View score report" ],
				review: [ "Review", "Review Questions" ],
				showOnlyMissed: [ " *", "Click to show only missed questions." ],
				quit: [ "Quit", "Quit quiz" ],
				quitNo: [ "->", "Go Back" ],
				quitYes: [ '', "Yes, quit" ]
			},
			err:{
				ansInfoNotDefined: "Property ansInfo must be a string and be defined when ansSelInfo is defined.",
				badAnsSelInfoLen: "Property ansSel and ansSelInfo must be the same type and have the same length if an array.",
				badQType: "Invalid quiz type.",
				badKey: " is an invalid key value.",
				error: "Error",
				noQType: "No quizTypes.",
				noQues: "Quiz has no questions.",
				notArr: "Must be an array.",
				notObj: "Invalid quiz data structure. Must be an array or object."
			},
			stats:{
				right: "Right",
				rate: "Rate",
				score: "Score",
				wrong: "Wrong",
				total: "Total",
				tried: "Tried"
			},
			quiz:{
				tfEqual: " = ",
				tfEnd : "?",
				tfFalse: "False",
				tfTrue: "True"
			}
	},
	setLangBtnTxt = function(langBtn, layout) {
		var btnCls = [ "begin", "check", "del", "help", "next", "restart", "quit", "quitYes", "quitNo", "review", "details", "showOnlyMissed" ];
		var i = btnCls.length,
		el;
		// !! Replace showOnlyMissed with an input button value="show only wrong" || "show right"
		// !! Are delete showOnlyMisssed and have * for the missed questions.
		if (!langBtn.quitYes[0]) {
			langBtn.quitYes[0] = langBtn.quit[0] + "?";
		}
		$(".q-missMarker", layout).html(langBtn.showOnlyMissed[0]);
		langBtn.showOnlyMissed[0] = '';
		while (i--) {
			el = [".q-", btnCls[i], "-btn"].join('');
			$(el, layout).attr("value", langBtn[btnCls[i]][0]);
			$(el, layout).attr("title", langBtn[btnCls[i]][1]);
		}
		return layout;
	},



	_settings = {
		addToEnd: "",  // This is attached to fill in the blank quiz types.
		activeClass: "q-ol-active", // Used on multiple choice, (multiOl), quiz types.
		allQuizType: '', // This sets all questions to this quiz type.
		allRandom: true, // Randomizes all the questions, regardless of quiz type section.
		alwaysShowAnsInfo: false, // Shows answer information when correct or incorrect answer are received.
		disableRestart: false, // Hide or show the restrart button on gameOver.
		disableDelete: true, // Hide or show the delete button on gameOver.
		enableRetry: false, // Allows the user to repeat a problem before advancing to next question.
		fxType: 1, // animateType [ show/hide, fadeToggle, slideToggle, weight&heightToggle ];
		fxCode: false, //If a function, then this is used for animation. Please refer to animateType[] for examples.
		fxSpeed: "normal", // "fast", "slow", "normal" or numbers.
		help: 'help', // Provide help text/html if needed.
		hoverClass: "q-ol-hover", // Used on multiple choice, (multiOl), quiz types.
		intro: '', // Provide an text/html intro.
		multiLen : 2, // Set the number of multiple choice choices for quizType multi & multiList.
		numOfQuizQues: 5, // Sets the number of questions asked. Must be between 0 and the total questions.
		performErrorChecking : true, // Check all the quiz formats.
		random: true, // Randomizes all the questions in each quiz type section.
		review: true, // Allows for review of questions at gameOver.
		showFeedback: true, // Show the answers after each question.
		showAnsInfo: true, // If provided, show the answers information after each question.
		showHTML: false, //This will show the HTML, by converting to unicode, rather than render it.
		showWrongAns: false,  // If answer is wrong, then show the user's wrong answer after each question.
		statusUpdate: false, // Sends a status Update. Refer to function sendStatus.
		quizType: "fillInTheBlank", // This is only need if you send in an array and not a object with a defined quiz type.
		title: 'Lllama OR Alpaca?' // title displayed for quiz.
	};

	$.fn.jQuizMe = function( wordList, options, userLang ){

		var settings = $.extend({},_settings, options),
			lang = $.extend(true, {},_lang, userLang),
			layout = setLangBtnTxt( lang.btn, _jQuizMeLayout.clone(true));

		return this.each( function(){
			// currQuiz is the output file.(this is what the user sees). $( el, currQuiz) must be used when accessing elements.
			// Hide currQuiz until it's ready to be displayed.
			var currQuiz = layout.clone(true).hide(), currIndex = 0, stickyEl = this, quit = false, totalQuesLen = 0,
			// The q object is where the quiz data, that was made before the quiz starts, is stored here.
			// Please beware that all the questions are stored linearly. But you can find a quiz type by using index[Max|Min].
			q = {
				// Each index is a question. [ question1, question2, question3,... ]. But not for indexMax|Min and props.
				ans: [], // Answers.
				ansSel: [], // Answer selections, the elements for inputting an answer. Ex. input text box, or a select tag.
				ansSelInfo: [], // Used to show specific feedback for ansSel choices.
				ansInfo: [], // Stores the answer information if provided.
				retryCount: [], // Stores the number of retries that a user can have.
				indexMax: [], // The stopping point index for a quiz type inside the q. ans, ansSel, ansInfo and ques.
				indexMin: [], // The starting point index.
				prop:[], // Stores the quiz types names in order. Used for creation of each.
				ques: [] // Questions.
			},
			stats = {
				indexSelected: [], // indexSelected is only used when ansSelInfo is used.
				problem: {},
				numOfRight: 0,
				numOfWrong : 0,
				quesTried: 0,
				totalQues: 0,
				accur : function(){
					var x = Math.round( this.numOfRight / this.quesTried * 100 );
					return ( this.quesTried ) ? x : 0;
				},
				accurTxt : function(){
					return [ this.numOfRight, "/", this.quesTried," = ", this.accur(), "%"].join('');
				},
				perc : function(){
					var x = Math.round( this.numOfRight / this.totalQues * 100 );
					return ( this.totalQues ) ? x : 0;
				},
				percTxt : function(){
					return [ this.numOfRight, "/", this.numOfQues, " = ", this.perc(), "%"].join('');
				},
				reset : function(){
					this.totalQues = totalQuesLen;
					this.quesTried = 0;
					this.numOfRight = 0;
					this.numOfWrong = 0;
					this.problem = {};
					this.indexSelected = [];
				}
			},
			// rAns(): Returns a random answer from either all the questions, or a curtain quiz type.
			// iProp -> index of the desired quiz type.
			rAns = function( iProp, fromAllQues ){
				var p = ( fromAllQues ) ? q.prop[ rNum( q.prop.length ) ] : q.prop[ iProp ],
					ques = wordList[ p ][ rNum( wordList[ p ].length ) ];

				return ques.ans;
			},
			disableMenuBar = function(){
				$( ".q-quit-btn, .q-help-btn", currQuiz ).attr( "disabled", true );
				$( ".q-help-info", currQuiz ).hide();
			},
			haveCorrAnsWithinRetries = function( isFlashCard ){
				return ( ((getProblemProp( "amountTried" ) - 1) <= q.retryCount[ currIndex ]) && checkAns( isFlashCard ));
			},
			letUserAnswerAgain = function( isFlashCard ){
				return (settings.enableRetry && getProblemProp( "amountTried" ) < q.retryCount[ currIndex ] && !checkAns( isFlashCard ));
			},
			setCheckBtnToBeBlockedUntilAnsSelIsClicked = function(){
				$( ".q-check-btn", currQuiz ).attr( "disabled", true );
				$( ".userInputArea", currQuiz ).one( "click", function(){
					$( ".q-check-btn", currQuiz ).attr( "disabled", function(){
						return !$( ".q-next-btn", currQuiz ).attr( "disabled" );
					});
				});
			},
			displayRetryMsg = function(){
				var show = lang.ans.retry;
				if( settings.showAnsInfo ){
					show += getAnsInfoForDisplay();
				}
				displayFeedback( show );
			},
			// setCheckAndNextBtn(): Sets the check button to toggle from "check" to "next". Or just displays "next".
			// "check" shows the answer results, but "next" just changes the question.
			setCheckAndNextBtn = function(){
				var isFlashCard = '';

				$( ".q-check-btn", currQuiz ).attr( "disabled", true )
					.click( function( e ){
						isFlashCard = $( ".userInputArea", currQuiz ).triggerHandler( "getUserAns" );

						getStatsProblem().amountTried++;
						if( getProblemProp( "amountTried" ) == 1){
							stats.quesTried++;
						}
						if( !letUserAnswerAgain( isFlashCard ) ){
							stats[ ( checkAns( isFlashCard ) || isFlashCard ) ? "numOfRight" : "numOfWrong" ]++;
							stats.problem[ currIndex ].isCorrect = checkAns( isFlashCard );
							displayAnsResult( isFlashCard );
							$( ".q-next-btn", currQuiz ).attr( "disabled", false );
							$( e.target ).attr( "disabled", true );
						}
						else{
							setCheckBtnToBeBlockedUntilAnsSelIsClicked();
							displayRetryMsg();
						}
						e.preventDefault();
					}
				);
				$(".q-next-btn", currQuiz ).click( function(e){
					if( !settings.showFeedback ){
						var isFlashCard = $( ".userInputArea", currQuiz ).triggerHandler( "getUserAns" );
						getStatsProblem().amountTried++;
						if( getProblemProp( "amountTried" ) == 1){
							stats.quesTried++;
						}
						stats[ ( checkAns( isFlashCard ) || isFlashCard ) ? "numOfRight" : "numOfWrong" ]++;
						stats.problem[ currIndex ].isCorrect = checkAns( isFlashCard );
						displayAnsResult( isFlashCard );
					}
					nextMove();
					$( e.target ).attr( "disabled", true );
					e.preventDefault();
				});
			},
			// setQuitBtn(): Provides a quit confirm action.
			setQuitBtn = function(){
				$( ".q-quitYes-btn", currQuiz ).click( function(){
					quit = true;
					nextMove();
				});
				$( ".q-quit-confirm", currQuiz ).click( function(){
					$( ".q-quit-confirm", currQuiz ).hide(); //.q-quit-confirm calls both the quitYes and quitNo btns.
					$( ".q-quit-btn", currQuiz ).css("display", "inline");
				});
				$( ".q-quit-btn", currQuiz ).click( function( e ){
					$( e.target ).hide();
					$( ".q-quit-confirm", currQuiz ).css("display", "inline");
				});
			},
			setTotalQuesLen = function(){
				var i = q.prop.length, len = 0, numOfQQ = settings.numOfQuizQues;

				while( i-- ){
					len += wordList[ q.prop[ i ] ].length;
				}
				totalQuesLen = ( !numOfQQ || isNaN( numOfQQ ) || numOfQQ > len ) ? len : numOfQQ;
				stats.numOfQues = totalQuesLen;
			},
			// setQuizTypePos(): This stores the position of the beginning and end index of each quiz type.
			// This allows for each quiz type to be pinpointed to in an array.
			setQuizTypePos = function(){
				var i = 0, sum = 0, len = 0;

				while( q.prop[ i ] ){
					len = wordList[ q.prop[ i ] ].length;
					sum += len;
					q.indexMax[ i ] = sum - 1;
					q.indexMin[ i ] = sum - len;
					i++;
				}
			},
			// createQuizEl(): Creates new quiz element and sets default button behaviors.
			createQuizEl = function(){
				$( ".q-help-btn", currQuiz).toggle(
					function(){ animateThis( $( ".q-help-info", currQuiz), 1 ); },
					function(){ animateThis( $( ".q-help-info", currQuiz), 0 ); }
				);
				setTotalQuesLen();
				setQuizTypePos();
				setQuitBtn();
				setCheckAndNextBtn();
				if( settings.review ){ setReviewMenu(); }
				$( stickyEl ).append( currQuiz );
			},
			// cont(): Checks whether the questions are done or if quit was called.
			cont = function(){
				var result = ( !quit && ( currIndex < totalQuesLen ) );
				if( !result ){ quit = true; }
				return result;
			},
			// animateType[]: Stores animation styles to animate an element.
			animateType = [
				function( el, on ){ el[ ( on ) ? "show" : "hide" ]( 0 );},
				function( el, on, spd ){ el[ ( on ) ? "fadeIn" : "fadeOut" ]( spd );},
				function( el, on, spd ){ el[ ( on ) ? "slideDown" : "slideUp" ]( spd );},
				function( el, on, spd ){
					el.animate( { "height": "toggle", "width": "toggle" }, spd );
				}
			],
			// animateThis(): Calls animations on an element and/or push a callback function.
			animateThis = function( el, isShown, func ){
				if( isShown > -1 ){
					animateType[ settings.fxType ]( el, isShown, settings.fxSpeed );
				}
				if( func ){
					el.queue( function(){ func(); $(el).dequeue();});
				}
				if( isBadMSIE && (isShown > 0) ){
					$(el).animate( { opacity: 1} ).css( "display", "block" );
				}
			},
			// setReviewNav(): Adds events and functions to change the review questions being viewed.
			// changeCurrIndex() is main point of focus.
			setReviewNav = function(){
				var qReviewOpt = ".q-review-index:visible option:",
					qReviewOptVal = qReviewOpt + "selected",
					changeCurrIndex = function( i ){
						var max = $( qReviewOpt + "last", currQuiz).val(),
							min = $( qReviewOpt + "first", currQuiz).val(),
							isIndexValid = ( i <= max && i >= min );

						if( isIndexValid ){
							$( ".q-review-index", currQuiz).val( i );
							currIndex = i;
							changeProb(true);
							displayAnsResult();
							$( ".q-reviewBar > :disabled", currQuiz).attr( "disabled", false );
						}
						// if a limit was reached. Disable the corresponding arrow.
						if( i == max || i == min ){
							$( ".q-" + (( i == min )?"left":"right") + "Arrow", currQuiz ).attr( "disabled", true );
						}
					};
				$( ".q-review-index", currQuiz).change(function(e){
					changeCurrIndex( parseInt( $(e.target).val(), 10) );
				});
				// Note: The prev||next values of the options tag are used because the list might not be in numerical order.
				$( ".q-review-arrows", currQuiz).click(function( e ){
					var isLeft = !!e.target.className.match( /left/ ),
						reviewVal = $( qReviewOptVal, currQuiz)[ ( isLeft ) ? "prev":"next" ]().val();

					changeCurrIndex( parseInt( reviewVal, 10) );
				});
			},
			// setReviewMenu(): Sets the events to change the view when the "review" or "details" button is clicked.
			setReviewMenu = function(){
				var qG = $( ".q-gameOver", currQuiz ), qP = $( ".q-prob", currQuiz );

				$( ".q-reviewBar-btns", currQuiz ).click( function( e ){
					var isDetailEl = ( e.target.className.search(/details/) > -1),
						showEl = ( isDetailEl ) ? qG : qP,
						hideEl = ( !isDetailEl ) ? qG : qP;

					animateThis( $( ".q-reviewBar", currQuiz), !isDetailEl );
					animateThis( hideEl, 0, function(){
						$( ".q-details-btn", currQuiz ).attr( "disabled", isDetailEl );
						$( ".q-review-btn", currQuiz ).attr( "disabled", !isDetailEl );
						animateThis( showEl, 1 );
					});
				});
				$( ".q-showOnlyMissed-btn", currQuiz ).change( function(){
					var ckd = $(this).is(":checked");
					if( ckd ){
						$( ".q-review-index-missed", currQuiz ).fadeIn().css( "display", "inline" );
						$( ".q-review-index-all", currQuiz ).hide();
					}
					else{
						$( ".q-review-index-missed", currQuiz ).hide();
						$( ".q-review-index-all", currQuiz ).fadeIn().css( "display", "inline" );
					}
					$( ".q-review-index:visible", currQuiz ).trigger( "change" );
				});
				setReviewNav();
			},
			// updateReviewIndex(): Creates the review's select tag html for all and wrong answers.
			updateReviewIndex = function(){
				var allMissed = '', optHtml = '', markAsWrong = '', eachOpt = '',
					i = 0, totalQues = stats.totalQues;

				while( totalQues - i ){
					markAsWrong = ( getProblemProp( "isCorrect", i ) ) ? "" : " *";
					eachOpt = "<option value=" + i + ">";
					eachOpt += (i+1);
					eachOpt += markAsWrong;
					eachOpt += "</option>";
					optHtml += eachOpt;
					allMissed += (markAsWrong) ? eachOpt : "";
					i++;
				}
				$( ".q-review-index-all", currQuiz).html( optHtml );
				$( ".q-review-index-missed", currQuiz).html( allMissed );
			},
			// disableGameOverButtons(): If requested, on gameOver hide the restart and/or delete buttons.
			disableGameOverButtons = function(){
				if( settings.disableRestart ){ $( ".q-restart-btn", currQuiz).hide(); }
				if( settings.disableDelete ){ $( ".q-del-btn", currQuiz).hide(); }
				if( settings.disableRestart && settings.disableDelete ){
					$( ".q-options", currQuiz ).hide();
				}
			},
			getUserStatDetailsForDisplay = function(){
				return [
						(lang.stats.right + ": " + stats.numOfRight),
						(lang.stats.wrong + ": " + stats.numOfWrong),
						(lang.stats.tried + ": " + stats.quesTried),
						(lang.stats.rate + ": " + stats.accurTxt()),
						(lang.stats.total + ": " + stats.percTxt())
					].join('<br/>');
			},
			setupReview = function(){
				updateReviewIndex();
				$( ".q-review-btn", currQuiz ).one( "click", function(){
					$( ".q-review-index", currQuiz).trigger( "change" );
					displayAnsResult();
					// This forces the answer info to be displayed for first question.
					if( totalQuesLen == 1 ){
						$( ".q-rightArrow, .q-showOnlyMissed-btn", currQuiz ).attr( "disabled", true );
					}
				});
				$( ".q-details-btn", currQuiz).attr( "disabled", true );
				$( ".q-review-menu", currQuiz).show();
			},
			// gameOver(): Creates a performance list, set's the events for restart and delete, hides unneed elements,
			// then enables the review-bar.
			gameOver = function(){
				var percentage = stats.accur();
				if (percentage <= 9) {
					var resultsTitleFB = "I don't know Llamas OR Alpacas";
					var resultTitle ="You don't know Llamas OR Alpacas.<br /><input type='button' class='helpButton' onclick='ga('send', 'event', 'game', 'start_game', 'got_help', 1);' value='Get Help'>";
					var endVideo = "<iframe width='420' height='290' src='//www.youtube.com/embed/vHt7rH5bKQM?autoplay=1&controls=0&showinfo=0&rel=0' frameborder='0' modestbranding='1' allowfullscreen></iframe>";
				}else if (percentage >= 90){
					var resultsTitleFB = "I am a Llama or Alpaca Champion!";
					var resultTitle ="You are a Llama or Alpaca Champion!";
					var endVideo = "<iframe width='420' height='290' src='//www.youtube.com/embed/SuuXXjJly2I?autoplay=1&controls=0&showinfo=0&rel=0' frameborder='0' modestbranding='1' allowfullscreen></iframe>";
				}else if (percentage > 50 && percentage <89) {
					var resultsTitleFB = "I am Llama or Alpaca Literate.";
					var resultTitle ="You are Llama or Alpaca Literate.";
					var endVideo = "<iframe width='420' height='290' src='//www.youtube.com/embed/SuuXXjJly2I?autoplay=1&controls=0&showinfo=0&rel=0' frameborder='0' modestbranding='1' allowfullscreen></iframe>";
				}else if (percentage > 10 && percentage <49) {
					var resultsTitleFB = "I should study up on Llamas and Alpacas.";
					var resultTitle = "You should study up on Llamas and Alpacas.<br /><input type='button' class='helpButton' value='Get Help'>";
					var endVideo = "<iframe width='420' height='290' src='//www.youtube.com/embed/1gZ0x8AVaBI?autoplay=1&controls=0&showinfo=0&rel=0' frameborder='0' modestbranding='1' allowfullscreen></iframe>";
				}else {
					var resultsTitle="";
				}

				disableGameOverButtons();
				$( ".resultsTitle", currQuiz).html( resultTitle );
				$( ".q-statTotal", currQuiz).html( lang.stats.score + ": " + stats.perc() + "%" );
				//$( ".q-statDetails", currQuiz).html( getUserStatDetailsForDisplay() );
				$( ".q-statDetails", currQuiz).html( endVideo );
				$( ".q-restart-btn", currQuiz).one( "click", reStartQuiz );
				$( ".q-del-btn", currQuiz).one( "click", deleteQuiz );
				$( ".q-help, .q-check-btn, .q-prob, .q-intro, .q-ans", currQuiz).hide();
				if( settings.review ){
					setupReview();
				}
				animateThis( $( ".q-gameOver", currQuiz), 1, sendStatus );
//* FACEBOOK SHARE *//
				shareFB = function(){
					FB.ui(
	   				{
     				method: 'feed',
     				name: 'I ❤ Llama Or Alpaca',
     				link: 'https://www.facebook.com/llamaoralpaca',
     				redirect_uri: 'https://www.facebook.com/llamaoralpaca',
     				picture: 'www.llamaoralpaca.com/img/llama-or-alpaca.png',
     				caption: resultsTitleFB,
     				description: 'My score was ' + percentage + '% on Llama Or Alpaca.',
     				message: resultsTitleFB + 'My score was ' + percentage + '% on Llama Or Alpaca.'
   					});
				};

				$('#twitterbutton').twitterbutton({
					user_description: 'I ❤ Llama Or Alpaca',
					url: 'http://llamaoralpaca.com',
					media_url: 'www.llamaoralpaca.com/img/llama-or-alpaca.png',
					title: resultsTitleFB + 'My score was ' + percentage + '% on Llama Or Alpaca.',
					mode: 'insert',
					layout: 'horizontal', //vertical|horizontal|none
					action: 'tweet',		//tweet|follow
					lang: 'en',					//en|de|ja|fr|es
					hideafterlike:false,
					ontweet: function(){return true;},
					onretweet: function(){return true;},
					onfollow: function(){return true;}
  				});
			},
			// changeProb(): Changes to next problem and updates status.
			changeProb = function( isReview ){
				var qAS = q.ansSel;
				$( ".q-counter", currQuiz).text( (currIndex + 1) + '/' + totalQuesLen );
				$( ".q-ques", currQuiz).html( q.ques[ currIndex ] );
				if( !isReview ){
					$( ".q-ansSel", currQuiz).html(
					// Checks for an index pointer; used to clone an identical q.ansSel. This was done to speed up buildQuizType.
						qAS[ isNaN( qAS[currIndex] ) ? currIndex : qAS[currIndex] ].clone(true)
					);
					setQResultDisplay( 0 );
					$( ".q-result", currQuiz ).hide();
					$( ".focusThis", currQuiz ).focus();
					setTimeout( function(){
						$( ".clickThis", currQuiz ).trigger("click");
						// IE BUG FIX. The list-style-type won't get rendered until hovered.
						// Resetting the property will forces it to render. Runs slow though.
						var qOlLiEl = $( ".q-ol-li",  currQuiz );
						if( qOlLiEl.length && isBadMSIE ){
							qOlLiEl.css( "list-style-type", qOlLiEl.css( "list-style-type" ) );
						}
					}, 15);

					$(function () {
    				var parent = $("ol.q-ol");
    				var divs = parent.children();
    				while (divs.length) {
        					parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    					}
					});
				}
			},
			setHelpBtn = function(){
				if (settings.help) {
					$(".q-help-info", currQuiz).html(settings.help);
				} else {
					$(".q-help-btn", currQuiz).attr("disabled", false);
				}
			},
			// changeQuizInfo(): Changes the main information for the quiz.
			changeQuizInfo = function(){
				setToBeginningView();
				$( ".q-title", currQuiz).html( settings.title );
				setHelpBtn();
				if( settings.intro ){
					$( ".q-prob", currQuiz ).hide();
					$( ".q-intro-info", currQuiz ).html( settings.intro );
					$( ".q-intro", currQuiz ).show();
					$( ".q-begin-btn", currQuiz ).unbind().one( "click", function(){
						animateThis( $( ".q-intro", currQuiz ), 0, function(){
							animateThis( $( ".q-prob", currQuiz ), 1, sendStatus );
						});
					});
				}
			},
			goToNextProb = function( i ){
				if( i && i < totalQuesLen && (currIndex + 1) < i ){
					currIndex = i;
				}
				changeProb();
			},
			sendStatus = function(){
				if( !settings.statusUpdate ){
					return;
				}
				var quizInfo = {
					"currIndex": currIndex,
					"problem": stats.problem,
					"numOfRight":stats.numOfRight,
					"numOfWrong":stats.numOfWrong,
					"score": stats.perc(),
					"total": stats.totalQues,
					"hasQuit": quit,
					"deleteQuiz": deleteQuiz,
					"quitQuiz": ( !quit ) ? quitQuiz : function(){},
					"nextQuestion": ( !quit ) ? goToNextProb : function(){}
				};

				settings.statusUpdate( quizInfo, currQuiz );
			},
			// nextMove(): Decides to change the problem or to quit.
			nextMove = function(){
				currIndex++; // currIndex++ must be first, to find out if there are other questions.
				var nextFunc = (cont() ? changeProb : quitQuiz),
					qEl = $( ".q-prob", currQuiz);

				if( !quit ){ animateThis( qEl, 0 ); }
				animateThis( qEl, -1, nextFunc ); //Push the function to the stack, so it's called in between the animations.
				if( !quit ){ animateThis( qEl, 1, sendStatus ); }

			},
			// getAns(): Is used to check the answers.
			getAns = function( i ){
				return q.ans[ i || currIndex ];
			},
			getStatsProblem = function( i ){
				i = i || currIndex;
				if( !stats.problem[ i ] ){
					stats.problem[ i ] = { "amountTried": 0, "isCorrect":null, "userAnswer": undefined };
				}
				return stats.problem[ i ];
			},
			getProblemProp = function( prop, i ){
				return getStatsProblem( i )[ prop ];
			},
			setUserAnswer = function( value, i ){
				getStatsProblem( i ).userAnswer = value;
			},
			// checkAns(): Changes the user's answer during the quiz and updates the stats.
			checkAns = function( isFlashCard ){
				var ans = getAns(), isAnsCorr = false, userAns = getProblemProp( "userAnswer" );

				if( userAns === undefined ){ return false; }
				if( typeof(ans) === "string"){
					ans = $.trim( ans );
				}
				if( isArray( ans ) ){
					// If one element of the array matches the user's input, then it's correct.
					// This enables multiple answers to be possible.
					isAnsCorr = ( userAns == ans.toString() || ($.inArray( userAns, ans ) + 1));
				}
				else{
					isAnsCorr = ( userAns == ans || userAns.toString().toLowerCase() == ans.toString().toLowerCase() );
				}
				return isAnsCorr;
			},
			getUserAnsForDisplay = function( toUni ){
				var ans = lang.ans.yourAns + "<br/>";

				return ( !getProblemProp( "userAnswer" ) ) ? "<del>" + ans +"</del>" :
							ans + getStrWithSeeableHTML( getProblemProp( "userAnswer" ), toUni );
			},
			getAnsInfoForDisplay = function(){
				if( !q.ansInfo[ currIndex ] ){
					return "";
				}
				if( q.ansSelInfo[ currIndex ] ){
					return "<hr/>" + lang.ans.whyAns + "<br/>" + (q.ansSelInfo[ currIndex ][ stats.indexSelected[ currIndex] ] || q.ansInfo[ currIndex ]);
				}else{
					return "<hr/>" + lang.ans.whyAns + "<br/>" + (q.ansInfo[ currIndex ] );
				}
			},
			//setQResultDisplay(): IE Bug Fix. .q-result pops out when hidden. Thus, show() -> append() and hide() -> remove().
			setQResultDisplay = function( doAppend ){
				if( !isBadMSIE ){ return; }
				if( doAppend ){
					if( !$( ".q-result", currQuiz ).size() ){
						$(".q-prob", currQuiz ).append( $("<div/>").addClass( "q-result q-probArea" ).show() );
					}
				}
				else{
					$( ".q-result", currQuiz ).remove();
				}
			},
			displayFeedback = function( str ){
				setQResultDisplay(1);
				$( ".q-result", currQuiz ).html( str );
				if( !quit ){
					animateThis( $( ".q-result", currQuiz ), 1 );
					zoom();
				}
				else{
					$( ".q-result", currQuiz ).show();
					zoom();
				}
			},
			// displayAnsResult(): Display's the answer result and information during the quiz.
			displayAnsResult = function( isFlashCard ){
				var currAns = getAns(), isUserAnsCorr = haveCorrAnsWithinRetries( isFlashCard ),
					show = "", toUni = settings.showHTML;

				currAns = ( isArray( currAns ) ) ? currAns.concat(): [ currAns ];
				show = ( isUserAnsCorr ) ? lang.ans.praise :
//								( lang.ans.corrAns + '<br/>' + getStrArrOfSeeableHTML( currAns, toUni ).join( '<br/>' ) );
								( lang.ans.corrAns );

				if(isUserAnsCorr){
					goodMove();
				}else{
					badMove();
				};

				if( !isUserAnsCorr || quit ){
					if( settings.showWrongAns || quit ){
						show = getUserAnsForDisplay( toUni ) + "<hr/>" + show;
					}
					if( settings.showAnsInfo ){
						show += getAnsInfoForDisplay();
					}
				}else{
					if( settings.alwaysShowAnsInfo ){
						show += getAnsInfoForDisplay();
					}
				}
				if( settings.showFeedback || quit ){
					displayFeedback( show );
				}
			},
			hasAnsSel = function( iProp, i ){
				return ( !!wordList[ q.prop[ iProp ] ][ i ].ansSel );
			},
			rAnsSel = function( iProp, i ){
				var wAS = wordList[ q.prop[ iProp ] ][ i ].ansSel,
					j = rNum( ( isArray( wAS ) ) ? wAS.length : 0 );

				return {
					index: j,
					value: ( isArray( wAS ) ) ? wAS[ j ] : wAS
				};
			},
			releaseButtonBlock = function(){
				if( settings.showFeedback ){
					$( ".q-check-btn", currQuiz ).attr( "disabled", !$( ".q-next-btn", currQuiz ).attr("disabled") );
				}
				else{
					$( ".q-next-btn", currQuiz ).attr( "disabled", false );
				}

			},
			setAnsSelInfoSelect = function( quizType ){
				if( !q.ansSelInfo[ currIndex ] ){
					return;
				}
				groupClass = {
					"multi":".q-select:visible > option",
					"multiList":".q-ol-li:visible",
					"tf":".userInputArea > input"
				}[quizType];
				selectedClass = {
					"multi":".q-select > option:selected",
					"multiList":"."+settings.activeClass,
					"tf":".userInputArea > input:checked"
				}[quizType];
				stats.indexSelected[ currIndex ] = $( groupClass, currQuiz ).index( $(selectedClass, currQuiz ) );
			},
			// buildQuizType{}: contains all the quiz types.
			//Quiz creation: The q object is filled with the questions, answers and answer selections(what the user can choose from).
			//The user's input gets assigned to stats.problem[ currIndex ].userAnswer ( global inside quizMe ).
			//Then nextMove() is called. Which checks to see if the user's input is contained in the answer, or is the array.
			buildQuizType = {
				// fillInTheBlank Quiz:	ques = ques, ansSel = Input text[ ans ].
				'fillInTheBlank' : function( iProp, flashVer ){
					var d;
					if( flashVer ){
						d = $( "<span/>" ).addClass( "clickThis userInputArea" ) //Enabled the checkBtn.
							.one( "click", function(){
								releaseButtonBlock();
							})
							.bind( "getUserAns", function(){ return 1; });
					}
					else{
						d = $( '<input type="text"/>' ).addClass( "q-quesInput focusThis userInputArea" )
							.one( "click keypress", function(){
								releaseButtonBlock();
							})
							.bind( "getUserAns", function(){
								setUserAnswer( $.trim( $( ".q-quesInput", currQuiz ).val() ) );
							});
					}
					var i = q.indexMax[ iProp ], qMin = q.indexMin[ iProp ], wList = wordList[ q.prop[ iProp ] ], numOfQues = wList.length;

					while( numOfQues-- ){
						q.retryCount[ i ] = wList[ numOfQues ].retry || 0;
						q.ansInfo[ i ] = wList[ numOfQues ].ansInfo || "";
						q.ans[ i ] = wList[ numOfQues ].ans;
						q.ansSel[ i ] = qMin;
						q.ques[ i ] = ( wList[ numOfQues ].ques + settings.addToEnd );
						i--;
					}
					q.ansSel[ qMin ] = d;	//speed!! All the q.ansSel area reference to qMin.
				},
				'flashCard' : function( iProp ){
					// flashCard Quiz:  ques = ques, ansSel =null .
					this.fillInTheBlank( iProp, true);
				},
				'trueOrFalse' : function( iProp ){
					// trueOrFalse Quiz:
					// ques  = (typeof ans != bool) ? (real or fake ans)  : ques;
					// ansSel =  T / F ( radio );
					// If the answer is a bool, then there is no creation of a question: combining a right or wrong answers, to make a true or false statement.

					var d = $( ['<div><input type="radio" value="1" class="true-radio trueRadio"/><label class="trueRadio">', lang.quiz.tfTrue,
								'</label> <input type="radio" value="0" class="false-radio falseRadio"/><label class="falseRadio">',
								lang.quiz.tfFalse, '</label></div>'].join('') );

					$( d ).addClass( "userInputArea" ).bind( "getUserAns", function(){
						var isTrue = $( ".true-radio", this ).attr( "checked" );

						setUserAnswer( lang.quiz[ ( isTrue ) ? "tfTrue" : "tfFalse" ] );
						setAnsSelInfoSelect( "tf" );
					});
					$( d ).children().one( "click", function(){
						releaseButtonBlock();
					});
					$(".trueRadio", d).click( function(){
						$( ".true-radio", currQuiz ).attr( "checked", true );
						$( ".false-radio", currQuiz ).attr( "checked", false );
					});
					$(".falseRadio", d).click( function(){
						$( ".true-radio", currQuiz ).attr( "checked", false );
						$( ".false-radio", currQuiz ).attr( "checked", true );
					});
					var currAns, shouldAnsBeCorr = true, i = q.indexMax[ iProp ],
						qMin = q.indexMin[ iProp ], wList = wordList[ q.prop[ iProp ] ], numOfQues = wList.length,
						toUni = settings.showHTML, tfEqual = lang.quiz.tfEqual, tfEnd = lang.quiz.tfEnd, rAS, cAS, result, isAnsReallyCorrect;

					while( numOfQues-- ){
						rAS = undefined;
						cAS = undefined;
						currAns = wList[ numOfQues ].ans;
						q.ansInfo[ i ] = wList[ numOfQues ].ansInfo || "";
						q.ansSel[ i ] = qMin;
						q.retryCount[ i ] = wList[ numOfQues ].retry || 0;
						q.ques[ i ] = wList[ numOfQues ].ques;
						if( typeof currAns != "boolean" ){
							shouldAnsBeCorr = rBool();
							if( shouldAnsBeCorr ){
								result = currAns;
							}else{
								if( hasAnsSel( iProp, numOfQues ) ){
									rAS = rAnsSel( iProp, numOfQues );
									result = rAS.value || currAns;
								}
								else{
									result = rAns(iProp);
								}
							}
							isAnsReallyCorrect = ( !isArray( currAns ) || !isArray( result ) ) ? result == currAns : areArraysSame( result, currAns );
							q.ans[ i ] = lang.quiz[ ( isAnsReallyCorrect ) ? "tfTrue" : "tfFalse" ];
							q.ques[ i ] += tfEqual;
							q.ques[ i ] += getStrWithSeeableHTML( ( isArray( result ) ) ? result.join( ',' ) : result, toUni );
							q.ques[ i ] += tfEnd;
						}
						else{
							q.ans[ i ] = lang.quiz[ ( currAns ) ? "tfTrue" : "tfFalse" ];
						}
						if( wList[ numOfQues ].ansSelInfo ){
							cAS = wList[ numOfQues ].ansSelInfo.concat();
							if( cAS && rAS ){
								cAS = ( isArray( cAS ) ) ? cAS : [ cAS ];
								var qAI = q.ansInfo[ i ];
								q.ansSelInfo[ i ] = ( shouldAnsBeCorr ) ? [ qAI, cAS[ rAS.index ] || qAI ] : [ cAS[ rAS.index ] || qAI, q.ansInfo[ i ] ];
							}
						}
						i--;
					}
					q.ansSel[ qMin ] = d;
				},
				'multipleChoice' : function( iProp, olVer ){
					// multipleChoice Quiz:
					// ques = ques;
					// ansSel = <select>[ <option> is the answer + <option> * settings.multiLen]
						var d;
						if( olVer ){
							d = $( '<div><ol class="q-ol"></ol></div>' );
							$( d ).one( "click", function(){
								releaseButtonBlock();
							});
						}
						else{
							d = $( '<div><select class="q-select"></select></div>' );
							$( ".q-select", d ).one( "click keypress", function( e ){
								releaseButtonBlock();
							});
						}
						$( d ).addClass( "userInputArea" ).bind( "getUserAns", function(){
							if( olVer ){
								var elHtml = $("." + settings.activeClass, currQuiz).find(".q-ol-li-ansSel")[ settings.showHTML ? "text": "html" ]();
								setUserAnswer( $.trim(elHtml) );
								setAnsSelInfoSelect( "multiList" );
							}
							else{
								setUserAnswer( $( "option:selected", this ).text() );
								setAnsSelInfoSelect( "multi" );
							}
						});

						var i = q.indexMax[ iProp ], wList = wordList[ q.prop[ iProp ] ], ansPos, optHtml, val, len,
							j = wList.length, wListRange = getNumRange( j ), numOfQues = wList.length,
//Checks to see, if the request multiLen length can be supported.
							setLen = ( settings.multiLen > j ) ? j : settings.multiLen,
							toUni = settings.showHTML, hasAnsPosition = false, ansSelChoice = "", range, cASI, cProb, ansIndex, x;

						var addClassFunc = function( e ){
								$( e.target ).closest( "li.q-ol-li" ).addClass( settings.hoverClass );
						},
						removeClassFunc = function( e ){
							$( e.target ).closest( "li.q-ol-li" ).removeClass( settings.hoverClass );
						},
						clickFunc = function( e ){
							var qOL = $(e.target).closest("li.q-ol-li");
							qOL.addClass(settings.activeClass).siblings().removeClass(settings.activeClass).find(".q-radioBtn:checked").attr("checked", false);
							qOL.find(".q-radioBtn").attr("checked", true);
						};

					while (numOfQues--) {
						cProb = wList[numOfQues];
						optHtml = "";
						hasAnsPosition = false;
						cASI = cProb.ansSelInfo;
						cASI = ( cASI ) ? ( ( isArray( cASI ) ) ? cASI.concat() : [ cASI ] ) : undefined;
						if (hasAnsSel(iProp, numOfQues)) {
							val = [];
							if ( isArray( cProb.ansSel ) ) {
								var cAS = cProb.ansSel,
									k = cAS.length;

								while ( k-- ) {
									if (cAS[ k ] === null) {
										val[ k ] = cProb.ans;
										if( cASI ){
											cASI.splice( k, 1, cProb.ansInfo );
										}
										hasAnsPosition = true;
									} else {
										val[ k ] = cAS[k];
									}
								}
							} else {
								val[0] = cProb.ansSel;
							}
							if (!hasAnsPosition) {
								val[val.length] = cProb.ans;
								if( cASI ){
									cASI[ cASI.length ] = cProb.ansInfo;
								}
							}
							len = val.length;
							range = getNumRange( len );
							if( !hasAnsPosition ){
								makeArrayRandom( range );
								if( cASI ){
									cASI = getArrayOfSwappedArrayElements( cASI, range );
								}
							}
							while (len--) {
								ansSelChoice = getStrWithSeeableHTML( val[ range[ len ] ], toUni );
								if( cASI ){
									cASI[ len ] = getStrWithSeeableHTML( cASI[ len ], toUni );
								}
								x = (olVer) ? ["<li class = 'q-ol-li'><input type='radio' class='q-radioBtn'/><span class='q-ol-li-ansSel'>", ansSelChoice, "</span></li> "].join("") : ["<option>", ansSelChoice, "</option> "].join("");
								optHtml = x + optHtml;
							}
						} else {
							var randAns = wListRange.concat();
							// Get rids of the answer Index from randAns.
							randAns.splice(numOfQues, 1);

							len = setLen;
							ansPos = rNum(len);
							while (len--) {
								var randIndex = rNum(randAns.length),
								ansSelIndex = (len == ansPos) ? numOfQues: (randAns.splice(randIndex, 1) || 0);
								ansSelChoice = getStrWithSeeableHTML(wList[ansSelIndex].ans, toUni);
								x = (olVer) ? ["<li class = 'q-ol-li'><input type='radio' class='q-radioBtn'/><span class='q-ol-li-ansSel'>", ansSelChoice, "</span></li> "].join("") : ["<option>", ansSelChoice, "</option> "].join("");
								optHtml = x + optHtml;
							}
						}
						// below: innerHTML is 2x faster than $.html() but IE generates corrrupt option html
						if (isBadMSIE && !olVer) {
							$("select", d).html(optHtml);
						} else {
							$((olVer) ? ".q-ol": "select", d)[0].innerHTML = optHtml;
						}
						if (isBadMSIE && olVer) {
						//Fixes IE CSS BUG. No spaces with list-style-position: inline.
							$(".q-ol-li", d).prepend("&nbsp;");
						}
						if( olVer ){
							$( "li.q-ol-li", d ).bind( "click", clickFunc )
								.bind( "mouseover", addClassFunc )
								.bind( "mouseout", removeClassFunc );
						}
						q.retryCount[i] = cProb.retry || 0;
						q.ans[i] = cProb.ans;
						q.ansInfo[i] = cProb.ansInfo || "";
						q.ansSel[i] = d.clone(true);
						q.ansSelInfo[ i ] = ( cASI ) ? cASI.concat() : cASI;
						q.ques[i] = cProb.ques;
						i--;
					}
				},
				'multipleChoiceOl' : function( iProp ){
					// multipleChoiceOlQuiz: ques = ques, ansSel = ol [ <list> real ans + <list> * settings.multipleChooseLength]
					this.multipleChoice( iProp, true);
				}
			},
			// makeQuizRandom(): If randomizeQ is false, it will randomize the each quiz type.
			// But if randomizeQ is true, it will randomize the q object.
			makeQuizRandom = function( randomizeQ ){
				if( randomizeQ ){
					var numArr = getNumRange( totalQuesLen ), i = numArr.length,
						temp = { ans: [], ansSel: [], ansInfo: [], ques: [] }, nArrI, qAS;

					makeArrayRandom( numArr );
					i = numArr.length;

					while( i-- ){
						nArrI = numArr[ i ];
						qAS = q.ansSel[ nArrI ];

						temp.ans[i] = q.ans[ nArrI ];
						temp.ansInfo[i] = q.ansInfo[ nArrI ] || "";
						temp.ansSel[i] = ( typeof qAS !== "number" ) ? qAS : q.ansSel[ qAS ];
						temp.ques[i] = q.ques[ nArrI ];
					}
					q.ans = temp.ans.concat();
					q.ansInfo = temp.ansInfo.concat();
					q.ansSel = temp.ansSel.concat();
					q.ques = temp.ques.concat();
				}
				else{
					var iProp = q.prop.length;
					while( iProp-- ){
						makeArrayRandom( wordList[ q.prop[ iProp ] ] );
					}
				}
			},
			makeQuizType = function(){
			//iProp is a pointer to the quizType min and max index.
				var iProp = q.prop.length, currProp = "", p, allP = settings.allQuizType,
					shortProp = {
						fill:"fillInTheBlank", cards:"flashCard", tf:"trueOrFalse", multi:"multipleChoice", multiList:"multipleChoiceOl"
					};

				if( settings.random ){ makeQuizRandom();}
				while( iProp-- ){
					p = allP || q.prop[ iProp ];
					currProp = shortProp[ p ] || p;
					buildQuizType[ currProp ]( iProp );
				}
				if( settings.allRandom ){
					makeQuizRandom(true);
				}
			},
			// Creates and shows the new quiz.
			createNewQuizProb = function(){
				stats.reset();
				makeQuizType();
				changeQuizInfo();
				changeProb();
				animateThis( $( currQuiz ), 1, sendStatus );
			},
			quitQuiz = function(){
				currIndex = 0; //Used to make updateReviewIndex start at 0.
				quit = true;
				disableMenuBar();
				gameOver();
			},
			deleteQuiz = function(){
				animateThis( $( currQuiz ), 0, function(){
					$( currQuiz ).remove();
				});
				q = {};
			},
			setToBeginningView = function(){
				$( ".q-gameOver, .q-result, .q-review-menu", currQuiz).hide();
				$( ".q-ans, .q-help, .q-help-menu, .q-prob", currQuiz ).show();
				$( ".q-check-btn", currQuiz )[ ( settings.showFeedback)?"show":"hide"]().attr( "disabled", true );
				$( ".q-next-btn", currQuiz ).attr( "disabled", settings.showFeedback );
				$( ".q-quit-btn, .q-help-btn", currQuiz ).attr( "disabled", false );
			},
			reStartQuiz = function(){
				//IE likes to hide on restart.
				if( !isBadMSIE || ( isBadMSIE && settings.fxType == 3 ) ){
					animateThis( $( currQuiz ), 0 );
				}
				setToBeginningView();
				quit = false;
				currIndex = 0;
				createNewQuizProb();
			},
			setAnimation = function( s ){
				var spd = s.fxSpeed, spdType = { slow: 600, fast: 200, normal: 400 };

				s.fxSpeed = isNaN( spd ) ? ( spdType[ spd ] || 400 ) : spd;
				if( s.fxCode ){
					var custAnimatePos = animateType.length;
					animateType[ custAnimatePos ] = s.fxCode;
					s.fxType = custAnimatePos;
				}
			},
			checkAnsSelInfo = function( ansInfo, ansSel, ansSelInfo ){
				var a = isArray( ansSel ), b = isArray( ansSelInfo );

				if( ansInfo === undefined ){
					return lang.err.ansInfoNotDefined;
				}
				if( ( a || b ) && (a != b || ansSel.length !== ansSelInfo.length)){
					return lang.err.badAnsSelInfoLen;
				}
			},
			// checkQTypeKeys(): Checks the keys for each question, wordList[i]. Returns error if unknown.
			checkQTypeKeys = function( quesKeys ){
				var badKey = "", i = quesKeys.length, temp,
					validKeys = { ques:1, ans:1, ansInfo:1, ansSel:1, ansSelInfo:1, retry:1 };

				if( !i ){ badKey = lang.err.noQues; }
				while( i-- ){
					if( badKey ){ break;}
					temp = quesKeys[ i ];
					for( var currKey in temp ){
						if( temp.hasOwnProperty( currKey ) ){
							if( !validKeys[ currKey ] ){
								badKey = currKey + lang.err.badKey;
								break;
							}
							if( currKey == "ansSelInfo" ){
								badKey = checkAnsSelInfo( temp.ansInfo || undefined, temp.ansSel || undefined, temp.ansSelInfo );
								break;
							}
						}
					}
				}
				return badKey;
			},
			hasBadSyntax = function( wNames ){
				var badKey = "", goodKeys = [],
					validKeys = {
						fillInTheBlank:1, flashCard:1, trueOrFalse:1, multipleChoice:1, multipleChoiceOl:1,
						fill:1, cards:1, tf:1, multi:1, multiList:1
					};

				for( var prop in wNames ){
					if( wNames.hasOwnProperty( prop ) ){
						if( !validKeys[ prop ] ){
							badKey = lang.err[ ( typeof wNames === "object" ) ? "badQType" : "lang.err.notObj" ];
						}
						if( !badKey ){
							badKey = ( isArray( wNames[prop] ) ) ? checkQTypeKeys( wNames[prop] ) : lang.err.notArr;
						}
						if( badKey ){
							badKey = prop + " -> " + badKey;
							break;
						}
					}
				}

				if( !prop ){ badKey = lang.err.noQType; }
				if( !badKey && settings.allQuizType && !validKeys[ settings.allQuizType ] ){
					badKey = settings.allQuizType + " -> " + lang.err.badQType;
				}
				return badKey;
			},
			checkForErrors = function( obj ){
				var err = ( obj ) ? hasBadSyntax( obj ) : lang.err.noQues;
				if( err ){
					err = "jQuizMe " + lang.err.error + ": " + err;
					$( stickyEl ).text( err );
					throw new Error( err );
				}
			},
			convertArrToObj = function( obj ){
				var tempObj = {};
				tempObj[ settings.allQuizType || settings.quizType ] = obj;
				return tempObj;
			},
			// start(): This is the first function called.
			start = function(){
				wordList = ( isArray( wordList ) ) ? convertArrToObj( wordList ) : wordList;
				if( settings.performErrorChecking ){
					checkForErrors( wordList );
				}
				setAnimation( settings );
				q.prop = getObjProps( wordList );
				createQuizEl();
				createNewQuizProb();
				return currQuiz;
			}();	// Auto starts.
		});
	};


	$.fn.jQuizMe.version = "2.2.1";
})(jQuery);

/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function f(){e.trigger("closed.bs.alert").remove()}var c=a(this),d=c.attr("data-target");d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));var e=a(d);b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger(b=a.Event("close.bs.alert"));if(b.isDefaultPrevented())return;e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.one(a.support.transition.end,f).emulateTransitionEnd(150):f()};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){b=="loadingText"?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");c.prop("type")=="radio"&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f=typeof c=="object"&&c;e||d.data("bs.button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.pause=="hover"&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();if(b>this.$items.length-1||b<0)return;return this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){if(this.sliding)return;return this.slide("next")},b.prototype.prev=function(){if(this.sliding)return;return this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});this.$element.trigger(j);if(j.isDefaultPrevented())return;return this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(d.css("transition-duration").slice(0,-1)*1e3)):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),typeof c=="object"&&c),g=typeof c=="string"?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),typeof c=="number"?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),c.data()),g=c.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=c.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){function e(d){a(b).remove(),a(c).each(function(){var b=f(a(this)),c={relatedTarget:this};if(!b.hasClass("open"))return;b.trigger(d=a.Event("hide.bs.dropdown",c));if(d.isDefaultPrevented())return;b.removeClass("open").trigger("hidden.bs.dropdown",c)})}function f(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}"use strict";var b=".dropdown-backdrop",c="[data-toggle=dropdown]",d=function(b){a(b).on("click.bs.dropdown",this.toggle)};d.prototype.toggle=function(b){var c=a(this);if(c.is(".disabled, :disabled"))return;var d=f(c),g=d.hasClass("open");e();if(!g){"ontouchstart"in document.documentElement&&!d.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",e);var h={relatedTarget:this};d.trigger(b=a.Event("show.bs.dropdown",h));if(b.isDefaultPrevented())return;d.toggleClass("open").trigger("shown.bs.dropdown",h),c.focus()}return!1},d.prototype.keydown=function(b){if(!/(38|40|27)/.test(b.keyCode))return;var d=a(this);b.preventDefault(),b.stopPropagation();if(d.is(".disabled, :disabled"))return;var e=f(d),g=e.hasClass("open");if(!g||g&&b.keyCode==27)return b.which==27&&e.find(c).focus(),d.click();var h=" li:not(.divider):visible a",i=e.find("[role=menu]"+h+", [role=listbox]"+h);if(!i.length)return;var j=i.index(i.filter(":focus"));b.keyCode==38&&j>0&&j--,b.keyCode==40&&j<i.length-1&&j++,~j||(j=0),i.eq(j).focus()};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),e=c.data("bs.dropdown");e||c.data("bs.dropdown",e=new d(this)),typeof b=="string"&&e[b].call(c)})},a.fn.dropdown.Constructor=d,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",c,d.prototype.toggle).on("keydown.bs.dropdown.data-api",c+", [role=menu], [role=listbox]",d.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d);if(this.isShown||d.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)})},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b);if(!this.isShown||b.isDefaultPrevented())return;this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]!==a.target&&!this.$element.has(a.target).length&&this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){a.which==27&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){if(a.target!==a.currentTarget)return;this.options.backdrop=="static"?this.$element[0].focus.call(this.$element[0]):this.hide.call(this)},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in");if(!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),typeof c=="object"&&c);f||e.data("bs.modal",f=new b(this,g)),typeof c=="string"?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);var e=this.options.trigger.split(" ");for(var f=e.length;f--;){var g=e[f];if(g=="click")this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if(g!="manual"){var h=g=="hover"?"mouseenter":"focusin",i=g=="hover"?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);clearTimeout(c.timeout),c.hoverState="in";if(!c.options.delay||!c.options.delay.show)return c.show();c.timeout=setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show)},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);clearTimeout(c.timeout),c.hoverState="out";if(!c.options.delay||!c.options.delay.hide)return c.hide();c.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);if(b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e=typeof this.options.placement=="function"?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n=this.options.container=="body"?window.innerWidth:k.outerWidth(),o=this.options.container=="body"?window.innerHeight:k.outerHeight(),p=this.options.container=="body"?0:k.offset().left;e=e=="bottom"&&h.top+h.height+j-m>o?"top":e=="top"&&h.top-m-j<0?"bottom":e=="right"&&h.right+i>n?"left":e=="left"&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;c=="top"&&k!=g&&(d=!0,b.top=b.top+g-k);if(/bottom|top/.test(c)){var l=0;b.left<0&&(l=b.left*-2,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function e(){b.hoverState!="in"&&c.detach(),b.$element.trigger("hidden.bs."+b.type)}var b=this,c=this.tip(),d=a.Event("hide.bs."+this.type);this.$element.trigger(d);if(d.isDefaultPrevented())return;return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?c.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),this.hoverState=null,this},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},typeof b.getBoundingClientRect=="function"?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return a=="bottom"?{top:b.top+b.height,left:b.left+b.width/2-c/2}:a=="top"?{top:b.top-d,left:b.left+b.width/2-c/2}:a=="left"?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f=typeof c=="object"&&c;if(!e&&c=="destroy")return;e||d.data("bs.tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?typeof c=="string"?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||(typeof b.content=="function"?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f=typeof c=="object"&&c;if(!e&&c=="destroy")return;e||d.data("bs.popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});b.trigger(f);if(f.isDefaultPrevented())return;var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})},b.prototype.activate=function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g).emulateTransitionEnd(150):g(),e.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;this.affixed=="top"&&(e.top+=d),typeof f!="object"&&(h=g=f),typeof g=="function"&&(g=f.top(this.$element)),typeof h=="function"&&(h=f.bottom(this.$element));var i=this.unpin!=null&&d+this.unpin<=e.top?!1:h!=null&&e.top+this.$element.height()>=c-h?"bottom":g!=null&&d<=g?"top":!1;if(this.affixed===i)return;this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k);if(k.isDefaultPrevented())return;this.affixed=i,this.unpin=i=="bottom"?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),i=="bottom"&&this.$element.offset({top:c-h-this.$element.height()})};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f=typeof c=="object"&&c;e||d.data("bs.affix",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(this.transitioning||this.$element.hasClass("in"))return;var b=a.Event("show.bs.collapse");this.$element.trigger(b);if(b.isDefaultPrevented())return;var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])},b.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass("in"))return;var b=a.Event("hide.bs.collapse");this.$element.trigger(b);if(b.isDefaultPrevented())return;var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};if(!a.support.transition)return d.call(this);this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350)},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),typeof c=="object"&&c);!e&&f.toggle&&c=="show"&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":c.data(),i=c.attr("data-parent"),j=i&&a(i);if(!g||!g.transitioning)j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(c).addClass("collapsed"),c[f.hasClass("in")?"addClass":"removeClass"]("collapsed");f.collapse(h)})}(jQuery),+function(a){function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}"use strict",b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);var c=this,d=this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})},b.prototype.process=function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,c=b-this.$scrollElement.height(),d=this.offsets,e=this.targets,f=this.activeTarget,g;if(a>=c)return f!=(g=e.last()[0])&&this.activate(g);if(f&&a<=d[0])return f!=(g=e[0])&&this.activate(g);for(g=d.length;g--;)f!=e[g]&&a>=d[g]&&(!d[g+1]||a<=d[g+1])&&this.activate(e[g])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f=typeof c=="object"&&c;e||d.data("bs.scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(a.style[c]!==undefined)return{end:b[c]};return!1}"use strict",a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery)

$(document).ready(function(){

	$( "#quizArea" ).delegate( ".q-ol-li", "click", function(e){
		var $checkBtn = $(e.target).parent().parent().parent().parent().parent().find( ".q-check-btn" );
		$(".q-next-btn").show();
		$checkBtn.click();
		var rightimages = ['1.jpg', '2.jpg', '3.jpg','4.jpg','5.jpg','6.jpg'];
		var wrongimages = ['1.jpg', '2.jpg', '3.jpg','4.jpg','5.jpg'];
		$('.q-probArea #right').css({'background-image': 'url(img/right/' + rightimages[Math.floor(Math.random() * rightimages.length)] + ')'});
		$('.q-probArea #wrong').css({'background-image': 'url(img/wrong/' + wrongimages[Math.floor(Math.random() * wrongimages.length)] + ')'});
	});

	$( "#quizArea" ).delegate( ".q-next-btn", "click", function(e){
		$(".q-next-btn").hide();
			ga('send', 'event', 'game', 'click', 'next', 1);
	});

	$( "#quizArea" ).delegate( ".helpButton", "click", function(e){
		$( ".help" ).fadeIn( "fast" );
			ga('send', 'event', 'game', 'click', 'got_help', 1);
			$( "#help_button" ).click();
	});

	$(".close").click(function(){
		$( ".help" ).fadeOut( "fast" );
	});


	$(".close").click(function(){
		$( ".help" ).fadeOut( "fast" );
	});

	$("#game_sounds").jPlayer({
		ready: function () {
			$(this).jPlayer();
		},
		swfPath: "js",supplied: "m4a, oga"
	});

	$('#playGame').click(function() {
		$('#frameOne').hide();
  		$('#frameTwo').show();
	});

	$('#playGameButton').on('click', function() {
  		ga('send', 'event', 'game', 'click', 'start_game', 1);
	});

	$('.fancybox').fancybox();
//ANIMATIONS //
	zoom = function(){
		$("h3").letterfx({"fx":"fall","words":true,"timing":175});
		$("h2.small").letterfx({"fx":"smear","letter_end":"rewind","timing":50});
	};



//SOCIAL MEDIA //

//*Twitter * //

//* Facebook *//
	shareFB = function(){
		FB.ui(
	   {
     	method: 'feed',
     	name: 'Llama Or Alpaca',
     	link: 'http://developers.facebook.com/docs/reference/dialogs/',
     	picture: 'http://www.llamaoralpaca.com/img/logo.png',
     	caption: 'Llama or Alpaca is a fun way to see if you know which is which.',
     	description: 'I scored ' + percentage + ' on the game.',
     	message: 'I scored ' + percentage + ' on the game.'
   		}
		);
	};


/*$.fn.halloweenBats({});*/



});
