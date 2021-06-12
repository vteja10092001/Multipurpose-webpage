mapboxgl.accessToken = 'pk.eyJ1IjoiMTlqZTAzMTQiLCJhIjoiY2tvemRvazF0MGFqMjJwa29jYzd0d3VydiJ9.ExByHd3BJgY54FjoTOibbQ';

navigator.geolocation.getCurrentPosition(succcessLocation,errorLocation,{enableHighAccuracy:true})

function succcessLocation(position){
    getMap([position.coords.longitude, position.coords.latitude])
}
function errorLocation(){
    getMap([-74.5, 40])
}
function getMap(center){
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center:center||[-74.5, 40],
        zoom:9,
        animation: Animation.DROP,
        icon: "map.png"
    });
    map.addControl(new mapboxgl.NavigationControl());

    var directions = new MapboxDirections({accessToken: mapboxgl.accessToken})
    map.addControl(directions,'top-left');
}
var flag = 0;
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    if(flag%2==0){
        document.getElementById("map").style.display="none";
        flag++;
    }
    else{
        document.getElementById("map").style.display="block";
        flag++;
    }
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});
