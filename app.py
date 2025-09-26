from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/index")
def index():
    return "This is the /index page!"

@app.route("/data")
def get_data():
    sample_data = {
        "name": "Tejas",
        "role": "Developer",
        "skills": ["Python", "Flask", "Node.js"]
    }
    return jsonify(sample_data)

if __name__ == "__main__":
    app.run(debug=True)
