from flask import Flask
from flask import render_template
from flask import jsonify
import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, func
from sqlalchemy import select

# engine = create_engine("sqlite:///database/drought_water.db")
# base = automap_base()
# base.prepare(autoload_with=engine)
# drought = base.classes.drought
# water = base.classes.water
# print(base.classes.keys())

# Session = sessionmaker(bind=engine)

# stmt = select(drought)
# print(stmt)

#Flask Setup
app = Flask(__name__)

#Flask Homepage
@app.route("/")
def welcome():
    """List all available api routes"""
    return(
        f'Available Routes:<br/>'
        f'/data'
    )

#Flask database
@app.route('/data')
def data ():
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
    return str(drought_result)

if __name__ == '__main__':
    app.run(debug=True)
