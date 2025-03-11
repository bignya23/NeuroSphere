from google.api_core.client_options import ClientOptions
from google.cloud import documentai

def extract_text_from_pdf(project_id, location, processor_id, file_path, mime_type="application/pdf"):
    """Extracts text from a PDF using Google Document AI."""
    
    # Instantiate a Document AI client
    docai_client = documentai.DocumentProcessorServiceClient(
        client_options=ClientOptions(api_endpoint=f"{location}-documentai.googleapis.com")
    )

    # Define the full resource name of the processor
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



PROJECT_ID = "neurosphere-453417"
LOCATION = "us"
PROCESSOR_ID = "9b0aee16552bdce0"
FILE_PATH = r"C:\Users\bigny\OneDrive\Desktop\NeuroSphereAI\New folder\NeuroSphereAI\Podcast\eCnTrHaiSC.pdf"

extracted_text = extract_text_from_pdf(PROJECT_ID, LOCATION, PROCESSOR_ID, FILE_PATH)
print(extracted_text)  # Display extracted text
