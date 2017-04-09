from flask import Flask, request, jsonify
import json
from os import listdir
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

data_path = 'data'

@cross_origin('*')
@app.route('/list_files')
def list_files():
    return jsonify([f for f in listdir(data_path)])

@cross_origin('*')
@app.route('/get/<filename>')
def read_file(filename):
    with open('/'.join([data_path,filename])) as filecontents:
        return jsonify(json.load(filecontents))

if __name__ == '__main__':
    app.run(debug=True)
