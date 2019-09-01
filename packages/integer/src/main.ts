import { Core } from '@chancejs/core'

const core = new Core()

const MAX_INT = 9007199254740992
const MIN_INT = -MAX_INT

/**
 *  Return a random integer
 *
 *  NOTE the max and min are INCLUDED in the range. So:
 *  chance.integer({min: 1, max: 3});
 *  would return either 1, 2, or 3.
 *
 *  @param {Object} [options={}] can specify a min and/or max
 *  @returns {Number} a single random integer number
 *  @throws {RangeError} min cannot be greater than max
 */
export function integer(min = MIN_INT, max = MAX_INT): number {
  if (min > max) {
    throw new RangeError('Chance: Min cannot be greater than Max.')
  }
  return Math.floor(core.random() * (max - min + 1) + min)
}
