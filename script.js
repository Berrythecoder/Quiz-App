const questions = [
    {
        question: " Whats the lifespan of a whale?",
        answers: [
            {text: "70 Years", correct: true},
            {text: "40 Years" ,correct: false},
            {text: "50 Years" ,correct: false},
            {text: "60 Years", correct: false}
        ]
    },
    {
        question: " Whats the first phase of the moom?",
        answers: [
            {text: "First Quarter",correct: false},
            {text: "Waxing Crescent",correct: false},
            {text: "New Moon",correct: true},
            {text: "Waning Cresent",correct: false}
        ] 
    },
    {
        question: " Whats the Capitol of France",
        answers: [
            {text: "Madrid",correct: false},
            {text: "Paris",correct: true},
            {text: "London",correct: false},
            {text: "Berlin",correct: false}
        ] 
    },
    {
        question: " What is the chemical symbol for Gold?",
        answers: [
            {text: "Au",correct: true},
            {text: "Ga",correct: false},
            {text: "GD",correct: false},
            {text: "Go",correct: false}
        ] 
    },
    {
        question: " What is the LARGEST planet in our solar system?",
        answers: [
            {text: "Saturn",correct: false},
            {text: "Venus",correct: false},
            {text: "Jupiter",correct: true},
            {text: "Mars",correct: false}
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currrentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currrentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currrentQuestion =  questions[currrentQuestionIndex];
    let questionNo = currrentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currrentQuestion.question;

    currrentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", SelectAnswer)

    })
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function SelectAnswer(e){
    const selectedBin = e.target;
    const isCorrect = selectedBin.dataset.correct === "true";
    if(isCorrect){
        selectedBin.classList.add("correct");
        score++;
    }else{
        selectedBin.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}
function handleNextButton(){
    currrentQuestionIndex++;
    if(currrentQuestionIndex){
        if(currrentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }
    }
nextButton.addEventListener("click", ()=>{
    if(currrentQuestionIndex < questions.length){
        handleNextButton(); 
    }else{
        startQuiz();
    }
});

startQuiz();
