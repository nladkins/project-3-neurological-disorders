import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, text

from flask import Flask, jsonify
from secret import password


#################################################
# Database Setup
#################################################

path = (f"postgresql://postgres:{password}@localhost:5432/neuro_disorder_db")
engine = create_engine(path, echo=True)
Base = automap_base()
Base.prepare(engine, reflect=True)
# print(engine.table_names())

# Save reference to the table
disorders = Base.classes.disorders

Base.metadata.create_all(engine)
# Save reference to the table
# print(f"===================={Base.classes.keys()}")
# print(dir(Base.classes.keys()))
disorders = Base.classes.disorders

#################################################
# Flask Setup
#################################################
app = Flask(__name__, static_url_path='',
    static_folder='static',
    template_folder='template')
# app.config["DEBUG"] = True

# app = Flask(__name__)
#################################################
# Flask Routes
#################################################


@app.route("/")
def welcome():
    """Connecting."""
    return (
        f"Available Routes:<br/>"
        f"neuro_disorder_db/disorders<br/>"
    )

@app.route("/disorders")
def disorders1():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of disorder data including the name, age, and sex of each passenger"""
    # Query all disorders
    # result = engine.execute(text("select * from disorders"))
    results = session.query(disorders.diagnosis, disorders.entity, disorders.code, disorders.year, disorders.prevalence_in_males, disorders.prevalence_in_females, disorders.population, disorders.continent).all()
    session.close()
    all_disorders = []
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
        # all_disorders.append(each)


    # Create a dictionary from the row data and append to a list of all_passengers
    # all_disorders = []
    # for entity, code, year, prevalence_in_males, prevalence_in_females, population, continent in results:


    return jsonify(all_disorders)

#################################################
# Run the App
#################################################
if __name__ == '__main__':
    app.run(debug=True)