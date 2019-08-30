from redis import Redis
from flask import Flask
import os

app = Flask(__name__)
redis = Redis(host=os.environ.get('REDIS_HOST', '127.0.0.1'), port=6379)

@app.route('/')
def index():
    redis.incr('hits')
    return str(redis.get('hits'))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)


