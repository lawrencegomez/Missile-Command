var x = 0;
var maxFallDistance = 750 + 'px';
var time = Date.now()
var player1Score = 0;
var $container = $('#container')
var $board = $('#game-board');
var $start = $('#start');
var $scoreboard = $('#scoreboard');
var fallRate = function() {
                return Math.floor((Math.random()*50)+10);
               }
var time = Date.now()


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
    console.log(player1Score)
  })

  this.movement = setInterval(function() {
    y += 2
    $selector.css('margin-top', y + 'px')
    var n = $selector.css('margin-top')
  }, fallRate())
}






$start.on('click', function() {
  new Missile;
})


// Find the coordinates of where the mouse is clicked
function mousePosition(event) {
    var xx = event.clientX - game.toLeft;
    var yy = event.clientY;
    console.log(x,y)
}













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
