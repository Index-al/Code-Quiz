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
var initialsInput = document.getElementById("initials");
var submitInitialsBtn = document.getElementById("submitInitials");
var lastScore;
var answerSelected = false;

// Event listeners for button clicks
startBtn.addEventListener("click", startQuiz);
highScoresBtn.addEventListener("click", viewHighScores);
backBtn.addEventListener("click", goBack);
submitInitialsBtn.addEventListener("click", submitInitials);

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

// Function to start the quiz
function startQuiz() {
    // Hide the main page content
    mainPageContent.classList.add("hidden");
    backBtn.classList.remove("hidden");
  
    // Reset things for a new quiz
    timerCount = 30;
    currentQuestionIndex = 0;
    timerEl.classList.remove("hidden");
  
    // Display the countdown more prominently
    timerEl.style.fontSize = "3em"; // Increase font size
    timerEl.style.color = "red"; // Change text color
    timerEl.style.position = "absolute";
    timerEl.style.top = "10%";
    timerEl.style.left = "50%";
  
    // Display the countdown
    timerEl.textContent = "3";
    setTimeout(function () {
      timerEl.textContent = "2";
      setTimeout(function () {
        timerEl.textContent = "1";
        setTimeout(function () {
          // Reset styles
          timerEl.style.fontSize = "";
          timerEl.style.color = "";
          timerEl.style.position = "";
          timerEl.style.top = "";
          timerEl.style.left = "";
  
          // Update the score display
          updateScore();
  
          // Start the timer and display the first question
          startTimer();
          displayQuestion();
        }, 1000);
      }, 1000);
    }, 1000);
  }

// "Back" button
function goBack() {
  location.reload(); // TODO: Make back button more versatile
}

// Function to update the score display
function updateScore() {
    timerEl.textContent = "Score: " + timerCount;
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
        quiz.innerHTML =
          '<p>Quiz complete! Your score is: </p> <h3>' + timerCount + "</h3>";
        timerEl.classList.add("hidden");
        timerInterval = clearInterval(timerInterval);
      }
    }, 1000);
  }

// Primary logic for quiz
function displayQuestion() {
  // Remove the 'hidden' class from the quiz container
  quiz.classList.remove("hidden");

  // Get the current question object
  var currentQuestion = questions[currentQuestionIndex];

  // Create the question text element
  var questionTextElement = document.createElement("p");
  questionTextElement.textContent = currentQuestion.questionText;

  // Create the answer choices list element
  var answerChoicesList = document.createElement("ul");

  // Iterate through answer choices and create list items
  currentQuestion.answerChoices.forEach(function (choice) {
    var choiceListItem = document.createElement("li");
    choiceListItem.textContent = choice;

    // Add a click event listener to each choice item
    choiceListItem.addEventListener("click", function () {
      // Check if an answer has already been selected
      if (answerSelected) {
        return;
      }

      // Set the variable to true to indicate an answer has been selected
      answerSelected = true;

      var selectedAnswer = choice; // The text content of the clicked choice

      // Check if the answer is correct
      if (selectedAnswer === currentQuestion.correctAnswer) {
        if (currentQuestionIndex < questions.length) {
          timerCount = timerCount + 5;
          updateScore();
        }
        console.log("Correct answer selected.");

        // Provide visual feedback for a correct answer
        choiceListItem.style.backgroundColor = "green";

        // Wait 1 second before moving onto the next question
        setTimeout(function () {
          choiceListItem.style.backgroundColor = "";
          // Add a second to the timer to compensate for delay
          timerCount++;
          // Move onto the next question
          nextQuestion();
          // Reset the variable to allow selecting a new answer
          answerSelected = false;
        }, 1000);
      } else {
        timerCount = timerCount - 5;
        updateScore();
        console.log("Incorrect answer selected.");

        // Provide visual feedback for an incorrect answer
        choiceListItem.style.backgroundColor = "red";

        // Wait 1 second before moving onto the next question
        setTimeout(function () {
          choiceListItem.style.backgroundColor = "";
          // Add a second to the timer to compensate for delay
          timerCount++;
          // Move onto the next question
          nextQuestion();
          // Reset the variable to allow selecting a new answer
          answerSelected = false;
        }, 1000);
      }
    });

    // Append the choice list item to the answer choices list
    answerChoicesList.appendChild(choiceListItem);
  });

  // Clear existing content in the quiz container
  quiz.innerHTML = "";

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
  // Clear any pending timeouts
  for (var i = 0; i < setTimeout.length; i++) {
    clearTimeout(setTimeout[i]);
  }

  // Clear any pending intervals
  for (var i = 0; i < setInterval.length; i++) {
    clearInterval(setInterval[i]);
  }

  // Clear existing content in the quiz container
  quiz.innerHTML = "";

  // Display the final score
  var scoreElement = document.createElement("h3");
  scoreElement.textContent = "Your final score is: " + timerCount;
  scoreElement.id = "userScore"; // Add an ID to identify the user's score
  quiz.appendChild(scoreElement);

  // Show the submit button and initials input after the quiz is complete
  submitInitialsBtn.classList.remove("hidden");
  initialsInput.classList.remove("hidden");

  // Append the initials input and submit button to the quiz container
  quiz.appendChild(initialsInput);
  quiz.appendChild(submitInitialsBtn);

  // Hide the timer
  timerEl.classList.add("hidden");

  // Stop the timer
  clearInterval(timerInterval);
  timerInterval = null;
}

// Function to submit initials and score
function submitInitials() {
    var userInitials = initialsInput.value.toUpperCase();
    if (userInitials.length > 0) {
      // Save the user initials and score
      var scoreData = {
        initials: userInitials,
        score: timerCount
      };
  
      // Initialize the lastScore variable
      lastScore = scoreData.initials + scoreData.score;
  
      // Retrieve the high scores from local storage
      var allScores = JSON.parse(localStorage.getItem("allScores")) || [];
  
      // Add the current score to the highscores array
      allScores.push(scoreData);
  
      // Sort the highscores in descending order
      allScores.sort((a, b) => b.score - a.score);
  
      // Only display the top 10 scores
      allScores = allScores.slice(0, 10);
  
      // Save the scores to local storage
      localStorage.setItem("allScores", JSON.stringify(allScores));
  
      // A perfectly inconspicuous if statement
      if (userInitials === "RIC") {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
      }
  
      // Hide the submit button and initials input
      submitInitialsBtn.classList.add("hidden");
      initialsInput.classList.add("hidden");
  
      // Display the high scores
      viewHighScores();
    } else {
      alert("Please enter your initials.");
    }
  }
  
  

// Function to view high scores
function viewHighScores() {
  var allScores = JSON.parse(localStorage.getItem("allScores")) || [];

  // Display the high scores
  highscores.classList.remove("hidden");
  backBtn.classList.remove("hidden");

  // Log all scores in console
  console.log("All Scores:", allScores);

  // Clear the main page content and display HS content
  mainPageContent.innerHTML = "";
  quiz.innerHTML = "";
  highscores.innerHTML =
    '<h2>High Scores: </h2>\n\n<ul><li><div>Rank</div><div>Initials</div><div>Score</div></li></ul>';

  // Create the high scores list element
  var highScoresList = document.createElement("ul");

  // Check if there are no scores available
  if (allScores.length === 0) {
    var noScoresMessage = document.createElement("span");
    noScoresMessage.textContent = "No scores available yet.";
    highScoresList.appendChild(noScoresMessage);
  } else {
    // Iterate through the high scores and create list items
    allScores.forEach(function (score, index) {
      var scoreListItem = document.createElement("li");
      // Display place, initials, and score
      scoreListItem.innerHTML =
        "<span>" +
        (index + 1) +
        "</span><span>" +
        score.initials +
        "</span><span>" +
        score.score +
        "</span>";
      highScoresList.appendChild(scoreListItem);
    });
  }

  // Append the high scores list to the main page content
  highscores.appendChild(highScoresList);

  // Check if any scores match lastScore, if so make them yellow
  var scoreListItems = document.querySelectorAll("li");
  console.log("Current last score: " + lastScore);

  scoreListItems.forEach(function (item, index) {
    console.log("Cycling through list: " + item.textContent.substring(1));

    // Check if the item's text content starts with the index followed by lastScore
    if (item.textContent.substring(1).startsWith(lastScore)) {
      item.style.backgroundColor = "yellow";
      item.style.fontWeight = "bold";
      console.log(item.textContent.substring(1) + " is a match!");
    } else {
      console.log(item.textContent.substring(1) + " is not a match.");
    }
  });
}

// Clear high scores if the 'd' AND 'e' AND 'l' keys are pressed in any order
document.addEventListener("keydown", function (event) {
  if (event.key === "d" || event.key === "e" || event.key === "l") {
    // Set the key press as true
    if (event.key === "d") {
      dPressed = true;
      console.log("D pressed: " + dPressed);
    } else if (event.key === "e") {
      ePressed = true;
      console.log("E pressed: " + ePressed);
    } else if (event.key === "l") {
      lPressed = true;
      console.log("L pressed: " + lPressed);
    }

    // Check if all keys have been pressed
    if (dPressed && ePressed && lPressed) {
      // Clear the high scores
      localStorage.removeItem("allScores");
      console.log("High scores cleared.");

      mainPageContent.innerHTML = "";
      quiz.innerHTML = "";
      highscores.innerHTML = "";

      // Create error message for when the key is pressed
      var errorMessage = document.createElement("p");
      errorMessage.innerHTML =
        "You have cleared the high scores!<br><br>Refreshing page...";
      errorMessage.style.color = "red";
      errorMessage.style.fontWeight = "bold";
      errorMessage.style.textAlign = "center";
      errorMessage.style.marginTop = "10px";
      errorMessage.style.marginBottom = "10px";
      errorMessage.style.fontSize = "1.5em";
      errorMessage.style.fontFamily = "sans-serif";
      errorMessage.style.textTransform = "uppercase";
      errorMessage.id = "errorMessage";

      // Append the error message to the main page content
      mainPageContent.appendChild(errorMessage);

      // Remove the error message after 2 seconds
      setTimeout(function () {
        mainPageContent.removeChild(errorMessage);
        location.reload();
      }, 3000);
    }
  }
});
