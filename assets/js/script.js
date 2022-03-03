// Array of questions
let data = [
  {
    question: "What sport wears shin guards?",
    options: ["Basketball", "Soccer", "Baseball", "Ping Pong"],
    answer: "Soccer",
  },
  {
    question: "What sport is played on ice?",
    options: ["Soccer", "Baseball", "Hockey", "Cricket"],
    answer: "Hockey",
  },
  {
    question: "How many innings are played in a baseball game?",
    options: ["Six", "Eight", "Nine", "Two"],
    answer: "Nine",
  },
  {
    question: "How many points is a touchdown in football?",
    options: ["Three", "Six", "Seven", "Two"],
    answer: "Six",
  },
];

// Global Variables
let startButton = document.getElementById("start-btn");
let quizContent = document.getElementById("quiz-content");
let scoreText = document.getElementById("previous-scores");

let timer = document.createElement("h3");
let secondsLeft;
let quizIndex;
let userScore;
let intervalId;

// local storage
let previousScore = JSON.parse(localStorage.getItem("prevScore"));
//
if (previousScore) {
  scoreText.textContent = `${previousScore[0]}'s previous score: ${previousScore[1]}`;
}

// Quiz start button event
startButton.addEventListener("click", function (event) {
  startButton.setAttribute("style", "display: none");
  secondsLeft = 60;
  quizIndex = 0;
  userScore = 0;
  timer.textContent = secondsLeft;
  quizContent.append(timer);

  startTimer();
  nextQuestion();
});

// Function which initiates timer
function startTimer() {
  intervalId = setInterval(() => {
    secondsLeft--;
    timer.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}

// Function for question index
function nextQuestion() {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<h3>${data[quizIndex].question}</h3>
    <div class="q-options">
        <button class="option-btns">${data[quizIndex].options[0]}</button>
        <button class="option-btns">${data[quizIndex].options[1]}</button>
        <button class="option-btns">${data[quizIndex].options[2]}</button>
        <button class="option-btns">${data[quizIndex].options[3]}</button>
    </div>`;

  quizContent.append(newDiv);

  let allOptions = document.querySelectorAll(".option-btns");

  for (let option of allOptions) {
    console.log(option);

    option.addEventListener("click", function (event) {
      let selection = event.target.textContent;
      console.log(selection);
      if (selection === data[quizIndex].answer) {
        console.log("Correct!");
        userScore++;
      } else {
        selection.textContent = "Wrong!";
        secondsLeft -= 10;
      }

      quizIndex++;
      newDiv.remove();

      console.log(typeof quizIndex);
      console.log(typeof data.length);

      if (quizIndex === data.length) {
        endGame();
      } else {
        nextQuestion();
      }
    });
  }
}

// End game function
function endGame() {
  clearInterval(intervalId);
  timer.remove();

  let finalScore = document.createElement("p");
  finalScore.textContent = userScore;

  let saveBtn = document.createElement("button");
  saveBtn.textContent = "Save Score";

  quizContent.append(finalScore);
  quizContent.append(saveBtn);

  saveBtn.addEventListener("click", function () {
    saveBtn.remove();
    setInitials(finalScore);
  });
}

// Function allows users to add initials and save previous score
function setInitials(finalScore) {
  let initials = "";
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<input placeholder='Enter Initials' type='text' id='initials'>
  <button id='initial-submit'>Submit</button>`;

  quizContent.append(newDiv);
  let userInitials = document.getElementById("initials");
  let initialSubmit = document.getElementById("initial-submit");

  initialSubmit.addEventListener("click", function (event) {
    initials = userInitials.value;

    localStorage.setItem("prevScore", JSON.stringify([initials, userScore]));

    newDiv.remove();
    startButton.setAttribute("style", "display: block");
    let previousScore = JSON.parse(localStorage.getItem("prevScore"));

    if (previousScore) {
      scoreText.textContent = `${previousScore[0]}'s previous score: ${previousScore[1]}`;
    }

    finalScore.remove();
  });
}
