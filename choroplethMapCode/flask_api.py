# app.py

from flask import Flask, jsonify, send_from_directory
from database_model import Session, TopArtist
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    print("Serving index.html")
    return send_from_directory('.', 'index.html')

@app.route('/static/<path:path>')
def send_static(path):
    print(f"Serving static file: {path}")
    return send_from_directory('static', path)

@app.route('/api/top_artists')
def get_top_artists():
    print("API request received for top artists")
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

@app.after_request
def after_request(response):
    print(f"Request: {request.path}, Status: {response.status}")
    return response

if __name__ == '__main__':
    app.run(debug=True)