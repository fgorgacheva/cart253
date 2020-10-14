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

let user {

}

let aliens {

}

let galaxy {

}

let blackHole {

}

let nebula {

}

let pulsar {

}

let sun {

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

}

// draw()
//
// Description of draw() goes here.
function draw() {

}
