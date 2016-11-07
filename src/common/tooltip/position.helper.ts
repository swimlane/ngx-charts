const caretOffset = 7;

function verticalPosition(elDimensions, popoverDimensions, alignment) {
  let result;

  if (alignment === 'top') {
    result = elDimensions.top - caretOffset;
  }

  if (alignment === 'bottom') {
    result = elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
  }

  if (alignment === 'center') {
    result = elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
  }

  return result;
}

function horizontalPosition(elDimensions, popoverDimensions, alignment) {
  let result;

  if (alignment === 'left') {
    return elDimensions.left - caretOffset;
  }

  if (alignment === 'right') {
    return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
  }

  if (alignment === 'center') {
    return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
  }

  return result;
}

/**
 * Position helper for the popover directive.
 */
export class PositionHelper {

  static calculateVerticalAlignment(elDimensions, popoverDimensions, alignment) {
    let result = verticalPosition(elDimensions, popoverDimensions, alignment);

    if (result + popoverDimensions.height > window.innerHeight) {
      result = window.innerHeight - popoverDimensions.height;
    }

    return result;
  }

  static calculateVerticalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
    let result;

    if (alignment === 'top') {
      result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
    }

    if (alignment === 'bottom') {
      result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
    }

    if (alignment === 'center') {
      result = popoverDimensions.height / 2 - caretDimensions.height / 2;
    }

    let popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
    if (popoverPosition + popoverDimensions.height > window.innerHeight) {
      result += (popoverPosition + popoverDimensions.height - window.innerHeight);
    }

    return result;
  }

  static calculateHorizontalAlignment(elDimensions, popoverDimensions, alignment) {
    let result = horizontalPosition(elDimensions, popoverDimensions, alignment);

    if (result + popoverDimensions.width > window.innerWidth) {
      result = window.innerWidth - popoverDimensions.width;
    }

    return result;
  }

  static calculateHorizontalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
    let result;

    if (alignment === 'left') {
      result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
    }

    if (alignment === 'right') {
      result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
    }

    if (alignment === 'center') {
      result = popoverDimensions.width / 2 - caretDimensions.width / 2;
    }

    let popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
    if (popoverPosition + popoverDimensions.width > window.innerWidth) {
      result += (popoverPosition + popoverDimensions.width - window.innerWidth);
    }

    return result;
  }

  /**
   * Checks if the element's position should be flipped
   */
  static shouldFlip(elDimensions, popoverDimensions, placement, alignment, spacing) {
    let flip = false;

    if (placement === 'right') {
      let popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
      if (popoverPosition + popoverDimensions.width + spacing > window.innerWidth) {
        flip = true;
      }
    }

    if (placement === 'left') {
      let popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
      if (popoverPosition - spacing < 0) {
        flip = true;
      }
    }

    if (placement === 'top') {
      if (elDimensions.top - popoverDimensions.height - spacing < 0) {
        flip = true;
      }
    }

    if (placement === 'bottom') {
      let popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
      if (popoverPosition + popoverDimensions.height + spacing > window.innerHeight) {
        flip = true;
      }
    }

    return flip;
  }
}
