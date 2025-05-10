from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    print("Flask app is running!")  # This prints to the terminal
    return "Hello from Flask!"  # This returns a response in the browser

if __name__ == "__main__":
    app.run(debug=True)
