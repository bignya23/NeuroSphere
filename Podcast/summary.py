import vertexai
from vertexai.language_models import TextGenerationModel

from extract import extract_text_from_pdf

text = extract_text_from_pdf()


PROJECT_ID = "neurosphere-453417"
def generate_summary(PROJECT_ID):
    vertexai.init(project=PROJECT_ID, location="us-central1")

    parameters = {
        "temperature": 0,
        "max_output_tokens": 256,
        "top_p": 0.95,
        "top_k": 40,
    }

    model = TextGenerationModel.from_pretrained("text-bison@002")
    response = model.predict(
        
       extract_text_from_pdf
    )
    print(f"Response from Model: {response.text}")