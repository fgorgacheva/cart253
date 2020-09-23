/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
let bol = {
  x: 0,
  y: 0,
  size: 100,
  speedX: 3,
  speedY: 4,
  fill: 0
}

let skwar = {
  x: 0,
  y: 0,
  size: 100,
  speedX: 3,
  speedY: 4,
  fill: 0
}

let ellps = {
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  size: 100,
  speedX: 3,
  speedY: 4,
  fill: 0
}



// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(700, 700);

  //init
  bol.x = random(100,600);
  bol.y = random(100,600);

  skwar.x = random(100,600);
  skwar.y = random(100,600);

  ellps.x = random(100,600);
  ellps.y = random(100,600);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255, 201, 201);
  noStroke();

  let my = map(mouseY,0,height,0,255);
  let mx = map(mouseX,0,width,0,255);

  // bol.x = constrain(bol.x, 0, width);
  // bol.fill = map(bol.x, 0, width, 0, 255);

  //** CIRCLE ===========================================================================================

  //when bol hits any side of the canvas, reverse direction
  bol.speedX *= ((bol.x + bol.size/2 >= width || bol.x - bol.size/2 <= 0) ? -1 : 1);//+ bol.size/2
  bol.speedY *= ((bol.y + bol.size/2 >= height || bol.y - bol.size/2 <= 0) ? -1 : 1);//- bol.size/2

  bol.x = bol.x + bol.speedX;
  bol.y = bol.y + bol.speedY;

  //make circle color change randomly based on mouse position on the canvas
  fill(mx, my, 255);

  //make the circle size change based on mouse position within the canvas
  //bol.size = constrain(mouseX,0,500);

  //draw the circle
  circle(bol.x, bol.y, bol.size);



  //** SQUARE ===========================================================================================

  //when skwar hits any side of the canvas, reverse direction
  skwar.speedX *= ((skwar.x + skwar.size > width || skwar.x < 0) ? -1 : 1);
  skwar.speedY *= ((skwar.y + skwar.size > height || skwar.y < 0) ? -1 : 1);

  skwar.x = skwar.x + skwar.speedX;
  skwar.y = skwar.y + skwar.speedY;

  fill(my, 255, mx);

  //skwar.size = constrain(mouseY,0,500)

  square(skwar.x, skwar.y, skwar.size);


  //** ELLIPSE ===========================================================================================

  //when ellps hits any side of the canvas, reverse direction
  ellps.speedX *= ((ellps.x + ellps.size > width || ellps.x < 0) ? -1 : 1);
  ellps.speedY *= ((ellps.y + ellps.size > height || ellps.y < 0) ? -1 : 1);

  ellps.x = ellps.x + ellps.speedX;
  ellps.y = ellps.y + ellps.speedY;

  fill(255, my, mx);

  //skwar.size = constrain(mouseY,0,500)

  ellipse(ellps.x, ellps.y, ellps.w, ellps.h);







}






























//
