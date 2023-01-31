let water = "https://water-use-analysis.onrender.com/water";

// d3.json(water).then(function(data){
//   let array = data.result.map(county => county)
//   console.log(array)

// });

function barChart(){
d3.json(water).then(function(data){
  let state = data.result.map(county => county)

  
  let county_x = data.result.map(county => county.State)
  let industrial = data.result.map(infos => infos["Industrial self-supplied total withdrawals total"])
  let domestic = data.result.map(infos => infos["Domestic total self-supplied withdrawals"])
  let irrigation = data.result.map(infos => infos["Irrigation and Thermoelectric total consumptive use total"])
  let livestock = data.result.map(infos => infos ["Livestock total withdrawals fresh"])
  let aquaculture = data.result.map(infos => infos ["Aquaculture total withdrawals total"])
  let mining = data.result.map(infos => infos ["Mining total withdrawals total"])
  let total = data.result.map(infos => infos ["Total withdrawals total"])

  let Domestic_Water_Use = {
    x: county_x,
    y: domestic,
    type: "bar",
    name: "Domestic Water use"
  }

  let Industrial_Water_Use = {
    x: county_x,
    y: industrial,
    type: "bar",
    name: "Industrial Water Use"
  }

  let Irrigation = {
    x: county_x,
    y: irrigation,
    type: "bar",
    name: "Irrigation Water Use"
  }

  let Livestock = {
    x: county_x,
    y: livestock,
    type: "bar",
    name: "Livestock Water Use"
  }

  let Aquaculture = {
    x: county_x,
    y: aquaculture,
    type: "bar",
    name: "Aquaculture Water Use"
  }

  let Mining = {
    x: county_x,
    y: mining,
    type: "bar",
    name: "Mining Water Use"
  }

  let Total = {
    x: county_x,
    y: total,
    type: "bar",
    name: "Total Water Use"
  }

  let data2 = [Domestic_Water_Use, Industrial_Water_Use, Livestock, Aquaculture, Mining, Total];

  let layout = ({"title": "Water Usage by State and Category",
                  "yaxis" : {"title":"Millions of Gallons per Day"},
                  "xaxis" : {"title":"State", "categoryorder":"total descending"},
                  barmode: 'stack'});


  Plotly.newPlot("time_series", data2, layout)
});
}

barChart()
