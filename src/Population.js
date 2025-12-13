// Genetic Algoritm, Evolving Shakespeare

import { DNA } from "./DNA";

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

export default class Population {
  constructor(targetPhrase, mutationRate, popMax) {
    this.population;
    this.matingPool;

    this.generations = 0;
    this.finished = false;
    this.target = targetPhrase;
    this.mutationRate = mutationRate;

    this.perfectScore = 1;
    this.best = "";

    this.population = [];
    for (let i = 0; i < popMax; i++) {
      this.population[i] = new DNA(this.target.length);
    }

  }


}