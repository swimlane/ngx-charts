export function reduceTicks(ticks: any[], maxTicks: number): any[] {
  if (ticks.length > maxTicks) {
    const reduced = [];
    const modulus = Math.floor(ticks.length / maxTicks);
    for (let i = 0; i < ticks.length; i++) {
      if (i % modulus === 0) {
        reduced.push(ticks[i]);
      }
    }
    ticks = reduced;
  }

  return ticks;
}
