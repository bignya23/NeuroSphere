import json
from google import genai
from dotenv import load_dotenv
import os
import numpy as np
from job_description import job_listings  # Ensure job_listings is defined in job_data.py

# Load environment variables from .env
load_dotenv()

# Initialize the Gemini client using your API key.
client = genai.Client(api_key="AIzaSyCPJiOYBPGBhwQiVt00W9-8T3-EhtVgdZs")

def cosine_similarity(vec1, vec2):
    """
    Compute the cosine similarity between two vectors.
    """
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    if np.linalg.norm(vec1) == 0 or np.linalg.norm(vec2) == 0:
        return 0.0
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

def embed_text(text):
    """
    Generate an embedding for the given text using the Gemini API.
    """
    result = client.models.embed_content(
        model="text-embedding-004",
        contents=text
    )
    return result.embeddings[0] 

def load_candidate_profile(filename="candidate_profile.json"):
    """
    Load the candidate profile from a JSON file.
    
    Returns:
        dict: Candidate profile data.
    """
    try:
        with open(filename, "r") as f:
            profile = json.load(f)
        return profile
    except FileNotFoundError:
        print(f"Error: {filename} not found. Please run candidate_profile.py first.")
        return {}

def create_candidate_embedding(profile):
    """
    Combine candidate responses into a single string and generate an embedding.
    """
    # Combine all the candidate answers into a descriptive string.
    profile_text = " ".join([f"{q} {a}" for q, a in profile.items()])
    return embed_text(profile_text)

def create_job_embedding(job):
    """
    Combine job details into a single string and generate its embedding.
    """
    skills_text = " ".join(job.get("required_skills", []))
    job_text = (
        f"{job.get('title', '')}. "
        f"{job.get('description', '')}. "
        f"Required skills: {skills_text}. "
        f"Job Type: {job.get('job_type', '')}."
    )
    return embed_text(job_text)

def main():
    # 1. Load the candidate profile
    profile = load_candidate_profile()
    if not profile:
        return

    # 2. Generate candidate embedding.
    candidate_embedding = create_candidate_embedding(profile)
    
    # 3. For each job listing, generate embedding and compute similarity.
    scored_jobs = []
    for job in job_listings:
        job_emb = create_job_embedding(job)
        score = cosine_similarity(candidate_embedding, job_emb)
        job["match_score"] = score
        scored_jobs.append(job)
    
    # 4. Sort jobs by similarity score (descending)
    scored_jobs.sort(key=lambda j: j["match_score"], reverse=True)
    
    # 5. Display the top matching jobs.
    print("Top matching jobs based on your profile:\n")
    for job in scored_jobs:
        print("-" * 40)
        print(f"Job Number: {job['job_number']}")
        print(f"Title: {job['title']}")
        print(f"Company: {job['company']}")
        print(f"Job Type: {job['job_type']}")
        print(f"Match Score: {job['match_score']:.4f}")
        print(f"Description: {job['description']}")
        print(f"Required Skills: {', '.join(job.get('required_skills', []))}")
        print("-" * 40)

if __name__ == "__main__":
    main()
