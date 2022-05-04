from flask import Flask

app = Flask(__name__)


@app.route('/')
def main():
    return 'Hello at main API!'

if __name__ == '__main__':
    main()
    