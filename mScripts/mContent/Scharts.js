var mIndex=0;
var mcht=[];
var mimage=new Image();
mimage.src="../../mImages/mCommon/mbn.png";
function mcharts(chrID,mLbla,mDaa,mLblb,mDab,mTxt,inx){
var labels=sbjmonthday;
var data = {
  labels: labels,
  datasets: [{
    borderWidth:1,
    radius: 1,
    order: 1,
    type: 'line',
    label: mLbla,
    data: mDaa,
    fill: false,
    borderColor: function(context) {
        var chart = context.chart;
        var {ctx, chartArea} = chart;

        if (!chartArea) {
          // This case happens on initial chart load
          return null;
        }
        return getGradient(ctx, chartArea);
      },






	backgroundColor:'red',
    tension: 0.1
  },{
    borderWidth:1,
    radius: 1,
    order: 2,
    type: 'line',
    label: mLblb,
    data: mDab,
    fill: false,
    borderColor: 'blue',
backgroundColor:'blue',
    tension: 0.1}]
};


var options={
    responsive: true,

   interaction: {
      intersect: false,
      mode: 'index',
    },

   animations: {
      radius: {
        duration: 400,
        easing: 'linear',
        loop: function(context){context.active}
      }, 

      /* tension: {
        duration: 1000,
        easing: 'linear',
        from: 2,
        to: 0,
        loop: true
      }, */

    },
    hoverRadius: 8,
    hoverBackgroundColor: 'pink',

    plugins: {


      title: {
        display: true,
        text: mTxt,
      },
	
//afterDatasetsDraw:mfills(inx,chart),
//afterDraw:mfills(inx,mixedChart),

      tooltip: {
usePointStyle: true,
        callbacks: {
          footer: footer,

                    label: function(context) {
                        var label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += mgetTimes(context.parsed.y*60*60);
                        }
                        return label;
                    },
			

                    labelPointStyle: function(context) {
                        return {pointStyle: 'star',rotation: 0,};
			},
	
                    //title: function(context){return "";},



        }},

    },


   elements: {

      point: {
        pointStyle: function(ctx){var index = ctx.dataIndex;return index % 2 === 0 ? 'circle' : 'rectRot';},
        hoverRadius: 10,
      },},



    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time',
          color: '#191',
          font: {
            family: 'Times',
            size: 20,
            style: 'normal',
            lineHeight: 1.2
          },
          padding: {top: 30, left: 0, right: 0, bottom: 0}
        },

                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value+" h";
                    }},

grid: {
          drawBorder: false,
          /* color: function(context) {
            if (context.tick.value > 12) {
              return "blue";
            } else if (context.tick.value < 12) {
              return "green";
            }

            return '#000000';
          } */
	},

      },

      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: '#191',
          font: {
            family: 'Times',
            size: 20,
            style: 'normal',
            lineHeight: 1.2,
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        },

       ticks: {
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          callback: function(val, index) {
            // Hide the label of every 2nd dataset
	    //return index % 2 === 0 ? this.getLabelForValue(val) : '';
	    var ss=this.getLabelForValue(val);
	    var st=ss.toString().substring(0,2)+"-"+ss.toString().substring(2,4);
	    var st=st.replace("01-","Jan-");
	    var st=st.replace("02-","Feb-");
	    var st=st.replace("03-","Mar-");
	    var st=st.replace("04-","Apr-");
	    var st=st.replace("05-","May-");
	    var st=st.replace("06-","Jun-");
	    var st=st.replace("07-","Jul-");
	    var st=st.replace("08-","Aug-");
	    var st=st.replace("09-","Sep-");
	    var st=st.replace("10-","Oct-");
	    var st=st.replace("11-","Nov-");
	    var st=st.replace("12-","Dec-");
            return index % 2 === 0 ? st: '';
          },
          color: 'black',
          //font: {family: 'arial',size: 15,style: 'bold',},
        },

      },

    }

};

var c=document.getElementById(chrID);  
c.onclick = function(evt){
   const points = mixedChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
    if (points.length) {
        const firstPoint = points[0];
        var label = mixedChart.data.labels[firstPoint.index];
        var value = mixedChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
	//var x=mixedChart.scales['x'].getPixelForValue(firstPoint.index);
	//var y=mixedChart.scales['y'].getPixelForValue(value);
	//var x00=mixedChart.scales['x'].getPixelForValue(firstPoint.index);
	//var y01=mcht[0].scales['y'].getPixelForValue(sbjsunrised[firstPoint.index]);
	//var y02=mcht[0].scales['y'].getPixelForValue(sbjsunsetd[firstPoint.index]);
	//alert(y01+"|"+y02);
	//var x = chart.chart.scales['x-axis-0'].getPixelForValue('2005');
	//var y = chart.chart.scales['y-axis-0'].getPixelForValue(3);

location.href="../../aIndex.html";	}
}

var ctx = c.getContext('2d');
try{cxt.clearRect(0,0,c.width,c.height);}catch(ex){};

var mixedChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options:options,
});
mcht[inx]=mixedChart;
//mfills(inx,mixedChart);
mixedChart.setActiveElements([{datasetIndex: 0, index: mIndex},{datasetIndex: 1, index: mIndex}]);
var width, height, gradient;
function getGradient(ctx, chartArea) {
  var chartWidth = chartArea.right - chartArea.left;
  var chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "rgba(241, 196, 15,1.0)");
    gradient.addColorStop(0.5, "rgba(231, 76, 60,1.0)");
    //gradient.addColorStop(1, "rgba(52, 152, 219,1.0)");
    gradient.addColorStop(1, "rgba(46, 204, 113,1.0)");

  }

  return gradient;
}


function footer(tooltipItems){
	var msun = 0;
	var mtxt="Sunrise:   ";
	var i=0;
	var msum=0;
	var msx="";
	var xx=0;
	var yy=0;
	var xy=0;
  tooltipItems.forEach(function(tooltipItem){
	xy=tooltipItem.parsed.y;
	msun=xy*60*60;
	msx=tooltipItem.parsed.x;
	if (i==0){mtxt=mtxt+mgetTimes(msun);msum=msun;xx=xy;}else{mtxt=mtxt+ "\n"+"Sunset:    "+mgetTimes(msun);msum=msun-msum;yy=xy;};
	i++;
  });
	for(var ii=0;ii<sbjsunrised.length;ii++){
		if (((xx==sbjsunrised[ii])&&(yy==sbjsunsetd[ii]))&&(ii==msx)){
			mlines(msx,0);break;
		}else{
		if (((xx==slysunrised[ii])&&(yy==slysunsetd[ii]))&&(ii==msx)){
			mlines(msx,1);break;
		};};	
	};
  //return mtxt+ "\n"+"Daylight:  "+mgetTimes(msum)+ "\n"+"Powered by ©SUN";
  return "Daylight:  "+mgetTimes(msum)+ "\n"+"Powered by ©SUN"; // + msx;
  //return {label: 'Triangles',pointStyle: 'triangle'};
};

function mfills(p,c){
try{
	var s=0;
	var e=366;
	//var xs=c.scales['x'].getPixelForValue(s);
	//var xe=c.scales['x'].getPixelForValue(e);
	var x=0;
	var y1=0;
	var y2=0;
	var mctx=c.ctx;
	mctx.restore();
	mctx.beginPath();
	mctx.strokeStyle = 'red';
	for(var i=s;i<e;i++){
		x=c.scales['x'].getPixelForValue(i);
		if (p==0){
			y1=c.scales['y'].getPixelForValue(sbjsunrised[i]);
			y2=c.scales['y'].getPixelForValue(sbjsunsetd[i]);
		};
		if (p==1){
			y1=c.scales['y'].getPixelForValue(slysunrised[i]);
			y2=c.scales['y'].getPixelForValue(slysunsetd[i]);
		};	
		mctx.moveTo(x,y1-1);
		mctx.lineTo(x,y2+1);
		mctx.stroke();
		mctx.fill();
	};
	mctx.closePath();
	mctx.save();
	//mcht[c].destroy();
}catch(e){alert(e);
};
	
};

function mlines(i,c){
//return;
try{
	var x01;
	x01=mcht[c].scales['x'].getPixelForValue(i);
	var y01=0;
	var y02=0;
	if (c==0){
		y01=mcht[c].scales['y'].getPixelForValue(sbjsunrised[i]);
		y02=mcht[c].scales['y'].getPixelForValue(sbjsunsetd[i]);
	};
	if (c==1){
		y01=mcht[c].scales['y'].getPixelForValue(slysunrised[i]);
		y02=mcht[c].scales['y'].getPixelForValue(slysunsetd[i]);
	};	
	//alert(y01+"|"+y02);
	/*

	*/
	var mctx;
	var gradient;
	mctx=mcht[c].ctx
	/*
	gradient=ctx.createLinearGradient(0,0,c.width,0);
	gradient.addColorStop("0","yellow");
	gradient.addColorStop("0.5","orange");
	gradient.addColorStop("1.0","red");
	*/
	mctx.lineWidth = 8;
	mctx.strokeStyle = "orange";
	mctx.beginPath();
	mctx.moveTo(x01,y01-1);
	mctx.lineTo(x01,y02+1);
	mctx.stroke();
	if (c==0){
		//mctx.fillText("   Beijing Daylight: "+mgetTimes((sbjsunsetd[i]-sbjsunrised[i])*60*60),x01,y01+15);
	};
	if (c==1){
		//mctx.fillText("   Luoyang Daylight: "+mgetTimes((slysunsetd[i]-slysunrised[i])*60*60),x01,y01+15);
	};
	mctx.drawImage(mimage,x01,y01+30,15,15);
	mctx.closePath();
	mctx.fill();
}
catch(e){return e;};

}

function mgetTimes(time){
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
};

}

/* vvvvvvvvvvvvvvvvvvv */


function oTimerchange(s){
changeme(s.value);
//changecht(mcht);
}

function changecht(){
try{
mcht[0].setActiveElements([{datasetIndex: 0, index: mIndex},{datasetIndex: 1, index: mIndex}]);
mcht[0].update();
mcht[1].setActiveElements([{datasetIndex: 0, index: mIndex},{datasetIndex: 1, index: mIndex}]);
mcht[1].update();
}catch(e){
//alert(e);
};
}

function changeme(v){
var md=dayformat(v,"mdn");
for (r=0;r<sbjmonthday.length;r++){
if (sbjmonthday[r]==md){
mIndex=r;
changecht();
document.getElementById("bj").innerText= v+" Beijing, Dawn: "+sbjdawn[r]+",  Sunrise: "+sbjsunrise[r]+",  Noon: "+sbjnoon[r]+",  Sunset: "+sbjsunset[r]+",  Dusk: "+sbjdusk[r]+",  Daylight: "+sbjdaylight[r];
document.getElementById("ly").innerText= v+" Luoyang, Dawn: "+slydawn[r]+",  Sunrise: "+slysunrise[r]+",  Noon: "+slynoon[r]+",  Sunset: "+slysunset[r]+",  Dusk: "+slydusk[r]+",  Daylight: "+slydaylight[r];
break;
};}};


function ymdformat(p){
var mtext="";
var ymd=new Date();
var yy=ymd.getFullYear();
var mm=ymd.getMonth()+1;if (mm<10){mm="0"+mm;};
var dd=ymd.getDate();if (dd<10){dd="0"+dd};
var md=mm+dd;
switch (p) {
  case "y":
    mtext = yy;
    break;
  case "m":
    mtext = mm;
    break;
  case "d":
    mtext = dd;
    break;
  case "ym":
    mtext = yy+"-"+mm;
    break;
  case "md":
    mtext = mm+"-"+dd;
    break;
  case "ymd":
    mtext = yy+"-"+mm+"-"+dd;
    break;
  case "ymn":
    mtext = yy.toString()+mm.toString();
    break;
  case "mdn":
    mtext = mm.toString()+dd.toString();
    break;
  case "ymdn":
    mtext = yy.toString()+mm.toString()+dd.toString();
    break;
  default:
    mtext = yy+"-"+mm+"-"+dd;
}
return mtext;
};

function dayformat(dt,p){
var mtext="";
var ymd=new Date(dt);
var yy=ymd.getFullYear();
var mm=ymd.getMonth()+1;if (mm<10){mm="0"+mm;};
var dd=ymd.getDate();if (dd<10){dd="0"+dd};
var md=mm+dd;
switch (p) {
  case "y":
    mtext = yy;
    break;
  case "m":
    mtext = mm;
    break;
  case "d":
    mtext = dd;
    break;
  case "ym":
    mtext = yy+"-"+mm;
    break;
  case "md":
    mtext = mm+"-"+dd;
    break;
  case "ymd":
    mtext = yy+"-"+mm+"-"+dd;
    break;
  case "ymn":
    mtext = yy.toString()+mm.toString();
    break;
  case "mdn":
    mtext = mm.toString()+dd.toString();
    break;
  case "ymdn":
    mtext = yy.toString()+mm.toString()+dd.toString();
    break;
  default:
    mtext = yy+"-"+mm+"-"+dd;
}
return mtext;
};