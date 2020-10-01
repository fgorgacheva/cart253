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
let virus;
let victim;
let houseImg;
let endHouseImg;
let endImg;

let gameOver;
let inHouse;

function preload() {
  bgImg = loadImage('assets/images/background.png');
  virus = loadImage('assets/images/covid19h.png');
  victim = loadImage('assets/images/covid19s.png');
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
  noCursor();

  gameOver = false;

  //virus spawn position
  covid19.x = windowWidth;
  covid19.y = windowHeight;

  //house spawn position
  house.y = windowHeight - 450;

  image(bgImg, 0, 0);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bgImg);
  inHouse = false;

  covid19.targetX = mouseX;
  covid19.distanceX = covid19.targetX - covid19.x;
  covid19.targetY = mouseY;
  covid19.distanceY = covid19.targetY - covid19.y;
  // checking if next x,y coordinates of covid will/will not collide with the house
  //if it does, then make its following behavior stop
  if(covid19.x + covid19.distanceX * covid19.ease <= house.x + house.size
    && covid19.y + covid19.distanceY * covid19.ease + covid19.size /2 >= house.y){
    inHouse = true;
  } else {
    inHouse = false;
  }

  // covid19 movement -> it follows the user cursor
  if (!inHouse) {
    covid19.x += covid19.distanceX * covid19.ease;
    covid19.y += covid19.distanceY * covid19.ease;
  }

  //spawn house
  image(houseImg, house.x, house.y, house.size);

  //user movement
  user.x = mouseX;
  user.y = mouseY;

  //check if user got covid19
  let distance = dist(user.x, user.y, covid19.x, covid19.y);

  //if virus touches user, stop the program
  if (distance < user.size / 2 + covid19.size / 2) {
    gameOver = true;
    background(endImg);
    imageMode(CENTER);
    image(victim, user.x, user.y, 200, 200);
    imageMode(CORNER);
    image(endHouseImg, house.x, house.y, house.size);
    noLoop();
  }

  //display covid 19 circle
  imageMode(CENTER);
  image(virus, covid19.x, covid19.y, covid19.size, covid19.size);
  imageMode(CORNER);

  //display user
  //different levels (closeness to the virus)
  let lvlw = (windowWidth - 50) / 4;
  let lvlh = (windowHeight - 50) / 4;

  //user changes color based on distance of the virus to represent danger
  if (user.x < 450 && user.y > 530) {
    fill('lime');
  } else if (distance <= lvlw && distance <= lvlh) {
    fill('red');
  } else if (distance <= lvlw * 2 && distance <= lvlh * 2) {
    fill('yellow');
  } else if (distance > lvlw * 2 && distance > lvlh * 2) {
    fill('lime');
  }

  // draw the user's circle if the game is still going
  if (!gameOver) {
    ellipse(user.x, user.y, user.size);
  }

}
