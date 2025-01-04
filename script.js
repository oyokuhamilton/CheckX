const fill = document.querySelector(".fill");
const divs = document.querySelectorAll(".empty");
const errMsg = document.querySelector(".error-msg");
const errDiv = document.querySelector(".error-container-msg");

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Alert message function
function message(msg, type) {
  if (type === "success") {
    errDiv.style.display = "block";
    errDiv.style.backgroundColor = "#1f8ebc";
    errMsg.innerHTML = msg;
    setTimeout(() => {
      errDiv.style.display = "none";
    }, 5000);
  } else if (type === "error") {
    errDiv.style.display = "block";
    errDiv.style.backgroundColor = "#d60b0b";
    errMsg.innerHTML = msg;
    setTimeout(() => {
      errDiv.style.display = "none";
    }, 5000);
  } else {
    console.log("Error");
  }
}

// Assign random numbers to divs and store the winning number
const numbers = [1, 2, 3, 4];
shuffleArray(numbers); // Shuffle the numbers array
const winningNumber = numbers[Math.floor(Math.random() * numbers.length)];
let attempts = 0;

message(`You are to find the div with the winning number ${winningNumber}`, "success");

divs.forEach((div, index) => {
  div.dataset.number = numbers[index]; // Attach shuffled numbers to divs
});

fill.addEventListener("dragstart", dragStart);
fill.addEventListener("dragend", dragEnd);

divs.forEach((div) => {
  div.addEventListener("dragover", dragOver);
  div.addEventListener("drop", dragDrop);
});

function dragStart() {
  setTimeout(() => {
    fill.className = "invisible";
  }, 0);
}

function dragEnd() {
  fill.className = "fill";
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  if (!this.contains(fill)) {
    this.append(fill); // Move the fill element
    attempts++; // Increment attempts

    const selectedNumber = parseInt(this.dataset.number, 10);

    if (selectedNumber === winningNumber) {
      message(`You've won! The winning div number is ${winningNumber}`, "success");
      window.location.reload();
    } else if (attempts === 2) {
      message(`You lost! The correct number was ${winningNumber}`, "error");
      window.location.reload();
    } else {
      const attemptsLeft = 2 - attempts;
      message(`Please try again, you have ${attemptsLeft} attempt left`, "error");
    }
  }
}
