require('dotenv').config();
const express = require('express');
const multer = require('multer');
const speech = require('@google-cloud/speech');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();
const port = 3000;

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Google Speech-to-Text client
const client = new speech.SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

app.use(express.static('public'));

app.post('/upload', upload.single('video'), async (req, res) => {
    const videoPath = req.file.path;
    const wordsToMute = req.body.wordsToMute;

    // Process the video here
    // 1. Extract audio from video
    // 2. Transcribe audio
    // 3. Mute specific words
    // 4. Merge audio back to video

    res.send('Video processing started');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
