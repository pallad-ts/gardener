import {Species} from "./Species";
import {LabeledSeed} from "./types";
import {getSeedKey} from "./common";

export class Field {
    savedSeeds: Map<string, LabeledSeed<any, any>> = new Map();

    async sow(seeds: Array<LabeledSeed<any, any>>, species: Species<any>) {
        const seedsToSow = seeds.filter(x => !this.isSowed(x));
        for (const seed of seedsToSow) {
            this.savedSeeds.set(getSeedKey(seed), seed);
        }
        await species.save(seedsToSow.map(x => x.seed));
    }

    isSowed(seed: LabeledSeed<any, any>) {
        return this.savedSeeds.has(getSeedKey(seed));
    }

    async weedOut(seeds: Array<LabeledSeed<any, any>>, species: Species<any>) {
        for (const seed of seeds) {
            this.savedSeeds.delete(getSeedKey(seed));
        }
        await species.remove(seeds.map(x => x.seed));
    }
}