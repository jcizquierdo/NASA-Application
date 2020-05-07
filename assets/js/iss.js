var containment = $("#map-id")
// Map Variables


var map = L.map('map-id').setView([0, 0], 1);


L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=nmIsakkFcxoq5tFnsaH5', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map)

var iss_icon = L.icon({
    iconUrl: './assets/images/Satellite-icon.png',
    iconSize: [25, 25]
})

var iss = L.marker([0, 0], {icon: iss_icon}).addTo(map);
var isscirc = L.circleMarker([0, 0], {radius: 30}).addTo(map);
map.setView([0, 0], 2);
// ISS Lat and Lon Condition API

function moveISS () {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', 
    function(data) {
        var lat = data['iss_position']['latitude'];
        var lon = data['iss_position']['longitude'];

        // See leaflet docs for setting up icons and map layers
        // The update to the map is done here:
        iss.setLatLng([lat, lon]);
        isscirc.setLatLng([lat, lon]);
        map.panTo([lat, lon], animate=true);
        containment.append(map);
    });
    setTimeout(moveISS, 500); 
}

function ISStracker() {
    $('.description').html("<p>Welcome to the International Space Station Tracker! This map will show you the ISS's current location.</p>")
    $('#map-id').show();
    $('#main').hide();
    moveISS();
    //flyoverDate();
}

function hideISS() {
    $('#map-id').hide()
}

hideISS();

function flyoverDate() {
    let location = document.getElementById('searchLocation').value;
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' 
      + location
      + ',us&APPID=38502b70b289d62a156e29aa933997f8&units=imperial')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
        let lon = response.coord.lon;
        let lat = response.coord.lat;
        let url = "http://api.open-notify.org/iss-pass.json?lat="+lat+"&lon="+lon;
        console.log(url);
        return fetch(url);
        //+'&alt=20&n=5');//, function(data) {
            //data['response'].forEach(function (d) {
            //    var date = new Date(d['risetime']*1000);
            //     $('#isspass').append('<li>' + date.toString() + '</li>');
            //});
        //})
    })
    .then((issResponse) => {
        return issResponse.json();
    })
    .then ((issResponse) => {
        
    });
}