setInterval(countdown, 1000);

const expired = document.getElementById("expired");
const container = document.getElementById("container");

function countdown(){

    var today = new Date();
    var bdy = new Date(2021,7,14);
    var diffMilliSecs = bdy.getTime() - today.getTime();
    if(diffMilliSecs <= 0 ){
        expired.style.display = "block";
        container.style.display = "none";
    }
    var s = Math.floor(diffMilliSecs/1000);
    var min = Math.floor(s/60);
    var hr = Math.floor(min/60);
    var d = Math.floor(hr/24);

    s %= 60;
    min %= 60;
    hr %= 24;
    d %= 365;

    hr = (hr < 10)? "0"+hr:hr;
    min = (min < 10)? "0"+min:min;
    s = (s < 10)? "0"+s:s;

    //console.log(`${d}days ${hr}hours ${min}minutes ${s}seconds`);

    document.querySelector("#days .box").textContent = d;
    document.querySelector("#hours .box").textContent = hr;
    document.querySelector("#minutes .box").textContent = min;
    document.querySelector("#seconds .box").textContent = s;
}