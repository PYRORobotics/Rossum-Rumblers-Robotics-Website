var canvas = document.getElementById("paper"),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var centerX = canvas.width * 0.75; // X-coordinate of the center of the circle
var centerY = canvas.height * 0.5; // Y-coordinate of the center of the circle
var radius = canvas.width * 0.25; // Radius of the circle
var starColor = "rgb(255,255,255)"

var stars = [], // Array that contains the stars
    FPS = 60, // Frames per second
    x = 300; // Number of stars

// Push stars to array
for (var i = 0; i < x; i++) {
  var angle = Math.random() * Math.PI * 2; // Random angle in radians
  var distance = Math.random() * radius; // Random distance from the center

  // Calculate the position of the star based on the angle and distance
  var starX = centerX + Math.cos(angle) * distance;
  var starY = centerY + Math.sin(angle) * distance;

  stars.push({
    x: starX,
    y: starY,
    radius: Math.random() * 1 + 1,
    vx: Math.floor(Math.random() * 50) - 25,
    vy: Math.floor(Math.random() * 50) - 25
  });
}

// Draw the scene
var g = 0.01
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation = "lighter";
  for (var i = 0, n = stars.length; i < n; i++) {
    var s = stars[i];
    if(g < 1){
      ctx.fillStyle = "rgba(255,255,255," + g + ")";
      g = g * 1.00002
    } else {
      ctx.fillStyle = "rgba(255,255,255,1)"
    }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.stroke();
  }

  ctx.beginPath();
  for (var i = 0, x = stars.length; i < x; i++) {
    var starI = stars[i];
    ctx.moveTo(starI.x,starI.y); 
    for (var j = 0, x = stars.length; j < x; j++) {
      var starII = stars[j];
      if(distance(starI, starII) < 150 && !intersects(starI, starII)) {
        //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
        ctx.lineTo(starII.x,starII.y); 
      }
    }
  }
  ctx.lineWidth = 0.05;
  ctx.strokeStyle = 'white';
  ctx.stroke();
}
var j = 0;
// Update star locations
function update() {
  if( j < 1) {
  radius = canvas.width * (.25 * j);
  j += .001;
  }
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    star.x += star.vx / FPS;
    star.y += star.vy / FPS;

    //Confine the dots within the circle
    var distanceFromCenter = Math.sqrt(Math.pow(star.x - centerX, 2) + Math.pow(star.y - centerY, 2));
    if (distanceFromCenter > radius) {
      var angle = Math.atan2(star.y - centerY, star.x - centerX);
      star.x = centerX + Math.cos(angle) * radius;
      star.y = centerY + Math.sin(angle) * radius;
      //Reflect stars when they hit the boundry
      //let angle = Math.atan2(star.vy, star.vx);
      let mag = Math.sqrt((star.vx * star.vx)+(star.vy * star.vy));
      star.vx = -mag * (Math.cos(angle));
      star.vy = -mag * (Math.sin(angle));
      // star.vx = -star.vx;
      // star.vy = -star.vy;
    }
  }
}



// Update and draw

function tick() {
  requestAnimationFrame(tick);
  update();
  draw();
}

tick();

