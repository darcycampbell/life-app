export function calcGap(containterWidth) {
  let idealColumns;
  for (let columns = 10; columns > 0; columns--) {
    const widthOfItems = columns * 200 + (columns - 1) * 15;
    if (widthOfItems <= containterWidth) {
      idealColumns = columns;
      break;
    }
  }
  const leftoverSpace = containterWidth - idealColumns * 200;
  return leftoverSpace / (idealColumns - 1);
}
