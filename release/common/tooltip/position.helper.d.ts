/**
 * Position helper for the popover directive.
 */
export declare class PositionHelper {
    static calculateVerticalAlignment(elDimensions: any, popoverDimensions: any, alignment: any): any;
    static calculateVerticalCaret(elDimensions: any, popoverDimensions: any, caretDimensions: any, alignment: any): any;
    static calculateHorizontalAlignment(elDimensions: any, popoverDimensions: any, alignment: any): any;
    static calculateHorizontalCaret(elDimensions: any, popoverDimensions: any, caretDimensions: any, alignment: any): any;
    /**
     * Checks if the element's position should be flipped
     */
    static shouldFlip(elDimensions: any, popoverDimensions: any, placement: any, alignment: any, spacing: any): boolean;
}
