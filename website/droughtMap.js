
//Connecting our Leaflet map to the html on "map"
let myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4
  });
  
  //bringing designating our basemap layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Loading the GeoJSON data from our flask render as well as available polygon type county data
  
  let Counties = "https://water-use-analysis.onrender.com/average";
  let geoData = "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json";
  
  //creating a letible for the choropleth layer
  let geojson;
  
//Retrieving the data with d3.js
  d3.json(Counties).then(function(county) {
    d3.json(geoData).then(function(geo) {
      //filtering the geo data to look for specific key:object pairs
      geo.features = geo.features.filter(feature => feature.properties)
    
  //calling the choropleth layer
      geojson = L.choropleth(geo, {
        valueProperty: function(feature){
          //filtering our data to match the FIPS key in the geo data to get polygon coordinates
        val = county.result.filter(counti => counti.Fips == feature.id);
          //looking through the data and pulling in the key "Total withdrawals total", if not found,
      //returning the unmatched FIPS in the console log
          if(val[0]) {
            return val[0]["Moderate drought"]; 
          } else { 
                console.log(feature.id);
                return 0
              }
      },
      //styling the choropleth layer
      scale: ["#ffffb2", "#b10026"],
      steps: 10,
      mode: "q",
        style: {
          // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8,
      },
  
      //creating the action events to highlight the county polygon when hovered over by mouse
      onEachFeature: function(feature, layer) {
        layer.on({
          mouseover: function highlightFeature(event) {
            let layer = event.target;
            layer.setStyle({
                weight: 5,
                color: 'black',
                dashArray: '',
                fillOpactity: .9
            });
  
            // layer.bringToFront();
            info.update(layer.feature.properties);
          },
          //resetting the polygon to not be highlighted after mouse has passed
          mouseout: function resetHighlight(event) {
            geojson.resetStyle(event.target);
            info.update();
            },
            
        });
        //setting markers with info from the data API
        layer.bindPopup("<strong>" + feature.properties.NAME + "</strong><br /><br />Percentage of county in Moderate Drought " + 
          Math.round(val.map(counti => counti["Moderate drought"]) + '%'));
      }
    
      }).addTo(myMap)
    //creating the legend
    //calling out the legend position
      let legend = L.control({ position: "bottomleft" });
    legend.onAdd = function() {
      //creating a div in the html for the legend and creating letibles for the style
      let div = L.DomUtil.create("div", "info legend");
      let limits = geojson.options.limits;
      let colors = geojson.options.colors;
      let labels = [];
  
      // Adding the minimum and maximum measurements to display on the legend
      let legendInfo = "<h5>Percentage of County in Moderate Drought</h5>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
      
      //appending the div with the legend info
      div.innerHTML = legendInfo;
      //setting the colors for the legend
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding the legend to the map
    legend.addTo(myMap);

    })
      
  })
  