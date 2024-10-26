let openSides = [];
let allSides = [];
let openSidesClone;
let colourGrad;
let weightGrad;
let currentCount;
let allTriangles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  strokeWeight(4);
  

  colourGrad = color(255,255,255);
  stroke(colourGrad);
  frameRate(20)

  currentCount=0;
  commenceWithTriangle()
}

function commenceWithTriangle(){
  pointA = new Point(windowWidth/2-getRandom(-200,-50),windowHeight/2+getRandom(0,50));
  pointB = new Point(windowWidth/2+getRandom(0,30),windowHeight/2-getRandom(-300,300));
  pointC = new Point(windowWidth/2+getRandom(0,100), windowHeight/2 +getRandom(0,100));

  let newTriangle = new Triangle(pointA, pointB, pointC);
  newTriangle.sides.forEach(side => openSides.push(side));
  for(side of openSides){
    side.draw();
  }
  allSides = [...newTriangle.sides]
  
}

function reset(){
  openSides = []
  allSides = []
  allTriangles=[]
  currentCount = 0;
  stroke(255,255,255);
  strokeWeight(4);
  background(0)
  commenceWithTriangle();
}

function draw(){
  background(0);
  if(currentCount > 12){
    reset();
  }
  populate();
  currentMode();

  for(side of allSides){    
    side.draw();
}
  
}

function currentMode(){
  colourGrad.setGreen(255-20*currentCount)
  colourGrad.setRed(255-5*currentCount)
  colourGrad.setBlue(255-20*currentCount)

  stroke(colourGrad)
  strokeWeight(4-0.25*currentCount);
  currentCount++;
}

function populate() {
  openSidesClone = [...openSides]
  x = 0;
  for(side of openSidesClone){
    x++;
    let newTriangle = createTriangle(side);
    if(newTriangle){
      allTriangles.push(newTriangle)
      openSides = [...newTriangle.sides, ...openSides];
      openSides = openSides.filter(element => !element.equals(side));
      allSides = [...newTriangle.sides, ...allSides]
    }
    
  }
}


