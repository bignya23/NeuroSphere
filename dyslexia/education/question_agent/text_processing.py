from google.api_core.client_options import ClientOptions
from google.cloud import documentai
import os
import genai
import google.generativeai as genai
from dotenv import load_dotenv


load_dotenv()


project_id = os.getenv("PROJECT_ID")
location = os.getenv("LOCATION")
processor_id = os.getenv("PROCESSOR_ID")
mime_type = "application/pdf"


client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))



class Text_processing:
    def __init__(self):
        pass

    def extract_text_from_pdf(self, file_path):
        """Extracts text from a PDF using Google Document AI."""
        # Instantiate a Document AI client
        docai_client = documentai.DocumentProcessorServiceClient(
            client_options=ClientOptions(api_endpoint=f"{location}-documentai.googleapis.com")
        )

        # Define the full resource name `of the processor
        resource_name = docai_client.processor_path(project_id, location, processor_id)

        # Read the file into memory
        with open(file_path, "rb") as file:
            image_content = file.read()

        # Load Binary Data into Document AI RawDocument Object
        raw_document = documentai.RawDocument(content=image_content, mime_type=mime_type)
        # Configure the process request
        request = documentai.ProcessRequest(name=resource_name, raw_document=raw_document)

        # Process the document
        result = docai_client.process_document(request=request)
        document_object = result.document

        # Return extracted text
        return document_object.text if document_object.text else "No text extracted."

    def summarise(self, text):

        api_key = os.getenv("GEMINI_API_KEY")  
        if not api_key:
            raise ValueError("API key not found. Set the GEMINI_API_KEY environment variable.")
        

        prompt = f"""
        Summarize the following text in depth without removing important details. Make points if possible. 
        - Capture the main ideas and key points.
        - Avoid unnecessary details and repetition.
        - Ensure readability and coherence.

        Text:
        {text}
        """

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[{"role": "user", "parts": [{"text": prompt}]}]
        )

        return response.text


if __name__ == "__main__":
    text_process = Text_processing()

    # extract_text = text_process.extract_text_from_pdf(file_path = "Yantranav2.pdf")
    extract_text = "bihu in assam"
    print(extract_text)

    summary = text_process.summarise(extract_text)
    print(summary)

