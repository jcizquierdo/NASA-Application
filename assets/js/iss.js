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
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
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
moveISS();