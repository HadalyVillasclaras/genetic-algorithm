export class DNA {
  constructor (length) {
    this.genes = [];
    this.fitness = 0;

    for(let i = 0; i < length; i++) {
      this.genes[i] = randomCharacter();

    }
  }

  calculateFitness(target) {
    let score = 0;
    for(let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target.charAt(i)) {
        score++;
      }
    }

    // fitness is equal to correct no. characters / total characters
    this.fitness = score / target.length;
  }
}

function randomCharacter() {
  let character = Math.floor(Math.random(32, 127));
  // String.fromCharCode is a JS method that converts a number into its corresponding character in the ASCII
  return String.fromCharCode(character);
}