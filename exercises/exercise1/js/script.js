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

  let mmy = map(mouseY,0,height,0,255);
  let mmx = map(mouseX,0,width,0,255);

  let cmx = constrain(mouseX, 0, width);
  cmx = constrain(cmx, 0, 600);
  let cmy = constrain(mouseY, 0, height);
  cmy = constrain(cmy, 0, 600);


  // bol.x = constrain(bol.x, 0, width);

  //** CIRCLE ===========================================================================================

  //when bol hits any side of the canvas, reverse direction
  bol.speedX *= ((bol.x + bol.size/2 >= width  || bol.x - bol.size/2 <= 0) ? -1 : 1);//+ bol.size/2
  bol.speedY *= ((bol.y + bol.size/2 >= height || bol.y - bol.size/2 <= 0) ? -1 : 1);//- bol.size/2

  bol.x = bol.x + bol.speedX;
  bol.y = bol.y + bol.speedY;

  //make circle color change randomly based on mouse position on the canvas
  fill(mmx, mmy, 255);

  //make the circle size change based on mouse position within the canvas
  if (!(bol.x + cmx/2 > width) && !(bol.y + cmx/2 > height) &&
      !(bol.x - cmx/2 < 0)     && !(bol.y - cmx/2 < 0) ){

    bol.size = cmx;
  }

  //draw the circle
  circle(bol.x, bol.y, bol.size);



  //** SQUARE ===========================================================================================

  //when skwar hits any side of the canvas, reverse direction
  skwar.speedX *= ((skwar.x + skwar.size > width  || skwar.x < 0) ? -1 : 1);
  skwar.speedY *= ((skwar.y + skwar.size > height || skwar.y < 0) ? -1 : 1);

  skwar.x = skwar.x + skwar.speedX;
  skwar.y = skwar.y + skwar.speedY;

  fill(mmy, 255, mmx);

  //make the circle size change based on mouse position within the canvas
  if (!(skwar.x + cmy > width) && !(skwar.y + cmy > height) /*&&
      !(skwar.x - cmx < 0)     && !(skwar.y - cmx < 0)*/ ){

    skwar.size = cmy;
  }

  //draw the square
  square(skwar.x, skwar.y, skwar.size);



  //** ELLIPSE ===========================================================================================

  //when ellps hits any side of the canvas, reverse direction


  ellps.x = ellps.x + ellps.speedX;
  ellps.y = ellps.y + ellps.speedY;

  fill(255, mmy, mmx);

  if (!(ellps.x + cmx/2 > width) && !(ellps.y + cmy/2 > height) &&
      !(ellps.x - cmx/2 < 0)     && !(ellps.y - cmy/2 < 0) ){

        ellps.w = cmx;
        ellps.h = cmy;
      }

  ellps.speedX *= ((ellps.x + ellps.w/2 > width  || ellps.x - ellps.w/2< 0) ? -1 : 1);
  ellps.speedY *= ((ellps.y + ellps.h/2 > height || ellps.y - ellps.h/2< 0) ? -1 : 1);

  //draw the ellipse
  ellipse(ellps.x, ellps.y, ellps.w, ellps.h);







}






























//
