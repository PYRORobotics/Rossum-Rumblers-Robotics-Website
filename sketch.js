var canvas = document.getElementById("paper"),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var centerX = canvas.width * 0.75; // X-coordinate of the center of the circle
var centerY = canvas.height * 0.5; // Y-coordinate of the center of the circle
var radius = canvas.width * 0.25; // Radius of the circle

var stars = [], // Array that contains the stars
    FPS = 60, // Frames per second
    x = 1200; // Number of stars

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

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.globalCompositeOperation = "lighter";

  for (var i = 0, n = stars.length; i < n; i++) {
    var s = stars[i];

    ctx.fillStyle = "#fff";
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

function distance( line, point ){
  var xs = 0;
  var ys = 0;

  xs = line.x2 - line.x1;
  xs = xs * xs;

  ys = line.y2 - line.y1;
  ys = ys * ys;

  var u = ((point.x - line.x1) * (line.x2 - line.x1) + (point.y - line.y1) * (line.y2 - line.y1)) / (xs + ys);

  if (u > 1) {
    u = 1;
  } else if (u < 0) {
    u = 0;
  }

  var x = line.x1 + u * (line.x2 - line.x1);
  var y = line.y1 + u * (line.y2 - line.y1);

  var dx = x - point.x;
  var dy = y - point.y;

  return Math.sqrt(dx * dx + dy * dy);
}

function intersects(line1, line2) {
  // Check if the two lines share an endpoint
  if ((line1.x1 === line2.x1 && line1.y1 === line2.y1) || (line1.x2 === line2.x2 && line1.y2 === line2.y2)) {
    return true;
    }
    // Check if the two lines intersect
var d1 = distance(line2, {x: line1.x1, y: line1.y1});
var d2 = distance(line2, {x: line1.x2, y: line1.y2});
var d3 = distance(line1, {x: line2.x1, y: line2.y1});
var d4 = distance(line1, {x: line2.x2, y: line2.y2});

if (d1 < 1 || d2 < 1 || d3 < 1 || d4 < 1) {
return true;
}1

if ((line1.x1 < line2.x1 && line1.x2 < line2.x1) ||
(line1.x1 > line2.x2 && line1.x2 > line2.x2) ||
(line1.y1 < line2.y1 && line1.y2 < line2.y1) ||
(line1.y1 > line2.y2 && line1.y2 > line2.y2)) {
return false;
}

var slope1 = (line1.y2 - line1.y1) / (line1.x2 - line1.x1);
var slope2 = (line2.y2 - line2.y1) / (line2.x2 - line2.x1);

if (slope1 === slope2) {
return false;
}

var yIntercept1 = line1.y1 - slope1 * line1.x1;
var yIntercept2 = line2.y1 - slope2 * line2.x1;

var intersectionX = (yIntercept2 - yIntercept1) / (slope1 - slope2);
var intersectionY = slope1 * intersectionX + yIntercept1;

if ((intersectionX < Math.min(line1.x1, line1.x2) || intersectionX > Math.max(line1.x1, line1.x2)) ||
(intersectionX < Math.min(line2.x1, line2.x2) || intersectionX > Math.max(line2.x1, line2.x2)) ||
(intersectionY < Math.min(line1.y1, line1.y2) || intersectionY > Math.max(line1.y1, line1.y2)) ||
(intersectionY < Math.min(line2.y1, line2.y2) || intersectionY > Math.max(line2.y1, line2.y2))) {
return false;
}

return true;
}

// Update star locations
function update() {
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

