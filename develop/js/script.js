// Make sure the script is loaded
console.log("Script loaded");

// Variables
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var highScoresBtn = document.getElementById("high-scores");
var mainPageContent = document.getElementById("mainPageContent");
var timerInterval;
var timerCount = 60;
var currentQuestionIndex = 0;

// Questions
var questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        answerChoices: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    // TODO: Add more questions
];

function displayQuestion() {
    // Remove the 'hidden' class from the quiz container
    quiz.classList.remove('hidden');

    // Get the current question object
    var currentQuestion = questions[currentQuestionIndex];

    // Create the question text element
    var questionTextElement = document.createElement('p');
    questionTextElement.textContent = currentQuestion.questionText;

    // Create the answer choices list element
    var answerChoicesList = document.createElement('ul');

    // Iterate through answer choices and create list items
    currentQuestion.answerChoices.forEach(function (choice) {
        var choiceListItem = document.createElement('li');
        choiceListItem.textContent = choice;

        // Add a click event listener to each choice item
        choiceListItem.addEventListener('click', function () {
            // TODO: Handle user's choice selection
        });

        answerChoicesList.appendChild(choiceListItem);
    });

    // Clear existing content in the quiz container
    quiz.innerHTML = '';

    // Append the question text and answer choices to the quiz container
    quiz.appendChild(questionTextElement);
    quiz.appendChild(answerChoicesList);
}


// Event listeners for button clicks
startBtn.addEventListener("click", startQuiz);
highScoresBtn.addEventListener("click", viewHighScores);

// Function to start the quiz
function startQuiz() {
    // Hide the main page content
    mainPageContent.classList.add('hidden');
    // Start the timer
    startTimer();
    displayQuestion();

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