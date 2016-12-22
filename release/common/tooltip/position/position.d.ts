/**
 * Position helper for the popover directive.
 *
 * @export
 * @class PositionHelper
 */
export declare class PositionHelper {
    /**
     * Calculate vertical alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    static calculateVerticalAlignment(elDimensions: any, popoverDimensions: any, alignment: any): number;
    /**
     * Calculate vertical caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    static calculateVerticalCaret(elDimensions: any, popoverDimensions: any, caretDimensions: any, alignment: any): number;
    /**
     * Calculate horz alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    static calculateHorizontalAlignment(elDimensions: any, popoverDimensions: any, alignment: any): number;
    /**
     * Calculate horz caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    static calculateHorizontalCaret(elDimensions: any, popoverDimensions: any, caretDimensions: any, alignment: any): number;
    /**
     * Checks if the element's position should be flipped
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} placement
     * @param {any} alignment
     * @param {any} spacing
     * @returns {boolean}
     *
     * @memberOf PositionHelper
     */
    static shouldFlip(elDimensions: any, popoverDimensions: any, placement: any, alignment: any, spacing: any): boolean;
    /**
     * Position caret
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    static positionCaret(placement: any, elmDim: any, hostDim: any, caretDimensions: any, alignment: any): any;
    /**
     * Position content
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    static positionContent(placement: any, elmDim: any, hostDim: any, spacing: any, alignment: any): any;
    /**
     * Determine placement based on flip
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    static determinePlacement(placement: any, elmDim: any, hostDim: any, spacing: any, alignment: any): any;
}
