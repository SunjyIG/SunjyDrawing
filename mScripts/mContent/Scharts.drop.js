function mcharts(chrID,mLbla,mDaa,mLblb,mDab,mTxt){
var labels=sbjmonthday;
var delayed;
var data = {
  labels: labels,
  datasets: [{
    borderWidth:1,
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

    plugins: {
      title: {
        display: true,
        text: mTxt,
      },

      tooltip: {
        callbacks: {
          footer: footer,
        }},

    },


    animations: {
      y: {
        easing: 'easeInOutElastic',
        from: function(ctx){
          if (ctx.type === 'data') {
            if (ctx.mode === 'default' && !ctx.dropped) {
              ctx.dropped = true;
              return 0;
            }
          }
        }
      }
    },


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
        }
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
        }
      },

    }

};

var c=document.getElementById(chrID);  
var ctx = c.getContext('2d');
try{cxt.clearRect(0,0,c.width,c.height);}catch(ex){};

var mixedChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options:options,
});

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
  tooltipItems.forEach(function(tooltipItem){
    msun=tooltipItem.parsed.y*60*60;
	if (i==0){mtxt=mtxt+mgetTimes(msun);msum=msun;}else{mtxt=mtxt+ "\n"+"Sunset:    "+mgetTimes(msun);msum=msun-msum;};
	i++;
  });
  return mtxt+ "\n"+"Daylight:  "+mgetTimes(msum);
};

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
}

function changeme(v){
var md=dayformat(v,"mdn");
for (r=0;r<sbjmonthday.length;r++){
if (sbjmonthday[r]==md){
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