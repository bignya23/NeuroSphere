import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_alert_email(parent_email, user_name, message_content):
    sender_email = "254d12ab-016e-49ad-907d-85527b68aab9@mailslurp.biz"  # Your email
    sender_password = ""  # Use a secure way to store this, like environment variables
    smtp_server = "mxslurp.click"  # Change this based on your provider
    smtp_port = 2525  # Standard port for TLS

    subject = f"Urgent: {user_name} may need support"
    body = f"""
    Dear Parent/Guardian,

    This is an automated alert from the chatbot system. Based on recent conversations, your child {user_name} may be experiencing emotional distress and could require immediate support.

    Last Conversation Snippet:
    "{message_content}"

    Please check in with them as soon as possible. If needed, consider reaching out to a mental health professional.

    Sincerely,  
    Your Support AI
    """

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = parent_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Secure the connection
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, parent_email, msg.as_string())
        server.quit()
        print("Alert email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")
