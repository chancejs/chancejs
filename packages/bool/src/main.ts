import { Core } from '@chancejs/core'

export interface IBoolOptions {
    likelihood: number
}

const chance = new Core()

/**
 *  Return a random bool, either true or false
 *
 *  @param {Object} [options={ likelihood: 50 }] alter the likelihood of
 *    receiving a true or false value back.
 *  @throws {RangeError} if the likelihood is out of bounds
 *  @returns {Bool} either true or false
 */
export function bool(options?: IBoolOptions): boolean {
    let likelihood: number
    if (options === undefined) {
        likelihood = 50
    } else {
        likelihood = options.likelihood
    }

    if (likelihood < 0 || likelihood > 100) {
        throw new RangeError('Chance: Likelihood accepts values from 0 to 100.')
    }

    return chance.random() * 100 < likelihood
}
