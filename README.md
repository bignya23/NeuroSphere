# Neurosphere

**Neurosphere** is an AI-powered, inclusive platform built to support neurodiverse individuals across educational, emotional, communication, and career domains. From ADHD task management and dyslexia-friendly tools to job matching assessments and podcast-based learning, Neurosphere empowers users to thrive with features tailored to their unique cognitive styles.

---

## MVP Highlights

- **Interactive Chatbot & ChatVoice**  
  Conversational tools offering emotional support and communication practice, designed especially for individuals on the autism spectrum.

- **Smart Scheduling & Task Management**  
  Personalized routine and task generators with ADHD-friendly reminders that promote focus and structure.

- **Engaging Learning Tools**  
  - **Podcast Generator:** Converts topics/PDFs into interactive audio conversations.  
  - **Mind Map Generator:** Visualizes content for better retention and cognitive accessibility.  
  - **Interactive Q&A:** Boosts comprehension and learning engagement.

- **Career Empowerment**  
  - **Assessment Module:** Job Matching and Situational Assessments for personalized role recommendations.  
  - **Resume Generator:** Quick, guided resume creation.  
  - **Community Chat:** Safe, moderated environment for connection and collaboration.

- **Accessibility & Safety Features**  
  - Dyslexia-friendly UI and PDF converter.  
  - Email Alert System for sensitive content detection and real-time crisis support.

---

## Problem Statement

Neurodiverse individuals often face barriers in education, employment, and emotional communication due to a lack of tailored digital tools. Neurosphere provides an all-in-one solution that supports self-regulation, learning, social engagement, and career discovery.

---

## Solution Overview

- **Comprehensive, All-in-One Support**
- **Personalized Experience Through Smart Tools**
- **Accessible UI & Learning**
- **Empowering Career and Social Connections**
- **Real-time Safety Mechanisms**

---

## Tech Stack

### Frontend
- **React** – JavaScript library for building interactive user interfaces
- **Vite** – Modern build tool for faster development experience
- **Tailwind CSS** – Utility-first CSS framework for rapid styling

### Backend
- **Django** – Robust Python web framework
- **Redis** – For caching and real-time data
- **SQLite** – Lightweight local database for development
- **Django Channels** – To handle WebSockets for real-time features

### Cloud Infrastructure (Google Cloud Platform - GCP)
- **Vertex AI** – For deploying and managing ML models
- **Gemini 2.0 Flash API** – For LLM integration
- **Document AI** – To extract structured data from documents
- **Google Cloud Text-to-Speech / Speech-to-Text APIs** – For voice interaction
- **Cloud Storage (Buckets)** – For storing user data & files
- **Compute Instances** – Virtual machines for hosting application components

---
# Project Setup

---

## **1. Setup Instructions**  

### **Clone the Repository**  
```sh
git clone https://github.com/bignya23/NeuroSphere.git
cd NeuroSphere
```

---

## **2. Backend Setup (Django)**
### **Install Dependencies**  
Ensure Python and virtualenv are installed.  
```sh
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r ../requirements.txt
```

### **Apply Migrations**  
```sh
python manage.py migrate
```

### **Run Backend Server**  
```sh
python manage.py runserver
```

---

## **3. Frontend Setup (React.js)**
### **Install Node.js Dependencies**  
```sh
cd ../frontend
npm install
```

### **Run React App**  
```sh
npm run dev
```

---

## **4. Environment Variables (`.env` in Root)**
Create a `.env` file in the root directory with the following content:

```
GEMINI_API_KEY=""
GROQ_API_KEY=""
REDIS_DB_PASS=""
DJANGO_SECRET_KEY=""
REDIS_HOST=""
REDIS_PORT=""
REDIS_PASSWORD=""
GOOGLE_APPLICATION_CREDENTIAL=""
PROJECT_ID=""
LOCATION="us"
PROCESSOR_ID=""
EMAIL_TOOLS=""
EMAIL_PASS=""
GEMINI_API_KEY_1=""
REDIS_DB_PASSWORD=""
SPEECH_KEY=""
SEARCH_ENGINE_ID=""
```

---

## **5. Running the Project**
- **Start Django backend**: `cd backend && python manage.py runserver`
- **Start React frontend**: `cd frontend && npm run dev`



