var questionContainerEl = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var results = document.getElementById("results");
var answerEl = document.getElementById("answer-buttons");
var startButton = document.getElementById("start-btn");
var indexQuestion = 0;
var score = 0;
var timer = document.querySelector("#timer");
var timerSeconds = 60;

startButton.addEventListener("click", startQuiz);
timer.innerHTML = `Time Remaining: 00:${timerSeconds}`;

function startQuiz() {
  startButton.classList.add("hide");
  questionContainerEl.classList.remove("hide");
  intro.classList.add("hide");

  var countDown = setInterval(() => {
    timerSeconds--;
    timer.innerHTML = `Time Remaining: 00:${
      timerSeconds < 10 ? "0" : ""
    }${timerSeconds}`;
    if (timerSeconds < 1) {
      clearInterval(countDown);
      timer.innerHTML = "Time's Up!";
    }
  }, 1000);

  displayQuestion();
  score = 0;
}

var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: "Alerts",
  },
  {
    question: "The condition in an if / else statement is enclosed with _____.",
    answers: ["Quotes", "Curly brackets", "Parenthesis", "Square brackets"],
    correctAnswer: "Parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store _______.",
    answers: [
      "Numbers and strings",
      "Other Arrays",
      "Booleans",
      "All of the above",
    ],
    correctAnswer: "All of the above",
  },
  {
    question:
      "String values bust be enclosed within _____ when being assigned to variables.",
    answers: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
    correctAnswer: "Quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "Terminal/bash", "For loops", "Console.log"],
    correctAnswer: "Console.log",
  },
];

function displayQuestion() {
  if (indexQuestion >= questions.length) {
    //  END OF QUIZ
    document.getElementById("high-score-page").innerHTML =
      "The quiz has ended! Your score: " + score;
  } else {
    var answerClick = document.getElementById("answer-buttons");
    var question = document.getElementById("question");

    while (answerClick.hasChildNodes()) {
      answerClick.removeChild(answerClick.firstChild);
    }

    var i = 0;
    while (i < 4) {
      var listElement = document.createElement("li");
      listElement.textContent = questions[indexQuestion].answers[i];
      listElement.onclick = evaluateAndIncrement;
      answerClick.appendChild(listElement);
      i++;
    }
    question.textContent = questions[indexQuestion].question;
  }
}

function evaluateAndIncrement(event) {
  event.preventDefault();
  if (questions[indexQuestion].correctAnswer === event.target.innerHTML) {
    score = score + 10;
    console.log("This is the score " + score);
    document.getElementById("correct-wrong").innerHTML = "Correct!";
    setTimeout(function () {
      document.getElementById("correct-wrong").innerHTML = "";
    }, 500);
  } else {
    console.log("before time penalty =" + timerSeconds);
    timerSeconds = timerSeconds - 10;
    console.log("after time penalty =" + timerSeconds);
    document.getElementById("correct-wrong").innerHTML = "Wrong!";
    setTimeout(function () {
      document.getElementById("correct-wrong").innerHTML = "";
    }, 500);
  }
  indexQuestion++;
  displayQuestion();
}

if (timerSeconds > 0) {
  clearInterval(countDown);
  console.log("time remaining");
} else {
  //  current score entry?
}

function highScoreEntry() {}

//highscore entry

//highscores list
