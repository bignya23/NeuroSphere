import redis
import json
from dotenv import load_dotenv
import os
load_dotenv()


redis_client = redis.Redis(
    host='redis-13307.c330.asia-south1-1.gce.redns.redis-cloud.com',
    port=13307,
    decode_responses=True,
    username="default",
    password=os.getenv("REDIS_DB_PASS")
)

def store_chat_history(email : str, user_input="", response=""):
    """Store last 30 conversations in Redis for a given user."""
    key = f"chat_history:{email}"

    conversation_entry = json.dumps({
        "Email": email,
        "user_input": user_input,
        "Response": response
    })

    redis_client.lpush(key, conversation_entry)
    redis_client.ltrim(key, 0, 30)  
    print("Added to Database")

def get_chat_history(user_id):
    """Retrieve the last 10 messages of a user as a single formatted string."""
    key = f"chat_history:{user_id}"
    history = redis_client.lrange(key, 0, 10)  

    messages = [json.loads(entry) for entry in history]
    messages.reverse() 

    formatted_history = "\n".join(
        f"{msg['Email']}: {msg['Response']}" for msg in messages
    )

    return formatted_history

if __name__ == "__main__":

    store_chat_history("user_123", "Hey!", "Hello! How can I help?")

    store_chat_history("user_123", "I'meeldffgaging a little down.", "I'm here for you. Want to talk about it?")

    history = get_chat_history("user_123")

    print("\nRecent Chat History:")
    for conv in history:
        print(f"User: {conv['user']}")
        print(f"Bot: {conv['bot']}")
        print("---")