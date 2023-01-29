# Project 3 - Drought vs Water Consumption

## Project Proposal

Do Elon tweets have an impact on his associated corporations share price? 

We plan to use the Twitter API to look at Elon Musk’s tweets for mentions of Tesla or Twitter. We will also pull aggregate trading data from the Quandl Finance API and match to twitter data to analyze the impact of Elon tweets & aggregate tweet volume on his companies’ stock price, trading volume, and any other financial data of interest.

We plan to load the data into a relational database to perform our final analysis.

## Extract

**Twitter API Calls*
We made two separate calls to the Twitter v2 API. The first was to get Elon's account information that we then used to build our second call. The second call pulled as many of his historical tweets as possible. In order to get as many tweets as possible, we had to loop through each page of the request using the next_token parameter within the API. the response values were saved in lists.

**Quandl API Call**

Called Quandl API using NASDAQ-Datalink. This outputted the call as a dataframe that provided the stock data we needed for this analysis.

## Transform

**Lookup Table**

Built a lookup table to associate a numeric ID to our tickers.

**Twitter Data**

The data returned from our Twitter API call returned all of Elon's tweets. To answer the questions we were asking, we had to populate columns with boolean values for whether or not Elon mentioned either Twitter or Tesla on a given date. That included first parsing the tweets to see if they included Twitter or Tesla, which we saved to lists. Then once we had these values, we parsed the multi-date entries to a single date with boolean values associated with mentions of Twitter or Tesla. We then saved this to a dataframe.

**Quandl Data**

The data returned from our Quandl API call returned as two separate dataframes, one for each ticker (TSLA, TWTR). We needed this data as a single table for our database, which we accomplished using a union rather than a join. We then replaced ticker symbols with our numeric ids to match our database schema.

## Load

![Entity Relationship Diagram](https://raw.githubusercontent.com/T1me2/Project2-/main/database/ERD.png)

To load our data, we read in our .csv files (some steps mentioned above happened after this point). We used SQLAlchemy & Pandas to connect to our database and push our data using Python directly. Example Queries are included in the repo.

