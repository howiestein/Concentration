// Functions used to support the main program functions


// Display the number of moves they user has made
function displayNumMoves(num) {
  document.querySelector(".moves").textContent = num + " Moves";
}


// Reset the star ranking to five stars
function resetStarRanking() {
  const ranking = document.querySelector(".stars").classList;

  // Set class to five stars
  ranking.remove("four", "three", "two", "one", "zero");
  ranking.add("five");

  // Set all stars to filled
  document.querySelector(".star5").setAttribute("src", "img/star-filled-32.png");
  document.querySelector(".star5").setAttribute("alt", "Solid star");

  document.querySelector(".star4").setAttribute("src", "img/star-filled-32.png");
  document.querySelector(".star4").setAttribute("alt", "Solid star");

  document.querySelector(".star3").setAttribute("src", "img/star-filled-32.png");
  document.querySelector(".star3").setAttribute("alt", "Solid star");

  document.querySelector(".star2").setAttribute("src", "img/star-filled-32.png");
  document.querySelector(".star2").setAttribute("alt", "Solid star");

  document.querySelector(".star1").setAttribute("src", "img/star-filled-32.png");
  document.querySelector(".star1").setAttribute("alt", "Solid star");
}


// Remove a star from the ranking
function decrementStarRanking() {
  const currentRanking = document.querySelector(".stars").classList;

  if (currentRanking.contains("five")) {
    // Set star5 to unfilled
    document.querySelector(".star5").setAttribute("src", "img/star-unfilled-32.png");
    document.querySelector(".star5").setAttribute("alt", "Outline star");

    // Update class to four
    currentRanking.remove("five");
    currentRanking.add("four");
  } else if (currentRanking.contains("four")) {
    // Set star4 to unfilled
    document.querySelector(".star4").setAttribute("src", "img/star-unfilled-32.png");
    document.querySelector(".star4").setAttribute("alt", "Outline star");

    // Update class to three
    currentRanking.remove("four");
    currentRanking.add("three");
  } else if (currentRanking.contains("three")) {
    // Set star3 to unfilled
    document.querySelector(".star3").setAttribute("src", "img/star-unfilled-32.png");
    document.querySelector(".star3").setAttribute("alt", "Outline star");

    // Update class to two
    currentRanking.remove("three");
    currentRanking.add("two");
  } else if (currentRanking.contains("two")) {
    // Set star2 to unfilled
    document.querySelector(".star2").setAttribute("src", "img/star-unfilled-32.png");
    document.querySelector(".star2").setAttribute("alt", "Outline star");

    // Update class to one
    currentRanking.remove("two");
    currentRanking.add("one");
  } else if (currentRanking.contains("one")) {
    // Set star1 to unfilled
    document.querySelector(".star1").setAttribute("src", "img/star-unfilled-32.png");
    document.querySelector(".star1").setAttribute("alt", "Outline star");

    // Update class to zero
    currentRanking.remove("one");
    currentRanking.add("zero");
  }
}

// Update and display the elapsed time
function updateTimer(start) {
  const currentTime = performance.now(),
        elapsedTime = currentTime - start,
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
}


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
