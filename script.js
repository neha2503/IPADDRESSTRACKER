$(document).ready(function(){
var api_key="at_js9ePvEApOubx3TuhLWH67GGb41sq";
var ip;
// position icon
var iconmarker = new L.icon({
    iconUrl:'images/icon-location.svg',
    iconSize:[40,60],
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

var wind=document.querySelector('.wind');
var desc =document.querySelector('.desc');
var temp=document.querySelector('.temp');
var groups;
console.log("1!!!");

$('form').submit(function(e) {
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

        fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&q='+ data.location.city +'&APPID=a863866c91b3f842a1b13b78759f5e0e')
        .then(response => response.json())
        .then(dt=> {
            console.log(dt);
            var windvalue=dt['wind']['speed'];
            var tempval=dt['main']['temp'];
            var descvalue=dt['weather'][0]['description'];
            groups = dt['weather'][0]['main'];
            // groups = prompt('Enter weather: ');
            console.log(groups)
            console.log("2!!!");
            wind.innerHTML = windvalue + "M/S";
            temp.innerHTML = tempval + "&#176;C";
            desc.innerHTML = descvalue.toUpperCase();
            console.log("3!!!");
            icons = document.querySelector('.iconweather');

            if (groups == 'Thunderstorm') {
              icons.innerHTML = "<img src='animated/thunder-cropped.svg' class='icond'/>";
              document.querySelector('#titles').style.backgroundImage = "url('images/thunder.jpg')";
              document.querySelector('.weathertable').style.color = 'white';
              document.querySelector('h1').style.color = 'white';
            }

            else if (groups == 'Drizzle') {
              icons.innerHTML = "<img src='animated/rainy-4-cropped.svg' class='icond'/>";
              document.querySelector('#titles').style.backgroundImage = "url('images/rain.jpg')";
              document.querySelector('.weathertable').style.color = 'white';
              document.querySelector('h1').style.color = 'white';
            }

            else if (groups == 'Rain') {
              icons.innerHTML = "<img src='animated/rainy-6-cropped.svg' class='icond'/>";
              document.querySelector('#titles').style.backgroundImage = "url('images/rain.jpg')";
              document.querySelector('.weathertable').style.color = 'white';
              document.querySelector('h1').style.color = 'white';
            }

            else if(groups == 'Snow') {
              icons.innerHTML = "<img src='animated/snowy-5-cropped.svg' class='icond'/>";
              document.querySelector('#titles').style.backgroundImage = "url('images/snow.jpg')";
              document.querySelector('.weathertable').style.color = 'white';
              document.querySelector('h1').style.color = 'white';
            }

            else if(groups == 'Clear') {
              icons.innerHTML = "<img src='animated/day-cropped.svg' class='icond'/>";
              document.querySelector('#titles').style.backgroundImage = "url('images/sun.jpg')";
              document.querySelector('.weathertable').style.color = 'black';
              document.querySelector('h1').style.color = 'black';
            }

            else if(groups == 'Clouds') {
              icons.innerHTML = "<img src='animated/cloudy-cropped.svg' class='icond'/>";
              document.querySelector('#titles').style.backgroundImage = "url('images/cloud.jpg')";
              document.querySelector('.weathertable').style.color = 'darkblue';
              document.querySelector('h1').style.color = 'darkblue';
            }

            else if(groups == 'Atmosphere') {
              icons.innerHTML = "<img src='animated/weather_sunset.svg' class='icond'/>";
              document.querySelector('#titles').style.backgroundImage = "url('images/fog.jpg')";
              document.querySelector('.weathertable').style.color = 'white';
              document.querySelector('h1').style.color = 'white';
            }
        })
        .catch(err=>alert("Wrong Place"))
    });
});



});
