/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let covid19 = {
  x: 0,
  y: 250,
  size: 200,
  vx: 2,
  vy: 3,
  distanceX: 0,
  distanceY: 0,
  targetX: 0,
  targetY: 0,
  ease: 0.015
}

let user = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
}

let house = {
  x: 50,
  y: 0,
  size: 400
}

let bgImg;
let covidImg;
let houseImg;
let endHouseImg;
let endImg;

function preload() {
  bgImg = loadImage('assets/images/background.png');
  covidImg = loadImage('assets/images/covid19s.png');
  houseImg = loadImage('assets/images/house.png');
  endHouseImg = loadImage('assets/images/endHouse.png');
  endImg = loadImage('assets/images/stop.png');
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //noCursor();

  covid19.x = random(50, windowWidth-50);
  covid19.y = random(50, windowHeight-50);

  house.y = windowHeight-450;

  image(bgImg, 0, 0);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bgImg);

  // covid19 movement -> it follows the user
  covid19.targetX = mouseX;
  covid19.distanceX = covid19.targetX - covid19.x;
  covid19.x += covid19.distanceX * covid19.ease;

  covid19.targetY = mouseY;
  covid19.distanceY = covid19.targetY - covid19.y;
  covid19.y += covid19.distanceY * covid19.ease;

  if(covid19.x > width){
    covid19.x = random(0, height);
    covid19.y = random(0, height);
  }

  //place house
  image(houseImg, house.x, house.y, house.size);

  //user movement
  user.x = mouseX;
  user.y = mouseY;


//==================================================================ERROR=======
  //check if user got covid19
  let distance = dist(user.x, user.y, covid19.x, covid19.y);
  if(distance < user.size/2 + covid19.size/2){
    background(endImg);
    image(endHouseImg, house.x, house.y, house.size);
    noLoop();
  }
  //============================================================================
  //================================================================ERROR=======
  //if covid touches house, bounce away
  // covid19.vx *= ((covid19.x < 450) ? -1 : 1);
  // covid19.vy *= ((covid19.y < windowHeight - 450) ? -1 : 1);
  //
  // covid19.x = covid19.x + covid19.speedX;
  // covid19.y = covid19.y + covid19.speedY;

//============================================================================


  //display covid 19 circle
  image(covidImg, covid19.x, covid19.y, covid19.size, covid19.size);

  //display user
  //if distance between user and virus is less than half the screen start becoming red
  let lvlw = (windowWidth  - 50) / 3;
  let lvlh = (windowHeight - 50) / 3;

  //uses changes color based on distance of the virus to represent danger
  if(distance <= lvlw && distance <= lvlh){
    fill('red');
  }
  else if(distance <= lvlw*2 && distance <= lvlh*2){
    fill('yellow');
  }
  else if(distance > lvlw*2 && distance > lvlh*2 ){
    fill('green');
  }

  ellipse(user.x, user.y, user.size);

}
