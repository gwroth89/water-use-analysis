from flask import Flask
from flask import render_template
from flask import jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

#Flask Setup
app = Flask(__name__)

#Flask Routes
@app.route("/")
def welcome():
    """List all available api routes"""
    return(
        f'Available Routes:<br/>'
        f'/data'
    )

@app.route('/data')
def data ():
    engine = create_engine("sqlite:///database/drought_water.db")
    base = automap_base()
    base.prepare(autoload_with=engine)
    print(base.classes.keys())
    # drought = base.classes.drought
    # water = base.classes.water
    return jsonify(data)

if __name__ == '__main__':
    app.run()
