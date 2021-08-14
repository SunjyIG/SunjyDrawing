var mtb;
var mrows;
var mcells;
var mtab;
var inbn="<img src='mOthers/02/005.gif' onclick='mclk()'/>";
var audio;
var audios='<audio id="audio" controls="controls" style="margin-left:auto;margin-right:auto;opacity:1;display:none" preload="auto" autoplay="autoplay" loop="true" volume="100%" /><source src="" type="audio/mpeg">your browser does not support html5 audio.</audio>';
//var audios='<audio id="audio" controls="controls" style="margin-left:auto;margin-right:auto;opacity:1;height:0;" preload="auto" autoplay="autoplay" loop="true" volume="100%" /><source src="" type="audio/mpeg">your browser does not support html5 audio.</audio>';
var video;
var videos='<video id="audio" controls="controls" style="margin-left:auto;margin-right:auto;opacity:1;" preload="auto" autoplay="autoplay" volume="100%" width="640" height="410"/><source src="">your browser does not support html5 video.</video>';
var mroot="mOthers/02/";
var mnxt=0;
var mcur=0;
var murl="";
var mtotal=0;
var mcurrenttime=0;
var mtbsun;
var mtabsun;
var bjsunrise;
var bjsunset;
var lysunrise;
var lysunset;
var mpgbarhtml="<canvas id='loadingProgressCanvas' width='5' height='5' onclick='mclk()'></canvas>";
var mpgbar;
var mpgbarwidth=0;
var mpgbarheight=0; 
var mpgbarrate=0;
var mtotala=1;
var ctx;
var mpgprogress=0;
var mpglast=0;
var mimage=new Image();
var imgrotate;
var mTimerID=null;
var mm4a="mImages/mCommon/musica.m4a";
var iswaiting=true;
window.onload=function(){
mtimerStart("rotateME()",100);
imgrotate=document.getElementById("imgrotate");
mimage.src="mImages/mCommon/mbn.png";
mtb=document.getElementById("mtaby");
mtab=document.getElementById("mtab");
mtbsun=document.getElementById("mtabysun");
mtabsun=document.getElementById("mtabsun");
audio=document.getElementById("saudio");
audio.innerHTML=audios;
audio=document.getElementById("audio");
audio.loop=false;
//audio.src=mm4a;
//mplay();
audio.addEventListener("ended", function(){clsg();rndsg();},false);
audio.addEventListener("waiting", function(){iswaiting=true;},false);
//audio.addEventListener("canplay", function(){try{if (audio.paused){audio.paused=false;audio.play();}}catch(ex){}},false);
audio.addEventListener("play", function(){try{mtotal=audio.duration;mcurrenttime=0;mtotala=mtotal;mpgbarrate=(mpgbarwidth/mtotala);mpglast=0;mpgprogress=0;rfrh();mlocal();drawFirst();}catch(ex){};try{if (audio.paused){audio.paused=false;audio.play();}}catch(ex){}},false);
audio.addEventListener("timeupdate", function(){iswaiting=false;try{mtotal=audio.duration;mtotala=mtotal;mpgbarrate=(mpgbarwidth/mtotala);mcurrenttime=audio.currentTime;rfrh();mlocal();drawProgress();}catch(ex){}},false);
inits();
mpgbarwidth=mtab.rows[0].cells[5].clientWidth*0.95; //50; //mtab.rows[0].cells[5].width;
mpgbarheight=mtab.rows[0].cells[5].clientHeight*0.95; //20; //mtab.rows[0].cells[5].height;
//alert(mpgbarwidth);
rndsg();
callme();
//bjsunrise=document.getElementById("bjsunrise");
//bjsunset=document.getElementById("bjsunset");
//lysunrise=document.getElementById("lysunrise");
//lysunset=document.getElementById("lysunset");
mlocal();
}


function rotateME(){
try{
if (audio.paused){
imgrotate.className="mrotatea";
}
else{
imgrotate.className="mrotate";
}
}catch(ex){}
if (iswaiting){
try{
imgrotate.className="mrotatea";
}catch(ex){}
}else{}

}

function mplay(){
document.getElementById("mlidcover").onclick();
if (audio.paused){audio.paused=false;audio.play();}
}

function mtimerStart(mprocedure,mnterval){
try{
//mTimerID=setInterval("clock()",50);
mTimerID=window.setInterval(mprocedure,mnterval);
}catch(ex){}
}

function mtimerEnd(){
try{
window.clearInterval(mTimerID);
}catch(ex){}
}

function mlocal(){
try{
var ymd=new Date();
var mm=ymd.getMonth()+1;if (mm<10){mm="0"+mm;};
var dd=ymd.getDate();if (dd<10){dd="0"+dd};
var md=mm+dd;
for (var i=0;i<sbjmonthday.length;i++){
if (md==sbjmonthday[i]){
bjsunrise.innerText=sbjsunrise[i];
bjsunset.innerText=sbjsunset[i];
lysunrise.innerText=slysunrise[i];
lysunset.innerText=slysunset[i];
break;
}
}
}catch(ex){}
}

function rfrh(){
try{
mtab.rows[mcur].cells[2].innerText=getTimes(mtotal);
mtab.rows[mcur].cells[3].innerText=getTimes(mcurrenttime);
mtab.rows[mcur].cells[4].innerText=getTimes(mtotal-mcurrenttime);
}
catch(ex){}
}


function clsg(){
try{
mtab.rows[mcur].cells[0].innerHTML="";
mtab.rows[mcur].cells[2].innerText="";
mtab.rows[mcur].cells[3].innerText="";
mtab.rows[mcur].cells[4].innerText="";
mtab.rows[mcur].cells[5].innerHTML="";
}
catch(ex){}
}

function rndsg(){
try{
mcur=getRandom(0,songs.length-1);
murl=mroot + index[mcur] + postfixs[mcur];
audio.src=murl;
var rc=document.getElementById(index[mcur]);
var rr=parseInt(rc.getAttribute("mrow"))+1;
mtab.rows[rr].cells[0].innerHTML=inbn;
mtab.rows[rr].cells[5].innerHTML=mpgbarhtml;
mcur=rr;
try{
mpgbar=document.getElementById("loadingProgressCanvas");
mpgbar.parentNode.removeChild(mpgbar);
}catch(ea){}
mtab.rows[rr].cells[5].innerHTML=mpgbarhtml;
mpgbar=document.getElementById("loadingProgressCanvas");
mpgbar.width=mpgbarwidth;
mpgbar.height=mpgbarheight;
ctx=mpgbar.getContext("2d"); 
drawFirst();
}catch(ex){}
}

function drawProgress(){
mpgprogress=(mcurrenttime*mpgbarrate);
ctx.moveTo(mpglast, 0);
//ctx.fillRect(mpglast, 0, mpgprogress-mpglast, mpgbarheight); 
mpglast=mpgprogress; 
ctx.clearRect(0, 0, mpgbarwidth, mpgbarheight);
ctx.drawImage(mimage,mpgprogress,5,mpgbarheight*0.8,mpgbarheight*0.8);

ctx.font="12px Verdana";
var gradient=ctx.createLinearGradient(0,0,mpgbarwidth,0);
gradient.addColorStop("0",rndRGBColor());
gradient.addColorStop("0.5",rndRGBColor());
gradient.addColorStop("1.0",rndRGBColor());
ctx.fillStyle=gradient;
if ((mcurrenttime/mtotal)<=0.5){ctx.fillStyle="green";}else{ctx.fillStyle=hexify("rgb(255,0,0,"+((mtotal-mcurrenttime/5)/mtotal)+")");}
//ctx.fillText(getTimes(mcurrenttime),mpgbarwidth/4,mpgbarheight*0.7);
//ctx.fillText(((mcurrenttime*100/mtotal).toFixed(0) + "%"),mpgbarwidth/4,mpgbarheight*0.7);
if (mpgprogress<=mpgbarwidth/3){
//ctx.fillText(((mcurrenttime*100/mtotal).toFixed(0) + "%"),mpgprogress+mpgbarheight*0.8,mpgbarheight*0.7);
}else{
//ctx.fillText(((mcurrenttime*100/mtotal).toFixed(0) + "%"),mpgprogress-mpgbarheight*1.1,mpgbarheight*0.7);
}

}

function drawFirst(){
//return;
try{
//ctx.fillStyle="#0000ff";
ctx.rect(0, 0, mpgbarwidth, mpgbarheight);
ctx.stroke();
ctx.fillStyle="green"; 
ctx.clearRect(0, 0, mpgbarwidth, mpgbarheight);
ctx.globalAlpha=1; //Turn transparency on 0--1
}catch(ex){}
}

function rndRGBColor(){
var r = Math.floor(Math.random() * 256); 
var g = Math.floor(Math.random() * 256); 
var b = Math.floor(Math.random() * 256); 
return "rgb(" + r + ',' + g + ',' + b + ")";
}

function hexToRgba(hex, opacity){ 
return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
}
　
function rgbToHex(r, g, b) {
return ((r << 16) | (g << 8) | b).toString(16); 
} 

function hexify(color) {
  var values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');
  var a = parseFloat(values[3] || 1),
      r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
      g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
      b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
  return "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
}

//var myHex = hexify('rgba(255,232,186,0.4)'); 
//alert(hexify('rgba(255,232,186,0.4)'));

function mclk(){if (audio.paused==true){audio.play();}else{audio.pause();};}
function dclk(){try{if (audio.paused==true){audio.play();}else{};}catch(e){}}

function callme(){
//alert(songs.length);
//alert(index.length);
//alert(postfixs.length);
//alert(types.length);
//alert(artists.length);
var rl=mtab.rows.length;
for (var i=1;i<rl;i++){
//var rc=mtab.rows[i].cells[1].getAttribute("artists");
//var rc=mtab.rows[i].cells[1].getAttribute("id");
//rc=mtab.rows[i].cells[0].innerHTML=inbn;
//alert(rc);
}
}

function inits(){
try{
for(var i=0;i<songs.length;i++){
mrows=document.createElement("tr");
mtb.appendChild(mrows);
mcells=document.createElement("td");
mcells.innerText="";
mcells.innerHTML="";
mrows.appendChild(mcells);

mcells=document.createElement("td");
mcells.innerText=songs[i];
mcells.setAttribute("id",index[i]);
mcells.setAttribute("postfixs",postfixs[i]);
mcells.setAttribute("types",types[i]);
mcells.setAttribute("artists",artists[i]);
mcells.setAttribute("mrow",i);
mcells.onclick=function(){getColumnDetail(this)}; 
mcells.style.textAlign="left";
mrows.appendChild(mcells);

mcells=document.createElement("td");
mcells.innerText="";
mrows.appendChild(mcells);

mcells=document.createElement("td");
mcells.innerText="";
mrows.appendChild(mcells);

mcells=document.createElement("td");
mcells.innerText="";
mrows.appendChild(mcells);

mcells=document.createElement("td");
mcells.innerText="";
mcells.innerHTML="";
mrows.appendChild(mcells);

} 
}catch(ex){}

try{
mrows=document.createElement("tr");
mtbsun.appendChild(mrows);
mcells=document.createElement("td");
mcells.innerText="BJ";
mrows.appendChild(mcells);

mcells=document.createElement("td");
mcells.innerText="";
mcells.setAttribute("id","bjsunrise");
mrows.appendChild(mcells);
bjsunrise=mcells;

mcells=document.createElement("td");
mcells.innerText="";
mcells.setAttribute("id","bjsunset");
mrows.appendChild(mcells);
bjsunset=mcells;

mrows=document.createElement("tr");
mtbsun.appendChild(mrows);
mcells=document.createElement("td");
mcells.innerText="LY";
mrows.appendChild(mcells);

mcells=document.createElement("td");
mcells.innerText="";
mcells.setAttribute("id","lysunrise");
mrows.appendChild(mcells);
lysunrise=mcells;

mcells=document.createElement("td");
mcells.innerText="";
mcells.setAttribute("id","lysunset");
mrows.appendChild(mcells);
lysunset=mcells;

mrows=document.createElement("tr");
mtbsun.appendChild(mrows);
mcells=document.createElement("td");
//mcells.innerHTML="<a href='javascript:void(0)' style=text-decoration:none;'/>my website access</a>";
mrows.appendChild(mcells);
//mrows.onclick=function alnks(){location.href="pIndex.html";}; //javascript:void(0)
//mcells.colSpan=3;

mcells=document.createElement("td");
mcells.innerText="";
mrows.appendChild(mcells);

mcells=document.createElement("td");
mcells.innerText="";
mrows.appendChild(mcells);

}catch(ex){}

try{
if (mtab.rows.length>mtabsun.rows.length){
var ii=mtab.rows.length-mtabsun.rows.length;
for(var i=0;i<ii;i++){
mrows=document.createElement("tr");
mtbsun.appendChild(mrows);
mcells=document.createElement("td");
mcells.innerText="";
mrows.appendChild(mcells);

mcells=document.createElement("td");
mcells.innerText="";
mrows.appendChild(mcells);

mcells=document.createElement("td");
mcells.innerText="";
mrows.appendChild(mcells);
}
}
}catch(ex){}

}

function getColumnDetail(column){
//alert(column.getAttribute("id"));
clsg();
try{
mcur=parseInt(column.getAttribute("mrow"));
murl=mroot + index[mcur] + postfixs[mcur];
try{
audio.pause();
}catch(ey){}
var rca=document.getElementById(index[mcur]);
var rra=parseInt(rca.getAttribute("mrow"))+1;
try{
mpgbar=document.getElementById("loadingProgressCanvas");
mpgbar.parentNode.removeChild(mpgbar);
}catch(ea){}
try{
mtab.rows[rra].cells[5].innerHTML=mpgbarhtml;
mpgbar=document.getElementById("loadingProgressCanvas");
mpgbar.width=mpgbarwidth;
mpgbar.height=mpgbarheight;
ctx=mpgbar.getContext("2d"); 
drawFirst();
}catch(ez){}
audio.src=murl;
audio.play
var rc=document.getElementById(index[mcur]);
var rr=parseInt(rc.getAttribute("mrow"))+1;
mtab.rows[rr].cells[0].innerHTML=inbn;
mcur=rr;
}catch(ex){}
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

