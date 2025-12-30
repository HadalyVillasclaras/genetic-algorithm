import p5js from 'p5';
import Population from "./Population.js";

let p5;
let lastGenerationTime = 0;
let generationInterval = 0;

// Genetic Algorithm, Rocket


/**
 * setup()
 * Step 1: The Population 
 *  Create an empty population (an array of ArrayList)
 *  Fill it with DNA encoded objects (pick random values to start)
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
  p5.createCanvas(1200, 580);

  // Step 1: Population creation
  population = new Population(target, mutationRate, populationSize)
}

function draw() {
  let now = p5.millis();
  if (now - lastGenerationTime > generationInterval) {
    lastGenerationTime = now;

    // Step 2: Selection
    // --Build mating pool
    population.createMatingPool();

    // Step 3: Reproduction
    population.createGeneration();

    // --Calculate fitness
    population.calcFitness();
  }

  // -------- UI ---------
  p5.background(255);
  p5.fill(0);
  p5.textFont("Courier");

  const individuals = population.getIndividuals();

  // Best individual
  let bestFitness = -1;
  let bestText = "";

  for (let i = 0; i < individuals.length; i++) {
    if (individuals[i].fitness > bestFitness) {
      bestFitness = individuals[i].fitness;
      bestText = individuals[i].getIndividual();
    }
  }

  p5.textSize(12);
  p5.text("Best phrase:", 10, 32);

  p5.textSize(24);
  p5.text(bestText, 10, 64);

  // Stats
  p5.textSize(12);

  let statsText =
    "total generations:     " + population.getGenerationCount() + "\n" +
    "average fitness:       " + population.getAverageFitness().toFixed(2) + "\n" +
    "total population:      " + individuals.length + "\n" +
    "mutation rate:         " + population.getMutationRate();

  p5.text(statsText, 10, 96);

  // All individuals
  renderIndividuals(individuals, target);
}


new p5js((instance) => {
  p5 = instance;
  p5.setup = setup;
  p5.draw = draw;
});

function renderIndividuals(individuals, target) {
  let columnX = 300;
  let lineY = 30;

  const lineHeight = 18;
  const columnSpacing = 160;

  for (let i = 0; i < individuals.length; i++) {
    const individualText = individuals[i].getIndividual();

    if (individualText === target) {
      p5.fill(255, 0, 0);
    } else {
      p5.fill(0);
    }

    p5.text(individualText, columnX, lineY);

    lineY += lineHeight;

    // start new column
    if (lineY > p5.height - 20) {
      lineY = 30;
      columnX += columnSpacing;
    }
  }
}

