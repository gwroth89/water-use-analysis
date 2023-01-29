# Project 3 - Drought vs Water Consumption

Team Name:  
         Briefly Mentioned 
Team Members:   
         Rahma Ali, Kathleen Pflugi, Greg Roth, Art Rogers


![image](https://user-images.githubusercontent.com/113714205/215357990-970a671b-2cce-4851-87a1-639689f9c121.png)


---

## Project Proposal

We plan to analyze county-level data made available by the US Drought Monitor, and water usage data provided by the United States Geological Survey. In our analysis we hope to learn whether communities suffering from drought are further impacting their situation with high water consumption rates. We also plan to look at Urban vs Rural communities to understand where consumption mitigation efforts can have the most impact.

## Data Sources:
1.	The United States Drought Monitor collects weekly data on drought conditions around the U.S.
2.	Estimated Use of Water in the United States County-Level Data for 2015
3.	GeoJSON State and County Fips.json 

## Data Limitations
1.	The Water Use data is collected every 5 years.
2.	Overall there was an abundance of data to work with and scaling down the columns was a priority.
3.	Drought was not reported by all counties in some states.

## Data Cleaning
•	There were 141 columns in water Usage file and we filtered down to 38 columns.
•	Renamed all the columns in Drought and Water Usage files.
•	Dropped rows for the territories of the US like PR (Puerto Rico) & VI (Virgin Islands) from Water Usage file.
•	Checked for duplicate, blank, NAN and null values.

## Database & Flask Deployment
DATABASE:
Created a SQLite database with 3 tables and populated the tables with the 2 sources of data.

1.	Table 1 - Water - USGS Water Use Data
2.	Table 2 – Drought - US Drought Monitor weekly drought data
3.	Table 3 – Average Drought - Drought Data averaged for the year

FLASK:
Our Flask deployment has 3 static routes used to pass our tables as JSON to our Web App, which we then used for visualizations on our front end.

## Flask Static Routes
Our Flask deployment has 3 static routes used to pass our tables as JSON to our Web App:
1.	USGS Water Use Data
2.	US Drought Monitor weekly drought data
3.	Drought Data averaged for the year

## Web Development
Basic Bootstrap layout with navbar links
Visualizations:
•	Water use by US county choropleth
•	Drought percentage choropleth
•	Weekly exceptional drought level time series
•	Visual of the sum of all California water consumption categories using Observable Plot Javascript library (?)
•	Irrigation
•	Domestic use
•	Aquaculture

## Analysis & Findings


![Entity Relationship Diagram]

To load our data, we read in our .csv files (some steps mentioned above happened after this point). We used SQLAlchemy & Pandas to connect to our database and push our data using Python directly. Example Queries are included in the repo.

