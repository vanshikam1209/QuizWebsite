const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Grand Central Terminal, Park Avenue, New York is the world?",
        choice1: 'largest railway station',
        choice2: 'highest railway station',
        choice3: 'longest railway station',
        choice4: 'None of the above',
        answer: 1,
    },
    {
        question:"For which of the following disciplines is Nobel Prize awarded?",
        choice1: "Physics and Chemistry",
        choice2: "Physiology or Medicine",
        choice3: "Literature, Peace and Economics",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: " Which is the biggest desert in the world?",
        choice1: "Gobi Desert",
        choice2: "Namib Desert",
        choice3: "Sahara Desert",
        choice4: "Atacama Desert",
        answer: 3,
    },
    {
        question: "Entomology is the science that studies?",
        choice1: "Behavior of human beings",
        choice2: "Insects",
        choice3: "The origin and history of technical and scientific terms",
        choice4: "The formation of rocks",
        answer: 2,
    },
    {
        question: "Guwahati High Court is the judicature of?",
        choice1: "Nagaland",
        choice2: "Arunachal Pradesh",
        choice3: "Assam",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: "Friction can be reduced by changing from?",
        choice1: "sliding to rolling",
        choice2: "rolling to sliding",
        choice3: "potential energy to kinetic energy",
        choice4: "dynamic to static",
        answer: 1,
    },
    {
        question: "Joule is the unit of?",
        choice1: "temperature",
        choice2: "pressure",
        choice3: "energy",
        choice4: "heat",
        answer: 3,
    },
    {
        question: "The landmass of which of the following continents is the least?",
        choice1: "Africa",
        choice2: "Asia",
        choice3: "Australia",
        choice4: "Europe",
        answer: 3,
    },
    {
        question: "Which of the following is tropical grassland??",
        choice1: "Taiga",
        choice2: "Savannah",
        choice3: "Pampas",
        choice4: "Prairies",
        answer: 2,
    },
    {
        question: "The humidity of the air depends upon?",
        choice1: "temperature",
        choice2: "location",
        choice3: "weather",
        choice4: "All of the above",
        answer: 4,
    }

]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
