let myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data. this is the county data, we'll need this in our data to pull from flask?

let water = "https://water-use-analysis.onrender.com/water";
let geoData = "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json";

let geojson;
let geojson2;


d3.json(water).then(function(county) {
  d3.json(geoData).then(function(geo) {
    geo.features = geo.features.filter(feature => feature.properties);
    
  
    geojson = L.choropleth(geo, {
      valueProperty: function(feature){
      val = county.result.filter(counti => counti.Fips == feature.id);
      if(val[0]) {
        return val[0]["Total withdrawals total"]; 
      } else { 
            console.log(feature.id);
            return 0
          }

    },
    scale: ["#95e1e9", "#3d54c8"],
    steps: 10,
    mode: "q",
      style: {
        // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: .8,
    },

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
        mouseout: function resetHighlight(event) {
          geojson.resetStyle(event.target);
          info.update();
          },
          
      });
      
      layer.bindPopup("<strong>" + feature.properties.NAME + "</strong><br /><br />Total water withdrawals in Mgal/d: " + 
      val.map(counti => counti["Total withdrawals total"]));
    }
  
    }).addTo(myMap)

    let legend = L.control({ position: "bottomleft" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let limits = geojson.options.limits;
      let colors = geojson.options.colors;
      let labels = [];
  
      // Add the minimum and maximum.
      let legendInfo = "<h5>Total Water Usage by County in Mgal/d </h5>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
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
//end
