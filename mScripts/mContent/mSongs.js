document.write('<div class="mImgAbsolute"><img onclick="audioMctl()" src="../../mImages/mCommon/mbm.gif"  alt="Sunjy" /></div>');
var i=seeds;
var audio;
var audios='<audio id="audio" controls="controls" style="margin-left:auto;margin-right:auto;opacity:1;display:none" preload="auto" autoplay="autoplay" loop="true" volume="100%" /><source src="" type="audio/mpeg">your browser does not support html5 audio.</audio>';
var video;
var videos='<video id="audio" controls="controls" style="margin-left:auto;margin-right:auto;opacity:1;" preload="auto" autoplay="autoplay" loop="true" volume="100%" width="640" height="410"/><source src="">your browser does not support html5 video.</video>';
var mroot="../../mOthers/02/";
var mrt="https://sunjyig.github.io/SunjyDrawing/mHtmls/mContent/";
var mname;
var sname;
var msuffix;
var mwarning='<div><p style="margin-left:auto;margin-right:auto;text-align:center;color:red;font-family:arial;font-size:150%;"/>Error encountered!</p><p style="margin-left:auto;margin-right:auto;text-align:center;color:red;font-family:arial;font-size:80%;"/>POWERED BY:SUN</p></div>';
/*
new
*/
var mtotal=0;
var mcurrenttime=0;
var mbalance;
var mnextsongname;
var msongscount=0;
var mLableA,mLableB,mLableC,mLableD,mLableE,mLableF;
var mvalue;
var mvolumevalue;
var mcnt=0;
var ii=0;
var mQRcode=0;
var mtype=0;
var monce=true;
var isdown=false,ismove=false;
var matv=0;
var isdownv=false,ismovev=false;
var currentvolume=100;
var maudiocontrol=false;
var element='<div id="mcanvas" style="margin-left:auto;margin-right:auto;width:100%;height:100%;text-align:center;color:#0000ff;font-family:arial;font-size:80%;"/></div>'
window.onload=function(){var adiv=document.getElementById("saudio");adiv.innerHTML=audios;audio=document.getElementById("audio");if(i==-1){maudioinit();mgetsong();}else{if(i==-2){mplayer();}else{try{audio.loop="loop";mname=index[i];sname=songs[i];msuffix=postfixs[i];audio.src=mroot + mname + msuffix;var sdiv=document.getElementById("snames");sdiv.innerHTML=sname;}catch(merrs){}}};}
function audioMctl(){if (audio.paused==true){audio.play();}else{audio.pause();};}
function mplayer(){
	mnews();
	msadd();
	/*
	<script type="text/javascript" src="../../mScripts/mCommon/mQRcode.js"/></script>
	*/
	mLableA=document.getElementById("infoA");
	mLableB=document.getElementById("infoB");
	mLableC=document.getElementById("infoC");
	mLableF=document.getElementById("infoF");
	monce=true;
	var merra=false;
	var merrb=false;
	var merrc=false;
	var vtype;
	mvalue=document.getElementById("mrange");
	mvalue.min=0;mvalue.step=0.001;mvalue.max=100;mvalue.value=0;
	mvolumevalue=document.getElementById("mrangev");
	try{vtype=mRequest.mQueryString("type");}catch(err){merra=true;}
	try{i=mRequest.mQueryString("index");}catch(err){merrb=true;}
	try{mcurrenttime=mRequest.mQueryString("snds");}catch(err){mcurrenttime=0;merrb=true;}
	if (merra||merrb||merrc){document.write(mwarning);return;}
	if (i>songs.length-1){merra=true;}
	if (vtype!=types[i]){merrb=true;}
	if (typeof mcurrenttime === "number" && !isNaN(mcurrenttime)){merrc=true;}
	if (merra||merrb||merrc){document.write(mwarning);return;}
	mname=index[i];sname=songs[i];msuffix=postfixs[i];document.getElementById("snames").innerHTML=sname;
	if (vtype !=0){
		try{var child=document.getElementById("audio");child.parentNode.removeChild(child);}catch(err){}
		document.getElementById("saudio").innerHTML=videos
		audio=document.getElementById("audio");
	}
	audio.src=mroot + mname + msuffix;
	audio.addEventListener("loadedmetadata", function(){});
	try{if(mcurrenttime>=audio.duration){mcurrenttime=0;}}catch(err){}
	audio.addEventListener("play", function(){if (monce){audio.currentTime=mcurrenttime;monce=false;mtotal=audio.duration;mvalue.max=mtotal;mLableA.innerHTML="Duration:  " + getTimes(mtotal);mQRcodeIMG(i,1);audio.addEventListener("timeupdate", function(){mcurrenttime=audio.currentTime;if(!isdown){mvalue.value=mcurrenttime;};mLableB.innerHTML="Current:  " + getTimes(mcurrenttime);mLableC.innerHTML="Balance:  " + getTimes(mtotal-mcurrenttime);},false);}});
	//audio.removeEventListener("play", function(){});
	//audio.addEventListener("timeupdate", function(){mcurrenttime=audio.currentTime;mLableB.innerHTML="Current:  " + getTimes(mcurrenttime);mLableC.innerHTML="Balance:  " + getTimes(mtotal-mcurrenttime);},false);
	
}

var mRequest={
	mQueryString:function(item){
			var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
			return svalue ? svalue[1] : svalue;}
}

function maudioinit(){
	mrt=document.location.pathname.substring(0,document.location.pathname.lastIndexOf("/") + 1);
	mnews();
	msongscount=songs.length;
	mLableA=document.getElementById("infoA");
	mLableB=document.getElementById("infoB");
	mLableC=document.getElementById("infoC");
	mLableD=document.getElementById("infoD");
	mLableE=document.getElementById("infoE");
	mLableF=document.getElementById("infoF");
	mLableE.innerHTML="Songs Total:  " + msongscount;
	audio.loop=false;
	currentvolume=audio.volume;
	mvalue=document.getElementById("mrange");
	mvolumevalue=document.getElementById("mrangev");
	mvalue.min=0;mvalue.step=0.001;mvalue.max=100;mvalue.value=0;
	audio.addEventListener("ended", function(){mgetsong();},false);
	audio.addEventListener("error", function(){mgetsong();},false);
	audio.addEventListener("stalled", function(){},false);
	audio.addEventListener("suspend", function(){},false);
	audio.addEventListener("timeupdate", function(){mcurrenttime=audio.currentTime;if(!isdown){mvalue.value=mcurrenttime;};mLableB.innerHTML="Current:  " + getTimes(mcurrenttime);mLableC.innerHTML="Balance:  " + getTimes(mtotal-mcurrenttime);},false);
	audio.addEventListener("play", function(){mtotal=audio.duration;mvalue.max=mtotal;audio.volume=currentvolume;mLableA.innerHTML="Duration:  " + getTimes(mtotal);mLableD.innerHTML="Next:  " + mnextsongname;},false);
	//audio.addEventListener("play", function(){mtotal=audio.duration;mLableA.innerHTML="Duration:  " + getTimes(mtotal);},false);
}

function audioctl(){if(maudiocontrol){document.getElementById("mrng").style.display="none";document.getElementById("mrngv").style.display="none";maudiocontrol=false;mvalue.style.display="none";mvolumevalue.style.display="none";}else{document.getElementById("mrng").style.display="";document.getElementById("mrngv").style.display="";maudiocontrol=true;mvalue.style.display="";mvolumevalue.style.display="";}}
function musicvalue(){}
function mmousedown(){isdown=true;matv=0;}
function mmousemove(){ismove=true;}
function mmouseup(){if(isdown && ismove){matv=mvalue.value;isdown=false;ismove=false;if(matv != mcurrenttime){try{audio.pause();audio.currentTime=matv;audio.play();madjust(matv);}catch(err){}}}}
function madjust(p){}

function musicvaluev(){}
function mmousedownv(){isdownv=true;}
function mmousemovev(){ismovev=true;}
function mmouseupv(){if(isdownv && ismovev){isdownv=false;ismovev=false;try{currentvolume=mvolumevalue.value;audio.volume=currentvolume;}catch(err){}}}

function mgetsong(){
mcnt++;
if (mcnt==1){i=getRandom(0,msongscount-1);}else{i=ii;}
ii=getRandom(0,msongscount-1);
if (msongscount !=1){while (i==ii){ii=getRandom(0,msongscount-1);}}
mnextsongname=songs[ii];
mprocess(i);
mQRcodeIMG(i,0);
}

function mQRcodeIMG(p,q){
	document.getElementById("info0").innerHTML="Share Song:  " + songs[p];
	try{var child=document.getElementById("mcanvas");child.parentNode.removeChild(child);}catch(err){}
	mLableF.innerHTML=element;
	var qrcode = new QRCode(document.getElementById("mcanvas"), {
		width : 220,
		height : 220,
		colorDark : "#000099",
		colorLight : "#FFFF99",
		correctLevel : QRCode.CorrectLevel.H
	});
	qrcode.makeCode(mrt+p+"&type="+types[p]+"&snds=0");
	if (q==0){
	var qr=document.querySelector("#mcanvas");
	//qr.addEventListener("click", function(){audio.pause();window.location.href="../../mHtmls/mCommon/mplayer.html?index="+p+"&type="+types[p]+"&snds="+mcurrenttime;},false);}
	qr.addEventListener("click", function(){audio.pause();window.open("../../mHtmls/mCommon/mplayer.html?index="+p+"&type="+types[p]+"&snds="+mcurrenttime);},false);}
}

function mprocess(p){
mname=index[p];sname=songs[p];msuffix=postfixs[p];audio.src=mroot + mname + msuffix;var sdiv=document.getElementById("snames");sdiv.innerHTML=sname;
}

function mnews(){
	mrt="https://sunjyig.github.io/SunjyDrawing/mHtmls/mCommon/mplayer.html?index=";
	//document.addEventListener('contextmenu',function(e){e.preventDefault();})
	return;
	var mscript=document.createElement("script");
	mscript.setAttribute("type","text/javascript");
	mscript.setAttribute("src","../../mScripts/mCommon/mSgqrcs.js");
	document.body.appendChild(mscript);
	mscript.onload=mscript.onreadystatechange=function(){if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){mQRcode=1;}else{mQRcode=0;}}
}
function msadd(){
	try{document.getElementById("mscriptqr").remove();}catch(err){}
	var mscript=document.createElement("script");
	mscript.setAttribute("id","mscriptqr");
	mscript.setAttribute("type","text/javascript");
	mscript.setAttribute("src","../../mScripts/mCommon/mSgqrcs.js");
	document.body.appendChild(mscript);
	mscript.onload=mscript.onreadystatechange=function(){if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){mQRcode=1;}else{mQRcode=0;}}
}

function getTimes(time){
	var hour=time/3600;
	var hours=parseInt(hour);
	if (hours<10){hours="0" + hours;};
	var other = time % 3600;
	var minute = other / 60;
	var minutes = parseInt(minute);
	if (minutes < 10) {minutes = "0" + minutes;};
	var second = time % 60;
	seconds = parseInt(second);
	if (seconds < 10) {seconds = "0" + seconds;};
	var allTime ="" +hours+ ":" + "" + minutes + "" + ":" + "" + seconds + "";
	return allTime;
}
function getRandom(num1,num2){
	switch(arguments.length){
		case 1:
			return Math.floor(Math.random()*arguments[0]+1); break;
		case 2:
			var min = arguments[0],max = arguments[1];
			if(arguments[0]-arguments[1]>0){
				min = arguments[1];
				max = arguments[0];}

			return Math.floor(Math.random()*(max-min+1) + min);break;
		default: return 0;break;}
}

function mqr(){
try{document.getElementById("mbarcode").src="";}catch(merr){}
try{var child=document.getElementById("mcanvas");child.parentNode.removeChild(child);}catch(err){}
	var s=document.getElementById("mtext");
if(s.value==""){return;}
	mLableF=document.getElementById("infoF");
	try{var child=document.getElementById("mcanvas");child.parentNode.removeChild(child);}catch(err){}
	mLableF.innerHTML=element;
try{
	var qrcode = new QRCode(document.getElementById("mcanvas"), {
		width : 370,
		height : 370,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});
	qrcode.clear();
	qrcode.makeCode(s.value);
}catch(merr){}
try{
	var barcode = document.getElementById("mbarcode");barcode.src="";
        var str = s.value;
        options = {
            //format: "Code128B",
            displayValue: true,
            fontSize: 18,
            lineColor: "black", 
            width:2,
            height: 100
        };
	JsBarcode(barcode, str, options);
}catch(merr){}
}