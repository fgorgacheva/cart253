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
  x: 1000,
  y: 1000,
  size: 100,
  ease: 0.08
}

let alienShip = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  size: 100,
  speed: 5
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
  x: 1400,
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
let alienBoiImg;
let alienBoiGoodImg;
let alienBoiBadImg;
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
let alienThemeSound;
let explosionSound;

let rotationVar = 0;
let objectArray;
let imageArray;
let isAlienShipAppear;
let hasSoundPlayed = false;
let gameState = 0;
let isEncounterWithAlienOver = false;

function preload() {
  userImg         = loadImage('assets/images/spaceship.png');
  alienBoiImg     = loadImage('assets/images/alienboi unhappy.png');
  alienBoiGoodImg = loadImage('assets/images/alienboi good.png');
  alienBoiBadImg  = loadImage('assets/images/alienboi bad.png');
  alienShipImg    = loadImage('assets/images/alienship.png');
  galaxyImg       = loadImage('assets/images/galaxy.png');
  blackHoleImg    = loadImage('assets/images/blackhole.png');
  nebulaImg       = loadImage('assets/images/nebula.png');
  pulsarImg       = loadImage('assets/images/pulsar.png');
  sunImg          = loadImage('assets/images/sun.png');
  solarSystemImg  = loadImage('assets/images/solar system.jpg');
  spaceImg        = loadImage('assets/images/background.jpg');

  soundFormats('mp3');
  engineStartSound = loadSound('assets/sounds/banshee on.mp3');
  engineOffSound   = loadSound('assets/sounds/banshee off.mp3');
  gameThemeSound   = loadSound('assets/sounds/Halo 3 OST - Luck.mp3');
  alienThemeSound  = loadSound('assets/sounds/xFiles.mp3');
  explosionSound   = loadSound('assets/sounds/explosion.mp3');
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  user.x = windowWidth/2;
  user.y = windowHeight/2;

  objectArray = [galaxy,    blackHole,    nebula,    pulsar];
  imageArray  = [galaxyImg, blackHoleImg, nebulaImg, pulsarImg];

  gameThemeSound.setVolume(0.3);
  gameThemeSound.loop();

  noStroke();
  //noCursor();
}


// draw()
//
// Description of draw() goes here.
function draw() {
  background(spaceImg);
  displayMovingStars();
  switch(gameState){
    case 0: //title screen
      title();
      break;

    case 1: //normal game state/launch
      game();
      break;

    case 2: //alien interception
      alienOptionDialog();
      break;

    case 3: //continue game
      continueExploration();
      break;

    case 4: //game over
      gameOver();
      break;
  }
}

function title() {
  background('black');
  displayMovingStars();
  noStroke();

  fill('#ff52f3');
  textSize(100);
  text('Welcome to the Space Exploration game!', 25, 150);

  fill('white');
  textSize(20);
  textAlign(LEFT);
  text('- Use your mouse to control the floating spaceship.', 250, 250);
  text('- Press and hold your left mouse button when you hover over a celestial object to learn more about it.', 250, 350);
  text('** Be careful about the alien spaceship cruising through the cosmos! They might not be so happy about bumping into you! **', 250, 450);

  fill('red');
  textSize(50);
  text('Hit your space bar to start the game!', windowWidth/2 - 400, 750);

}

function keyTyped(){
  if(keyCode === 32 && gameState === 0){
    engineStartSound.setVolume(0.2);
    engineStartSound.play();

    setInterval(() => {
      isAlienShipAppear = true;
      alienShip.x = 0 - alienShip.size;
      alienShip.y = random(0, windowHeight);
      alienShip.vx = alienShip.speed;
    }, 40 * 1000);

    gameState = 1;
  }
  return false;
}

//===================================================================================================================================
// overall game logic
//===================================================================================================================================
function game() {
  // //for when the game restarts, elements left from previous playthrough must be removed before resuming the game.
  // removeElements();
  //Place, draw, and rotate every cosmic object
  objectArray.forEach((object, i) => {
    cosmicRotation(imageArray[i], object);
  });

  //check if it is time to spawn the alien ship and call its behavior
  if(isAlienShipAppear){
    alienShipBehavior();
  }

  //check to see if the alien ship has been intercepted, if it has launch the next game state
  if(!isEncounterWithAlienOver){
    let distance = dist(user.x, user.y, alienShip.x, alienShip.y);
    if (distance < user.size / 2 + alienShip.size / 2 && gameState != 2) {
      //alien interception
      gameState = 2;
      isEncounterWithAlienOver = true;
    }
  }

  userBehavior();
}

//===================================================================================================================================
//defines the user movement behavior
//===================================================================================================================================
function userBehavior() {
  let targetX = mouseX;
  let dx = targetX - user.x;
  user.x += dx * user.ease;

  let targetY = mouseY;
  let dy = targetY - user.y;
  user.y += dy * user.ease;

  drawImage(userImg, user.x, user.y, user.size, user.size);
}

//===================================================================================================================================
// this will draw an image from its center coordinates rather than the corner, and put it back to corner right after
//===================================================================================================================================
function drawImage(img, x, y, w, h){
  imageMode(CENTER);
  image(img, x, y, w, h);
  imageMode(CORNER);
}

//===================================================================================================================================
// draws the celestial objects and defines their rotating behavior
//===================================================================================================================================
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


//===================================================================================================================================
//check if the user is hovering over a celestial object
//===================================================================================================================================
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

//===================================================================================================================================
// pippin's snipet for displaying static (the moving stars)
//===================================================================================================================================
function displayMovingStars(){
  for(let i = 0; i < 500; i++){
    let starX = random(0, windowWidth);
    let starY = random(0, windowHeight);
    stroke(250);
    point(starX, starY);
  }
}

//===================================================================================================================================
// contains the alien spaceship behavior for crossing the screen and playing its music at a preset interval
//===================================================================================================================================
function alienShipBehavior() {
  if(!hasSoundPlayed){
    gameThemeSound.setVolume(0.1);
    alienThemeSound.setVolume(0.7);
    alienThemeSound.play();
    hasSoundPlayed = true;
  }

  if(alienShip.x > windowWidth + 1000){
    isAlienShipAppear = false;
    hasSoundPlayed = false;
    gameThemeSound.setVolume(0.3);
  }

  alienShip.x += alienShip.vx;
  alienShip.y += alienShip.vy;
  drawImage(alienShipImg, alienShip.x, alienShip.y, alienShip.size, alienShip.size);
}

//===================================================================================================================================
// displays the upset alien who will give you the choice to either continue or end the game
//===================================================================================================================================
let goodChoiceBtn;
let badChoiceBtn;

function alienOptionDialog(){
  console.log("call", gameState);
  //display alien boi sprite
  drawImage(alienBoiImg, windowWidth/2, windowHeight/2, 800, windowHeight);

  //display dialog box and choices
  fill('#e4e6eb');
  rectMode(CENTER);
  rect(windowWidth/2, windowHeight/2 + 300, 1300, 200);
  push();
  translate(windowWidth/2, windowHeight/2 + 300/2);
  textStyle(NORMAL);
  textAlign(CENTER);
  textSize(30);
  fill('#003566');
  text('You appear to have inconvenienced me with your fly machine. I am displeased.', 0, 100);
  text('What say you in your defense?', 0, 150);
  pop();

  goodChoiceBtn = createButton('I am so sorry! I will be careful next time!');
  goodChoiceBtn.position(windowWidth/2 - 220, windowHeight/2 + 350);
  goodChoiceBtn.mousePressed(() => {gameState = 3; removeElements();});

  badChoiceBtn = createButton('I did it on purpose!');
  badChoiceBtn.position(windowWidth/2 + 80, windowHeight/2 + 350);
  badChoiceBtn.mousePressed(() => {gameState = 4; removeElements();});

}

//===================================================================================================================================
// contains logic for apeasing the alien and continuing the game
//===================================================================================================================================
function continueExploration(){
  removeElements();
  drawImage(alienBoiGoodImg, windowWidth/2, windowHeight/2, 500, windowHeight);

  //display dialog box and choices
  fill('#e4e6eb');
  rectMode(CENTER);
  rect(windowWidth/2, windowHeight/2 + 300, 1300, 200);
  push();
  translate(windowWidth/2, windowHeight/2 + 300/2);
  textStyle(NORMAL);
  textAlign(CENTER);
  textSize(30);
  fill('#003566');
  text('Alright then, you may continue! Safe travels!', 0, 150);
  pop();

  let doneBtn = createButton('Goodbye!');
  doneBtn.position(windowWidth/2, windowHeight/2 + 325);
  doneBtn.mousePressed(() => {
    gameState = 1;
    removeElements();
  });

  setTimeout(() => {
    isEncounterWithAlienOver = false;
  }, 15 * 1000);
}

//===================================================================================================================================
// contains logic for apeasing the alien and continuing the game
//===================================================================================================================================
// function gameOver(){
//   goodChoiceBtn.remove();
//   badChoiceBtn.remove();
//   drawImage(alienBoiBadImg, windowWidth/2, windowHeight/2, 800, windowHeight);
//
//   //display dialog box and choices
//   fill('#e4e6eb');
//   rectMode(CENTER);
//   rect(windowWidth/2, windowHeight/2 + 300, 1300, 200);
//   push();
//   translate(windowWidth/2, windowHeight/2 + 300/2);
//   textStyle(NORMAL);
//   textAlign(CENTER);
//   textSize(30);
//   fill('#003566');
//   text('So, you have chosen.... ANNIHILATIOOOOOOON!!!!', 0, 150);
//   pop();
//
//   let doneBtn = createButton('OH NOOOO!');
//   doneBtn.position(windowWidth/2, windowHeight/2 + 350);
//   doneBtn.mousePressed(() => {
//     gameState = 4;
//     explosionSound.setVolume(0.7);
//     explosionSound.play();
//   });
//   doneBtn.remove();
//
// }















//===================================================================================================================================
// display object information card
//===================================================================================================================================
function displayInformation(objectName){
  if(mouseIsPressed){
    fill('#e4e6eb');
    rectMode(CENTER);
    rect(windowWidth/2, windowHeight/2, 400, 700);

    push();
    //bring a new temporary origin to the corner of the just drawn box and add a small margin
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
