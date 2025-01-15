// app.js

// Language translations (dummy data for now)
const translations = {
    en: "Hello!",
    hi: "नमस्कार",
    es: "¡Hola!",
    fr: "Bonjour!",
    de: "Hallo!",
    zh: "你好",
    ru: "Здравствуйте",
    ar: "مرحبا",
    ja: "こんにちは",
    ko: "안녕하세요"
};

// Start the video stream from the webcam
function startRecognition() {
    const video = document.getElementById('video');
    const cameraSection = document.getElementById('camera-section');

    // Show the camera section when recognition starts
    cameraSection.style.display = 'block';

    // Access the user's camera
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
                document.getElementById('detected-sign').innerText = "✋ Hand Sign Detected";
                translateText(); // Trigger translation upon recognition
            })
            .catch(function (err) {
                console.log("Something went wrong!", err);
            });
    }
}

// Stop the video stream and hide the camera section
function stopRecognition() {
    const video = document.getElementById('video');
    const cameraSection = document.getElementById('camera-section');
    video.srcObject = null;
    cameraSection.style.display = 'none';
}

// Translate text based on selected language
function translateText() {
    const selectedLang = document.getElementById('language-selector').value;
    const translatedText = translations[selectedLang];
    document.getElementById('translated-text').innerText = translatedText;
}

// Play speech for the translated text
function playSpeech() {
    const selectedLang = document.getElementById('language-selector').value;
    const translatedText = translations[selectedLang];

    // Use Web Speech API to convert text to speech
    const speech = new SpeechSynthesisUtterance(translatedText);
    speech.lang = selectedLang;
    window.speechSynthesis.speak(speech);
}

function toggleMenu() {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("active");
}

function copyEmailToClipboard(email) {
    navigator.clipboard.writeText(email).then(() => {
        alert(`Copied ${email} to clipboard`);
    }).catch((error) => {
        console.error("Failed to copy email:", error);
    });
}