from flask import Flask, json, jsonify, request

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/index")
def index():
    return "This is the /index page!"

@app.route("/data")
def get_data():
    query_title = request.args.get("title")
    with open("notes.json", "r") as f:
        notes = json.load(f)
    titles = [note["title"] for note in notes]
    for title in titles:
        if query_title == title:
            return jsonify({"title": notes["title"], "content": notes["content"]})
    
    # If no note found
    return jsonify({"error": "Note not found"}), 404

@app.route("/title")
def get_titles():
    with open("notes.json", "r") as f:
        notes = json.load(f)
    titles = [note["title"] for note in notes]
    return jsonify(titles)

if __name__ == "__main__":
    app.run(debug=True)
