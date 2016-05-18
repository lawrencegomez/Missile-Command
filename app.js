var x = 0;
var maxFallDistance = 750 + 'px';
var time = Date.now()
var lastSpawn = -1;
var spawnRate = function() { return ((Math.random() * 3000) + 1000)};

var player1Score = 0;
var $board = $('#game-board');
var $start = $('#start');
// var $scoreboard = $('#scoreboard');
// var $playerMissile = $('.player-missile')
function randBetween(a,b) {
  return Math.floor((Math.random()*b)+a);
}
function svgEl(tagName) {
   return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}
var playerMissilesFiredArr = [];
var fallingMissilesArr = []
mouseX = 0;
mouseY = 0;
var $enemyMissile = $('#enemy-missile');
var $playerMissile = $('#player-missile');
var enemyR = 0;
// var $playerR = $explosionEl.attr('r');
var enemyCX = 0;
var enemyCY = 0;
// var $playerCX = $explosionEl.attr('cx');
// var $playerCY = $explosionEl.attr('cy');
// var dx = ($enemyCX + $playerCX);
// var dy = ($enemyCY + $playerCY);
// var distance = Math.sqrt((dx * dx) + (dy * dy));
var r = 0;




$start.on('click', function() {
  setInterval(function(){
    new JMissile();
  }, 2000)
});

function checkCollision() {
    for(var i=0; i < fallingMissilesArr.length; i ++) {
      var enemyR = fallingMissilesArr[i].attr('r')
      var enemyCY = fallingMissilesArr[i].attr('cy')
      var enemyCX = fallingMissilesArr[i].attr('cx')
      console.log(enemyR)
    }
}



$board.on('click',  function(event) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  console.log('x: ' + mouseX + ' y: ' + mouseY)
  // var explosion = "<rect width='50' height='50' stoke='white' fill='black' x='100' y='100'/>"
  var explosionEl = svgEl("circle");
  $explosionEl = $(explosionEl).attr({
    cx: mouseX,
    cy: mouseY,
    r:50,
    fill:"white",
    id: 'player-missile'
  });
  $board.append($explosionEl)
  playerMissilesFiredArr.push($explosionEl)
  // var $playerMissile = $('#player-missile')
  var $playerR = $playerMissile.attr('r');
  $explosionEl.animate({r:70},
      {
          duration: 500,
          step: function(now) { $(this).attr("r", now);
                // Loop through the fallingMissilesArr
                // for(var i = fallingMissilesArr.length; i > 0; i --) {
                //
                //       checkLocations(fallingMissilesArr[i])
                // }
                //   // for each missle, use it as the argument for checkLocations
                  // checkLocations(missle)

          },
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
function JMissile() {
  var x = randBetween(20, 1100);
  var y = 0;

  var missileEl = svgEl('circle')
  $missileEl = $(missileEl)
  $missileEl.attr({
    cx: x,
    cy: 0,
    r: 20,
    stroke: 'white',
    fill: 'black',
    id: 'enemy-missile'
  })
  $board.append($missileEl);
  fallingMissilesArr.push($missileEl);
  var $enemyR = $enemyMissile.attr('r');
  $missileEl.animate({ cy: 800 },
      {
          duration: randBetween(2000,6000),
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
