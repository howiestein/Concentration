// Process an unsuccessful match
function processMismatch(event) {
  const picture = event.target,
        cell = picture.parentElement;

  picture.removeEventListener("animationend", processMismatch);

  // Reset the cards
  picture.setAttribute("hidden", "");
  firstCard.firstChild.setAttribute("hidden", "");

  picture.parentElement.style.backgroundColor = "#888888";
  firstCard.style.backgroundColor = "#888888";

  picture.classList.remove("incorrect");
  firstCard.firstChild.classList.remove("incorrect");

  // Update the number of moves
  numMoves++;
  displayNumMoves(numMoves);

  if (numMoves == 9 || numMoves == 12 || numMoves == 15 || numMoves == 18 || numMoves == 21) {
    // Update the star ranking based on the number of moves
    decrementStarRanking();
  }

  firstCard = null;

  event.preventDefault();
}

// Process a successful match
function processSuccess(event) {
  let images = "";

  event.target.removeEventListener("animationend", processSuccess);

  // Update the number of matches
  numMatches++;

  // Update the number of moves
  numMoves++;
  displayNumMoves(numMoves);

  // If the player has won the game, call endGame()
  if (numMatches == 8) {
    // Add winning class to all images
    images = document.querySelectorAll("img");
    images.forEach(function(element) {
      element.classList.add("winning");
    });

    event.target.addEventListener("animationend", endGame);
  } else if (numMoves == 9 || numMoves == 12 || numMoves == 15 || numMoves == 18 || numMoves == 21) {
    // Update the star ranking based on the number of moves
    decrementStarRanking();
  }

  firstCard = null;

  event.preventDefault();
}

// After animating the card flip, check the second card for a match
function processSecondCard(event) {
  const picture = event.target,
        cell = picture.parentElement;

  picture.removeEventListener("animationend", processSecondCard);

  // Test if the image matches the first one turned over
  if (cell.className == firstCard.className) {
    // Animate the cards indicating a successful match and increment the number of matches
    picture.addEventListener("animationend", processSuccess);

    picture.style.position = "relative";
    firstCard.firstChild.style.position = "relative";

    cell.style.backgroundColor = "#2db300";
    firstCard.style.backgroundColor = "#2db300";

    picture.classList.add("correct");
    firstCard.firstChild.classList.add("correct");
  } else {
    // Animate the cards indicating an unsuccessful match
    picture.addEventListener("animationend", processMismatch);

    picture.parentElement.style.backgroundColor = "#e62e00";
    firstCard.style.backgroundColor = "#e62e00";

    picture.classList.add("incorrect");
    firstCard.firstChild.classList.add("incorrect");
  }

  event.preventDefault();
}

// Process clicks on the cards
//    1. Make sure this is a click on a face-down card
//    2. Check if this is a first card or second card in a pair
//    3. For a first card, save its reference and mark that the first card has been flipped
//    4. For a second card:
//       a. Check if it is a match and animate appropriately
//       b. Update the number of completed matches, number of moves, and star ranking
//       c. If all the pairs have been uncovered, end the game
function clickCard(event) {
  const cell = event.target,
        picture = cell.firstChild;

  // If the target is an image (IMG), do nothing because it has already been flipped over
  if (cell.tagName == "TD") {
    // When a face-down card is clicked, display the picture. This will trigger the animation.
    picture.removeAttribute("hidden");

    // If this is the first card, set the global variable to keep a pointer to it
    if (firstCard == null) {
      firstCard = cell;
    } else {
      // If this is the second card of the turn, attach an event handler for when the animation is done
      picture.addEventListener("animationend", processSecondCard);
    }
  }

  event.preventDefault();
}

// Attach the click event listener
document.querySelector(".grid").addEventListener("click", clickCard);
