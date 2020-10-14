/**************************************************
Project 1: Space travel and discovery simulation

You are in space, you control a spaceship.
You can explore pace to learn more about various cosmic objects placed around.
To learn about an object, press and hold the object to make an info tab appear.
Alien ship will float around at random moments, avoid it to avoid trouble.
If you come in contact with the aliens, they will give you a choice
  1) you can apologize and continue your journey
  2) you can be aggressive and they will kill you, end of the game -> reloads the game
**************************************************/

let user = {
  x: 250,
  y: 250,
  size: 100,
  ease: 0.08
}

let aliens = {

}

let galaxy = {
  x: 250,
  y: 250,
  width: 400,
  height: 400,
  rotationSpeed: 0.008,
  rotation: 0
}

let blackHole = {
  x: 1500,
  y: 800,
  width: 300,
  height: 300,
  rotationSpeed: 0.02,
  rotation: 0
}

let nebula = {
  x: 1300,
  y: 200,
  width: 300,
  height: 300,
  rotationSpeed: 0.001,
  rotation: 0
}

let pulsar = {
  x: 600,
  y: 800,
  width: 400,
  height: 240,
  rotationSpeed: 0.05,
  rotation: 0
}

let sun = {
  x: 600,
  y: 800,
  width: 50,
  height: 50,
  rotationSpeed: 0.008,
  rotation: 0
}


let userImg;
let alienImg;
let alienShipImg;
let galaxyImg;
let blackHoleImg;
let nebulaImg;
let pulsarImg;
let sunImg;
let solarSystemImg;
let spaceImg;

let engineStartSound;
let engineOffSound;
let gameThemeSound;
let alienSound;

let rotationVar = 0;

function preload() {
  userImg        = loadImage('assets/images/spaceship.png');
  alienImg       = loadImage('assets/images/alienboi.png');
  alienShipImg   = loadImage('assets/images/alienship.png');
  galaxyImg      = loadImage('assets/images/galaxy.png');
  blackHoleImg   = loadImage('assets/images/blackhole.png');
  nebulaImg      = loadImage('assets/images/nebula.png');
  pulsarImg      = loadImage('assets/images/pulsar.png');
  sunImg         = loadImage('assets/images/sun.png');
  solarSystemImg = loadImage('assets/images/solar system.jpg');
  spaceImg       = loadImage('assets/images/background.jpg');

  soundFormats('mp3');
  engineStartSound = loadSound('assets/sounds/banshee on.mp3');
  engineOffSound   = loadSound('assets/sounds/banshee off.mp3');
  gameThemeSound   = loadSound('assets/sounds/Hans Zimmer - No Time For Caution.mp3');
  alienSound       = loadSound('assets/sounds/xFiles.mp3');
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //noCursor();

  user.x = windowWidth/2;
  user.y = windowHeight/2;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  game();


}

function title() {

}

function game() {
  background(spaceImg);






  //place Galaxy and make it turn
  cosmicRotation(galaxyImg, galaxy);

  //place Nebula and make it turn
  cosmicRotation(nebulaImg, nebula);

  //place black hole and make it turn
  cosmicRotation(blackHoleImg, blackHole);

  //place Pular and make it turn
  cosmicRotation(pulsarImg, pulsar);





  userBehavior();
}

//defines the user movement behavior
function userBehavior() {
  let targetX = mouseX;
  let dx = targetX - user.x;
  user.x += dx * user.ease;

  let targetY = mouseY;
  let dy = targetY - user.y;
  user.y += dy * user.ease;

  drawImage(userImg, user.x, user.y, user.size, user.size);
}

//this will draw an image at the center coordinates rather than the corner, and put it back to corner right after
function drawImage(img, x, y, w, h){
  imageMode(CENTER);
  image(img, x, y, w, h);
  imageMode(CORNER);
}

function cosmicRotation(img, object){
  object.rotation += object.rotationSpeed;
  push();
  translate(object.x, object.y);
  rotate(object.rotation);
  drawImage(img, 0, 0, object.width, object.height);
  if(object === galaxy){
    drawImage(sunImg, 100, 100, sun.width, sun.height);
  }
  pop();
}

function isCollision(user, object){


}






































//
