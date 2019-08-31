import { MersenneTwister } from '@chancejs/mersenne-twister'

export interface IBoolOptions {
    likelihood: number
}

export class Core {
    public random: () => number

    constructor() {
        const mt = new MersenneTwister(new Date().getTime())
        this.random = mt.random
    }
}
