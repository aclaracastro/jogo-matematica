const $startGameButton = document.querySelector(".start-jogo")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")
const $timer = document.querySelector(".timer")

let currentQuestionIndex = 0
let totalCorrect = 0
let timeLeft = 30
let timerInterval 

const questions_round = 7; //qnt de questao por round

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  startTimer()
  displayNextQuestion()
  shuffleArray(questions)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }

    array.forEach(question => {
        for (let i = question.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.answers[i], question.answers[j]] = [question.answers[j], question.answers[i]];
        }
      });
    
      // Agora, você pega as 7 primeiras questões para mostrar na rodada
      questionsToDisplay = array.slice(0, questions_round);  // Pega 7 questões
      currentQuestionIndex = 0;  // Reseta o índice da pergunta
} 

  

function startTimer() {
    
    if(timerInterval){
        clearInterval(timerInterval)
    }

    timeLeft = 30
    $timer.textContent = `Tempo: ${timeLeft}s`

    timerInterval = setInterval(()=>{
        if(timeLeft > 0){
            timeLeft --
            $timer.textContent = `Tempo: ${timeLeft}s`
        } else{
            clearInterval(timerInterval)
            alert("O tempo acabou!!!")
            displayNextQuestion()
        }
    }, 1000)
}

function displayNextQuestion() {
  resetState()

  if (questions.length == currentQuestionIndex) {
    return finishGame()
  }

  timeLeft = 30
  startTimer()

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  clearInterval(timerInterval)

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })

  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)

  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
    {
        question: "Quanto é 15 + 8?",
        answers: [
          { text: "23", correct: true },
          { text: "25", correct: false },
          { text: "22", correct: false },
          { text: "24", correct: false }
        ]
    },
    {
        question: "Quanto é 34 - 17?",
        answers: [
          { text: "17", correct: true },
          { text: "18", correct: false },
          { text: "16", correct: false },
          { text: "19", correct: false }
        ]
    },
    {
        question: "Quanto é 56 ÷ 8?",
        answers: [
          { text: "7", correct: true },
          { text: "8", correct: false },
          { text: "6", correct: false },
          { text: "9", correct: false }
        ]
    },
    {
        question: "Quanto é 100 + 200?",
        answers: [
          { text: "300", correct: true },
          { text: "400", correct: false },
          { text: "250", correct: false },
          { text: "350", correct: false }
        ]
    },
    {
        question: "Quanto é 120 - 45?",
        answers: [
          { text: "75", correct: true },
          { text: "70", correct: false },
          { text: "80", correct: false },
          { text: "90", correct: false }
        ]
    },
    {
        question: "Quanto é 9 x 5?",
        answers: [
          { text: "45", correct: true },
          { text: "40", correct: false },
          { text: "50", correct: false },
          { text: "48", correct: false }
        ]
    },
    {
        question: "Quanto é 81 ÷ 9?",
        answers: [
          { text: "9", correct: true },
          { text: "8", correct: false },
          { text: "10", correct: false },
          { text: "7", correct: false }
        ]
    },
    {
        question: "Quanto é 25 + 75?",
        answers: [
          { text: "100", correct: true },
          { text: "95", correct: false },
          { text: "110", correct: false },
          { text: "90", correct: false }
        ]
    },
    {
        question: "Quanto é 11 x 4?",
        answers: [
          { text: "44", correct: true },
          { text: "42", correct: false },
          { text: "46", correct: false },
          { text: "48", correct: false }
        ]
    },
    {
        question: "Quanto é 64 ÷ 8?",
        answers: [
          { text: "8", correct: true },
          { text: "7", correct: false },
          { text: "6", correct: false },
          { text: "9", correct: false }
        ]
    },
    {
        question: "Quanto é 150 + 50?",
        answers: [
          { text: "200", correct: true },
          { text: "210", correct: false },
          { text: "190", correct: false },
          { text: "180", correct: false }
        ]
    },
    {
        question: "Quanto é 8 x 12?",
        answers: [
          { text: "96", correct: true },
          { text: "98", correct: false },
          { text: "90", correct: false },
          { text: "100", correct: false }
        ]
    },
    {
        question: "Quanto é 120 - 45?",
        answers: [
          { text: "75", correct: true },
          { text: "80", correct: false },
          { text: "70", correct: false },
          { text: "90", correct: false }
        ]
    },
    {
        question: "Quanto é 200 ÷ 4?",
        answers: [
          { text: "50", correct: true },
          { text: "40", correct: false },
          { text: "60", correct: false },
          { text: "55", correct: false }
        ]
    }
];