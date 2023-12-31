document.getElementById('muteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let formData = new FormData();
    let selectedWords = Array.from(document.getElementById('words').selectedOptions).map(option => option.value);
    let customWord = document.getElementById('customWord').value;
    if (customWord) {
        selectedWords.push(customWord);
    }

    let videoFile = document.getElementById('videoUpload').files[0];
    if (!videoFile) {
        alert('Please upload a video.');
        return;
    }

    formData.append('video', videoFile);
    formData.append('words', selectedWords.join(','));

    fetch('/mute-video', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('responseMessage').innerText = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
