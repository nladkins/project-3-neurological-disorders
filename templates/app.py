import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


path = (f"postgresql://postgres:{password}@localhost:5432/neuro_disorder_db")
engine = create_engine(path, echo=True)
Base.metadata.create_all(engine)

#################################################
# Database Setup
#################################################

path = (f"postgresql://postgres:{password}@localhost:5432/neuro_disorder_db")
engine = create_engine(path, echo=True)
Base = automap_base()
Base.metadata.create_all(engine)
# Save reference to the table
disorder = Base.classes.disorders

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


@app.route("/")
def welcome():
    """Connecting."""
    return (
        f"Available Routes:<br/>"
        f"neuro_disorder_db/code<br/>"
        f"neuro_disorder_db/passengers"
    )

@app.route("/neuro_disorder_db/disorders")
def disorders():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(disorders.Entity, disorders.Code, disorders.Year, disorders.Prevalence_in_Males, disorders.Prevalence_in_Females, disorders.Population. disorders.Continent).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_disorders = []
    for entity, code, year, prevalence_in_males, prevalence_in_females, population, continent in results:
        disorder_dict = {}
        disorder_dict["Entity"] = entity
        disorder_dict["Code"] = code
        disorder_dict["Year"] = year
        disorder_dict["Prevalence_in_Males"] = prevalence_in_males
        disorder_dict["Prevalence_in_Females"] = prevalence_in_females
        disorder_dict["Population"] = population
        disorder_dict["Continent"] = continent
        all_disorders.append(disorder_dict)

    return jsonify(all_disorders)


#################################################
# Run the App
#################################################
if __name__ == '__main__':
    app.run(debug=True)