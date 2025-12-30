
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
    this.calcFitness();
  }


  calcFitness() {
    for (let individual of this.population) {
      // add fitness prop to each population individual
      individual.calculateFitness(this.target);
    }
  }

  createMatingPool() {
    this.matingPool = [];
    for (let individual of this.population) {
      // Add each member n times according to its fitness score
      let n = Math.floor(individual.fitness * 100);

      for (let j = 0; j < n; j++) {
        this.matingPool.push(individual);
      }
    }
  }

  createGeneration() {
    //Step 3: Reproduction
    for (let i = 0; i < this.population.length; i++) {

      if (this.population[i].fitness === 1) {
        continue;
      }

      let partnerA = this.matingPool[Math.floor(Math.random() * this.matingPool.length)]; //return DNA object;
      let partnerB = this.matingPool[Math.floor(Math.random() * this.matingPool.length)]; //return DNA object;

      while (partnerA == partnerB) {
        partnerB = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      }

      // Step 3a: Crossover
      let child = partnerA.crossover(partnerB);

      // Step 3b: Mutation
      child.mutate(this.mutationRate);

      // Overwrite population with new children
      this.population[i] = child;
    }

    if (!this.isFinished()) {
      this.generations++;
    }
  }

  getIndividuals() {
    return this.population;
  }

  getGenerationCount() {
    return this.generations;
  }

  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }


    total = total / (this.population.length);

    if (total == 1) {
      this.finished = true;
    }

    return total;
  }

  getTarget() {
    return this.target;
  }

  getMutationRate() {
    return this.mutationRate;
  }

  isFinished() {
    return this.finished;
  }

}
