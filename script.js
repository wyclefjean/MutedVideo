function addWord() {
    var word = document.getElementById("customWord").value;
    var checkboxes = document.getElementById("wordCheckboxes");
    checkboxes.innerHTML += '<input type="checkbox" id="' + word + '" name="words" value="' + word + '"><label for="' + word + '">' + word + '</label><br>';
}

function processVideo() {
    document.getElementById("loading").style.display = "block";
    // Implement the video processing here
}
