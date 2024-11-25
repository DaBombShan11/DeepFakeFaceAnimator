const images = [
    { src: '/Users/SydneyBrutus/480project/images/fakeemail01.png', isFake: true }, // Real image
    { src: '/Users/SydneyBrutus/480project/images/fakeemail02.webp', isFake: true },  // Fake image
    { src: '/Users/SydneyBrutus/480project/images/realsoundplayed.jpeg', isFake: false }, // Real image
    { src: '/Users/SydneyBrutus/480project/images/realVPNaccount.png', isFake: false }, // Real image
    // Add more images and their labels (true = fake, false = real)
];

let currentImageIndex = 0;
let wrongAnswersCount = 0;
let maxWrongAnswers = 1;

const imageElement = document.getElementById('current-image');
const feedbackElement = document.getElementById('feedback');
const realButton = document.getElementById('real-button');
const fakeButton = document.getElementById('fake-button');

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    imageElement.src = images[currentImageIndex].src;
    feedbackElement.textContent = ''; // Clear feedback for the next image
}

function checkAnswer(isUserSayingFake) {
    const currentImage = images[currentImageIndex];
    if (currentImage.isFake === isUserSayingFake) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = "Incorrect! This is " + (currentImage.isFake ? "a phishing email." : "real.");
        feedbackElement.style.color = "red";
        wrongAnswersCount++;
    }
}

if (wrongAnswersCount == 1){
    alert('You got an answer wrong! Try again!'); 
    wrongAnswersCount = 0;
    currentImageIndex = 0;
    showNextImage();
} 

realButton.addEventListener('click', () => {
    checkAnswer(false); // User says the image is real
    setTimeout(showNextImage, 2000); // Move to next image after 2 seconds
});

fakeButton.addEventListener('click', () => {
    checkAnswer(true); // User says the image is fake
    setTimeout(showNextImage, 2000); // Move to next image after 2 seconds
});

showNextImage();
