from PIL import Image, ImageDraw, ImageFont
from google.api_core.client_options import ClientOptions
from google.cloud import documentai
import os
from dotenv import load_dotenv

load_dotenv()

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\neurosphere-453417-a13fa049f648.json"


# Define A4 size in pixels at 72 DPI
def extract_text_from_pdf(file_path):
    """Extracts text from a PDF using Google Document AI."""

    project_id = "neurosphere-453417"
    location = "us"
    processor_id = "9b0aee16552bdce0"
    mime_type = "application/pdf"

    try:
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

    except Exception as e:
        return f"Error processing document: {str(e)}"


def text_conversion(text_input):
    from PIL import Image, ImageDraw, ImageFont
    import os
    import tempfile
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import A4

    A4_WIDTH, A4_HEIGHT = 595, 842

    # Load the OpenDyslexic font
    font_path = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\dyslexia\education\text_coding\OpenDyslexic-Regular.otf"
    font_size = 15
    font = ImageFont.truetype(font_path, font_size)

    # Your OCR-extracted text
    text = text_input

    # Define text margins
    MARGIN = 50  # Padding from the edges
    line_height = font_size + 10  # Line spacing

    # Function to wrap text to fit within the A4 width
    def wrap_text(draw, text, font, max_width):
        words = text.split()
        lines = []
        current_line = ""
        
        for word in words:
            test_line = current_line + " " + word if current_line else word
            bbox = draw.textbbox((0, 0), test_line, font=font)
            line_width = bbox[2] - bbox[0]
            
            if line_width <= max_width:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word
        
        if current_line:
            lines.append(current_line)
        
        return lines

    # Create a dummy image to wrap text
    dummy_img = Image.new('RGB', (A4_WIDTH, A4_HEIGHT), 'white')
    dummy_draw = ImageDraw.Draw(dummy_img)
    
    # Wrap the text
    wrapped_lines = wrap_text(dummy_draw, text, font, A4_WIDTH - 2 * MARGIN)
    
    # Calculate how many pages we need
    lines_per_page = (A4_HEIGHT - 2 * MARGIN) // line_height
    total_pages = (len(wrapped_lines) // lines_per_page) + (1 if len(wrapped_lines) % lines_per_page > 0 else 0)
    
    # Create a temporary directory to store page images
    temp_dir = tempfile.mkdtemp()
    temp_image_paths = []
    
    # Create pages
    for page_num in range(total_pages):
        # Create an image with A4 dimensions and white background
        image = Image.new('RGB', (A4_WIDTH, A4_HEIGHT), 'white')
        draw = ImageDraw.Draw(image)
        
        # Calculate which lines go on this page
        start_line = page_num * lines_per_page
        end_line = min((page_num + 1) * lines_per_page, len(wrapped_lines))
        
        # Render wrapped text onto the image
        y = MARGIN  # Start Y position
        
        for line_idx in range(start_line, end_line):
            draw.text((MARGIN, y), wrapped_lines[line_idx], font=font, fill='black')
            y += line_height  # Move to next line
        
        # Save page image as temporary file
        temp_image_path = os.path.join(temp_dir, f"page_{page_num}.png")
        image.save(temp_image_path)
        temp_image_paths.append(temp_image_path)
    
    # Create PDF with multiple pages using PyPDF2
    try:
        from PyPDF2 import PdfMerger
        
        # First convert each image to a single-page PDF
        temp_pdf_paths = []
        for i, img_path in enumerate(temp_image_paths):
            temp_pdf_path = os.path.join(temp_dir, f"page_{i}.pdf")
            temp_pdf_paths.append(temp_pdf_path)
            
            # Create single page PDF
            img = Image.open(img_path)
            img.save(temp_pdf_path, "PDF", resolution=100.0)
        
        # Merge PDFs
        merger = PdfMerger()
        for pdf_path in temp_pdf_paths:
            merger.append(pdf_path)
            
        # Write to output file
        merger.write("output.pdf")
        merger.close()
        
    except ImportError:
        # Alternative method if PyPDF2 is not available
        # Just save the first page as PDF and inform user
        print("PyPDF2 not found. Installing single page only.")
        if temp_image_paths:
            img = Image.open(temp_image_paths[0])
            img.save("output.pdf", "PDF", resolution=100.0)
            if len(temp_image_paths) > 1:
                print(f"Warning: Only the first of {len(temp_image_paths)} pages was saved.")
    
    # Clean up temporary files
    for path in temp_image_paths:
        try:
            os.remove(path)
        except:
            pass
    
    for path in temp_pdf_paths if 'temp_pdf_paths' in locals() else []:
        try:
            os.remove(path)
        except:
            pass
    
    try:
        os.rmdir(temp_dir)
    except:
        pass
    

if __name__ == "__main__":

    text = """Artificial intelligence (AI) refers to the capability of computational systems to perform tasks typically associated with human intelligence, such as learning, reasoning, problem-solving, perception, and decision-making. It is a field of research in computer science that develops and studies methods and software that enable machines to perceive their environment and use learning and intelligence to take actions that maximize their chances of achieving defined goals.[1] Such machines may be called AIs.

    High-profile applications of AI include advanced web search engines (e.g., Google Search); recommendation systems (used by YouTube, Amazon, and Netflix); virtual assistants (e.g., Google Assistant, Siri, and Alexa); autonomous vehicles (e.g., Waymo); generative and creative tools (e.g., ChatGPT """


    extracted_text = extract_text_from_pdf(file_path=r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\dyslexia\education\text_coding\Notice_End_Sem_Exam_December2024_Syllabus_MA201.pdf")

    text_conversion(extracted_text)




    