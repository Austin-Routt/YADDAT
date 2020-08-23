const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarfull = document.getElementById("progressBarfull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let moralScore = 0;
let ethicScore = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    id: 0,
    question: 'Try to follow the rules.',
    item: 'X150',
    axis: 'Law',
    key: 1,
    AB5C: 'II+III+',
    category: 2
  },

  {
    id: 1,
    question: 'Respect authority.',
    item: 'H296',
    axis: 'Law',
    key: 1,
    AB5C: 'II+III+',
    category: 2
  },
  {
    id: 2,
    question: 'Break rules.',
    item: 'H1346',
    axis: 'Law',
    key: -1,
    AB5C: 'II+III+',
    category: 2
  },
  {
    id: 3,
    question: 'Do things by the book.',
    item: 'H250',
    axis: 'Law',
    key: 1,
    AB5C: 'III+V-',
    category: 2
  },
  {
    id: 4,
    question: 'Stick to the rules.',
    item: 'H294',
    axis: 'Law',
    key: 1,
    AB5C: 'III+II+',
    category: 2
  },
  {
    id: 5,
    question: 'Am concerned about others.',
    item: 'H1100',
    axis: 'Good',
    key: 1,
    AB5C: 'II+III-',
    category: 1
  },
  {
    id: 6,
    question: 'Sympathize with others\' feelings.',
    item: 'H1130',
    axis: 'Good',
    key: 1,
    AB5C: 'II+II+',
    category: 1
  },
  {
    id: 7,
    question: 'Am indifferent to the feelings of others.',
    item: 'X203',
    axis: 'Good',
    key: -1,
    AB5C: 'II+II+',
    category: 1
  },
  {
    id: 8,
    question: 'Feel little concern for others.',
    item: 'X244',
    axis: 'Good',
    key: -1,
    AB5C: 'II+II+',
    category: 1
  },

  {
    id: 9,
    question: 'Am not interested in other people\'s problems.',
    item: 'X227',
    axis: 'Good',
    key: -1,
    AB5C: 'II+II+',
    category: 1
  }

];


//CONSTANTS
const MAX_QUESTIONS = questions.length;

var questionIndex = 0;
var currentQuestionId = 0;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions]; /* to get a full copy*/
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentMoralScore', moralScore);
        localStorage.setItem('mostRecentEthicScore', ethicScore);
        localStorage.setItem('questions', JSON.stringify(questions));

        //go to the end page
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = "Question: " + questionCounter + "/" + MAX_QUESTIONS;
    //update the progress bar
    progressBarfull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    questionIndex = Math.floor(Math.random() * availableQuesions.length);

    currentQuestion = availableQuesions[questionIndex];
    currentQuestionId = currentQuestion.id;
    question.innerText = "I " + currentQuestion.question.toLowerCase();
    /* choices never change
        choices.forEach((choice) => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];
        });
    */
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //change answer in questions
        questions[currentQuestionId].answer = selectedAnswer;

        /*
      No wrong answers
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
     */
        incrementScore(parseInt(selectedAnswer));


        selectedChoice.parentElement.classList.add("correct");

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove("correct");
            getNewQuestion();
        }, 500);
    });
});

incrementScore = num => {
    currentCategory = currentQuestion.category;
    currentKey = currentQuestion.key;
    if (currentCategory == 1) {
        if (currentKey == 1) {
            moralScore += num;

        }
        if (currentKey == -1) {
            moralScore += (6 - num);

        }

    }
    if (currentCategory == 2) {
        if (currentKey == 1) {
            ethicScore += num;

        }
        if (currentKey == -1) {
            ethicScore += (6 - num);

        }

    }

}

startGame();