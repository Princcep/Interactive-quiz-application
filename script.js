// List of quiz questions and their options
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true }, // correct
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true }, // correct
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true }, // correct
      { text: "J.K. Rowling", correct: false },
      { text: "George Orwell", correct: false },
    ],
  }
];

// Grabbing elements from the DOM
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const scoreValue = document.getElementById("score-value");

let currentQuestionIndex = 0; // Track current question
let score = 0; // Track score

// Start or restart the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.classList.add("hidden"); // Hide score initially
  nextButton.innerText = "Next";
  showQuestion();
}

// in this function we Display a question and its answers
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  //in this I Dynamically create answer buttons
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

// we Clear previous answers and feedback
function resetState() {
  nextButton.style.display = "none";
  feedbackElement.innerText = "";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

//this function Handle when an answer is selected
function selectAnswer(button, correct) {
  // Disable all answer buttons after selection
  Array.from(answerButtons.children).forEach(btn => btn.disabled = true);

  // I Add color class to the selected answer
  if (correct) {
    button.classList.add("correct");
    feedbackElement.innerText = "Correct!";
    score++;
  } else {
    button.classList.add("wrong");
    feedbackElement.innerText = "Oops! Wrong Answer.";
  }

  // it Show the next button
  nextButton.style.display = "inline-block";
}

// Handle click on the next button
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(); // Show next question
  } else {
    showScore(); // Quiz end
  }
});

// Show final score and reset option
function showScore() {
  resetState();
  questionElement.innerText = "Quiz Completed!";
  scoreElement.classList.remove("hidden");
  scoreValue.innerText = `${score} / ${questions.length}`;
  nextButton.innerText = "Restart";
  nextButton.style.display = "inline-block";
  nextButton.onclick = startQuiz;
}

// Begin the quiz on page load
startQuiz();
