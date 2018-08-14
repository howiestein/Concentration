// Global variable declarations
let numMoves = 0;
let startTime = performance.now();
let timerFunction = 0;

// Start a new game
//     1. Shuffle cards and randomly assign them to table elements (set classes to keep track of what is where)
//     2. Reset number of moves
//     3. Reset star ranking
//     4. Reset game timer
function startGame(event) {

  // Stop the timer and reset to zero
  if (timer != 0) {
    clearInterval(timerFunction);
  }
  document.querySelector(".timer").textContent = "Elapsed time 00:00";

  // TODO Shuffle the cards and randomly assign them to table elements

  // Reset the number of moves
  numMoves = 0;
  displayNumMoves(numMoves);

  // Reset the star ranking
  resetStarRanking();

  // Reset the game timer and start it running
  startTime = performance.now();
  timerFunction = setInterval(updateTimer, 1000, startTime);

  event.preventDefault();
}

// Attach the new game function to the reset button
document.querySelector(".reset").addEventListener("click", startGame);


// When a cell is clicked, animate its display.
// If it is the first card in a pair, remove the event handler
// so it cannot be flipped again until the next turn.
// If it is the second card in a pair, check if it is a match or not, and animate.
//    Also increment the numMoves variable.
// Attached to the table to reduce the number of listeners
function clickCard(event) {
  const picture = event.target.firstChild;

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

  // Display the picture
  if (picture.hasAttribute("hidden")) {
    picture.removeAttribute("hidden");
  }

  // Update the number of moves
  numMoves++;
  displayNumMoves(numMoves);

  // Update the star ranking based on the number of moves
  if (numMoves == 9 || numMoves == 12 || numMoves == 15 || numMoves == 18 || numMoves == 21) {
    decrementStarRanking();
  }

  event.preventDefault();
}

// Attach the click event listener
document.querySelector(".grid").addEventListener("click", clickCard);


// End game--display modal to
//     1. congratulate the player
//     2. ask if they want to play again
//     3. tell how much time it took to win the game and what the star rating was


// When everything is finished loading, initialize a new game
startGame(new Event("click"));
