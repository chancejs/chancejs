/**
 * BlueImp MD5 hashing algorithm originally borrowed from https://github.com/blueimp/JavaScript-MD5.
 */
export class BlueImpMD5 {
  /**
   * The current version of this class.
   */
  public VERSION = "2.0.0" as const;

  /**
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   *
   * @param {number} x The first summand.
   * @param {number} y The second summand.
   * @returns {number} The sum of both summands.
   */
  private safe_add(x: number, y: number): number {
    var lsw = (x & 0xffff) + (y & 0xffff),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  /**
   * Bitwise rotate a 32-bit number to the left.
   *
   * @param {number} num The 32-bit number to rotate.
   * @param {number} cnt The number of bits to shift that number by.
   * @returns {number} The bit-rolled number.
   */
  private bit_roll(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  /**
   * One of the five basic operations the algorithm uses.
   *
   * @param {number} q q
   * @param {number} a a
   * @param {number} b b
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result of the operation.
   */
  private md5_cmn(
    q: number,
    a: number,
    b: number,
    x: number,
    s: number,
    t: number
  ): number {
    return this.safe_add(
      this.bit_roll(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s),
      b
    );
  }

  /**
   * One of the five basic operations the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @return {number} Result of the operation.
   */
  private md5_ff(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    t: number
  ): number {
    return this.md5_cmn((b & c) | (~b & d), a, b, x, s, t);
  }

  /**
   * One of the five basic operations the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @return {number} Result of the operation.
   */
  private md5_gg(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    t: number
  ): number {
    return this.md5_cmn((b & d) | (c & ~d), a, b, x, s, t);
  }

  /**
   * One of the five basic operations the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @return {number} Result of the operation.
   */
  private md5_hh(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    t: number
  ): number {
    return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }

  /**
   * One of the five basic operations the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @return {number} Result of the operation.
   */
  private md5_ii(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    t: number
  ): number {
    return this.md5_cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  /**
   * Calculate the MD5 of an array of little-endian words, and a bit length.
   *
   * @param {Array<number>} x Array of little-endian words.
   * @param {number} len Bit length.
   * @returns {Array<number>} MD5 Array.
   */
  public binl_md5(x: number[], len: number): number[] {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    let i,
      olda,
      oldb,
      oldc,
      oldd,
      a = 1732584193,
      b = -271733879,
      c = -1732584194,
      d = 271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = this.md5_ff(a, b, c, d, x[i], 7, -680876936);
      d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = this.md5_gg(b, c, d, a, x[i], 20, -373897302);
      a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = this.md5_hh(d, a, b, c, x[i], 11, -358537222);
      c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = this.md5_ii(a, b, c, d, x[i], 6, -198630844);
      d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = this.safe_add(a, olda);
      b = this.safe_add(b, oldb);
      c = this.safe_add(c, oldc);
      d = this.safe_add(d, oldd);
    }
    return [a, b, c, d];
  }

  /**
   * Convert an array of little-endian words to a string.
   *
   * @param {Array<number>} input MD5 Array.
   * @returns {string} MD5 string.
   */
  private binl2rstr(input: number[]): string {
    var i,
      output = "";
    for (i = 0; i < input.length * 32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff);
    }
    return output;
  }

  /**
   * Convert a raw string to an array of little-endian words.
   * Characters >255 have their high-byte silently ignored.
   *
   * @param {string} input Raw input string.
   * @returns {Array<number>} Array of little-endian words.
   */
  private rstr2binl(input: string): number[] {
    let i: number,
      output: Array<number | undefined> = [];

    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    for (i = 0; i < input.length * 8; i += 8) {
      // @ts-ignore:next-line
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output as number[];
  }

  /**
   * Calculate the MD5 of a raw string
   *
   * @param {string} s Input string.
   * @returns {string} Raw MD5 string.
   */
  private rstr_md5(s: string): string {
    return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
  }

  /**
   * Calculate the HMAC-MD5, of a key and some data (raw strings)
   *
   * @param {string} key HMAC key.
   * @param {string} data Raw input string.
   * @returns {string} Raw MD5 string.
   */
  private rstr_hmac_md5(key: string, data: string): string {
    var i,
      bkey = this.rstr2binl(key),
      ipad: Array<number | undefined> = [],
      opad: Array<number | undefined> = [],
      hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = this.binl_md5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = this.binl_md5(
      ipad.concat(this.rstr2binl(data)) as number[],
      512 + data.length * 8
    );
    return this.binl2rstr(
      this.binl_md5(opad.concat(hash) as number[], 512 + 128)
    );
  }

  /**
   * Convert a raw string to a hex string.
   *
   * @param {string} input Raw input string.
   * @returns {string} Hex encoded string.
   */
  private rstr2hex(input: string): string {
    var hex_tab = "0123456789abcdef",
      output = "",
      x,
      i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hex_tab.charAt((x >>> 4) & 0x0f) + hex_tab.charAt(x & 0x0f);
    }
    return output;
  }

  /**
   * Encode a string as UTF-8.
   *
   * @param {string} input Input string.
   * @returns {string} UTF8 string.
   */
  private str2rstr_utf8(input: string): string {
    return unescape(encodeURIComponent(input));
  }

  /**
   * Encodes input string as raw MD5 string.
   *
   * @param {string} s Input string.
   * @returns {string} Raw MD5 string.
   */
  private raw_md5(s: string): string {
    return this.rstr_md5(this.str2rstr_utf8(s));
  }

  /**
   * Encodes input string as Hex encoded string.
   *
   * @param {string} s Input string.
   * @returns {string} Hex encoded string.
   */
  private hex_md5(s: string): string {
    return this.rstr2hex(this.raw_md5(s));
  }

  /**
   * Calculates the raw HMAC-MD5 for the given key and data.
   *
   * @param {string} k HMAC key.
   * @param {string} d Input string.
   * @returns {string} Raw MD5 string.
   */
  private raw_hmac_md5(k: string, d: string): string {
    return this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d));
  }

  /**
   * Calculates the Hex encoded HMAC-MD5 for the given key and data.
   *
   * @param {string} k HMAC key.
   * @param {string} d Input string.
   * @returns {string} Raw MD5 string.
   */
  private hex_hmac_md5(k: string, d: string): string {
    return this.rstr2hex(this.raw_hmac_md5(k, d));
  }

  /**
   * Calculates MD5 value for a given string.
   * If a key is provided, calculates the HMAC-MD5 value.
   * Returns a Hex encoded string unless the raw argument is given.
   *
   * @param {string} string Input string.
   * @param {string} [key] HMAC key.
   * @param {boolean} [raw] Raw output switch.
   * @returns {string} MD5 output.
   */
  public md5(string: string, key?: string, raw?: boolean): string {
    if (!key) {
      if (!raw) {
        return this.hex_md5(string);
      }

      return this.raw_md5(string);
    }

    if (!raw) {
      return this.hex_hmac_md5(key, string);
    }

    return this.raw_hmac_md5(key, string);
  }
}
