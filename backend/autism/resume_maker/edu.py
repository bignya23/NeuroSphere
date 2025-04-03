import vertexai
from vertexai.preview.vision_models import ImageGenerationModel
from typing import List
from PIL import Image as PIL_Image
from PIL import ImageOps as PIL_ImageOps
from pydantic import BaseModel , Field
from google import genai
from google.genai import types
import base64
import concurrent.futures
from google.cloud import storage
import fitz


vertexai.init(project="neurosphere-453417", location="us-central1")


class Flowchart(BaseModel):
    stage : int = Field(description="Stages of the flowchart maximum 5 stages")
    output: List[str] = Field(
        description="Give the output points of the flowchart in that pariticular stage"
    )

class Mindmap(BaseModel):
    flowchart : List[Flowchart] = Field("Multiple stages points")



def get_pdf_page_count(pdf_path):
    """
    Returns the number of pages in a given PDF file.
    """
    with fitz.open(pdf_path) as doc:
        return len(doc)    



def upload_pdf_to_gcs(bucket_name, source_file_path, destination_blob_name):
    """
    Uploads a PDF file to a specified GCS bucket.
    """
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_path)
    print(f"File {source_file_path} uploaded to gs://{bucket_name}/{destination_blob_name}.")

def extract_content_from_pdf(bucket_name, blob_name, total_pages):
    """
    Extracts text and mathematical equations from a PDF file asynchronously.
    """
    client = genai.Client(
        vertexai=True,
        project="neurosphere-453417",
        location="us-central1",
    )

    model = "gemini-2.0-flash"
    gcs_uri = f"gs://{bucket_name}/{blob_name}"

    extracted_contents = []

    
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_page = {executor.submit(extract_page_content, client, model, gcs_uri, page): page for page in range(1, total_pages + 1)}
        
        for future in concurrent.futures.as_completed(future_to_page):
            try:
                extracted_contents.append(future.result())
            except Exception as e:
                print(f"Error extracting page {future_to_page[future]}: {e}")

    final_output = ""
    for i in extracted_contents:

        final_output += i['content']

    return final_output

    


def extract_page_content(client, model, gcs_uri, page_number):
    """
    Extracts content from a specific page of the PDF using Gemini API.
    """
    client = genai.Client(
        vertexai=True,
        project="neurosphere-453417",
        location="us-central1",
    )
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_uri(
                    file_uri=gcs_uri,
                    mime_type="application/pdf",
                ),
                types.Part.from_text(text=f"Perform OCR on page {page_number} of the document and extract all contents."),
            ],
        ),
    ]

    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=types.GenerateContentConfig(
            max_output_tokens=8192,
            temperature=1,
        ),
    )

    return {"page_no": page_number, "content": response.text}



    
def generate_points(content: str = ""):
    client = genai.Client(
        vertexai=True,
        project="neurosphere-453417",
        location="us-central1",
    )

    model_name = "gemini-2.0-flash"

    contents = f"""Input
                Options: "topic", "pdf", "article", "book", "video", "course", etc.
                Content: {content}
                If topic: The specific subject to analyze
                If document: The text content, key points, or summary of the document

                Instructions
                Create a structured left-to-right mindmap about the provided content specifically designed for neurodiverse individuals. The mindmap should have the following characteristics:

                Break down the content into a maximum of 5 sequential stages/branches
                For each stage, identify key points that are particularly relevant and accessible
                Format according to the Flowchart model specification
                Generate max 5 points in each stage. 

                Content Analysis Guidelines

                For topics: Focus on core concepts, applications, and practical understanding
                For PDFs/documents: Extract main themes, key arguments, and essential information
                For instructional content: Identify sequential steps, critical techniques, and important warnings
                For theoretical content: Break down complex ideas into manageable components"""


    response = client.models.generate_content(
        model=model_name,
        contents=contents,
        config = {
        'response_schema': Mindmap,
        'response_mime_type': 'application/json',
        },
    )
    return response.text


class Chatbot_response(BaseModel):
    content : str = Field("Response of the content")


def chatbot_flowchart(content: str = "", query : str = ""):
    client = genai.Client(
        vertexai=True,
        project="neurosphere-453417",
        location="us-central1",
    )
    model_name = "gemini-2.0-flash"

    contents = f"""You are an expert assistant specialized in providing information about {content}. 
            Your purpose is to answer questions and provide information specifically related to content. You should:

            USER_QUERY:
            {query}

            
            1. Focus exclusively on providing accurate information about content
            2. If asked about topics outside of content, politely redirect the conversation back to content
            3. Use a helpful, clear, and concise communication style
            4. When uncertain about specific details related to content, acknowledge your limitations rather than speculating
            5. Structure longer explanations with appropriate headings and paragraphs for readability
            6. Provide examples when they help illustrate concepts related to content

            The information about content is as follows:
            [Insert detailed information about content here]

            Remember: You are only to provide information about content. Do not engage with questions about other topics. For any unrelated question, respond with: "I'm specifically designed to help with questions about content. Could I assist you with something related to that topic?"""


    response = client.models.generate_content(
        model=model_name,
        contents=contents,
        config = {
        'response_schema': Chatbot_response,
        'response_mime_type': 'application/json',
        },
    )
    
    return response.text


if __name__ == "__main__":
    content = "Quadratic equations"
    bucket_name = "mind_map"
    
    source_file_path = r"C:\Users\bigny\OneDrive\Desktop\neuro\final\NeuroSphereAI\test_files\dyslexia\Notice_End_Sem_Exam_December2024_Syllabus_MA201.pdf"
    len_pages = get_pdf_page_count(source_file_path)
    
    destination_blob_name = "Content"
    upload_pdf_to_gcs(bucket_name, source_file_path,destination_blob_name)
    extracted_content = extract_content_from_pdf(bucket_name=bucket_name, blob_name=destination_blob_name, total_pages=len_pages)
    print(extracted_content)
    
    response_text = generate_points(content=extracted_content)

    print(response_text)