// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'

var counts = {}
var avgStars = 0;

d3.json("http://127.0.0.1:5000/data").then(createMarkers1).catch(function (a) { console.log(a); });

function buildGraph(starList) {
  d3.select("#clearGraph").html("<canvas id='myChart'></canvas>");
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: "Rounded to Whole Star",
        data: starList,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
};

function updateData(data) {
  starList = {"1 Star": 0, "2 Stars": 0, "3 Stars": 0, "4 Stars": 0, "5 Stars": 0};
  countsCategory = [];
  nameList = d3.select("#restaurant-list");
  var starsum = 0;
  var restCounter = 0;

  nameList.html("");
  data.forEach(function (prSets) {
    prSets.forEach(function (rests) {
      nameList.append("li").text(rests.name);
      if (rests.stars == 1 || rests.stars == 1.5) {
        starList["1 Star"]++;
      }
      else if (rests.stars == 2 || rests.stars == 2.5) {
        starList["2 Stars"]++;
      }
      else if (rests.stars == 3 || rests.stars == 3.5) {
        starList["3 Stars"]++;
      }
      else if (rests.stars == 4 || rests.stars == 4.5) {
        starList["4 Stars"]++;
      }
      else if (rests.stars == 5) {
        starList["5 Stars"]++;
      }
      starsum += rests.stars;
      restCounter++;
    })
  })
 
  avgStars = starsum/restCounter;
  console.log(avgStars);
  d3.select("#clearGraph").html("");
  buildGraph(starList);
};

function myGauge(stars) {
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      type: 'indicator',
      mode: 'gauge',
      value: stars,
      title: {
        text: 'STAR <br><span style="color:grey;">REVIEW</span>',
      },
      gauge: {
        axis: { range: [null, 5], tickwidth: 1, tickcolor: 'darkgrey', nticks: 6 },
        bar: { color: 'darkgrey', thickness: 0.3 },
        bgcolor: 'white',
        borderwidth: 01,
        bordercolor: 'black',
        axes: [{
          pointers: [{
            type: 'Marker',
            markerType: 'Circle'
          }]
        }],
        steps: [
          { range: [0, 1], color: 'rgba(255, 99, 132, 0.7)' },
          { range: [1, 2], color: 'rgba(255, 159, 64, 0.7)' },
          { range: [2, 3], color: 'rgba(255, 206, 86, 0.7)' },
          { range: [3, 4], color: 'rgba(54, 162, 235, 0.7)' },
          { range: [4, 5], color: 'rgba(75, 192, 192, 0.7)' },
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: avgStars
        }
      },
    },
  ];
  // Layout 
  var layout = {
    width: 320,
    height: 250,
    margin: { t: 35, r: 15, l: 15, b: 0 },
    font: { color: 'black', family: 'Arial' }
  };
  // Render the plot to the div tag with id 'gauge'
  Plotly.newPlot('gauge', data, layout);
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

  // Event Listeners for the layer options
  map.on('overlayadd', function (lyr) {
    var layerList = [];
    if (map.hasLayer(overlayMaps[" $ Restaurants"])) {
      layerList.push(pr1);
    }
    if (map.hasLayer(overlayMaps[" $$ Restaurants"])) {
      layerList.push(pr2);
    }
    if (map.hasLayer(overlayMaps[" $$$ Restaurants"])) {
      layerList.push(pr3);
    }
    if (map.hasLayer(overlayMaps[" $$$$ Restaurants"])) {
      layerList.push(pr4);
    }
    updateData(layerList);
  })
  map.on('overlayremove', function (lyr) {
    var layerList = [];
    if (map.hasLayer(overlayMaps[" $ Restaurants"])) {
      layerList.push(pr1);
    }
    if (map.hasLayer(overlayMaps[" $$ Restaurants"])) {
      layerList.push(pr2);
    }
    if (map.hasLayer(overlayMaps[" $$$ Restaurants"])) {
      layerList.push(pr3);
    }
    if (map.hasLayer(overlayMaps[" $$$$ Restaurants"])) {
      layerList.push(pr4);
    }
    updateData(layerList);
  })
}
// create markers for "$" Restaurants
function createMarkers1(response) {
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
  console.log(pr4)
  // loop through the restaurants array
  for (var index = 0; index < restaurants.length; index++) {
    var restaurant = restaurants[index];
    // For each restaurant, create a marker, bind a popup with the restaurant's name, 
    // and populate other fields with restaurant info
    var restaurantMarker = L.marker([restaurant.latitude, restaurant.longitude], { myName: restaurant.name, myCity: restaurant.city, myReviewCount: restaurant.review_count, myStars: restaurant.stars })
      .bindPopup("<h3>" + restaurant.name + "</h3><hr><h5>Stars: " + restaurant.stars + "</h5><h7>Count: " + restaurant.review_count + "</h7><br><h9>Category: " + restaurant.categories + "</h9>")
      .on("click", function () {
        var infoCard1 = d3.select(".output1");
        var infoCard2 = d3.select(".output2");
        var infoCard3 = d3.select(".output3");
        infoCard1.html(this.options.myName);
        infoCard2.html(this.options.myCity);
        infoCard3.html(this.options.myReviewCount);
        console.log(this.options.myStars);
        myGauge(this.options.myStars);
      });

    // grab and store markers and individual restaurant info
    if (restaurant.attributes != null) {
      if (restaurant.attributes.RestaurantsPriceRange2 == "1") {
        restaurantMarkers1.push(restaurantMarker);
        pr1.push(restaurant);
      }
      else if (restaurant.attributes.RestaurantsPriceRange2 == "2") {
        restaurantMarkers2.push(restaurantMarker);
        pr2.push(restaurant);
      }
      else if (restaurant.attributes.RestaurantsPriceRange2 == "3") {
        restaurantMarkers3.push(restaurantMarker);
        pr3.push(restaurant);
      }
      else if (restaurant.attributes.RestaurantsPriceRange2 == "4") {
        restaurantMarkers4.push(restaurantMarker);
        pr4.push(restaurant);
      }
    }
  }
  // Create a layer group made fro the restaurant marker array, pass it into the createMap Function
  createMap(L.layerGroup(restaurantMarkers1), L.layerGroup(restaurantMarkers2), L.layerGroup(restaurantMarkers3), L.layerGroup(restaurantMarkers4), pr1, pr2, pr3, pr4);
}

// created Star Rating Categories Graph
