python
from flask import Flask, render_template, request
import speech_recognition as sr
from moviepy.editor import VideoFileClip
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/mute_video', methods=['POST'])
def mute_video():
    # Get the uploaded video file
    video_file = request.files['video_file']
    
    # Get the list of words to mute
    with open('words.txt', 'r') as f:
        words_to_mute = f.readlines()
    words_to_mute = [word.strip() for word in words_to_mute]
    
    # Convert the video file to an audio file
    audio_file = video_file.convert(codec="mp3")
    
    # Transcribe the audio file
    r = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio_data = r.record(source)
    transcript = r.recognize_google(audio_data)
    
    # Mute the words in the transcript
    muted_transcript = ' '.join([word if word not in words_to_mute else '*MUTED*' for word in transcript.split()])
    
    # Convert the muted transcript to an audio file
    muted_audio_file = sr.AudioFile('muted_audio.mp3')
    with muted_audio_file as f:
        r.write(muted_transcript, f)
    
    # Create a new video file with the muted audio
    muted_video_file = VideoFileClip("video.mp4").set_audio(muted_audio_file)
    muted_video_file.write_videofile("muted_video.mp4")
    
    # Return the muted video file to the client
    return send_file('muted_video.mp4', mimetype='video/mp4')

if __name__ == '__main__':
    app.run()
    
