let data;
let g, v0, angle;
let trajectory = [];

function preload() {
  // JSON load karna
  data = loadJSON("scenerio.json");
}

function setup() {
  createCanvas(800, 600);

  // Parameters JSON se
  v0 = data.parameters.initialVelocity;
  angle = radians(data.parameters.angle);
  g = data.parameters.gravity;

  // Trajectory calculate karna
  for (let t = 0; t < 5; t += 0.1) {
    let x = v0 * cos(angle) * t;
    let y = v0 * sin(angle) * t - 0.5 * g * t * t;
    if (y < 0) break;
    trajectory.push({ x: x * 10, y: height - y * 10 }); // scale factor *10
  }
}

function draw() {
  background(240);
  fill(0);
  textSize(20);
  text(data.title, 20, 30);
  textSize(14);
  text(data.description, 20, 50);

  // Ground line
  stroke(0);
  line(0, height - 20, width, height - 20);

  // Trajectory
  noFill();
  stroke(200, 0, 0);
  beginShape();
  for (let p of trajectory) {
    vertex(p.x, p.y);
  }
  endShape();

  // Ball
  let t = (frameCount % 300) / 60; // animation
  let x = v0 * cos(angle) * t * 10;
  let y = height - (v0 * sin(angle) * t - 0.5 * g * t * t) * 10;
  if (y < height - 20) {
    fill(0, 100, 255);
    ellipse(x, y, 15, 15);
  }
}
