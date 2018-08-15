// Global variable declarations
let numMoves = 0,
    startTime = performance.now(),
    timerFunction = 0
    turnBeginning = true,
    firstCard = "",
    numMatches = 0;
const numCardRows = 4,
      numCardCols = 4;

// Start a new game
//     1. Shuffle cards and randomly assign them to table elements (set classes to keep track of what is where)
//     2. Reset number of moves
//     3. Reset star ranking
//     4. Reset game timer
function startGame(event) {
  const fragment = document.createDocumentFragment(),
        pairs = ["pair1", "pair1", "pair2", "pair2", "pair3", "pair3", "pair4", "pair4", "pair5", "pair5", "pair6", "pair6", "pair7", "pair7", "pair8", "pair8"],
        alts = ["Daisy", "Rose", "Rabbit", "Willet", "Heron", "Plover", "Deptford pink", "Dragonfly"],
        table = document.querySelector(".grid")
        indices = Array(16);

  // Stop the timer
  if (timerFunction != 0) {
    clearInterval(timerFunction);
  }

  // Zero out the displayed time
  document.querySelector(".timer").textContent = "Elapsed time 00:00";

  // Clear the current board. Code taken from https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
  while (table.firstChild) {
      table.removeChild(table.firstChild);
  }

  // Shuffle the cards and randomly assign them to table elements
  indices = generateRandomList(16);

  for (let row = 0; row < numCardRows; row++) {
    const newRow = document.createElement("tr");

    for (let col = 0; col < numCardCols; col++) {
      const newCell = document.createElement("td"),
            index = indices[(row * numCardRows) + col],
            imageIndex = pairs[index].substring(pairs[index].search("[1-8]"));
            imageName = "img/card" + imageIndex + ".jpg",
            newImg = document.createElement("img");

      newCell.classList.add(pairs[index]);
      newImg.setAttribute("src", imageName);
      newImg.setAttribute("alt", alts[imageIndex-1]);
      newImg.setAttribute("height", "100px");
      newImg.setAttribute("width", "100px");
      newImg.setAttribute("hidden", "");
      newCell.appendChild(newImg);
      newRow.appendChild(newCell);
    }

    fragment.appendChild(newRow);
  }

  table.appendChild(fragment);

  // Reset the number of moves
  numMoves = 0;
  displayNumMoves(numMoves);

  // Reset the star ranking
  resetStarRanking();

  // Reset global variables
  turnBeginning = true;
  firstCard = "";
  numMatches = 0;

  // Reset the game timer and start it running
  startTime = performance.now();
  timerFunction = setInterval(updateTimer, 1000, startTime);

  event.preventDefault();
}

// Attach the new game function to the reset button
document.querySelector(".reset").addEventListener("click", startGame);


// Process clicks on the cards
function clickCard(event) {
  const picture = event.target.firstChild;

  // If the target is an image (IMG), do nothing because it has already been flipped over
  if (event.target.tagName == "TD") {
    // When a face-down card is clicked, display the picture
    // TODO animate picture display
    picture.removeAttribute("hidden");

    // If this is the second card of the turn, test if it is a match or not
    if (!turnBeginning) {
      // Test if the image matches the first one turned over
      if (event.target.className == firstCard.className) {
        // TODO animate the cards for match
        numMatches++;
      } else {
        // Pause so the user can see the card
//        pauseExecution(10000);

        // TODO animate the cards for mismatch
        // Turn the cards back over
        picture.setAttribute("hidden", "");
        firstCard.firstChild.setAttribute("hidden", "");
      }

      // Update the number of moves
      numMoves++;
      displayNumMoves(numMoves);

      // Update the star ranking based on the number of moves
      if (numMoves == 9 || numMoves == 12 || numMoves == 15 || numMoves == 18 || numMoves == 21) {
        decrementStarRanking();
      }

      turnBeginning = true;
    } else {
      firstCard = event.target;
      turnBeginning = false;
    }

    // If the player has won the game, call endGame()
    if (numMatches == 8) {
      endGame(event);
    }
  }

  event.preventDefault();
}

// Attach the click event listener
document.querySelector(".grid").addEventListener("click", clickCard);


// End game--display modal to
//     1. congratulate the player
//     2. tell how much time it took to win the game and what the star rating was
//     3. ask if they want to play again
function endGame(event) {
  const timerString = document.querySelector(".timer").textContent.substring(document.querySelector(".timer").textContent.search("[0-9]")),
        currentRanking = document.querySelector(".stars").classList;
  let starRanking = 0,
      message = "",
      stars = " stars";

  // Stop the timer
  clearInterval(timerFunction);

  // Calculate star ranking
  if (currentRanking.contains("five")) {
    starRanking = 5;
  } else if (currentRanking.contains("four")) {
    starRanking = 4;
  } else if (currentRanking.contains("three")) {
    starRanking = 3;
  } else if (currentRanking.contains("two")) {
    starRanking = 2;
  } else if (currentRanking.contains("one")) {
    starRanking = 1;
    stars = " star"
  }

  message = "Congratulations!\nYou finished in " + timerString + " with a ranking of " + starRanking + stars + ".\nDo you want to play again?";

  if (window.confirm(message)) {
    startGame(event);
  }

  event.preventDefault();
}

// When everything is finished loading, initialize a new game
startGame(new Event("click"));
