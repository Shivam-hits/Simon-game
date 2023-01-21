var randomNumber,name,currentColour,currentLevel;
var buttonColours =["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern=[];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    
    level++; 
    $("#level_title").text("Level " + level);

    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  // to animate flash for button  
    playSound(randomChosenColour); 
}


$(".btn").click(function handler(){
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);


    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
        }
    }else{
        console.log("wromg");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level_title").text("Game Over, Press Any Key to Restart ");
        startOver();
    }

}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3"); // to play sound for button
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function (){
    if (!started) {
        $("#level_title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
  }
  