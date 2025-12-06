// --- VARIABLES ---
let x = 0;
let y = 0;
let size = 20;

let speedX = 1; 
let speedY = 0; 

let foodX;
let foodY;
let waste = []; 

// This controls the speed. 
// 5 = Fast (Moves every 5th frame)
// 10 = Normal (Moves every 10th frame)
// 15 = Slow (Moves every 15th frame)
let moveDelay = 4; 

let bgMusic = new Audio('music.mp3'); 

function setup() {
  createCanvas(400, 400);
  
  // REMOVED: frameRate(10); 
  // By removing that line, p5.js defaults to 60 FPS (Super Smooth)
  
  pickFood();

  bgMusic.loop = true;
  bgMusic.volume = 0.5;
}

function draw() {
  // 1. Draw Background (Runs 60 times a second - looks very stable)
  background(135, 206, 235); // Sky Blue

  // --- THE SMOOTH FIX ---
  // frameCount is a p5 variable that counts up forever (1, 2, 3...)
  // The % symbol means "Modulo" (Remainder).
  // This line asks: "Is the frame count divisible by 8?"
  // Result: The code inside only runs once every 8 frames.
  
  if (frameCount % moveDelay === 0) {
      updateGameLogic();
  }

  // --- DRAWING ---
  // We draw everything every single frame so it doesn't flicker
  
  // Draw Food (Red)
  fill(255, 50, 50); 
  rect(foodX, foodY, size, size);

  // Draw Player (Green)
  fill(0, 150, 0);
  rect(x, y, size, size);

  // Draw Waste (Dark Grey)
  fill(80); 
  for (let i = 0; i < waste.length; i = i + 1) {
    rect(waste[i].x, waste[i].y, size, size);
  }
}

// I moved all the movement math into this separate function
// to keep the draw() loop clean.
function updateGameLogic() {
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
}

function keyPressed() {
  bgMusic.play(); 

  // Since the game runs at 60FPS now, these keys 
  // will register instantly, making it feel much better.
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