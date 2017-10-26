from flask import Flask, request, jsonify
import json
import logging
from os import listdir
from flask_cors import CORS, cross_origin
from slugify import slugify
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
from settings import SQLALCHEMY_DATABASE_URI

stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.INFO)

app = Flask(__name__)
CORS(app)

app.config.from_pyfile('settings.py', silent=True)
app.logger.addHandler(stream_handler)

data_path = 'data'

@cross_origin('*')
@app.route('/api/topics/')
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
@app.route('/api/topics/<filename>')
def read_file(filename):
    with open('/'.join([data_path,filename])) as filecontents:
        return jsonify(json.load(filecontents))

@cross_origin('*')
@app.route('/api/topics/<filename>', methods=['PUT',])
def save_file(filename):
    try:
        contents = request.data
        with open('/'.join([data_path,filename]), "w") as f:
    	       f.write(contents)
    except Exception, e:
        return jsonify({'status':'FAILURE', 'message': str(e)})
    return jsonify({'status':'SUCCESS'})

@cross_origin('*')
@app.route('/api/topics/<title>', methods=['POST',])
def create_file(title):
    try:
        filename = slugify(title)+'.json'
        contents = json.dumps({'title':title, 'description':'',
                               'cells':[], 'filename': filename,
                               'created':str(datetime.now().isoformat())})
        with open('/'.join([data_path,filename]), "w") as f:
            f.write(contents)
    except Exception, e:
        return jsonify({'status':'FAILURE', 'message': str(e)})
    return jsonify({'status':'SUCCESS'})

@cross_origin('*')
@app.route('/api/command/execute', methods=['POST',])
def execute():
    contents = request.data
    data = json.loads(contents)
    sql = data['sql']
    try:
        conn = psycopg2.connect(SQLALCHEMY_DATABASE_URI)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(sql)
        return jsonify({'status':'SUCCESS', 'payload': json.dumps(cur.fetchall())})
    except Exception, e:
        return jsonify({'status':'FAILURE', 'message': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
