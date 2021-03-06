var game = {x: 0,
            time: 0,
            miss: 0,
            player1: {
              score: 0
            },
            player2: {
              score: 0
            },
            mouseX: 0,
            mouseY: 0,
            killsObj: {},
            missesObj: {},
            msf: 0,
            score: function(el) {
              if(el.attr('id', 'enemy-missile')) {
                game.player1Score ++
                el.attr('id', 'hit')
                el.remove()
              }
            },
            $board: $('#game-board'),
            $start: $('#start'),
            $player1Scoreboard: $('#player1Scoreboard'),
            $player2Scoreboard: $('#player2Scoreboard'),
            $timer: $('#timer'),
            randBetween: function(a,b) {
                    return Math.floor((Math.random()*b)+a); //Generates a random number between a and b
                    },
            svgEl: function(tagName) {
                    return document.createElementNS("http://www.w3.org/2000/svg", tagName); //required code to use SVG elements
                    },
            $enemyMissile: $('#enemy-missile'),
            $playerMissile: $('player-missile'),
            timer: function() { //timer function that adds 1 every second to the time variable
                      setInterval(function() {
                        game.time ++
                        game.$timer.text(': ' + game.time)
                      }, 1000)
                    },
            }

var xx = function() { //uses the randBetween function to generate a random number between 20 and 70
  return game.randBetween(20,50)
}

//calibrates the position of the board for later use with the mouse coordinates
game.toLeft = game.$board.offset().left + 15;
game.toTop = game.$board.offset().top;



//function that will increase the speed of the falling missiles as the time increases
//to make the game harder and harder
function faster() {
  if (game.time < 15) {
    return game.randBetween(5000,7000)
  } else if (game.time < 25) {
    return game.randBetween(4500, 6000)
  } else if (game.time < 35) {
    return game.randBetween(3500, 5000)
  } else if (game.time < 45) {
    return game.randBetween(3000, 4500)
  } else if (game.time < 55) {
    return game.randBetween(2500, 3500)
  } else if (game.time < 65) {
    return game.randBetween(1500, 2500)
  }
}


// This initializes an explosion at the beginning so the rest of the code works
// but it is not visible and it is off the game-board
var explosionEl = game.svgEl("circle");
$explosionEl = $(explosionEl).attr({
  cx: -50,
  cy: 0,
  r: 0,
  fill:"white",
  id: 'player-missile'
});

game.$board.append($explosionEl) //appends the initial explosion to the screen


// set the current player to player 1
// the reason its player two is because when the start button is pressed it switches turns to player 1
game.currentPlayer = game.player2

// function to switch turns
function switchTurns() {
  game.killsObj = {}
  if (game.currentPlayer == game.player1) {
    game.currentPlayer = game.player2;
    game.$player2Scoreboard.addClass('scoreboard underline') //underline class underlines the text
    game.$player1Scoreboard.removeClass('underline')
  } else {
    game.currentPlayer = game.player1;
    game.$player1Scoreboard.addClass('scoreboard underline')
    game.$player2Scoreboard.removeClass('underline')
  }
}


//function to control the interval of the falling missiles
function missileInterval() {
  switchTurns()
  game.timer();
  // console.log(game.currentPlayer)
  setInterval(function(){
    new Missile();
    game.msf += 1
  }, game.randBetween(500, 1500)) //randomizes the interval to be between .5 - 1.5 seconds
}


// Calls the missileInterval function once the start button is pressed
game.$start.on('click', missileInterval)


// Function to grab the coordinates of where the mouse is clicked
// and then generate an explosion on those coordinates
game.$board.on('click',  function(event) {
  game.mouseX = event.clientX - game.toLeft; //calibrates the mouse location based off the location of the game-board
  game.mouseY = event.clientY - game.toTop;
  $explosionEl.attr({
    cx: game.mouseX,
    cy: game.mouseY,
    r: 1,
    fill:"black",
    id: 'player-missile'
  });


  // animates the player missile starting from the bottom of the screen to where ever
  // the mouse was clicked
  var flightExplosion = game.svgEl("circle");
  $flightExplosion = $(flightExplosion).attr({
    cx: (game.$board.width() / 2),
    cy: game.$board.height(),
    r: 2,
    fill:"red", //color of the circle
    id: 'player-missile'
  });
  game.$board.append($flightExplosion)
  $flightExplosion.animate({cx: game.mouseX, cy: game.mouseY}, {
    step: function(now) {
      $(this).attr("cx", now); //animates the cx and cy value
      $(this).attr("cy", now);
    },
    duration: 200,
    easing: 'linear', //makes the objects fall at a constant rate, versus is looking like it accelerates
    done: function(){
      $(this).animate({r: xx()},
        {
        duration: 300, //duration of the animation in milliseconds
        step: function(now) {
          $(this).attr("r", now);
        },
        easing: 'linear',
        //when the animation is done, perform the following actions
        done: function() {
          $explosionEl.attr('r', 60)
          $explosionEl.animate({r: xx()}, {
            duration: 100,
            step: function(now) {$(this).attr("r", now)}
          })
          $(this).remove()
        }
      })
    }
  })
})


// constructor for a new missile that will fall from the sky
function Missile() {
  game.x = game.randBetween(20, 1090); //randomizes the x value of where the missile will fall from
  var missileEl = game.svgEl('circle')
  $missileEl = $(missileEl)
  $missileEl.attr({ //the attributes of each new missile
    cx: game.x,
    cy: 0,
    r: 5,
    stroke: 'orange',
    fill: 'red',
    id: game.msf
  })
  game.$board.append($missileEl); //appends a new missile to the game board
  $missileEl.animate({ cy: 500 }, {//animate the cy value of the missile
    duration: faster(),
    easing: 'linear',
    step: function(now) {
      //the below code checks for a collision by looking at the distance any missile
      //is from an explosion and then compares the radius' to see if they actually collided
      //and if they did collide, it removes that element from the board
      $(this).attr("cy", now);
      var dy = (Number($explosionEl.attr("cy")) - Number($(this).attr("cy")))
      var dx = (Number($explosionEl.attr("cx")) - Number($(this).attr("cx")))
      var distance = Math.sqrt((dx*dx) + (dy*dy))
      if(distance < ( Number($(this).attr('r')) + Number($explosionEl.attr('r')))) {
          game.killsObj[$(this).attr('id')] = 1
          $(this).remove();
          if(game.currentPlayer == game.player1) {
            game.player1.score = Object.keys(game.killsObj).length
            game.$player1Scoreboard.text('Player 1 Score: ' + game.player1.score)
          } else {
            game.player2.score = Object.keys(game.killsObj).length
            game.$player2Scoreboard.text('Player 2 Score: ' + game.player2.score)
          }
      }
    },
    done: function() { //when the animation is done, make an explosion
      $(this).animate({r: 80,}, {
        duration: 200,
        step: function(now) {
          $(this).attr('r', now)
        },
        done: function() {
            game.missesObj[$(this).attr('id')] = 1 //add it to the misses object
            $(this).remove()
        }
      })
    }
  });
}


// Function to stop everything! Doesn't actually work, yet :-(
// function stopAnimation() {
//     game.time = 0
//     $missileEl.pause();
//     // $missileEl.finish()
//     // $missileEl.addClass('no-display')
//     // $explosionEl.addClass('no-display')
//     // $missileEl.stop();
//     game.$board.children().remove()
//     // game.$board.off();
//     // window.clearInterval(missileInterval)
//     // clearInterval(timer)
//     game.$timer.text('Game Over')
//     switchTurns();
// }
