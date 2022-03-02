// When start button is clicked, remove timer and diplay question 1

// start btn needs event listener 
// hide start btn
// create element to show timer and then append that element to the div container
// same thing for question 1

let data = [
    {
        question: 'What sport wears shin guards?',
        options: [
            'Basketball',
            'Soccer',
            'Baseball',
            'Ping Pong',
        ],
        answer: 'Soccer'

    },
    {
        question: 'What sport is played on ice?',
        options: [
            'Soccer',
            'Baseball',
            'Hockey',
            'Cricket',
        ],
        answer: 'Hockey'

    },
    {
        question: 'How many innings are played in a baseball game?',
        options: [
            'Six',
            'Eight',
            'Nine',
            'Two',
        ],
        answer: 'Nine'
    },
    {
        question: 'How many points is a touchdown in football?',
        options: [
            'Three',
            'Six',
            'Seven',
            'Two',
        ],
        answer:
            'Six'

    }
]

let startButton = document.getElementById("start-btn");
let quizContent = document.getElementById("quiz-content");
// let stopFunction = document.querySelector()

let timer = document.createElement("h3");
let secondsLeft = 60;
let quizIndex = 0;
let userScore = 0;
let intervalId

startButton.addEventListener("click", function (event) {
    startButton.setAttribute("style", "display: none");

    timer.textContent = secondsLeft;
    quizContent.append(timer);

    startTimer();
    nextQuestion();
})

function startTimer() {
    intervalId = setInterval(() => {
        secondsLeft--;
        timer.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(intervalId)
        }
    }, 1000);



}

function nextQuestion() {
    let newDiv = document.createElement('div');
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
            console.log(selection)
            if (selection === data[quizIndex].answer) {
                console.log('Correct!')
                userScore++;
            } else {
                selection.textContent = "Wrong!"
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
        })
    }
}

function endGame() {
    clearInterval(intervalId)
    timer.remove();

    let finalScore = document.createElement("p");
    finalScore.textContent = userScore;

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save Score";

    quizContent.append(finalScore);
    quizContent.append(saveBtn);

    saveBtn.addEventListener("click", function () {
        saveBtn.remove();
        setInitials();
    })
}


function setInitials() {
    let initials = []
    localStorage.setItem('initials',JSON.stringify(initials))
    JSON.parse (localStorage.getItem ('initials'))
    initials.push ({name: 'Andreas'})

}   