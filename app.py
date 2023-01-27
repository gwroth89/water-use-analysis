from flask import Flask
from flask import render_template
from flask import jsonify
from flask_cors import CORS, cross_origin
import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, func
from sqlalchemy import select

#Flask Setup
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#Flask Homepage
@app.route("/")
def welcome():
    """List all available api routes"""
    return(
        f'Available Routes:<br/>'
        f'/drought (under construction)<br/>'
        f'/average<br/>'
        f'/water (under construction)<br/>'
    )

#Flask Drought route
@app.route('/drought')
def drought ():

    #Reflecting database
    engine = create_engine("sqlite:///database/drought_water.db").connect()
    base = automap_base()
    base.prepare(autoload_with=engine)
    
    #Defining tables within the DB
    drought = base.classes.drought
    water = base.classes.water
    drought_average = base.classes.average_drought
    
    #Query
    query = db.select(
        [drought]).where(drought.State=='CA')
    result = engine.execute(query).fetchall()
    response = jsonify({'result': [dict(row) for row in result]})
    return response

#Flask Average % Drought route
@app.route('/average')
def average ():

    #Reflecting database
    engine = create_engine("sqlite:///database/drought_water.db").connect()
    base = automap_base()
    base.prepare(autoload_with=engine)
    
    #Defining tables within the DB
    drought = base.classes.drought
    water = base.classes.water
    drought_average = base.classes.average_drought
    
    #Query
    query = db.select(
        [drought_average])
    result = engine.execute(query).fetchall()
    return jsonify({'result': [dict(row) for row in result]})


#Flask Water route
@app.route('/water')
def water ():

    #Reflecting database
    engine = create_engine("sqlite:///database/drought_water.db").connect()
    base = automap_base()
    base.prepare(autoload_with=engine)
    
    #Defining tables within the DB
    drought = base.classes.drought
    water = base.classes.water
    drought_average = base.classes.average_drought
    
    #Query
    query = db.select(
        [drought]).where(drought.State=='CA')
    result = engine.execute(query).fetchall()
    return jsonify({'result': [dict(row) for row in result]})


if __name__ == '__main__':
    app.run(debug=True)
