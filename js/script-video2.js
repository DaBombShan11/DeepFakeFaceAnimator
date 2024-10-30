const videos = [
    { 
        src: '../videos/morgan-fake.mov', 
        isFake: true, 
        explanation: "The eye regions are not reflecting naturally, and the pattern of blinking are abnormal. The audio is also out of synchronization with the mouth and the lips are unnatural and delay the creation of effects.", 
        imageSrc: '../images/morgan-exlpain.jpg'
    },
    { 
        src: '../videos/spiderman-fake.mov', 
        isFake: true, 
        explanation: "This is a deepfake because of the inconsistencies around key facial areas. There are a lot of unnatural blends along the edges of the face and the jawline, which typically signifies an AI-generated overlay. Subtle mismatches in lip movements and gaze reflections suggest a lack of natural fluidity that can normally be expected from deepfake technology.", 
        imageSrc: '../images/spiderman-explain.jpg'
    },
    // Add more videos and their labels (true = fake, false = real)
];

let currentVideoIndex = 0;

const videoElement = document.getElementById('current-video');
const feedbackElement = document.getElementById('feedback');
const explanationElement = document.getElementById('explanation'); // New element for explanation
const imageElement = document.getElementById('explanation-image'); // New element for explanation image
const realButton = document.getElementById('real-button');
const fakeButton = document.getElementById('fake-button');
const nextButton = document.getElementById('next-button'); // New button for next video

function showNextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    videoElement.src = videos[currentVideoIndex].src;
    videoElement.play();
    feedbackElement.textContent = ''; // Clear feedback for the next video
    explanationElement.textContent = ''; // Clear previous explanation
    imageElement.src = ''; // Clear previous image

    // Hide the Next Video button again after moving to the next video
    nextButton.style.display = 'none';
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

    // Show the explanation and image
    explanationElement.textContent = currentVideo.explanation;
    imageElement.src = currentVideo.imageSrc; // Show the explanation image

    // Show the Next Video button after answering
    nextButton.style.display = 'block';
}

// Event listeners for buttons
realButton.addEventListener('click', () => {
    checkAnswer(false); // User says the video is real
});

fakeButton.addEventListener('click', () => {
    checkAnswer(true); // User says the video is fake
});

// Event listener for the Next Video button
nextButton.addEventListener('click', showNextVideo);

// Show the first video when the page loads
showNextVideo();
