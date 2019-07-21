export class Species<T> {
    constructor(private options: {}) {

    }

    is(data: any): data is T {

    }
}