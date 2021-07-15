window.onload = function(){
	var ii=0;
	var iii=0;
	var a = document.getElementsByTagName("a");
	var b;
	for (var i = 0;i < a.length;i++){
		try{b=a[i].getAttribute("href");}catch(err){b=null;}
		if (typeof b === "string"){if(b.indexOf("../../mHtmls/mContent")!=-1){ii++;try{a[i].removeEventListener("click",function(){},false)} catch(err) {};iii++}}
		if (typeof b === "string"){if(b.indexOf("../../mHtmls/mContent")!=-1){ii++;a[i].addEventListener("click",function(){window.open(this.getAttribute("sunjyid"));var za;},false);iii++  }}
		if (typeof b === "string"){if(b.indexOf("../../mHtmls/mContent")!=-1){ii++;var lc=a[i].getAttribute("href");a[i].setAttribute("href","javascript:void(0)");a[i].setAttribute("sunjyid",lc);iii++;}}	
	}
}