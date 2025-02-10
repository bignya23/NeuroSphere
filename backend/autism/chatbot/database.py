import redis
import json
from dotenv import load_dotenv
import os
load_dotenv()

# Connect to Redis
redis_client = redis.Redis(host="redis-12856.c330.asia-south1-1.gce.redns.redis-cloud.com", port=12856, decode_responses=True,
    username="default",
    password=os.getenv("REDIS_DB_PASS"))


def store_chat_history(user_id, user_message = "", bot_response = ""):
    """Store last 10 conversations in Redis for a given user."""
    key = f"chat_history:{user_id}"

    conversation_entry = json.dumps({
        "user": user_message,
        "bot": bot_response
    })


    redis_client.lpush(key, conversation_entry)

    redis_client.ltrim(key, 0, 9)

    # print(f"Stored conversation for user {user_id}")


def get_chat_history(user_id):
    """Retrieve the last 10 messages of a user."""
    key = f"chat_history:{user_id}"
    history = redis_client.lrange(key, 0, -1)  

    return (reversed([json.loads(entry) for entry in history]))


if __name__ == "__main__":

    store_chat_history("user_123", "Hey!", "Hello! How can I help?")

    store_chat_history("user_123", "I'meeling a little down.", "I'm here for you. Want to talk about it?")

    history = get_chat_history("user_123")

    print("\nRecent Chat History:")
    for conv in history:
        print(f"User: {conv['user']}")
        print(f"Bot: {conv['bot']}")
        print("---")

