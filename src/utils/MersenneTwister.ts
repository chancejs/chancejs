/*
A C-program for MT19937, with initialization improved 2002/1/26.
Coded by Takuji Nishimura and Makoto Matsumoto.

Before using, initialize the state by using init_genrand(seed)
or init_by_array(init_key, key_length).

Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

1. Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

3. The names of its contributors may not be used to endorse or promote
products derived from this software without specific prior written
permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Any feedback is very welcome.
http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

/**
 * Mersenne Twister originally borrowed from https://gist.github.com/banksean/300494.
 */
export class MersenneTwister {
  /**
   * The current version of this class.
   */
  public VERSION = "2.0.0" as const;
  /**
   * Period parameter N.
   */
  private N = 624 as const;
  /**
   * Period parameter M.
   */
  private M = 397 as const;
  /**
   * Constant vector A.
   */
  private MATRIX_A = 0x9908b0df as const;
  /**
   * Most significant W-R bits.
   */
  private UPPER_MASK = 0x80000000 as const;
  /**
   * Least significant R bits.
   */
  private LOWER_MASK = 0x7fffffff as const;
  /**
   * Private class member to store the state vector.
   */
  private mt: number[];
  /**
   * The index of the state vector. An mti value of N + 1 means mt[N] is not initialized.
   */
  private mti: number;

  constructor(seed?: number) {
    if (seed === undefined) {
      // Kept random number same size as time used previously to ensure no unexpected results downstream.
      seed = Math.floor(Math.random() * Math.pow(10, 13));
    }
    // Allocate an in-memory array for the state vector.
    this.mt = new Array(this.N);
    //Set mti to N + 1 to indicate that mt[N] is not initialized.
    this.mti = this.N + 1;
    this._init_genrand(seed);
  }

  /**
   * Initializes mt[N] with a seed.
   * @param {number} s The numeric seed.
   */
  private _init_genrand(s: number): void {
    this.mt[0] = s >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++) {
      s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] =
        ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
        (s & 0x0000ffff) * 1812433253 +
        this.mti;
      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
      /* In the previous versions, MSBs of the seed affect   */
      /* only MSBs of the array mt[].                        */
      /* 2002/01/09 modified by Makoto Matsumoto             */
      this.mt[this.mti] >>>= 0;
      /* for >32 bit machines */
    }
  }

  /**
   * Generates a random number on [0,0xffffffff]-interval.
   * @return {number} A randomnly generated 32-bit integer.
   */
  public genrand_int32(): number {
    var y;
    var mag01 = new Array(0x0, this.MATRIX_A);
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (this.mti >= this.N) {
      /* generate N words at one time */
      var kk;

      if (this.mti === this.N + 1) {
        /* if init_genrand() has not been called, */
        this._init_genrand(5489); /* a default initial seed is used */
      }
      for (kk = 0; kk < this.N - this.M; kk++) {
        y =
          (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < this.N - 1; kk++) {
        y =
          (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] =
          this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y =
        (this.mt[this.N - 1] & this.UPPER_MASK) |
        (this.mt[0] & this.LOWER_MASK);
      this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    /* Tempering */
    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    return y >>> 0;
  }

  /**
   * Generates a random number on [0,0x7fffffff]-interval.
   * @return {number} A randomnly generated 31-bit integer.
   */
  public genrand_int31(): number {
    return this.genrand_int32() >>> 1;
  }

  /**
   * Generates a random number on [0,1]-real-interval.
   * @return {number} A randomnly generated number between zero and one inclusive.
   */
  public genrand_real1(): number {
    return this.genrand_int32() * (1.0 / 4294967295.0);
    /* divided by 2^32-1 */
  }

  /**
   * Generates a random number on [0,1)-real-interval.
   * @return {number} A randomnly generated number between zero and one,
   * inclusive.of zero, exclusive of one.
   */
  public random(): number {
    return this.genrand_int32() * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  }

  /**
   * Generates a random number on (0,1)-real-interval.
   * @return {number} A randomnly generated number between zero and one exclusive.
   */
  public genrand_real3(): number {
    return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  }

  /**
   * Generates a random number on [0,1) with 53-bit resolution.
   * @return {number} A randomnly generated number between zero and one,
   * inclusive.of zero, exclusive of one, with 53-bit resolution.
   */
  public genrand_res53(): number {
    var a = this.genrand_int32() >>> 5,
      b = this.genrand_int32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }
}
