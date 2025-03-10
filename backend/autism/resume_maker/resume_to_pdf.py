from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from .resume_maker import generate_resume
import re
import os
def format_text(text):
    """
    Convert markdown-like syntax to reportlab formatted text.
    - Converts `**Heading**` to <b>Heading</b>
    - Converts `*Bold Text*` to <b>Bold Text</b>
    - Keeps bullet points (•) intact
    """
    # Convert **Heading** to bold <b>Heading</b>
    text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
    
    # Convert *Bold Text* to bold <b>Bold Text</b>
    text = re.sub(r'\*(.*?)\*', r'<b>\1</b>', text)
    
    # Ensure bullet points have spacing
    text = text.replace("•", "<bullet>•</bullet>")
    
    return text

def generate_resume_pdf(name, phno, email, linkedin, education, skills, projects, experience, filename="resume.pdf"):
    resume_text = generate_resume(name, phno, email, linkedin, education, skills, projects, experience)

    # print(resume_text)
    doc = SimpleDocTemplate(filename, pagesize=letter)
    styles = getSampleStyleSheet()
    
    # Define custom styles
    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontSize=11,
        leading=14,
        spaceAfter=8
    )
    
    title_style = ParagraphStyle(
        "Title",
        parent=styles["Normal"],
        fontSize=16,
        spaceAfter=12,
        textColor=colors.darkblue,
        alignment=1,  # Center align
        bold=True
    )
    
    elements = []
    
    # Split the text into lines
    lines = resume_text.strip().split("\n")
    
    for line in lines:
        formatted_line = format_text(line.strip())

        if line.strip(): 
            if formatted_line.startswith("<b>") and formatted_line.endswith("</b>"):
                elements.append(Paragraph(formatted_line, styles["Heading2"]))  
            else:
                elements.append(Paragraph(formatted_line, body_style))  
            
            elements.append(Spacer(1, 5))  


    doc.build(elements)
    print(f"PDF generated successfully: {filename}")


# Generate the PDF
if __name__ == "__main__":
    generate_resume_pdf()
