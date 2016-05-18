var x = 0;
var maxFallDistance = 750 + 'px';
var time = Date.now()
var lastSpawn = -1;
var spawnRate1 = function() { return ((Math.random() * 3000) + 1000)}
var spawnRate2 = function() { return ((Math.random() * 2000) + 800)}
var spawnRate3 = function() { return ((Math.random() * 1500) + 600)}
var spawnRate4 = function() { return ((Math.random() * 1000) + 500)}
var spawnRate5 = function() { return ((Math.random() * 700) + 300)}
var spawnRate6 = function() { return ((Math.random() * 450) + 200)}
var spawnRate7 = function() { return ((Math.random() * 300) + 50)}
var player1Score = 0;
var $container = $('#container')
var $board = $('#game-board');
var $start = $('#start');
var $scoreboard = $('#scoreboard');
var $playerMissile = $('.player-missile')
var fallRate = function() {
                return Math.floor((Math.random()*50)+10);
               }
var xp = 0;
var yp = 0;
mouseX = 0;
mouseY = 0;


$(document).on('mousedown', '#container', function(event) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  console.log('x: ' + mouseX + ' y: ' + mouseY)
  // animate();
})

// function animate() {
//   xp += (mouseX - xp)/15;
//   yp += (mouseY - yp)/15;
//   Missile.style.left = xp + 'px';
//   Missile.style.top= yp + 'px';
//   setTimeout(animate,10);
// }

function simulateClick() {
  var event = new MouseEvent('click', {});
  var start = document.querySelector('#start')
  start.dispatchEvent(event);
    if(player1Score < 15) {
      setTimeout(simulateClick, spawnRate1())
    }
    else if (player1Score < 30) {
      setTimeout(simulateClick, spawnRate2())
    }
    else if (player1Score < 45) {
      setTimeout(simulateClick, spawnRate3())
    }
    else if (player1Score < 60) {
      setTimeout(simulateClick, spawnRate4())
    }
    else if (player1Score < 75) {
      setTimeout(simulateClick, spawnRate5())
    }
    else if (player1Score < 90) {
      setTimeout(simulateClick, spawnRate6())
    }
    else if (player1Score < 120) {
      setTimeout(simulateClick, spawnRate7())
    }
}

setTimeout(simulateClick, 100)



// constructor for a new missile
function Missile() {
  var x = Math.floor(Math.random() * 1150);
  var y = 0;
  // this is a string of the SVG element that will be used to create the new missile element
  var missileString = "<svg class = 'enemy-missile' width='50' height='200' style='margin-left: "+ x + "px'><rect width='50' height='50' stoke='white' fill='black' x='0' y='0'/><rect id='target' width='50' height='50' stoke='white' fill='blue' x='0' y='70'/></svg>"
  $board.append(missileString);
  this.$selector = $('.enemy-missile').last()
  var $selector = this.$selector
  var $target = this.$selector.children('#target')
  $target.on('mousedown', function() {
    $(this).parent().remove();
    player1Score += 1
    $scoreboard.text(player1Score)
  })

  this.movement = setInterval(function() {
    y += 2
    $selector.css('margin-top', y + 'px')
    var n = $selector.css('margin-top')
  }, fallRate())
}

//constructor for player missiles
function GoodMissile () {
  var missileString = "<svg class = 'player-missile' width='50' height='50' style='margin-left: 600px; margin-top: 750px'><rect width='50' height='50' stoke='white' fill='black' x='0' y='0'/>"
  $board.append(missileString)
}





$start.on('click', function() {
  new Missile
})

new GoodMissile













// function dropMissile () {
//   $('.enemy-missile').attr('style', 'margin-top: ' + x + 'px;')
//     x += 1
//     if(x === maxFallDistance) {
//     $('.enemy-missile').remove();
//     }
//   }
//
// function removeMissile() {
//   $('#target').parent().remove()
//
// }
//
// function hit() {
//   $('#target').on('click', removeMissile)
// }
//
// // setInterval(dropMissile, 30)
//
// function initialize() {
//   hit();
// }
//
//
//
//
//
//
// initialize();




































// var game = {
//       $canvas: $('#canvas'),
//       ctx: canvas.getContext("2d"),
//       spawnRate: 1500,
//       fallRate: 1,
//       spawnLineY: 10,
//       lastSpawn: -1,
//       numberOfMissiles: 10,
//       startTime: Date.now(),
//       toLeft: canvas.offsetLeft,
//       toTop: canvas.offsetTop,
//       missileStartX: 600,
//       missileStartY: 800,
//       explosion: {x: -100, y: -100},
//       xx: canvas.width/2,
//       yy: 0,
//       dx: 1,
//       dy: -1
// }
//
// function initiateGame(){
//
// var enemyMissiles = [{'id': 'enemy1', 'x': 150, 'y': -20, 'w': 100, 'h': 30},
//                      {'id': 'enemy2', 'x': 550, 'y': -20, 'w': 100, 'h': 30},
//                      {'id': 'enemy3', 'x': 950, 'y': -20, 'w': 100, 'h': 30}
//                    ];
//
// function drawEnemies () {
//   for(var i = 0; i < enemyMissiles.length; i ++) {
//     game.ctx.fillStyle = 'green';
//     game.ctx.fill()
//     game.ctx.rect(enemyMissiles[i].x, enemyMissiles[i].y += .5, enemyMissiles[i].w, enemyMissiles[i].h);
//   }
// }
//
// function animate() {
//   game.ctx.clearRect(0, 0, canvas.width, canvas.height)
//   drawEnemies();
// }
//
// setInterval(animate, 10)
//
// }
//
// initiateGame();
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // function drawMissile() {
// //   game.ctx.beginPath();
// //   game.ctx.rect(game.missileStartX, game.missileStartY, 10, 10);
// //   game.ctx.fillstyle = 'red';
// //   game.ctx.fill();
// // }
// //
// // function draw() {
// //   game.ctx.clearRect(0, 0, canvas.width, canvas.height)
// //   drawMissile();
// //
// //   game.missileStartX += game.dx;
// //   game.missileStartY += game.dy;
// //
// //   game.ctx.rect(game.explosion.x, game.explosion.y, 20, 20)
// //   game.ctx.fillstyle = 'red'
// //   game.ctx.fill();
// // }
// //
// // $(document).on('mousedown', 'canvas', mousePosition);
// // // Find the coordinates of where the mouse is clicked
// // function mousePosition(event) {
// //     var x = event.clientX - game.toLeft;
// //     var y = event.clientY;
// //     console.log(x,y)
// //
// //     game.explosion.x = x - 10;
// //     game.explosion.y = y - 10;
// //
// // }
// //
// // setInterval(draw, 30)
//
//
//
//
// //................................OLD CODE......................................
//
//
//
//
//
//
// // Creates a random location for the falling missiles and then pushes that to the
// // fallenMissilesArr array
// // function spawnFallingMissile() {
// //   var missile = {
// //     x: Math.random() * (canvas.width -30) + 15,
// //     y: game.spawnLineY,
// //   }
// //   game.fallenMissilesArr.push(missile);
// // }
// //
// // function animate() {
// //   var time = Date.now()
// //
// //   if(time > (game.lastSpawn + game.spawnRate)) {
// //     game.lastSpawn = time;
// //     spawnFallingMissile();
// //   }
// //   window.requestAnimationFrame(animate);
// //
// //
// // // This clears the canvas after every frame so that a trail is not left behind.
// // // Keeping a trail is like the real game though, so keeping it in for now
// //   game.ctx.clearRect(0, 0, canvas.width, canvas.height);
// //
// // // Draws that starting line across the top of the canvas which is where the objects
// // // will drop from
// //   // game.ctx.beginPath();
// //   // game.ctx.moveTo(0, game.spawnLineY);
// //   // game.ctx.lineTo(canvas.width, game.spawnLineY)
// //   // game.ctx.stroke();
// //
// //   // playerMissile();
// //   // shootMissile();
// //
// //   game.ctx.beginPath();
// //   game.ctx.rect(game.xx, game.yy, 10, 10);
// //   game.ctx.fillStyle = "#0095DD";
// //   game.ctx.fill();
// //   game.ctx.closePath();
// //
// //
// //   game.xx += game.dx
// //   game.yy += game.dy
// //
// //
// //
// // // Creates an infinte number of falling objects that fall at random locations
// // // on the x axis
// //   // for(var i = 0; i < game.fallenMissilesArr.length; i ++) {
// //   //   if(game.fallenMissilesArr.length < 10) {
// //   //   var object = game.fallenMissilesArr[i];
// //   //   object.y += game.fallRate;
// //   //   game.ctx.beginPath();
// //   //   game.ctx.rect(object.x, object.y, 7, 7);
// //   //   game.ctx.closePath();
// //   //   game.ctx.fillStyle = object.type;
// //   //   game.ctx.fill();
// //   // }
// //
// //   // // collision detection
// //   // if (object.x <= game.explosion.x + 5 || object.x >= game.explosion.x - 5) {
// //   //   console.log('hello')
// //
// //   game.ctx.fillStyle = 'white'
// //   game.ctx.fillRect(game.explosion.x, game.explosion.y, 50, 50)
// // }
// //
// //
// //
// //
// //
// //
// // // Player ones missile defense starting location
// // function playerMissile() {
// //   game.ctx.beginPath();
// //   game.ctx.arc(game.missileStartX , game.missileStartY, 10, 0, Math.PI*2, false);
// //   game.ctx.fillStyle = "green";
// //   game.ctx.fill();
// //   game.ctx.closePath();
// // }
// //
// // animate();
