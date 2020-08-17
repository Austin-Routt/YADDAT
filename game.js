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
      question: 'Act at the expense of others.',
      item: 'H794',
      axis: 'Good',
      key: -1,
      AB5C: 'II+III+',
      category: 1
    },
    {
      id: 1,
      question: 'Would never cheat on my taxes.',
      item: 'X136',
      axis: 'Law',
      key: 1,
      AB5C: 'II+III+',
      category: 2
    },
    {
      id: 2,
      question: 'Try to follow the rules.',
      item: 'X150',
      axis: 'Law',
      key: 1,
      AB5C: 'II+III+',
      category: 2
    },
    {
      id: 3,
      question: 'Respect authority.',
      item: 'H296',
      axis: 'Law',
      key: 1,
      AB5C: 'II+III+',
      category: 2
    },
    {
      id: 4,
      question: 'Don\'t care about rules.',
      item: 'H575',
      axis: 'Law',
      key: -1,
      AB5C: 'II+III+',
      category: 2
    },
    {
      id: 5,
      question: 'Scheme against others.',
      item: 'H1328',
      axis: 'Good',
      key: -1,
      AB5C: 'II+III+',
      category: 1
    },
    {
      id: 6,
      question: 'Break rules.',
      item: 'H1346',
      axis: 'Law',
      key: -1,
      AB5C: 'II+III+',
      category: 2
    },
    {
      id: 7,
      question: 'Am concerned about others.',
      item: 'H1100',
      axis: 'Good',
      key: 1,
      AB5C: 'II+III-',
      category: 1
    },
    {
      id: 8,
      question: 'Am deeply moved by others\' misfortunes.',
      item: 'X253',
      axis: 'Good',
      key: 1,
      AB5C: 'II+III-',
      category: 1
    },
    {
      id: 9,
      question: 'Make enemies.',
      item: 'H714',
      axis: 'Good',
      key: -1,
      AB5C: 'II+V-',
      category: 1
    },
    {
      id: 10,
      question: 'Oppose authority.',
      item: 'H498',
      axis: 'Law',
      key: -1,
      AB5C: 'II+V-',
      category: 2
    },
    {
      id: 11,
      question: 'Don\'t think laws apply to me.',
      item: 'H579',
      axis: 'Law',
      key: -1,
      AB5C: 'III+II+',
      category: 2
    },
    {
      id: 12,
      question: 'Like to act on a whim.',
      item: 'E122',
      axis: 'Law',
      key: -1,
      AB5C: 'III+I-',
      category: 2
    },
    {
      id: 13,
      question: 'Like order.',
      item: 'X118',
      axis: 'Law',
      key: 1,
      AB5C: 'III+V-',
      category: 2
    },
    {
      id: 14,
      question: 'Love order and regularity.',
      item: 'H309',
      axis: 'Law',
      key: 1,
      AB5C: 'IV+III-',
      category: 2
    },
    {
      id: 15,
      question: 'Make friends easily.',
      item: 'H29',
      axis: 'Good',
      key: 1,
      AB5C: 'I+II+',
      category: 1
    },
    {
      id: 16,
      question: 'See that rules are observed.',
      item: 'H215',
      axis: 'Law',
      key: 1,
      AB5C: 'III+V-',
      category: 2
    },
    {
      id: 17,
      question: 'Sympathize with others\' feelings.',
      item: 'H1130',
      axis: 'Good',
      key: 1,
      AB5C: 'II+II+',
      category: 1
    },
    {
      id: 18,
      question: 'Sympathize with the homeless.',
      item: 'X259',
      axis: 'Good',
      key: 1,
      AB5C: 'III+II-',
      category: 1
    },
    {
      id: 19,
      question: 'Take others\' interests into account.',
      item: 'H183',
      axis: 'Good',
      key: 1,
      AB5C: 'II+II+',
      category: 1
    },
    {
      id: 20,
      question: 'Will do anything for others.',
      item: 'H198',
      axis: 'Good',
      key: 1,
      AB5C: 'II+V-',
      category: 1
    },
    {
      id: 21,
      question: 'Am guided by my moods.',
      item: 'H941',
      axis: 'Law',
      key: -1,
      AB5C: 'IV+III+',
      category: 2
    },
    {
      id: 22,
      question: 'Do things by the book.',
      item: 'H250',
      axis: 'Law',
      key: 1,
      AB5C: 'III+V-',
      category: 2
    },
    {
      id: 23,
      question: 'Feel sympathy for those who are worse off than myself.',
      item: 'E115',
      axis: 'Good',
      key: 1,
      AB5C: 'II+III-',
      category: 1
    },
    {
      id: 24,
      question: 'Know how to get around the rules.',
      item: 'H1327',
      axis: 'Law',
      key: -1,
      AB5C: 'I+II-',
      category: 2
    },
    {
      id: 25,
      question: 'Go my own way.',
      item: 'H400',
      axis: 'Law',
      key: -1,
      AB5C: 'I+V-',
      category: 2
    },
    {
      id: 26,
      question: 'Respect authority.',
      item: 'H296',
      axis: 'Law',
      key: 1,
      AB5C: 'II+III+',
      category: 2
    },
    {
      id: 27,
      question: 'Believe people should fend for themselves.',
      item: 'X70',
      axis: 'Good',
      key: -1,
      AB5C: 'II+III-',
      category: 1
    },
    {
      id: 28,
      question: 'Think of others first.',
      item: 'H126',
      axis: 'Good',
      key: 1,
      AB5C: 'II+V-',
      category: 1
    },
    {
      id: 29,
      question: 'Am indifferent to the feelings of others.',
      item: 'X203',
      axis: 'Good',
      key: -1,
      AB5C: 'II+II+',
      category: 1
    },
    {
      id: 30,
      question: 'Am not bothered by disorder.',
      item: 'E7',
      axis: 'Law',
      key: -1,
      AB5C: 'III+IV-',
      category: 2
    },
    {
      id: 31,
      question: 'Am swayed by my emotions.',
      item: 'E146',
      axis: 'Law',
      key: -1,
      AB5C: 'IV+V-',
      category: 2
    },
    {
      id: 32,
      question: 'Easily resist temptations.',
      item: 'X274',
      axis: 'Law',
      key: 1,
      AB5C: 'IV+III+',
      category: 2
    },
    {
      id: 33,
      question: 'Feel little concern for others.',
      item: 'X244',
      axis: 'Good',
      key: -1,
      AB5C: 'II+II+',
      category: 1
    },
    {
      id: 34,
      question: 'Find it hard to forgive others.',
      item: 'X210',
      axis: 'Good',
      key: -1,
      AB5C: 'II+IV+',
      category: 1
    },
    {
      id: 35,
      question: 'Follow through on my commitments.',
      item: 'X146',
      axis: 'Law',
      key: 1,
      AB5C: 'III+V+',
      category: 2
    },
    {
      id: 36,
      question: 'Get out of control.',
      item: 'H925',
      axis: 'Law',
      key: -1,
      AB5C: 'IV+III+',
      category: 2
    },
    {
      id: 37,
      question: 'Love life.',
      item: 'H33',
      axis: 'Good',
      key: 1,
      AB5C: 'I+IV+',
      category: 1
    },
    {
      id: 38,
      question: 'Prefer to deal with strangers in a formal manner.',
      item: 'X77',
      axis: 'Law',
      key: 1,
      AB5C: 'I+III-',
      category: 2
    },
    {
      id: 39,
      question: 'Prefer variety to routine.',
      item: 'X204',
      axis: 'Law',
      key: -1,
      AB5C: 'V+III-',
      category: 2
    },
    {
      id: 40,
      question: 'Pretend to be concerned for others.',
      item: 'X113',
      axis: 'Good',
      key: -1,
      AB5C: 'II+V+',
      category: 1
    },
    {
      id: 41,
      question: 'Respect others\' feelings.',
      item: 'H159',
      axis: 'Good',
      key: 1,
      AB5C: 'II+II+',
      category: 1
    },
    {
      id: 42,
      question: 'Respect others.',
      item: 'H105',
      axis: 'Good',
      key: 1,
      AB5C: 'II+IV+',
      category: 1
    },
    {
      id: 43,
      question: 'Shirk my duties.',
      item: 'H1140',
      axis: 'Law',
      key: -1,
      AB5C: 'III+IV+',
      category: 2
    },
    {
      id: 44,
      question: 'Stick to the rules.',
      item: 'H294',
      axis: 'Law',
      key: 1,
      AB5C: 'III+II+',
      category: 2
    },
    {
      id: 45,
      question: 'Treat people as inferiors.',
      item: 'H792',
      axis: 'Good',
      key: -1,
      AB5C: 'II+V+',
      category: 1
    },
    {
      id: 46,
      question: 'Try not to think about the needy.',
      item: 'E166',
      axis: 'Good',
      key: -1,
      AB5C: 'II+III-',
      category: 1
    },
    {
      id: 47,
      question: 'Wait for my turn.',
      item: 'H170',
      axis: 'Law',
      key: 1,
      AB5C: 'I+II-',
      category: 2
    },
    {
      id: 48,
      question: 'Have a good word for everyone.',
      item: 'H22',
      axis: 'Good',
      key: 1,
      AB5C: 'II+IV+',
      category: 1
    },
    {
      id: 49,
      question: 'Have a soft heart.',
      item: 'X177',
      axis: 'Good',
      key: 1,
      AB5C: 'II+V-',
      category: 1
    },
    {
      id: 50,
      question: 'Listen to my conscience.',
      item: 'H153',
      axis: 'Good',
      key: 1,
      AB5C: 'II+I-',
      category: 1
    },
    {
      id: 51,
      question: 'Look down on any weakness.',
      item: 'H435',
      axis: 'Good',
      key: -1,
      AB5C: 'II+III-',
      category: 1
    },
    {
      id: 52,
      question: 'Tend to dislike soft-hearted people.',
      item: 'E121',
      axis: 'Good',
      key: -1,
      AB5C: 'II+III-',
      category: 1
    },
    {
      id: 53,
      question: 'Tend to dislike impulsive people.',
      item: 'E52',
      axis: 'Law',
      key: 1,
      AB5C: 'III+I-',
      category: 2
    },
    {
      id: 54,
      question: 'Play tricks on others.',
      item: 'H98',
      axis: 'Good',
      key: -1,
      AB5C: 'II+I-',
      category: 1
    },
    {
      id: 55,
      question: 'Like to do things for others.',
      item: 'H109',
      axis: 'Good',
      key: 1,
      AB5C: 'II+III-',
      category: 1
    },
    {
      id: 56,
      question: 'Make plans and stick to them.',
      item: 'X263',
      axis: 'Law',
      key: 1,
      AB5C: 'III+I+',
      category: 2
    },
    {
      id: 57,
      question: 'Enjoy being reckless.',
      item: 'E35',
      axis: 'Law',
      key: -1,
      AB5C: 'II+I-',
      category: 2
    },
    {
      id: 58,
      question: 'Disregard rules.',
      item: 'H88',
      axis: 'Law',
      key: -1,
      AB5C: 'III+II+',
      category: 2
    },
    {
      id: 59,
      question: 'Impose my will on others.',
      item: 'H721',
      axis: 'Good',
      key: -1,
      AB5C: 'II+I-',
      category: 1
    },
    {
      id: 60,
      question: 'Do things according to a plan.',
      item: 'H1351',
      axis: 'Law',
      key: 1,
      AB5C: 'III+III+',
      category: 2
    },
    {
      id: 61,
      question: 'Believe in an eye for an eye.',
      item: 'X173',
      axis: 'Law',
      key: 1,
      AB5C: 'III+II-',
      category: 2
    },
    {
      id: 62,
      question: 'Do crazy things.',
      item: 'H870',
      axis: 'Law',
      key: -1,
      AB5C: 'III+I-',
      category: 2
    },
    {
      id: 63,
      question: 'Jump into things without thinking.',
      item: 'E46',
      axis: 'Law',
      key: -1,
      AB5C: 'III+I-',
      category: 2
    },
    {
      id: 64,
      question: 'Do things in a logical order.',
      item: 'H1350',
      axis: 'Law',
      key: 1,
      AB5C: 'III+II-',
      category: 2
    },
    {
      id: 65,
      question: 'Want things to proceed according to plan.',
      item: 'H303',
      axis: 'Law',
      key: 1,
      AB5C: 'III+IV-',
      category: 2
    },
    {
      id: 66,
      question: 'Dislike routine.',
      item: 'X122',
      axis: 'Law',
      key: -1,
      AB5C: 'III+V-',
      category: 2
    },
    {
      id: 67,
      question: 'Change my mood a lot.',
      item: 'H926',
      axis: 'Law',
      key: -1,
      AB5C: 'IV+IV+',
      category: 2
    },
    {
      id: 68,
      question: 'Am not interested in other people\'s problems.',
      item: 'X227',
      axis: 'Good',
      key: -1,
      AB5C: 'II+II+',
      category: 1
    },
    {
      id: 69,
      question: 'Don\'t fall for sob-stories.',
      item: 'X185',
      axis: 'Good',
      key: -1,
      AB5C: 'II+III-',
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
        return window.location.assign('/end.html');
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