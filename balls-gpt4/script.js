const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const radius = 40;
const angleDecrement = (2 * Math.PI) / 120;

function randomPosition() {
  const x = Math.floor(Math.random() * (canvas.width - 2 * radius)) + radius;
  const y = Math.floor(Math.random() * (canvas.height - 2 * radius)) + radius;
  return { x, y };
}

const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

const circles = [];

const numCircles = 120;

for (let i = 0; i<numCircles; i++) {
  circles.push(
    { body: null, angle: 2 * Math.PI, color: colors[i % colors.length] },
  )
}

let currentCircle = 0;

// Create Matter.js world
const engine = Matter.Engine.create();
const world = engine.world;
engine.world.gravity.y = .2;

// Create and add circle bodies to the world
circles.forEach(circle => {
  const position = randomPosition();
  const body = Matter.Bodies.circle(position.x, position.y, radius, { restitution: 0.9, friction: 0.15 });
  circle.body = body;
  Matter.World.add(world, body);
});

// Add ground to the world

const ground = Matter.Bodies.rectangle(canvas.width / 2, canvas.height, canvas.width, 10, { isStatic: true });
const rightWall = Matter.Bodies.rectangle(0, canvas.height / 2, 10, canvas.height * 4, { isStatic: true });
const leftWall = Matter.Bodies.rectangle(canvas.width, canvas.height / 2, 10, canvas.height * 4, { isStatic: true });


Matter.World.add(world, ground);
Matter.World.add(world, leftWall);
Matter.World.add(world, rightWall);

function drawCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    if (circle.angle <= 0) continue;

    const { x, y } = circle.body.position;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, circle.angle);
    ctx.closePath();
    ctx.fillStyle = circle.color;
    ctx.fill();
  }

  circles[currentCircle].angle -= angleDecrement;

  if (circles[currentCircle].angle <= 0) {
    const removedBody = circles[currentCircle].body;
    Matter.World.remove(world, removedBody);
    currentCircle++;
    if (currentCircle === circles.length) return;
  }

  requestAnimationFrame(drawCircle);
}

// Run the Matter.js engine
Matter.Engine.run(engine);
drawCircle();
