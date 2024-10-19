# app.py

from flask import Flask, jsonify, send_from_directory
from database_model import Session, TopArtist
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/top_artists')
def get_top_artists():
    session = Session()
    top_artists = session.query(TopArtist).all()
    result = [
        {
            'country': artist.country,
            'rank': artist.rank,
            'artist': artist.artist,
            'song_count': artist.song_count
        } for artist in top_artists
    ]
    session.close()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
