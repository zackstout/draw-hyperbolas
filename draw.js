
let circles = [];
let intersection_points = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(200);
}

function mousePressed() {
  console.log(mouseX, mouseY);
  const circle = new Circle(mouseX, mouseY);
  circles.push(circle);
}

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 1;

  this.grow = function() {
    this.r ++;
  };

  this.draw = function() {
    noFill();
    // Uses diameter, not radius:
    ellipse(this.x, this.y, this.r * 2);
  };

  this.detectOverlap = function(circs) {
    circs.forEach(c => {
      // Don't intersect with yourself!
      if (c.x != this.x && c.y != this.y) {
        // Check for intersection:
        const d = dist(c.x, c.y, this.x, this.y);
        if ((c.r + this.r) > d) {

          // Thanks SO:
          const a = (this.r*this.r - c.r*c.r + d*d)/(2*d);
          const h = Math.pow(this.r*this.r - a*a, 0.5);
          const x2 = this.x + a*(c.x - this.x)/d;
          const y2 = this.y + a*(c.y - this.y)/d;
          const x3 = x2 + h*(c.y - this.y) / d;
          const y3 = y2 - h*(c.x - this.x) / d;

          intersection_points.push({x: x3, y: y3});
        }
      }
    });
  };
}

function draw() {
  background(200);

  circles.forEach(circle => {
    stroke('black');
    circle.grow();
    circle.draw();
    circle.detectOverlap(circles);
  });

  intersection_points.forEach(point => {
    fill('green');
    noStroke();
    ellipse(point.x, point.y, 3);
  });
}
