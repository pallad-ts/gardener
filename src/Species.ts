import {Reference} from "./types";

export abstract class Species<T> {

    static idProps = ['id', '_id'];

    constructor(readonly name: string) {

    }

    abstract is(seed: any): seed is T;

    getDependentReferences(seed: any): Array<Reference<any>> {
        return [];
    }

    getIdentifier(seed: any) {
        for (const idProp of Species.idProps) {
            if (idProp in seed) {
                const id = seed[idProp];
                if (id === null || id === undefined) {
                    continue;
                }
                return id;
            }
        }

        throw new Error(`Seed does not have defined id at given keys: ${Species.idProps.join(', ')}`);
    }


    abstract save(values: any[]): Promise<any[]>;

    abstract remove(values: any[]): Promise<void>;
}