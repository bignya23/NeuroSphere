import json

def get_user_input():
    """
    Collect user input from the command line.
    
    Returns:
        dict: A dictionary containing the list of tasks and a day description.
    """
    tasks = []
    try:
        num_tasks = int(input("Enter the number of tasks you have: "))
    except ValueError:
        print("Invalid input. Please enter a valid number.")
        return {}

    # Collect regular tasks (with description and priority)
    for i in range(num_tasks):
        print(f"\nTask {i+1}:")
        description = input("Enter task description: ")
        try:
            priority = int(input("Enter task priority (1 = lowest, 5 = highest): "))
        except ValueError:
            print("Invalid priority. Defaulting to 3.")
            priority = 3
        tasks.append({"task": description, "priority": priority})

    # Optionally add break activities (only description, no priority)
    add_breaks = input("\nDo you want to add any break activities (e.g., lunch, sleep, rest)? (yes/no): ").strip().lower()
    if add_breaks == "yes":
        try:
            num_breaks = int(input("Enter the number of break activities: "))
        except ValueError:
            print("Invalid input. Skipping break activities.")
            num_breaks = 0
        for i in range(num_breaks):
            print(f"\nBreak Activity {i+1}:")
            description = input("Enter break activity description: ")
            # Store break activity without a priority.
            tasks.append({"task": description})
    
    # Ask for a description of how the user wants their day to be.
    day_description = input("\nDescribe how you want your day to be : ")

    # Create a dictionary to hold both tasks and day description.
    data = {
        "tasks": tasks,
        "day_description": day_description
    }

    # Save the data to a JSON file for later processing.
    with open("tasks.json", "w") as f:
        json.dump(data, f, indent=2)
    
    return data

if __name__ == "__main__":
    data = get_user_input()
    if data:
        print("\nData saved to tasks.json:")
        print(json.dumps(data, indent=2))
    else:
        print("No data was entered.")
