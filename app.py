from flask import Flask

#Flask Setup
app = Flask(__name__)

#Flask Routes
@app.route("/")
def welcome():
    """List all available api routes"""
    return(
        f'Available Routes:<br/>'
        f'/api/v1.0/drought<br/>'
        f'/api/v1.0/consumption'
    )

@app.route('/data')
def data ():
    return jsonify(data)

if __name__ == '__main__':
    app.run()
