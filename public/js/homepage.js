setInterval(countdown, 1000);



function countdown(){

    var today = new Date();
    var s = today.getSeconds();
    var m = today.getMinutes();
    var hr = today.getHours();
    if(m<=9){
        m = "0"+m;
    }
    // else{
    //     m = m+" :";
    // }
    if(s<=9){
        s = "0"+s;
    }
    if(hr<=9){
        hr = "0"+hr;
    }
    // else{
    //     hr=hr+" :";
    // }

    document.querySelector("#hours .box").textContent = hr;
    document.querySelector("#minutes .box").textContent = m;
    document.querySelector("#seconds .box").textContent = s;
}