/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1920, 980);
  background(255, 194, 194);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  noStroke();

  fill(235, 235, 235);
  circle(955, 1200, 1500)

  //tail
  fill(64, 62, 87);
  circle(1100, 370, 500)

  fill(255, 194, 194);
  circle(1000, 310, 450)

  //body
  fill(39, 39, 54);// body color
  circle(960, 500, 340); //body

  //left ear
  fill(39, 39, 54);
  push();
  translate(800, 340);
  angleMode(DEGREES);
  rotate(30);
  ellipse(11, 0, 130, 350);
  pop();

  //right ear
  fill(39, 39, 54);
  push();
  translate(1100, 340);
  angleMode(DEGREES);
  rotate(-30);
  ellipse(5, 0, 130, 350);
  pop();

  //head
  fill(56, 55, 77); //head color
  circle(870, 400, 200); //left cheek
  circle(1050, 400, 200); //right cheek
  circle(960, 350, 350); //head

  //star
  fill(255, 245, 173);
  circle(956, 500, 120);


  //left arm
  fill(39, 39, 54);
  push();
  translate(830, 505);
  stroke('black');
  strokeWeight(5);
  bezier(0, 0, 200, 0, 0, 100, 10, 70);
  pop();

  //right arm
  fill(39, 39, 54);
  push();
  translate(1080, 505);
  stroke('black');
  strokeWeight(5);
  angleMode(DEGREES);
  rotate(90);
  bezier(70, 10, 100, 0, 0, 200, 0, 0);
  pop();

  //left foot
  fill(56, 55, 77);
  push();
  translate(835, 610);
  angleMode(DEGREES);
  rotate(-35);
  ellipse(11, 0, 105, 160);
  pop();

  //left bean 1
  fill(56, 55, 77);
  push();
  translate(790, 600);
  angleMode(DEGREES);
  rotate(-35);
  ellipse(11, 0, 45, 65);
  pop();
  fill(72, 67, 77);
  push();
  translate(790, 600);
  angleMode(DEGREES);
  rotate(-35);
  ellipse(11, 0, 20, 40);
  pop();

  //left bean 2
  fill(56, 55, 77);
  push();
  translate(800, 560);
  angleMode(DEGREES);
  rotate(-35);
  ellipse(11, 0, 45, 65);
  pop();
  fill(72, 67, 77);
  push();
  translate(800, 560);
  angleMode(DEGREES);
  rotate(-35);
  ellipse(11, 0, 25, 45);
  pop();

  //left bean 3
  fill(56, 55, 77);
  push();
  translate(837, 562);
  angleMode(DEGREES);
  rotate(-35);
  ellipse(11, 0, 40, 60);
  pop();
  fill(72, 67, 77);
  push();
  translate(837, 562);
  angleMode(DEGREES);
  rotate(-35);
  ellipse(11, 0, 20, 40);
  pop();

  //big bean
  fill(72, 67, 77);
  push();
  translate(845, 625);
  angleMode(DEGREES);
  rotate(-35);
  ellipse(11, 0, 60, 90);
  pop();

  //right foot
  fill(56, 55, 77);
  push();
  translate(1050, 600);
  angleMode(DEGREES);
  rotate(35);
  ellipse(11, 0, 105, 160);
  pop();

  //right bean 1
  fill(56, 55, 77);
  push();
  translate(1095, 580);
  angleMode(DEGREES);
  rotate(35);
  ellipse(11, 0, 45, 65);
  pop();
  fill(72, 67, 77);
  push();
  translate(1095, 580);
  angleMode(DEGREES);
  rotate(35);
  ellipse(11, 0, 20, 40);
  pop();

  //left bean 2
  fill(56, 55, 77);
  push();
  translate(1080, 545);
  angleMode(DEGREES);
  rotate(35);
  ellipse(11, 0, 45, 65);
  pop();
  fill(72, 67, 77);
  push();
  translate(1080, 545);
  angleMode(DEGREES);
  rotate(35);
  ellipse(11, 0, 25, 45);
  pop();

  //left bean 3
  fill(56, 55, 77);
  push();
  translate(1040, 545);
  angleMode(DEGREES);
  rotate(35);
  ellipse(11, 0, 40, 60);
  pop();
  fill(72, 67, 77);
  push();
  translate(1040, 545);
  angleMode(DEGREES);
  rotate(35);
  ellipse(11, 0, 20, 40);
  pop();

  //big bean
  fill(72, 67, 77);
  push();
  translate(1040, 615);
  angleMode(DEGREES);
  rotate(35);
  ellipse(11, 0, 60, 90);
  pop();

  //face
  //mouth
  fill(56, 55, 77);
  arc(925, 440, 70, 70, 0, 180, PIE);
  arc(985, 440, 70, 70, 0, 180, PIE);

  //left eye
  fill(112, 219, 255);
  arc(860, 400, 100, 100, 180, 0, PIE);
  fill(56, 55, 77);
  arc(860, 440, 150, 110, 180, 0, PIE);

  //right eye
  fill(112, 219, 255);
  arc(1050, 400, 100, 100, 180, 0, PIE);
  fill(56, 55, 77);
  arc(1050, 440, 150, 110, 180, 0, PIE);

  //nose
  fill('black');
  triangle(955, 450, 975, 430, 935, 430);
  //(bottom point, right point, left point)

  //moon
  fill('white');
  circle(955, 270, 130);
  fill(56, 55, 77);
  circle(955, 252, 100);

  //highlights
  fill('white');
  circle(955, 360, 20);
  circle(955, 390, 10);
  circle(955, 415, 5);

  circle(875, 360, 10);
  circle(1065, 360, 10);







}
