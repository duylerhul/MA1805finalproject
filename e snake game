// --- VARIABLES ---
let x = 0;
let y = 0;
let size = 20;

let speedX = 1; 
let speedY = 0; 

let foodX;
let foodY;
let waste = []; 

// Music Variable
let bgMusic = new Audio('music.mp3'); 

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  pickFood();

  bgMusic.loop = true;
  bgMusic.volume = 0.5;
}

function draw() {
  // --- CHANGE IS HERE ---
  // R=0, G=0, B=100 (Dark Blue)
  background(0, 0, 100); 

  let oldX = x;
  let oldY = y;

  x = x + (speedX * size);
  y = y + (speedY * size);

  // Check Walls
  if (x < 0 || x >= width || y < 0 || y >= height) {
    resetGame();
  }
  
  // Check Waste
  for (let i = 0; i < waste.length; i = i + 1) {
    if (x === waste[i].x && y === waste[i].y) {
       resetGame();
    }
  }

  // Check Food
  if (x === foodX && y === foodY) {
    pickFood();
    let newWasteBlock = createVector(oldX, oldY);
    waste.push(newWasteBlock);
  }

  // Draw Food (Light Blue to contrast background)
  fill(0, 200, 255);
  rect(foodX, foodY, size, size);

  // Draw Player (Neon Green)
  fill(0, 255, 100);
  rect(x, y, size, size);

  // Draw Waste (Grey)
  fill(150); 
  for (let i = 0; i < waste.length; i = i + 1) {
    rect(waste[i].x, waste[i].y, size, size);
  }
}

function keyPressed() {
  // Start music on keypress
  bgMusic.play(); 

  if (keyCode === LEFT_ARROW) {
    speedX = -1; speedY = 0;
  } 
  if (keyCode === RIGHT_ARROW) {
    speedX = 1;  speedY = 0;
  } 
  if (keyCode === UP_ARROW) {
    speedX = 0;  speedY = -1;
  } 
  if (keyCode === DOWN_ARROW) {
    speedX = 0;  speedY = 1;
  }
}

function pickFood() {
  let cols = floor(width / size);
  let rows = floor(height / size);
  foodX = floor(random(cols)) * size;
  foodY = floor(random(rows)) * size;
}

function resetGame() {
  x = 0;
  y = 0;
  waste = []; 
  pickFood();
}