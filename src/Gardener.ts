import {Barn} from "./Barn";
import {Field} from "./Field";
import {EventEmitter} from 'events';
import {LabeledSeed} from "./types";

export class Gardener extends EventEmitter {

    constructor(readonly barn: Barn, private defaultField?: Field) {
        super();
    }

    sow(seeds: any[], field?: Field) {
        for (const seed of seeds) {

        }
    }

    private sowSeed(seed: LabeledSeed<any, any>, field: Field, parents: Array<LabeledSeed<any, any>>) {
        const species = this.barn.getSpecies(seed.type);

        // TODO circular reference detection
        const dependencies = species.getDependentReferences(seed.seed);
        if (Array.isArray(dependencies)) {
            for (const reference of dependencies) {
                const seed = this.barn.getSeedByReference(reference);
                this.sowSeed(seed, field, parents.concat([seed]));
            }
        }
    }

    plow(field?: Field) {

    }
}