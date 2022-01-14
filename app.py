import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, text

from flask import Flask, jsonify
from flask import render_template
from secret import password


#################################################
# Database Setup
#################################################

path = (f"postgresql://postgres:{password}@localhost:5432/neuro_disorder_db")
engine = create_engine(path, echo=True)
Base = automap_base()
Base.prepare(engine, reflect=True)

# Save reference to the table
disorders = Base.classes.disorders

Base.metadata.create_all(engine)

# Define Table Name
disorders = Base.classes.disorders

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Flask Routes
#################################################

# First Route is the welcome screen
@app.route("/")
def index():
    return render_template("index.html")

# Second Route is all of the data.
@app.route("/json")
def disorders1():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all disorders
    results = session.query(disorders.diagnosis, disorders.entity, disorders.code, disorders.year, disorders.prevalence_in_males, disorders.prevalence_in_females, disorders.population, disorders.continent).all()

    # Close the Session
    session.close()

    # Create a list to populate results that will be appended.
    all_disorders = []

    # Loop through to create the results into a dictionary which will go into a list.
    for diagnosis, entity, code, year, prevalence_in_males, prevalence_in_females, population, continent in results:
        disorder_dict = {}
        disorder_dict["diagnosis"] = diagnosis
        disorder_dict["entity"] = entity
        disorder_dict["code"] = code
        disorder_dict["year"] = year
        disorder_dict["prevalence_in_males"] = prevalence_in_males
        disorder_dict["prevalence_in_females"] = prevalence_in_females
        disorder_dict["population"] = population
        disorder_dict["continent"] = continent
        all_disorders.append(disorder_dict)

    # Return the JSON results.
    return jsonify(all_disorders)

#################################################
# Run the App 
#################################################
if __name__ == '__main__':
    app.run(debug=True)