import countries from "./countryDataAsync.js";


function buildDropdown() {
    var firstValue = Object.values(countries)[0];
    var metrics = Object.keys(firstValue).filter(key => key != "songNames");

    const dropdown = d3.select("#selDataset");
    metrics.forEach(metric => dropdown.append("option").text(metric).attr("value", metric));
    dropdown.on("change", function() {
        const selectedMetric = d3.select(this).property("value");
        optionChanged(selectedMetric);
    });
    optionChanged(metrics[0]);
}
 

// Function to change the dropdown
function optionChanged(selectedParameter) {
    //d3.json("https://raw.githubusercontent.com/manuelanzali/Project-3/refs/heads/main/bubbleChartCode/output.json").then((data) =>
    createChartExample(selectedParameter);    
}


function createChartExample(parameterName) {
    if (!countries) {
        console.log("no countries");
        return;
    }

    var selectedMetrics = {};
    Object.entries(countries).forEach(([country, metrics]) => {
        selectedMetrics[country] = metrics[parameterName];
    });
    console.log(selectedMetrics);

    //create colorscale
    var values = Object.values(selectedMetrics);
    var colorScale = d3.scaleSequential(d3.interpolateReds)
        .domain(d3.extent(values));

    var trace1 = {
        x: Object.keys(selectedMetrics),
        y: Object.values(selectedMetrics),
        mode: 'markers',
        marker: {
            color: Object.values(selectedMetrics).map(value => colorScale(value)), // color is based on th escale
            size: 10 
        }
    };

    Plotly.newPlot('example', [trace1]);
}


buildDropdown();