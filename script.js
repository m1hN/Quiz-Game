// Quiz Game

let currentQuestion = 0;
let score = 0;
let i = 0;
let numWrong = 0;
let numCorrect = 0;
let highScore = 0;

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const scoreText = document.getElementById("score-text");
const highScoreEl = document.getElementById("high-score");
const feedback1 = document.getElementById("feedback1");
const feedback2 = document.getElementById("feedback2");

// Quiz Questions
// Store your quiz questions, multiple choice options, and correct answer in an associative array
// ------
let questionsArray = [
  {
    question: "What is the capital of France?",
    a: "Berlin",
    b: "Madrid",
    c: "Paris",
    d: "Rome",
    correctAnswer: "Paris",
  },
  {
    question: "Which continent is the Sahara Desert located on?",
    a: "Asia",
    b: "Africa",
    c: "Australia",
    d: "North America",
    correctAnswer: "Africa",
  },
  {
    question: "What is the longest river in the world?",
    a: "Amazon River",
    b: "Nile River",
    c: "Yangtze River",
    d: "Mississippi River",
    correctAnswer: "Nile River",
  },
  {
    question: "Which country has the most population?",
    a: "India",
    b: "China",
    c: "USA",
    d: "Russia",
    correctAnswer: "China",
  },
  {
    question: "What is the square root of 64?",
    a: "6",
    b: "7",
    c: "8",
    d: "9",
    correctAnswer: "8",
  },
  {
    question: "What is 12 * 12?",
    a: "122",
    b: "144",
    c: "156",
    d: "132",
    correctAnswer: "144",
  },
  {
    question: "What is the value of Pi (π) up to 3 decimal places?",
    a: "3.142",
    b: "3.141",
    c: "3.139",
    d: "3.145",
    correctAnswer: "3.142",
  },
  {
    question: "If x = 5, what is 2x + 3?",
    a: "13",
    b: "12",
    c: "11",
    d: "10",
    correctAnswer: "13",
  },
];
let correctArray = [];
let wrongArray = [];
let scoreArray = [];
// ------

// Radio Button

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  i = 0;
  numWrong = 0;
  numCorrect = 0;
  showQuestion();
}

// Displays the appropriate question onscreen. You may add a parameter if you like.
function showQuestion() {
  if (i > 7) {
    showResults();
  } else {
    questionText.innerHTML = `${questionsArray[i].question}`;

    answerButtons.innerHTML = `<form id="quiz-form">
  <label><input type="radio" name="answer" value="${questionsArray[i].a}" /> ${questionsArray[i].a}</label
  ><br />
  <label><input type="radio" name="answer" value="${questionsArray[i].b}" /> ${questionsArray[i].b}</label
  ><br />
  <label><input type="radio" name="answer" value="${questionsArray[i].c}" /> ${questionsArray[i].c}</label
  ><br />
  <label><input type="radio" name="answer" value="${questionsArray[i].d}" /> ${questionsArray[i].d}</label
  ><br />
  <button type="button" id="submit-btn">Submit</button>
</form>`;
    document
      .getElementById("submit-btn")
      .addEventListener("click", checkAnswer);
  }
}

// Checks if the answer is correct. This answer should be read from the site and passed as a parameter.
// You may add additional parameters, as needed.
function checkAnswer() {
  let radios = document.getElementsByName("answer");
  let selectedValue = null;

  let correctAnswer = questionsArray[i].correctAnswer;

  for (let radio of radios) {
    if (radio.checked) {
      selectedValue = radio.value;
      break;
    }
  }
  if (selectedValue !== null) {
    // alert("You selected: " + selectedValue);
    // Now compare selectedValue with the correct answer index or value
    if (selectedValue === correctAnswer) {
      correctArray.push(questionsArray[i].question);
      i++;
      numCorrect++;
    } else {
      wrongArray.push(questionsArray[i].question);
      i++;
      numWrong++;
    }
  } else {
    alert("Please select an answer.");
  }
  showQuestion();
}

// Displays results of the quiz:  The more detailed results, the better! Users should see feedback from
// each question.
function showResults() {
  questionText.innerHTML = ``;
  answerButtons.innerHTML = ``;

  // Store High Score
  scoreArray.push(numCorrect);
  scoreArray.sort((a, b) => b - a);

  highScore = scoreArray[0];
  highScoreEl.innerHTML = `High Score: ${highScore}/8`;

  if (numCorrect < 5) {
    scoreText.style.color = "red";
  } else {
    scoreText.style.color = "green";
  }

  scoreText.innerHTML = `Score: ${numCorrect}/8 <br> Percentage: ${eval(
    Math.round((numCorrect / 8) * 100)
  )}%`;

  for (let i = 0; i < correctArray.length; i++) {
    feedback1.innerHTML += correctArray[i] + "<br> <br>";
  }

  for (let i = 0; i < wrongArray.length; i++) {
    feedback2.innerHTML += wrongArray[i] + "<br>  <br>";
  }

  resultScreen.classList.remove("hidden");
}

// You do not have to alter this function.
function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  console.log("Do something");
  startQuiz();
}

// function choices() {
//   let i = 0;
//   document.getElementById("answer-buttons").innerHTML = `<form id="quiz-form">
//   <label><input type="radio" name="answer" value="0" /> ${questionsArray[i].a}</label
//   ><br />
//   <label><input type="radio" name="answer" value="1" /> ${questionsArray[i].b}</label
//   ><br />
//   <label><input type="radio" name="answer" value="2" /> ${questionsArray[i].c}</label
//   ><br />
//   <label><input type="radio" name="answer" value="3" /> ${questionsArray[i].d}</label
//   ><br />
//   <button type="button" id="submit-btn">Submit</button>
// </form>`;
// }

// Program one of the following extensions, or come up with one of your own:
// - Randomize question order or shuffle answers

// - Use  buttons or dropdowns instead of radio buttons

// - Add a countdown timer

// - Track incorrect answers for review

// - Store high scores in localStorage
