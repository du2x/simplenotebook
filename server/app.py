from flask import Flask, request, jsonify
import json
from os import listdir
from flask_cors import CORS, cross_origin
from slugify import slugify
from datetime import datetime

app = Flask(__name__)
CORS(app)

data_path = 'data'

@cross_origin('*')
@app.route('/list_files')
def list_files():
    topics = []
    for filename in listdir(data_path):
        with open('/'.join([data_path,filename])) as filecontents:
            topic = json.load(filecontents)
            topics.append({'title':topic['title'],
                           'filename': topic['filename'],
                           'created':datetime.strptime(topic['created'], "%Y-%m-%dT%H:%M:%S.%f")})
    topics = sorted(topics, key=lambda k: k['created'], reverse=True)
    return jsonify([{'title':f['title'], 'filename':f['filename']} for f in topics])

@cross_origin('*')
@app.route('/get/<filename>')
def read_file(filename):
    with open('/'.join([data_path,filename])) as filecontents:
        return jsonify(json.load(filecontents))

@cross_origin('*')
@app.route('/save/<filename>', methods=['POST',])
def save_file(filename):
    contents = request.data
    with open('/'.join([data_path,filename]), "w") as f:
	       f.write(contents)
    return jsonify({'status':'SUCCESS'})

@cross_origin('*')
@app.route('/create/<title>', methods=['POST',])
def create_file(title):
    filename = slugify(title)+'.json'
    contents = json.dumps({'title':title, 'description':'',
                           'cells':[], 'filename': filename, 'created':str(datetime.now().isoformat())})
    with open('/'.join([data_path,filename]), "w") as f:
        f.write(contents)
    return jsonify({'status':'SUCCESS'})

if __name__ == '__main__':
    app.run(debug=True)
