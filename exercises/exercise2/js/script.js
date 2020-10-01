/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let covid19 = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
}

let user = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  covid19.y = random(0, height);
  covid19.vx = covid19.speed;

  //noCursor();

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  covid19.x = covid19.x + covid19.vx;
  covid19.y = covid19.y + covid19.vy;

  if(covid19.x > width){
    covid19.x = 0;
    covid19.y = random(0, height);
  }

  //place house
  fill(255,0,255);
  square(0, windowHeight-400, 400);

  //user movement
  user.x = mouseX;
  user.y = mouseY;

  //check if user got covid19
  let distance = dist(user.x, user.y, covid19.x, covid19.y);

  if(distance < user.size/2 + covid19.size/2){
    noLoop();
  }

  //display covid 19 circle
  fill(255,0,0);
  ellipse(covid19.x, covid19.y, covid19.size);

  //display user
  fill(0,255,0);
  ellipse(user.x, user.y, user.size);

}
