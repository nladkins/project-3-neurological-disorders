# Introduction
The prevalence of neurological disorders has expanded over the years, including diagnoses such as Autism, ADHD, etc.  Not only can this have a debilitating effect on the individual, but this also affects the family members who are often providing the supports that are needed.  The purpose of this project is to do a comparison of neurological disorder statistics across the globe.  We will focus on building visuals that display data for different types of neurological disorders, the country data, gender, and the rate based on total population with the disorder vs. the total population.  With the growth of these disorders rising, additional insights in the prevalence could be useful.

# Source
https://ourworldindata.org/neurodevelopmental-disorders

# Data Cleaning Process
We were given four csv files, with each file containing data on ADHD, Autism, Intellectual Disability and Asperger prevalence for a plethora of countries around the world. 

We started by cleaning each and every dataframe within Jupyter Notebooks and using Pandas. Within each dataframe, we removed unnecessary columns and removed NaN values. Lastly, for each dataframe, we added a column that contained the diagnoses name, therefore, labeling each row of data with the purpose that in the end when we concatenate our 4 dataframes into one, we will now know, with each piece of data, which diagnosis it directly correlates with. From here, we were able to export all of our clean data to a csv file. After successfully cleaning the data and exporting a csv, from our notebook, we exported our final, clean dataframe to Postgres.

# Flask App & Chart.js
We completed our Flask app by creating four routes for each diagnosis. These routes were then incorporated into our HTML files for each diagnosis. Next, each HTML file allowed us to create four webpages for each of the diagnoses to display data collected on the prevalence of neurological disorders in men and women. Within the graphs displayed on our webpages, we chose to compare the prevalence of neurological disorders in men and women over the years. Added alongside these graphs, we also incorporated a drop-down filter that allows users to choose a specific country to analyze their data for neurological disorders.  
