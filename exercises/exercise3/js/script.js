/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let batman = {
  x: 0,
  y: 250,
  size: 200,
  vx: 2,
  vy: 3,
  distanceX: 0,
  distanceY: 0,
  speed: 10,
  tx: 0,
  ty: 20
}

let robin = {
  x: 250,
  y: 250,
  size: 200,
  vx: 0,
  vy: 0,
  speed: 5,
}

let warehouse = {
  x: 0,
  y: 0,
  size: 400
}

let batmanImg;
let robinImg;
let jokerImg;
let happyEndImg;
let sadEndImg;
let warehouseImg;
let deathImg;
let arkhamImg;

let jokerSound;

let gameOver;

function preload() {
  batmanImg = loadImage('assets/images/bruce.png');
  robinImg = loadImage('assets/images/jason todd.png');
  jokerImg = loadImage('assets/images/joker.png');
  happyEndImg = loadImage('assets/images/happy.png');
  sadEndImg = loadImage('assets/images/sad.png');
  warehouseImg = loadImage('assets/images/warehouse.png');
  deathImg = loadImage('assets/images/easteregg.png');
  arkhamImg = loadImage('assets/images/arkhamcity.jpg');

  soundFormats('mp3');
  jokerSound = loadSound('assets/sounds/joker easter egg.mp3');
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  batman.x = windowWidth / 2;
  batman.y = windowHeight / 2;

  robin.x = 200;
  robin.y = 200;

  warehouse.x = windowWidth-200;
  warehouse.y = windowHeight-200;

  gameOver = false;

}

// draw()
//
// Description of draw() goes here.
function draw() {

  background(arkhamImg);


  //check if jason met bruce
  let distance = dist(robin.x, robin.y, batman.x, batman.y);

  //if jason meets bruce, display happy ending
  if (distance < robin.size / 2 + batman.size / 2) {
    happiness();
  }
  //if batman or robin yeeted off the screen display sad ending
  if(wentSeparateWays(robin) || wentSeparateWays(batman)) {
     sadness();
  }

  if(isRobinKidnapped()){
    easterEgg();
  }

  //clear the screen of stuff when the game is over
  if(!gameOver){
    //spawn warehouse easter egg
    imageMode(CENTER);
    image(warehouseImg, warehouse.x, warehouse.y, warehouse.size, warehouse.size);
    imageMode(CORNER);

    //batman
    batmanDraw();

    //robin
    if (mouseX && mouseY){
      robin.x = mouseX;
      robin.y = mouseY;
    }
    imageMode(CENTER);
    image(robinImg, robin.x, robin.y, robin.size, robin.size);
    imageMode(CORNER);
  }
}


//defines batmans behavior
function batmanDraw(){
batman.tx = batman.tx + 0.025;
batman.ty = batman.ty + 0.025;

let noiseX = noise(batman.tx);
let noiseY = noise(batman.ty);

batman.vx = map(noiseX, 0, 1, - batman.speed, batman.speed);
batman.vy = map(noiseY, 0, 1, - batman.speed, batman.speed);

batman.x = batman.x + batman.vx;
batman.y = batman.y + batman.vy;

imageMode(CENTER);
image(batmanImg, batman.x, batman.y, batman.size, batman.size);
imageMode(CORNER);
}


//displlay a title screen
function title(){

}

//end the program and display happy outcome image
function happiness() {
  //make bruce and jason disappear
  gameOver = true;
  imageMode(CENTER);
  image(happyEndImg, windowWidth/2, windowHeight/2, 500, 700);
  imageMode(CORNER);
  noLoop();
}

//disaply sad outcome
function sadness() {
  //make bruce and jason disappear
  gameOver = true;
  imageMode(CENTER);
  image(sadEndImg, windowWidth/2, windowHeight-400, 800,800);
  imageMode(CORNER);
  noLoop();
}

function easterEgg(){
  jokerSound.play();
  gameOver = true;
  imageMode(CENTER);
  image(jokerImg, windowWidth/2, windowHeight/2, 800,800);
  image(deathImg, warehouse.x, warehouse.y, 500, warehouse.size);
  imageMode(CORNER);
  noLoop();
}

//check if any of the two went off the screen
function wentSeparateWays(person){
  return (person.x + person.size/2 > windowWidth || person.x - person.size/2 < 0 || person.y + person.size/2 > windowHeight || person.y - person.size/2 < 0);
}

function isRobinKidnapped(){
  return robin.x + robin.size/2 < warehouse.x + warehouse.size/2 && robin.x - robin.size/2 > warehouse.x - warehouse.size/2 &&
         robin.y + robin.size/2 < warehouse.y + warehouse.size/2 && robin.y - robin.size/2 > warehouse.y - warehouse.size/2 ;
}




















































//
