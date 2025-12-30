class Rocket {
  constructor(xPos, yPos, dna) {
    this.dna = dna;
    this.fitness = 0;

    this.geneCounter = 0;

    this.position = { x: xPos, y: yPos };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
  }

  run() {
    this.applyForce(this.dna.genes[this.geneCounter]);
    this.geneCounter++;

    //update rocket physics
    this.update();
  }

  applyForce(force) {
    this.acceleration.x += force.x;
    this.acceleration.y += force.y;
  }

  update() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }

  calculateFitness() {
    // distance is difference btw rocket position and target position
    let distanceX = this.position.x - target.position.x;
    let distanceY = this.position.y - target.position.y;

    let distance = {
      x: distanceX,
      y: distanceY
    }

    //return a single number
    distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    //invert the distance so less distance is more fitness and more distance is less fitness
    this.fitness = 1 / distance;

  }
}
