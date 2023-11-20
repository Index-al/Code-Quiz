// Make sure the script is loaded
console.log("Script loaded");

// Variables
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var highScoresBtn = document.getElementById("high-scores");
var mainPageContent = document.getElementById("mainPageContent");
var timerInterval;
var timerCount = 30;
var currentQuestionIndex = 0;

// Questions
var questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        answerChoices: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        questionText: "The condition in an if / else statement is enclosed within ____.",
        answerChoices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses"
    },
    {
        questionText: "Arrays in JavaScript can be used to store ____.",
        answerChoices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        questionText: "String values must be enclosed within ____ when being assigned to variables.",
        answerChoices: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "quotes"
    },
    {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerChoices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    }
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
            var selectedAnswer = choice; // The text content of the clicked choice

            // Check if the answer is correct
            if (selectedAnswer === currentQuestion.correctAnswer) {
                if (currentQuestionIndex < questions.length) {
                    timerCount = timerCount + 5;
                }
                console.log("Correct answer selected. Moving to the next question.");
            } else {
                timerCount = timerCount - 5;
                console.log("Incorrect answer selected. Moving to the next question.");
            }
            
            // Move onto the next question
            nextQuestion();
        });

        answerChoicesList.appendChild(choiceListItem);
    });

    // Clear existing content in the quiz container
    quiz.innerHTML = '';

    // Append the question text and answer choices to the quiz container
    quiz.appendChild(questionTextElement);
    quiz.appendChild(answerChoicesList);
}

function nextQuestion() {
    // Increment the current question index
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        // Display the next question
        displayQuestion();
    } else {
        // Quiz is complete, do something (e.g., show score)
        quiz.innerHTML = '<p>Quiz complete! Your score is: </p> <h3>' + timerCount + '</h3>';
        timerEl.classList.add('hidden');
        timerInterval = clearInterval(timerInterval);
    }
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
      quiz.innerHTML = '<p>Quiz complete! Your score is: </p> <h3>' + timerCount + '</h3>';
      timerEl.classList.add('hidden');
      timerInterval = clearInterval(timerInterval);
    }
  }, 1000);
}

// Function to view high scores
function viewHighScores() {
  // TODO: Add code to view high scores
}