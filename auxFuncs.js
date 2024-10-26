function recursiveToString(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return String(obj); // Convert non-objects to string
    }
  
    let result = '{';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result += `${key}: ${recursiveToString(obj[key])}, `;
        }
    }
    result = result.slice(0, -2); // Remove trailing comma and space
    result += '}';
    return result;
  }
  
  const dist = (x1, y1, x2, y2) => {
    return Math.hypot(x2 - x1, y2 - y1);
  };
  
  function normalizeAngle(angle){
    // Normalize the angle to the range [-π, π]
    while (angle > Math.PI) {
      angle -= 2 * Math.PI; // Subtract 2π until the angle is in range
    }
    while (angle < -Math.PI) {
      angle += 2 * Math.PI; // Add 2π until the angle is in range
    }
  return angle;
  }
  
  function calculateAngle(A, B, C) {
    const Ax = A.x, Ay = A.y;
    const Bx = B.x, By = B.y;
    const Cx = C.x, Cy = C.y;
  
    // Calculate the angle from A to B and A to C
    const angleAB = Math.atan2(By - Ay, Bx - Ax);
    const angleAC = Math.atan2(Cy - Ay, Cx - Ax);
  
    // Calculate the angle at A
    let angleA = angleAB - angleAC;
  
    // Normalize the angle to be within [0, 2π)
    if (angleA < 0) {
        angleA += 2 * Math.PI;
    }
  
    return angleA; // Angle in radians
  }

  function calculateCentroid(a, b, c){
    return new Point((a.x + b.x + c.x)/3, (a.y + b.y + c.y)/3);
  }


function calculateTriangleArea(pointA, pointB, pointC) {
    const x1 = pointA.x, y1 = pointA.y;
    const x2 = pointB.x, y2 = pointB.y;
    const x3 = pointC.x, y3 = pointC.y;

return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
}

function getRandom(x, y) {
    const lower = Math.min(x, y);
    const upper = Math.max(x, y);
    return Math.random() * (upper - lower) + lower;
  
}

function XOR(a, b) {
    return (a || b) && !(a && b);
}

function doTrianglesOverlap(triangle1, triangle2) {
    
    for(side1 of triangle1.sides){
        for(side2 of triangle2.sides){
            if(side1.equals(side2)){
                return false;
            }
        }
    }

    // // Sometimes points can still be the same
    // for(point1 of triangle1.points){
    //     for(point2 of triangle2.points){
    //         if(point1 === point2){
    //             return false;
    //         }
    //     }
    // }


    for(side1 of triangle1.sides){
        for(side2 of triangle2.sides){
            if(findLineSegmentIntersection(side1.a, side1.b, side2.a, side2.b)){
                return true;
            }
        }
    }
    return false;
}

function findLineSegmentIntersection(A, B, C, D) {
    const x1 = A.x, y1 = A.y;
    const x2 = B.x, y2 = B.y;
    const x3 = C.x, y3 = C.y;
    const x4 = D.x, y4 = D.y;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    // Check if lines are parallel
    if (denom === 0) {
        return null; // No intersection (lines are parallel)
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

    // Check if the intersection point is within both segments
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        const intersectionX = x1 + t * (x2 - x1);
        const intersectionY = y1 + t * (y2 - y1);
        let interSect = new Point(intersectionX,intersectionY)
        
        
        for(point of [A,B,C,D]){
            if(dist(intersectionX, intersectionY, point.x,point.y) <= 1){
                return false;
            }
        }

        return interSect;
        
        // Return intersection point
    }

    return null; // No intersection within the segments
}
  