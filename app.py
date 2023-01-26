from flask import Flask
from flask import render_template
from flask import jsonify
import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, func
from sqlalchemy import select

x#Flask Setup
app = Flask(__name__)

#Flask Homepage
@app.route("/")
def welcome():
    """List all available api routes"""
    return(
        f'Available Routes:<br/>'
        f'/drought<br/>'
        f'/water<br/>'
    )

#Flask Drought route
@app.route('/data')
def data ():

    #reflecting database
    engine = create_engine("sqlite:///database/drought_water.db").connect()
    base = automap_base()
    base.prepare(autoload_with=engine)
    
    #defining tables within the DB
    drought = base.classes.drought
    water = base.classes.water
    
    #query
    query = db.select(
        [drought]).where(drought.State=='CA')
    drought_result = engine.execute(query).fetchall()
    response = jsonify({'result': [dict(row) for row in drought_result]})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#Flask Water route
@app.route('/water')
def data ():

    #reflecting database
    engine = create_engine("sqlite:///database/drought_water.db").connect()
    base = automap_base()
    base.prepare(autoload_with=engine)
    
    #defining tables within the DB
    drought = base.classes.drought
    water = base.classes.water
    
    #query
    query = db.select(
        [drought]).where(drought.State=='CA')
    drought_result = engine.execute(query).fetchall()
    return jsonify({'result': [dict(row) for row in drought_result]})


if __name__ == '__main__':
    app.run(debug=True)
