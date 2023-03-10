//Define the questions and answers properties with an Array
var quiz = [
  {
    questionText: "What is JavaScript used for?",
    answerOptions: [
      { text: "A. It adds style to our page", correct: false },
      { text: "B. Its adds interactivity to the page.", correct: true },
      { text: "C. It adds structure to the page.", correct: false },
      { text: "D. IDK...", correct: false }
    ]
  },
  {
    questionText: "What is the best practice when placing a 'script'?",
    answerOptions: [
      { text: "A. It doesnt matter where you place it, throw it down somewhere and it'll work just fine!", correct: false },
      { text: "B. Placing the script tag at the bottom of the HTML page, just before the closing body tag, is a recommended best practice", correct: true }
    ]
  },
  {
    questionText: "A Web API is a set of rules and protocols that allow different software applications to communicate and exchange data with each other over the internet.",
    answerOptions: [
      { text: "True", correct: true },
      { text: "False", correct: false }
    ]
  },
  {
    questionText: "A .... is triggered when a user interacts with the keyboard, such as typing a key or pressing a button.",
    answerOptions: [
      { text: "A. eventListener", correct: false },
      { text: "B. Event Bubble", correct: false },
      { text: "C. Keyboard Event", correct: true },
      { text: "D. Data Event", correct: false }
    ]
  },
  {
    questionText: "Which of these selections is NOT used for Iteration?",
    answerOptions: [
      { text: "A. 'if'", correct: true },
      { text: "B. 'for'", correct: false },
      { text: "C. 'do-while'", correct: false },
      { text: "D. 'while'", correct: false }],
  }
];

let timeInterval;
let seconds = 75;
let minutes = Math.floor(0);
let hours = 0;
const questionContainer = document.getElementById('question-screen');
const questionEl = document.createElement('h3')
let currentQuestionIndex = 0;

// Starts the quiz and hides the header ID
const startTimer = () => {
  document.getElementById('quiz-intro').style.display = 'none';
  timerInterval = setInterval(() => {
    seconds--;
    //displays a times up message when 
    if (seconds < 0) {
      clearInterval(timerInterval);
      document.getElementById('timer').innerText = 'Time\'s up!';
      return;
    }
    const formattedTime = formatTime(hours, minutes, seconds);
    document.getElementById('timer').innerText = formattedTime;
  }, 1000);
};

const formatTime = (_hours, minutes, seconds) => {
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedMinutes}:${formattedSeconds}`;
};

// // Start the game by running the timer, removing the hide class from the question container, and showing the first question
const startGame = () => {
  startTimer();
  questionContainer.classList.remove("hide");
  showQuestion();
}

// Display the current question and answer options
const showQuestion = () => {
  // Get the current question from the quiz array
  const currentQuestion = quiz[currentQuestionIndex];
  // Display the question text
  questionEl.textContent = currentQuestion.questionText;
   // Create a list for the answer options
  const answerList = document.createElement('ul');
  // Loops through each answer option for the current question and creates a list item for the answer option and a button to select it
  for (let i = 0; i < currentQuestion.answerOptions.length; i++) {
    const answerOption = currentQuestion.answerOptions[i];
    const answerItem = document.createElement('li');
    const answerButton = document.createElement('button');
    answerButton.textContent = answerOption.text;
    // Add an event listener to the answer button
    answerButton.addEventListener('click', () => {
      // If the button hasn't already been selected, mark it as selected and either correct or incorrect
      if (!answerButton.classList.contains('selected')) {
        answerButton.classList.add('selected');
        if (answerOption.correct) {
          answerButton.classList.add('correct');
        } else {
          answerButton.classList.add('incorrect');
        }
        // After a brief delay, remove the selected/correct/incorrect classes and either move on to the next question or end the game
        setTimeout(() => {
          answerButton.classList.remove('selected');
          answerButton.classList.remove('correct');
          answerButton.classList.remove('incorrect');
          currentQuestionIndex++;
          if (currentQuestionIndex < quiz.length) {
            // If there are more questions, clear the question container and show the next question
            questionContainer.innerHTML = '';
            showQuestion();
            // If there are no more questions, end the game
          } else {
            endGame();
          }
        }, 1000);
      }
    });
    // Add the answer button to the answer list item, and the list item to the answer list
    answerItem.append(answerButton);
    answerList.append(answerItem);
  }
  // Create a div to hold the question text and answer list, and add it to the question container
  const questionDiv = document.createElement('div');
  questionDiv.append(questionEl);
  questionDiv.append(answerList);
  questionContainer.append(questionDiv);
}
const endGame = () => {
  const score = calculateScore();
  const percentage = ((score / quiz.length) * 100).toFixed(2) + '%';
  questionContainer.innerHTML = `Your score: ${score} / ${quiz.length} (${percentage})`;
  questionContainer.classList.add('hide');
}

const calculateScore = () => {
  let score = 0;
  for (let i = 0; i < quiz.length; i++) {
    if (quiz[i].answerOptions.some(answerOption => answerOption.selected && answerOption.correct)) {
      score++;
      console.log("score")
    }
  }
  return score;
}

document.getElementById('startButton').addEventListener('click', startGame);

//TODO: when the quiz ends it gives the leaderboard stats, and gives an option to start over.
