$(document).ready(function(){
var api_key="at_js9ePvEApOubx3TuhLWH67GGb41sq";
var ip;
// position icon
var iconmarker = new L.icon({
    iconUrl:'images/icon-location.svg',
    iconSize:[38,95],
    shadowSize:[50,64],
    iconAnchor:[22,94],
    shadowAnchor:[4,62]
    //popupAnchor[-3,-76];
});

var mappos = L.map('mapid').setView([28.505, 77.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9oYW1vaGFtbWVkIiwiYSI6ImNrZ2xiZG5idTByamkzMG5hb3JrdG5mazQifQ.kn4WxorvMQJI5Q8GA4O13A', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mappos);

    var marker = L.marker([28.505, 77.09], {icon: iconmarker}).addTo(mappos);


$('form').submit(function(e){
//CHECK
    e.preventDefault();
    ip=$('.search-box').val();
$.get("https://geo.ipify.org/api/v1?apiKey="+api_key+"&ipAddress="+ip,function(data)
{
    $('.card-ip-text').html(data.ip);

    $('.card-loc-text').html(data.location.city + ', ' + data.location.region + ' ' + data.location.postalCode);

    $('.card-ist-text').html('IST' + data.location.timezone);

    $('.card-isp-text').html(data.isp);
    mappos.setView([data.location.lat, data.location.lng], 15);

    marker = new L.marker([data.location.lat, data.location.lng], {icon: iconmarker}).addTo(mappos);
});
});
});

var names=document.querySelector('.names');
var desc =document.querySelector('.desc');
var temp=document.querySelector('.tempval')

$('form').submit(function(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+data.location.city.value+'&APPID=a863866c91b3f842a1b13b78759f5e0e').then(
        response => response.json()).then(data=>{var namevalue=data['name'];
        var tempval=data['main']['temp'];
        var descvalue=data['weather'][0]['description'];
    
        names.innerHTML=namevalue;
        temp.innerHTML=tempval;
        desc.innerHTML=descvalue;
    
    })
    .catch(err=>alert("wrong place"))
})
