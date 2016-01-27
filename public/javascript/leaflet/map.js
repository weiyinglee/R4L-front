/*
$(function(){

 //Declare Map Object
  var map = L.map('map').setView([51.505, -0.09], 13);

  // Reference the tiles
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'your.mapbox.project.id',
    accessToken: 'your.mapbox.public.access.token'
  }).addTo(map);

  // Markers and Popups
});
*/

window.onload = function() {
  console.log("Leaflet Library", L);
  var map = L.map('map').setView([51.505, -0.09], 13);
  console.log("Leaflelt map object", map);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map); 
}
