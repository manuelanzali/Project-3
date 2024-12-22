
# Exploring Global Music Trends and Song Metrics

Link to Proposal: https://sites.google.com/view/project3data-visualization/home


## Table Of Contents:

1. About our Analysis
2. Data Visualizations
3. Conclusion
4. Ethical Considerations
5. Things to Note
6. Citations

## About our Analysis
● The object of this analysis was to explore data surrounding music trends and analyzing what kind of music individuals globally enjoy listening to and why.

● To achieve this, we analyzed a Spotify dataset gathered from 73 different countries. This dataset has 25 variables, including Spotify ID, track name, artist, daily rank, country, and several musical characteristics such as valence (which measures the song's positivity), danceability, energy, key, acousticness, and tempo. 

● Our dataset has various variables, including Country, Region, Subregion (Location), Life 
Ladder, Log GDP per capita, Social support, Healthy life expectancy at birth, Freedom to 
make life choices, Generosity, Perceptions of corruption, Positive affect, Negative affect, 
Various Health indicators

● From this data, we developed various visualizations that showcase music trends in the US and worldwide using JavaScript, and Leaflet, and Google Colab that provide a clear story of the conclusion we came to.


## VISUALIZATIONS


### Bokeh Plots using Python visualization library


#### A Comparison of the 10 Most Popular Tracks on October 20th, 2023 and October 20th, 2024

![image](https://github.com/user-attachments/assets/4f2b1ea3-092c-4a1a-a31d-a89e8a7f7564)

![image](https://github.com/user-attachments/assets/45b7ad5b-410e-4204-8546-b2ccb3484dd9)


##### ETL:
![image](https://github.com/user-attachments/assets/861ea3ff-ed2c-439e-85ed-228ce8379cc2)
![image](https://github.com/user-attachments/assets/9dd6956b-d714-4d5c-bc53-3622330a2428)


##### Bokeh:
![image](https://github.com/user-attachments/assets/655f6dfe-389a-482d-a70e-5c3bc4056528)



Comparing charts from October 20th, 2023 to October 20th, 2024, we can observe shifts in the overall metrics. The most dramatic change is in valence, which increased by 75.97%, showing a shift toward more positive, uplifting music. Average acousticness dropped by 45.80% suggesting a move away from acoustic elements in favor of more electronic sounding music. The average danceability increased slightly in 2024, but 2023 had more songs with a danceability over 0.8. 

Morgan Wallen is the only artist that appears on the October 20th, 2023 and the October 20th, 2024 top ten.


#### Danceability by Country

![image](https://github.com/user-attachments/assets/d200c536-f1e5-45d3-8b8e-5646509e84ac)


##### Bokeh:

![image](https://github.com/user-attachments/assets/039c4544-e88d-48f6-bfdd-9d18c41826bd)

![image](https://github.com/user-attachments/assets/e4794e76-1556-4ca0-8fde-c0ad7ff1e1ec)



Analyzing this dataset helped to highlight the top 20 danceable songs which showcased a diverse array of tracks from various countries, each demonstrating a high level of danceability.


### Choropleth Map Showing Similarities in Music Taste


![image](https://github.com/user-attachments/assets/31f19a24-f44b-4fa5-95ba-9ad9c388d15d)

#### Loading in the data:

![image](https://github.com/user-attachments/assets/e30e2ce1-48f8-4f2f-8207-473299c20a4f)

![image](https://github.com/user-attachments/assets/b24445fe-f4b8-46ff-b93f-73099450eef1)

![image](https://github.com/user-attachments/assets/7fd8fc2e-5ab3-40ee-aad0-768eeca1269b)

![image](https://github.com/user-attachments/assets/4db9d682-25b4-48c7-9fb5-2d0c9767ec54)


There are two main factors going into the comparison of each countries' music taste: language and location. In the dataset, if a country has a shared language with another country, they share some if not most of the same top artists. Some countries who share borders or who are geologically close will also share top artists but this wasn't as common.

One other factor that plays into this data is that, despite language barriers, popular artists like Taylor Swift and Jung Kook break norms and transcend borders and languages.



### Exploring the Correlation Between the Metrics of Top Songs by Country in 2023

![image](https://github.com/user-attachments/assets/dc975353-496d-4f4e-8138-3d7dc1697b1f)


#### Load csv file into SQLite and upload into a JSON file:

![image](https://github.com/user-attachments/assets/4e45a2d5-65c3-4e80-ad15-f2db2ce09ba5)

![image](https://github.com/user-attachments/assets/db9d5d3a-1bdc-4b99-88af-c35cb1e958ce)

![image](https://github.com/user-attachments/assets/03c99956-11fe-4b73-9a64-cc5bc8f94a4f)

![image](https://github.com/user-attachments/assets/606ac575-db45-468b-a65e-1d9a9e656b20)


#### Create HTML:

![image](https://github.com/user-attachments/assets/397fe601-7043-4bf1-89dd-a6fd64f4bf16)

![image](https://github.com/user-attachments/assets/796ae501-8d4b-4534-b266-3a70b9159767)

![image](https://github.com/user-attachments/assets/24a010f6-3863-475b-8c42-33fc90e0abde)


#### Create Asynchronous function:

![image](https://github.com/user-attachments/assets/b458a52f-39a7-4b33-857d-229b375b998a)

![image](https://github.com/user-attachments/assets/b073da1c-98c7-4a5c-a15c-7e25d7646782)


#### Create Bubble Chart:

![image](https://github.com/user-attachments/assets/1d7c319d-e80b-4159-b35a-3a7287a4467c)

![image](https://github.com/user-attachments/assets/e9a57e97-a4c8-470b-9390-ccdcfe6f9b75)

![image](https://github.com/user-attachments/assets/c5ab4696-dbb7-4134-b76f-66574a42107a)

![image](https://github.com/user-attachments/assets/6d5b3725-b99d-4eb4-9ec7-fb150687a952)



## Conclusion


1. Influence of Language and Geography: The relationship between shared language and location indicates that these factors heavily influence music taste. Countries with shared languages tend to have similar top artists, while geographical proximity may have less impact.


2. Transcending Borders: The ability of artists like Taylor Swift and Jung Kook to gain popularity across different linguistic and cultural barriers highlights the increasing globalization of music, where certain artists can connect with diverse audiences regardless of language.


3. Shift in Musical Trends: The significant increase in valence (75.97%) indicates a notable shift towards more positive and uplifting music. This could reflect broader societal trends or a response to current events influencing listener preferences.


4. Decrease in Acoustic Elements: The substantial drop in average acousticness (45.80%) suggests a move away from acoustic music styles towards more electronic genres. This might point to evolving production techniques or changing listener preferences favoring synthesized sounds.


5. Danceability Trends: Although average danceability increased slightly, the previous year featured more songs with high danceability scores (over 0.8). This suggests a nuanced change in how listeners engage with music, possibly favoring different types of rhythmic elements.


6. Artist Consistency: Morgan Wallen's presence in both top ten lists highlights his enduring appeal, indicating that some artists maintain a strong fan base over time, even amidst changing musical landscapes.
   

Overall, these findings reflect dynamic shifts in music preferences influenced by various cultural, social, and technological factors, suggesting a complex interplay between familiarity and novelty in global music consumption.


## Ethical Considerations

Firstly, we are trusting that the creator of the dataset obtained the information credibly and that it was obtained straight from Spotify as listed in the provenance on Kaggle. Secondly, our data soley relies on Spotify which excludes people who do not have access to the platform or who choose to use different streaming platforms. Next, we are not sure how Spotify determines their rankings of songs and the metrics the songs are given. Finally, even though we can conclude global observations, the data is only from 73 countries and would exclude other countries around the world.


## Things to Note

Open HTML in chartCode folder using live server to prevent CORS error


## Citations

https://www.kaggle.com/datasets/asaniczka/top-spotify-songs-in-73-countries-daily-updated/versions/376

https://gist.github.com/metal3d/5b925077e66194551df949de64e910f6#file-country-coord-csv


Please note kaggle dataset is updated daily; the one used is verison 376



