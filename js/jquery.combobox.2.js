/*!
 * jQuery UI 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
/*
 * jQuery UI 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui||(function(a){a.ui={version:"1.8",plugin:{add:function(c,d,f){var e=a.ui[c].prototype;for(var b in f){e.plugins[b]=e.plugins[b]||[];e.plugins[b].push([d,f[b]])}},call:function(b,d,c){var f=b.plugins[d];if(!f||!b.element[0].parentNode){return}for(var e=0;e<f.length;e++){if(b.options[f[e][0]]){f[e][1].apply(b.element,c)}}}},contains:function(d,c){return document.compareDocumentPosition?d.compareDocumentPosition(c)&16:d!==c&&d.contains(c)},hasScroll:function(e,c){if(a(e).css("overflow")=="hidden"){return false}var b=(c&&c=="left")?"scrollLeft":"scrollTop",d=false;if(e[b]>0){return true}e[b]=1;d=(e[b]>0);e[b]=0;return d},isOverAxis:function(c,b,d){return(c>b)&&(c<(b+d))},isOver:function(g,c,f,e,b,d){return a.ui.isOverAxis(g,f,b)&&a.ui.isOverAxis(c,e,d)},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};a.fn.extend({_focus:a.fn.focus,focus:function(b,c){return typeof b==="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus();(c&&c.call(d))},b)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false})},scrollParent:function(){var b;if((a.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){b=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(a.curCSS(this,"position",1))&&(/(auto|scroll)/).test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0)}else{b=this.parents().filter(function(){return(/(auto|scroll)/).test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0)}return(/fixed/).test(this.css("position"))||!b.length?a(document):b},zIndex:function(e){if(e!==undefined){return this.css("zIndex",e)}if(this.length){var c=a(this[0]),b,d;while(c.length&&c[0]!==document){b=c.css("position");if(b=="absolute"||b=="relative"||b=="fixed"){d=parseInt(c.css("zIndex"));if(!isNaN(d)&&d!=0){return d}}c=c.parent()}}return 0}});a.extend(a.expr[":"],{data:function(d,c,b){return !!a.data(d,b[3])},focusable:function(c){var d=c.nodeName.toLowerCase(),b=a.attr(c,"tabindex");return(/input|select|textarea|button|object/.test(d)?!c.disabled:"a"==d||"area"==d?c.href||!isNaN(b):!isNaN(b))&&!a(c)["area"==d?"parents":"closest"](":hidden").length},tabbable:function(c){var b=a.attr(c,"tabindex");return(isNaN(b)||b>=0)&&a(c).is(":focusable")}})})(jQuery);

/*!
 * jQuery UI Widget 1.8.1
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b){var j=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add(this).each(function(){b(this).triggerHandler("remove")});return j.call(b(this),a,c)})};b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend({},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.substring(0,1)==="_")return h;e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==undefined){h=i;return false}}):this.each(function(){var g=b.data(this,a);if(g){d&&g.option(d);g._init()}else b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){this.element=b(c).data(this.widgetName,this);this.options=b.extend(true,{},this.options,b.metadata&&b.metadata.get(c)[this.widgetName],a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,c){var d=a,e=this;if(arguments.length===0)return b.extend({},e.options);if(typeof a==="string"){if(c===undefined)return this.options[a];d={};d[a]=c}b.each(d,function(f,h){e._setOption(f,h)});return e},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);

/*
 * jQuery UI Position 1.8.1
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var m=/left|center|right/,n=/top|center|bottom/,p=c.fn.position,q=c.fn.offset;c.fn.position=function(a){if(!a||!a.of)return p.apply(this,arguments);a=c.extend({},a);var b=c(a.of),d=(a.collision||"flip").split(" "),e=a.offset?a.offset.split(" "):[0,0],g,h,i;if(a.of.nodeType===9){g=b.width();h=b.height();i={top:0,left:0}}else if(a.of.scrollTo&&a.of.document){g=b.width();h=b.height();i={top:b.scrollTop(),left:b.scrollLeft()}}else if(a.of.preventDefault){a.at="left top";g=h=0;i={top:a.of.pageY,left:a.of.pageX}}else{g=b.outerWidth();h=b.outerHeight();i=b.offset()}c.each(["my","at"],function(){var f=(a[this]||"").split(" ");if(f.length===1)f=m.test(f[0])?f.concat(["center"]):n.test(f[0])?["center"].concat(f):["center","center"];f[0]=m.test(f[0])?f[0]:"center";f[1]=n.test(f[1])?f[1]:"center";a[this]=f});if(d.length===1)d[1]=d[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(a.at[0]==="right")i.left+=g;else if(a.at[0]==="center")i.left+=g/2;if(a.at[1]==="bottom")i.top+=h;else if(a.at[1]==="center")i.top+=h/2;i.left+=e[0];i.top+=e[1];return this.each(function(){var f=c(this),k=f.outerWidth(),l=f.outerHeight(),j=c.extend({},i);if(a.my[0]==="right")j.left-=k;else if(a.my[0]==="center")j.left-=k/2;if(a.my[1]==="bottom")j.top-=l;else if(a.my[1]==="center")j.top-=l/2;j.left=parseInt(j.left);j.top=parseInt(j.top);c.each(["left","top"],function(o,r){c.ui.position[d[o]]&&c.ui.position[d[o]][r](j,{targetWidth:g,targetHeight:h,elemWidth:k,elemHeight:l,offset:e,my:a.my,at:a.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(j,{using:a.using}))})};c.ui.position={fit:{left:function(a,b){var d=c(window);b=a.left+b.elemWidth-d.width()-d.scrollLeft();a.left=b>0?a.left-b:Math.max(0,a.left)},top:function(a,b){var d=c(window);b=a.top+b.elemHeight-d.height()-d.scrollTop();a.top=b>0?a.top-b:Math.max(0,a.top)}},flip:{left:function(a,b){if(b.at[0]!=="center"){var d=c(window);d=a.left+b.elemWidth-d.width()-d.scrollLeft();var e=b.my[0]==="left"?-b.elemWidth:b.my[0]==="right"?b.elemWidth:0,g=-2*b.offset[0];a.left+=a.left<0?e+b.targetWidth+g:d>0?e-b.targetWidth+g:0}},top:function(a,b){if(b.at[1]!=="center"){var d=c(window);d=a.top+b.elemHeight-d.height()-d.scrollTop();var e=b.my[1]==="top"?-b.elemHeight:b.my[1]==="bottom"?b.elemHeight:0,g=b.at[1]==="top"?b.targetHeight:-b.targetHeight,h=-2*b.offset[1];a.top+=a.top<0?e+b.targetHeight+h:d>0?e+g+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(a,b){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var d=c(a),e=d.offset(),g=parseInt(c.curCSS(a,"top",true),10)||0,h=parseInt(c.curCSS(a,"left",true),10)||0;e={top:b.top-e.top+g,left:b.left-e.left+h};"using"in b?b.using.call(a,e):d.css(e)};c.fn.offset=function(a){var b=this[0];if(!b||!b.ownerDocument)return null;if(a)return this.each(function(){c.offset.setOffset(this,a)});return q.call(this)}}})(jQuery);

/*
 * jQuery UI Button 1.8.1
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *      jquery.ui.core.js
 *      jquery.ui.widget.js
 */
(function(a){var g,i=function(b){a(":ui-button",b.target.form).each(function(){var c=a(this).data("button");setTimeout(function(){c.refresh()},1)})},h=function(b){var c=b.name,d=b.form,e=a([]);if(c)e=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form});return e};a.widget("ui.button",{options:{text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",i);this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var b=this,c=this.options,d=this.type==="checkbox"||this.type==="radio",e="ui-state-hover"+(!d?" ui-state-active":"");if(c.label===null)c.label=this.buttonElement.html();if(this.element.is(":disabled"))c.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){if(!c.disabled){a(this).addClass("ui-state-hover");this===g&&a(this).addClass("ui-state-active")}}).bind("mouseleave.button",function(){c.disabled||a(this).removeClass(e)}).bind("focus.button",function(){a(this).addClass("ui-state-focus")}).bind("blur.button",function(){a(this).removeClass("ui-state-focus")});d&&this.element.bind("change.button",function(){b.refresh()});if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).toggleClass("ui-state-active");b.buttonElement.attr("aria-pressed",b.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");b.buttonElement.attr("aria-pressed",true);var f=b.element[0];h(f).not(f).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed",false)});else{this.buttonElement.bind("mousedown.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");g=this;a(document).one("mouseup",function(){g=null})}).bind("mouseup.button",function(){if(c.disabled)return false;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(f){if(c.disabled)return false;if(f.keyCode==a.ui.keyCode.SPACE||f.keyCode==a.ui.keyCode.ENTER)a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(f){f.keyCode===a.ui.keyCode.SPACE&&a(this).click()})}this._setOption("disabled",c.disabled)},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type==="radio"){this.buttonElement=this.element.parents().last().find("[for="+this.element.attr("id")+"]");this.element.addClass("ui-helper-hidden-accessible");var b=this.element.is(":checked");b&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",b)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());this.hasTitle||this.buttonElement.removeAttr("title");a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled")c?this.element.attr("disabled",true):this.element.removeAttr("disabled");this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b);if(this.type==="radio")h(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed",true):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement,c=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary;if(d.primary||d.secondary){b.addClass("ui-button-text-icon"+(e?"s":""));d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>");d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>");if(!this.options.text){b.addClass(e?"ui-button-icons-only":"ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon");this.hasTitle||b.attr("title",c)}}else b.addClass("ui-button-text-only")}}});a.widget("ui.buttonset",{_create:function(){this.element.addClass("ui-buttonset");this._init()},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){this.buttons=this.element.find(":button, :submit, :reset, :checkbox, :radio, a, :data(button)").filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()},destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");a.Widget.prototype.destroy.call(this)}})})(jQuery);

/*
 * jQuery Tooltip
 */
(function($){$.fn.tooltip=function(options){return this.each(function(){new $.tooltip(this,options)});};$.tooltip=function(el,options){this.el=$(el).get(0);this.options={inner:false};this.options=$.extend(options);this.props={classes:{overState:"on",hidden:"hide"},initial:true};this.elems={};this.init();}
$.tooltip.fn=$.tooltip.prototype={};$.tooltip.fn.extend=$.tooltip.extend=jQuery.extend;$.tooltip.fn.extend({init:function(){this.cacheElems();this.assignHandlers();},cacheElems:function(){this.elems.$toolTip=$(this.el);this.elems.$toolTipText=$("span:eq(0)",this.el);this.elems.$toolTipRel=$(this.el).attr("rel");},assignHandlers:function(){var that=this;this.elems.$toolTip.mouseenter(function(event){if(typeof that.elems.$toolTipRel!=='undefined'&&$(this).find("span.thistip").length==0){$(that.elems.$toolTipRel).clone().prependTo($(this)).wrap('<span class="thistip" />')}
if(typeof that.elems.$toolTipRel!=='undefined'){that.elems.$toolTipText=$("span:eq(0)",this);}
that.sizeIt(that);that.showTip(that);that.props.initial=false;event.stopPropagation();event.stopImmediatePropagation();});this.elems.$toolTip.mouseleave(function(event){that.hideTip(that);});},sizeIt:function(that){if(typeof that.elems.$toolTipRel=='undefined'){var height=this.elems.$toolTipText.height();if(that.props.initial){this.elems.$toolTipText.height(height/4);}
else{this.elems.$toolTipText.height(height);}}},showTip:function(that){this.elems.$toolTipText.addClass(this.props.classes.overState);},hideTip:function(that){this.elems.$toolTipText.removeClass(this.props.classes.overState);}});})(jQuery);

/*
 * jQuery Combobox
 */
(function(e,t){function n(t){return!e(t).parents().andSelf().filter(function(){return e.curCSS(this,"visibility")==="hidden"||e.expr.filters.hidden(this)}).length}e.ui=e.ui||{};if(e.ui.version)return;e.extend(e.ui,{version:"1.8.4",plugin:{add:function(t,n,r){var i=e.ui[t].prototype;for(var s in r){i.plugins[s]=i.plugins[s]||[];i.plugins[s].push([n,r[s]])}},call:function(e,t,n){var r=e.plugins[t];if(!r||!e.element[0].parentNode)return;for(var i=0;i<r.length;i++)if(e.options[r[i][0]])r[i][1].apply(e.element,
n)}},contains:function(e,t){return document.compareDocumentPosition?e.compareDocumentPosition(t)&16:e!==t&&e.contains(t)},hasScroll:function(t,n){if(e(t).css("overflow")==="hidden")return false;var r=n&&n==="left"?"scrollLeft":"scrollTop",i=false;if(t[r]>0)return true;t[r]=1;i=t[r]>0;t[r]=0;return i},isOverAxis:function(e,t,n){return e>t&&e<t+n},isOver:function(t,n,r,i,s,o){return e.ui.isOverAxis(t,r,s)&&e.ui.isOverAxis(n,i,o)},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,
COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});e.fn.extend({_focus:e.fn.focus,focus:function(t,n){return typeof t==="number"?this.each(function(){var r=this;setTimeout(function(){e(r).focus();if(n)n.call(r)},t)}):this._focus.apply(this,arguments)},
enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none")},scrollParent:function(){var t;if(e.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position")))t=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.curCSS(this,"position",1))&&/(auto|scroll)/.test(e.curCSS(this,"overflow",1)+e.curCSS(this,"overflow-y",
1)+e.curCSS(this,"overflow-x",1))}).eq(0);else t=this.parents().filter(function(){return/(auto|scroll)/.test(e.curCSS(this,"overflow",1)+e.curCSS(this,"overflow-y",1)+e.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(n){if(n!==t)return this.css("zIndex",n);if(this.length){var r=e(this[0]),i,s;while(r.length&&r[0]!==document){i=r.css("position");if(i==="absolute"||i==="relative"||i==="fixed"){s=parseInt(r.css("zIndex"));if(!isNaN(s)&&
s!=0)return s}r=r.parent()}}return 0}});e.each(["Width","Height"],function(n,r){function u(t,n,r,s){e.each(i,function(){n-=parseFloat(e.curCSS(t,"padding"+this,true))||0;if(r)n-=parseFloat(e.curCSS(t,"border"+this+"Width",true))||0;if(s)n-=parseFloat(e.curCSS(t,"margin"+this,true))||0});return n}var i=r==="Width"?["Left","Right"]:["Top","Bottom"],s=r.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){if(n===
t)return o["inner"+r].call(this);return this.each(function(){e.style(this,s,u(this,n)+"px")})};e.fn["outer"+r]=function(t,n){if(typeof t!=="number")return o["outer"+r].call(this,t);return this.each(function(){e.style(this,s,u(this,t,true,n)+"px")})}});e.extend(e.expr[":"],{data:function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){var r=t.nodeName.toLowerCase(),i=e.attr(t,"tabindex");if("area"===r){var s=t.parentNode,o=s.name,u;if(!t.href||!o||s.nodeName.toLowerCase()!=="map")return false;
u=e("img[usemap=#"+o+"]")[0];return!!u&&n(u)}return(/input|select|textarea|button|object/.test(r)?!t.disabled:"a"==r?t.href||!isNaN(i):!isNaN(i))&&n(t)},tabbable:function(t){var n=e.attr(t,"tabindex");return(isNaN(n)||n>=0)&&e(t).is(":focusable")}})})(jQuery);
(function(e,t){var n=e.fn.remove;e.fn.remove=function(t,r){return this.each(function(){if(!r)if(!t||e.filter(t,[this]).length)e("*",this).add([this]).each(function(){e(this).triggerHandler("remove")});return n.call(e(this),t,r)})};e.widget=function(t,n,r){var i=t.split(".")[0],s;t=t.split(".")[1];s=i+"-"+t;if(!r){r=n;n=e.Widget}e.expr[":"][s]=function(n){return!!e.data(n,t)};e[i]=e[i]||{};e[i][t]=function(e,t){if(arguments.length)this._createWidget(e,t)};var o=new n;o.options=e.extend(true,{},o.options);
e[i][t].prototype=e.extend(true,o,{namespace:i,widgetName:t,widgetEventPrefix:e[i][t].prototype.widgetEventPrefix||t,widgetBaseClass:s},r);e.widget.bridge(t,e[i][t])};e.widget.bridge=function(n,r){e.fn[n]=function(i){var s=typeof i==="string",o=Array.prototype.slice.call(arguments,1),u=this;i=!s&&o.length?e.extend.apply(null,[true,i].concat(o)):i;if(s&&i.substring(0,1)==="_")return u;if(s)this.each(function(){var r=e.data(this,n),s=r&&e.isFunction(r[i])?r[i].apply(r,o):r;if(s!==r&&s!==t){u=s;return false}});
else this.each(function(){var t=e.data(this,n);if(t){if(i)t.option(i);t._init()}else e.data(this,n,new r(i,this))});return u}};e.Widget=function(e,t){if(arguments.length)this._createWidget(e,t)};e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(t,n){e.data(n,this.widgetName,this);this.element=e(n);this.options=e.extend(true,{},this.options,e.metadata&&e.metadata.get(n)[this.widgetName],t);var r=this;this.element.bind("remove."+this.widgetName,
function(){r.destroy()});this._create();this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(n,r){var i=n,s=this;if(arguments.length===0)return e.extend({},s.options);if(typeof n==="string"){if(r===t)return this.options[n];
i={};i[n]=r}e.each(i,function(e,t){s._setOption(e,t)});return s},_setOption:function(e,t){this.options[e]=t;if(e==="disabled")this.widget()[t?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",t);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(t,n,r){var i=this.options[t];n=e.Event(n);n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+
t).toLowerCase();r=r||{};if(n.originalEvent)for(var s=e.event.props.length,o;s;){o=e.event.props[--s];n[o]=n.originalEvent[o]}this.element.trigger(n,r);return!(e.isFunction(i)&&i.call(this.element[0],n,r)===false||n.isDefaultPrevented())}}})(jQuery);
(function(e,t){e.widget("ui.autocomplete",{options:{appendTo:"body",delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},_create:function(){var t=this,n=this.element[0].ownerDocument;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(n){if(t.options.disabled)return;var r=e.ui.keyCode;switch(n.keyCode){case r.PAGE_UP:t._move("previousPage",
n);break;case r.PAGE_DOWN:t._move("nextPage",n);break;case r.UP:t._move("previous",n);n.preventDefault();break;case r.DOWN:t._move("next",n);n.preventDefault();break;case r.ENTER:case r.NUMPAD_ENTER:if(t.menu.element.is(":visible"))n.preventDefault();case r.TAB:if(!t.menu.active)return;t.menu.select(n);break;case r.ESCAPE:t.element.val(t.term);t.close(n);break;default:clearTimeout(t.searching);t.searching=setTimeout(function(){if(t.term!=t.element.val()){t.selectedItem=null;t.search(null,n)}},t.options.delay);
break}}).bind("focus.autocomplete",function(){if(t.options.disabled)return;t.selectedItem=null;t.previous=t.element.val()}).bind("blur.autocomplete",function(e){if(t.options.disabled)return;clearTimeout(t.searching);t.closing=setTimeout(function(){t.close(e);t._change(e)},150)});this._initSource();this.response=function(){return t._response.apply(t,arguments)};this.menu=e("<ul></ul>").addClass("ui-autocomplete").appendTo(e(this.options.appendTo||"body",n)[0]).mousedown(function(n){var r=t.menu.element[0];
if(n.target===r)setTimeout(function(){e(document).one("mousedown",function(n){if(n.target!==t.element[0]&&n.target!==r&&!e.ui.contains(r,n.target))t.close()})},1);setTimeout(function(){clearTimeout(t.closing)},13)}).menu({focus:function(e,n){var r=n.item.data("item.autocomplete");if(false!==t._trigger("focus",null,{item:r}))if(/^key/.test(e.originalEvent.type))t.element.val(r.value)},selected:function(e,r){var i=r.item.data("item.autocomplete"),s=t.previous;if(t.element[0]!==n.activeElement){t.element.focus();
t.previous=s}if(false!==t._trigger("select",e,{item:i}))t.element.val(i.value);t.close(e);t.selectedItem=i},blur:function(e,n){if(t.menu.element.is(":visible")&&t.element.val()!==t.term)t.element.val(t.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");if(e.fn.bgiframe)this.menu.element.bgiframe()},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
this.menu.element.remove();e.Widget.prototype.destroy.call(this)},_setOption:function(t,n){e.Widget.prototype._setOption.apply(this,arguments);if(t==="source")this._initSource();if(t==="appendTo")this.menu.element.appendTo(e(n||"body",this.element[0].ownerDocument)[0])},_initSource:function(){var t,n;if(e.isArray(this.options.source)){t=this.options.source;this.source=function(n,r){r(e.ui.autocomplete.filter(t,n.term))}}else if(typeof this.options.source==="string"){n=this.options.source;this.source=
function(t,r){e.getJSON(n,t,r)}}else this.source=this.options.source},search:function(e,t){e=e!=null?e:this.element.val();if(e.length<this.options.minLength)return this.close(t);clearTimeout(this.closing);if(this._trigger("search")===false)return;return this._search(e)},_search:function(e){this.term=this.element.addClass("ui-autocomplete-loading").val();this.source({term:e},this.response)},_response:function(e){if(e.length){e=this._normalize(e);this._suggest(e);this._trigger("open")}else this.close();
this.element.removeClass("ui-autocomplete-loading")},close:function(e){clearTimeout(this.closing);if(this.menu.element.is(":visible")){this._trigger("close",e);this.menu.element.hide();this.menu.deactivate()}},_change:function(e){if(this.previous!==this.element.val())this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){if(t.length&&t[0].label&&t[0].value)return t;return e.map(t,function(t){if(typeof t==="string")return{label:t,value:t};return e.extend({label:t.label||t.value,
value:t.value||t.label},t)})},_suggest:function(t){var n=this.menu.element.empty().zIndex(this.element.zIndex()+1),r,i;this._renderMenu(n,t);this.menu.deactivate();this.menu.refresh();this.menu.element.show().position(e.extend({of:this.element},this.options.position));r=n.width("").outerWidth();i=this.element.outerWidth();n.outerWidth(Math.max(r,i))},_renderMenu:function(t,n){var r=this;e.each(n,function(e,n){r._renderItem(t,n)})},_renderItem:function(t,n){return e("<li></li>").data("item.autocomplete",
n).append(e("<a></a>").text(n.label)).appendTo(t)},_move:function(e,t){if(!this.menu.element.is(":visible")){this.search(null,t);return}if(this.menu.first()&&/^previous/.test(e)||this.menu.last()&&/^next/.test(e)){this.element.val(this.term);this.menu.deactivate();return}this.menu[e](t)},widget:function(){return this.menu.element}});e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(t,n){var r=new RegExp(e.ui.autocomplete.escapeRegex(n),
"i");return e.grep(t,function(e){return r.test(e.label||e.value||e)})}})})(jQuery);
(function(e){e.widget("ui.menu",{_create:function(){var t=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(n){if(!e(n.target).closest(".ui-menu-item a").length)return;n.preventDefault();t.select(n)});this.refresh()},refresh:function(){var t=this;var n=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");n.children("a").addClass("ui-corner-all").attr("tabindex",
-1).mouseenter(function(n){t.activate(n,e(this).parent())}).mouseleave(function(){t.deactivate()})},activate:function(e,t){this.deactivate();if(this.hasScroll()){var n=t.offset().top-this.element.offset().top,r=this.element.attr("scrollTop"),i=this.element.height();if(n<0)this.element.attr("scrollTop",r+n);else if(n>i)this.element.attr("scrollTop",r+n-i+t.height())}this.active=t.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();this._trigger("focus",e,{item:t})},
deactivate:function(){if(!this.active)return;this.active.children("a").removeClass("ui-state-hover").removeAttr("id");this._trigger("blur");this.active=null},next:function(e){this.move("next",".ui-menu-item:first",e)},previous:function(e){this.move("prev",".ui-menu-item:last",e)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(e,t,n){if(!this.active){this.activate(n,this.element.children(t));
return}var r=this.active[e+"All"](".ui-menu-item").eq(0);if(r.length)this.activate(n,r);else this.activate(n,this.element.children(t))},nextPage:function(t){if(this.hasScroll()){if(!this.active||this.last()){this.activate(t,this.element.children(":first"));return}var n=this.active.offset().top,r=this.element.height(),i=this.element.children("li").filter(function(){var t=e(this).offset().top-n-r+e(this).height();return t<10&&t>-10});if(!i.length)i=this.element.children(":last");this.activate(t,i)}else this.activate(t,
this.element.children(!this.active||this.last()?":first":":last"))},previousPage:function(t){if(this.hasScroll()){if(!this.active||this.first()){this.activate(t,this.element.children(":last"));return}var n=this.active.offset().top,r=this.element.height();result=this.element.children("li").filter(function(){var t=e(this).offset().top-n+r-e(this).height();return t<10&&t>-10});if(!result.length)result=this.element.children(":first");this.activate(t,result)}else this.activate(t,this.element.children(!this.active||
this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element.attr("scrollHeight")},select:function(e){this._trigger("selected",e,{item:this.active})}})})(jQuery);
(function($){$.widget("ui.combobox",{options:{selectCallback:null},_create:function(){var input,that=this,select=this.element.hide(),selected=select.children(":selected"),value=selected.val()?selected.text():"",wrapper=this.wrapper=$("<span>").addClass("ui-combobox").insertAfter(select);function removeIfInvalid(element){var value=$(element).val(),matcher=new RegExp("^"+$.ui.autocomplete.escapeRegex(value)+"$","i"),valid=false;select.children("option").each(function(){if($(this).text().match(matcher)){this.selected=
valid=true;return false}});if(!valid){$(element).val("").attr("title",value+" didn't match any item").tooltip("open");select.val("");setTimeout(function(){input.tooltip("close").attr("title","")},2500);input.data("autocomplete").term="";return false}}input=$("<input>").appendTo(wrapper).val(value).attr("title","").attr("placeholder",that.options.placeholder).addClass("ui-state-default ui-combobox-input").autocomplete({delay:0,minLength:0,source:function(request,response){var matcher=new RegExp($.ui.autocomplete.escapeRegex(request.term),
"i");response(select.children("option").map(function(){var text=$(this).text();if(this.value&&(!request.term||matcher.test(text)))return{label:text.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+$.ui.autocomplete.escapeRegex(request.term)+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>"),value:text,option:this}}))},select:function(event,ui){ui.item.option.selected=true;that._trigger("selected",event,{item:ui.item.option});var fn=that.options.selectCallback;if(typeof fn==="function")fn(ui.item)},
change:function(event,ui){if(!ui.item)return removeIfInvalid(this)}}).addClass("ui-widget ui-widget-content ui-corner-left");input.data("autocomplete")._renderItem=function(ul,item){return $("<li>").data("item.autocomplete",item).append("<a>"+item.label+"</a>").appendTo(ul)};$("<a>").attr("tabIndex",-1).attr("title","Show All Items").tooltip().appendTo(wrapper).button({icons:{primary:"ui-icon-triangle-1-s"},text:false}).removeClass("ui-corner-all").addClass("ui-corner-right ui-combobox-toggle").click(function(){if(input.autocomplete("widget").is(":visible")){input.autocomplete("close");
removeIfInvalid(input);return}$(this).blur();input.autocomplete("search","");input.focus()});input.tooltip({position:{of:this.button},tooltipClass:"ui-state-highlight"});var width=$(this.element).next('.ui-combobox').outerWidth()-2;$("body").append("<style>body .ui-autocomplete.ui-widget-content { width:"+width+"px }</style>")},destroy:function(){this.wrapper.remove();this.element.show();$.Widget.prototype.destroy.call(this)}})})(jQuery);