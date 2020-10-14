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
  name: "galaxy",
  x: 250,
  y: 250,
  width: 400,
  height: 400,
  rotationSpeed: 0.008,
  rotation: 0,
  collision: false
}

let blackHole = {
  x: 1500,
  y: 800,
  width: 300,
  height: 300,
  rotationSpeed: 0.02,
  rotation: 0,
  collision: false
}

let nebula = {
  x: 1300,
  y: 200,
  width: 300,
  height: 300,
  rotationSpeed: 0.001,
  rotation: 0,
  collision: false
}

let pulsar = {
  x: 600,
  y: 800,
  width: 400,
  height: 240,
  rotationSpeed: 0.05,
  rotation: 0,
  collision: false
}

let sun = {
  x: 600,
  y: 800,
  width: 50,
  height: 50,
  rotationSpeed: 0.008,
  rotation: 0,
  collision: false
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
let objectArray;
let imageArray;

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

  objectArray = [galaxy,    blackHole,    nebula,    pulsar];
  imageArray  = [galaxyImg, blackHoleImg, nebulaImg, pulsarImg];
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

  // objectArray.forEach((object, i) => {
  //   displayInformation(imageArray[i], object);
  // });

  //Place, draw, and rotate every cosmic object
  objectArray.forEach((object, i) => {
    cosmicRotation(imageArray[i], object);
  });



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
  if(checkCollision(object)){
    translate(object.x, object.y);
    rotate(object.rotation);
    drawImage(img, 0, 0, object.width * 1.2, object.height * 1.2);
    if(object.name === "galaxy"){

      drawImage(sunImg, 100, 100, sun.width * 1.1, sun.height * 1.1);
    }
    pop();
  }
  else {
    translate(object.x, object.y);
    rotate(object.rotation);
    drawImage(img, 0, 0, object.width, object.height);
    if(object.name === "galaxy"){
      drawImage(sunImg, 100, 100, sun.width, sun.height);
    }
    pop();
  }
}

//check if the user is hovering over a cosmic object
function checkCollision(object){
 
  if(user.x + user.size/2 < object.x + object.width/2 && user.x - user.size /2 > object.x - object.width/2 &&
     user.y + user.size/2 < object.y + object.height/2 && user.y - user.size /2 > object.y - object.height/2){
        object.collision = true;
        return true;
  }
  else {
    object.collision = false;
    return false;
  }
}


//display object information pannel
function displayInformation(img, object){

}






































//
