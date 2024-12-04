const images = [
    {
        src: '../fakeoutlookemail.png',
        isFake: true,
        explanation: "This is a phishing email because of its impersonalization, or something lacking human characteristics (specific names) to make something more generic. There are also numerous grammatical errors, vague language, and awkward phrashing for a large company such as Microsoft. There is also a lack of detail from the 'company' who sent the email.",
        imageSrc: '../fakeoutlookemailexplanation.png'
    },
    {
        src: "../realAmazonorder.png",
        isFake: false,
        explanation: "This is a genuine email due to being personalized to the email recipient, showing that this email was specifically for John Price. There is detailed information about the company who is emailing at the bottom of the order confirmation. The email also provides an exact order number in the subject line and email, and there is a lack of urgency towards the user to take additional steps or to insert their personal information.",
        imageSrc:"../realAmazonorderexplanation.png"
    },
    {
        src: "../fakelastpass.png",
        isFake: true,
        explanation: "This is a phishing email because of its impersonalization, lack of detail from the the company who sent the email. The email is also urging the user to go to a vague website to input sensitive information without much detail on where exactly they will be directed to.",
        imageSrc: "../fakelastpassexplanation.png"
    },
    {
        src: "../realiphonesoundplayed.png",
        isFake: false,
        explanation:"This is a genuine email due to being personalized to the email recipient, detailed information about the company who is emailing, providing an accurate time that the sound was played to when the email was sent, and a lack of urgency towards the user to take additional steps or to insert their personal information." ,
        imageSrc: "../realphonesoundplayedexplanation.png"
    },
];
 
 
let currentImageIndex = 0;
let wrongAnswersCount = 0;
const totalQuestions = images.length;
 

const imageWindow = document.getElementById('image-window');
const explanationWindow = document.getElementById('explanation-window');
const imageElement = document.getElementById('current-image');
const feedbackElement = document.getElementById('feedback');
const explanationTextElement = document.getElementById('explanation-text');
const explanationImageElement = document.getElementById('explanation-image');
const realButton = document.getElementById('real-button');
const fakeButton = document.getElementById('fake-button');
const nextButton = document.getElementById('next-button');
const showExplanationButton = document.getElementById('show-explanation-button');
const resultWindow = document.getElementById('result-window');
const resultMessage = document.getElementById('result-message');
const learnMoreButton = document.getElementById('learn-more-button');
const restartButton = document.getElementById('restart-button');
const congratsButton = document.getElementById('congratsbutton');
const resultContainer = document.getElementById('result-container'); // Container for result message and buttons
 
 
// Function to show next image and handle quiz end
function showNextImage() {
    // If we've completed the quiz, show result buttons (either "certificate" or "restart")
    if (currentImageIndex >= totalQuestions) {  
        resultWindow.style.display = 'block'; // Makes the result window visible

        if (wrongAnswersCount > 0) {
            resultMessage.innerHTML = `  
                <p>You got one or more answers wrong. Please restart the quiz.</p>                   
                <button id = "restartButton" style="display:inline-block;" onclick=restartQuiz()>Restart Quiz</button>
            `;  
            resultWindow.style.display = 'block';  // Show the result window
        } else {
            resultMessage.innerHTML = `
                <p>Congratulations! You've completed the quiz successfully!</p>
                <button id="congratsButton" style="display:inline-block;" onclick="window.location.href='../congratulations.html'">Click to obtain certificate</button>
            `; 
            resultWindow.style.display = 'block';  // Show the result window
        }
        return; // Stop the quiz, no need to show more images
    }
    
    // Hide explanation window and show image window
    explanationWindow.style.display = 'none';
    imageWindow.style.display = 'block';
    
    // Display the current image
    imageElement.src = images[currentImageIndex].src;
 
    // Clear feedback for the next image
    feedbackElement.textContent = '';
    showExplanationButton.style.display = 'none'; // Hide the "Show Explanation" button initially 
}
 
 
function checkAnswer(isUserSayingFake) {
    const currentImage = images[currentImageIndex];
   
    // Check if the user was correct or not
    if (currentImage.isFake === isUserSayingFake) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green"; 
    } else {
        feedbackElement.textContent = "Incorrect! This is " + (currentImage.isFake ? "a phishing email." : "a legitimate email.");
        feedbackElement.style.color = "red";  
        wrongAnswersCount++;  
    }

    showExplanationButton.style.display = 'inline-block';
}
 
 
// Function to display the explanation
function showExplanation() {
    const currentImage = images[currentImageIndex];

    // Hide image window and show explanation window
    imageWindow.style.display = 'none';
    explanationWindow.style.display = 'block';
    
    // Show the explanation and image
    explanationTextElement.textContent = currentImage.explanation;
    explanationImageElement.src = currentImage.imageSrc;
    
    // After showing the explanation, move to the next image
    currentImageIndex++; 

    // Check if it's the last image
    if (currentImageIndex >= images.length) {
        nextButton.style.display = 'none'; // Hide the "Next" button on the last image
        showNextImage(); // Handle the result and show the certificate or restart button
    } else {
        nextButton.style.display = 'inline-block'; // Show the "Next" button for other images
    }
}


realButton.addEventListener('click', () => {
   checkAnswer(false); // User says the image is real
});
 
fakeButton.addEventListener('click', () => {
   checkAnswer(true); // User says the image is fake
});
 
showExplanationButton.addEventListener('click', showExplanation); 

nextButton.addEventListener('click', showNextImage);  
 
// Initialize the quiz by showing the first image
showNextImage();


//function to restart the quiz
function restartQuiz() {
    currentImageIndex = 0;
    wrongAnswersCount = 0;
    resultWindow.style.display = 'none'; //clear result window
    showNextImage();
}
