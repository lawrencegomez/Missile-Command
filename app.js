var x = 0;
var time = 0;
var miss = 0;
var game = true;
var player1Score = 0;
var $board = $('#game-board');
var $start = $('#start');
var $player1Scoreboard = $('#player1Scoreboard');
var $palyer2Scoreboard = $('#player2Scoreboard');
var $timer = $('#timer')
var player1 = 'player1'
var player2 = 'player2'

function randBetween(a,b) {
  return Math.floor((Math.random()*b)+a);
}
function svgEl(tagName) {
   return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}
mouseX = 0;
mouseY = 0;
var $enemyMissile = $('#enemy-missile');
var $playerMissile = $('#player-missile');

// This initializes an explosion at the beginning so the rest of the code works
var explosionEl = svgEl("circle");
$explosionEl = $(explosionEl).attr({
  cx: mouseX,
  cy: mouseY,
  r: 5,
  fill:"white",
  id: 'player-missile'
});

var currentPlayer = player1

function switchTurns() {
  if (currentPlayer == player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}

$start.on('click', function() {
  timer();
  console.log(currentPlayer)
  setInterval(function(){
    new Missile();
  }, randBetween(400, 1100))
});


$board.on('click',  function(event) {
  var mouseX = event.clientX - 515;
  var mouseY = event.clientY - 350;
  // console.log('x: ' + mouseX + ' y: ' + mouseY)
  var explosionEl = svgEl("circle");
  $explosionEl = $(explosionEl).attr({
    cx: mouseX,
    cy: mouseY,
    r:20,
    fill:"white",
    id: 'player-missile'
  });
  $board.append($explosionEl)
  // var $playerR = $playerMissile.attr('r');
  $explosionEl.animate({r:randBetween(30,40)},
      {
          duration: 400,
          step: function(now) { $(this).attr("r", now);},
          done: function() {
            $(this).remove()
            // destroyed = false
            $(this).attr({
              cy: 0,
              cx: 1500,
            })
          }
      });
})


// constructor for a new missile
function Missile() {
  var x = randBetween(20, 1100);
  var missileEl = svgEl('circle')
  $missileEl = $(missileEl)
  $missileEl.attr({
    cx: x,
    cy: -25,
    r: 5,
    stroke: 'orange',
    fill: 'red',
    id: 'enemy-missile'
  })
  $board.append($missileEl);
  // var $enemyR = $enemyMissile.attr('r');
  $missileEl.animate({ cy: 800 },
      {
          duration: 10000,
          step: function(now) {
             $(this).attr("cy", now);
             var dy = (Number($explosionEl.attr("cy")) - Number($(this).attr("cy")))
             var dx = (Number($explosionEl.attr("cx")) - Number($(this).attr("cx")))
             var distance = Math.sqrt((dx*dx) + (dy*dy))
             if(distance < Number($(this).attr('r')) + Number($explosionEl.attr('r'))) {
                 $(this).remove()
             }
            },
          done: function() {
            $(this).remove()
        }
      });
    }

function timer() {
  setInterval(function() {
    time ++
    $timer.text(': ' + time)
  }, 1000)
}

// function stopAnimation() {
//     $missileEl.stop();
//     $board.off();
//     clearInterval(timer)
//     game = null
//     $timer.text('Game Over')
//   }
