const images = [
    { src: '../images/IMG_1466.JPG', isFake: true }, // Real image
    { src: '../images/IMG_1467.JPG', isFake: true },  // Fake image
    { src: '../images/IMG_1469.PNG', isFake: false }, // Real image
    { src: '../images/IMG_1470.JPG', isFake: false }, // Real image
    // Add more images and their labels (true = fake, false = real)
];

let currentImageIndex = 0;

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
        feedbackElement.textContent = "Incorrect! This is " + (currentImage.isFake ? "a deepfake." : "real.");
        feedbackElement.style.color = "red";
    }
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
