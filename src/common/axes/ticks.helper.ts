export function reduceTicks(ticks, maxTicks) {
  if (ticks.length > maxTicks) {
    let reduced = [];
    let modulus = Math.floor(ticks.length / maxTicks);
    for (let i = 0; i < ticks.length; i++) {
      if (i % modulus === 0) {
        reduced.push(ticks[i]);
      }
    }
    ticks = reduced;
  }

  return ticks;
}
