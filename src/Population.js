import { DNA } from "./DNA";

// Genetic Algoritm, Evolving text
// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

export default class Population {
  constructor(targetPhrase, mutationRate, popMax) {
    this.population = [];
    this.matingPool = [];

    this.generations = 0;
    this.finished = false;
    this.target = targetPhrase;
    this.mutationRate = mutationRate;

    this.perfectScore = 1;
    this.best = "";


    for (let i = 0; i < popMax; i++) {
      this.population[i] = new DNA(this.target.length);
    }

    this.updateFitness();
  }

  //Every member of the population must have a fitness value in its DNA
  updateFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }


  // Generatea mating pool
  naturalSelection() {
    // Clear the ArrayList
    this.matingPool = [];

    let maxFitness = 0;

    //find the highest fitness value in the population.
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    // Based on fitness, each member will get added to the mating pool a certain number of times
    // a higher fitness = more entries to mating pool = more likely to be picked as a parent
    // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.population.length; i++) {
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);

      let n = floor(fitness * 100);
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }

  }

  getBest() {
    return this.best;
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }
}
