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
  const labelString = (label || '').toString();
  let totalLines = [];

  if (/\s/.test(labelString)) {
    totalLines = labelString.split(/\s+/).reduce((lines: string[], line: string) => {
      const last = (lines.pop() || '') + ' ';
      return last.length + line.length > maxLength ? [...lines, last.trim(), line.trim()] : [...lines, last + line];
    }, []);
  } else {
    let startIndex = 0;
    while (startIndex < labelString.length) {
      totalLines.push(labelString.substring(startIndex, startIndex + maxLength));
      startIndex += maxLength;
    }
  }

  if (totalLines.length > maxLines) {
    totalLines = totalLines.splice(0, maxLines);
    totalLines[totalLines.length - 1] += '...';
  }

  return totalLines;
}
