import {Barn} from "./Barn";
import {Field} from "./Field";
import {EventEmitter} from 'events';

export class Gardener extends EventEmitter {
    constructor(readonly barn: Barn, private defaultField?: Field) {
        super();
    }


    sow(seeds: any[], field?: Field) {
        
    }

    plow() {

    }
}