// Build the metadata panel
d3.json("output.json").then((output) => {
 //Add a variable for the country from the country array
 const countries = output.country;

 //Create the dropdown menu
 const dropdown = d3.select("#selDataset")
 countries.forEach(country => {
    dropdown.append("option").text(country.name);
  });

  //create an initial bubble chart with the first country's data
  const firstCountry = countries[0];
  createBubbleChart(firstCountry);
  });

  // Function to create the bubble chart
function createBubbleChart(countryName) {
    // Filter the data for the selected country
    d3.json('output.json').then(function(output) {
        let countryData;
        for (let i=0; i < output.country.length; i++) {
            if (output.country[i] === country) {
                countryData = output.country[i];
                break;
            }
        }

 
        // Prepare data for the bubble chart, limit to 6 songs
        const bubbleLayout = {
            title: "Song metrics by Country",
            x: output.name.slice(0,5).map(songName => output.name), // Adjust based on your data structure
            y: output.liveliness.slice(0,5).map(liveliness => output.liveliness), // Adjust based on your data structure
            text: output.name.slice(0,5).map(songName => output.name), // Adjust based on your data structure
            mode: 'markers',
            marker: {
                size: output.liveliness.slice(0,6).map(liveliness => liveliness.sizeValue), // Adjust based on your data structure
                color: output.name.slice(0,6).map(songName => output.name), // Adjust based on your data structure
                colorscale: "Inferno"
            }
        };

        // Create the bubble chart
        Plotly.newPlot('bubble', [bubbleData]);
    });
}

// Function to handle dropdown change
function optionChanged(selectedCountry) {
    createBubbleChart(selectedCountry);
}


