import { DNA } from "./DNA";

// Genetic Algoritm, Evolving text
// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

export default class Population {
  constructor(targetPhrase, mutation, populationSize) {
    this.population;
    this.matingPool = [];
    this.generations = 0;
    this.finished = false;
    this.target = targetPhrase;
    this.mutationRate = mutation;
    this.perfectScore = 1;

    this.best = "";

    this.population = [];

    // Step 1: Population creation
    for (let i = 0; i < populationSize; i++) {
      this.population[i] = new DNA(this.target.length)
    }


    // Step 2: Calculate fitness
    this.calcFitness()
  }
 

  calcFitness() {
    for( let individual of this.population) {
      this.population[i].calculateFitness(this.target);
    }

  }
}
