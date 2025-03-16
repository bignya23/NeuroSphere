from google.api_core.client_options import ClientOptions
from google.cloud import documentai
import os
import google.generativeai as genai  # Use only this
from dotenv import load_dotenv

load_dotenv()

project_id = os.getenv("PROJECT_ID")
location = os.getenv("LOCATION")
processor_id = os.getenv("PROCESSOR_ID")
mime_type = "application/pdf"

# Correctly configure genai
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class Text_processing:
    def __init__(self):
        pass

    def extract_text_from_pdf(self, file_path):
        """Extracts text from a PDF using Google Document AI."""
        docai_client = documentai.DocumentProcessorServiceClient(
            client_options=ClientOptions(api_endpoint=f"{location}-documentai.googleapis.com")
        )

        resource_name = docai_client.processor_path(project_id, location, processor_id)

        with open(file_path, "rb") as file:
            image_content = file.read()

        raw_document = documentai.RawDocument(content=image_content, mime_type=mime_type)
        request = documentai.ProcessRequest(name=resource_name, raw_document=raw_document)

        result = docai_client.process_document(request=request)
        document_object = result.document

        return document_object.text if document_object.text else "No text extracted."

    def summarise(self, text):
        prompt = f"""
        Summarize the following text in depth without removing important details. Make points if possible. 
        - Capture the main ideas and key points.
        - Avoid unnecessary details and repetition.
        - Ensure readability and coherence.

        Text:
        {text}
        """

        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)

        return response.text

if __name__ == "__main__":
    text_process = Text_processing()

    extract_text = text_process.extract_text_from_pdf(file_path = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\dyslexia\education\question_agent\Yantranav2.pdf")
    print(extract_text)

    summary = text_process.summarise(extract_text)
    print(summary)

    