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
  x: 500,
  y: 250,
  width: 400,
  height: 400,
  rotationSpeed: 0.008,
  rotation: 0,
  collision: false
}

let blackHole = {
  name: "blackHole",
  x: 1500,
  y: 800,
  width: 300,
  height: 300,
  rotationSpeed: 0.02,
  rotation: 0,
  collision: false
}

let nebula = {
  name: "nebula",
  x: 1300,
  y: 200,
  width: 300,
  height: 300,
  rotationSpeed: 0.001,
  rotation: 0,
  collision: false
}

let pulsar = {
  name: "pulsar",
  x: 300,
  y: 800,
  width: 400,
  height: 240,
  rotationSpeed: 0.05,
  rotation: 0,
  collision: false
}

let sun = {
  name: "sun",
  x: 600,
  y: 800,
  width: 30,
  height: 30,
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

  gameThemeSound.setVolume(0.3);
  gameThemeSound.loop();
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

  displayMovingStars();

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
    displayInformation(object.name);
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

//
function displayMovingStars(){
  for(let i = 0; i < 500; i++){
    let starX = random(0, windowWidth);
    let starY = random(0, windowHeight);
    stroke(250);
    point(starX, starY);
  }
}

//display object information pannel
function displayInformation(objectName){
  if(mouseIsPressed){
    fill('#e4e6eb');
    rectMode(CENTER);
    rect(windowWidth/2, windowHeight/2, 400, 700);

    push();
    translate((windowWidth/2 - 400/2 + 20),(windowHeight/2 - 700/2 + 60));
    //========================================================================== GALAXY TEXT
    if(objectName === "galaxy"){
      fill('#003566');
      textStyle(BOLD);
      textSize(50);
      text('GALAXIES',0,0);

      textStyle(NORMAL);
      textSize(20);
      text('• A Galaxy is a system of millions or', 0, 50);
      text('  billions of stars, along with gas and', 0, 80);
      text('  dust, held together by gravitational', 0, 110);
      text('  attraction.', 0, 140);

      text('• At the center of every galaxy, there', 0, 190);
      text('  is a supermassive black hole. That\'s', 0, 220);
      text('  why galaxies form discal shapes with', 0, 250);
      text('  a center.', 0, 280);

      text('• Our Solar System is located on the', 0, 330);
      text('  Orion Arm of the Milky Way galaxy,', 0, 360);
      text('  about halfway from the edge to the', 0, 390);
      text('  center of our galaxy.', 0, 420);
    }
    //========================================================================== BLACK HOLE TEXT
    if(objectName === "blackHole"){
      fill('#003566');
      textStyle(BOLD);
      textSize(50);
      text('BLACK HOLES',0,0);

      textStyle(NORMAL);
      textSize(20);
      text('• Contrary to popular belief, black holes', 0, 50);
      text('  are not actually holes! They are objects', 0, 80);
      text('  so incredibly massive and dense that', 0, 110);
      text('  they even absorb light, giving the', 0, 140);
      text('  illusion of a hole.', 0, 170);

      text('• The surface of a black hole is called', 0, 220);
      text('  the event horizon. The black hole\'s', 0, 250);
      text('  gravitational pull is so strong that', 0, 280);
      text('  the event horizon marks the point ', 0, 310);
      text('  of no return.', 0, 340);

      text('• Even though many researchers have', 0, 390);
      text('  devoted their life\'s work to black', 0, 410);
      text('  holes, to this day, we still have no', 0, 440);
      text('  idea what hides past the event', 0, 470);
      text('  horizon.', 0, 500);
    }
    //========================================================================== NEBULA TEXT
    if(objectName === "nebula"){
      fill('#003566');
      textStyle(BOLD);
      textSize(50);
      text('NEBULAS',0,0);

      textStyle(NORMAL);
      textSize(20);
      text('• A nebula is gigantic cloud of various', 0, 50);
      text('  gases and elements. Some form from', 0, 80);
      text('  gases that are already present in the', 0, 110);
      text('  intergalactic medium while others from', 0, 140);
      text('  from from supernova explosions: ', 0, 170);
      text('  the death of a star.', 0, 200);

      text('• The Helix Nebula is the closest one to', 0, 250);
      text('  Earth at approximately 700 light years', 0, 280);
      text('  from here.', 0, 310);

      text('• This nebula here is the Cat Eye Nebula ', 0, 360);
      text('  and it is 3,262 light years away from', 0, 390);
      text('  Earth.', 0, 420);
    }
    //========================================================================== PULSAR TEXT
    if(objectName === "pulsar"){
      fill('#003566');
      textStyle(BOLD);
      textSize(50);
      text('PULSARS',0,0);

      textStyle(NORMAL);
      textSize(20);
      text('• Pulsars are a type of Neutron Stars', 0, 50);
      text('  which is because pulsars emit beams', 0, 80);
      text('  of electromagnetic radiation that', 0, 110);
      text('  look like beams of light coming out', 0, 140);
      text('  of its magnetic poles (North and south).', 0, 170);

      text('• The blinking effect happens because', 0, 220);
      text('  of the beams. When they align with us,', 0, 250);
      text('  the light we receive is much stronger', 0, 280);
      text('  than the light the star itself emits, ', 0, 310);
      text('  making it look like it\'s blinking,', 0, 340);
      text('  like a beacon!', 0, 370);

      text('• Pulsars rotate at approximately', 0, 420);
      text('  70,000 km per second. Our own planet', 0, 450);
      text('  only rotates at about 0.464 km per ', 0, 480);
      text('  second!', 0, 510);
    }
    pop();
  }

}






































//
