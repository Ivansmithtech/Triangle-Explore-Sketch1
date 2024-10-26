  class triangleCanvas{
    constructor(){
      this.openSides = [];
      this.allSides = [];
      this.openSidesClone;
      this.colourGrad;
      this.weightGrad;
      this.currentCount;
      this.allTriangles = [];
    }

    populate() {
      let openSidesClone = [...this.openSides]
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
  }