console.log("app.js loaded");

// Initialize the map
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

console.log("Map initialized");

// Create a choropleth layer
let choroplethLayer;

// Load the country data and artist data
console.log("Starting to load data");
Promise.all([
    d3.json('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson'),
    d3.json('/api/top_artists')
]).then(([worldData, artistData]) => {
    console.log("Data loaded:", { worldDataLength: worldData.features.length, artistDataLength: artistData.length });
    
    // Process the artist data to calculate similarities
    const countries = [...new Set(artistData.map(d => d.country))].sort();
    const similarities = calculateSimilarities(artistData);

    console.log("Similarities calculated");

    // Populate the dropdown
    const select = document.getElementById('countrySelect');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = convertCountryCode(country);
        select.appendChild(option);
    });

    console.log("Dropdown populated");

    // Update the map when a country is selected
    select.addEventListener('change', (event) => {
        const selectedCountry = event.target.value;
        console.log("Country selected:", selectedCountry);
        updateChoropleth(worldData, similarities[selectedCountry]);
    });
}).catch(error => {
    console.error("Error loading data:", error);
});

function calculateSimilarities(data) {
    // Group artists by country
    const artistsByCountry = d3.group(data, d => d.country);
    
    // Calculate Jaccard similarity between countries
    const similarities = {};
    artistsByCountry.forEach((artists1, country1) => {
        similarities[country1] = {};
        const set1 = new Set(artists1.map(d => d.artist));
        artistsByCountry.forEach((artists2, country2) => {
            if (country1 !== country2) {
                const set2 = new Set(artists2.map(d => d.artist));
                const intersection = new Set([...set1].filter(x => set2.has(x)));
                const union = new Set([...set1, ...set2]);
                similarities[country1][country2] = intersection.size / union.size;
            }
        });
    });
    return similarities;
}

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
            const countryName = convertCountryCode(feature.properties.ISO_A2);
            layer.bindPopup(`${countryName}: ${(similarityScores[feature.properties.ISO_A2] || 0).toFixed(2)}`);
        }
    }).addTo(map);
}

function getColor(similarity) {
    return similarity > 0.8 ? '#800026' :
           similarity > 0.6  ? '#BD0026' :
           similarity > 0.4  ? '#E31A1C' :
           similarity > 0.2  ? '#FC4E2A' :
           similarity > 0.1   ? '#FD8D3C' :
           similarity > 0.05   ? '#FEB24C' :
           similarity > 0   ? '#FED976' :
                              '#FFEDA0';
}
