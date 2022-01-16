# Introduction
The prevalence of neurological disorders has expanded over the years, including diagnoses such as Autism, Attention Deficit and Hyperactivity Disorder (ADHD), Intellectual Disability Disorder (IDD), etc.  Not only can this have a debilitating effect on the individual, but this also affects the family members who are often providing the supports that are needed.  The purpose of this project is to do a comparison of neurological disorder statistics across the globe.  We will focus on building visuals that display data for different types of neurological disorders, the country data, gender, and the rate based on total population with the disorder vs. the total population.  With the growth of these disorders rising, additional insights in the prevalence could be useful.

# Data Source
This repository includes data from 1990 to 2017 on prevalence estimates by gender for four neurological disorders.  This includes ADHD, IDD, Autism, and Aspergers disorders.  The data was not clean as it had country data, but much of it was comingled with continents or section of continents such as "western europe".  

## Source:  https://ourworldindata.org/neurodevelopmental-disorders

# Data Cleaning Process
We were given four csv files, with each file containing data on ADHD, Autism, Intellectual Disability and Asperger prevalence for a plethora of countries around the world. 

We started by cleaning each and every dataframe within Jupyter Notebook and using Pandas. Within each dataframe, we removed unnecessary columns and removed NaN values. Lastly, for each dataframe, we added a column that contained the diagnoses name, therefore, labeling each row of data with the purpose that in the end when we concatenate our 4 dataframes into one, we will now know, with each piece of data, which diagnosis it directly correlates with. From here, we were able to export all of our clean data to a csv file. After successfully cleaning the data and exporting a csv, from our notebook, we exported our final, clean dataframe to Postgres.

# Flask App & Chart.js
We completed our Flask app by creating six routes, one for an "index" page, one for the json data, and four for each diagnosis. These routes were then incorporated into our HTML files for each diagnosis. Next, each HTML file allowed us to create four webpages for each of the diagnoses to display data collected on the prevalence of neurological disorders in men and women. Within the graphs displayed on our webpages, we chose to compare the prevalence of neurological disorders in men and women over the years. Added alongside these graphs, we also incorporated a drop-down filter that allows users to choose a specific country to analyze their data for neurological disorders.  

# Instructions for Deploying Locally
  1.  Ensure you have Postegres and dependencies installed.
  2.  Clone the repository to a local folder.
  3.  Insert a password secret.py in your repository with your postgres password.
  4.  Open the Terminal and go into your Python Environment (e.g., "conda activate python3.8.8")
  5.  Change the directory to where the code is cloned locally.
  6.  Type "jupyter notebook" in the terminal to open the notebook. 
  7.  Run the Data Cleansing Python Code to Generate the csv and the sql.
  8.  Open Postgres and create the database ("neuro_disorders_db").
  9.  Copy the sql query from 2nd to last output in Jupyter Notebook.
  10. Right Click the schema within the new database and select query (paste the sql query and run it).
  11. Refresh the tables and right click the new "disorders" table.  
  12. Right click the table and select "Import/Export"
  13. Import the csv into Postgres changing the setting to "import", ensure the "header" is checked, and select "," as the separator.
  14. Press and hold "ctrl" and hit the "c" while still holding down "ctrl".
  15. Go back to your terminal and type "python app.py"
  16. Look at the result and copy the link result in the terminal (e.g., "http://127.0.0.1:5000/") and paste the link into the url area of your browser (Chrom is preferred).
  17. Navigate the site by using the Menu.  
  18. On each of the disorder pages, the graphs will be blank.  You need to select the "country" drop down to display the first graph and continue for other countries.  

# Closing

Perhaps this will data and interactive app will inform the disparaties across countries and whether or not there is a strong relationship in disparaties and what factors that influences this such as data collection methods, methods and criteria used for diagnosing, or other variables such as environmental geographical factors that play a role in the differences across countries.