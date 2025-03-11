import json
from .job_description import job_listings  # Ensure your job_listings variable is defined.
from .job_input import collect_candidate_profile
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def create_candidate_text(profile):
    """
    Combine candidate responses into a single string.
    """
    return " ".join([f"{q} {a}" for q, a in profile.items()])

def create_job_text(job):
    """
    Combine job details into a single string.
    """
    skills_text = " ".join(job.get("required_skills", []))
    job_text = (
        f"{job.get('title', '')}. "
        f"{job.get('description', '')}. "
        f"Required skills: {skills_text}. "
        f"Job Type: {job.get('job_type', '')}."
    )
    return job_text

def job_search():
    # Collect candidate profile data via user input.
    profile = collect_candidate_profile()

    # Optionally, save the candidate profile to a JSON file.
    with open("candidate_profile.json", "w") as f:
        json.dump(profile, f, indent=2)

    # Create text representations.
    candidate_text = create_candidate_text(profile)
    job_texts = [create_job_text(job) for job in job_listings]

    # Use TF-IDF vectorizer to convert texts to vectors.
    vectorizer = TfidfVectorizer()
    all_texts = [candidate_text] + job_texts
    tfidf_matrix = vectorizer.fit_transform(all_texts)

    # The candidate's vector is the first row; job vectors are the remaining rows.
    candidate_vector = tfidf_matrix[0]
    job_vectors = tfidf_matrix[1:]

    # Compute cosine similarities between the candidate and each job.
    similarities = cosine_similarity(candidate_vector, job_vectors)[0]

    # Assign similarity scores to the job listings.
    for i, job in enumerate(job_listings):
        job["match_score"] = similarities[i]

    # Sort jobs by similarity score (highest first).
    scored_jobs = sorted(job_listings, key=lambda j: j["match_score"], reverse=True)

    # Select top matching jobs (for example, top 3)
    top_jobs = scored_jobs[:4]

    # Build a response dictionary
    response = {"top_jobs": top_jobs}

    # Convert the response dictionary to a JSON formatted string
    response_json = json.dumps(response, indent=2)
    
    return response_json
if __name__ == "__main__":
    job_search()
