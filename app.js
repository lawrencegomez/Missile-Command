var game = {x: 0,
            time: 0,
            miss: 0,
            player1Score: 0,
            player1: 'Player 1',
            player2: 'Player 2',
            mouseX: 0,
            mouseY: 0,
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
            timer: function() {
                      setInterval(function() {
                        game.time ++
                        game.$timer.text(': ' + game.time)
                      }, 1000)
                    },
            }

// This initializes an explosion at the beginning so the rest of the code works
// but it is not visible
var explosionEl = game.svgEl("circle");
$explosionEl = $(explosionEl).attr({
  cx: game.mouseX,
  cy: game.mouseY,
  r: 5,
  fill:"white",
  id: 'player-missile'
});

// set the current player to player 1
game.currentPlayer = game.player1

// function to switch turns
function switchTurns() {
  if (game.currentPlayer == game.player1) {
    game.currentPlayer = game.player2;
  } else {
    game.currentPlayer = game.player1;
  }
}

// starts the game when the start button is clicked
game.$start.on('click', function() {
  game.timer();
  console.log(game.currentPlayer)
  setInterval(function(){
    new Missile();
  }, game.randBetween(400, 1100))
});

// Function to grab the coordinates of where the mouse is clicked
// and then generate an explosion on those coordinates
game.$board.on('click',  function(event) {
  game.mouseX = event.clientX - 515;
  game.mouseY = event.clientY - 350;
  // console.log('x: ' + mouseX + ' y: ' + mouseY)
  var explosionEl = game.svgEl("circle");
  $explosionEl = $(explosionEl).attr({
    cx: game.mouseX,
    cy: game.mouseY,
    r:20,
    fill:"white",
    id: 'player-missile'
  });
  game.$board.append($explosionEl) //appends the epxlosion to the game board
//animates the explosion by enlarging the radius, using the random num generator
  $explosionEl.animate({r:game.randBetween(30,40)},
      {
          duration: 400, //duration of the animation in milliseconds
          step: function(now) { $(this).attr("r", now);},
          //when the animation is done, perform the following actions
          done: function() {
            $(this).remove()
            $(this).attr({
              cy: 0,
              cx: 1500,
            })
          }
      });
})


// constructor for a new missile
function Missile() {
  game.x = game.randBetween(20, 1100); //randomizes the x value of where the missile will fall from
  var missileEl = game.svgEl('circle')
  $missileEl = $(missileEl)
  $missileEl.attr({ //the attributes of each new missile
    cx: game.x,
    cy: -25,
    r: 5,
    stroke: 'orange',
    fill: 'red',
    id: 'enemy-missile'
  })
  game.$board.append($missileEl); //appends a new missile to the game board
  // var $enemyR = $enemyMissile.attr('r');
  $missileEl.animate({ cy: 800 }, //animate the cy value of the missile
      {
          duration: 10000,
          step: function(now) {
             $(this).attr("cy", now);
             //the below code checks for a collision by looking at the distance any missile
             //is from an explosion and then compares the radius' to see if they actually collided
             //and if they did collide, it removes that element from the board
             var dy = (Number($explosionEl.attr("cy")) - Number($(this).attr("cy")))
             var dx = (Number($explosionEl.attr("cx")) - Number($(this).attr("cx")))
             var distance = Math.sqrt((dx*dx) + (dy*dy))
             if(distance < Number($(this).attr('r')) + Number($explosionEl.attr('r'))) {
                 $(this).remove()
             }
            },
          done: function() { //when the animation is done, remove the falling missile
            $(this).remove()
        }
      });
    }


// function stopAnimation() {
//     $missileEl.stop();
//     $board.off();
//     clearInterval(timer)
//     game = null
//     $timer.text('Game Over')
//   }
