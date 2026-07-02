import os
from flask import Flask, jsonify, request, render_template_string
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/devopsdb")
client = MongoClient(MONGO_URI)
db = client.get_database()
tasks_collection = db.tasks

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = list(tasks_collection.find({}, {'_id': 0}))
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    if not data or 'title' not in data:
        return jsonify({"error": "Missing title"}), 400
    new_task = {"title": data['title']}
    tasks_collection.insert_one(new_task)
    return jsonify(new_task), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
