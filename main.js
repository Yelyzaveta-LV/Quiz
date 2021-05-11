//All answer option
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

//All our options
const optionElements = document.querySelectorAll('.option')

//All question
const question = document.getElementById('question'); 
const numberOfQuestion = document.getElementById('number-of-question') 
const numberOfAllQuestions = document.getElementById('number-of-all-questions') 

let indexOfQuestion, // index of question
    indexOfPage = 0; // index of pfge

// answers-tracker

const answersTracker = document.getElementById('answers-tracker'); 

// Button
const btnNext = document.getElementById('btn-next')

let score = 0; // the final result of the quiz

const  correctAnswer = document.getElementById('correct-answer'), // number of correct answers
       numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // the number of all questions in the modal window
       btnTryAgain = document.getElementById('btn-try-again') // button try again


       const questions = [
        {
            question: 'Где верно указан вывод данных?',
            options:[
                'write("Hello");',
                'console.log("Hello");',
                'documentWrite("Hello");',
                'print(Hello);'
            ],
            rightAnswer: 1
        },
        {
            question: 'Какая переменная записана неверно?',
            options:[
                'var number = 12,5;',
                'var b = false',
                'var isDone = 0;',
                'var num = "STRING";',
            ],
            rightAnswer: 0
        },
        {
            question: 'Какие значения можно хранить в переменных?',
            options:[
                'Строки, числа с точкой и простые числа',
                'Только числа и строки',
                'Строки, числа с точкой, простые числа и булевые выражения',
                'Переменнная ничего не хранит'
            ],
            rightAnswer: 2
        },
        {
            question: 'Где верно указан запуск всплывающего окна?',
            options:[
                'new alert ("Hi")',
                'Нет верных вариантов',
                'alert ("Hi")',
                'info ("Hi")'
            ],
            rightAnswer: 2
        },
        {
            question: 'В чем разница между confirm и prompt?',
            options:[
                'prompt вызывает диалоговое окно с полем для ввода, confirm - окно с подтверждением',
                'confirm вызывает диалоговое окно с полем для ввода, prompt - окно с подтверждением',
                'Они ничем не отличаются',
                'Это функции не из JS'
            ],
            rightAnswer: 0
        },
        {
            question: 'Какие циклы есть в языке JavaScript?',
            options:[
                'for, forMap, foreach, while',
                'for, while, do while, foreach',
                'for, while, do while',
                'for, forMap, foreach, while, do while'
            ],
            rightAnswer: 2
        },
        {
            question: 'Где верно указано имя переменной?',
            options:[
                'ver num;',
                'const num_1',
                'let 2num',
                'const num-1'
            ],
            rightAnswer: 1
        },
        {
            question: `Какое количество сообщений будет выведено в консоль?
            for(var i = 10; i < 35; i += 5) {
               console.log(i);
            }`,
            options:[
                '25',
                'Такой цикл работать не будет',
                '6',
                '5'
            ],
            rightAnswer: 3
        }
    
    ];


numberOfAllQuestions.innerHTML =  questions.length; // displaying the number of questions


const load = () =>{
    question.innerHTML = questions[indexOfQuestion].question 

    
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage +1; 
    indexOfPage++; 
};

let completedAnswers = []; 

const randomQuestion = () =>{
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; 

    if(indexOfPage == questions.length){
        quizOver() 
    }else{
        if(completedAnswers.length >0){
            completedAnswers.forEach(item =>{
                if(item ==randomNumber){
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate){
                randomQuestion()
            }else{
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion)
};

const checkAnswer = el =>{
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct')
        score++;
    }else{
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong')
    }
    disabledOptions();
}

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}


const disabledOptions =() =>{
    optionElements.forEach(item => {
        item.classList.add('disabled')
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct')
        }
    })
};

// removing classes from all answers
const enableOptions =() =>{
    optionElements.forEach(item =>{
        item.classList.remove('disabled', 'correct', 'wrong')
    })
};

const answerTracker = () =>{
    questions.forEach(() =>{
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage -1].classList.add(`${status}`);
}

const validate = () =>{
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа')
    }else{
        randomQuestion();
        enableOptions();
    }
};

const quizOver = () =>{
   document.querySelector('.quiz-over-modal').classList.add('active');
   correctAnswer.innerHTML = score;
   numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain)


btnNext.addEventListener('click', ()=>{
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})









