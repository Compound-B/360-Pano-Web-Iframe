TWP.Module=TWP.Module||{};(function(a){TWP.Module.DataTable=function(i){var f=i;f.type=i.type?i.type:"data-table";if(f.type==="simple-timeline"||f.type==="profile-list"){ich.grabTemplates()}var h=function(){if(f.gdoc_id){e()}else{if(f.sortable){d()}}},e=function(){var j=typeof f.cache==="boolean"?f.cache:true;SimpleTable.init({key:f.gdoc_id,cached:j,callback:c})},d=function(){var j=typeof f.sortable==="object"?f.sortable:{};$("#"+f.container).addClass("sortable").tablesorter(j)},c=function(j){b(j)},b=function(l){var k=$("#"+f.container);k.addClass(f.type);if(f.type==="simple-timeline"||f.type==="profile-list"){k.html('<div class="body"></div>')}else{if(f.headers===false){k.append('<tbody class="body"></tbody>')}else{k.html('<thead></thead><tbody class="body"></tbody>')}}var j=k.find(".body");$.each(l,function(t,A){var q=t%2==0?"odd":"";if(t===0&&f.headers!=false){var x=k.children("thead");var u=["<tr>"];for(var r in A){var o=r.substr(0,1)!=="_"?g(r):"";u.push('<th class="'+r+'-cell">'+o+"</th>")}u.push("</tr>");x.append(u.join(""))}if(f.type==="simple-timeline"){var p=!isNaN(Number(A.imagesize))?"width:"+Number(Number(A.imagesize)+4)+"px":"";var n="";if(A.image&&A.imagesize){n=A.imagesize+"-img"}else{n="no-display"}var y=[];for(var r in A){if(r.indexOf("linkheadline")!==-1&&A[r]!==""){var m=A[r.replace("headline","url")];y.push('<li><a href="'+m+'">'+A[r]+"</a></li>")}}A.row_class=q;A.img_class=n;A.img_src=A.image;A.img_w=p;A.img_caption=A.imagecaption;A.hed=A.headline;A.ul=y.join("");var w=ich.vTimeRow(A);j.append(w);var v=j.find(".t-row:last");if(A.imagesize==="large"){var s=v.find(".image");v.find(".content").append(s)}}else{if(f.type==="profile-list"){var A=ich.profileRow(A);j.append(A)}else{var z=['<tr class="'+q+'">'];for(var r in A){z.push('<td class="'+r+'-cell">'+A[r]+"</td>")}z.push("</tr>");j.append(z.join(""))}}});if(typeof mobile_browser!=="undefined"){if(mobile_browser&&$(window).width()<481){$.each($(".t-row iframe"),function(n,m){if($(m).width()>$(window).width()){$(m).css("width","100%");$(m).css("height","auto")}})}}if(f.sortable){d()}},g=function(j){return TWP.Util.toTitleCase(j.replace(/-/g," "))};h()}})(this);