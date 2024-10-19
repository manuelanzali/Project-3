const URL = "https://raw.githubusercontent.com/manuelanzali/Project-3/refs/heads/main/ChartCode/output.json";


// Callback function to Group Elements
function getCountry(song) {
    return song.country;
}


function average(values) {
    var sum = values.reduce((a, b) => a + b, 0)
    return sum / values.length;
}


// function doNothing() {
//     console.log("doNothing");
// };

var countries = {};
// function getCountryData(url) {
    // const response = await fetch(url);
    // const allSongs = await response.json();
    d3.json(URL).then((allSongs) => {
        var songsByCountry = Object.groupBy(allSongs, getCountry);
        // console.log(songsByCountry);
        // console.log(allSongs[0])
        var topSongsByCountry = {};
        // var countries = {};
        Object.entries(songsByCountry).forEach(entry => {
            // console.log(entry)
            var [country, allSongs] = entry;
            // console.log(allSongs);
            var topSongs = allSongs.slice(0,5);
            // console.log(topSongs)
            topSongsByCountry[country] = topSongs;
            //calculate aggregate country data
            var countryData = {};
            countryData.songNames = topSongs.map(song => song.name);
            countryData.acousticness = average(topSongs.map(song => song.acousticness));
            countryData.danceability = average(topSongs.map(song => song.danceability));
            countryData.energy = average(topSongs.map(song => song.energy));
            countryData.liveness = average(topSongs.map(song => song.liveness));
            countryData.loudness = average(topSongs.map(song => song.loudness));
            countryData.instrumentalness = average(topSongs.map(song => song.instrumentalness));
            countryData.tempo = average(topSongs.map(song => song.tempo));
            countries[country] = countryData;
        });
    });
// }

// while (Object.keys(countries).length < 1) {
//     doNothing(); 
// }
// countries = getCountryData(URL).then();
// console.log(countries);