from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class TopArtist(Base):
    __tablename__ = 'top_artists'

    id = Column(Integer, primary_key=True)
    country = Column(String(2))
    rank = Column(Integer)
    artist = Column(String(100))
    song_count = Column(Integer)

# Create an engine that stores data in the local directory's
# top_artists.db file.
engine = create_engine('sqlite:///top_artists.db')

# Create all tables in the engine
Base.metadata.create_all(engine)

# Create a sessionmaker
Session = sessionmaker(bind=engine)
