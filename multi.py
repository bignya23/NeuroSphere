"""Synthesizes speech for multiple speakers.
Make sure to be working in a virtual environment.
"""
from google.cloud import texttospeech_v1beta1 as texttospeech

# Instantiates a client
client = texttospeech.TextToSpeechClient()

multi_speaker_markup = texttospeech.MultiSpeakerMarkup(
    turns=[
        texttospeech.MultiSpeakerMarkup.Turn(
            text="I've heard that the Google Cloud multi-speaker audio generation sounds amazing!",
            speaker="R",
        ),
        texttospeech.MultiSpeakerMarkup.Turn(
            text="Oh? What's so good about it?", speaker="S"
        ),
        texttospeech.MultiSpeakerMarkup.Turn(text="Well..", speaker="R"),
        texttospeech.MultiSpeakerMarkup.Turn(text="Well what?", speaker="S"),
        texttospeech.MultiSpeakerMarkup.Turn(
            text="Well, you should find it out by yourself!", speaker="R"
        ),
        texttospeech.MultiSpeakerMarkup.Turn(
            text="Alright alright, let's try it out!", speaker="S"
        ),
    ]
)

# Set the text input to be synthesized
synthesis_input = texttospeech.SynthesisInput(
    multi_speaker_markup=multi_speaker_markup
)

# Build the voice request, select the language code ('en-US') and the voice
voice = texttospeech.VoiceSelectionParams(
    language_code="en-US", name="en-US-Studio-MultiSpeaker"
)

# Select the type of audio file you want returned
audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3
)

# Perform the text-to-speech request on the text input with the selected
# voice parameters and audio file type
response = client.synthesize_speech(
    input=synthesis_input, voice=voice, audio_config=audio_config
)

# The response's audio_content is binary.
with open("output.mp3", "wb") as out:
    # Write the response to the output file.
    out.write(response.audio_content)
    print('Audio content written to file "output.mp3"')