//Define the questions and answers properties with an Array
var quiz = [ 
     {
      questionText: "What is JavaScript used for?",    
     answerOptions: [
      {text: "A. It adds style to our page", correct:false},
       {text: "B. Its adds interactivity to the page.", correct:true},
       {text: "C. It adds structure to the page.",correct: false},
       {text: "D. IDK...", correct: false}
      ]
  },
  {
    questionText: "What is the best practice when placing a 'script'?",
    answerOptions: [
      {text: "A. It doesnt matter where you place it, throw it down somewhere and it'll work just fine!", correct:false},
       {text: "B. Placing the script tag at the bottom of the HTML page, just before the closing body tag, is a recommended best practice", correct:true}
      ]
  },
  {
    questionText: "A Web API is a set of rules and protocols that allow different software applications to communicate and exchange data with each other over the internet.",
    answerOptions: [
      {text: "True", correct:true}, 
      {text: "False", correct:false}
    ]
  },
  {
    questionText: "A .... is triggered when a user interacts with the keyboard, such as typing a key or pressing a button.",
    answerOptions: [
      {text: "A. eventListener", correct:false}, 
      {text: "B. Event Bubble", correct:false}, 
      {text: "C. Keyboard Event", correct:true}, 
      {text: "D. Data Event", correct:false}
    ]
  },
  {
    questionText: "Which of these selections is NOT used for Iteration?",
    answerOptions: [
      {text: "A. 'if'", correct:true}, 
      {text: "B. 'for'", correct:false}, 
      {text: "C. 'do-while'", correct:false}, 
      {text: "D. 'while'", correct:false}],
  }
];

let timeInterval;
let seconds = 75;
let minutes = Math.floor(0); 
let hours = 0;
const questionContainer = document.getElementById('question-screen')

// Starts the quiz and hides the header ID
const startTimer = () => {
  document.getElementById('quiz-intro').style.display = 'none'; // hide start button when pressed
  timerInterval = setInterval(() => {
    seconds--;
    if (seconds < 0) {
      clearInterval(timerInterval);
      document.getElementById('timer').innerText = 'Time\'s up!';
      return;
    }
    const formattedTime = formatTime(hours, minutes, seconds);
    document.getElementById('timer').innerText = formattedTime;
  }, 1000);
};

const formatTime = (hours, minutes, seconds) => {
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedMinutes}:${formattedSeconds}`;
};

document.getElementById('startButton').addEventListener('click', startTimer);
 
// Display the Quiz content
const startGame = () => {
  questionContainer.classList.remove('hide')
}
//Ends the quiz, gives the leaderboard stats, and gives an option to start over.
