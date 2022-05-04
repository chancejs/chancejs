export interface Range {
  /**
   * The lower bound of the range.
   * @default -Number.MAX_SAFE_INTEGER
   */
  min?: number;
  /**
   * The upper bound of the range.
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number;
}
