
function Year_Month(){  
    var now = new Date();  
    var yy = now.getFullYear(); 
    var mm = now.getMonth()+1;  
   if (mm<10) mm='0'+mm;
    var cl = '<font color="yellow">';  
    if (now.getDay() == 0) cl = '<font color="yellow">';  
    if (now.getDay() == 6) cl = '<font color="yellow">';  
    return(cl +  yy + '-' + mm + '</font>');  
}  
 
function Date_of_Today(){  
    var now = new Date();  
    var cl = '<font color="yellow">';  
    if (now.getDay() == 0) cl = '<font color="yellow">';  
    if (now.getDay() == 6) cl = '<font color="yellow">';  
    return(cl +  now.getDate() + '<b></b></font>');  
}  
 
function Day_of_Today(){  
    var day = new Array();  
    day[0] = "Sunday";  
    day[1] = "Monday";  
    day[2] = "Tuesday";  
    day[3] = "Wednesday";  
    day[4] = "Thursday";  
    day[5] = "Friday";  
    day[6] = "Saturday";  
    var now = new Date();  
    var cl = '<font color="yellow">';  
    if (now.getDay() == 0) cl = '<font color="yellow">';  
    if (now.getDay() == 6) cl = '<font color="yellow">';  
    return(cl +  day[now.getDay()] + '</font>');  
}  
 
function CurentTime(){  
    var now = new Date();  
    var hh = now.getHours();  
    var mm = now.getMinutes();  
    var ss = now.getTime() % 60000;  
    ss = (ss - (ss % 1000)) / 1000;  
    var clock = hh+':';  
    if (hh<10) clock='0'+hh+':';
    if (mm < 10) clock += '0';  
    clock += mm+':';  
    if (ss < 10) clock += '0';  
    clock += ss;  
    return(clock);  
}  
 
function refreshCalendarClock(){  
document.all.calendarClock1.innerHTML = Year_Month();  
document.all.calendarClock2.innerHTML = Date_of_Today();  
document.all.calendarClock3.innerHTML = Day_of_Today();  
document.all.calendarClock4.innerHTML = CurentTime();  
}  
document.write('<table class="center" border="0" cellpadding="0" cellspacing="1" width="68"  height="60">'); //width = 68 height=60
document.write('<tr><td width="100%" height="100%" align="center">'); 
document.write('<table border="0" cellpadding="0" cellspacing="0" width="100%" hight="100%"  height="60">'); //height=60
document.write('<tr><td align="center" width="100%" height="100%">'); 
document.write('<font id="calendarClock1" style="font-family:Arial;font-size:9pt"> </font><br>'); 
document.write('<font id="calendarClock2" style="font-family:Arial;font-size:14pt;Line-Height=100%"> </font><br>'); 
document.write('<font id="calendarClock3" style="font-family:Arial;font-size:9pt;Line-Height=100%"> </font><br>'); 
document.write('<font id="calendarClock4" style="color:yellow;font-family:Arial;font-size:8pt;Line-Height=100%"><b> </b></font><br>'); 

document.write('</td></tr></table>'); 
document.write('</td></tr></table>'); 
document.write('<hr noshade size="0" color="009933" />');
setInterval('refreshCalendarClock()',1000);