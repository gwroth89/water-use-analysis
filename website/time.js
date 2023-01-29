let drought = "https://water-use-analysis.onrender.com/drought";

// d3.json(drought).then(function(data){
//     console.log(data)
// })

function barChart() {
d3.json(drought).then(function(data){
  let timeDate = data.result

  let trace1 = {
    x: [],
    y: [],
    type: "bar"
    };

  timeDate.forEach(function(val) {
    trace1.x.push(val["Validstart"]);
    trace1.y.push(val["Exceptional drought"])
  });

  Plotly.newPlot("time_series", [trace1])
});
};

function update() {
  let dropdown = d3.select('#selDataset');

  d3.json(drought).then(function(data) {
    let countyName = data.result

    console.log(countyName)

    let keys = d3.keys(countyName[0]).slice(1);

    console.log(keys)

    countyName.forEach(function(County) {
      dropdown.append("option")
      .text(County)
      .property("value", County)
    });

    let county1 = countyName[0];

    barChart(county1)
  });

};

function optionChange(item) {
  barChart(item)
};

update();

//end
