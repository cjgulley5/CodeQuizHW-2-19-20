const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()

  var secondsLeft = 60;
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = "Time: " + secondsLeft;
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        scorePage();
      }
    }, 1000);
  }
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'In what HTML element do we put in JavaScript code?',
    answers: [
      { text: '<script>', correct: true },
      { text: '<html>', correct: false }
    ]
  },
  {
    question: 'How do you call an alert box ?',
    answers: [
      { text: 'alert', correct: true },
      { text: 'call', correct: false },
      { text: 'alert.box', correct: false },
      { text: 'alert.call', correct: false }
    ]
  },
  {
    question: 'What was the first browser to incorporate JS?',
    answers: [
      { text: 'Mozilla', correct: false },
      { text: 'Netscape', correct: true },
      { text: 'Chrome', correct: false },
      { text: 'Explorer', correct: false }
    ]
  },
  {
    question: 'What is the extension called on a JavaScript page?',
    answers: [
      { text: '.html', correct: false },
      { text: '.js', correct: true }
    ]
  }
]