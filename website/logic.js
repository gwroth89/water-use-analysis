let myMap = L.map("map", {
  center: [36.7783, -119.4179],
  zoom: 6
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data. this is the county data, we'll need this in our data to pull from flask?

let Counties = "https://water-use-analysis.onrender.com/water";
let geoData = "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json";

let geojson;
// let geojson1;


d3.json(Counties).then(function(county) {
  d3.json(geoData).then(function(geo) {
    geo.features = geo.features.filter(feature => feature.properties.STATE == 06);
    
  
    geojson = L.choropleth(geo, {
      valueProperty: function(feature){
      val = county.result.filter(counti => counti.Fips == feature.id);

      // console.log (val)
      return val[0]["Total withdrawals total"]

    },
    scale: ["#ffffb2", "#b10026"],
    steps: 10,
    mode: "q",
      style: {
        // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8,
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
      
      layer.bindPopup("<strong>" + feature.properties.NAME + "</strong><br /><br />Total water withdrawals in Mgal/d" + 
        val[0]["Total withdrawals total"]);
    }
  
    }).addTo(myMap)
  })
    
})


//////////////////////////////////////////////////////
//             Plotly time series                  //
////////////////////////////////////////////////////

