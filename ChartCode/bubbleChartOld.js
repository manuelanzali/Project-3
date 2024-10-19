//define the dropdown menu
const dropdown = d3.select("#selDataset");

//define the output outside of chart
let output;
 
 //load in data
 // Build the metadata panel
d3.json("https://raw.githubusercontent.com/manuelanzali/Project-3/refs/heads/main/bubbleChartCode/output.json").then((data) => {
    output = data;
    // Check if output is loaded correctly
    console.log("Data loading:", output);
    
    //Add a variable for the country from the list of countries
    const countries = [...new Set(output.map(song => song.country))]
   
   //create dropdown menu
    countries.forEach(country => {
        dropdown.append("option").text(country).attr("value", country);
    });

    //create an initial bubble chart with the first country's data
    const firstCountry = countries[0];
    createBubbleChart(firstCountry, output);
    
    // Attach an event listener to the dropdown menu
    dropdown.on("change", function() {
        const uniqueCountry = d3.select(this).property("value");
        optionChanged(uniqueCountry);
    });
});

  // Function to create the bubble chart
function createBubbleChart(countryName) {
    // Check if output is defined
    if (!output) {
        console.error("Output data is undefined.");
        return;
    }

    // Filter the data for the selected country
    //d3.json('https://raw.githubusercontent.com/manuelanzali/Project-3/refs/heads/main/bubbleChartCode/output.json').then(function(output) {
    const countryData = output.filter(song => song.country === countryName);
    console.log("Country data:", countryData);
 
    // Prepare data for the bubble chart, limit to 6 songs
    const trace = {
        x: countryData.slice(0,5).map(song => song.name),
        y: countryData.slice(0,5).map(song => song.tempo), 
        text: countryData.slice(0,5).map(song => "Artists: " + song.artists), 
        mode: 'markers',
        marker: {
            size: countryData.slice(0,5).map(song => song.tempo),
            color: countryData.slice(0,5).map(song => song.tempo),
            colorscale: "Inferno"
            }
        };

        console.log("X values:", countryData.slice(0, 5).map(song => song.name));
        console.log("Y values:", countryData.slice(0, 5).map(song => song.tempo));
        console.log("Marker sizes:", countryData.slice(0, 5).map(song => song.tempo));

    // Create the bubble chart
    Plotly.newPlot('bubble', [trace], {
        title: "Song metrics for each Country",
        xaxis: {title: "Top 6 Song Names"},
        yaxis: {title: "Liveliness"}
    });
}

// Function to change the dropdown
function optionChanged(selectedCountry) {
    //d3.json("https://raw.githubusercontent.com/manuelanzali/Project-3/refs/heads/main/bubbleChartCode/output.json").then((data) =>
    createBubbleChart(selectedCountry);    
}
// }

// bubbles/markers are not popping up on chart
// song names are now showing up differently depending on the country selected, yay!
