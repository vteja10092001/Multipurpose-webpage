// const timer = document.querySelector("#timer");
// const submit = document.querySelector("#submit");

// submit.addEventListener("click", settimer);

// const div = document.getElementById("query");

// function settimer(){

//     let timeInMin = document.getElementById("input").value;
//     let time = timeInMin*60;
//     var myVar = setInterval(timeupdate, 1000);

//     div.style.display="none";
    
//     function timeupdate(){
//         let min = Math.floor(time/60);
//         let sec = time%60;
//         sec = (sec < 10)? '0' + sec : sec;
//         timer.innerHTML = `<h1>${min}:${sec}</h1>`;
//         if(time <= 0){
//             time = 0;
//             clearInterval(myVar);
//             alert("Time over");
//         }
//         time--;
//     }
// }
let time = 5*60;
var myVar = setInterval(timeupdate, 1000);
function timeupdate(){
            let min = Math.floor(time/60);
            let sec = time%60;
            sec = (sec < 10)? '0' + sec : sec;
            min = (min < 10)? '0' + min : min;
            document.querySelector("#minutes .box").textContent = min;
            document.querySelector("#seconds .box").textContent = sec;
            if(time <= 0){
                time = 0;
                clearInterval(myVar);
                alert("Time over");
            }
            time--;
        }


