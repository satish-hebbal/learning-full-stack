from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Optional: absolute path to notes.json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
NOTES_FILE = os.path.join(BASE_DIR, "notes.json")

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/index")
def index():
    return "This is the /index page!"

@app.route("/data")
def get_data():
    query_title = request.args.get("title")
    if not query_title:
        return jsonify({"error": "Please provide a title"}), 400

    with open(NOTES_FILE, "r") as f:
        notes = json.load(f)
    
    # Search for the note with matching title
    for note in notes:
        if note["title"].lower() == query_title.lower():  # case-insensitive match
            return jsonify({"title": note["title"], "content": note["content"]})
    
    # If no note found
    return jsonify({"error": "Note not found"}), 404

@app.route("/title")
def get_titles():
    with open(NOTES_FILE, "r") as f:
        notes = json.load(f)
    titles = [note["title"] for note in notes]
    return jsonify(titles)

if __name__ == "__main__":
    app.run(debug=True)
