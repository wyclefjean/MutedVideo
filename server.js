const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

app.post('/upload', (req, res) => {
    let uploadedVideo = req.files.video;
    // Process video here
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
