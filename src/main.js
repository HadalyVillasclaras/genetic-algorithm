import { DNA } from "./DNA.js";
import p5js from 'p5';
let p5;

//Genetic Algorithm, Evolving Shakespeare
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

let population = [];
let matingPool = [];
let target = "to be or not to be";

function setup() {
  p5.createCanvas(400, 400);

  // Step 1: Population creation
  for(let i = 0; i < 100; i++) {
    population[i] = new DNA(18);
  }

 

}

function draw(){
  p5.background(200);
  // step 2: calculate fitness for each subsequent generation
  for (let phrase of population) {
    phrase.calculateFitness(target);

    let n = Math.floor(phrase.fitness * 100);

    for (let j = 0; j < n; j++) {
      matingPool.push(phrase);
    }
  }

  p5.square(12, 200, 30)
}



new p5js((instance) => {
  p5 = instance;
  p5.setup = setup;
  p5.draw = draw;
});

