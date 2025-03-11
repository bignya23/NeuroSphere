import json
from .job_questions import job_search_questions

def collect_candidate_profile():
    """
    Ask the candidate the job search questions and collect their responses.
    
    Returns:
        dict: A dictionary mapping each question to the candidate's answer.
    """
    responses = {}
    print("Please answer the following questions to build your job profile:\n")
    
    for q in job_search_questions:
        print(q["question"])
        if "options" in q:
            print("Options: " + ", ".join(q["options"]))
        answer = input("Your answer: ")
        responses[q["question"]] = answer.strip()
        print()
    
    return responses

def main():
    # Collect candidate profile data from user input.
    profile = collect_candidate_profile()
    
    # Save the candidate profile to a JSON file.
    with open("candidate_profile.json", "w") as f:
        json.dump(profile, f, indent=2)
    
    print("Candidate profile saved to candidate_profile.json.")
    print("Your profile:")
    print(json.dumps(profile, indent=2))

if __name__ == "__main__":
    main()
