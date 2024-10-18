import pandas as pd
import numpy as np

def cleaned_600_billboard_hot_100_tracks(file_path):
    # Read the dataset
    df = pd.read_csv("Resources/600_billboard_hot_100_tracks.csv")
    
    # 1. Check for missing values
    print(f"Missing values before cleaning:\n{df.isnull().sum()}")
    
    # 2. Drop duplicates
    df = df.drop_duplicates()
    
    # 3. Make year, time_signature, key, mode, and popularity int
    df['Year'] = df['Year'].astype(int)
    df['Time_Signature'] = df['Time_Signature'].astype(int)
    df['Key'] = df['Key'].astype(int)
    df['Mode'] = df['Mode'].astype(int)
    df['Popularity'] = df['Popularity'].astype(int)
    
    # 4. Remove extra spaces in strings
    df['Track'] = df['Track'].str.strip()
    df['Artist'] = df['Artist'].str.strip()
    df['Album'] = df['Album'].str.strip()
    
    # 5. Make sure all values are in appropriate ranges(0-1)
    df['Danceability'] = df['Danceability'].clip(0, 1)
    df['Energy'] = df['Energy'].clip(0, 1)
    df['Speechiness'] = df['Speechiness'].clip(0, 1)
    df['Acousticness'] = df['Acousticness'].clip(0, 1)
    df['Instrumentalness'] = df['Instrumentalness'].clip(0, 1)
    df['Liveness'] = df['Liveness'].clip(0, 1)
    df['Valence'] = df['Valence'].clip(0, 1)
    
    return df

 # Replace file_path actual file path
file_path = 'Resources/600_billboard_hot_100_tracks.csv'
clean_df = cleaned_600_billboard_hot_100_tracks(file_path)
    
# Save cleaned dataset
clean_df.to_csv('cleaned_600_billboard_hot_100_tracks.csv', index=False)