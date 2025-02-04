import json
import redis
import os
from dotenv import load_dotenv

load_dotenv()

r = redis.Redis(
    host='redis-12856.c330.asia-south1-1.gce.redns.redis-cloud.com',
    port=12856,
    decode_responses=True,
    username="default",
    password=os.getenv("REDIS_DB_PASS"),
)


def store_chat_history(user_id, user_message, bot_response):
    """Append chat messages to Redis under a unique user ID."""
    chat_entry = {"user": user_message, "bot": bot_response}

    existing_history = r.get(user_id)
    if existing_history:
        history = json.loads(existing_history)
    else:
        history = []

    history.append(chat_entry)

    r.set(user_id, json.dumps(history))

def get_chat_history(user_id):
    """Retrieve the last 5 chat messages from Redis."""
    existing_history = r.get(user_id)
    return json.loads(existing_history) if existing_history else []



if __name__ == "__main__":
    user_id = "abc123"

    bot_response = "hello"

    user_response = "sdfasdf"

    store_chat_history(user_id, bot_response, user_response)
    print(get_chat_history(user_id))
