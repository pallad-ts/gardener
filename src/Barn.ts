import {Species} from "./Species";
import {LabeledSeed, Reference} from "./types";
import {getSeedKey} from "./common";


function toLabeledSeed(seed: any, species: Species<any>): LabeledSeed<any, any> {
    return {
        id: species.getIdentifier(seed),
        type: species.name,
        seed: seed
    };
}

export class Barn {
    private species: Map<string, Species<any>> = new Map();

    private seeds: Map<string, any> = new Map();

    registerSpecies(species: Species<any>): this {
        this.species.set(species.name, species);
        return this;
    }

    storeSeeds(seeds: any[]): this {
        for (const seed of seeds) {
            this.storeSeed(seed);
        }
        return this;
    }

    private getSpeciesForSeed(seed: any) {
        for (const species of this.species.values()) {
            if (species.is(seed)) {
                return species;
            }
        }

        throw new Error(`Following seed has no registered species: \n ${JSON.stringify(seed, undefined, 2)}`);
    }

    private storeSeed(seed: any) {
        const species = this.getSpeciesForSeed(seed);
        const labeledSeed = toLabeledSeed(seed, species);
        this.seeds.set(getSeedKey(labeledSeed), labeledSeed);
    }

    getSeedByReference<T, TSeed = any>(reference: Reference<T>): LabeledSeed<TSeed, T> {
        const key = getSeedKey(reference);
        if (!this.seeds.has(key)) {
            throw new Error(`There is no registered seed of species: ${reference.type} and id: ${reference.id}`);
        }

        return this.seeds.get(key);
    }

    getLabeledSeed<TSeed, TId = any>(seed: TSeed): LabeledSeed<TSeed, TId> {
        
    }
}