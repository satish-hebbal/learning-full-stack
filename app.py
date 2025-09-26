from flask import Flask, json, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/index")
def index():
    return "This is the /index page!"

@app.route("/data")
def get_data():
    with open("notes.json", "r") as f:
        notes = json.load(f)
    return jsonify(notes)

@app.route("/title")
def get_titles():
    with open("notes.json", "r") as f:
        notes = json.load(f)
    titles = [note["title"] for note in notes]
    return jsonify(titles)

if __name__ == "__main__":
    app.run(debug=True)
