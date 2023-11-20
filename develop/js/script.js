// Make sure the script is loaded
console.log("Script loaded");

// Variables
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var highScoresBtn = document.getElementById("high-scores");
var mainPageContent = document.getElementById("mainPageContent");
var timerInterval;
var timerCount = 60;

// Questions
var questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        answerChoices: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    // TODO: Add more questions
];

// Event listeners for button clicks
startBtn.addEventListener("click", startQuiz);
highScoresBtn.addEventListener("click", viewHighScores);

// Function to start the quiz
function startQuiz() {
    mainPageContent.classList.add('hidden');
    // Start the timer
    startTimer();

    // TODO: Add code to start the quiz
}

// Function to start the timer
function startTimer() {
  // Display the initial timer value
  timerEl.textContent = timerCount;

  // Start the timer interval
  timerInterval = setInterval(function () {
    // Decrease the timer count
    timerCount--;

    // Update the timer display
    timerEl.textContent = timerCount;

    // Check if the timer has reached 0
    if (timerCount <= 0) {
      // Stop the timer
      clearInterval(timerInterval);

      // TODO: Add code to end the quiz
    }
  }, 1000);
}

// Function to view high scores
function viewHighScores() {
  // TODO: Add code to view high scores
}