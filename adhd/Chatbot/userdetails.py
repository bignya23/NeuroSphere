import json
import os

USER_DATA_DIR = "users"

if not os.path.exists(USER_DATA_DIR):
    os.makedirs(USER_DATA_DIR)

def get_user_details():
    """Allow multiple users to save/load data separately."""
    username = input("Enter your unique username: ")
    user_file = os.path.join(USER_DATA_DIR, f"{username}.json")

    if os.path.exists(user_file):
        with open(user_file, "r") as file:
            user_data = json.load(file)
        print(f"✅ Welcome back, {username}! Your data has been loaded.")
    else:
        user_data = {
            "name": username,
            "age": input("Enter your age: "),
            "interests": input("Enter your interests: "),
            "adhd_type": input("Enter your type (Inattentive, Hyperactive-Impulsive, Combined): "),
            "challenges": input("Enter your main challenges: ")
        }
        with open(user_file, "w") as file:
            json.dump(user_data, file)
        print(f"✅ Data saved for {username}.")

    return user_data
