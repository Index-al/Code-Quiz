// Make sure the script is loaded
console.log("Script loaded");

// Initialize variables
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var highScoresBtn = document.getElementById("high-scores");
var backBtn = document.getElementById("back");
var mainPageContent = document.getElementById("mainPageContent");
var timerInterval;
var timerCount = 30;
var currentQuestionIndex = 0;

// Event listeners for button clicks
startBtn.addEventListener("click", startQuiz);
highScoresBtn.addEventListener("click", viewHighScores);
backBtn.addEventListener("click", goBack)

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

// "Back" button
function goBack() {
    location.reload(); // TODO: Make back button more versatile
}

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
                    updateScore();
                }
                console.log("Correct answer selected. Moving to the next question.");
            } else {
                timerCount = timerCount - 5;
                updateScore();
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

// Function to move onto the next question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // Quiz is complete, show score
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    quiz.innerHTML = '<p>Quiz complete! Your score is: </p> <h3>' + timerCount + '</h3>';
    timerEl.classList.add('hidden');
    saveScoreToLocalStorage();
    clearInterval(timerInterval);
}

// Function to save the score to local storage
function saveScoreToLocalStorage() {
    var allScores = JSON.parse(localStorage.getItem("allScores")) || [];

    // Add the current score to the highscores array
    allScores.push(timerCount);

    // Sort the highscores in descending order
    allScores.sort((a, b) => b - a);

    // Only display the top 10 scores
    allScores = allScores.slice(0, 10);

    // Save the scores to local storage
    localStorage.setItem("allScores", JSON.stringify(allScores));

    console.log("Score saved to local storage: " + timerCount);
}


// Function to start the quiz
function startQuiz() {
    // Hide the main page content
    mainPageContent.classList.add('hidden');
    backBtn.classList.remove('hidden');

    // Reset things for a new quiz
    timerCount = 30;
    currentQuestionIndex = 0;
    timerEl.classList.remove('hidden');

    // Display the countdown more prominently
    timerEl.style.fontSize = '3em'; // Increase font size
    timerEl.style.color = 'red'; // Change text color
    timerEl.style.position = 'absolute';
    timerEl.style.top = '10%';
    timerEl.style.left = '50%';

    // Display the countdown
    timerEl.textContent = '3';
    setTimeout(function () {
        timerEl.textContent = '2';
        setTimeout(function () {
            timerEl.textContent = '1';
            setTimeout(function () {
                // Reset styles
                timerEl.style.fontSize = '';
                timerEl.style.color = '';
                timerEl.style.position = '';
                timerEl.style.top = '';
                timerEl.style.left = '';

                // Update the score display
                updateScore();

                // Start the timer and display the first question
                startTimer();
                displayQuestion();
            }, 1000);
        }, 1000);
    }, 1000);
}

// Function to update the score display
function updateScore() {
    timerEl.textContent = 'Score: ' + timerCount;
}




// Function to start the timer
function startTimer() {
  // Display the initial timer value
  updateScore();

  // Start the timer interval
  timerInterval = setInterval(function () {
    // Decrease the timer count
    timerCount--;

    // Update the timer display
    updateScore();

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
  var allScores = JSON.parse(localStorage.getItem("allScores")) || [];

  // Display the high scores
  highscores.classList.remove('hidden');
  backBtn.classList.remove('hidden');

  // Clear the main page content and display HS content
    mainPageContent.innerHTML = '';
    highscores.innerHTML = '<h2>High Scores:</h2>';

    // Create the high scores list element
    var highScoresList = document.createElement('ul');

    // Iterate through the high scores and create list items
    allScores.forEach(function (score) {
        var scoreListItem = document.createElement('li');
        scoreListItem.textContent = score;

        highScoresList.appendChild(scoreListItem);
    });

    // Append the high scores list to the main page content
    highscores.appendChild(highScoresList);
}