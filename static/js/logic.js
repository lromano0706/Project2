// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'

function addData(data) {

};

function removeData(data) {

};

function createMap(restaurants1, restaurants2, restaurants3, restaurants4, pr1, pr2, pr3, pr4) {
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });
  // Create a baseMaps object to hold the streetMap layer
  var baseMaps = {
    "Street Map": streetMap,
    "Satellite Map": satelliteMap
  };
  // Create an overlayMaps object to hold the restaurants1 layer
  var overlayMaps = {
    " $ Restaurants": restaurants1,
    " $$ Restaurants": restaurants2,
    " $$$ Restaurants": restaurants3,
    " $$$$ Restaurants": restaurants4,
  };
  // Create the map object with options
  var map = L.map("map", {
    center: [40.10, -82.9071],
    zoom: 9,
    layers: [streetMap]
  });
  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(map);

  console.log(pr1);
  console.log(pr2);
  console.log(pr3);
  console.log(pr4);

  map.on('overlayadd', function(lyr) {
    if (lyr.name == " $ Restaurants") {
      addData(pr1);
    }
    else if (lyr.name == " $$ Restaurants") {
      addData(pr2);
    }
    else if (lyr.name == " $$$ Restaurants") {
      addData(pr3);
    }
    else if (lyr.name == " $$$$ Restaurants") {
      addData(pr4);
    }
  })

  map.on('overlayremove', function(eo) {
    if (lyr.name == " $ Restaurants") {
      removeData(pr1);
    }
    else if (lyr.name == " $$ Restaurants") {
      removeData(pr2);
    }
    else if (lyr.name == " $$$ Restaurants") {
      removeData(pr3);
    }
    else if (lyr.name == " $$$$ Restaurants") {
      removeData(pr4);
    }
  })
  
}
// create markers for "$" Restaurants
function createMarkers1(response) {
  console.log(response)
  //pull the restaurants of the response data
  var restaurants = response;
  // Initialize an array to hold restaurant markers
  var restaurantMarkers1 = [];
  var restaurantMarkers2 = [];
  var restaurantMarkers3 = [];
  var restaurantMarkers4 = [];

  var pr1 = [];
  var pr2 = [];
  var pr3 = [];
  var pr4 = [];
  // loop through the restaurants array
  for (var index = 0; index < restaurants.length; index++) {
    var restaurant = restaurants[index];
    // For each restaurant, create a marker and bind a popup with the restaurant's name
    var restaurantMarker = L.marker([restaurant.latitude, restaurant.longitude])
      .bindPopup("<h3>" + restaurant.name + "</h3><hr><h5>Stars: " + restaurant.stars + "</h5><h7>Count: " + restaurant.review_count + "</h7><br><h9>Category: " + restaurant.categories + "</h9>");
    // .addTo(myMap);
    console.log(restaurant.attributes)
    if (restaurant.attributes != null) {
      if (restaurant.attributes.RestaurantsPriceRange2 == "1") {
        // Add the marker to the restaurantMarkers array
        restaurantMarkers1.push(restaurantMarker);
        pr1.push(restaurant);
      }
      else if (restaurant.attributes.RestaurantsPriceRange2 == "2") {
        // Add the marker to the restaurantMarkers array
        restaurantMarkers2.push(restaurantMarker);
        pr2.push(restaurant);
      }
      else if (restaurant.attributes.RestaurantsPriceRange2 == "3") {
        // Add the marker to the restaurantMarkers array
        restaurantMarkers3.push(restaurantMarker);
        pr3.push(restaurant);
      }
      else if (restaurant.attributes.RestaurantsPriceRange2 == "4") {
        // Add the marker to the restaurantMarkers array
        restaurantMarkers4.push(restaurantMarker);
        pr4.push(restaurant);
      }
    }
  }
  console.log(restaurantMarkers1);
  console.log(restaurantMarkers2);
  console.log(restaurantMarkers3);
  console.log(restaurantMarkers4);
  // Create a layer group made fro the restaurant marker array, pass it into the createMap Function
  createMap(L.layerGroup(restaurantMarkers1), L.layerGroup(restaurantMarkers2), L.layerGroup(restaurantMarkers3), L.layerGroup(restaurantMarkers4), pr1, pr2, pr3, pr4);
  // from response
  // var tableData = response
  // var button = d3.select("#navbarDropdown");
}
d3.json("http://127.0.0.1:5000/data").then(createMarkers1).catch(function (a) { console.log(a); });

