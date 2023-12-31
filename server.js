const express = require('express');
const fileUpload = require('express-fileupload');
const speech = require('@google-cloud/speech');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const speechClient = new speech.SpeechClient();
app.use(fileUpload());
app.use(express.static('public'));

app.post('/mute-video', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let videoFile = req.files.video;
    let wordsToMute = req.body.words;

    // Save the video file temporarily
    const videoFilePath = './uploads/' + videoFile.name;
    await videoFile.mv(videoFilePath);

    // Extract audio from video (using FFmpeg)
    const audioFilePath = './uploads/' + videoFile.name + '.wav';
    exec(`ffmpeg -i ${videoFilePath} ${audioFilePath}`, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error extracting audio: ${error.message}`);
            return res.status(500).send('Error processing video');
        }

        // Read audio file
        const file = fs.readFileSync(audioFilePath);
        const audioBytes = file.toString('base64');

        // Send audio to Google Cloud Speech-to-Text
        const [response] = await speechClient.recognize({
            audio: {
                content: audioBytes,
            },
            config: {
                encoding: 'LINEAR16',
                sampleRateHertz: 16000,
                languageCode: 'en-US',
            },
        });

        // TODO: Process response to find words and timestamps
        // TODO: Mute these parts in the audio track

        res.send('Video processing completed');
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
