import { DNA } from "./DNA.js";
import p5js from 'p5';
import Population from "./Population.js";

let p5;
let lastGenerationTime = 0;
let generationInterval = 500;

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

let population;
let target = "to be or not to be";

function setup() {
  p5.createCanvas(1000, 500);

  // Step 1: Population creation
  population = new Population(target, mutationRate, populationSize)
}

function draw() {
  let now = p5.millis();
  if (now - lastGenerationTime > generationInterval) {
    lastGenerationTime = now;

    // Step 2: Selection
    // --Calculate fitness
    population.calcFitness();

    // --Build mating pool
    population.createMatingPool();

    // Step 3: Reproduction
    population.createGeneration();
  }

  // --- RENDERING UI ---
  p5.background(255);
  p5.textFont("Courier");

  let columnX = 20;
  let lineY = 30;

  const lineHeight = 18;
  const columnSpacing = 160;

  for (let i = 0; i < population.population.length; i++) {
    const individualText = population.population[i].getIndividual();

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

