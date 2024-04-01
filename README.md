# TheInfatuation Scraper

## Project Description

A versatile web scraper built with Node.js that extracts valuable restaurant data from The Infatuation: [https://www.theinfatuation.com](https://www.theinfatuation.com). This scraper can gather data from two distinct categories:

* **Specific-Purpose Restaurant Guides:**  Scrapes restaurant listings tailored to specific purposes (e.g., best brunch spots, date night restaurants) along with detailed information on each restaurant.

* **City-Based Restaurant Listings:** Scrapes comprehensive restaurant listings from a given city on The Infatuation.

## Data Collected

For each restaurant, the scraper gathers the following details:

* **Name**
* **Description**
* **Cuisine**
* **Street Address**
* **Neighborhood**
* **Phone Number**
* **Country**
* **Source (The Infatuation)**
* **City**
* **Rating**
* **Latitude**
* **Longitude**
* **URL**
* **Photos**
* **Website** 
* **Perfect For (e.g., date night, groups)**
* **Price**

## Technologies Used

* **Node.js:** Core runtime environment for the project.
* **JavaScript:**  The primary programming language.
* **Puppeteer:**  For browser automation and controlling web page interactions.
* **Axios:** For making HTTP requests to The Infatuation.
* **Cheerio:** For parsing HTML and extracting specific data elements.
* **MongoDB:**  To store the scraped data in a structured format.

## How to Use

1. **Prerequisites**
   * Node.js and npm (or yarn) installed on your system.
   * A running MongoDB instance.

2. **Installation**
   ```bash
   git clone https://github.com/flurryunicorn/theinfautation-scraper
   cd theinfautation-scraper
   npm install 
   ```

3. **Configuration**
    * Create a `.env` file in the project root to store your MongoDB connection string. Example:
      ```
      MONGODB_URI=mongodb://localhost:27017/your_database_name
      ```

4. **Running the Scraper**
    * Modify the `index.js` (or relevant script) file to specify the target URLs and desired scraping behavior.
    * Execute the script: 
      ```bash
      node index.js
      ``` 

## Contributing
Pull requests for feature suggestions/improvements are welcome. For major changes, please open an issue first to discuss what you would like to change.
