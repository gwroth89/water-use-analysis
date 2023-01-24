from flask import Flask
from flask import render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import jsonify

#Flask Setup
app = Flask(__name__)

#Flask Routes
@app.route("/")
def welcome():
    """List all available api routes"""
    return(
        f'Available Routes:<br/>'
        f'Coming Soon'
    )

@app.route('/data', methods='GET')
def data ():
    base = automap_base()
    engine = create_engine("sqlite:///database/drought_water.db")
    base.prepare(autoload_with=engine)
    drought = base.drought_water.drought
    water = base.drought_water.water
    session = Session(engine)
    return jsonify(data)
    session.close()

if __name__ == '__main__':
    app.run()
