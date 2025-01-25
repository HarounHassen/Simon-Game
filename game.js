const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

let start = false;
let level = 0;

$(document).keydown( function(){ 
     if (!start){
          $('#level-title').text( "Level " +level);
          nextSequence();
          start = true;
     }
})

function nextSequence(){
     userClickedPattern = [];
     level++;
     $('#level-title').text( "Level " +level);

     let randomNumber = Math.floor(Math.random() * 4);
     let randomChosenColour = buttonColours[randomNumber];
     gamePattern.push(randomChosenColour);

     $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
     playSound(randomChosenColour);     
}

function playSound(soundName){
     var audio = new Audio("sounds/" + soundName + ".mp3");
     audio.play();
}

$(".btn").click(function(){
     var userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour);
     playSound(userChosenColour);
     animatePress(userChosenColour);

     checkAnswer(userClickedPattern.length - 1);
})

function animatePress(currentColor){
     $('#' + currentColor).click(function(){
          $('#' + currentColor).addClass("pressed");
          setTimeout(function(){
               $('#' + currentColor).removeClass("pressed");} , 100);
     })
}


function checkAnswer(currentLevel){

     if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

          console.log("success");
          if (userClickedPattern.length == gamePattern.length){
               setTimeout(nextSequence , 1000);
          }
          
     }else{
          console.log("Wrong");
          playSound("wrong");
          $("body").addClass("game-over");

          setTimeout( function(){
               $("body").removeClass("game-over");
          }, 200);
          $('#level-title').text( "Game Over, Press Any Key to Restart");
          startOver();
     }
}

function startOver(){
     level = 0 ;
     gamePattern = [];
     start = false;
}
