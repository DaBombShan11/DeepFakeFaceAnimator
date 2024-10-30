// Define the stages of the game
const stages = [
    { name: "Deepfake Tutorial", file: "tutorial.html" },
    { name: "Deepfake Face Animation", file: "animation.html" },
    { name: "Image Detection Tutorial", file: "image-tutorial.html" },
    { name: "Image Detection Practice", file: "image-detection.html" },
    { name: "Video Detection Tutorial", file: "video-tutorial.html" },
    { name: "Phishing Email Detection Tutorial", file: "phishing-tutorial.html" },
    { name: "Phishing Detection Practice", file: "phishing.html" },
];

// Start the game
function startGame() {
    localStorage.setItem("currentStage", 0); // Start at stage 0
    navigateToStage(0);
}

// Navigate to a specific stage
function navigateToStage(stageIndex) {
    // Ensure the stage exists and set it in localStorage
    if (stageIndex < stages.length) {
        localStorage.setItem("currentStage", stageIndex);
        window.location.href = stages[stageIndex].file;
    } else {
        alert("All stages completed! Congratulations!");
        // Redirect to certificate or completion page here
    }
}

// Check if the user can proceed to the next stage
function proceedToNextStage() {
    let currentStage = parseInt(localStorage.getItem("currentStage") || "0");
    if (currentStage < stages.length - 1) {
        navigateToStage(currentStage + 1);
    } else {
        alert("You have completed all stages! Get your certificate.");
        // Redirect to certificate or completion page here
    }
}

// Display current progress on each page
function updateProgressDisplay() {
    const currentStage = parseInt(localStorage.getItem("currentStage") || "0");
    document.getElementById("progress-status").innerText = `Progress: ${currentStage + 1}/${stages.length}`;
}

// On each page, check if the user is allowed to be there
function checkStageAccess(stageIndex) {
    const currentStage = parseInt(localStorage.getItem("currentStage") || "0");
    if (stageIndex > currentStage) {
        alert("Complete previous steps before proceeding.");
        navigateToStage(currentStage); // Redirect back to current stage
    } else {
        updateProgressDisplay(); // Display the progress
    }
}
