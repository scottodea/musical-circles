// const sound = require("./sound");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const circlenum = document.querySelector(".circle-num");

canvas.width = innerWidth;
canvas.height = innerHeight;

circles = 30;

const mouse = {
  x: 10,
  y: 10
};
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

C = new sound("Sounds/C.wav");
D = new sound("Sounds/D.wav");
E = new sound("Sounds/E.wav");
F = new sound("Sounds/F.wav");
G = new sound("Sounds/G.wav");
A = new sound("Sounds/A.wav");
B = new sound("Sounds/B.wav");
Oct = new sound("Sounds/Oct.wav");

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("click", event => {
  circleArray.forEach(element => {
    element.color = randomColor([
      "#99B898",
      "#FECEAB",
      "#FF847C",
      "#E84A5F",
      "#2A363B",
      "#F2345B",
      "#191225",
      "#1C1C1C",
      "#571845",
      "#FFAA00"
    ]);
  });
});
addEventListener("keyup", e => {
  circlenum.value = e.target.value;
  circles = circlenum.value;
  init();
});

// Objects
function Circle(x, y, dx, dy, radius, color, dirty, strokeColor) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.strokeColor = strokeColor;
}

Object.prototype.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.strokeStyle = "green";
  c.fillStyle = this.color;
  c.fill();
  c.closePath();
};

Object.prototype.update = function () {
  if (this.radius < 100) {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
  this.draw();
};

// Implementation
let bigCircle;
let circleArray;
function init() {
  circleArray = [];
  c.clearRect(0, 0, canvas.width, canvas.height);
  bigCircle = new Circle(
    innerWidth / 2,
    innerHeight / 2,
    10,
    10,
    100,
    "black",
    false
  );
  for (let i = 0; i < circles; i++) {
    let radius = 30;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() * 5;
    let dy = Math.random() * 5;
    let color = randomColor([
      "#99B898",
      "#FECEAB",
      "#FF847C",
      "#E84A5F",
      "#2A363B",
      "#F2345B",
      "#191225",
      "#1C1C1C",
      "#571845",
      "#FFAA00"
    ]);
    let dirty = false;
    circleArray.push(new Circle(x, y, dx, dy, radius, color, dirty));
  }
}

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  bigCircle.update();
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();

    if (
      distance(bigCircle.x, bigCircle.y, circleArray[i].x, circleArray[i].y) >
      bigCircle.radius + circleArray[i].radius
    ) {
      circleArray[i].dirty = false;
    }
    if (
      distance(bigCircle.x, bigCircle.y, circleArray[i].x, circleArray[i].y) <
      bigCircle.radius + circleArray[i].radius &&
      !circleArray[i].dirty
    ) {
      //
      bigCircle.color = randomColor([
        "#99B898",
        "#FECEAB",
        "#FF847C",
        "#E84A5F",
        "#2A363B",
        "#FF8AB6",
        "#9D8CFF",
        "#0701B1"
      ]);
      circleArray[i].dy = -circleArray[i].dy;
      circleArray[i].dx = -circleArray[i].dx;
      switch (circleArray[i].color) {
        case "#99B898":
          C.play();
          break;
        case "#FECEAB":
          D.play();
          break;
        case "#FF847C":
          E.play();
          break;
        case "#E84A5F":
          F.play();
          break;
        case "#2A363B":
          G.play();
          break;
        case "#F2345B":
          A.play();
          break;
        case "#191225":
          B.play();
          break;
        case "#1C1C1C":
          Oct.play();
          break;
        case "#571845":
          E.play();
          break;
        case "#FFAA00":
          A.play();
          break;
      }
      circleArray[i].dirty = true;
    }
  }
}

init();
animate();

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
