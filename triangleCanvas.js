class TriangleCanvas{
    constructor(validityChecks, inputFuncFromSide){
      this.openSides = [];
      this.allSides = [];     
      this.allTriangles = [];
      this.validityChecks = validityChecks;
      this.createTriangleFromSide = inputFuncFromSide;
    }

    populate() {
      let openSidesClone = [...this.openSides]
      for(let side of openSidesClone){        
        
        // floor(random) reduces the likelyhood a side will get populated from by a number
        if(Math.floor(1.3*Math.random()) == 0){
          let newTriangle = this.createTriangle(side);
          if(newTriangle){
            this.allTriangles.push(newTriangle)
            this.openSides = [...newTriangle.sides, ...this.openSides];

            this.openSides = this.openSides.filter(element => !element.equals(side));

            this.allSides = [...newTriangle.sides, ...this.allSides]
          }
        }
      }
    }

    commenceWithTriangle(){
      let pointA = new Point(windowWidth/2-getRandom(-200,-50),windowHeight/2+getRandom(0,50));
      let pointB = new Point(windowWidth/2+getRandom(0,30),windowHeight/2-getRandom(-300,300));
      let pointC = new Point(windowWidth/2+getRandom(0,100), windowHeight/2 +getRandom(0,100));
    
      let newTriangle = new Triangle(pointA, pointB, pointC);
      for(let side of newTriangle.sides){
        this.openSides.push(side)
      };
      for(let side of this.openSides){
        side.draw();
      }
      this.allSides = [...newTriangle.sides]
      
    }

    reset(){
      this.openSides = []
      this.allSides = []
      this.allTriangles=[]
      stroke(255,255,255);
      strokeWeight(4);
      background(0)
      this.commenceWithTriangle();
    }

    // Creates and returns a triangle from any type of input. Will undergo a sanity check first. Todo: create from Variable, x,y 
    createTriangle(arg1){
      const checkAllValidity = (triangle) => {
        return this.validityChecks.reduce((acc, validCheck) => 
          acc && validCheck(triangle, this.allTriangles), true);
      }

      let attempts = 0;
      let newTriangle;
      let create;

      if(arg1 instanceof Side){
        create = this.createTriangleFromSide;
      }

      do{
        newTriangle = create(arg1);
        attempts++;
        if(attempts >1){return false;}
      } while(!checkAllValidity(newTriangle))

      return newTriangle;
    }  
}
// something is wrong with angle calculation? idkkkkk
// Higher order function, second parameter after newTriangle omitted, as there's no need for alltriangles
  const triangleValidity = (minimumAngle, maximumAngle, minimumSize, maximumSize) => (newTriangle) => {

    if(
      newTriangle.angleA < minimumAngle ||
      newTriangle.angleB < minimumAngle ||
      newTriangle.angleC < minimumAngle 
      // || angleA > maximumAngle ||
      // angleB > maximumAngle ||
      // angleC > maximumAngle
      ){return false;} 
    if(newTriangle.size < minimumSize || newTriangle.size > maximumSize){return false;}

    return true;
  }

  const overlapsAtLeastOne = (newTriangle, allTriangles) => {
    return !allTriangles.reduce((acc, triangle2) => 
        acc && !doTrianglesOverlap(newTriangle, triangle2), true);
  };

  const overlapsNone = (newTriangle, allTriangles) => {
    return allTriangles.reduce((acc, triangle2) => 
        acc && !doTrianglesOverlap(newTriangle, triangle2), true);
  };

  const createTriangleFromSide = (lengthMin, lengthMax) => (openSide) => {
    let a = openSide.a;
    let b = openSide.b;
    
    let anglePerpendicular = openSide.angle + openSide.getRandomizer()*0.5*Math.PI
    const angle = anglePerpendicular + getRandom(-0.4*Math.PI, 0.4*Math.PI);
    const distance = getRandom(openSide.length*lengthMin, openSide.length*lengthMax, 0);


    // Create new point C through random generated angle, then offsets it from the midpoint with The random generated distance. From any Point R, use angle, cos and sin to derive x and y coordinate

    const pointC = {
        x: openSide.midPoint.x + distance * Math.cos(angle),
        y: openSide.midPoint.y + distance * Math.sin(angle)
    };

    const c = new Point(pointC.x, pointC.y);

    return new Triangle(openSide.a, openSide.b, c);

  }


