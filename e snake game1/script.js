// --- VARIABLES ---
let x = 0;
let y = 0;
// --- the starting position of the player  ---
let size = 20;
// --- the grid line is set to be 20x20 ---
let speedX = 0; 
let speedY = 0; 
// --- is the starting speed of the object stable   ---
let moveDelay = 8;
// --- this tells the game to wait 8 frames before moving the snake which would make the game speed slower, the higher the number the slower the snake moves  ---
let foodX;
let foodY;
// --- store the food variable that the snake would eat  ---

//  store data for every piece of waste here ---
let waste = []; 

// variable for "screen shake" effect, if it >0 the screen shakes --- 
let shakeAmount = 0;

function setup() {
  createCanvas(400, 400);
  pickFood();
}

function draw() {
  // If we just ate, shake the whole screen
  if (shakeAmount > 0) {
    // "translate" moves the whole grid slightly 
    translate(random(-5, 5), random(-5, 5));
    shakeAmount = shakeAmount - 1; // count down to make the shake happen quickly 
  }

  background(135, 206, 235); // paint the background colour light blue same as the sky 

  // 
  if (frameCount % moveDelay === 0)
   // this keep the game movement every 8 frames as set before, this was done to keep the game smooth at 60 fps and keep the retro vibe of a old game  ---

    {
      GameLogic();
  }

  

  // draw the phone and telling the game where to make it appear 
  drawPhone(foodX, foodY);

  // draw the smilley with x and y to tell the game where to move as the cordinates changes when you pressing the arrow keys, this help to draw the object in a new position in every frame to make it move like it moving 
  drawsmilleyface(x, y);

  // draw the Waste 
  for (let i = 0; i < waste.length; i++) {
    drawScrap(waste[i]);
  }
  // make a loop of the waste to keep drawing new item of waste after the player eats them 
  }



function GameLogic() {
  let oldX = x;
  let oldY = y;
// this help to store the old position of the smilleyface so that the scraps they drop will be in their last postion after eating it
  x = x + (speedX * size);
  y = y + (speedY * size);
// this help the computer to calculate the new postion based on the speed and size of the smilleyfae
  
  if (x < 0 || x >= width || y < 0 || y >= height) resetGame();
  // this is to check if the similleyface hit the wal of the canvas or not, this has been shortern than what i have done before with the symbolds || means that if any of these is true then the player die and the game reset---
  for (let i = 0; i < waste.length; i++) {
    // this is to keep the trash to be in a loop and keep spawning after the player eats them, also make them works as an obstacle 
    if (x === waste[i].x && y === waste[i].y) resetGame();
    // check if the smilleyface collide with any of the waste if collide it reset the game 
  }

  
  if (x === foodX && y === foodY) {
// this line compare the x and y cordinates of the smilleyface and the phone to see if they collide or not 
    pickFood();
    
    let newWaste = {
      x: oldX,
      y: oldY,
    };
    // make the waste appear in the last position of the smilleyface not above or under
    waste.push(newWaste);

    // make the screen shake 
    shakeAmount = 10; 
  }
}

function drawsmilleyface(sx, sy) {
 
  // this draw the face
  fill('yellow');
  circle(sx + 10, sy + 10, 20); 

  // this draw the eyes
  fill('black');
  circle(sx + 7, sy + 8, 3);
  circle(sx + 13, sy + 8, 3);

  //this draw the eye
  // this turn of the the fill in colour so it make the eye more visible 
  noFill(); 
  stroke('black'); // Turn on the pen
  
  // this draw the smile for the face
  // I put 3.14 at the back so that they would make a half circle to represent the smille
  arc(sx + 10, sy + 10, 12, 10, 0, 3.14);
  
  // turn off the pen again
  noStroke();
}

function drawPhone(bx, by) {
  noStroke(); // turn of the outline

  // the body for the phone 
  fill(50); 
  // set the size for the phone
  rect(bx + 4, by + 2, 12, 16);

  // 2. The Screen (Light Blue)
  fill('skyblue');
  // make another smaller screen inside the first body
  rect(bx + 5, by + 4, 10, 10);

  // white dot to resemble the home button 
  fill('white');
  // circle(x, y, size)
  circle(bx + 10, by + 16, 2);
}

function drawScrap(w) {
  fill(100); // grey Base
  rect(w.x, w.y, size, size);
  
  // Draw the wire in the CENTER (10) every time
  stroke(0);
  line(w.x + 10, w.y, w.x + 10, w.y + size);
  noStroke();
  
  // Draw the bolt using a fixed colour every time
  fill(200); 
  rect(w.x + 2, w.y + 2, 4, 4);
}

// the control panel for the game 
function keyPressed() {
  if (keyCode === LEFT_ARROW) { speedX = -1; speedY = 0; } 
  if (keyCode === RIGHT_ARROW) { speedX = 1;  speedY = 0; } 
  if (keyCode === UP_ARROW) { speedX = 0;  speedY = -1; } 
  if (keyCode === DOWN_ARROW) { speedX = 0;  speedY = 1; }
}
// the pick up food function 
function pickFood() {
  let cols = floor(width / size); //calculate how many invisible x columns fit on the screen
  let rows = floor(height / size); // calculate how many invisible y rows fit on the screen
  foodX = floor(random(cols)) * size; //pick a random X pixel (The horizontal position)
  foodY = floor(random(rows)) * size; //pick a random Y pixel (The vertical position)
}
// this help reset the game after the player die, set the position at the starting point, clear all of the array of phone and waste 
function resetGame() {
  x = 0; y = 0; waste = []; pickFood();
}