import requests
from dotenv import load_dotenv
import os
load_dotenv()


response = requests.post(
    f"https://api.stability.ai/v2beta/stable-image/generate/sd3",
    headers={
        "authorization": f"Bearer {os.getenv("STABILITY_API_KEY")}",
        "accept": "image/*"
    },
    files={"none": ''},
    data={
        "prompt": "Lighthouse on a cliff overlooking the ocean",
        "output_format": "jpeg",
    },
)

if response.status_code == 200:
    with open("./lighthouse.jpeg", 'wb') as file:
        file.write(response.content)
else:
    raise Exception(str(response.json()))