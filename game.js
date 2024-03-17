var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
// create a variable for the level where it starts at 0
var level = 0;
//check if thegame has started yet

var started = false;

//using jqueary to detect when a key has been pressed for the whole document (page) and when it happens for the first time it calls nextSequence()
$(document).keypress(function () {
  if (!started) {
    //The change the h1 title from saying "Press key to Start" to "Level 0"
    $("#level-title").text("Level " + level);

    nextSequence();
    started = true;
  }
});
//Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  //to call checkAnswer when we call a button
  //we also have a -1 to check the index of the last answer in the users sequence
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  //increasing the level by 1 every time next sequence is called.
  level++;

  //update the h1 for the change in the value of the level
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  //adding the pressed css class
  $("#" + currentColor).addClass("pressed");

  //removing the pressed class frin css again after a time
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100); //this is the delay in milliseconds
}
function checkAnswer(currentLevel) {
  //we have to check if users last answer matches the game pattern at the current level
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    // check if the user has finished sequence
    if (userClickedPattern.length == gamePattern.length) {
      // call the nextSequence() after a delay if the user got the sequence right
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // play wrong sound if the user got the sequence wrong
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    //change background to red for wrong feedback
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Change title to signal game over and prompt to restart
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Reset the game
    startOver();
  }
}

function startOver() {
  //reset game variable

  level = 0;
  gamePattern = [];
  userClickedPattern = []; // Add this line to clear the pattern
  started = false;
}
