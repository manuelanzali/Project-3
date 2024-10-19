# store_data.py

import csv
import os
from collections import defaultdict
from database_model import Session, TopArtist

def get_top_artists_by_country(csv_path, top_n=5):
    country_artists = defaultdict(lambda: defaultdict(int))

    with open(csv_path, 'r', newline='', encoding='utf-8') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        for row in csv_reader:
            country = row['country']
            artists = row['artists'].split(', ')
            for artist in artists:
                country_artists[country][artist] += 1

    top_artists = {}
    for country, artists in country_artists.items():
        sorted_artists = sorted(artists.items(), key=lambda x: x[1], reverse=True)
        top_artists[country] = sorted_artists[:top_n]

    return top_artists

def store_top_artists(top_artists):
    session = Session()
    for country, artists in top_artists.items():
        for rank, (artist, count) in enumerate(artists, 1):
            top_artist = TopArtist(country=country, rank=rank, artist=artist, song_count=count)
            session.add(top_artist)
    session.commit()
    session.close()

if __name__ == "__main__":
    csv_path = '../Resources/Top_Spotify_Songs_in_73_Countries_coord1.csv'
    top_artists = get_top_artists_by_country(csv_path)
    store_top_artists(top_artists)

    # Get unique countries
    countries_set = set(top_artists.keys())
    countries_list = sorted(countries_set)
