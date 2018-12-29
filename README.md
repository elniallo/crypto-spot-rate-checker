# crypto-spot-rate-checker
A simple tool that polls a cryptocurrency price api and stores the spot rate at the time in a SQL database

This tool allowed for the real-time matching of fiat prices to cryptocurrency payments as part of the Hycon ICO process.

## Usage
- Input your DB connection info into the dbConfig file
- Ensure your db has a table called spot_rates with columns (bitcoin,ethereum,litecoin) //TODO: abstract coins
- npm i
- npm start
