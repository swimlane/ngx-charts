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

export function getTickLines(label: string, maxLength: number, maxLines: number): string[] {
  let totalLines = (label || '')
    .toString()
    .split(/\s+/)
    .reduce((lines: string[], line: string) => {
      const last = (lines.pop() || '') + ' ';
      return last.length + line.length > maxLength ? [...lines, last.trim(), line.trim()] : [...lines, last + line];
    }, []);

  if (totalLines.length > maxLines) {
    totalLines = totalLines.splice(0, maxLines);
    totalLines[totalLines.length - 1] += '...';
  }

  return totalLines;
}
