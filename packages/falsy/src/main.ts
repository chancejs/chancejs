import { integer } from '@chancejs/integer';

/**
 * Type of default pool. `0 | NaN` collapses to just `number`, but other literals persist.
 */
type FalsyValue = false | null | undefined | number | '';

export interface IFalsyOptions {
    pool: FalsyValue[];
}

/**
 *  Return a random falsy value (false, null, undefined, 0, NaN, '').
 *
 *  @param {Object} [options={ pool: (false | null | undefined | number | '')[] }] alter the pool
 *      of possible values.
 *  @returns {FalsyValue} One of [false, null, undefined, 0, NaN, ''], or of the pool provided.
 */
const defaultOptions: IFalsyOptions = { pool: [false, null, undefined, 0, NaN, ''] };
export function falsy(options = defaultOptions): FalsyValue {
    const { pool } = options;
    const value = pool[integer({ min: 0, max: pool.length - 1 })];

    return value;
}
