let triangleCanvas
let currentCount;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  strokeWeight(4);
  

  colourGrad = color(255,255,255);
  stroke(colourGrad);
  frameRate(30)

  currentCount=0;
  let validities = [overlapsNone]
  validities.push(triangleValidity(1/9*Math.PI, 1/3*Math.PI, 150, 100000))
  triangleCanvas = new TriangleCanvas(validities)
  triangleCanvas.commenceWithTriangle()

}


function draw(){
  background(0);
  if(currentCount > 12){
    triangleCanvas.reset();
    currentCount = 0;
  }

  triangleCanvas.populate();
  currentMode();

  for(side of triangleCanvas.allSides){    
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



