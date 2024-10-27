let triangleCanvas
let currentCount;
const withinBounds = (newTriangle) => {
  let x = newTriangle.centroid.x, y = newTriangle.centroid.y;
  if(x > 0 && x < windowWidth && y > 0 && y < windowHeight){
    return true;
  } else { return false;}
}

function setup() {
  createCanvas(windowWidth, windowHeight, WebGL2RenderingContext);
  background(0);
  strokeWeight(4);
  

  colourGrad = color(255,255,255);
  stroke(colourGrad);
  frameRate(30)

  currentCount=0;
  let validities = [overlapsNone, triangleValidity(1/8*Math.PI, 1/3*Math.PI, 120, 100000), withinBounds]
  triangleCanvas = new TriangleCanvas(validities, createTriangleFromSide(0.05, 1.1))
  triangleCanvas.commenceWithTriangle()

}


// Idea: if a triangle has become small enough, close all sides, and let octopus extend somewhere else

function draw(){
  background(0);
  if(currentCount > 25){
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
  colourGrad.setRed(255-8*currentCount)
  colourGrad.setBlue(255-20*currentCount)

  stroke(colourGrad)
  strokeWeight(4-0.15*currentCount);
  currentCount++;
}



