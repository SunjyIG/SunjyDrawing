object = new Array();
var R,xm,ym;
var kr = Math.PI/180;
function CObj(N,obj,pr,pk){

	this.img = document.createElement("img");
	this.img.src = obj.src;
	this.img.style.zIndex = -pk;
	document.body.appendChild(this.img);
	this.dL   = this.img.width  / 2;
	this.dH   = this.img.height / 2;
	this.N    = N;
	this.sens = 1;
	this.xmb  = 0;
	this.r    = 0;
	this.k    = 0;
	this.pk   = pk;
	this.pr   = pr;
	this.x    = xm;
	this.y    = ym;

	this.dhTeuMeulEu = function (){
		with (this) {
			img.style.left = Math.round(x - dL + Math.cos((k -= pk * sens) * kr) * (r += pr));
			img.style.top  = Math.round(y - dH - (r * .5) + Math.sin(k * kr) * r);
			if(r > R + 2 * N){
				y    = ym;
				x    = xm;
				r    = 0;
				sens = xm>xmb?1:-1;
				xmb  = xm;
			}
		}
	}
}

function run(){
	for(i in object)object[i].dhTeuMeulEu();
	setTimeout(run, 16);
}
onload = function (){
	R  = 40;
	xm = document.body.offsetWidth  / 2;
	ym = document.body.offsetHeight / 2;

	document.onmousemove = function(e){
		if (window.event) e = window.event;
		xm = (e.x || e.clientX);
		ym = (e.y || e.clientY) + document.body.scrollTop;
	}
	I = document.getElementById("IMG").getElementsByTagName("img");
	for(i=0;i<100;i++){
		o = I[i%I.length];
		object[i] = new CObj(i, o, 2, 80/o.width);
	}
	run();

}
