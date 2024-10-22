import csv
import os

# Set the path to the CSV file
csv_path = os.path.join('Top_Spotify_Songs_in_73_Countries_coord1.csv')

# Set to store unique countries
countries_set = set()

# Open and read the CSV file
with open(csv_path, 'r', newline='', encoding='utf-8') as csvfile:
    # Create a CSV reader object
    csv_reader = csv.DictReader(csvfile)
    
    # Iterate through each row in the CSV
    for row in csv_reader:
        # Add the country to the set
        countries_set.add(row['country'])

# Convert the set to a sorted list
countries_list = sorted(countries_set)

# Using defaultdict to help simplify data collection
from collections import defaultdict

def get_top_artists_by_country(csv_path, top_n=5):
    # Dictionary to store artist counts for each country
    country_artists = defaultdict(lambda: defaultdict(int))

    # Read the CSV file
    with open(csv_path, 'r', newline='', encoding='utf-8') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        for row in csv_reader:
            country = row['country']
            artists = row['artists'].split(', ')
            for artist in artists:
                country_artists[country][artist] += 1

    # Dictionary to store top artists for each country
    top_artists = {}

    # Get top N artists for each country
    for country, artists in country_artists.items():
        sorted_artists = sorted(artists.items(), key=lambda x: x[1], reverse=True)
        top_artists[country] = sorted_artists[:top_n]

    return top_artists

def write_top_artists_to_csv(top_artists, output_path):
    with open(output_path, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Country', 'Rank', 'Artist', 'Song Count']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        # Sort countries alphabetically
        sorted_countries = sorted(top_artists.keys())
        
        for country in sorted_countries:
            artists = top_artists[country]
            for rank, (artist, count) in enumerate(artists, 1):
                writer.writerow({
                    'Country': country,
                    'Rank': rank,
                    'Artist': artist,
                    'Song Count': count
                })

# Save new dataset
csv_path = 'Top_Spotify_Songs_in_73_Countries_coord1.csv'
output_path = 'top_artists_by_country.csv'
top_artists = get_top_artists_by_country(csv_path)
write_top_artists_to_csv(top_artists, output_path)
