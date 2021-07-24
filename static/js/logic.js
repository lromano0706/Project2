// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
// function createMap(restaurants){
  // Create the map object with options
  var myMap = L.map("map", {
    center: [40.4173, -82.9071],
    zoom: 9,
    // layers: [baseMaps, overlayMaps]
  });


// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// var baseMaps = {
//   "Street Map": streetMap
// };

// var overlayMaps = {
//   "Restaurants": restaurants
// };



// };

function createMarkers(response) {
  console.log(response)
  //pull the restaurants of the response data
  var restaurants = response;
// Initialize an array to hold restaurant markers
  var restaurantMarkers = [];
// loop through the restaurant array
for (var index = 0; index < restaurants.length; index++) {

  var restaurant = restaurants[index];
  
  // For each restaurant, create a marker and bind a popup with the restaurant's name
  var restaurantMarker = L.marker([restaurant.latitude, restaurant.longitude])
  .bindPopup("<h3>" + restaurant.name + "<h3><h3>Category: " + restaurant.categories + "</h3>" )
  .addTo(myMap);
  // Add the marker to the restaurantMakers array
  restaurantMarkers.push(restaurantMarker);
// Create a layer group made fro the restaurant marker array, pass it into the createMap Function
// L.tileLayer(restaurantMarkers);

}

}

d3.json("http://127.0.0.1:5000/$$$$").then(createMarkers).catch(function(a){console.log(a);});
