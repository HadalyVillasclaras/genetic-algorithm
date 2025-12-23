import { DNA } from "./DNA.js";
import p5js from 'p5';

let p5;
let lastGenerationTime = 0;
let generationInterval = 1000;

// Genetic Algorithm, Evolving text
// Demonstration of using genetic algorithm to perform a search

/**
 * setup()
 * Step 1: The Population 
 *  Create an empty population (an array of ArrayList)
 *  Fill it with DNA encoded objects (pick random values to start)
 * 
 * 
 * draw()
 * Step 2: Selection 
 *  Create an empty mating pool (an empty ArrayList)
 *  For every member of the population, evaluate its fitness based on some criteria / function
 *  and add it to the mating pool in a manner consistant with its fitness, i.e. the more
 *  fit it is the more times it appears in the mating pool, in order to be more likely picked
 * 
 * Step 3: Reproduction 
 *  Create a new empty population
 *  Fill the new population by executing the following steps:
 *    1. Pick two parent objects from the mating pool
 *    2. Crossover -- create a child object by mating these two parents.
 *    3. Mutation -- mutate the child's DNA based on a given probability
 *    4. Add the child object to the new population
 *  Replace the old population with the new population
 * 
 * Step 4: Rinse and repeat
 * 
 */

let mutationRate = 0.005;
let populationSize = 150;

let population = [];
let target = "to be or not to be";

function setup() {
  p5.createCanvas(1000, 500);

  // Step 1: Population creation
  for (let i = 0; i < populationSize; i++) {
    population[i] = new DNA(target.length);
  }
}

function draw() {
  let now = p5.millis();
  if (now - lastGenerationTime > generationInterval) {
    lastGenerationTime = now;

    // Step 2: Selection
    // Calculate fitness
    for (let individual of population) {
      // add fitness prop to each population individual
      individual.calculateFitness(target);
    }


    // Build mating pool
    let matingPool = [];
    for (let individual of population) {
      // Add each member n times according to its fitness score
      let n = Math.floor(individual.fitness * 100);

      for (let j = 0; j < n; j++) {
        matingPool.push(individual);
      }
    }

    // Step 3: Reproduction
    for (let i = 0; i < population.length; i++) {
      if (population[i].fitness === 1) {
        continue
      }
      let partnerA = p5.random(matingPool); //return DNA object
      let partnerB = p5.random(matingPool); //return DNA object

      // Step 3a: Crossover
      let child = partnerA.crossover(partnerB);

      // Step 3b: Mutation
      child.mutate(mutationRate);

      //overwrite the population with the new children. 
      population[i] = child;

    }
    console.log(population)
  }

  // --- RENDERING UI ---
  p5.background(255);
  p5.textFont("Courier");

let columnX = 20;
let lineY = 30;

const lineHeight = 18;
const columnSpacing = 160;

for (let i = 0; i < population.length; i++) {
  const individualText = population[i].getIndividual();

  if (individualText === target) {
    p5.fill(255, 0, 0);
  } else {
    p5.fill(0);
  }
    p5.text(individualText, columnX, lineY);

    // next line
    lineY += lineHeight;

    // si se sale de la pantalla verticalmente,
    // empieza una nueva columna
    if (lineY > p5.height - 20) {
      lineY = 30;
      columnX += columnSpacing;
    }
  }

}


new p5js((instance) => {
  p5 = instance;
  p5.setup = setup;
  p5.draw = draw;
});

