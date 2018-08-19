// Functions used to support the main program functions


// Display the number of moves they user has made
function displayNumMoves(num) {
  document.querySelector(".moves__number").textContent = num;
}

// Generate a random integer between 0 and max
function getRandomInteger(max) {
  return(Math.floor(Math.random() * (max + 1)));
}

// Generate an array of n non-repeating random numbers
function generateRandomList(n) {
  const baseList = Array(n),
        list = Array(n);

  for (let i = 0; i < n; i++) {
    baseList[i] = false;
  }

  for (let j = 0; j < n; j++) {
    let random = getRandomInteger(n-1);

    // Keep generating random numbers until we find one that is unused
    while (baseList[random]) {
      random = getRandomInteger(n-1);
    }

    list[j] = random;
    baseList[random] = true;
  }

  return(list);
}

// Pause execution for a specified number of milliseconds
function pauseExecution(time) {
  const startTime = performance.now();
  let currentTime = performance.now();

  do {
    currentTime = performance.now();
  } while ((currentTime - startTime) < time);
}

// Reset the star ranking to five stars
function resetStarRanking() {
  const ranking = document.querySelector(".stars__container").classList;

  // Set class to five stars
  ranking.remove("four", "three", "two", "one", "zero");
  ranking.add("five");

  // Set all stars to filled
  document.querySelector(".star5").setAttribute("src", "img/star-filled-16.png");
  document.querySelector(".star5").setAttribute("alt", "Solid star");

  document.querySelector(".star4").setAttribute("src", "img/star-filled-16.png");
  document.querySelector(".star4").setAttribute("alt", "Solid star");

  document.querySelector(".star3").setAttribute("src", "img/star-filled-16.png");
  document.querySelector(".star3").setAttribute("alt", "Solid star");

  document.querySelector(".star2").setAttribute("src", "img/star-filled-16.png");
  document.querySelector(".star2").setAttribute("alt", "Solid star");

  document.querySelector(".star1").setAttribute("src", "img/star-filled-16.png");
  document.querySelector(".star1").setAttribute("alt", "Solid star");
}


// Remove a star from the ranking
function decrementStarRanking() {
  const currentRanking = document.querySelector(".stars__container").classList;

  if (currentRanking.contains("five")) {
    // Set star5 to unfilled
    document.querySelector(".star5").setAttribute("src", "img/star-unfilled-16.png");
    document.querySelector(".star5").setAttribute("alt", "Outline star");

    // Update class to four
    currentRanking.replace("five", "four");
  } else if (currentRanking.contains("four")) {
    // Set star4 to unfilled
    document.querySelector(".star4").setAttribute("src", "img/star-unfilled-16.png");
    document.querySelector(".star4").setAttribute("alt", "Outline star");

    // Update class to three
    currentRanking.replace("four", "three");
  } else if (currentRanking.contains("three")) {
    // Set star3 to unfilled
    document.querySelector(".star3").setAttribute("src", "img/star-unfilled-16.png");
    document.querySelector(".star3").setAttribute("alt", "Outline star");

    // Update class to two
    currentRanking.replace("three", "two");
  } else if (currentRanking.contains("two")) {
    // Set star2 to unfilled
    document.querySelector(".star2").setAttribute("src", "img/star-unfilled-16.png");
    document.querySelector(".star2").setAttribute("alt", "Outline star");

    // Update class to one
    currentRanking.replace("two", "one");
  } else if (currentRanking.contains("one")) {
    // Set star1 to unfilled
    document.querySelector(".star1").setAttribute("src", "img/star-unfilled-16.png");
    document.querySelector(".star1").setAttribute("alt", "Outline star");

    // Update class to zero
    currentRanking.replace("one", "zero");
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
    document.querySelector(".timer__number").textContent = "0" + minutes + ":0" + seconds;
  } else if (minutes < 10) {
    document.querySelector(".timer__number").textContent = "0" + minutes + ":" + seconds;
  } else if (seconds < 10) {
    document.querySelector(".timer__number").textContent = minutes + ":0" + seconds;
  } else {
    document.querySelector(".timer__number").textContent = minutes + ":" + seconds;
  }
}

// Function to generate a dated copyright notice
// Code taken from https://answers.squarespace.com/questions/58787/how-to-display-current-year-for-copyright.html -->
// TODO: in 2019, change this to be "© 2018-[CURRENT YEAR] Howard S. Stein"
function generateCopyright() {
  var date = new Date(),
      year = date.getFullYear(),
      text = "© " + year + " Howard S. Stein",
      html = document.createElement("div");

      html.textContent = text;

      document.querySelector("footer").appendChild(html);
}
