let remaining = [];
let asked = [];

const questionEl = document.getElementById("question");
const askedListEl = document.getElementById("askedList");
const nextBtn = document.getElementById("nextBtn");

// Load questions from external JSON file
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    remaining = [...data];
  })
  .catch((error) => {
    console.error("Error loading questions:", error);
    questionEl.textContent = "❌ Failed to load questions.";
    nextBtn.disabled = true;
  });

function showNextQuestion() {
  if (remaining.length === 0) {
    questionEl.textContent = "🎉 No more questions!";
    nextBtn.disabled = true;
    return;
  }

  // Pick a random question
  const randomIndex = Math.floor(Math.random() * remaining.length);
  const q = remaining[randomIndex];

  // Show current question
  questionEl.textContent = q;

  // Move to asked list
  asked.push(q);
  remaining.splice(randomIndex, 1);

  // Update asked questions display
  askedListEl.innerHTML = "";
  asked.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    askedListEl.appendChild(li);
  });
}

nextBtn.addEventListener("click", showNextQuestion);
