from flask import Flask, render_template, request, send_file, send_from_directory
from tts import synthesize
import os

app = Flask(__name__)

@app.route('/')
def landing():
    return send_from_directory('.', 'index.html')

@app.route('/tts', methods=['GET', 'POST'])
def tts_interface():
    if request.method == 'POST':
        text = request.form.get('text', '')
        emotion = request.form.get('emotion', None)
        if emotion == 'none':
            emotion = None
            
        try:
            output_file = synthesize(text, emotion, outfile="static/output.mp3")
            return render_template('index.html', success=True, audio_file='output.mp3')
        except Exception as e:
            return render_template('index.html', error=str(e))
            
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True) 