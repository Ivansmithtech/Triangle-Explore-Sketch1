class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

// Ideas: create intermediate system between sketch and class structure, that handles population, functions for sanityCheck(), maybe have a triangle init(), that initiates opening/closing of sides based on preference (should that even be done inside the T class??)

// Create codebase -> attach version -> continually push to github when updated -> Create sketches that base off of a specific codebase version -> build the codebase into that sketch through npm and github

const zeroVector = new Point(0,0);

function angleFromPoints(pointA, pointB){
  //https://stackoverflow.com/questions/17530169/get-angle-between-point-and-origin
  let referenceVector = new Point(pointB.x-pointA.x, pointB.y-pointA.y); 
  return Math.atan2(referenceVector.y, referenceVector.x) - Math.atan2(zeroVector.y, zeroVector.x);
}

class Side{

  // The angle of the line is defined in Radians, The left and right Domain are also defined in radians
  constructor(a, b){
    this.a = a;
    this.b = b;
    this.name;

    this.normalize();

    
    this.angle = normalizeAngle(angleFromPoints(this.a, this.b));
    
    this.length = dist(a.x, a.y, b.x, b.y);

    this.midPoint = new Point((b.x+a.x)/2, (a.y+b.y)/2);

    this.open = 'a';
  } 

  normalize(){
    if(this.b.x < this.a.x ){
      let temp = this.a;
      this.a = this.b;
      this.b = temp;
    } else {
      return;
    }
  }

  getRandomizer(){
    let randomizerAngle = this.angle<0?-1:1;
    let randomizerOpen;
    if(this.open == 'l'){
      randomizerOpen = -1
    } else if (this.open == 'r'){
      randomizerOpen = 1
    } else if (this.open == 'a'){
      randomizerOpen = Math.floor(Math.random(2))==0?1:-1
    } else {
      console.log("error??")
    }

    return randomizerAngle*randomizerOpen*Math.PI;
  }

  equals(side){
    return (side.a==this.a&&side.b==this.b)||(side.a == this.b && side.b == this.a);
  }

  // sets open to a falsy value
  close(){
    this.open = '';
  }

  // From a side AB, look at the Angle from AB midpoint to point C, and Determine whether that is on 
  closeFromTrianglePoint(pointC) {
    let referenceAngle = normalizeAngle(angleFromPoints(this.midPoint, pointC));
    let angleDifference = normalizeAngle(referenceAngle - this.angle);

    if (angleDifference < 0 && angleDifference > -1*Math.PI) {
        if(this.angle > 0){
          this.open = 'l'; // Left side is open
        } else { this.open = 'r'}
    } else {
      if(this.angle > 0){
        this.open = 'r'; // Right side is open
      } else { this.open = 'l'}
    }
}

  draw(){
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class Triangle{
  constructor(arg1, arg2, arg3){
    this.pointA;
    this.pointB;
    this.pointC;

    this.sideAB;
    this.sideAC;
    this.sideBC;

    if(arg1 instanceof Point && arg2 instanceof Point && arg3 instanceof Point){
      this.pointA = arg1;
      this.pointB = arg2;
      this.pointC = arg3;

      this.sideAB = new Side(this.pointA, this.pointB)
      this.sideAC = new Side(this.pointA, this.pointC)
      this.sideBC = new Side(this.pointB, this.pointC)
      
      this.sideAB.closeFromTrianglePoint(this.pointC);
      this.sideAC.closeFromTrianglePoint(this.pointB);
      this.sideBC.closeFromTrianglePoint(this.pointA);
    }else if(arg1 instanceof Side && arg2 instanceof Point){
      this.pointA = arg1.a;
      this.pointB = arg1.b;
      this.pointC = arg2;

      this.sideAB = arg1;
      this.sideAC = new Side(this.pointA, this.pointC)
      this.sideBC = new Side(this.pointB, this.pointC)

      this.sideAB.close();
      this.sideAC.closeFromTrianglePoint(pointB);
      this.sideBC.closeFromTrianglePoint(pointA);
    } else if(arg1 instanceof Side && arg2 instanceof Side){
      // to implement
    }
    
    this.size = calculateTriangleArea(this.pointA, this.pointB, this.pointC)
    this.centroid = calculateCentroid(this.pointA, this.pointB, this.pointC)
    this.points = [this.pointA, this.pointB, this.pointC]
    this.sides = [this.sideAB, this.sideAC, this.sideBC]

  }

  
    
  valid(){
    let minimumSize = 1/7*Math.PI
    if(
      calculateAngle(this.pointA, this.pointB, this.pointC) < minimumSize ||
      calculateAngle(this.pointB, this.pointA, this.pointC) < minimumSize ||
      calculateAngle(this.pointC, this.pointB, this.pointA) < minimumSize){return false;}
    
      
    if(this.size < 50){return false;}

    console.log(`size:${this.size}`);
    return true;
  }
}




