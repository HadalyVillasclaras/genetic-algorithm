/**
 * A class to describe a pseudo-DNA, i.e. genotype
 * Here, a virtual organism's DNA is an array of character
 * 
 * Functionality:
 *  -- convert DNA into a string
 *  -- calculate DNA's "fitness"
 *  -- mate DNA with another set of DNA
 *  -- mutate DNA
 */


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

   getIndividual() {
    return this.genes.join("");
  }
  
  crossover(partner) {
    // The child is a new instance of DNA
    // Note that the genes are generated randomly in DNA constructor, but the crossover function will override the array
    let child = new DNA(this.genes.length); //genes.length = target.length

    // Pick a random midpoint in the genes array
    let midpoint = Math.floor(Math.random() * this.genes.length);

    for(let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) {
        child.genes[i] = this.genes[i]; //partnerA genes
      } else {
        child.genes[i] = partner.genes[i]; //partnerB genes
      }
    }

    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        //{!1} Mutation, a new random character
        this.genes[i] = randomCharacter();
      }
    }
  }
}

function randomCharacter() {
  let minRange = 32;
  let maxRange = 127;
  let totalNumbers = maxRange -  minRange; //95
  let initialValueToStartCounting = minRange;

  //get a number between 32 and 127
  let character = Math.floor(Math.random() * (totalNumbers)) + initialValueToStartCounting; 
  // String.fromCharCode is a JS method that converts a number into its corresponding character in the ASCII
  return String.fromCharCode(character);
}