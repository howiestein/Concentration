// Global variable declarations
let numMoves = 0;
let startTime = performance.now();

// When a cell is clicked, animate its display.
// If it is the first card in a pair, remove the event handler
// so it cannot be flipped again until the next turn.
// If it is the second card in a pair, check if it is a match or not, and animate.
//    Also increment the numMoves variable.
// Attached to the table to reduce the number of listeners
function clickCard(event) {
  // For initial testing, just toggle the cell color
  if (event.target.classList.contains("red")) {
    event.target.classList.remove("red");
    event.target.classList.add("grey");
    event.target.setAttribute("style", "background-color:grey");
  } else {
    event.target.classList.remove("grey");
    event.target.classList.add("red");
    event.target.setAttribute("style", "background-color:red");
  }

  // Update the number of moves
  numMoves++;
  document.querySelector(".moves").textContent = numMoves + " Moves";

  // Update the star ranking based on the number of moves
  if (numMoves == 9) {
    // Set src to unfilled for star5
    document.querySelector(".star5").setAttribute("src", "img/star-unfilled-32.png");
    document.querySelector(".star5").setAttribute("alt", "Outline star");
  } else if (numMoves == 12) {
    // Set src to unfilled for star4
    document.querySelector(".star4").setAttribute("src", "img/star-unfilled-32.png");
    document.querySelector(".star4").setAttribute("alt", "Outline star");
  } else if (numMoves == 15) {
    // Set src to unfilled for star3
    document.querySelector(".star3").setAttribute("src", "img/star-unfilled-32.png");
    document.querySelector(".star3").setAttribute("alt", "Outline star");
  } else if (numMoves == 18) {
    // Set src to unfilled for star2
    document.querySelector(".star2").setAttribute("src", "img/star-unfilled-32.png");
    document.querySelector(".star2").setAttribute("alt", "Outline star");
  } else if (numMoves == 21) {
    // Set src to unfilled for star1
    document.querySelector(".star1").setAttribute("src", "img/star-unfilled-32.png");
    document.querySelector(".star1").setAttribute("alt", "Outline star");
  }

  event.preventDefault();
}

// Attach the click event listener
document.querySelector(".grid").addEventListener("click", clickCard);


// When the reset button is clicked, start a new game.
function reset(event) {
  // For initial testing, just display a message
  alert("Start a new game");

  event.preventDefault();
}

// Attach the click event listener
document.querySelector(".reset").addEventListener("click", reset);


// Update the elapsed time
function updateTimer() {
  const currentTime = performance.now(),
        elapsedTime = currentTime - startTime,
        baseSeconds = elapsedTime / 1000,
        minutes = Math.trunc(baseSeconds / 60),
        seconds = Math.trunc(baseSeconds - (minutes * 60));

  if (minutes < 10 && seconds < 10) {
    document.querySelector(".timer").textContent = "Elapsed time 0" + minutes + ":0" + seconds;
  } else if (minutes < 10) {
    document.querySelector(".timer").textContent = "Elapsed time 0" + minutes + ":" + seconds;
  } else if (seconds < 10) {
    document.querySelector(".timer").textContent = "Elapsed time " + minutes + ":0" + seconds;
  } else {
    document.querySelector(".timer").textContent = "Elapsed time " + minutes + ":" + seconds;    
  }

  setTimeout(updateTimer, 1000);
}

updateTimer();

// Function to generate a dated copyright notice
// Code taken from https://answers.squarespace.com/questions/58787/how-to-display-current-year-for-copyright.html -->
// TODO: in 2019, change this to be "© 2018-[CURRENT YEAR] Howard S. Stein"

function generateCopyright() {
  var date = new Date(),
      year = date.getFullYear(),
      text = "© " + year + " Howard S. Stein",
      html = '<div class="text-align-center">' + text + '</div>';

   document.write(html);
}

// Start game--shuffle cards and randomly assign them to table elements
// reset timer and number of moves and star ranking

// End game--display modal to
//     1. congratulate the player
//     2. ask if they want to play again
//     3. tell how much time it took to win the game and what the star rating was
