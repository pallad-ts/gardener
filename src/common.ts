import {LabeledSeed, Reference} from "./types";

export function getSeedKey(reference: Reference<any>): string;
export function getSeedKey(seed: LabeledSeed<any, any>): string;
export function getSeedKey(seed: LabeledSeed<any, any> | Reference<any>): string {
    return `${seed.type}|${seed.id}`;
}