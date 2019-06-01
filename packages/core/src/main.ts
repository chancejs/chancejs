import MersenneTwister from '@chancejs/mersenne-twister'

export interface IBoolOptions {
    likelihood: number
}

export default class Core {
    public random: () => number

    constructor() {
        const mt = new MersenneTwister(21)
        this.random = mt.random
    }
}
