/* Baur: it looks like custom script for TSM based on /examples/textarea_example.html */
jQuery(window).on('load',function(){
                
                var scrollInterval;
                scrollInterval = setInterval(function(){
				    if((jQuery(".mCustomScrollbar").length >= jQuery(".customScrollbar").length) && jQuery(".customScrollbar").hasClass("mCustomScrollbar")) clearInterval(scrollInterval);
                    else setTimeout(function(){ jQuery(".customScrollbar").mCustomScrollbar();},600);}, 1200);

				var textArea=jQuery(".content textarea");
				textArea.wrap("<div class='textarea-wrapper' />");
				var textAreaWrapper=textArea.parent(".textarea-wrapper");
				textAreaWrapper.mCustomScrollbar({
					scrollInertia:0,
					//advanced:{autoScrollOnFocus:false}
				});
				var hiddenDiv=jQuery(document.createElement("div")),
        			content=null;
    			hiddenDiv.addClass("hiddendiv");
    			jQuery("body").prepend(hiddenDiv);
    			textArea.bind("keyup",function(e){
				
        			content=jQuery(this).val();
					var clength=content.length;
        			var cursorPosition=textArea.getCursorPosition();
					content="<span>"+content.substr(0,cursorPosition)+"</span>"+content.substr(cursorPosition,content.length);
					content=content.replace(/\n/g,"<br />");
        			hiddenDiv.html(content+"<br />");
        			jQuery(this).css("height",(hiddenDiv.height() - 4));
					textAreaWrapper.mCustomScrollbar("update");
					var hiddenDivSpan=hiddenDiv.children("span"),
						hiddenDivSpanOffset=0,
						viewLimitBottom=(parseInt(hiddenDiv.css("min-height")))-hiddenDivSpanOffset,
						viewLimitTop=hiddenDivSpanOffset,
						viewRatio=Math.round(hiddenDivSpan.height()+textAreaWrapper.find(".mCSB_container").position().top);
					if(viewRatio>viewLimitBottom || viewRatio<viewLimitTop){
						if((hiddenDivSpan.height()-hiddenDivSpanOffset)>0){
							textAreaWrapper.mCustomScrollbar("scrollTo",hiddenDivSpan.height()-hiddenDivSpanOffset);
						}else{
							textAreaWrapper.mCustomScrollbar("scrollTo","top");
						}
					}
    			});
				jQuery.fn.getCursorPosition=function(){
        			var el=jQuery(this).get(0),
						pos=0;
        			if("selectionStart" in el){
            			pos=el.selectionStart;
        			}else if("selection" in document){
            			el.focus();
            			var sel=document.selection.createRange(),
							selLength=document.selection.createRange().text.length;
            			sel.moveStart("character",-el.value.length);
            			pos=sel.text.length-selLength;
        			}
        			return pos;
    			}
			});
