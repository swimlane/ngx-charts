// Robert Penner's easeOutExpo
function easeOutExpo(t, b, c, d) {
  return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
}

/**
 * Counts from a number to the end incrementally.
 * 
 * @export
 * @param {any} countFrom
 * @param {any} countTo
 * @param {any} countDecimals
 * @param {any} countDuration
 * @param {any} callback
 * @returns
 */
export function count(countFrom, countTo, countDecimals, countDuration, callback) {
  const startVal = Number(countFrom);
  const endVal = Number(countTo);
  const countDown = (startVal > endVal);
  const decimals = Math.max(0, countDecimals);
  const dec = Math.pow(10, decimals);
  const duration = Number(countDuration) * 1000;
  let startTime;

  function runCount(timestamp) {
    let frameVal;
    const progress = timestamp - startTime;

    if (countDown) {
      frameVal = startVal - easeOutExpo(progress, 0, startVal - endVal, duration);
    } else {
      frameVal = easeOutExpo(progress, startVal, endVal - startVal, duration);
    }

    if (countDown) {
      frameVal = (frameVal < endVal) ? endVal : frameVal;
    } else {
      frameVal = (frameVal > endVal) ? endVal : frameVal;
    }

    frameVal = Math.round(frameVal * dec) / dec;

    const tick = progress < duration;
    callback({
      value: frameVal,
      progress,
      timestamp,
      finished: !tick
    });

    if (tick) {
      return requestAnimationFrame((val) => runCount(val));
    }
  }

  return requestAnimationFrame((timestamp) => {
    startTime = timestamp;
    return runCount(timestamp);
  });
}

/**
 * Determine decimals places
 * 
 * @export
 * @param {any} countTo
 * @returns
 */
export function decimalChecker(countTo) {
  const endVal = Number(countTo);

  if(endVal % 1 !== 0 && Math.abs(endVal) <= 10) {
    return 2;
  }

  return 0;
}
