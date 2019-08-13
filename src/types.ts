import * as isPred from 'predicates';

export interface Reference<T> {
    type: string;
    id: T;
}

export interface LabeledSeed<TSeed, TId> {
    type: string;
    id: TId
    seed: TSeed;
}


export namespace LabeledSeed {
    const predicate = isPred.structure({
        type: String,
        id: isPred.defined,
        seed: isPred.defined
    });

    export function is<TSeed = any, TId = any>(value: any): value is LabeledSeed<TSeed, TId> {
        return predicate(value);
    }
}