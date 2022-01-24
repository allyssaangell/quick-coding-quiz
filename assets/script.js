var questionContainerEl = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var results = document.getElementById("results");
var answerEl = document.getElementById("answer-buttons");
var startButton = document.getElementById("start-btn");
var indexQuestion = 0;
var mostRecentScore = 0;
var timer = document.querySelector("#timer");
var timerSeconds = 60;
var username = document.getElementById("username");
var submitBtn = document.getElementById("submitBtn");
var finalScore = document.getElementById("finalScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

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
  mostRecentScore = 0;
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
    answers: ["JavaScript", "Terminal/bash", "For loops", "console.log"],
    correctAnswer: "console.log",
  },
];

function displayQuestion() {
  if (indexQuestion >= questions.length || timerSeconds < 1) {
    //  END OF QUIZ
    formEntry.classList.remove("hide");
    document.getElementById("high-score-page").innerHTML =
      "The quiz has ended! Your score: " + mostRecentScore;

    document.getElementById("question-container").style.display = "none";
    document.getElementById("timer").style.display = "none";
    localStorage.setItem("mostRecentScore", mostRecentScore);
    finalScore.innerText = mostRecentScore;

    username.addEventListener("keyup", () => {
      submitBtn.disabled = !username.value;
    });

    saveHighScore = (e) => {
      e.preventDefault();

      const score = {
        score: mostRecentScore,
        name: username.value,
      };
      highScores.push(score);
      highScores.sort((a, b) => b.score - a.score);
      highScores.splice(5);

      localStorage.setItem("highScores", JSON.stringify(highScores));
      JSON.parse(window.localStorage.getItem(highScores));
      console.log(highScores);

      highScores.forEach((element, index) => {
        console.log(element.name);
        document.getElementById("topFive").innerHTML +=
          element.name + " - " + element.score + "<br>";
      });
      highScoreTitle.classList.remove("hide");
    };
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
    mostRecentScore = mostRecentScore + 10;
    console.log("This is the score " + mostRecentScore);
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
