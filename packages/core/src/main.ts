import MersenneTwister from '@chancejs/mersenne-twister'

export interface IBoolOptions {
    likelihood: number
}

export default class Core {
    private random: () => number

    constructor() {
        const mt = new MersenneTwister(21)
        this.random = mt.random
    }

    /**
     *  Return a random bool, either true or false
     *
     *  @param {Object} [options={ likelihood: 50 }] alter the likelihood of
     *    receiving a true or false value back.
     *  @throws {RangeError} if the likelihood is out of bounds
     *  @returns {Bool} either true or false
     */
    public bool(options?: IBoolOptions): boolean {
        let likelihood: number
        if (options === undefined) {
            likelihood = 50
        } else {
            likelihood = options.likelihood
        }
        // testRange(
        //     options.likelihood < 0 || options.likelihood > 100,
        //     "Chance: Likelihood accepts values from 0 to 100."
        // )

        return this.random() * 100 < likelihood
    }
}