const videos = [
    { src: '../videos/obama-real.mov', isFake: false }, // Real video
    { src: '../videos/obama-fake.mov', isFake: true },  // Fake video
    { src: '../videos/tom-cruise-real.mov', isFake: false }, // Real video
    { src: '../videos/tom-cruise-fake.mov', isFake: true}
    // Add more videos and their labels (true = fake, false = real)
];

let currentVideoIndex = 0;

const videoElement = document.getElementById('current-video');
const feedbackElement = document.getElementById('feedback');
const realButton = document.getElementById('real-button');
const fakeButton = document.getElementById('fake-button');

function showNextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    videoElement.src = videos[currentVideoIndex].src;
    videoElement.play();
    feedbackElement.textContent = ''; // Clear feedback for the next video
}

function checkAnswer(isUserSayingFake) {
    const currentVideo = videos[currentVideoIndex];
    if (currentVideo.isFake === isUserSayingFake) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = "Incorrect! This is " + (currentVideo.isFake ? "a deepfake." : "real.");
        feedbackElement.style.color = "red";
    }
}

realButton.addEventListener('click', () => {
    checkAnswer(false); // User says the video is real
    setTimeout(showNextVideo, 2000); // Move to next video after 2 seconds
});

fakeButton.addEventListener('click', () => {
    checkAnswer(true); // User says the video is fake
    setTimeout(showNextVideo, 2000); // Move to next video after 2 seconds
});

showNextVideo();

