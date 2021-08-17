
$(document).ready(function(){
var api_key="at_js9ePvEApOubx3TuhLWH67GGb41sq";
var ip;
// position icon 
var iconmarker=L.icon({
    iconUrl:'../images/icon-location.svg';
    iconSize:[38,95],
    shadowSize:[ 50,64];
    iconAnchor:[22,94];
    shadowAnchor:[4,62];
    //popupAnchor[-3,-76];
});

var mappos=L.map('mapid').setView([28.505, 77.09], 13);

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
    ip=$('.search').val();
$.get("https://geo.ipify.org/api/v1?apiKey")+api_key+"&ipAddress="+ip,function(container
{
    $('.card-ip-text').html(container.ip);

    $('.card-loc-text').html(container.location.city + ', ' + container.location.region + ' ' + container.location.postalCode);

    $('.card-ist-text').html('IST' + container.location.timezone);

    $('.card-isp-text').html(container.isp);
    mappos.setView([card.location.lat, card.location.lng], 15);

    marker = new L.marker([card.location.lat, card.location.lng], {icon: iconmarker}).addTo(mappos);
});
});
});
