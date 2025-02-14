$(document).ready(function () {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
      answer: "Blue Whale",
    },
  ];

  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 600; // 10 minutes in seconds
  let timerInterval;

  // Load question
  function loadQuestion() {
    const question = questions[currentQuestion];
    $("#question").text(question.question);
    $("#options").empty();
    question.options.forEach((option, index) => {
      $("#options").append(`<li data-index="${index}">${option}</li>`);
    });
    updateProgress();
  }

  // Update progress bar
  function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    $(".progress").css("width", `${progress}%`);
  }

  // Check answer
  $("#options").on("click", "li", function () {
    const selectedOption = $(this).text();
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption === correctAnswer) {
      score++;
      $(this).css("background", "#4caf50");
    } else {
      $(this).css("background", "#ff6b6b");
    }
    setTimeout(() => {
      $(this).css("background", "rgba(255, 255, 255, 0.2)");
      nextQuestion();
    }, 500);
  });

  // Next question
  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      endQuiz();
    }
  }

  // Previous question
  $("#prev-btn").click(function () {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  });

  // Submit quiz
  $("#submit-btn").click(function () {
    endQuiz();
  });

  // End quiz
  function endQuiz() {
    clearInterval(timerInterval);
    $("#result").html(`Quiz Over! Your score is ${score}/${questions.length}`);
    $(".question-container, .navigation, .submit-btn").hide();
  }

  // Timer
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      $("#time").text(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }

  // Initialize
  loadQuestion();
  startTimer();
});