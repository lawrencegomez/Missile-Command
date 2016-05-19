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
                    return Math.floor((Math.random()*b)+a);
                    },
            svgEl: function(tagName) {
                    return document.createElementNS("http://www.w3.org/2000/svg", tagName);
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

// var x = 0;
// var time = 0;
// var miss = 0;
// var game = true;
// var player1Score = 0;
// var $board = $('#game-board');
// var $start = $('#start');
// var $player1Scoreboard = $('#player1Scoreboard');
// var $palyer2Scoreboard = $('#player2Scoreboard');
// var $timer = $('#timer')
// var player1 = 'player1'
// var player2 = 'player2'

// function randBetween(a,b) {
//   return Math.floor((Math.random()*b)+a);
// }
// function svgEl(tagName) {
//    return document.createElementNS("http://www.w3.org/2000/svg", tagName);
// }
// mouseX = 0;
// mouseY = 0;
// var $enemyMissile = $('#enemy-missile');
// var $playerMissile = $('#player-missile');

// This initializes an explosion at the beginning so the rest of the code works
var explosionEl = game.svgEl("circle");
$explosionEl = $(explosionEl).attr({
  cx: game.mouseX,
  cy: game.mouseY,
  r: 5,
  fill:"white",
  id: 'player-missile'
});

game.currentPlayer = game.player1

function switchTurns() {
  if (game.currentPlayer == game.player1) {
    game.currentPlayer = game.player2;
  } else {
    game.currentPlayer = game.player1;
  }
}

game.$start.on('click', function() {
  game.timer();
  console.log(game.currentPlayer)
  setInterval(function(){
    new Missile();
  }, game.randBetween(400, 1100))
});


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
  game.$board.append($explosionEl)
  // var $playerR = $playerMissile.attr('r');
  $explosionEl.animate({r:game.randBetween(30,40)},
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
  game.x = game.randBetween(20, 1100);
  var missileEl = game.svgEl('circle')
  $missileEl = $(missileEl)
  $missileEl.attr({
    cx: game.x,
    cy: -25,
    r: 5,
    stroke: 'orange',
    fill: 'red',
    id: 'enemy-missile'
  })
  game.$board.append($missileEl);
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

// function timer() {
//   setInterval(function() {
//     time ++
//     $timer.text(': ' + time)
//   }, 1000)
// }

// function stopAnimation() {
//     $missileEl.stop();
//     $board.off();
//     clearInterval(timer)
//     game = null
//     $timer.text('Game Over')
//   }
