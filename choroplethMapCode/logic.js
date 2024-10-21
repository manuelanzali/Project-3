// Initialize the map
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Create a choropleth layer
let choroplethLayer;

// Function to calculate similarities between countries
function calculateSimilarities(data) {
    // Group artists by country
    const artistsByCountry = d3.group(data, d => d.Country);
    
    // Calculate percentage of shared artists between countries
    const similarities = {};
    artistsByCountry.forEach((artists1, country1) => {
        similarities[country1] = {};
        const artists1List = artists1.map(d => d.Artist);
        
        artistsByCountry.forEach((artists2, country2) => {
            if (country1 !== country2) {
                const artists2List = artists2.map(d => d.Artist);
                // Count how many artists from country1 appear in country2
                const sharedArtists = artists1List.filter(artist => 
                    artists2List.includes(artist)
                ).length;
                
                // Calculate similarity as percentage of shared artists
                const minArtists = Math.min(artists1List.length, artists2List.length);
                similarities[country1][country2] = sharedArtists / minArtists;
            }
        });
    });
    return similarities;
}

// Load the country data and artist data
Promise.all([
    d3.json('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson'),
    d3.csv('https://raw.githubusercontent.com/manuelanzali/Project-3/refs/heads/main/Resources/top_artists_by_country.csv')
]).then(([worldData, artistData]) => {
    // Process the artist data to calculate similarities
    const countries = [...new Set(artistData.map(d => d.Country))].sort();

    // Populate the dropdown with converted country names
    const select = document.getElementById('countrySelect');
    countries.forEach(countryCode => {
        const option = document.createElement('option');
        option.value = countryCode; // Keep the code as the value
        option.textContent = convertCountryCode(countryCode); // Display the full name
        select.appendChild(option);
    });

    const similarities = calculateSimilarities(artistData);

    // Update the map when a country is selected
    select.addEventListener('change', (event) => {
        const selectedCountry = event.target.value;
        updateChoropleth(worldData, similarities[selectedCountry]);
    });
});

function updateChoropleth(worldData, similarityScores) {
    if (choroplethLayer) {
        map.removeLayer(choroplethLayer);
    }

    choroplethLayer = L.geoJSON(worldData, {
        style: feature => ({
            fillColor: getColor(similarityScores[feature.properties.ISO_A2] || 0),
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        }),
        onEachFeature: (feature, layer) => {
            const percentage = ((similarityScores[feature.properties.ISO_A2] || 0) * 100).toFixed(0);
            const sharedArtists = Math.round((similarityScores[feature.properties.ISO_A2] || 0) * 5);
            // Use the converted country name in the popup
            const countryName = convertCountryCode(feature.properties.ISO_A2);
            layer.bindPopup(`${countryName}: ${percentage}% (${sharedArtists}/5 artists shared)`);
        }
    }).addTo(map);
}

function getColor(similarity) {
    const percentage = similarity * 100;
    
    return percentage >= 100 ? '#800026' : // 5/5 artists shared
           percentage >= 80  ? '#BD0026' : // 4/5 artists shared
           percentage >= 60  ? '#E31A1C' : // 3/5 artists shared
           percentage >= 40  ? '#FC4E2A' : // 2/5 artists shared
           percentage >= 20  ? '#FD8D3C' : // 1/5 artists shared
           percentage > 0    ? '#FEB24C' : // Some similarity
                             '#FFEDA0';   // No shared artists
}