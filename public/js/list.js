var flag = 0;
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    if(flag%2==0){
        document.getElementById("center").style.display = "none";
        // document.getElementById("map").style.display="none";
        flag++;
    }
    else{
        document.getElementById("center").style.display = "block";
        // document.getElementById("map").style.display="block";
        flag++;
    }
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});