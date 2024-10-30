// script.js
const video = document.getElementById('video');
const captureButton = document.getElementById('capture-button');
const canvas = document.getElementById('canvas');
const capturedImage = document.getElementById('captured-image');
const faceOptions = document.querySelectorAll('.face-option');
const swapButton = document.getElementById('swap-button');

let userImage;

// Start the camera
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error("Error accessing webcam: ", error);
        alert("Could not access the webcam. Please allow webcam access and try again.");
    }
}

// Capture image
captureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    userImage = canvas.toDataURL('image/png');
    capturedImage.src = userImage;
    capturedImage.style.display = 'block';
    swapButton.disabled = false; // Enable the swap button after capturing an image
});

// Add event listeners for face options
faceOptions.forEach(option => {
    option.addEventListener('click', () => {
        faceOptions.forEach(face => face.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Swap faces
swapButton.addEventListener('click', () => {
    const selectedFace = document.querySelector('.face-option.selected');
    if (selectedFace) {
        const swapImageSrc = selectedFace.src;
        swapFaces(userImage, swapImageSrc);
    } else {
        alert("Please select a face to swap with.");
    }
});

// Function to swap faces
function swapFaces(userImageSrc, swapImageSrc) {
    const userImg = new Image();
    const swapImg = new Image();
    
    userImg.src = userImageSrc;
    swapImg.src = swapImageSrc;

    userImg.onload = () => {
        swapImg.onload = () => {
            // Create a canvas to swap the images
            const swapCanvas = document.createElement('canvas');
            const ctx = swapCanvas.getContext('2d');
            swapCanvas.width = 150; // Set desired width
            swapCanvas.height = 150; // Set desired height
            
            // Draw the swap image first
            ctx.drawImage(swapImg, 0, 0, swapCanvas.width, swapCanvas.height);
            // Draw the user image on top
            ctx.globalAlpha = 0.5; // Set alpha for transparency
            ctx.drawImage(userImg, 0, 0, swapCanvas.width, swapCanvas.height);
            
            // Show the result in the captured image section
            const resultImage = document.createElement('img');
            resultImage.src = swapCanvas.toDataURL('image/png');
            document.body.appendChild(resultImage);
        }
    }
};

// Start the camera on page load
startCamera();
