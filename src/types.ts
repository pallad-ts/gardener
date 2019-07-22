export interface Reference<T> {
    type: string;
    id: T;
}

export interface LabeledSeed<TType, TId> {
    type: string;
    id: TId
    seed: TType;
}