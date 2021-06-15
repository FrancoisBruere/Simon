var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var isStarted = false;
var highScore = 0;

$(document).keypress(function() {
  if (!isStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    isStarted = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatedPress(userChosenColour)
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    if (level > highScore) {
      highScore = level;
      setTimeout(function() {
        $("h1").text("Game Over, Press Any Key to Restart");
      }, 3000);
      $("h1").text("New high score " + highScore);
    } else if (level < highScore) {
      setTimeout(function() {
        $("h1").text("Game Over, Press Any Key to Restart");
      }, 3000);
      $("h1").text("Failed to beat high score " + highScore);
    }
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  isStarted = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatedPress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
