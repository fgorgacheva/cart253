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

// let tringl = {
//   x1: 50,
//   y1: 0,
//   x2: 0,
//   y2: 100,
//   x3: 100,
//   y3: 100,
//   size: 100,
//   speedX: 3,
//   speedY: 4
// }

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

  // tringl.x1 = random(100,600);
  // tringl.y1 = random(100,600);
  // tringl.x2 = (tringl.x1 - 50);
  // tringl.y2 = (tringl.x1 + 100);
  // tringl.x3 = (tringl.x1 + 50);
  // tringl.y3 = (tringl.x1 + 100);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255, 201, 201);
  noStroke();

  // bol.x = constrain(bol.x, 0, width);
  // bol.fill = map(bol.x, 0, width, 0, 255);

  // Drawing shapes and giving them movement =================================================================

  //when bol hits any side of the canvas, reverse direction
  bol.speedX *= ((bol.x + bol.size/2 >= width || bol.x - bol.size/2 <= 0) ? -1 : 1);//+ bol.size/2
  bol.speedY *= ((bol.y + bol.size/2 >= height || bol.y - bol.size/2 <= 0) ? -1 : 1);//- bol.size/2

  bol.x = bol.x + bol.speedX;
  bol.y = bol.y + bol.speedY;


  let bmx;
  bmx *= (((random(0,255)-mouseX) < 0) ? -1 : 1);
  bmx = map(bmx,0,width,0,700);
  let bmy;
  bmy *= (((random(0,255)-mouseY) < 0) ? -1 : 1);
  bmy = map(bmy,0,height,0,700);

  fill(bmx, bmy, random(0,255));
  bol.size = constrain(mouseX,0,600);
  circle(bol.x, bol.y, bol.size);


  //when skwar hits any side of the canvas, reverse direction
  skwar.speedX *= ((skwar.x + skwar.size > width || skwar.x < 0) ? -1 : 1);
  skwar.speedY *= ((skwar.y + skwar.size > height || skwar.y < 0) ? -1 : 1);

  skwar.x = skwar.x + skwar.speedX;
  skwar.y = skwar.y + skwar.speedY;

  fill(mouseY, mouseX, random(0,255));
  square(skwar.x, skwar.y, skwar.size);

  //when tringl hits any side of the canvas, reverse direction
  // rectMode(CENTER);
  // tringl.speedX *= ((tringl.x + tringl.size > width || tringl.x < 0) ? -1 : 1);
  // tringl.speedY *= ((tringl.y + tringl.size > height || tringl.y < 0) ? -1 : 1);
  //
  // tringl.x = tringl.x + tringl.speedX;
  // tringl.y = tringl.y + tringl.speedY;

  // let triangleArr = [
  //   [tringl.x1, tringl.y1],
  //   [tringl.x2, tringl.y2],
  //   [tringl.x3, tringl.y3]
  // ]
  //
  // for(var i = 0; i < triangleArr.length(); i++){
  //   for(var j = 0; j < triangleArr[i].length(); j++){
  //     tringl.speedX *= ((triangleArr[i] + tringl.size > width || triangleArr[i] < 0) ? -1 : 1);
  //     tringl.speedY *= ((triangleArr[j] + tringl.size > height || triangleArr[j] < 0) ? -1 : 1);
  //
  //     triangleArr[i] = triangleArr[i] + tringl.speedX;
  //     triangleArr[j] = triangleArr[j] + tringl.speedY;
  //   }
  // }
  //
  // fill('purple');
  // triangle(tringl.x1, tringl.y1, tringl.x2, tringl.y2, tringl.x3, tringl.y3);





  //Making the shapes change color relative to mouse position ================================================




  //

}






























//
